import {
    Coin, MsgExecuteContractEncodeObject, MsgInstantiateContract, MsgInstantiateContractEncodeObject, toAscii
} from "src";
import { DEFAULT_CW20_LABEL_UNLIMITED, getCodeIds } from "src/utils"

import { ContractMsgInstantiate, ContractMsgMint, ContractMsgUpdateMinter } from "./contract-messages";
import { Cw20BurnableModule } from "./cw20-burnable-module";

export class Cw20UnlimitedModule extends Cw20BurnableModule {

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
                label: DEFAULT_CW20_LABEL_UNLIMITED,
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
        const codeId = getCodeIds(chainId).cw20Unlimited
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
