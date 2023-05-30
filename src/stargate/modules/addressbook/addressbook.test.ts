describe('addressbook', () => {
  const alice = globalThis.node?.validator!;
  const queryClient = globalThis.node?.queryClient!;
  const gas = globalThis.gasPrice;
  const network = 'BTC';
  const label = '1@denom';

  jest.setTimeout(40000);

  // positive test case
  test('general flow', async () => {
    await alice.addressbookCreateAddress(alice.address, network, label, 'addr1', gas);
    await alice.addressbookUpdateAddress(alice.address, network, label, 'addr2', gas);
    const value = await queryClient.addressbookModule.getAddress(alice.address, network, label);
    expect(value.address).toBeDefined();
    expect(value.address!.value).toEqual('addr2');
    await alice.addressbookDeleteAddress(alice.address, network, label, gas);
    await queryClient.addressbookModule.getAllAddresses();
  });
});
