import { Coin } from "@cosmjs/amino";
import { MsgExecuteContractEncodeObject, MsgInstantiateContractEncodeObject } from "@cosmjs/cosmwasm-stargate";

import { DEFAULT_CW20_LABEL_BURNABLE, getCodeIds } from "../../../utils";
import { ContractMsgBurn, ContractMsgBurnFrom, ContractMsgInstantiateNoMint } from "./contract-messages";
import { InstantiateOptions } from "./custom-messages";
import { Cw20StandardModule } from "./cw20-standard-module";

export class Cw20BurnableModule extends Cw20StandardModule {

    public override msgInstantiate(
        sender: string,
        chainId: string,
        msg: ContractMsgInstantiateNoMint,
        options: InstantiateOptions
    ): MsgInstantiateContractEncodeObject {
        const codeId = getCodeIds(chainId).cw20Burnable
        return this.wrapperMsgInstantiate(sender, codeId, msg, DEFAULT_CW20_LABEL_BURNABLE, options)
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
