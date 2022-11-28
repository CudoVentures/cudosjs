import BigNumber from 'bignumber.js';
import { cosmos, Cosmos, InstallError } from '@cosmostation/extension-client'
import { getOfflineSigner } from "@cosmostation/cosmos-client";

import Ledger from './Ledger';
import { CudosNetworkConsts } from '../utils';

declare let fetch: (url: string) => Promise<any>;

export interface CosmostationWalletConfig {
    CHAIN_ID: string,
    CHAIN_NAME: string,
    RPC: string,
    API: string,
    STAKING: string,
    GAS_PRICE: string,
}

export class CosmostationWallet extends Ledger {
    provider: Cosmos | null;
    cosmostationEvent: any;
    cosmostationWalletConfig: CosmostationWalletConfig;

    constructor(cosmostationWalletConfig: CosmostationWalletConfig) {
        super();
        this.provider = null;
        this.cosmostationWalletConfig = cosmostationWalletConfig;
        this.addressChangeCallbacks = [];
    }

    async connect(): Promise<void> {
        try {
            this.provider = await cosmos()

            const activatedChainIds = await this.provider.getActivatedChainIds()

            if (!activatedChainIds.includes(this.cosmostationWalletConfig.CHAIN_ID)) {
                await this.provider.addChain({
                    chainId: this.cosmostationWalletConfig.CHAIN_ID,

                    chainName: this.cosmostationWalletConfig.CHAIN_NAME,

                    addressPrefix: CudosNetworkConsts.BECH32_PREFIX_ACC_ADDR,

                    baseDenom: CudosNetworkConsts.CURRENCY_DENOM,

                    displayDenom: CudosNetworkConsts.CURRENCY_DISPLAY_NAME,

                    restURL: this.cosmostationWalletConfig.API,

                    decimals: CudosNetworkConsts.CURRENCY_DECIMALS,

                    coinGeckoId: CudosNetworkConsts.CURRENCY_COINGECKO_ID,

                    gasRate: {
                        average: `${Number(this.cosmostationWalletConfig.GAS_PRICE) * 4}`,
                        low: `${Number(this.cosmostationWalletConfig.GAS_PRICE)* 2}`,
                        tiny: `${Number(this.cosmostationWalletConfig.GAS_PRICE)}`,
                    }
                })
            }
            const account = await this.provider.requestAccount(this.cosmostationWalletConfig.CHAIN_ID)

            this.accountAddress = account.address;
            this.connected = true;
            
            this.offlineSigner = await getOfflineSigner(this.cosmostationWalletConfig.CHAIN_ID);;
            this.cosmostationEvent = this.provider.onAccountChanged(this.accountChangeEventListener);
        } catch (e: any) {
            if (e instanceof InstallError) {
                throw new Error('Cosmostation extension not found')
            }

            if (e.code === 4001) {
                throw new Error('user rejected request')
            }
        }
    }

    async disconnect(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.provider?.offAccountChanged(this.cosmostationEvent);
            this.init();
            resolve();
        });
    }

    async getBalance(): Promise<BigNumber> {
        try {
            const url = `${this.cosmostationWalletConfig.API}/cosmos/bank/v1beta1/balances/${this.accountAddress}/by_denom?denom=${CudosNetworkConsts.CURRENCY_DENOM}`;
            const amount = (await (await fetch(url)).json()).balance.amount;

            return new BigNumber(amount).div(CudosNetworkConsts.CURRENCY_1_CUDO);
        } catch (e) {
            console.log(e);
            throw new Error('Failed to get balance!');
        }
    }

    async getName(): Promise<string> {
        try {
            const account = await this.provider?.requestAccount(this.cosmostationWalletConfig.CHAIN_NAME);

            if(!account) {
                throw new Error('Failed to request account');
            }

            return account.name;
        } catch (e) {
            console.log(e);
            throw new Error('Failed to get name.');
        }
    }

    isConnected(): boolean {
        return this.connected === true;
    }
    
    isLedgerExtensionPresent(): boolean {
        return window.cosmostation ? true : false;
    }

    private accountChangeEventListener = async (): Promise<void> => {
        if (this.offlineSigner !== null && this.offlineSigner !== undefined) {
            this.accountAddress = (await this.offlineSigner.getAccounts())[0].address;
        }

        this.addressChangeCallbacks.forEach((callback: (address: string) => void) => callback(this.accountAddress ?? ''));
    }


}
