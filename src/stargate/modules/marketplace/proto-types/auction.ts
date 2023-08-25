/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "./coin";
import { Timestamp } from "cosmjs-types/google/protobuf/timestamp";

export const protobufPackage = "cudoventures.cudosnode.marketplace";

export interface BaseAuction {
  id: Long;
  denomId: string;
  tokenId: string;
  startTime?: Timestamp;
  endTime?: Timestamp;
  creator: string;
}

export interface Bid {
  amount?: Coin;
  bidder: string;
}

export interface EnglishAuction {
  baseAuction?: BaseAuction;
  minPrice?: Coin;
  currentBid?: Bid;
}

export interface DutchAuction {
  baseAuction?: BaseAuction;
  startPrice?: Coin;
  minPrice?: Coin;
  currentPrice?: Coin;
  nextDiscountTime?: Timestamp;
}

function createBaseBaseAuction(): BaseAuction {
  return { id: Long.UZERO, denomId: "", tokenId: "", startTime: undefined, endTime: undefined, creator: "" };
}

export const BaseAuction = {
  encode(message: BaseAuction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.denomId !== "") {
      writer.uint32(18).string(message.denomId);
    }
    if (message.tokenId !== "") {
      writer.uint32(26).string(message.tokenId);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(message.startTime, writer.uint32(34).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(message.endTime, writer.uint32(42).fork()).ldelim();
    }
    if (message.creator !== "") {
      writer.uint32(50).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseAuction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseAuction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.denomId = reader.string();
          break;
        case 3:
          message.tokenId = reader.string();
          break;
        case 4:
          message.startTime = Timestamp.decode(reader, reader.uint32());
          break;
        case 5:
          message.endTime = Timestamp.decode(reader, reader.uint32());
          break;
        case 6:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseAuction {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : "",
    };
  },

  toJSON(message: BaseAuction): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.tokenId !== undefined && (obj.tokenId = message.tokenId);
    message.startTime !== undefined && (obj.startTime = fromTimestamp(message.startTime).toISOString());
    message.endTime !== undefined && (obj.endTime = fromTimestamp(message.endTime).toISOString());
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  create<I extends Exact<DeepPartial<BaseAuction>, I>>(base?: I): BaseAuction {
    return BaseAuction.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BaseAuction>, I>>(object: I): BaseAuction {
    const message = createBaseBaseAuction();
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    message.denomId = object.denomId ?? "";
    message.tokenId = object.tokenId ?? "";
    message.startTime = (object.startTime !== undefined && object.startTime !== null)
      ? Timestamp.fromPartial(object.startTime)
      : undefined;
    message.endTime = (object.endTime !== undefined && object.endTime !== null)
      ? Timestamp.fromPartial(object.endTime)
      : undefined;
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseBid(): Bid {
  return { amount: undefined, bidder: "" };
}

export const Bid = {
  encode(message: Bid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    if (message.bidder !== "") {
      writer.uint32(18).string(message.bidder);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Bid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.bidder = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Bid {
    return {
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      bidder: isSet(object.bidder) ? String(object.bidder) : "",
    };
  },

  toJSON(message: Bid): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.bidder !== undefined && (obj.bidder = message.bidder);
    return obj;
  },

  create<I extends Exact<DeepPartial<Bid>, I>>(base?: I): Bid {
    return Bid.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Bid>, I>>(object: I): Bid {
    const message = createBaseBid();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.bidder = object.bidder ?? "";
    return message;
  },
};

function createBaseEnglishAuction(): EnglishAuction {
  return { baseAuction: undefined, minPrice: undefined, currentBid: undefined };
}

export const EnglishAuction = {
  encode(message: EnglishAuction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseAuction !== undefined) {
      BaseAuction.encode(message.baseAuction, writer.uint32(10).fork()).ldelim();
    }
    if (message.minPrice !== undefined) {
      Coin.encode(message.minPrice, writer.uint32(18).fork()).ldelim();
    }
    if (message.currentBid !== undefined) {
      Bid.encode(message.currentBid, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnglishAuction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnglishAuction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseAuction = BaseAuction.decode(reader, reader.uint32());
          break;
        case 2:
          message.minPrice = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.currentBid = Bid.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EnglishAuction {
    return {
      baseAuction: isSet(object.baseAuction) ? BaseAuction.fromJSON(object.baseAuction) : undefined,
      minPrice: isSet(object.minPrice) ? Coin.fromJSON(object.minPrice) : undefined,
      currentBid: isSet(object.currentBid) ? Bid.fromJSON(object.currentBid) : undefined,
    };
  },

  toJSON(message: EnglishAuction): unknown {
    const obj: any = {};
    message.baseAuction !== undefined &&
      (obj.baseAuction = message.baseAuction ? BaseAuction.toJSON(message.baseAuction) : undefined);
    message.minPrice !== undefined && (obj.minPrice = message.minPrice ? Coin.toJSON(message.minPrice) : undefined);
    message.currentBid !== undefined &&
      (obj.currentBid = message.currentBid ? Bid.toJSON(message.currentBid) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<EnglishAuction>, I>>(base?: I): EnglishAuction {
    return EnglishAuction.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EnglishAuction>, I>>(object: I): EnglishAuction {
    const message = createBaseEnglishAuction();
    message.baseAuction = (object.baseAuction !== undefined && object.baseAuction !== null)
      ? BaseAuction.fromPartial(object.baseAuction)
      : undefined;
    message.minPrice = (object.minPrice !== undefined && object.minPrice !== null)
      ? Coin.fromPartial(object.minPrice)
      : undefined;
    message.currentBid = (object.currentBid !== undefined && object.currentBid !== null)
      ? Bid.fromPartial(object.currentBid)
      : undefined;
    return message;
  },
};

function createBaseDutchAuction(): DutchAuction {
  return {
    baseAuction: undefined,
    startPrice: undefined,
    minPrice: undefined,
    currentPrice: undefined,
    nextDiscountTime: undefined,
  };
}

export const DutchAuction = {
  encode(message: DutchAuction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseAuction !== undefined) {
      BaseAuction.encode(message.baseAuction, writer.uint32(10).fork()).ldelim();
    }
    if (message.startPrice !== undefined) {
      Coin.encode(message.startPrice, writer.uint32(18).fork()).ldelim();
    }
    if (message.minPrice !== undefined) {
      Coin.encode(message.minPrice, writer.uint32(26).fork()).ldelim();
    }
    if (message.currentPrice !== undefined) {
      Coin.encode(message.currentPrice, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextDiscountTime !== undefined) {
      Timestamp.encode(message.nextDiscountTime, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DutchAuction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDutchAuction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseAuction = BaseAuction.decode(reader, reader.uint32());
          break;
        case 2:
          message.startPrice = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.minPrice = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.currentPrice = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.nextDiscountTime = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DutchAuction {
    return {
      baseAuction: isSet(object.baseAuction) ? BaseAuction.fromJSON(object.baseAuction) : undefined,
      startPrice: isSet(object.startPrice) ? Coin.fromJSON(object.startPrice) : undefined,
      minPrice: isSet(object.minPrice) ? Coin.fromJSON(object.minPrice) : undefined,
      currentPrice: isSet(object.currentPrice) ? Coin.fromJSON(object.currentPrice) : undefined,
      nextDiscountTime: isSet(object.nextDiscountTime) ? fromJsonTimestamp(object.nextDiscountTime) : undefined,
    };
  },

  toJSON(message: DutchAuction): unknown {
    const obj: any = {};
    message.baseAuction !== undefined &&
      (obj.baseAuction = message.baseAuction ? BaseAuction.toJSON(message.baseAuction) : undefined);
    message.startPrice !== undefined &&
      (obj.startPrice = message.startPrice ? Coin.toJSON(message.startPrice) : undefined);
    message.minPrice !== undefined && (obj.minPrice = message.minPrice ? Coin.toJSON(message.minPrice) : undefined);
    message.currentPrice !== undefined &&
      (obj.currentPrice = message.currentPrice ? Coin.toJSON(message.currentPrice) : undefined);
    message.nextDiscountTime !== undefined &&
      (obj.nextDiscountTime = fromTimestamp(message.nextDiscountTime).toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<DutchAuction>, I>>(base?: I): DutchAuction {
    return DutchAuction.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DutchAuction>, I>>(object: I): DutchAuction {
    const message = createBaseDutchAuction();
    message.baseAuction = (object.baseAuction !== undefined && object.baseAuction !== null)
      ? BaseAuction.fromPartial(object.baseAuction)
      : undefined;
    message.startPrice = (object.startPrice !== undefined && object.startPrice !== null)
      ? Coin.fromPartial(object.startPrice)
      : undefined;
    message.minPrice = (object.minPrice !== undefined && object.minPrice !== null)
      ? Coin.fromPartial(object.minPrice)
      : undefined;
    message.currentPrice = (object.currentPrice !== undefined && object.currentPrice !== null)
      ? Coin.fromPartial(object.currentPrice)
      : undefined;
    message.nextDiscountTime = (object.nextDiscountTime !== undefined && object.nextDiscountTime !== null)
      ? Timestamp.fromPartial(object.nextDiscountTime)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Timestamp {
  if (o instanceof Date) {
    return toTimestamp(o);
  } else if (typeof o === "string") {
    return toTimestamp(new Date(o));
  } else {
    return Timestamp.fromJSON(o);
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
