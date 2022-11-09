import { DirectSecp256k1HdWallet, SigningStargateClient, verifyNonceMsgSigner } from '../src/index';


describe("Nonce", () => {
    test("sign and verify nonce msg", async () => {
        const mnemonic = 'ordinary witness such toddler tag mouse helmet perfect venue eyebrow upgrade rabbit';
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
        const { address } = (await wallet.getAccounts())[0];
        const client = await SigningStargateClient.connectWithSigner("http://0.0.0.0:26657/", wallet);

        const nonce = 0;
        const { signature, chainId, sequence, accountNumber } = await client.signNonceMsg(address, nonce);
        const result = await verifyNonceMsgSigner(signature, address, nonce, sequence, accountNumber, chainId)
        expect(result).toBeTruthy()
    })
})