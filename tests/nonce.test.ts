import { verifyNonceMsgSigner } from '../src/index';
import { getAccountInfo } from './test-setup';

describe("Nonce", () => {
    const mnemonic8 = "damp bunker feed quit maze execute raccoon office error squirrel believe measure"

    test("sign and verify nonce msg", async () => {
        const accounInfo = await getAccountInfo(mnemonic8);
        const address = accounInfo.address;
        const client = accounInfo.signingClient;

        const nonce = 0;
        const { signature, chainId, sequence, accountNumber } = await client.signNonceMsg(address, nonce);
        const result = await verifyNonceMsgSigner(signature, address, nonce, sequence, accountNumber, chainId)
        expect(result).toBeTruthy()
    })
})