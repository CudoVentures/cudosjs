import { EncodeObject } from '@cosmjs/proto-signing';
import { estimateFee, ClientSimulateFn, registerMsgs, ClientRegistry, DEFAULT_GAS_MULTIPLIER } from '../../../utils';
import { GasPrice, StdFee } from '../..';

import { msgCreateAddress, msgUpdateAddress, msgDeleteAddress } from './types';

import { MsgCreateAddress, MsgUpdateAddress, MsgDeleteAddress } from './proto-types/tx';


export class AddressbookModule {
    private readonly _client: ClientSimulateFn;

    constructor(client: ClientSimulateFn & ClientRegistry) {
        this._client = client;
        registerMsgs(client.registry, [
            msgCreateAddress,
            msgUpdateAddress,
            msgDeleteAddress
        ]);
    }

    public async msgCreateAddress(
        creator: string,
        network: string,
        label: string,
        value: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgCreateAddress.typeUrl,
            value: MsgCreateAddress.fromPartial({
                creator: creator,
                network: network,
                label: label,
                value: value
            }),
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgUpdateAddress(
        creator: string,
        network: string,
        label: string,
        value: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgUpdateAddress.typeUrl,
            value: MsgUpdateAddress.fromPartial({
                creator: creator,
                network: network,
                label: label,
                value: value
            }),
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgDeleteAddress(
        creator: string,
        network: string,
        label: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgDeleteAddress.typeUrl,
            value: MsgDeleteAddress.fromPartial({
                creator: creator,
                network: network,
                label: label
            }),
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }
}