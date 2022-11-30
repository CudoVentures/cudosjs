import { DirectSecp256k1HdWallet, SigningStargateClient, StargateClient, GasPrice, AccountData } from '../src/index';

describe('addressbook', () => {

  const mnemonic1 = 'ordinary witness such toddler tag mouse helmet perfect venue eyebrow upgrade rabbit'

  const gasPrice = GasPrice.fromString('5000000000000acudos');

  const rpc = 'http://localhost:26657';
  let wallet: DirectSecp256k1HdWallet;
  let account: AccountData;
  let address: string;
  let signingClient: SigningStargateClient;
  let queryClient: StargateClient;

  jest.setTimeout(40000);

  beforeAll(async () => {
    wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic1);
    account = (await wallet.getAccounts())[0];
    address = account.address;
    signingClient = await SigningStargateClient.connectWithSigner(rpc, wallet);
    queryClient = await StargateClient.connect(rpc);
  })

  // positive test case
  test('general flow', async () => {
    const network = 'BTC', label = '1@denom';
    await signingClient.addressbookCreateAddress(address, network, label, 'addr1', gasPrice);
    await signingClient.addressbookUpdateAddress(address, network, label, 'addr2', gasPrice);
    const value = await queryClient.addressbookModule.getAddress(address, network, label);
    expect(value.address).toBeDefined();
    expect(value.address!.value).toEqual('addr2');
    await signingClient.addressbookDeleteAddress(address, network, label, gasPrice);
    await queryClient.addressbookModule.getAllAddresses();
  });
})