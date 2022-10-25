import { PRIVATE_TESTNET_CHAIN_ID } from "src/utils/constants"

type ContractToCodeId = {
    readonly cw20Unlimited: number
    readonly cw20Burnable: number,
    readonly cw20Mintable: number,
    readonly cw20Standard: number,
}

export const getCodeIds = (chainId: string): ContractToCodeId => {
    const codeIds = networkCodeIds.get(chainId)
    if (!codeIds) {
        throw new Error('Unknown chain ID passed!')
    }
    return codeIds
}

export const networkCodeIds = new Map<string, ContractToCodeId>([
    [
        PRIVATE_TESTNET_CHAIN_ID, {
            cw20Unlimited: 16,
            cw20Burnable: 15,
            cw20Mintable: 14,
            cw20Standard: 13
        }
    ]
])
