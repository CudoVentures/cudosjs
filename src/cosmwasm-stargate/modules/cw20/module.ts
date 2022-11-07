import { Coin } from "@cosmjs/amino";
import { toAscii, toBase64 } from "@cosmjs/encoding";
import { MsgExecuteContractEncodeObject, MsgInstantiateContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { MsgExecuteContract, MsgInstantiateContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";

import {
    ContractMsgDecreaseAllowance, ContractMsgIncreaseAllowance, ContractMsgSend, ContractMsgSendFrom,
    ContractMsgTransfer, ContractMsgTransferFrom, ContractMsgUpdateMarketing, ContractMsgUploadLogo,
    ContractMsgInstantiate, ContractMsgMint, ContractMsgUpdateMinter, ContractMsgBurnFrom, ContractMsgBurn
} from "./contract-messages";
import { CustomMsgSend, CustomMsgSendFrom, InstantiateOptions } from "./custom-messages";

export class Cw20Module {

    private wrapperMsgInstantiate(
        sender: string,
        codeId: number,
        msg: ContractMsgInstantiate,
        options: InstantiateOptions
    ): MsgInstantiateContractEncodeObject {
        return {
            typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
            value: MsgInstantiateContract.fromPartial({
                sender: sender,
                admin: options.admin,
                codeId: codeId,
                label: msg.name,
                msg: toAscii(JSON.stringify(msg)),
                funds: options.funds
            })
        }
    }

    private wrapperMsgExecute(
        sender: string,
        contract: string,
        msg: object,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        return {
            typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
            value: MsgExecuteContract.fromPartial({
                sender: sender,
                contract: contract,
                msg: toAscii(JSON.stringify(msg)),
                funds: funds
            })
        }
    }

    public msgInstantiate(
        sender: string,
        codeId: number,
        msg: ContractMsgInstantiate,
        options: InstantiateOptions = {}
    ): MsgInstantiateContractEncodeObject {
        // The one who can update marketing info and upload logo is set to sender by default unless passed as null.
        // If null - no one can ever update marketing info and upload logo as the contract allows
        if (msg.marketing && typeof msg.marketing.marketing === 'undefined') {
            msg.marketing.marketing = sender
        }
        return this.wrapperMsgInstantiate(sender, codeId, msg, options)
    }

    public msgTransfer(
        sender: string,
        contract: string,
        msg: ContractMsgTransfer,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        return this.wrapperMsgExecute(sender, contract, msg, funds)
    }

    public msgSend(
        sender: string,
        contract: string,
        customMsg: CustomMsgSend,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        const msg: ContractMsgSend = {
            send: {
                contract: customMsg.send.contract,
                amount: customMsg.send.amount,
                msg: toBase64(toAscii(JSON.stringify(customMsg.send.msg)))
            }
        }
        return this.wrapperMsgExecute(sender, contract, msg, funds)
    }

    public msgIncreaseAllowance(
        sender: string,
        contract: string,
        msg: ContractMsgIncreaseAllowance,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        return this.wrapperMsgExecute(sender, contract, msg, funds)
    }

    public msgDecreaseAllowance(
        sender: string,
        contract: string,
        msg: ContractMsgDecreaseAllowance,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        return this.wrapperMsgExecute(sender, contract, msg, funds)
    }

    public msgTransferFrom(
        sender: string,
        contract: string,
        msg: ContractMsgTransferFrom,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        return this.wrapperMsgExecute(sender, contract, msg, funds)
    }

    public msgSendFrom(
        sender: string,
        contract: string,
        customMsg: CustomMsgSendFrom,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        const msg: ContractMsgSendFrom = {
            send_from: {
                owner: customMsg.send_from.owner,
                contract: customMsg.send_from.contract,
                amount: customMsg.send_from.amount,
                msg: toBase64(toAscii(JSON.stringify(customMsg.send_from.msg)))
            }
        }
        return this.wrapperMsgExecute(sender, contract, msg, funds)
    }

    public msgUpdateMarketing(
        sender: string,
        contract: string,
        msg: ContractMsgUpdateMarketing,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        return this.wrapperMsgExecute(sender, contract, msg, funds)
    }

    public msgUploadLogo(
        sender: string,
        contract: string,
        msg: ContractMsgUploadLogo,
        funds?: Coin[]
    ): MsgExecuteContractEncodeObject {
        return this.wrapperMsgExecute(sender, contract, msg, funds)
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
