import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { QueryClient } from '@cosmjs/stargate';

import {
    QueryGetCollectionResponse,
    QueryAllCollectionResponse,
    QueryCollectionByDenomIdResponse,
    QueryGetNftResponse,
    QueryAllNftResponse,
    QueryParamsResponse,
    QueryListAdminsResponse
} from '../proto-types/query';

import { PageRequest } from 'cosmjs-types/cosmos/base/query/v1beta1/pagination';

import { MarketplaceExtension, setupMarketplaceExtension } from '../queries';


export class MarketplaceQueryClient {
    private readonly queryClient: QueryClient & MarketplaceExtension;

    constructor(tmClient: Tendermint34Client) {
        this.queryClient = QueryClient.withExtensions(tmClient, setupMarketplaceExtension);
    }

    public async getCollection(id: Long): Promise<QueryGetCollectionResponse> {
        return this.queryClient.marketplace.collection(id);
    }

    public async getAllCollections(pagination?: PageRequest): Promise<QueryAllCollectionResponse> {
        return this.queryClient.marketplace.allCollections(pagination);
    }

    public async getCollectionByDenomId(denomId: string): Promise<QueryCollectionByDenomIdResponse> {
        return this.queryClient.marketplace.collectionByDenomId(denomId);
    }

    public async getNft(id: Long): Promise<QueryGetNftResponse> {
        return this.queryClient.marketplace.nft(id);
    }

    public async getAllNfts(pagination?: PageRequest): Promise<QueryAllNftResponse> {
        return this.queryClient.marketplace.allNfts(pagination);
    }

    public async getParams(): Promise<QueryParamsResponse> {
        return this.queryClient.marketplace.params();
    }

    public async getAdmins(): Promise<QueryListAdminsResponse> {
        return this.queryClient.marketplace.admins();
    }
}