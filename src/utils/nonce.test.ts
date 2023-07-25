import { verifyNonceMsgSigner } from '../index';

describe('nonce', () => {
  const alice = globalThis.node?.validator!;
  const nonce = 0;

  test('sign and verify nonce msg', async () => {
    const { signature, chainId, sequence, accountNumber } = await alice.signNonceMsg(alice.address, nonce);
    const result = await verifyNonceMsgSigner(
      signature,
      alice.address,
      nonce,
      sequence,
      accountNumber,
      chainId
    );
    expect(result).toBeTruthy();
  });
});
