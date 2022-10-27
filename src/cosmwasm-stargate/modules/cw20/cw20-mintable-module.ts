import { Coin } from "@cosmjs/amino";
import { MsgExecuteContractEncodeObject, MsgInstantiateContractEncodeObject } from "@cosmjs/cosmwasm-stargate";

import { DEFAULT_CW20_LABEL_MINTABLE, getCodeIds } from "../../../utils";
import { ContractMsgInstantiate, ContractMsgMint, ContractMsgUpdateMinter } from "./contract-messages";
import { InstantiateOptions } from "./custom-messages";
import { Cw20StandardModule } from "./cw20-standard-module";

export class Cw20MintableModule extends Cw20StandardModule {

    public override msgInstantiate(
        sender: string,
        chainId: string,
        msg: ContractMsgInstantiate,
        options: InstantiateOptions = {}
    ): MsgInstantiateContractEncodeObject {
        // The one who can update marketing info and upload logo is set to sender by default unless passed as null.
        // If null - no one can ever update marketing info and upload logo as the contract allows
        if (msg.marketing && typeof msg.marketing.marketing === 'undefined') {
            msg.marketing.marketing = sender
        }
        const codeId = getCodeIds(chainId).cw20Mintable
        return this.wrapperMsgInstantiate(sender, codeId, msg, DEFAULT_CW20_LABEL_MINTABLE, options)
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
