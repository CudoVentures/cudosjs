import {
  DirectSecp256k1HdWallet,
  OfflineSigner,
  SigningStargateClient,
  StargateClient,
  Tendermint34Client,
} from '..';
import { execSync } from 'child_process';
import { setTimeout } from 'timers/promises';
import dotenv from 'dotenv';

const DEFAULT_RPC = 'http://localhost:26657';

// CudosAccount extends CudosSigningStargateClient by adding address helper field for test purposes
class CudosAccount extends SigningStargateClient {
  private _address: string;

  public static fromMnemonic = async (mnemonic: string, rpcUrl: string) => {
    const tmClient = await Tendermint34Client.connect(rpcUrl);
    const signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    const address = (await signer.getAccounts())[0].address;
    return new CudosAccount(tmClient, signer, address);
  };

  private constructor(tmClient: Tendermint34Client, signer: OfflineSigner, address: string) {
    super(tmClient, signer, {});
    this._address = address;
  }

  public get address() {
    return this._address;
  }
}

export class CudosNode {
  // we use singleton pattern to make sure we only have one node instance
  private static _instance: CudosNode | undefined;
  private started: boolean = false;
  private _queryClient: StargateClient | undefined;
  private _validator: CudosAccount | undefined;
  private _orchestrator: CudosAccount | undefined;
  public readonly env: dotenv.DotenvParseOutput;

  // init is called once before jest starts executing the tests
  public static init = () => {
    if (CudosNode._instance) {
      throw new Error('Node is already instantiated.');
    }

    execSync(`${__dirname}/cudos-node.local.setup.sh`);

    // create singleton instance once the node is initializeed
    CudosNode._instance = new CudosNode();
  };

  private constructor() {
    this.env = dotenv.config({ path: `${__dirname}/cudos-node.local.env` }).parsed!;
  }

  public start = async () => {
    if (this.started) {
      throw new Error('Node is already started.');
    }

    execSync(`cudos-noded start --log_level=fatal &`, { stdio: 'inherit' });
    
    // wait 8sec for node to start producing blocks then verify height
    await setTimeout(8000);
    const queryClient = await StargateClient.connect(DEFAULT_RPC);
    const height = await queryClient.getHeight();
    if (height !== 1) {
      throw new Error(`error while starting local cudos node, expected height 1, received ${height}`);
    }

    this.started = true;

    if (!this._validator || !this._orchestrator || !this._queryClient) {
      this._validator = await CudosAccount.fromMnemonic(this.env['VALIDATOR_MNEMONIC'], DEFAULT_RPC);
      this._orchestrator = await CudosAccount.fromMnemonic(this.env['ORCH_MNEMONIC'], DEFAULT_RPC);
      this._queryClient = queryClient;
    }
  };

  public reset = () => {
    execSync('pkill cudos-noded || true');
    execSync(`cudos-noded unsafe-reset-all --log_level=error`);
    this.started = false;
  };

  // cleanup is called once after jest finishes test execution
  public cleanup = () => {
    if (this.started) {
      this.reset();
    }

    execSync(`rm -rf ${__dirname}/cudos-node`);
    execSync(`rm -rf ${this.env['CUDOS_HOME']}`);

    // delete singleton instance after tests are completed
    delete CudosNode._instance;
  };

  public get queryClient() {
    return this._queryClient;
  }

  public get validator() {
    return this._validator;
  }

  public get orchestrator() {
    return this._orchestrator;
  }

  public static get instance() {
    return CudosNode._instance;
  }
}
