import { Coin, EncodeObject } from '@cosmjs/proto-signing';
import { estimateFee, ClientSimulateFn, registerMsgs, ClientRegistry, DEFAULT_GAS_MULTIPLIER } from '../../../utils';
import { GasPrice, StdFee } from '../..';

import { msgCreateCollection, msgPublishCollection, msgBuyNft, msgPublishNft, msgMintNft,
        msgRemoveNft, msgUpdatePrice, msgUpdateRoyalties, msgVerifyCollection, msgUnverifyCollection,
        msgTransferAdminPermission } from './types';

import { MsgCreateCollection, MsgPublishCollection, MsgPublishNft,
        MsgBuyNft, MsgUpdateRoyalties, MsgUpdatePrice,
        MsgRemoveNft, MsgVerifyCollection, MsgUnverifyCollection,
        MsgMintNft, MsgTransferAdminPermission } from './proto-types/tx';

import { Royalty } from './proto-types/royalty';


export class MarketplaceModule {
    private readonly _client: ClientSimulateFn;

    constructor(client: ClientSimulateFn & ClientRegistry) {
        this._client = client;
        registerMsgs(client.registry, [
            msgCreateCollection,
            msgPublishCollection,
            msgBuyNft,
            msgPublishNft,
            msgMintNft,
            msgRemoveNft,
            msgUpdatePrice,
            msgUpdateRoyalties,
            msgVerifyCollection,
            msgUnverifyCollection,
            msgTransferAdminPermission
        ]);
    }

    public async msgCreateCollection(
        creator: string,
        id: string,
        name: string,
        schema: string,
        symbol: string,
        traits: string,
        description: string,
        minter: string,
        data: string,
        mintRoyalties: Royalty[],
        resaleRoyalties: Royalty[],
        verified: boolean,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgCreateCollection.typeUrl,
            value: MsgCreateCollection.fromPartial({
                creator: creator,
                id: id,
                name: name,
                schema: schema,
                symbol: symbol,
                traits: traits,
                description: description,
                minter: minter,
                data: data,
                mintRoyalties: mintRoyalties,
                resaleRoyalties: resaleRoyalties,
                verified: verified
            }),
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgPublishCollection(
        creator: string,
        denomId: string,
        mintRoyalties: Royalty[],
        resaleRoyalties: Royalty[],
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgPublishCollection.typeUrl,
            value: MsgPublishCollection.fromPartial({
                creator: creator,
                denomId: denomId,
                mintRoyalties: mintRoyalties,
                resaleRoyalties: resaleRoyalties
            }),
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgPublishNft(
        creator: string,
        tokenId: string,
        denomId: string,
        price: Coin,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {

        const msgEncoded = {
            typeUrl: msgPublishNft.typeUrl,
            value: MsgPublishNft.fromPartial({
                creator: creator,
                tokenId: tokenId,
                denomId: denomId,
                price: price
            }),
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgBuyNft(
        creator: string,
        id: Long,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {

        const msgEncoded = {
            typeUrl: msgBuyNft.typeUrl,
            value: MsgBuyNft.fromPartial({
                creator: creator,
                id: id
            }),
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgMintNft(
        creator: string,
        denomId: string,
        recipient: string,
        price: Coin,
        name: string,
        uri: string,
        data: string,
        uid: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {

        const msgEncoded = {
            typeUrl: msgMintNft.typeUrl,
            value: MsgMintNft.fromPartial({
                creator: creator,
                denomId: denomId,
                recipient: recipient,
                price: price,
                name: name,
                uri: uri,
                data: data,
                uid: uid
            }),
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgRemoveNft(
        creator: string,
        id: Long,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {

        const msgEncoded = {
            typeUrl: msgRemoveNft.typeUrl,
            value: MsgRemoveNft.fromPartial({
                creator: creator,
                id: id
            }),
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgVerifyCollection(
        creator: string,
        id: Long,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        
        const msgEncoded = {
            typeUrl: msgVerifyCollection.typeUrl,
            value: MsgVerifyCollection.fromPartial({
                creator: creator,
                id: id
            })
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgUnverifyCollection(
        creator: string,
        id: Long,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        
        const msgEncoded = {
            typeUrl: msgUnverifyCollection.typeUrl,
            value: MsgUnverifyCollection.fromPartial({
                creator: creator,
                id: id
            })
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgTransferAdminPermission(
        creator: string,
        newAdmin: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {

        const msgEncoded = {
            typeUrl: msgTransferAdminPermission.typeUrl,
            value: MsgTransferAdminPermission.fromPartial({
                creator: creator,
                newAdmin: newAdmin
            })
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgUpdateRoyalties(
        creator: string,
        id: Long,
        mintRoyalties: Royalty[],
        resaleRoyalties: Royalty[],
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {

        const msgEncoded = {
            typeUrl: msgUpdateRoyalties.typeUrl,
            value: MsgUpdateRoyalties.fromPartial({
                creator: creator,
                id: id,
                mintRoyalties: mintRoyalties,
                resaleRoyalties: resaleRoyalties
            })
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgUpdatePrice(
        creator: string,
        id: Long,
        price: Coin,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {

        const msgEncoded = {
            typeUrl: msgUpdatePrice.typeUrl,
            value: MsgUpdatePrice.fromPartial({
                creator: creator,
                id: id,
                price: price
            })
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }
}