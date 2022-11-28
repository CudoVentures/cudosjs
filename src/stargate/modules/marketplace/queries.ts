import { QueryClient, createProtobufRpcClient } from '@cosmjs/stargate';
import { PageRequest } from 'cosmjs-types/cosmos/base/query/v1beta1/pagination';

import Long from 'long';

import { 
    QueryClientImpl,
    QueryGetCollectionResponse,
    QueryAllCollectionResponse,
    QueryCollectionByDenomIdResponse,
    QueryGetNftResponse,
    QueryAllNftResponse,
    QueryParamsResponse,
    QueryListAdminsResponse
} from './proto-types/query';

export interface MarketplaceExtension {
    readonly marketplace: {
        readonly collection: (id: Long) => Promise<QueryGetCollectionResponse>,
        readonly allCollections: (pagination?: PageRequest) => Promise<QueryAllCollectionResponse>,
        readonly collectionByDenomId: (denomId: string) => Promise<QueryCollectionByDenomIdResponse>,
        readonly nft: (id: Long) => Promise<QueryGetNftResponse>,
        readonly allNfts: (pagination?: PageRequest) => Promise<QueryAllNftResponse>,
        readonly params: () => Promise<QueryParamsResponse>,
        readonly admins: () => Promise<QueryListAdminsResponse>
    }
}

export function setupMarketplaceExtension(base: QueryClient): MarketplaceExtension {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);

    return {
        marketplace: {
            collection: async (id: Long) => {
                return queryService.Collection({ id: id });
            },
            allCollections: async (pagination?: PageRequest) => {
                return queryService.CollectionAll({ pagination: pagination });
            },
            collectionByDenomId: async (denomId: string) => {
                return queryService.CollectionByDenomId({ denomId: denomId });
            },
            nft: async (id: Long) => {
                return queryService.Nft({ id: id });
            },
            allNfts: async (pagination?: PageRequest) => {
                return queryService.NftAll({ pagination: pagination });
            },
            params: async() => {
                return queryService.Params({});
            },
            admins: async() => {
                return queryService.ListAdmins({});
            }
        }
    };
  }