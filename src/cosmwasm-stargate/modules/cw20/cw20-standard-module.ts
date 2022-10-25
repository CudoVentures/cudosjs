import {
    Coin, MsgExecuteContract, MsgExecuteContractEncodeObject, MsgInstantiateContract,
    MsgInstantiateContractEncodeObject, toAscii, toBase64
} from "src";
import { DEFAULT_CW20_LABEL_STANDARD, getCodeIds } from "src/utils"

import {
    ContractMsgDecreaseAllowance, ContractMsgIncreaseAllowance, ContractMsgSend, ContractMsgSendFrom,
    ContractMsgTransfer, ContractMsgTransferFrom, ContractMsgUpdateMarketing, ContractMsgUploadLogo,
    ContractMsgInstantiateNoMint
} from "./contract-messages";
import { CustomMsgSend, CustomMsgSendFrom } from "./custom-messages";

export class Cw20StandardModule {

    protected wrapperMsgInstantiate(
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
                label: DEFAULT_CW20_LABEL_STANDARD,
                msg: toAscii(JSON.stringify(msg)),
                funds: funds
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
        funds?: Coin[]
    ): MsgInstantiateContractEncodeObject {
        const codeId = getCodeIds(chainId).cw20Standard
        return this.wrapperMsgInstantiate(sender, codeId, msg, funds)
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
