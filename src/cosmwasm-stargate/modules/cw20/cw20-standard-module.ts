import { Coin } from "@cosmjs/amino";
import { toAscii, toBase64 } from "@cosmjs/encoding";
import { MsgExecuteContractEncodeObject, MsgInstantiateContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { MsgExecuteContract, MsgInstantiateContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";

import { DEFAULT_CW20_LABEL_STANDARD, getCodeIds } from "../../../utils";
import {
    ContractMsgDecreaseAllowance, ContractMsgIncreaseAllowance, ContractMsgSend, ContractMsgSendFrom,
    ContractMsgTransfer, ContractMsgTransferFrom, ContractMsgUpdateMarketing, ContractMsgUploadLogo,
    ContractMsgInstantiateNoMint
} from "./contract-messages";
import { CustomMsgSend, CustomMsgSendFrom, InstantiateOptions } from "./custom-messages";

export class Cw20StandardModule {

    protected wrapperMsgInstantiate(
        sender: string,
        codeId: number,
        msg: object,
        label: string,
        options: InstantiateOptions
    ): MsgInstantiateContractEncodeObject {
        return {
            typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
            value: MsgInstantiateContract.fromPartial({
                sender: sender,
                admin: options.admin,
                codeId: codeId,
                label: label,
                msg: toAscii(JSON.stringify(msg)),
                funds: options.funds
            })
        }
    }

    protected wrapperMsgExecute(
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
        chainId: string,
        msg: ContractMsgInstantiateNoMint,
        options: InstantiateOptions = {}
    ): MsgInstantiateContractEncodeObject {
        const codeId = getCodeIds(chainId).cw20Standard
        return this.wrapperMsgInstantiate(sender, codeId, msg, DEFAULT_CW20_LABEL_STANDARD, options)
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
}
