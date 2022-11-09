
import { DirectSecp256k1HdWallet, SigningStargateClient, StargateClient, GasPrice, AccountData, PageRequest } from '../src/index';


describe('addressbook', () => {

  const mnemonic1 = 'rebel wet poet torch carpet gaze axis ribbon approve depend inflict menu'
  const mnemonic2 = 'noise memory wonder bottom kiwi device ranch scrub gasp also illegal grunt'

  const gasPrice = GasPrice.fromString('5000000000000acudos');

  const rpc = 'http://0.0.0.0:26657/';
  let faucetWallet: DirectSecp256k1HdWallet;
  let faucetAccount: AccountData;
  let faucetAddress: string;
  let faucet: SigningStargateClient;
  let queryClient: StargateClient;


  jest.setTimeout(40000);
  // deploying alpha contract once before test cases
  beforeAll(async () => {
    faucetWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic1);
    faucetAccount = (await faucetWallet.getAccounts())[0];
    faucetAddress = faucetAccount.address;
    faucet = await SigningStargateClient.connectWithSigner(rpc, faucetWallet);
    queryClient = await StargateClient.connect(rpc);
  })

  // positive test case
  test('general flow', async () => {
    const network = 'BTC', label = '1@denom';
    await faucet.addressbookCreateAddress(faucetAddress, network, label, 'addr1', gasPrice);
    await faucet.addressbookUpdateAddress(faucetAddress, network, label, 'addr2', gasPrice);
    const value = await queryClient.addressbookModule.getAddress(faucetAddress, network, label);
    expect(value.address.value).toEqual('addr2');
    await faucet.addressbookDeleteAddress(faucetAddress, network, label, gasPrice);
     await queryClient.addressbookModule.getAllAddresses();
  });
})