/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';
import { Royalty } from "./royalty";

export const protobufPackage = "cudoventures.cudosnode.marketplace";

export interface MsgPublishCollection {
  creator: string;
  denomId: string;
  mintRoyalties: Royalty[];
  resaleRoyalties: Royalty[];
}

export interface MsgPublishCollectionResponse {}

export interface MsgPublishNft {
  creator: string;
  tokenId: string;
  denomId: string;
  price?: Coin;
}

export interface MsgPublishNftResponse {}

export interface MsgBuyNft {
  creator: string;
  id: Long;
}

export interface MsgBuyNftResponse {}

export interface MsgMintNft {
  creator: string;
  denomId: string;
  recipient: string;
  price?: Coin;
  name: string;
  uri: string;
  data: string;
  uid: string;
}

export interface MsgMintNftResponse {}

export interface MsgRemoveNft {
  creator: string;
  id: Long;
}

export interface MsgRemoveNftResponse {}

export interface MsgVerifyCollection {
  creator: string;
  id: Long;
}

export interface MsgVerifyCollectionResponse {}

export interface MsgUnverifyCollection {
  creator: string;
  id: Long;
}

export interface MsgUnverifyCollectionResponse {}

export interface MsgTransferAdminPermission {
  creator: string;
  newAdmin: string;
}

export interface MsgTransferAdminPermissionResponse {}

export interface MsgCreateCollection {
  creator: string;
  id: string;
  name: string;
  schema: string;
  symbol: string;
  traits: string;
  description: string;
  minter: string;
  data: string;
  mintRoyalties: Royalty[];
  resaleRoyalties: Royalty[];
  verified: boolean;
}

export interface MsgCreateCollectionResponse {}

export interface MsgUpdateRoyalties {
  creator: string;
  id: Long;
  mintRoyalties: Royalty[];
  resaleRoyalties: Royalty[];
}

export interface MsgUpdateRoyaltiesResponse {}

export interface MsgUpdatePrice {
  creator: string;
  id: Long;
  price?: Coin;
}

export interface MsgUpdatePriceResponse {}

function createBaseMsgPublishCollection(): MsgPublishCollection {
  return { creator: "", denomId: "", mintRoyalties: [], resaleRoyalties: [] };
}

