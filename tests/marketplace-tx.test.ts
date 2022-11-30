import { DirectSecp256k1HdWallet, SigningStargateClient, StargateClient, GasPrice, AccountData } from '../src/index';
import { coin } from '@cosmjs/amino';
import Long from 'long';

describe('marketplace', () => {

  const mnemonic4 = 'debate result toward brick dutch unusual caught plunge honey ramp want update'
  const mnemonic5 = 'tape soul absorb cabin luxury practice rally clerk love kiss throw avoid'

  const gasPrice = GasPrice.fromString('6000000000000acudos');

  const rpc = 'http://localhost:26657';
  let mainWallet: DirectSecp256k1HdWallet;
  let mainAccount: AccountData;
  let mainAddress: string;
  let mainSigningClient: SigningStargateClient;
  let queryClient: StargateClient;
  let aliceWallet: DirectSecp256k1HdWallet;
  let aliceAccount: AccountData;
  let aliceAddress: string;
  let alice: SigningStargateClient;

  jest.setTimeout(40000);

  beforeAll(async () => {
    mainWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic4);
    mainAccount = (await mainWallet.getAccounts())[0];
    mainAddress = mainAccount.address;
    mainSigningClient = await SigningStargateClient.connectWithSigner(rpc, mainWallet);
    queryClient = await StargateClient.connect(rpc);

    aliceWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic5);
    aliceAccount = (await aliceWallet.getAccounts())[0];
    aliceAddress = aliceAccount.address;
    alice = await SigningStargateClient.connectWithSigner(rpc, aliceWallet);
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
  });
})