import { Any } from "cosmjs-types/google/protobuf/any";
import { EnglishAuction, DutchAuction } from "./proto-types/auction";
import { Coin } from "./proto-types/coin";
import { dutchAuction, englishAuction } from "./types";

export type EnglishAuctionRequest = {
    minPrice: Coin;
};

export type DutchAuctionRequest = {
    startPrice: Coin;
    minPrice: Coin;
};

export function encodeAuction(auctionReq: EnglishAuctionRequest | DutchAuctionRequest): Any {
    if ("startPrice" in auctionReq) {
        return {
            typeUrl: dutchAuction.typeUrl,
            value: DutchAuction.encode(DutchAuction.fromPartial({
                minPrice: auctionReq.minPrice,
                startPrice: auctionReq.startPrice,
            })).finish()
        };
    } else {
        return {
            typeUrl: englishAuction.typeUrl,
            value: EnglishAuction.encode(EnglishAuction.fromPartial({
                minPrice: auctionReq.minPrice,
            })).finish()
        };
    }
}
