import { Coin } from "src"

export type CustomMsgSend = {
    send: {
        contract: string,
        amount: string,
        msg: object
    }
}

export type CustomMsgSendFrom = {
    send_from: {
        owner: string,
        contract: string,
        amount: string,
        msg: object
    }
}

export type InstantiateOptions = {
    admin?: string,
    funds?: Coin[]
}
