import { SigningStargateClient, StargateClient, GasPrice } from '../src/index';
import { getAccountInfo } from './test-setup';

describe('addressbook', () => {
  const mnemonic1 = 'ordinary witness such toddler tag mouse helmet perfect venue eyebrow upgrade rabbit'

  const gasPrice = GasPrice.fromString('5000000000000acudos');

  let address: string;
  let signingClient: SigningStargateClient;
  let queryClient: StargateClient;

  jest.setTimeout(40000);

  beforeAll(async () => {
    const accounInfo = await getAccountInfo(mnemonic1);
    address = accounInfo.address;
    signingClient = accounInfo.signingClient;
    queryClient = accounInfo.queryClient;
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