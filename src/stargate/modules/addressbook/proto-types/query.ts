/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";
import { Address } from "./address";
import { Params } from "./params";

export const protobufPackage = "cudoventures.cudosnode.addressbook";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: Params;
}

export interface QueryGetAddressRequest {
  creator: string;
  network: string;
  label: string;
}

export interface QueryGetAddressResponse {
  address?: Address;
}

export interface QueryAllAddressRequest {
  pagination?: PageRequest;
}

export interface QueryAllAddressResponse {
  address: Address[];
  pagination?: PageResponse;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
};

function createBaseQueryGetAddressRequest(): QueryGetAddressRequest {
  return { creator: "", network: "", label: "" };
}

export const QueryGetAddressRequest = {
  encode(message: QueryGetAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAddressRequest();
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

  fromJSON(object: any): QueryGetAddressRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      network: isSet(object.network) ? String(object.network) : "",
      label: isSet(object.label) ? String(object.label) : "",
    };
  },

  toJSON(message: QueryGetAddressRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.network !== undefined && (obj.network = message.network);
    message.label !== undefined && (obj.label = message.label);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAddressRequest>, I>>(object: I): QueryGetAddressRequest {
    const message = createBaseQueryGetAddressRequest();
    message.creator = object.creator ?? "";
    message.network = object.network ?? "";
    message.label = object.label ?? "";
    return message;
  },
};

function createBaseQueryGetAddressResponse(): QueryGetAddressResponse {
  return { address: undefined };
}

export const QueryGetAddressResponse = {
  encode(message: QueryGetAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = Address.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAddressResponse {
    return { address: isSet(object.address) ? Address.fromJSON(object.address) : undefined };
  },

  toJSON(message: QueryGetAddressResponse): unknown {
    const obj: any = {};
    message.address !== undefined &&
      (obj.address = message.address ? Address.toJSON(message.address) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAddressResponse>, I>>(object: I): QueryGetAddressResponse {
    const message = createBaseQueryGetAddressResponse();
    message.address =
      object.address !== undefined && object.address !== null
        ? Address.fromPartial(object.address)
        : undefined;
    return message;
  },
};

function createBaseQueryAllAddressRequest(): QueryAllAddressRequest {
  return { pagination: undefined };
}

export const QueryAllAddressRequest = {
  encode(message: QueryAllAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAddressRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllAddressRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAddressRequest>, I>>(object: I): QueryAllAddressRequest {
    const message = createBaseQueryAllAddressRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryAllAddressResponse(): QueryAllAddressResponse {
  return { address: [], pagination: undefined };
}

export const QueryAllAddressResponse = {
  encode(message: QueryAllAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.address) {
      Address.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address.push(Address.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAddressResponse {
    return {
      address: Array.isArray(object?.address) ? object.address.map((e: any) => Address.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllAddressResponse): unknown {
    const obj: any = {};
    if (message.address) {
      obj.address = message.address.map((e) => (e ? Address.toJSON(e) : undefined));
    } else {
      obj.address = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAddressResponse>, I>>(object: I): QueryAllAddressResponse {
    const message = createBaseQueryAllAddressResponse();
    message.address = object.address?.map((e) => Address.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Address by owner, network and label. */
  Address(request: QueryGetAddressRequest): Promise<QueryGetAddressResponse>;
  /** Queries a list of Address items. */
  AddressAll(request: QueryAllAddressRequest): Promise<QueryAllAddressResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "cudoventures.cudosnode.addressbook.Query";
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Address = this.Address.bind(this);
    this.AddressAll = this.AddressAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Address(request: QueryGetAddressRequest): Promise<QueryGetAddressResponse> {
    const data = QueryGetAddressRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Address", data);
    return promise.then((data) => QueryGetAddressResponse.decode(new _m0.Reader(data)));
  }

  AddressAll(request: QueryAllAddressRequest): Promise<QueryAllAddressResponse> {
    const data = QueryAllAddressRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddressAll", data);
    return promise.then((data) => QueryAllAddressResponse.decode(new _m0.Reader(data)));
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
