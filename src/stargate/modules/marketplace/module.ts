import { Coin, EncodeObject } from '@cosmjs/proto-signing';
import { estimateFee, ClientSimulateFn, registerMsgs, ClientRegistry, DEFAULT_GAS_MULTIPLIER } from '../../../utils';
import { GasPrice, StdFee } from '../..';

import { msgCreateCollection, msgPublishCollection, msgBuyNft, msgPublishNft, msgMintNft,
        msgRemoveNft, msgUpdatePrice, msgUpdateRoyalties, msgVerifyCollection, msgUnverifyCollection,
        msgAddAdmin, msgRemoveAdmin } from './types';

import { MsgCreateCollection, MsgPublishCollection, MsgPublishNft,
        MsgBuyNft, MsgUpdateRoyalties, MsgUpdatePrice,
        MsgRemoveNft, MsgVerifyCollection, MsgUnverifyCollection,
        MsgMintNft, MsgAddAdmin, MsgRemoveAdmin } from './proto-types/tx';

import { Royalty } from './proto-types/royalty';
import { msgPublishAuction, msgPlaceBid, msgAcceptBid } from './types';
import { Duration } from 'cosmjs-types/google/protobuf/duration';
import { MsgPublishAuction, MsgPlaceBid, MsgAcceptBid } from './proto-types/tx';
import { encodeAuction, EnglishAuctionRequest, DutchAuctionRequest } from './auctions';

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
            msgAddAdmin,
            msgRemoveAdmin,
            msgPublishAuction,
            msgPlaceBid,
            msgAcceptBid
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

    public async msgAddAdmin(
        creator: string,
        address: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {

        const msgEncoded = {
            typeUrl: msgAddAdmin.typeUrl,
            value: MsgAddAdmin.fromPartial({
                creator: creator,
                address: address
            })
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgRemoveAdmin(
        creator: string,
        address: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {

        const msgEncoded = {
            typeUrl: msgRemoveAdmin.typeUrl,
            value: MsgRemoveAdmin.fromPartial({
                creator: creator,
                address: address
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

    public async msgPublishAuction(
        creator: string,
        tokenId: string,
        denomId: string,
        duration: Duration,
        auction: EnglishAuctionRequest | DutchAuctionRequest,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject; fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgPublishAuction.typeUrl,
            value: MsgPublishAuction.fromPartial({
                creator: creator,
                denomId: denomId,
                tokenId: tokenId,
                duration: duration,
                auction: encodeAuction(auction)
            })
        };

        const fee = await estimateFee(this._client, creator, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        };
    }

    public async msgPlaceBid(
        bidder: string,
        auctionId: string,
        amount: Coin,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject; fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgPlaceBid.typeUrl,
            value: MsgPlaceBid.fromPartial({
                bidder: bidder,
                auctionId: auctionId,
                amount: amount
            })
        };

        const fee = await estimateFee(this._client, bidder, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        };
    }

    public async msgAcceptBid(
        sender: string,
        auctionId: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject; fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgAcceptBid.typeUrl,
            value: MsgAcceptBid.fromPartial({
                sender: sender,
                auctionId: auctionId
            })
        };

        const fee = await estimateFee(this._client, sender, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee,
        };
    }
}
