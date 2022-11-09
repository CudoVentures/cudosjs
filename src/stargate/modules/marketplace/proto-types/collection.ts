/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Royalty } from "./royalty";

export const protobufPackage = "cudoventures.cudosnode.marketplace";

/** Collection listed for sale in the marketplace */
export interface Collection {
  id: Long;
  denomId: string;
  mintRoyalties: Royalty[];
  resaleRoyalties: Royalty[];
  verified: boolean;
  owner: string;
}

function createBaseCollection(): Collection {
  return { id: Long.UZERO, denomId: "", mintRoyalties: [], resaleRoyalties: [], verified: false, owner: "" };
}

export const Collection = {
  encode(message: Collection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.denomId !== "") {
      writer.uint32(18).string(message.denomId);
    }
    for (const v of message.mintRoyalties) {
      Royalty.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.resaleRoyalties) {
      Royalty.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.verified === true) {
      writer.uint32(40).bool(message.verified);
    }
    if (message.owner !== "") {
      writer.uint32(50).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Collection {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCollection();
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
          message.mintRoyalties.push(Royalty.decode(reader, reader.uint32()));
          break;
        case 4:
          message.resaleRoyalties.push(Royalty.decode(reader, reader.uint32()));
          break;
        case 5:
          message.verified = reader.bool();
          break;
        case 6:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Collection {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      mintRoyalties: Array.isArray(object?.mintRoyalties)
        ? object.mintRoyalties.map((e: any) => Royalty.fromJSON(e))
        : [],
      resaleRoyalties: Array.isArray(object?.resaleRoyalties)
        ? object.resaleRoyalties.map((e: any) => Royalty.fromJSON(e))
        : [],
      verified: isSet(object.verified) ? Boolean(object.verified) : false,
      owner: isSet(object.owner) ? String(object.owner) : "",
    };
  },

  toJSON(message: Collection): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    message.denomId !== undefined && (obj.denomId = message.denomId);
    if (message.mintRoyalties) {
      obj.mintRoyalties = message.mintRoyalties.map((e) => (e ? Royalty.toJSON(e) : undefined));
    } else {
      obj.mintRoyalties = [];
    }
    if (message.resaleRoyalties) {
      obj.resaleRoyalties = message.resaleRoyalties.map((e) => (e ? Royalty.toJSON(e) : undefined));
    } else {
      obj.resaleRoyalties = [];
    }
    message.verified !== undefined && (obj.verified = message.verified);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Collection>, I>>(object: I): Collection {
    const message = createBaseCollection();
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    message.denomId = object.denomId ?? "";
    message.mintRoyalties = object.mintRoyalties?.map((e) => Royalty.fromPartial(e)) || [];
    message.resaleRoyalties = object.resaleRoyalties?.map((e) => Royalty.fromPartial(e)) || [];
    message.verified = object.verified ?? false;
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
