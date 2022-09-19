import { Coin, EncodeObject, OfflineSigner } from "@cosmjs/proto-signing";
import { SigningStargateClientOptions, SigningStargateClient, GasPrice, DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { DEFAULT_GAS_MULTIPLIER, estimateFee } from "../utils";
import { GroupModule } from "./modules/group/module";
import { NftInfo, NftModule } from "./modules/nft/module";
import { checkValidNftDenomId, checkValidAddress } from "../utils/checks";
import { MsgMultiSend } from "cosmjs-types/cosmos/bank/v1beta1/tx"
import { GravityModule } from "./modules/gravity/module";

export class CudosSigningStargateClient extends SigningStargateClient {
    public readonly groupModule: GroupModule;
    public readonly nftModule: NftModule;
    public readonly gravityModule: GravityModule;

    public static override async connectWithSigner(
        endpoint: string | HttpEndpoint,
        signer: OfflineSigner,
        options: SigningStargateClientOptions = {},
    ): Promise<CudosSigningStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new CudosSigningStargateClient(tmClient, signer, options);
    }

    protected constructor(
        tmClient: Tendermint34Client,
        signer: OfflineSigner,
        options: SigningStargateClientOptions,
    ) {
        super(tmClient, signer, options);
        this.groupModule = new GroupModule(this);
        this.nftModule = new NftModule(this);
        this.gravityModule = new GravityModule(this);
    }

    //easy to use with estimated fee
    public async nftIssueDenom(
        sender: string,
        id: string,
        name: string,
        schema: string,
        symbol: string,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        const { msg, fee } = await this.nftModule.msgIssueDenom(id, name, schema, sender, '', symbol, gasPrice, gasMultiplier, memo);
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
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        const { msg, fee } = await this.nftModule.msgTransferNft(denomId, tokenId, from, to, sender, '', gasPrice, gasMultiplier, memo);
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
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        const { msg, fee } = await this.nftModule.msgApproveNft(tokenId, denomId, sender, approvedAddress, '', gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }

    //easy to use with estimated fee
    public async nftApproveAll(
        sender: string,
        operator: string,
        approved: boolean,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        const { msg, fee } = await this.nftModule.msgApproveAllNft(operator, sender, approved, '', gasPrice, gasMultiplier, memo);
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
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        const { msg, fee } = await this.nftModule.msgEditNFT(tokenId, denomId, name, uri, data, sender, '', gasPrice, gasMultiplier, memo);
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
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        const { msg, fee } = await this.nftModule.msgMintNFT(denomId, name, uri, data, sender, recipient, '', gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }

    //easy to use with estimated fee
    public async nftMintMultipleTokens(
        nftInfos: NftInfo[],
        sender: string,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        const { msgs, fee } = await this.nftModule.msgMintMultipleNFT(nftInfos, sender, '', gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, msgs, fee, memo);
    }

    //easy to use with estimated fee
    public async nftBurnToken(
        sender: string,
        denomId: string,
        tokenId: string,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        const { msg, fee } = await this.nftModule.msgBurnNFT(tokenId, denomId, sender, '', gasPrice, gasMultiplier, memo);
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
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        const { msg, fee } = await this.nftModule.msgRevokeNft(addressToRevoke, denomId, tokenId, sender, '', gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }

    public async msgMultisend(
        sender: {
            address: string,
            coins: Coin[]
        }[],
        recipients: {
            address: string,
            coins: Coin[]
        }[],
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const multisendMsg = {
            typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
            value: MsgMultiSend.fromPartial({
                inputs: sender,
                outputs: recipients,
            })
        };

        const fee = await estimateFee(this, sender[0].address, [multisendMsg], gasPrice, gasMultiplier, memo);

        return {
            msg: multisendMsg,
            fee: fee
        }
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
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        const { msg, fee } = await this.gravityModule.msgSendToEth(sender, ethDest, amount, bridgeFee, gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }

    //easy to use with estimated fee
    public async gravitySetMinFeeTransferToEth(
        sender: string,
        minFee: string,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        const { msg, fee } = await this.gravityModule.msgSetMinFeeTransferToEth(sender,minFee, gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }

    //easy to use with estimated fee
    public async gravityCancelSendToEth(
        transactionId: Long,
        sender: string,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        const { msg, fee } = await this.gravityModule.msgCancelSendToEth(transactionId,sender, gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }
}