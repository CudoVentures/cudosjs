/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cudoventures.cudosnode.addressbook";

export interface MsgCreateAddress {
  creator: string;
  network: string;
  label: string;
  value: string;
}

export interface MsgCreateAddressResponse {}

export interface MsgUpdateAddress {
  creator: string;
  network: string;
  label: string;
  value: string;
}

export interface MsgUpdateAddressResponse {}

export interface MsgDeleteAddress {
  creator: string;
  network: string;
  label: string;
}

export interface MsgDeleteAddressResponse {}

function createBaseMsgCreateAddress(): MsgCreateAddress {
  return { creator: "", network: "", label: "", value: "" };
}

export const MsgCreateAddress = {
  encode(message: MsgCreateAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.network !== "") {
      writer.uint32(18).string(message.network);
    }
    if (message.label !== "") {
      writer.uint32(26).string(message.label);
    }
    if (message.value !== "") {
      writer.uint32(34).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.network = reader.string();
          break;
        case 3:
          message.label = reader.string();
          break;
        case 4:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateAddress {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      network: isSet(object.network) ? String(object.network) : "",
      label: isSet(object.label) ? String(object.label) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: MsgCreateAddress): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.network !== undefined && (obj.network = message.network);
    message.label !== undefined && (obj.label = message.label);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateAddress>, I>>(object: I): MsgCreateAddress {
    const message = createBaseMsgCreateAddress();
    message.creator = object.creator ?? "";
    message.network = object.network ?? "";
    message.label = object.label ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseMsgCreateAddressResponse(): MsgCreateAddressResponse {
  return {};
}

export const MsgCreateAddressResponse = {
  encode(_: MsgCreateAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateAddressResponse {
    return {};
  },

  toJSON(_: MsgCreateAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateAddressResponse>, I>>(_: I): MsgCreateAddressResponse {
    const message = createBaseMsgCreateAddressResponse();
    return message;
  },
};

function createBaseMsgUpdateAddress(): MsgUpdateAddress {
  return { creator: "", network: "", label: "", value: "" };
}

export const MsgUpdateAddress = {
  encode(message: MsgUpdateAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.network !== "") {
      writer.uint32(18).string(message.network);
    }
    if (message.label !== "") {
      writer.uint32(26).string(message.label);
    }
    if (message.value !== "") {
      writer.uint32(34).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.network = reader.string();
          break;
        case 3:
          message.label = reader.string();
          break;
        case 4:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateAddress {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      network: isSet(object.network) ? String(object.network) : "",
      label: isSet(object.label) ? String(object.label) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: MsgUpdateAddress): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.network !== undefined && (obj.network = message.network);
    message.label !== undefined && (obj.label = message.label);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateAddress>, I>>(object: I): MsgUpdateAddress {
    const message = createBaseMsgUpdateAddress();
    message.creator = object.creator ?? "";
    message.network = object.network ?? "";
    message.label = object.label ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseMsgUpdateAddressResponse(): MsgUpdateAddressResponse {
  return {};
}

export const MsgUpdateAddressResponse = {
  encode(_: MsgUpdateAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateAddressResponse {
    return {};
  },

  toJSON(_: MsgUpdateAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateAddressResponse>, I>>(_: I): MsgUpdateAddressResponse {
    const message = createBaseMsgUpdateAddressResponse();
    return message;
  },
};

function createBaseMsgDeleteAddress(): MsgDeleteAddress {
  return { creator: "", network: "", label: "" };
}

export const MsgDeleteAddress = {
  encode(message: MsgDeleteAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.network !== "") {
      writer.uint32(18).string(message.network);
    }
    if (message.label !== "") {
      writer.uint32(26).string(message.label);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.network = reader.string();
          break;
        case 3:
          message.label = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteAddress {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      network: isSet(object.network) ? String(object.network) : "",
      label: isSet(object.label) ? String(object.label) : "",
    };
  },

  toJSON(message: MsgDeleteAddress): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.network !== undefined && (obj.network = message.network);
    message.label !== undefined && (obj.label = message.label);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteAddress>, I>>(object: I): MsgDeleteAddress {
    const message = createBaseMsgDeleteAddress();
    message.creator = object.creator ?? "";
    message.network = object.network ?? "";
    message.label = object.label ?? "";
    return message;
  },
};

function createBaseMsgDeleteAddressResponse(): MsgDeleteAddressResponse {
  return {};
}

export const MsgDeleteAddressResponse = {
  encode(_: MsgDeleteAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteAddressResponse {
    return {};
  },

  toJSON(_: MsgDeleteAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteAddressResponse>, I>>(_: I): MsgDeleteAddressResponse {
    const message = createBaseMsgDeleteAddressResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateAddress(request: MsgCreateAddress): Promise<MsgCreateAddressResponse>;
  UpdateAddress(request: MsgUpdateAddress): Promise<MsgUpdateAddressResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  DeleteAddress(request: MsgDeleteAddress): Promise<MsgDeleteAddressResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "cudoventures.cudosnode.addressbook.Msg";
    this.rpc = rpc;
    this.CreateAddress = this.CreateAddress.bind(this);
    this.UpdateAddress = this.UpdateAddress.bind(this);
    this.DeleteAddress = this.DeleteAddress.bind(this);
  }
  CreateAddress(request: MsgCreateAddress): Promise<MsgCreateAddressResponse> {
    const data = MsgCreateAddress.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateAddress", data);
    return promise.then((data) => MsgCreateAddressResponse.decode(new _m0.Reader(data)));
  }

  UpdateAddress(request: MsgUpdateAddress): Promise<MsgUpdateAddressResponse> {
    const data = MsgUpdateAddress.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateAddress", data);
    return promise.then((data) => MsgUpdateAddressResponse.decode(new _m0.Reader(data)));
  }

  DeleteAddress(request: MsgDeleteAddress): Promise<MsgDeleteAddressResponse> {
    const data = MsgDeleteAddress.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteAddress", data);
    return promise.then((data) => MsgDeleteAddressResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
