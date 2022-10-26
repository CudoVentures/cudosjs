// Some numeric types such as amount or minter cap must be passed as string so they can be parsed by the smart contract
// later. 

export type ContractMsgInstantiateNoMint = {
    name: string,
    symbol: string,
    decimals: number,
    initial_balances: {
        address: string,
        amount: string
    }[],
    marketing?: {
        // A URL pointing to the project behind this token
        project?: string | null | undefined,
        // A longer description of the token and it's utility. Designed for tooltips or such
        description?: string | null | undefined,
        // An address of who can update. Null or undefined means no one can update marketing info or set logo forever
        marketing?: string | null | undefined,
        logo?: {
            url: string
        } | {
            // Base64 encoded Uint8Array
            embedded: { svg: string }
        } | {
            embedded: { png: string }
        }
    }
}


export type ContractMsgInstantiate = ContractMsgInstantiateNoMint & {
    mint?: {
        // Only minter is authorised to mint
        minter: string,
        // cap is a hard cap on total supply that can be achieved by minting.
        // If unset, there is unlimited cap.
        cap?: string | null | undefined
    }
}

export type ContractMsgTransfer = {
    transfer: {
        recipient: string,
        amount: string
    }
}

export type ContractMsgBurn = {
    burn: {
        amount: string
    }
}

export type ContractMsgSend = {
    send: {
        contract: string,
        amount: string,
        // Base64 encoded Uint8Array of JSON stringified message
        msg: string
    }
}

export type ContractMsgIncreaseAllowance = {
    increase_allowance: {
        spender: string,
        amount: string,
        expires?: {
            never: {}
        } | {
            at_height: number
        } | {
            // at_time is numeric timestamp passed as string
            at_time: string
        }
    }
}

export type ContractMsgDecreaseAllowance = {
    decrease_allowance: {
        spender: string,
        amount: string,
        expires?: {
            never: {}
        } | {
            at_height: number
        } | {
            // at_time is numeric timestamp passed as string
            at_time: string
        }
    }
}

export type ContractMsgTransferFrom = {
    transfer_from: {
        owner: string,
        recipient: string,
        amount: string
    }
}

export type ContractMsgSendFrom = {
    send_from: {
        owner: string,
        contract: string,
        amount: string,
        // Base64 encoded Uint8Array of JSON stringified message
        msg: string
    }
}

export type ContractMsgBurnFrom = {
    burn_from: {
        owner: string,
        amount: string
    }
}

export type ContractMsgMint = {
    mint: {
        recipient: string,
        amount: string
    }
}

export type ContractMsgUpdateMinter = {
    update_minter: {
        // Setting the minter to null or undefined will remove the token's minter forever
        new_minter?: string | null | undefined
    }
}

export type ContractMsgUpdateMarketing = {
    // Setting null or undefined for any of these will leave it unchanged
    // Setting ("") will clear this field on the contract storage
    update_marketing: {
        project?: string | null | undefined,
        description?: string | null | undefined,
        marketing?: string | null | undefined,
    }
}

export type ContractMsgUploadLogo = {
    upload_logo: {
        url: string
    } | {
        // Base64 encoded Uint8Array
        embedded: { svg: string }
    } | {
        embedded: { png: string }
    }
}
