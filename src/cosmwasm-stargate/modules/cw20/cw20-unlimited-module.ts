import {  Coin, MsgExecuteContractEncodeObject, MsgInstantiateContractEncodeObject } from "src";
import { DEFAULT_CW20_LABEL_UNLIMITED, getCodeIds } from "src/utils"

import { ContractMsgInstantiate, ContractMsgMint, ContractMsgUpdateMinter } from "./contract-messages";
import { InstantiateOptions } from "./custom-messages";
import { Cw20BurnableModule } from "./cw20-burnable-module";

export class Cw20UnlimitedModule extends Cw20BurnableModule {

    public override msgInstantiate(
        sender: string,
        chainId: string,
        msg: ContractMsgInstantiate,
        options: InstantiateOptions
    ): MsgInstantiateContractEncodeObject {
        const codeId = getCodeIds(chainId).cw20Unlimited
        return this.wrapperMsgInstantiate(sender, codeId, msg, DEFAULT_CW20_LABEL_UNLIMITED, options)
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
