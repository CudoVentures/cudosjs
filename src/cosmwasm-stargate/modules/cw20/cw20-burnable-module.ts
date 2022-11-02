import { Coin } from "@cosmjs/amino";
import { MsgExecuteContractEncodeObject, MsgInstantiateContractEncodeObject } from "@cosmjs/cosmwasm-stargate";

import { ContractMsgBurn, ContractMsgBurnFrom, ContractMsgInstantiateNoMint } from "./contract-messages";
import { InstantiateOptions } from "./custom-messages";
import { Cw20StandardModule } from "./cw20-standard-module";

export class Cw20BurnableModule extends Cw20StandardModule {

    public override msgInstantiate(
        sender: string,
        codeId: number,
        msg: ContractMsgInstantiateNoMint,
        options: InstantiateOptions = {}
    ): MsgInstantiateContractEncodeObject {
        // The one who can update marketing info and upload logo is set to sender by default unless passed as null.
        // If null - no one can ever update marketing info and upload logo as the contract allows
        if (msg.marketing && typeof msg.marketing.marketing === 'undefined') {
            msg.marketing.marketing = sender
        }
        return this.wrapperMsgInstantiate(sender, codeId, msg, options)
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
