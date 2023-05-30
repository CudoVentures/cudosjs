import { coin } from '@cosmjs/amino';
import Long from 'long';

describe('gravity', () => {
  const alice = globalThis.node?.validator!;
  const bob = globalThis.node?.orchestrator!;
  const queryClient = globalThis.node?.queryClient!;
  const gas = globalThis.gasPrice;
  const fee = coin(1, 'acudos');
  const amount = coin(1000, 'acudos');
  const erc20Contract = globalThis.node?.env['CUDOS_TOKEN_CONTRACT_ADDRESS']!;
  const ethAddr = globalThis.node?.env['ORCH_ETH_ADDRESS']!;

  test('send Cosmos --> ETH - happy path', async () => {
    await expect(
      alice.gravitySendToEth(alice.address, ethAddr, amount, fee, gas)
    ).resolves.not.toThrowError();

    return expect(
      (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers[0].erc20Token
    ).toEqual({ amount: amount.amount, contract: erc20Contract });
  });

  test('send Cosmos --> ETH - fail invalid cosmos address', async () => {
    await expect(alice.gravitySendToEth('Invalid Address', ethAddr, amount, fee, gas)).rejects.toThrowError(
      'Invalid address.'
    );
  });

  test('send Cosmos --> ETH - fail invalid ETH address - Empty', async () => {
    await expect(alice.gravitySendToEth(alice.address, '', amount, fee, gas)).rejects.toThrowError(
      'Empty ETH Address'
    );
  });

  test('send Cosmos --> ETH - fail invalid ETH address - Wrong length', async () => {
    const addrCut = erc20Contract.substring(2);
    await expect(alice.gravitySendToEth(alice.address, addrCut, amount, fee, gas)).rejects.toThrowError(
      `address(${addrCut}) of the wrong length exp(42) actual(${addrCut.length})`
    );
  });

  test('send Cosmos --> ETH - fail invalid ETH address - Invalid ETH address', async () => {
    await expect(
      alice.gravitySendToEth(alice.address, ethAddr.replace('0x', 'zz'), amount, fee, gas)
    ).rejects.toThrowError(`Invalid ETH Address`);
  });

  test('send Cosmos --> ETH - fail 0 coin amount', async () => {
    await expect(
      alice.gravitySendToEth(alice.address, ethAddr, coin(0, 'acudos'), fee, gas)
    ).rejects.toThrowError('Minimum amount to send is 1');
  });

  test('Cancel send to ETH - happy path', async () => {
    expect(
      (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers.length
    ).toBeGreaterThan(0);
    let id = (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers[0].id;
    await expect(alice.gravityCancelSendToEth(id, alice.address, gas)).resolves.not.toThrowError();
    expect(
      (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers.length
    ).toBe(0);
  });

  test('send Cosmos --> ETH - 2nd transaction - success', async () => {
    await expect(
      alice.gravitySendToEth(alice.address, ethAddr, amount, fee, gas)
    ).resolves.not.toThrowError();
    return expect(
      (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers[0].erc20Token
    ).toEqual({ amount: amount.amount, contract: erc20Contract });
  });

  test('Cancel send to ETH - fail - wrong Sender', async () => {
    expect(
      (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers.length
    ).toBeGreaterThan(0);
    let id = (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers[0].id;
    await expect(bob.gravityCancelSendToEth(id, bob.address, gas)).rejects.toThrowError(
      `Sender ${bob.address} did not send Id ${id}`
    );
  });

  test('Cancel send to ETH - fail - wrong Id', async () => {
    expect(
      (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers.length
    ).toBeGreaterThan(0);
    let wrongId = new Long(0, 10, true);
    await expect(alice.gravityCancelSendToEth(wrongId, alice.address, gas)).rejects.toThrowError(
      `unknown transaction with id ${wrongId} from sender ${alice.address}`
    );
  });

  test('Cancel send to ETH - fail - invalid cosmos address', async () => {
    expect(
      (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers.length
    ).toBeGreaterThan(0);
    let id = (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers[0].id;
    await expect(alice.gravityCancelSendToEth(id, 'wrong address', gas)).rejects.toThrowError(
      'Invalid address.'
    );
  });

  test('Cancel send to ETH - 2nd transaction - success', async () => {
    expect(
      (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers.length
    ).toBeGreaterThan(0);
    let id = (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers[0].id;
    await expect(alice.gravityCancelSendToEth(id, alice.address, gas)).resolves.not.toThrowError();
    expect(
      (await queryClient.gravityModule.getPendingSendToEth(alice.address)).unbatchedTransfers.length
    ).toBe(0);
  });
});
