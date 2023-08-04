import { Tendermint37Client } from '@cosmjs/tendermint-rpc';
import { QueryClient } from '@cosmjs/stargate';

import {
    QueryAllAddressResponse,
    QueryGetAddressResponse
} from '../proto-types/query';

import { PageRequest } from 'cosmjs-types/cosmos/base/query/v1beta1/pagination';

import { AddressbookExtension, setupAddressbookExtension } from '../queries';


export class AddressbookQueryClient {
    private readonly queryClient: QueryClient & AddressbookExtension;

    constructor(tmClient: Tendermint37Client) {
        this.queryClient = QueryClient.withExtensions(tmClient, setupAddressbookExtension);
    }

    public async getAllAddresses(pagination?: PageRequest): Promise<QueryAllAddressResponse> {
        return this.queryClient.addressbook.allAddress(pagination);
    }

    public async getAddress(creator: string, network: string, label: string): Promise<QueryGetAddressResponse> {
        return this.queryClient.addressbook.address(creator, network, label);
    }
}