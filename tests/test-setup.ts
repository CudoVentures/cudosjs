import { DirectSecp256k1HdWallet, SigningStargateClient, StargateClient } from '../src/index';

const rpc = 'http://localhost:26657';

type AccountInfo = {
    address: string,
    signingClient: SigningStargateClient,
    queryClient: StargateClient
}

type AdditionalAccountInfo = {
    address: string,
    signingClient: SigningStargateClient
}

export const getAccountInfo = async (mnemonic: string): Promise<AccountInfo> => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    const account = (await wallet.getAccounts())[0];
    const address = account.address;
    const signingClient = await SigningStargateClient.connectWithSigner(rpc, wallet);
    const queryClient = await StargateClient.connect(rpc);
    return {
        address,
        signingClient,
        queryClient
    }
}

export const getAdditionalAccountInfo = async (mnemonic: string): Promise<AdditionalAccountInfo> => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    const account = (await wallet.getAccounts())[0];
    const address = account.address;
    const signingClient = await SigningStargateClient.connectWithSigner(rpc, wallet);
    return {
        address,
        signingClient
    }
}