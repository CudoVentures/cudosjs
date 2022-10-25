import BigNumber from 'bignumber.js';

export class CudosNetworkConsts {

    static CURRENCY_DISPLAY_NAME = 'CUDOS';
    static CURRENCY_DENOM = 'acudos';
    static CURRENCY_DECIMALS = 18;
    static CURRENCY_COINGECKO_ID = 'cudos';
    static CURRENCY_1_CUDO = new BigNumber(`1${'0'.repeat(CudosNetworkConsts.CURRENCY_DECIMALS)}`);

    static LEDGER_COIN_TYPE = 118;
    static BECH32_PREFIX_ACC_ADDR = 'cudos';
    static BECH32_PREFIX_ACC_PUB = 'cudospub';
    static BECH32_PREFIX_VAL_ADDR = 'cudosvaloper';
    static BECH32_PREFIX_VAL_PUB = 'cudosvaloperpub';
    static BECH32_PREFIX_CONS_ADDR = 'cudosvalcons';
    static BECH32_PREFIX_CONS_PUB = 'cudosvalconspub';
    static BECH32_ACC_ADDR_LENGTH = 44;
    static DEFAULT_GAS_MULTIPLIER = 1.3;

    static MESSAGE_TYPE_URL = '/gravity.v1.MsgSendToEth';

}

export class ContractConsts {

    static DEFAULT_CW20_LABEL_UNLIMITED = 'cw20_unlimited';
    static DEFAULT_CW20_LABEL_BURNABLE = 'cw20_burnable';
    static DEFAULT_CW20_LABEL_MINTABLE = 'cw20_mintable';
    static DEFAULT_CW20_LABEL_STANDARD = 'cw20_standard';

    static PRIVATE_TESTNET_CHAIN_ID = 'cudos-testnet-private-3'

}

export const CURRENCY_DISPLAY_NAME = CudosNetworkConsts.CURRENCY_DISPLAY_NAME;
export const CURRENCY_DENOM = CudosNetworkConsts.CURRENCY_DENOM;
export const CURRENCY_DECIMALS = CudosNetworkConsts.CURRENCY_DECIMALS;
export const CURRENCY_COINGECKO_ID = CudosNetworkConsts.CURRENCY_COINGECKO_ID;
export const CURRENCY_1_CUDO = CudosNetworkConsts.CURRENCY_1_CUDO;

export const LEDGER_COIN_TYPE = CudosNetworkConsts.LEDGER_COIN_TYPE;
export const BECH32_PREFIX_ACC_ADDR = CudosNetworkConsts.BECH32_PREFIX_ACC_ADDR;
export const BECH32_PREFIX_ACC_PUB = CudosNetworkConsts.BECH32_PREFIX_ACC_PUB;
export const BECH32_PREFIX_VAL_ADDR = CudosNetworkConsts.BECH32_PREFIX_VAL_ADDR;
export const BECH32_PREFIX_VAL_PUB = CudosNetworkConsts.BECH32_PREFIX_VAL_PUB;
export const BECH32_PREFIX_CONS_ADDR = CudosNetworkConsts.BECH32_PREFIX_CONS_ADDR;
export const BECH32_PREFIX_CONS_PUB = CudosNetworkConsts.BECH32_PREFIX_CONS_PUB;
export const BECH32_ACC_ADDR_LENGTH = CudosNetworkConsts.BECH32_ACC_ADDR_LENGTH;
export const DEFAULT_GAS_MULTIPLIER = CudosNetworkConsts.DEFAULT_GAS_MULTIPLIER;

export const DEFAULT_CW20_LABEL_UNLIMITED = ContractConsts.DEFAULT_CW20_LABEL_UNLIMITED;
export const DEFAULT_CW20_LABEL_BURNABLE = ContractConsts.DEFAULT_CW20_LABEL_BURNABLE;
export const DEFAULT_CW20_LABEL_MINTABLE = ContractConsts.DEFAULT_CW20_LABEL_MINTABLE;
export const DEFAULT_CW20_LABEL_STANDARD = ContractConsts.DEFAULT_CW20_LABEL_STANDARD;

export const PRIVATE_TESTNET_CHAIN_ID = ContractConsts.PRIVATE_TESTNET_CHAIN_ID;
