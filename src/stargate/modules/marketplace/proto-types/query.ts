/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { Collection } from "./collection";
import { Nft } from "./nft";
import { Params } from "./params";

export const protobufPackage = "cudoventures.cudosnode.marketplace";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: Params;
}

export interface QueryGetCollectionRequest {
  id: Long;
}

export interface QueryGetCollectionResponse {
  Collection?: Collection;
}

export interface QueryAllCollectionRequest {
  pagination?: PageRequest;
}

export interface QueryAllCollectionResponse {
  Collection: Collection[];
  pagination?: PageResponse;
}

export interface QueryGetNftRequest {
  id: Long;
}

export interface QueryGetNftResponse {
  Nft?: Nft;
}

export interface QueryAllNftRequest {
  pagination?: PageRequest;
}

export interface QueryAllNftResponse {
  Nft: Nft[];
  pagination?: PageResponse;
}

export interface QueryCollectionByDenomIdRequest {
  denomId: string;
}

export interface QueryCollectionByDenomIdResponse {
  Collection?: Collection;
}

export interface QueryListAdminsRequest {}

export interface QueryListAdminsResponse {
  Admins: string[];
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

function createBaseQueryGetCollectionRequest(): QueryGetCollectionRequest {
  return { id: Long.UZERO };
}

export const QueryGetCollectionRequest = {
  encode(message: QueryGetCollectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetCollectionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetCollectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetCollectionRequest {
    return { id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO };
  },

  toJSON(message: QueryGetCollectionRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetCollectionRequest>, I>>(
    object: I,
  ): QueryGetCollectionRequest {
    const message = createBaseQueryGetCollectionRequest();
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
};

function createBaseQueryGetCollectionResponse(): QueryGetCollectionResponse {
  return { Collection: undefined };
}

export const QueryGetCollectionResponse = {
  encode(message: QueryGetCollectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Collection !== undefined) {
      Collection.encode(message.Collection, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetCollectionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetCollectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Collection = Collection.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetCollectionResponse {
    return { Collection: isSet(object.Collection) ? Collection.fromJSON(object.Collection) : undefined };
  },

  toJSON(message: QueryGetCollectionResponse): unknown {
    const obj: any = {};
    message.Collection !== undefined &&
      (obj.Collection = message.Collection ? Collection.toJSON(message.Collection) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetCollectionResponse>, I>>(
    object: I,
  ): QueryGetCollectionResponse {
    const message = createBaseQueryGetCollectionResponse();
    message.Collection =
      object.Collection !== undefined && object.Collection !== null
        ? Collection.fromPartial(object.Collection)
        : undefined;
    return message;
  },
};

function createBaseQueryAllCollectionRequest(): QueryAllCollectionRequest {
  return { pagination: undefined };
}

export const QueryAllCollectionRequest = {
  encode(message: QueryAllCollectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllCollectionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllCollectionRequest();
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

  fromJSON(object: any): QueryAllCollectionRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllCollectionRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllCollectionRequest>, I>>(
    object: I,
  ): QueryAllCollectionRequest {
    const message = createBaseQueryAllCollectionRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryAllCollectionResponse(): QueryAllCollectionResponse {
  return { Collection: [], pagination: undefined };
}

export const QueryAllCollectionResponse = {
  encode(message: QueryAllCollectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Collection) {
      Collection.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllCollectionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllCollectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Collection.push(Collection.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllCollectionResponse {
    return {
      Collection: Array.isArray(object?.Collection)
        ? object.Collection.map((e: any) => Collection.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllCollectionResponse): unknown {
    const obj: any = {};
    if (message.Collection) {
      obj.Collection = message.Collection.map((e) => (e ? Collection.toJSON(e) : undefined));
    } else {
      obj.Collection = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllCollectionResponse>, I>>(
    object: I,
  ): QueryAllCollectionResponse {
    const message = createBaseQueryAllCollectionResponse();
    message.Collection = object.Collection?.map((e) => Collection.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryGetNftRequest(): QueryGetNftRequest {
  return { id: Long.UZERO };
}

export const QueryGetNftRequest = {
  encode(message: QueryGetNftRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetNftRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetNftRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNftRequest {
    return { id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO };
  },

  toJSON(message: QueryGetNftRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetNftRequest>, I>>(object: I): QueryGetNftRequest {
    const message = createBaseQueryGetNftRequest();
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
};

function createBaseQueryGetNftResponse(): QueryGetNftResponse {
  return { Nft: undefined };
}

export const QueryGetNftResponse = {
  encode(message: QueryGetNftResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Nft !== undefined) {
      Nft.encode(message.Nft, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetNftResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Nft = Nft.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNftResponse {
    return { Nft: isSet(object.Nft) ? Nft.fromJSON(object.Nft) : undefined };
  },

  toJSON(message: QueryGetNftResponse): unknown {
    const obj: any = {};
    message.Nft !== undefined && (obj.Nft = message.Nft ? Nft.toJSON(message.Nft) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetNftResponse>, I>>(object: I): QueryGetNftResponse {
    const message = createBaseQueryGetNftResponse();
    message.Nft = object.Nft !== undefined && object.Nft !== null ? Nft.fromPartial(object.Nft) : undefined;
    return message;
  },
};

function createBaseQueryAllNftRequest(): QueryAllNftRequest {
  return { pagination: undefined };
}

export const QueryAllNftRequest = {
  encode(message: QueryAllNftRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllNftRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllNftRequest();
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

  fromJSON(object: any): QueryAllNftRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllNftRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllNftRequest>, I>>(object: I): QueryAllNftRequest {
    const message = createBaseQueryAllNftRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryAllNftResponse(): QueryAllNftResponse {
  return { Nft: [], pagination: undefined };
}

export const QueryAllNftResponse = {
  encode(message: QueryAllNftResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Nft) {
      Nft.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllNftResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Nft.push(Nft.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllNftResponse {
    return {
      Nft: Array.isArray(object?.Nft) ? object.Nft.map((e: any) => Nft.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllNftResponse): unknown {
    const obj: any = {};
    if (message.Nft) {
      obj.Nft = message.Nft.map((e) => (e ? Nft.toJSON(e) : undefined));
    } else {
      obj.Nft = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllNftResponse>, I>>(object: I): QueryAllNftResponse {
    const message = createBaseQueryAllNftResponse();
    message.Nft = object.Nft?.map((e) => Nft.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryCollectionByDenomIdRequest(): QueryCollectionByDenomIdRequest {
  return { denomId: "" };
}

export const QueryCollectionByDenomIdRequest = {
  encode(message: QueryCollectionByDenomIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCollectionByDenomIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCollectionByDenomIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCollectionByDenomIdRequest {
    return { denomId: isSet(object.denomId) ? String(object.denomId) : "" };
  },

  toJSON(message: QueryCollectionByDenomIdRequest): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCollectionByDenomIdRequest>, I>>(
    object: I,
  ): QueryCollectionByDenomIdRequest {
    const message = createBaseQueryCollectionByDenomIdRequest();
    message.denomId = object.denomId ?? "";
    return message;
  },
};

function createBaseQueryCollectionByDenomIdResponse(): QueryCollectionByDenomIdResponse {
  return { Collection: undefined };
}

export const QueryCollectionByDenomIdResponse = {
  encode(message: QueryCollectionByDenomIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Collection !== undefined) {
      Collection.encode(message.Collection, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCollectionByDenomIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCollectionByDenomIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Collection = Collection.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCollectionByDenomIdResponse {
    return { Collection: isSet(object.Collection) ? Collection.fromJSON(object.Collection) : undefined };
  },

  toJSON(message: QueryCollectionByDenomIdResponse): unknown {
    const obj: any = {};
    message.Collection !== undefined &&
      (obj.Collection = message.Collection ? Collection.toJSON(message.Collection) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCollectionByDenomIdResponse>, I>>(
    object: I,
  ): QueryCollectionByDenomIdResponse {
    const message = createBaseQueryCollectionByDenomIdResponse();
    message.Collection =
      object.Collection !== undefined && object.Collection !== null
        ? Collection.fromPartial(object.Collection)
        : undefined;
    return message;
  },
};

function createBaseQueryListAdminsRequest(): QueryListAdminsRequest {
  return {};
}

export const QueryListAdminsRequest = {
  encode(_: QueryListAdminsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryListAdminsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListAdminsRequest();
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

  fromJSON(_: any): QueryListAdminsRequest {
    return {};
  },

  toJSON(_: QueryListAdminsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryListAdminsRequest>, I>>(_: I): QueryListAdminsRequest {
    const message = createBaseQueryListAdminsRequest();
    return message;
  },
};

function createBaseQueryListAdminsResponse(): QueryListAdminsResponse {
  return { Admins: [] };
}

export const QueryListAdminsResponse = {
  encode(message: QueryListAdminsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Admins) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryListAdminsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListAdminsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Admins.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryListAdminsResponse {
    return { Admins: Array.isArray(object?.Admins) ? object.Admins.map((e: any) => String(e)) : [] };
  },

  toJSON(message: QueryListAdminsResponse): unknown {
    const obj: any = {};
    if (message.Admins) {
      obj.Admins = message.Admins.map((e) => e);
    } else {
      obj.Admins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryListAdminsResponse>, I>>(object: I): QueryListAdminsResponse {
    const message = createBaseQueryListAdminsResponse();
    message.Admins = object.Admins?.map((e) => e) || [];
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Collection for sale by id. */
  Collection(request: QueryGetCollectionRequest): Promise<QueryGetCollectionResponse>;
  /** Queries all Collection items for sale. */
  CollectionAll(request: QueryAllCollectionRequest): Promise<QueryAllCollectionResponse>;
  /** Queries a Nft for sale by id. */
  Nft(request: QueryGetNftRequest): Promise<QueryGetNftResponse>;
  /** Queries all Nft items for sale. */
  NftAll(request: QueryAllNftRequest): Promise<QueryAllNftResponse>;
  /** Queries a list of CollectionByDenomId items. */
  CollectionByDenomId(request: QueryCollectionByDenomIdRequest): Promise<QueryCollectionByDenomIdResponse>;
  /** Queries a list of ListAdmins items. */
  ListAdmins(request: QueryListAdminsRequest): Promise<QueryListAdminsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "cudoventures.cudosnode.marketplace.Query";
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Collection = this.Collection.bind(this);
    this.CollectionAll = this.CollectionAll.bind(this);
    this.Nft = this.Nft.bind(this);
    this.NftAll = this.NftAll.bind(this);
    this.CollectionByDenomId = this.CollectionByDenomId.bind(this);
    this.ListAdmins = this.ListAdmins.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Collection(request: QueryGetCollectionRequest): Promise<QueryGetCollectionResponse> {
    const data = QueryGetCollectionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Collection", data);
    return promise.then((data) => QueryGetCollectionResponse.decode(new _m0.Reader(data)));
  }

  CollectionAll(request: QueryAllCollectionRequest): Promise<QueryAllCollectionResponse> {
    const data = QueryAllCollectionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CollectionAll", data);
    return promise.then((data) => QueryAllCollectionResponse.decode(new _m0.Reader(data)));
  }

  Nft(request: QueryGetNftRequest): Promise<QueryGetNftResponse> {
    const data = QueryGetNftRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Nft", data);
    return promise.then((data) => QueryGetNftResponse.decode(new _m0.Reader(data)));
  }

  NftAll(request: QueryAllNftRequest): Promise<QueryAllNftResponse> {
    const data = QueryAllNftRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NftAll", data);
    return promise.then((data) => QueryAllNftResponse.decode(new _m0.Reader(data)));
  }

  CollectionByDenomId(request: QueryCollectionByDenomIdRequest): Promise<QueryCollectionByDenomIdResponse> {
    const data = QueryCollectionByDenomIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CollectionByDenomId", data);
    return promise.then((data) => QueryCollectionByDenomIdResponse.decode(new _m0.Reader(data)));
  }

  ListAdmins(request: QueryListAdminsRequest): Promise<QueryListAdminsResponse> {
    const data = QueryListAdminsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListAdmins", data);
    return promise.then((data) => QueryListAdminsResponse.decode(new _m0.Reader(data)));
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
