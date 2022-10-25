import {
    Coin, MsgExecuteContractEncodeObject, MsgInstantiateContract, MsgInstantiateContractEncodeObject, toAscii
} from "src";
import { DEFAULT_CW20_LABEL_BURNABLE, getCodeIds } from "src/utils"

import { ContractMsgBurn, ContractMsgBurnFrom, ContractMsgInstantiateNoMint } from "./contract-messages";
import { Cw20StandardModule } from "./cw20-standard-module";

export class Cw20BurnableModule extends Cw20StandardModule {

    protected override wrapperMsgInstantiate(
        sender: string,
        codeId: number,
        msg: object,
        funds?: Coin[]
    ): MsgInstantiateContractEncodeObject {
        return {
            typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
            value: MsgInstantiateContract.fromPartial({
                sender: sender,
                admin: sender,
                codeId: codeId,
                label: DEFAULT_CW20_LABEL_BURNABLE,
                msg: toAscii(JSON.stringify(msg)),
                funds: funds
            })
        }
    }

    public override msgInstantiate(
        sender: string,
        chainId: string,
        msg: ContractMsgInstantiateNoMint,
        funds?: Coin[]
    ): MsgInstantiateContractEncodeObject {
        const codeId = getCodeIds(chainId).cw20Burnable
        return this.wrapperMsgInstantiate(sender, codeId, msg, funds)
    }

    public msgBurnFrom(
        sender: string,
        contract: string,
        msg: ContractMsgBurnFrom,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        return this.wrapperMsgExecute(sender, contract, msg, funds)
    }

    public msgBurn(
        sender: string,
        contract: string,
        msg: ContractMsgBurn,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        return this.wrapperMsgExecute(sender, contract, msg, funds)
    }

}
