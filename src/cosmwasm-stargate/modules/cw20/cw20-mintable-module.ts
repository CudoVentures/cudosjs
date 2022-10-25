import {
    Coin, MsgExecuteContractEncodeObject, MsgInstantiateContract, MsgInstantiateContractEncodeObject, toAscii
} from "src";
import { DEFAULT_CW20_LABEL_MINTABLE, getCodeIds } from "src/utils"

import { ContractMsgInstantiate, ContractMsgMint, ContractMsgUpdateMinter } from "./contract-messages";
import { Cw20StandardModule } from "./cw20-standard-module";

export class Cw20MintableModule extends Cw20StandardModule {

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
                label: DEFAULT_CW20_LABEL_MINTABLE,
                msg: toAscii(JSON.stringify(msg)),
                funds: funds
            })
        }
    }

    public override msgInstantiate(
        sender: string,
        chainId: string,
        msg: ContractMsgInstantiate,
        funds?: Coin[]
    ): MsgInstantiateContractEncodeObject {
        const codeId = getCodeIds(chainId).cw20Mintable
        return this.wrapperMsgInstantiate(sender, codeId, msg, funds)
    }

    public msgMint(
        sender: string,
        contract: string,
        msg: ContractMsgMint,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        return this.wrapperMsgExecute(sender, contract, msg, funds)
    }

    public msgUpdateMinter(
        sender: string,
        contract: string,
        msg: ContractMsgUpdateMinter,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        return this.wrapperMsgExecute(sender, contract, msg, funds)
    }

}
