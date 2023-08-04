import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";
import { Coin } from "@cosmjs/amino";
import { CURRENCY_DENOM } from "../utils";

export class CudosCosmWasmClient extends CosmWasmClient {

    public static override async connect(endpoint: string): Promise<CudosCosmWasmClient> {
        const tmClient = await Tendermint37Client.connect(endpoint);
        return new CudosCosmWasmClient(tmClient);
      }

      protected constructor(tmClient: Tendermint37Client | undefined) {
        super(tmClient);
      }
    
      public override async getBalance(address: string, searchDenom: string = CURRENCY_DENOM): Promise<Coin> {
        return this.forceGetQueryClient().bank.balance(address, searchDenom);
      }
}