export const MsgPublishCollection = {
  encode(message: MsgPublishCollection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPublishCollection {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPublishCollection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgPublishCollection {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      mintRoyalties: Array.isArray(object?.mintRoyalties)
        ? object.mintRoyalties.map((e: any) => Royalty.fromJSON(e))
        : [],
      resaleRoyalties: Array.isArray(object?.resaleRoyalties)
        ? object.resaleRoyalties.map((e: any) => Royalty.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgPublishCollection): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
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
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgPublishCollection>, I>>(object: I): MsgPublishCollection {
    const message = createBaseMsgPublishCollection();
    message.creator = object.creator ?? "";
    message.denomId = object.denomId ?? "";
    message.mintRoyalties = object.mintRoyalties?.map((e) => Royalty.fromPartial(e)) || [];
    message.resaleRoyalties = object.resaleRoyalties?.map((e) => Royalty.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgPublishCollectionResponse(): MsgPublishCollectionResponse {
  return {};
}

export const MsgPublishCollectionResponse = {
  encode(_: MsgPublishCollectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPublishCollectionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPublishCollectionResponse();
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

  fromJSON(_: any): MsgPublishCollectionResponse {
    return {};
  },

  toJSON(_: MsgPublishCollectionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgPublishCollectionResponse>, I>>(
    _: I,
  ): MsgPublishCollectionResponse {
    const message = createBaseMsgPublishCollectionResponse();
    return message;
  },
};

function createBaseMsgPublishNft(): MsgPublishNft {
  return { creator: "", tokenId: "", denomId: "", price: undefined };
}

export const MsgPublishNft = {
  encode(message: MsgPublishNft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPublishNft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPublishNft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgPublishNft {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      price: isSet(object.price) ? Coin.fromJSON(object.price) : undefined,
    };
  },

  toJSON(message: MsgPublishNft): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.tokenId !== undefined && (obj.tokenId = message.tokenId);
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.price !== undefined && (obj.price = message.price ? Coin.toJSON(message.price) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgPublishNft>, I>>(object: I): MsgPublishNft {
    const message = createBaseMsgPublishNft();
    message.creator = object.creator ?? "";
    message.tokenId = object.tokenId ?? "";
    message.denomId = object.denomId ?? "";
    message.price =
      object.price !== undefined && object.price !== null ? Coin.fromPartial(object.price) : undefined;
    return message;
  },
};

function createBaseMsgPublishNftResponse(): MsgPublishNftResponse {
  return {};
}

export const MsgPublishNftResponse = {
  encode(_: MsgPublishNftResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPublishNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPublishNftResponse();
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

  fromJSON(_: any): MsgPublishNftResponse {
    return {};
  },

  toJSON(_: MsgPublishNftResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgPublishNftResponse>, I>>(_: I): MsgPublishNftResponse {
    const message = createBaseMsgPublishNftResponse();
    return message;
  },
};

function createBaseMsgBuyNft(): MsgBuyNft {
  return { creator: "", id: Long.UZERO };
}

export const MsgBuyNft = {
  encode(message: MsgBuyNft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBuyNft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuyNft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBuyNft {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgBuyNft): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBuyNft>, I>>(object: I): MsgBuyNft {
    const message = createBaseMsgBuyNft();
    message.creator = object.creator ?? "";
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
};

function createBaseMsgBuyNftResponse(): MsgBuyNftResponse {
  return {};
}

export const MsgBuyNftResponse = {
  encode(_: MsgBuyNftResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBuyNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuyNftResponse();
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

  fromJSON(_: any): MsgBuyNftResponse {
    return {};
  },

  toJSON(_: MsgBuyNftResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBuyNftResponse>, I>>(_: I): MsgBuyNftResponse {
    const message = createBaseMsgBuyNftResponse();
    return message;
  },
};

function createBaseMsgMintNft(): MsgMintNft {
  return { creator: "", denomId: "", recipient: "", price: undefined, name: "", uri: "", data: "", uid: "" };
}

export const MsgMintNft = {
  encode(message: MsgMintNft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.denomId !== "") {
      writer.uint32(18).string(message.denomId);
    }
    if (message.recipient !== "") {
      writer.uint32(26).string(message.recipient);
    }
    if (message.price !== undefined) {
      Coin.encode(message.price, writer.uint32(34).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    if (message.uri !== "") {
      writer.uint32(50).string(message.uri);
    }
    if (message.data !== "") {
      writer.uint32(58).string(message.data);
    }
    if (message.uid !== "") {
      writer.uint32(66).string(message.uid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintNft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintNft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.denomId = reader.string();
          break;
        case 3:
          message.recipient = reader.string();
          break;
        case 4:
          message.price = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.name = reader.string();
          break;
        case 6:
          message.uri = reader.string();
          break;
        case 7:
          message.data = reader.string();
          break;
        case 8:
          message.uid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMintNft {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
      price: isSet(object.price) ? Coin.fromJSON(object.price) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      data: isSet(object.data) ? String(object.data) : "",
      uid: isSet(object.uid) ? String(object.uid) : "",
    };
  },

  toJSON(message: MsgMintNft): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    message.price !== undefined && (obj.price = message.price ? Coin.toJSON(message.price) : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.uri !== undefined && (obj.uri = message.uri);
    message.data !== undefined && (obj.data = message.data);
    message.uid !== undefined && (obj.uid = message.uid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintNft>, I>>(object: I): MsgMintNft {
    const message = createBaseMsgMintNft();
    message.creator = object.creator ?? "";
    message.denomId = object.denomId ?? "";
    message.recipient = object.recipient ?? "";
    message.price =
      object.price !== undefined && object.price !== null ? Coin.fromPartial(object.price) : undefined;
    message.name = object.name ?? "";
    message.uri = object.uri ?? "";
    message.data = object.data ?? "";
    message.uid = object.uid ?? "";
    return message;
  },
};

function createBaseMsgMintNftResponse(): MsgMintNftResponse {
  return {};
}

export const MsgMintNftResponse = {
  encode(_: MsgMintNftResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintNftResponse();
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

  fromJSON(_: any): MsgMintNftResponse {
    return {};
  },

  toJSON(_: MsgMintNftResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintNftResponse>, I>>(_: I): MsgMintNftResponse {
    const message = createBaseMsgMintNftResponse();
    return message;
  },
};

function createBaseMsgRemoveNft(): MsgRemoveNft {
  return { creator: "", id: Long.UZERO };
}

export const MsgRemoveNft = {
  encode(message: MsgRemoveNft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveNft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveNft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveNft {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgRemoveNft): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveNft>, I>>(object: I): MsgRemoveNft {
    const message = createBaseMsgRemoveNft();
    message.creator = object.creator ?? "";
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
};

function createBaseMsgRemoveNftResponse(): MsgRemoveNftResponse {
  return {};
}

export const MsgRemoveNftResponse = {
  encode(_: MsgRemoveNftResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveNftResponse();
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

  fromJSON(_: any): MsgRemoveNftResponse {
    return {};
  },

  toJSON(_: MsgRemoveNftResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveNftResponse>, I>>(_: I): MsgRemoveNftResponse {
    const message = createBaseMsgRemoveNftResponse();
    return message;
  },
};

function createBaseMsgVerifyCollection(): MsgVerifyCollection {
  return { creator: "", id: Long.UZERO };
}

export const MsgVerifyCollection = {
  encode(message: MsgVerifyCollection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVerifyCollection {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVerifyCollection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgVerifyCollection {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgVerifyCollection): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgVerifyCollection>, I>>(object: I): MsgVerifyCollection {
    const message = createBaseMsgVerifyCollection();
    message.creator = object.creator ?? "";
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
};

function createBaseMsgVerifyCollectionResponse(): MsgVerifyCollectionResponse {
  return {};
}

export const MsgVerifyCollectionResponse = {
  encode(_: MsgVerifyCollectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVerifyCollectionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVerifyCollectionResponse();
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

  fromJSON(_: any): MsgVerifyCollectionResponse {
    return {};
  },

  toJSON(_: MsgVerifyCollectionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgVerifyCollectionResponse>, I>>(
    _: I,
  ): MsgVerifyCollectionResponse {
    const message = createBaseMsgVerifyCollectionResponse();
    return message;
  },
};

function createBaseMsgUnverifyCollection(): MsgUnverifyCollection {
  return { creator: "", id: Long.UZERO };
}

export const MsgUnverifyCollection = {
  encode(message: MsgUnverifyCollection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnverifyCollection {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnverifyCollection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUnverifyCollection {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgUnverifyCollection): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnverifyCollection>, I>>(object: I): MsgUnverifyCollection {
    const message = createBaseMsgUnverifyCollection();
    message.creator = object.creator ?? "";
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
};

function createBaseMsgUnverifyCollectionResponse(): MsgUnverifyCollectionResponse {
  return {};
}

export const MsgUnverifyCollectionResponse = {
  encode(_: MsgUnverifyCollectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnverifyCollectionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnverifyCollectionResponse();
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

  fromJSON(_: any): MsgUnverifyCollectionResponse {
    return {};
  },

  toJSON(_: MsgUnverifyCollectionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnverifyCollectionResponse>, I>>(
    _: I,
  ): MsgUnverifyCollectionResponse {
    const message = createBaseMsgUnverifyCollectionResponse();
    return message;
  },
};

function createBaseMsgTransferAdminPermission(): MsgTransferAdminPermission {
  return { creator: "", newAdmin: "" };
}

export const MsgTransferAdminPermission = {
  encode(message: MsgTransferAdminPermission, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.newAdmin !== "") {
      writer.uint32(18).string(message.newAdmin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferAdminPermission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferAdminPermission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.newAdmin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTransferAdminPermission {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      newAdmin: isSet(object.newAdmin) ? String(object.newAdmin) : "",
    };
  },

  toJSON(message: MsgTransferAdminPermission): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.newAdmin !== undefined && (obj.newAdmin = message.newAdmin);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferAdminPermission>, I>>(
    object: I,
  ): MsgTransferAdminPermission {
    const message = createBaseMsgTransferAdminPermission();
    message.creator = object.creator ?? "";
    message.newAdmin = object.newAdmin ?? "";
    return message;
  },
};

function createBaseMsgTransferAdminPermissionResponse(): MsgTransferAdminPermissionResponse {
  return {};
}

export const MsgTransferAdminPermissionResponse = {
  encode(_: MsgTransferAdminPermissionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferAdminPermissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferAdminPermissionResponse();
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

  fromJSON(_: any): MsgTransferAdminPermissionResponse {
    return {};
  },

  toJSON(_: MsgTransferAdminPermissionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferAdminPermissionResponse>, I>>(
    _: I,
  ): MsgTransferAdminPermissionResponse {
    const message = createBaseMsgTransferAdminPermissionResponse();
    return message;
  },
};

function createBaseMsgCreateCollection(): MsgCreateCollection {
  return {
    creator: "",
    id: "",
    name: "",
    schema: "",
    symbol: "",
    traits: "",
    description: "",
    minter: "",
    data: "",
    mintRoyalties: [],
    resaleRoyalties: [],
    verified: false,
  };
}

export const MsgCreateCollection = {
  encode(message: MsgCreateCollection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.schema !== "") {
      writer.uint32(34).string(message.schema);
    }
    if (message.symbol !== "") {
      writer.uint32(42).string(message.symbol);
    }
    if (message.traits !== "") {
      writer.uint32(50).string(message.traits);
    }
    if (message.description !== "") {
      writer.uint32(58).string(message.description);
    }
    if (message.minter !== "") {
      writer.uint32(66).string(message.minter);
    }
    if (message.data !== "") {
      writer.uint32(74).string(message.data);
    }
    for (const v of message.mintRoyalties) {
      Royalty.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.resaleRoyalties) {
      Royalty.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.verified === true) {
      writer.uint32(96).bool(message.verified);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateCollection {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateCollection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.schema = reader.string();
          break;
        case 5:
          message.symbol = reader.string();
          break;
        case 6:
          message.traits = reader.string();
          break;
        case 7:
          message.description = reader.string();
          break;
        case 8:
          message.minter = reader.string();
          break;
        case 9:
          message.data = reader.string();
          break;
        case 10:
          message.mintRoyalties.push(Royalty.decode(reader, reader.uint32()));
          break;
        case 11:
          message.resaleRoyalties.push(Royalty.decode(reader, reader.uint32()));
          break;
        case 12:
          message.verified = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateCollection {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      schema: isSet(object.schema) ? String(object.schema) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      traits: isSet(object.traits) ? String(object.traits) : "",
      description: isSet(object.description) ? String(object.description) : "",
      minter: isSet(object.minter) ? String(object.minter) : "",
      data: isSet(object.data) ? String(object.data) : "",
      mintRoyalties: Array.isArray(object?.mintRoyalties)
        ? object.mintRoyalties.map((e: any) => Royalty.fromJSON(e))
        : [],
      resaleRoyalties: Array.isArray(object?.resaleRoyalties)
        ? object.resaleRoyalties.map((e: any) => Royalty.fromJSON(e))
        : [],
      verified: isSet(object.verified) ? Boolean(object.verified) : false,
    };
  },

  toJSON(message: MsgCreateCollection): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.schema !== undefined && (obj.schema = message.schema);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.traits !== undefined && (obj.traits = message.traits);
    message.description !== undefined && (obj.description = message.description);
    message.minter !== undefined && (obj.minter = message.minter);
    message.data !== undefined && (obj.data = message.data);
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
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateCollection>, I>>(object: I): MsgCreateCollection {
    const message = createBaseMsgCreateCollection();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.schema = object.schema ?? "";
    message.symbol = object.symbol ?? "";
    message.traits = object.traits ?? "";
    message.description = object.description ?? "";
    message.minter = object.minter ?? "";
    message.data = object.data ?? "";
    message.mintRoyalties = object.mintRoyalties?.map((e) => Royalty.fromPartial(e)) || [];
    message.resaleRoyalties = object.resaleRoyalties?.map((e) => Royalty.fromPartial(e)) || [];
    message.verified = object.verified ?? false;
    return message;
  },
};

function createBaseMsgCreateCollectionResponse(): MsgCreateCollectionResponse {
  return {};
}

export const MsgCreateCollectionResponse = {
  encode(_: MsgCreateCollectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateCollectionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateCollectionResponse();
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

  fromJSON(_: any): MsgCreateCollectionResponse {
    return {};
  },

  toJSON(_: MsgCreateCollectionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateCollectionResponse>, I>>(
    _: I,
  ): MsgCreateCollectionResponse {
    const message = createBaseMsgCreateCollectionResponse();
    return message;
  },
};

function createBaseMsgUpdateRoyalties(): MsgUpdateRoyalties {
  return { creator: "", id: Long.UZERO, mintRoyalties: [], resaleRoyalties: [] };
}

export const MsgUpdateRoyalties = {
  encode(message: MsgUpdateRoyalties, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    for (const v of message.mintRoyalties) {
      Royalty.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.resaleRoyalties) {
      Royalty.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRoyalties {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRoyalties();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.uint64() as Long;
          break;
        case 3:
          message.mintRoyalties.push(Royalty.decode(reader, reader.uint32()));
          break;
        case 4:
          message.resaleRoyalties.push(Royalty.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateRoyalties {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      mintRoyalties: Array.isArray(object?.mintRoyalties)
        ? object.mintRoyalties.map((e: any) => Royalty.fromJSON(e))
        : [],
      resaleRoyalties: Array.isArray(object?.resaleRoyalties)
        ? object.resaleRoyalties.map((e: any) => Royalty.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgUpdateRoyalties): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
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
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRoyalties>, I>>(object: I): MsgUpdateRoyalties {
    const message = createBaseMsgUpdateRoyalties();
    message.creator = object.creator ?? "";
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    message.mintRoyalties = object.mintRoyalties?.map((e) => Royalty.fromPartial(e)) || [];
    message.resaleRoyalties = object.resaleRoyalties?.map((e) => Royalty.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgUpdateRoyaltiesResponse(): MsgUpdateRoyaltiesResponse {
  return {};
}

export const MsgUpdateRoyaltiesResponse = {
  encode(_: MsgUpdateRoyaltiesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRoyaltiesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRoyaltiesResponse();
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

  fromJSON(_: any): MsgUpdateRoyaltiesResponse {
    return {};
  },

  toJSON(_: MsgUpdateRoyaltiesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRoyaltiesResponse>, I>>(_: I): MsgUpdateRoyaltiesResponse {
    const message = createBaseMsgUpdateRoyaltiesResponse();
    return message;
  },
};

function createBaseMsgUpdatePrice(): MsgUpdatePrice {
  return { creator: "", id: Long.UZERO, price: undefined };
}

export const MsgUpdatePrice = {
  encode(message: MsgUpdatePrice, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.price !== undefined) {
      Coin.encode(message.price, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePrice {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.uint64() as Long;
          break;
        case 4:
          message.price = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdatePrice {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      price: isSet(object.price) ? Coin.fromJSON(object.price) : undefined,
    };
  },

  toJSON(message: MsgUpdatePrice): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    message.price !== undefined && (obj.price = message.price ? Coin.toJSON(message.price) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdatePrice>, I>>(object: I): MsgUpdatePrice {
    const message = createBaseMsgUpdatePrice();
    message.creator = object.creator ?? "";
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    message.price =
      object.price !== undefined && object.price !== null ? Coin.fromPartial(object.price) : undefined;
    return message;
  },
};

function createBaseMsgUpdatePriceResponse(): MsgUpdatePriceResponse {
  return {};
}

export const MsgUpdatePriceResponse = {
  encode(_: MsgUpdatePriceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePriceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePriceResponse();
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

  fromJSON(_: any): MsgUpdatePriceResponse {
    return {};
  },

  toJSON(_: MsgUpdatePriceResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdatePriceResponse>, I>>(_: I): MsgUpdatePriceResponse {
    const message = createBaseMsgUpdatePriceResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  PublishCollection(request: MsgPublishCollection): Promise<MsgPublishCollectionResponse>;
  PublishNft(request: MsgPublishNft): Promise<MsgPublishNftResponse>;
  BuyNft(request: MsgBuyNft): Promise<MsgBuyNftResponse>;
  MintNft(request: MsgMintNft): Promise<MsgMintNftResponse>;
  RemoveNft(request: MsgRemoveNft): Promise<MsgRemoveNftResponse>;
  VerifyCollection(request: MsgVerifyCollection): Promise<MsgVerifyCollectionResponse>;
  UnverifyCollection(request: MsgUnverifyCollection): Promise<MsgUnverifyCollectionResponse>;
  TransferAdminPermission(request: MsgTransferAdminPermission): Promise<MsgTransferAdminPermissionResponse>;
  CreateCollection(request: MsgCreateCollection): Promise<MsgCreateCollectionResponse>;
  UpdateRoyalties(request: MsgUpdateRoyalties): Promise<MsgUpdateRoyaltiesResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  UpdatePrice(request: MsgUpdatePrice): Promise<MsgUpdatePriceResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "cudoventures.cudosnode.marketplace.Msg";
    this.rpc = rpc;
    this.PublishCollection = this.PublishCollection.bind(this);
    this.PublishNft = this.PublishNft.bind(this);
    this.BuyNft = this.BuyNft.bind(this);
    this.MintNft = this.MintNft.bind(this);
    this.RemoveNft = this.RemoveNft.bind(this);
    this.VerifyCollection = this.VerifyCollection.bind(this);
    this.UnverifyCollection = this.UnverifyCollection.bind(this);
    this.TransferAdminPermission = this.TransferAdminPermission.bind(this);
    this.CreateCollection = this.CreateCollection.bind(this);
    this.UpdateRoyalties = this.UpdateRoyalties.bind(this);
    this.UpdatePrice = this.UpdatePrice.bind(this);
  }
  PublishCollection(request: MsgPublishCollection): Promise<MsgPublishCollectionResponse> {
    const data = MsgPublishCollection.encode(request).finish();
    const promise = this.rpc.request(this.service, "PublishCollection", data);
    return promise.then((data) => MsgPublishCollectionResponse.decode(new _m0.Reader(data)));
  }

  PublishNft(request: MsgPublishNft): Promise<MsgPublishNftResponse> {
    const data = MsgPublishNft.encode(request).finish();
    const promise = this.rpc.request(this.service, "PublishNft", data);
    return promise.then((data) => MsgPublishNftResponse.decode(new _m0.Reader(data)));
  }

  BuyNft(request: MsgBuyNft): Promise<MsgBuyNftResponse> {
    const data = MsgBuyNft.encode(request).finish();
    const promise = this.rpc.request(this.service, "BuyNft", data);
    return promise.then((data) => MsgBuyNftResponse.decode(new _m0.Reader(data)));
  }

  MintNft(request: MsgMintNft): Promise<MsgMintNftResponse> {
    const data = MsgMintNft.encode(request).finish();
    const promise = this.rpc.request(this.service, "MintNft", data);
    return promise.then((data) => MsgMintNftResponse.decode(new _m0.Reader(data)));
  }

  RemoveNft(request: MsgRemoveNft): Promise<MsgRemoveNftResponse> {
    const data = MsgRemoveNft.encode(request).finish();
    const promise = this.rpc.request(this.service, "RemoveNft", data);
    return promise.then((data) => MsgRemoveNftResponse.decode(new _m0.Reader(data)));
  }

  VerifyCollection(request: MsgVerifyCollection): Promise<MsgVerifyCollectionResponse> {
    const data = MsgVerifyCollection.encode(request).finish();
    const promise = this.rpc.request(this.service, "VerifyCollection", data);
    return promise.then((data) => MsgVerifyCollectionResponse.decode(new _m0.Reader(data)));
  }

  UnverifyCollection(request: MsgUnverifyCollection): Promise<MsgUnverifyCollectionResponse> {
    const data = MsgUnverifyCollection.encode(request).finish();
    const promise = this.rpc.request(this.service, "UnverifyCollection", data);
    return promise.then((data) => MsgUnverifyCollectionResponse.decode(new _m0.Reader(data)));
  }

  TransferAdminPermission(request: MsgTransferAdminPermission): Promise<MsgTransferAdminPermissionResponse> {
    const data = MsgTransferAdminPermission.encode(request).finish();
    const promise = this.rpc.request(this.service, "TransferAdminPermission", data);
    return promise.then((data) => MsgTransferAdminPermissionResponse.decode(new _m0.Reader(data)));
  }

  CreateCollection(request: MsgCreateCollection): Promise<MsgCreateCollectionResponse> {
    const data = MsgCreateCollection.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateCollection", data);
    return promise.then((data) => MsgCreateCollectionResponse.decode(new _m0.Reader(data)));
  }

  UpdateRoyalties(request: MsgUpdateRoyalties): Promise<MsgUpdateRoyaltiesResponse> {
    const data = MsgUpdateRoyalties.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateRoyalties", data);
    return promise.then((data) => MsgUpdateRoyaltiesResponse.decode(new _m0.Reader(data)));
  }

  UpdatePrice(request: MsgUpdatePrice): Promise<MsgUpdatePriceResponse> {
    const data = MsgUpdatePrice.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdatePrice", data);
    return promise.then((data) => MsgUpdatePriceResponse.decode(new _m0.Reader(data)));
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
