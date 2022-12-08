import {
  Coin,
  coins,
  EncodeObject,
  isOfflineDirectSigner,
  makeAuthInfoBytes,
  makeSignDoc,
  OfflineDirectSigner,
  OfflineSigner,
} from "@cosmjs/proto-signing";
import {
  SigningStargateClientOptions,
  SigningStargateClient,
  GasPrice,
  DeliverTxResponse,
  StdFee,
} from "@cosmjs/stargate";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  DEFAULT_GAS_MULTIPLIER,
  encodeNonce,
  encodePubKey,
  estimateFee,
} from "../utils";
import { GroupModule } from "./modules/group/module";
import { NftInfo, NftModule } from "./modules/nft/module";
import { MsgMultiSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { GravityModule } from "./modules/gravity/module";
import { StdSignature } from "../amino";
import { Int53 } from "../math";
import { MarketplaceModule } from "./modules/marketplace/module";
import { AddressbookModule } from "./modules/addressbook/module";
import { Royalty } from "./modules/marketplace/proto-types/royalty";

export class CudosSigningStargateClient extends SigningStargateClient {
  private readonly directSigner: OfflineDirectSigner | undefined;
  public readonly groupModule: GroupModule;
  public readonly nftModule: NftModule;
  public readonly gravityModule: GravityModule;
  public readonly marketplaceModule: MarketplaceModule;
  public readonly addressbookModule: AddressbookModule;

  public static override async connectWithSigner(
    endpoint: string | HttpEndpoint,
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {}
  ): Promise<CudosSigningStargateClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new CudosSigningStargateClient(tmClient, signer, options);
  }

  protected constructor(
    tmClient: Tendermint34Client,
    signer: OfflineSigner,
    options: SigningStargateClientOptions
  ) {
    super(tmClient, signer, options);
    this.groupModule = new GroupModule(this);
    this.nftModule = new NftModule(this);
    this.gravityModule = new GravityModule(this);
    this.marketplaceModule = new MarketplaceModule(this);
    this.addressbookModule = new AddressbookModule(this);

    if (isOfflineDirectSigner(signer)) {
      this.directSigner = signer;
    }
  }

  public async signNonceMsg(
    signerAddress: string,
    arbitraryMessage: number | string
  ): Promise<{
    signature: StdSignature;
    chainId: string;
    sequence: number;
    accountNumber: number;
  }> {
    const acc = (await this.directSigner!.getAccounts()).find(
      (a) => a.address === signerAddress
    );
    const pubkey = encodePubKey(acc!.pubkey);

    const gasLimit = Int53.fromString("0").toNumber();
    const { accountNumber, sequence } = await this.getSequence(signerAddress);
    const authInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence }],
      coins(0, "acudos"),
      gasLimit
    );

    const txBody = encodeNonce(arbitraryMessage);
    const bodyBytes = this.registry.encode(txBody);
    const chainId = await this.getChainId();

    const signDoc = makeSignDoc(
      bodyBytes,
      authInfoBytes,
      chainId,
      accountNumber
    );
    const { signature } = await this.directSigner!.signDirect(
      signerAddress,
      signDoc
    );

    return { signature, chainId, sequence, accountNumber };
  }

  //easy to use with estimated fee
  public async nftIssueDenom(
    sender: string,
    id: string,
    name: string,
    schema: string,
    symbol: string,
    traits: string,
    minter: string,
    description: string,
    data: string,
    gasPrice: GasPrice,
    memo?: string,
    gasMultiplier?: number
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.nftModule.msgIssueDenom(
      id,
      name,
      schema,
      sender,
      "",
      symbol,
      traits,
      minter,
      description,
      data,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(sender, [msg], fee, memo);
  }

  //easy to use with estimated fee
  public async nftTransfer(
    sender: string,
    denomId: string,
    tokenId: string,
    from: string,
    to: string,
    gasPrice: GasPrice,
    memo?: string,
    gasMultiplier?: number
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.nftModule.msgTransferNft(
      denomId,
      tokenId,
      from,
      to,
      sender,
      "",
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(sender, [msg], fee, memo);
  }

  //easy to use with estimated fee
  public async nftApprove(
    sender: string,
    denomId: string,
    tokenId: string,
    approvedAddress: string,
    gasPrice: GasPrice,
    memo?: string,
    gasMultiplier?: number
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.nftModule.msgApproveNft(
      tokenId,
      denomId,
      sender,
      approvedAddress,
      "",
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(sender, [msg], fee, memo);
  }

  //easy to use with estimated fee
  public async nftApproveAll(
    sender: string,
    operator: string,
    approved: boolean,
    gasPrice: GasPrice,
    memo?: string,
    gasMultiplier?: number
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.nftModule.msgApproveAllNft(
      operator,
      sender,
      approved,
      "",
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(sender, [msg], fee, memo);
  }

  //easy to use with estimated fee
  public async nftEditToken(
    sender: string,
    denomId: string,
    tokenId: string,
    name: string,
    uri: string,
    data: string,
    gasPrice: GasPrice,
    memo?: string,
    gasMultiplier?: number
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.nftModule.msgEditNFT(
      tokenId,
      denomId,
      name,
      uri,
      data,
      sender,
      "",
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(sender, [msg], fee, memo);
  }

  //easy to use with estimated fee
  public async nftMintToken(
    sender: string,
    denomId: string,
    name: string,
    uri: string,
    data: string,
    recipient: string,
    gasPrice: GasPrice,
    memo?: string,
    gasMultiplier?: number
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.nftModule.msgMintNFT(
      denomId,
      name,
      uri,
      data,
      sender,
      recipient,
      "",
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(sender, [msg], fee, memo);
  }

  //easy to use with estimated fee
  public async nftMintMultipleTokens(
    nftInfos: NftInfo[],
    sender: string,
    gasPrice: GasPrice,
    memo?: string,
    gasMultiplier?: number
  ): Promise<DeliverTxResponse> {
    const { msgs, fee } = await this.nftModule.msgMintMultipleNFT(
      nftInfos,
      sender,
      "",
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(sender, msgs, fee, memo);
  }

  //easy to use with estimated fee
  public async nftBurnToken(
    sender: string,
    denomId: string,
    tokenId: string,
    gasPrice: GasPrice,
    memo?: string,
    gasMultiplier?: number
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.nftModule.msgBurnNFT(
      tokenId,
      denomId,
      sender,
      "",
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(sender, [msg], fee, memo);
  }

  //easy to use with estimated fee
  public async nftRevokeToken(
    sender: string,
    denomId: string,
    tokenId: string,
    addressToRevoke: string,
    gasPrice: GasPrice,
    memo?: string,
    gasMultiplier?: number
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.nftModule.msgRevokeNft(
      addressToRevoke,
      denomId,
      tokenId,
      sender,
      "",
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(sender, [msg], fee, memo);
  }

  public async msgMultisend(
    sender: {
      address: string;
      coins: Coin[];
    }[],
    recipients: {
      address: string;
      coins: Coin[];
    }[],
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<{ msg: EncodeObject; fee: StdFee }> {
    const multisendMsg = {
      typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
      value: MsgMultiSend.fromPartial({
        inputs: sender,
        outputs: recipients,
      }),
    };

    const fee = await estimateFee(
      this,
      sender[0].address,
      [multisendMsg],
      gasPrice,
      gasMultiplier,
      memo
    );

    return {
      msg: multisendMsg,
      fee: fee,
    };
  }

  /////// Gravity Module Msg's

  //easy to use with estimated fee
  public async gravitySendToEth(
    sender: string,
    ethDest: string,
    amount: Coin,
    bridgeFee: Coin,
    gasPrice: GasPrice,
    memo?: string,
    gasMultiplier?: number
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.gravityModule.msgSendToEth(
      sender,
      ethDest,
      amount,
      bridgeFee,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(sender, [msg], fee, memo);
  }

  //easy to use with estimated fee
  public async gravitySetMinFeeTransferToEth(
    sender: string,
    minFee: string,
    gasPrice: GasPrice,
    memo?: string,
    gasMultiplier?: number
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.gravityModule.msgSetMinFeeTransferToEth(
      sender,
      minFee,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(sender, [msg], fee, memo);
  }

  //easy to use with estimated fee
  public async gravityCancelSendToEth(
    transactionId: Long,
    sender: string,
    gasPrice: GasPrice,
    memo?: string,
    gasMultiplier?: number
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.gravityModule.msgCancelSendToEth(
      transactionId,
      sender,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(sender, [msg], fee, memo);
  }

  public async marketplaceCreateCollection(
    creator: string,
    id: string,
    name: string,
    schema: string,
    symbol: string,
    traits: string,
    description: string,
    minter: string,
    data: string,
    mintRoyalties: Royalty[],
    resaleRoyalties: Royalty[],
    verified: boolean,
    gasPrice: GasPrice,
    gasMultiplier?: number,
    memo?: string
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.marketplaceModule.msgCreateCollection(
      creator,
      id,
      name,
      schema,
      symbol,
      traits,
      description,
      minter,
      data,
      mintRoyalties,
      resaleRoyalties,
      verified,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async marketplacePublishCollection(
    creator: string,
    denomId: string,
    mintRoyalties: Royalty[],
    resaleRoyalties: Royalty[],
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.marketplaceModule.msgPublishCollection(
      creator,
      denomId,
      mintRoyalties,
      resaleRoyalties,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async marketplacePublishNft(
    creator: string,
    tokenId: string,
    denomId: string,
    price: Coin,
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.marketplaceModule.msgPublishNft(
      creator,
      tokenId,
      denomId,
      price,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async marketplaceBuyNft(
    creator: string,
    id: Long,
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.marketplaceModule.msgBuyNft(
      creator,
      id,
      gasPrice,
      gasMultiplier
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async marketplaceMintNft(
    creator: string,
    denomId: string,
    recipient: string,
    price: Coin,
    name: string,
    uri: string,
    data: string,
    uid: string,
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.marketplaceModule.msgMintNft(
      creator,
      denomId,
      recipient,
      price,
      name,
      uri,
      data,
      uid,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async marketplaceRemoveNft(
    creator: string,
    id: Long,
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.marketplaceModule.msgRemoveNft(
      creator,
      id,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async marketplaceVerifyCollection(
    creator: string,
    id: Long,
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.marketplaceModule.msgVerifyCollection(
      creator,
      id,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async marketplaceUnverifyCollection(
    creator: string,
    id: Long,
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.marketplaceModule.msgUnverifyCollection(
      creator,
      id,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async marketplaceAddAdmin(
    creator: string,
    address: string,
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.marketplaceModule.msgAddAdmin(
      creator,
      address,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async marketplaceRemoveAdmin(
    creator: string,
    address: string,
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.marketplaceModule.msgAddAdmin(
      creator,
      address,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async marketplaceUpdateRoyalties(
    creator: string,
    id: Long,
    mintRoyalties: Royalty[],
    resaleRoyalties: Royalty[],
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.marketplaceModule.msgUpdateRoyalties(
      creator,
      id,
      mintRoyalties,
      resaleRoyalties,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async marketplaceUpdatePrice(
    creator: string,
    id: Long,
    price: Coin,
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.marketplaceModule.msgUpdatePrice(
      creator,
      id,
      price,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async addressbookCreateAddress(
    creator: string,
    network: string,
    label: string,
    value: string,
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.addressbookModule.msgCreateAddress(
      creator,
      network,
      label,
      value,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async addressbookUpdateAddress(
    creator: string,
    network: string,
    label: string,
    value: string,
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.addressbookModule.msgUpdateAddress(
      creator,
      network,
      label,
      value,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }

  public async addressbookDeleteAddress(
    creator: string,
    network: string,
    label: string,
    gasPrice: GasPrice,
    gasMultiplier = DEFAULT_GAS_MULTIPLIER,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const { msg, fee } = await this.addressbookModule.msgDeleteAddress(
      creator,
      network,
      label,
      gasPrice,
      gasMultiplier,
      memo
    );
    return this.signAndBroadcast(creator, [msg], fee, memo);
  }
}
