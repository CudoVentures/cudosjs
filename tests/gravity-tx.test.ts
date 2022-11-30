import { DirectSecp256k1HdWallet, SigningStargateClient, StargateClient, GasPrice, AccountData } from '../src/index';
import Long from "long";

describe("Gravity module", () => {
    const mnemonic2 = 'course hurdle stand heart rescue trap upset cousin dish embody business equip'
    const mnemonic3 = 'warrior smoke melt opinion broccoli filter hole skate place cart ask alien'

    const gasPrice = GasPrice.fromString('6000000000000acudos')

    const rpc = "http://localhost:26657"
    let mainWallet: DirectSecp256k1HdWallet;
    let mainAccount: AccountData;
    let mainAddress: string;
    let queryClient: StargateClient;
    let signingClient: SigningStargateClient;

    let aliceAccount: AccountData;
    let aliceWallet: DirectSecp256k1HdWallet;
    let aliceSigningClient: SigningStargateClient

    jest.setTimeout(500000);

    beforeAll(async () => {
        mainWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic2)
        mainAccount = (await mainWallet.getAccounts())[0];
        mainAddress = mainAccount.address;
        queryClient = await StargateClient.connect(rpc)
        signingClient = await SigningStargateClient.connectWithSigner(rpc, mainWallet)

        aliceWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic3)
        aliceAccount = (await aliceWallet.getAccounts())[0];
        aliceSigningClient = await SigningStargateClient.connectWithSigner(rpc, aliceWallet)
    })

    test("send  Cosmos --> ETH - happy path ", async () => {
        const coinAmount = { denom: "acudos", amount: "1000" }
        const feeAmount = { denom: "acudos", amount: "1200000000000000000000" }
        const erc20Contract = '0x28ea52f3ee46cac5a72f72e8b3a387c0291d586d'
        await expect(signingClient.gravitySendToEth(mainAddress, "0xa677d7229924af63098b9bb70b041a03a1ec7d8c",
            coinAmount, feeAmount, gasPrice))
            .resolves.not.toThrowError();
        return expect((await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers[0]
            .erc20Token)
            .toEqual({ amount: coinAmount.amount, contract: erc20Contract })
    })

    test("send  Cosmos --> ETH - fail invalid cosmos address ", async () => {
        const coinAmount = { denom: "acudos", amount: "1000" }
        const feeAmount = { denom: "acudos", amount: "1200000000000000000000" }
        await expect(signingClient.gravitySendToEth("Invalid Address", "0xa677d7229924af63098b9bb70b041a03a1ec7d8c",
            coinAmount, feeAmount, gasPrice))
            .rejects.toThrowError("Invalid address.");
    })

    test("send  Cosmos --> ETH - fail invalid ETH address - Empty", async () => {
        const coinAmount = { denom: "acudos", amount: "1000" }
        const feeAmount = { denom: "acudos", amount: "1200000000000000000000" }
        await expect(signingClient.gravitySendToEth(mainAddress, "", coinAmount, feeAmount, gasPrice))
            .rejects.toThrowError("Empty ETH Address");
    })

    test("send  Cosmos --> ETH - fail invalid ETH address - Wrong lenght", async () => {
        const coinAmount = { denom: "acudos", amount: "1000" }
        const feeAmount = { denom: "acudos", amount: "1200000000000000000000" }
        const wrongEthAddr = "0x28ea52f3ee46cac5a72f72e8b3a387c0291d586"
        await expect(signingClient.gravitySendToEth(mainAddress, wrongEthAddr, coinAmount, feeAmount, gasPrice))
            .rejects.toThrowError(`address(${wrongEthAddr}) of the wrong length exp(42) actual(${wrongEthAddr.length})`);
    })

    test("send  Cosmos --> ETH - fail invalid ETH address - Invalid ETH address", async () => {
        const coinAmount = { denom: "acudos", amount: "1000" }
        const feeAmount = { denom: "acudos", amount: "1200000000000000000000" }
        const wrongEthAddr = "28ea52f3ee46cac5a72f72e8b3a387c0291d586cGm" // NO 0x but right lenght
        await expect(signingClient.gravitySendToEth(mainAddress, wrongEthAddr, coinAmount, feeAmount, gasPrice))
            .rejects.toThrowError(`Invalid ETH Address`);
    })

    test("send  Cosmos --> ETH - fail 0 coin amount", async () => {
        const coinAmount = { denom: "acudos", amount: "0" }
        const feeAmount = { denom: "acudos", amount: "1200000000000000000000" }
        const wrongEthAddr = "0xa677d7229924af63098b9bb70b041a03a1ec7d8c"
        await expect(signingClient.gravitySendToEth(mainAddress, wrongEthAddr, coinAmount, feeAmount, gasPrice))
            .rejects.toThrowError("Minimum amount to send is 1");
    })

    test("Cancel send to ETH - happy path", async () => {
        expect((await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers.length)
            .toBeGreaterThan(0)
        let id = (await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers[0].id
        await expect(signingClient.gravityCancelSendToEth(id, mainAddress, gasPrice))
            .resolves.not.toThrowError()
        expect((await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers.length)
            .toBe(0)
    })

    test("send  Cosmos --> ETH - 2nd transaction - success", async () => {
        const coinAmount = { denom: "acudos", amount: "1000" }
        const feeAmount = { denom: "acudos", amount: "1200000000000000000000" }
        const erc20Contract = '0x28ea52f3ee46cac5a72f72e8b3a387c0291d586d'
        await expect(signingClient.gravitySendToEth(mainAddress, "0xa677d7229924af63098b9bb70b041a03a1ec7d8c",
            coinAmount, feeAmount, gasPrice))
            .resolves.not.toThrowError();
        return expect((await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers[0]
            .erc20Token)
            .toEqual({ amount: coinAmount.amount, contract: erc20Contract })
    })

    test("Cancel send to ETH - fail - wrong Sender", async () => {
        expect((await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers.length)
            .toBeGreaterThan(0)
        let id = (await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers[0].id
        const notSenderSigningClient = aliceSigningClient
        await expect(notSenderSigningClient.gravityCancelSendToEth(id, aliceAccount.address, gasPrice))
            .rejects.toThrowError(`Sender ${aliceAccount.address} did not send Id ${id}`)
    })

    test("Cancel send to ETH - fail - wrong Id", async () => {
        expect((await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers.length)
            .toBeGreaterThan(0)
        let wrongId = new Long(0, 10, true)
        await expect(signingClient.gravityCancelSendToEth(wrongId, mainAddress, gasPrice))
            .rejects.toThrowError(`unknown transaction with id ${wrongId} from sender ${mainAddress}`)
    })

    test("Cancel send to ETH - fail - invalid cosmos address", async () => {
        expect((await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers.length)
            .toBeGreaterThan(0)
        let id = (await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers[0].id
        await expect(signingClient.gravityCancelSendToEth(id, "wrong address", gasPrice))
            .rejects.toThrowError("Invalid address.")
    })

    test("Cancel send to ETH - 2nd transaction - success", async () => {
        expect((await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers.length)
            .toBeGreaterThan(0)
        let id = (await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers[0].id
        await expect(signingClient.gravityCancelSendToEth(id, mainAddress, gasPrice)).resolves.not.toThrowError()
        expect((await queryClient.gravityModule.getPendingSendToEth(mainAddress)).unbatchedTransfers.length)
            .toBe(0)
    })
})