import { coin } from '@cosmjs/amino';
import Long from 'long';

describe('marketplace', () => {
  const alice = globalThis.node?.validator!;
  const bob = globalThis.node?.orchestrator!;
  const queryClient = globalThis.node?.queryClient!;
  const gas = globalThis.gasPrice;
  const denomId = 'test';
  const royalties = [{ address: alice.address, percent: '100000000000000000000' }];
  const tokenId = '1';

  jest.setTimeout(40000);

  // positive test case
  test('general flow', async () => {
    await alice.marketplaceCreateCollection(
      alice.address,
      denomId,
      denomId,
      '',
      denomId,
      '',
      '',
      '',
      '',
      royalties,
      royalties,
      false,
      gas
    );

    const collectionResponse = await queryClient.marketplaceModule.getCollectionByDenomId(denomId);

    expect(collectionResponse.Collection).toBeDefined();
    let collectionId = collectionResponse.Collection!.id.toNumber();

    await alice.marketplaceAddAdmin(alice.address, alice.address, gas);

    await alice.marketplaceVerifyCollection(alice.address, Long.fromNumber(collectionId), gas);

    await alice.marketplaceMintNft(
      alice.address,
      denomId,
      alice.address,
      coin('1', 'acudos'),
      'name',
      '',
      '',
      'some uid',
      gas
    );

    await alice.marketplacePublishNft(alice.address, tokenId, denomId, coin('1000', 'acudos'), gas);

    await bob.marketplaceBuyNft(bob.address, Long.fromString(tokenId), gas);
  });
});
