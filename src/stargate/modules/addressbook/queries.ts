import { QueryClient, createProtobufRpcClient } from '@cosmjs/stargate';
import { PageRequest } from 'cosmjs-types/cosmos/base/query/v1beta1/pagination';

import { 
    QueryClientImpl,
    QueryAllAddressResponse,
    QueryGetAddressResponse
} from './proto-types/query';

export interface AddressbookExtension {
    readonly addressbook: {
        readonly allAddress: (pagination?: PageRequest) => Promise<QueryAllAddressResponse>,
        readonly address: (creator: string, network: string, label: string) => Promise<QueryGetAddressResponse>
    }
}

export function setupAddressbookExtension(base: QueryClient): AddressbookExtension {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);

    return {
        addressbook: {
            allAddress: async (pagination?: PageRequest) => {
                return queryService.AddressAll({ pagination: pagination });
            },
            address: async (creator: string, network: string, label: string) => {
                return queryService.Address({ creator: creator, network: network, label: label });
            }
        }
    };
}