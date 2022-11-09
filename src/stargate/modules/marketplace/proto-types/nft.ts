/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from './coin';

export const protobufPackage = "cudoventures.cudosnode.marketplace";

/** NFT listed for sale in the marketplace */
export interface Nft {
  id: Long;
  tokenId: string;
  denomId: string;
  price?: Coin;
  owner: string;
}

function createBaseNft(): Nft {
  return { id: Long.UZERO, tokenId: "", denomId: "", price: undefined, owner: "" };
}

export const Nft = {
  encode(message: Nft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.tokenId !== "") {
      writer.uint32(18).string(message.tokenId);
    }
    if (message.denomId !== "") {
      writer.uint32(26).string(message.denomId);
    }
    if (message.price !== undefined) {
      Coin.encode(message.price, writer.uint32(34).fork()).ldelim();
    }
    if (message.owner !== "") {
      writer.uint32(42).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Nft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.tokenId = reader.string();
          break;
        case 3:
          message.denomId = reader.string();
          break;
        case 4:
          message.price = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Nft {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      price: isSet(object.price) ? Coin.fromJSON(object.price) : undefined,
      owner: isSet(object.owner) ? String(object.owner) : "",
    };
  },

  toJSON(message: Nft): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    message.tokenId !== undefined && (obj.tokenId = message.tokenId);
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.price !== undefined && (obj.price = message.price ? Coin.toJSON(message.price) : undefined);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Nft>, I>>(object: I): Nft {
    const message = createBaseNft();
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    message.tokenId = object.tokenId ?? "";
    message.denomId = object.denomId ?? "";
    message.price =
      object.price !== undefined && object.price !== null ? Coin.fromPartial(object.price) : undefined;
    message.owner = object.owner ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
