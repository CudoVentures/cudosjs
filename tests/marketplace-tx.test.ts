import { SigningStargateClient, StargateClient, GasPrice } from '../src/index';
import { getAccountInfo, getAdditionalAccountInfo } from './test-setup';
import { coin } from '@cosmjs/amino';
import Long from 'long';

describe('marketplace', () => {
  const mnemonic4 = 'debate result toward brick dutch unusual caught plunge honey ramp want update'
  const mnemonic5 = 'tape soul absorb cabin luxury practice rally clerk love kiss throw avoid'

  const gasPrice = GasPrice.fromString('6000000000000acudos');
  const duration = { seconds: Long.fromInt(1111111), nanos: 5 };
  const minPrice = coin('1', 'acudos');
  const startPrice = coin('1000', 'acudos');

  let mainAddress: string;
  let mainSigningClient: SigningStargateClient;
  let queryClient: StargateClient;
  let aliceAddress: string;
  let alice: SigningStargateClient;

  jest.setTimeout(40000);

  beforeAll(async () => {
    const accounInfo = await getAccountInfo(mnemonic4);
    mainAddress = accounInfo.address;
    mainSigningClient = accounInfo.signingClient;
    queryClient = accounInfo.queryClient;

    const additionalAccounInfo = await getAdditionalAccountInfo(mnemonic5);
    aliceAddress = additionalAccounInfo.address;
    alice = additionalAccounInfo.signingClient;
  })

  // positive test case
  test('general flow', async () => {

    const denomId = 'test';
    await mainSigningClient.marketplaceCreateCollection(mainAddress, denomId, denomId, '', denomId, '', '', '', '',
      [{ address: mainAddress, percent: '100000000000000000000' }],
      [{ address: mainAddress, percent: '100000000000000000000' }], false, gasPrice);

    const collectionResponse = await queryClient.marketplaceModule.getCollectionByDenomId(denomId);

    expect(collectionResponse.Collection).toBeDefined();
    let collectionId = collectionResponse.Collection!.id.toNumber();

    await mainSigningClient.marketplaceAddAdmin(mainAddress, mainAddress, gasPrice)

    await mainSigningClient.marketplaceVerifyCollection(mainAddress, Long.fromNumber(collectionId), gasPrice);

    await mainSigningClient.marketplaceMintNft(mainAddress, denomId, mainAddress, coin('1', 'acudos'), 'name', '', '',
      'some uid', gasPrice);

    await mainSigningClient.marketplacePublishNft(mainAddress, '1', denomId, coin('1000', 'acudos'), gasPrice);

    // The marketplace NFT id starts from 0
    await alice.marketplaceBuyNft(aliceAddress, Long.fromNumber(0), gasPrice);

    await alice.marketplacePublishAuction(aliceAddress, '1', denomId, duration, { startPrice, minPrice }, gasPrice);

    await mainSigningClient.marketplacePlaceBid(mainAddress, '1', startPrice, gasPrice);

    await mainSigningClient.marketplacePublishAuction(mainAddress, '1', denomId, duration, { minPrice }, gasPrice);

    await alice.marketplacePlaceBid(aliceAddress, '2', minPrice, gasPrice);

    await mainSigningClient.marketplaceAcceptBid(mainAddress, '2', gasPrice);
  });
})