
import { DirectSecp256k1HdWallet, SigningStargateClient, StargateClient, GasPrice, AccountData, PageRequest } from '../src/index';
import { coin } from '@cosmjs/amino';
import Long from 'long';
import { Royalty } from '../src/stargate/modules/marketplace/proto-types/royalty';

describe('marketplace', () => {

  const mnemonic1 = 'rebel wet poet torch carpet gaze axis ribbon approve depend inflict menu'
  const mnemonic2 = 'noise memory wonder bottom kiwi device ranch scrub gasp also illegal grunt'

  const gasPrice = GasPrice.fromString('5000000000000acudos');

  const rpc = 'http://0.0.0.0:26657/';
  let faucetWallet: DirectSecp256k1HdWallet;
  let faucetAccount: AccountData;
  let faucetAddress: string;
  let faucet: SigningStargateClient;
  let queryClient: StargateClient;
  let aliceWallet: DirectSecp256k1HdWallet;
  let aliceAccount: AccountData;
  let aliceAddress: string;
  let alice: SigningStargateClient;


  jest.setTimeout(40000);
  // deploying alpha contract once before test cases
  beforeAll(async () => {
    faucetWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic1);
    faucetAccount = (await faucetWallet.getAccounts())[0];
    faucetAddress = faucetAccount.address;
    faucet = await SigningStargateClient.connectWithSigner(rpc, faucetWallet);
    queryClient = await StargateClient.connect(rpc);

    aliceWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic2);
    aliceAccount = (await aliceWallet.getAccounts())[0];
    aliceAddress = aliceAccount.address;
    alice = await SigningStargateClient.connectWithSigner(rpc, aliceWallet);
  })
  
  // positive test case
  test('general flow', async () => {

    const denomId = 'test';

    await faucet.marketplaceCreateCollection(faucetAddress, denomId, denomId, '', denomId, '', '', '', '', [{address: faucetAddress, percent: '100'}], [{address: faucetAddress, percent: '10'}], false, gasPrice);

    let collectionId = (await queryClient.marketplaceModule.getCollectionByDenomId(denomId)).Collection.id.toNumber();

    await faucet.marketplaceVerifyCollection(faucetAddress, Long.fromNumber(collectionId), gasPrice);

    await faucet.marketplaceMintNft(faucetAddress, denomId, faucetAddress, coin('1', 'acudos'), 'name', '', '', 'some uid', gasPrice);

    await faucet.marketplacePublishNft(faucetAddress, '1', denomId, coin('1000', 'acudos'), gasPrice);

    await alice.marketplaceBuyNft(aliceAddress, Long.fromNumber(1), gasPrice);
});
})