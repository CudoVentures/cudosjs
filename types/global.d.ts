import { SUPPORTED_WALLET } from "ledgers"

export { }

declare global {

    interface Window {
        keplr: any;
        cosmostation: any;
        getOfflineSigner: any;
    }

    interface WalletConfig {
        CHAIN_ID: string;
        CHAIN_NAME: string;
        RPC: string;
        API: string;
        STAKING: string;
        GAS_PRICE: string;
    }

    type WALLET_EXTENSION_DETAILS = {
        URL: Partial<Record<SUPPORTED_BROWSER, string>>;
        isInstalled: () => boolean;
    }

    type WALLET_EXTENSION = {
        [key in SUPPORTED_WALLET]: WALLET_EXTENSION_DETAILS;
    }
}
