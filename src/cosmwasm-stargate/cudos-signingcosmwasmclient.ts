import { SigningCosmWasmClient, SigningCosmWasmClientOptions } from "@cosmjs/cosmwasm-stargate";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { Cw20BurnableModule, Cw20MintableModule, Cw20StandardModule, Cw20UnlimitedModule } from "./modules/cw20";

export class CudosSigningCosmWasmClient extends SigningCosmWasmClient {
    public readonly Cw20UnlimitedModule: Cw20UnlimitedModule;
    public readonly Cw20BurnableModule: Cw20BurnableModule;
    public readonly Cw20MintableModule: Cw20MintableModule;
    public readonly Cw20StandardModule: Cw20StandardModule;

    public static override async connectWithSigner(
        endpoint: string,
        signer: OfflineSigner,
        options: SigningCosmWasmClientOptions = {},
      ): Promise<CudosSigningCosmWasmClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new CudosSigningCosmWasmClient(tmClient, signer, options);
      }

      public static override async offline(
        signer: OfflineSigner,
        options: SigningCosmWasmClientOptions = {},
      ): Promise<CudosSigningCosmWasmClient> {
        return new CudosSigningCosmWasmClient(undefined, signer, options);
      }

      protected constructor(
        tmClient: Tendermint34Client | undefined,
        signer: OfflineSigner,
        options: SigningCosmWasmClientOptions,
      ) {
        super(tmClient, signer, options);
        this.Cw20UnlimitedModule = new Cw20UnlimitedModule();
        this.Cw20BurnableModule = new Cw20BurnableModule();
        this.Cw20MintableModule = new Cw20MintableModule();
        this.Cw20StandardModule = new Cw20StandardModule();
      }

}