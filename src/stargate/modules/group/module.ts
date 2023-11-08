import { Coin, EncodeObject } from "@cosmjs/proto-signing";
import { estimateFee, ClientSimulateFn, registerMsgs, ClientRegistry, DEFAULT_GAS_MULTIPLIER } from "../../../utils";
import { GasPrice, StdFee } from "../..";
import { Exec, MsgCreateGroupWithPolicy, MsgSubmitProposal, MsgUpdateGroupMetadata, MsgVote, MsgExec, MsgWithdrawProposal, MsgUpdateGroupMembers, MsgUpdateGroupPolicyMetadata, MsgUpdateGroupPolicyDecisionPolicy } from "./proto-types/tx.pb";
import { ThresholdDecisionPolicy, VoteOption } from "./proto-types/types.pb";
import { msgCreateGroupWithPolicy, msgSubmitProposal, thresholdDecisionPolicy, msgVote, msgExec, msgUpdateGroupMembers, msgUpdateGroupMetadata, msgUpdateGroupPolicyMetadata, msgUpdateGroupPolicyDecisionPolicy, msgWithdrawProposal } from "./types";
import { MsgMultiSend, MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx"


export class GroupModule {
    private readonly _client: ClientSimulateFn

    constructor(client: ClientSimulateFn & ClientRegistry) {
        this._client = client;
        // registerMsgs(client.registry, [
        //     msgCreateGroupWithPolicy,
        //     msgSubmitProposal,
        //     msgVote,
        //     msgExec,
        //     msgWithdrawProposal,
        //     msgUpdateGroupMembers,
        //     msgUpdateGroupMetadata,
        //     msgUpdateGroupPolicyMetadata,
        //     msgUpdateGroupPolicyDecisionPolicy
        // ]);
    }

    public async msgCreateGroupWithPolicy(
        admin: string,
        members: {
            address?: string | undefined;
            weight?: string | undefined;
            metadata?: string | undefined;
        }[],
        groupMetadata: string,
        groupPolicyMetadata: string,
        decisionPolicy: {
            threshold: number,
            votingPeriod: number,
            minExecutionPeriod: number
        },
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const threshold = ThresholdDecisionPolicy.fromPartial({
            threshold: decisionPolicy.threshold.toString(),
            windows: {
                votingPeriod: { seconds: BigInt(decisionPolicy.votingPeriod) },
                minExecutionPeriod: { seconds: BigInt(decisionPolicy.minExecutionPeriod) },
            }
        });

        const msgEncoded = {
            typeUrl: msgCreateGroupWithPolicy.typeUrl,
            value: MsgCreateGroupWithPolicy.fromPartial({
                admin: admin,
                members: members,
                groupMetadata: groupMetadata,
                groupPolicyMetadata: groupPolicyMetadata,
                groupPolicyAsAdmin: true,
                decisionPolicy: {
                    typeUrl: thresholdDecisionPolicy.typeUrl,
                    value: ThresholdDecisionPolicy.encode(threshold).finish()
                },
            }),
        };

        const fee = await estimateFee(this._client, admin, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgSingleSendProposal(
        recipient: string,
        amount: Coin[],
        multisigAddress: string,
        proposer: string,
        proposalMetadata: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const singleSendMsg = MsgSend.fromPartial({
            fromAddress: multisigAddress,
            toAddress: recipient,
            amount: amount
        });

        const msgProposal = {
            typeUrl: msgSubmitProposal.typeUrl,
            value: MsgSubmitProposal.fromPartial({
                groupPolicyAddress: multisigAddress,
                proposers: [proposer],
                metadata: proposalMetadata,
                messages: [{
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: MsgSend.encode(singleSendMsg).finish()
                }],
                title: 'Single Bank Send Proposal',
                summary: `Bank Send to ${recipient}`
            })
        }

        const fee = await estimateFee(this._client, proposer, [msgProposal], gasPrice, gasMultiplier, memo);

        return {
            msg: msgProposal,
            fee: fee
        }
    }

    public async msgMultiSendProposal(
        sender: {
            address: string,
            coins: Coin[]
        }[],
        recipients: {
            address: string,
            coins: Coin[]
        }[],
        multisigAddress: string,
        proposer: string,
        proposalMetadata: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const multisendMsg = MsgMultiSend.fromPartial({
            inputs: sender,
            outputs: recipients,
        });

        const msgProposal = {
            typeUrl: msgSubmitProposal.typeUrl,
            value: MsgSubmitProposal.fromPartial({
                groupPolicyAddress: multisigAddress,
                proposers: [proposer],
                metadata: proposalMetadata,
                messages: [{
                    typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
                    value: MsgMultiSend.encode(multisendMsg).finish()
                }],
                title: 'Multi Bank Send Proposal',
                summary: `Bank Send to Multiple Recipients`
            })
        }

        const fee = await estimateFee(this._client, proposer, [msgProposal], gasPrice, gasMultiplier, memo);

        return {
            msg: msgProposal,
            fee: fee
        }
    }

    public async msgUpdateMembersProposal(
        memberUpdates: {
            address?: string | undefined;
            weight?: string | undefined;
            metadata?: string | undefined;
        }[],
        groupId: number,
        multisigAddress: string,
        proposer: string,
        proposalMetadata: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {

        const msg = MsgUpdateGroupMembers.fromPartial({
            admin: multisigAddress,
            groupId: groupId,
            memberUpdates: memberUpdates
        });

        const msgProposal = {
            typeUrl: msgSubmitProposal.typeUrl,
            value: MsgSubmitProposal.fromPartial({
                groupPolicyAddress: multisigAddress,
                proposers: [proposer],
                metadata: proposalMetadata,
                messages: [{
                    typeUrl: msgUpdateGroupMembers.typeUrl,
                    value: MsgUpdateGroupMembers.encode(msg).finish()
                }],
                title: "Update Group Members Proposal",
                summary: `Proposal to change wallet members`

            })
        }

        const fee = await estimateFee(this._client, proposer, [msgProposal], gasPrice, gasMultiplier, memo);

        return {
            msg: msgProposal,
            fee: fee
        }
    }

    public async msgUpdateGroupMetadata(
        metadata: string,
        groupId: number,
        multisigAddress: string,
        proposer: string,
        proposalMetadata: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msg = MsgUpdateGroupMetadata.fromPartial({
            admin: multisigAddress,
            groupId: groupId,
            metadata: metadata
        });

        const msgProposal = {
            typeUrl: msgSubmitProposal.typeUrl,
            value: MsgSubmitProposal.fromPartial({
                groupPolicyAddress: multisigAddress,
                proposers: [proposer],
                metadata: proposalMetadata,
                messages: [{
                    typeUrl: msgUpdateGroupMetadata.typeUrl,
                    value: MsgUpdateGroupMetadata.encode(msg).finish()
                }],
                title: 'Update Group Metadata Proposal',
                summary: `Proposal to change wallet metadata`
            })
        }

        const fee = await estimateFee(this._client, proposer, [msgProposal], gasPrice, gasMultiplier, memo);

        return {
            msg: msgProposal,
            fee: fee
        }
    }

    public async msgUpdateGroupPolicyMetadata(
        metadata: string,
        multisigAddress: string,
        proposer: string,
        proposalMetadata: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msg = MsgUpdateGroupPolicyMetadata.fromPartial({
            admin: multisigAddress,
            groupPolicyAddress: multisigAddress,
            metadata: metadata
        });

        const msgProposal = {
            typeUrl: msgSubmitProposal.typeUrl,
            value: MsgSubmitProposal.fromPartial({
                groupPolicyAddress: multisigAddress,
                proposers: [proposer],
                metadata: proposalMetadata,
                messages: [{
                    typeUrl: msgUpdateGroupPolicyMetadata.typeUrl,
                    value: MsgUpdateGroupPolicyMetadata.encode(msg).finish()
                }],
                title: 'Update Group Policy Metadata Proposale',
                summary: `Proposal to change wallet policy metadata`
            })
        }

        const fee = await estimateFee(this._client, proposer, [msgProposal], gasPrice, gasMultiplier, memo);

        return {
            msg: msgProposal,
            fee: fee
        }
    }

    public async msgUpdateGroupDecisionPolicy(
        decisionPolicy: {
            threshold: number,
            votingPeriod: number,
            minExecutionPeriod: number
        },
        multisigAddress: string,
        proposer: string,
        proposalMetadata: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const threshold = ThresholdDecisionPolicy.fromPartial({
            threshold: decisionPolicy.threshold.toString(),
            windows: {
                votingPeriod: { seconds: BigInt(decisionPolicy.votingPeriod) },
                minExecutionPeriod: { seconds: BigInt(decisionPolicy.minExecutionPeriod) },
            }
        });

        const msg = MsgUpdateGroupPolicyDecisionPolicy.fromPartial({
            admin: multisigAddress,
            groupPolicyAddress: multisigAddress,
            decisionPolicy: {
                typeUrl: thresholdDecisionPolicy.typeUrl,
                value: ThresholdDecisionPolicy.encode(threshold).finish()
            }
        });

        const msgProposal = {
            typeUrl: msgSubmitProposal.typeUrl,
            value: MsgSubmitProposal.fromPartial({
                groupPolicyAddress: multisigAddress,
                proposers: [proposer],
                metadata: proposalMetadata,
                messages: [{
                    typeUrl: msgUpdateGroupPolicyDecisionPolicy.typeUrl,
                    value: MsgUpdateGroupPolicyDecisionPolicy.encode(msg).finish()
                }],
                title: 'Update Group Decision Policy Proposal',
                summary: `Proposal to change wallet decision policy`
            })
        }

        const fee = await estimateFee(this._client, proposer, [msgProposal], gasPrice, gasMultiplier, memo);

        return {
            msg: msgProposal,
            fee: fee
        }
    }

    public async msgSubmitProposal(
        multisigAddress: string,
        proposer: string,
        proposalMetadata: string,
        messages: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[],
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = "",
        title?: string,
        summary?: string
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgSubmitProposal.typeUrl,
            value: MsgSubmitProposal.fromPartial({
                groupPolicyAddress: multisigAddress,
                proposers: [proposer],
                metadata: proposalMetadata,
                messages: messages,
                title,
                summary
            })
        }

        const fee = await estimateFee(this._client, proposer, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgVote(
        proposalId: number,
        voter: string,
        voteOption: VoteOption,
        metadata: string,
        tryExec: Exec,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {

        const voteMsg = {
            typeUrl: msgVote.typeUrl,
            value: MsgVote.fromPartial({
                proposalId: proposalId,
                voter: voter,
                option: voteOption,
                metadata: metadata,
                exec: tryExec
            })
        }

        const fee = await estimateFee(this._client, voter, [voteMsg], gasPrice, gasMultiplier, memo);

        return {
            msg: voteMsg,
            fee: fee
        }
    }

    public async msgExec(
        proposalId: number,
        signer: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgExec.typeUrl,
            value: MsgExec.fromPartial({
                proposalId: proposalId,
                executor: signer
            })
        }

        const fee = await estimateFee(this._client, signer, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgWithdrawProposal(
        proposalId: number,
        multisigAddress: string,
        signer: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgVote.typeUrl,
            value: MsgWithdrawProposal.fromPartial({
                proposalId: proposalId,
                address: multisigAddress
            })
        }

        const fee = await estimateFee(this._client, signer, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }
}