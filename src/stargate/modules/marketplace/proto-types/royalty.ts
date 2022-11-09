/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cudoventures.cudosnode.marketplace";

export interface Royalty {
  address: string;
  percent: string;
}

function createBaseRoyalty(): Royalty {
  return { address: "", percent: "" };
}

export const Royalty = {
  encode(message: Royalty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.percent !== "") {
      writer.uint32(18).string(message.percent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Royalty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoyalty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.percent = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Royalty {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      percent: isSet(object.percent) ? String(object.percent) : "",
    };
  },

  toJSON(message: Royalty): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.percent !== undefined && (obj.percent = message.percent);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Royalty>, I>>(object: I): Royalty {
    const message = createBaseRoyalty();
    message.address = object.address ?? "";
    message.percent = object.percent ?? "";
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
