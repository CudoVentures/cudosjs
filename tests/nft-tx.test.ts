import { DirectSecp256k1HdWallet, SigningStargateClient, StargateClient, GasPrice, AccountData } from '../src/index';
import { NftInfo } from '../src/stargate/modules/nft/module';

describe('nft', () => {
  const mnemonic6 = 'write senior detail business try dirt sort rural donate way acid flame'
  const mnemonic7 = 'debris beef trip coral victory boy picture lab best royal wrestle path'

  const gasPrice = GasPrice.fromString('5000000000000acudos');

  const correctDenom = {
    creator: '',
    id: 'testdenom',
    name: 'test-denom-name',
    symbol: 'test-denom-symbol',
    schema: 'test-denom-schema',
    traits: '',
    description: '',
    data: '',
    minter: ''
  }

  const correctToken = {
    approvedAddresses: [],
    id: '1',
    owner: '',
    name: 'testToken',
    uri: 'testUir',
    data: 'testData',
  }

  const rpc = 'http://localhost:26657'
  let mainWallet: DirectSecp256k1HdWallet;
  let mainAccount: AccountData;
  let mainAddress: string;
  let mainSigningClient: SigningStargateClient;
  let queryClient: StargateClient;
  let alice: AccountData;
  let newTokenId = 0;

  jest.setTimeout(20000);

  beforeAll(async () => {
    mainWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic6);
    mainAccount = (await mainWallet.getAccounts())[0];
    mainAddress = mainAccount.address;
    mainSigningClient = await SigningStargateClient.connectWithSigner(rpc, mainWallet);
    queryClient = await StargateClient.connect(rpc);

    alice = (await (await DirectSecp256k1HdWallet.fromMnemonic(mnemonic7)).getAccounts())[0];
    correctDenom.creator = mainAddress;
    correctToken.owner = mainAddress;
  })

  // positive test case
  test('issue denom - happy path', async () => {
    await expect(mainSigningClient.nftIssueDenom(mainAddress, correctDenom.id, correctDenom.name, correctDenom.schema,
      correctDenom.symbol, correctDenom.traits, correctDenom.minter, correctDenom.description, correctDenom.data,
      gasPrice))
      .resolves.not.toThrowError();
    return expect(queryClient.nftModule.getNftDenom(correctDenom.id))
      .resolves.toEqual({ denom: correctDenom });
  })

  test('issue denom - fail denom id exists', async () => {
    return expect(mainSigningClient.nftIssueDenom(mainAddress, correctDenom.id, correctDenom.name, correctDenom.schema,
      correctDenom.symbol, correctDenom.traits, correctDenom.minter, correctDenom.description, correctDenom.data,
      gasPrice))
      .rejects.toThrow(`Query failed with (18): failed to execute message; message index: 0: denomID ${correctDenom.id} has already exists: invalid denom: invalid request`);
  })

  test('issue denom - fail invalid denom', async () => {
    return expect(mainSigningClient.nftIssueDenom(mainAddress, 'DenomIdCantStartWithUpperCase', correctDenom.name,
      correctDenom.schema, correctDenom.symbol, correctDenom.traits, correctDenom.minter, correctDenom.description,
      correctDenom.data, gasPrice))
      .rejects.toThrow(`Invalid denom id - only accepts lowercase alphanumeric characters, and begin with an english letter`);
  })

  test('mint token - happy path', async () => {
    await mainSigningClient.nftMintToken(mainAddress, correctDenom.id, correctToken.name, correctToken.uri,
      correctToken.data, mainAddress, gasPrice);
    newTokenId++;
    return expect(queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id))
      .resolves.toEqual({ nft: correctToken });
  })

  test('mint token - invalid denom id', async () => {
    return expect(mainSigningClient.nftMintToken(mainAddress, 'InvalidDenomId', correctToken.name, correctToken.uri,
      correctToken.data, mainAddress, gasPrice))
      .rejects.toThrow(`Invalid denom id - only accepts lowercase alphanumeric characters, and begin with an english letter`);
  })

  test('mint token - fails missing denom id', async () => {
    return expect(mainSigningClient.nftMintToken(mainAddress, 'missingdenomid', correctToken.name, correctToken.uri,
      correctToken.data, mainAddress, gasPrice))
      .rejects.toThrow(`Query failed with (18): failed to execute message; message index: 0: not found denomID: missingdenomid: invalid denom: invalid request`);
  })

  test('mint token - fails invalid sender address', async () => {
    return expect(mainSigningClient.nftMintToken('invalidAddress', correctDenom.id, correctToken.name, correctToken.uri,
      correctToken.data, alice.address, gasPrice))
      .rejects.toThrow(`Invalid address`);
  })

  test('edit token - happy path edit name', async () => {
    await expect(mainSigningClient.nftEditToken(mainAddress, correctDenom.id, correctToken.id, 'editedName',
      correctToken.uri, correctToken.data, gasPrice))
      .resolves.not.toThrowError();
    const editedToken = await queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id);
    return expect(editedToken.nft?.name).toEqual('editedName');
  })

  test('edit token - happy path edit uri', async () => {
    await expect(mainSigningClient.nftEditToken(mainAddress, correctDenom.id, correctToken.id, correctToken.name,
      'editedUri', correctToken.data, gasPrice))
      .resolves.not.toThrowError();
    const editedToken = await queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id);
    return expect(editedToken.nft?.uri).toEqual('editedUri');
  })

  test('edit token - happy path edit data', async () => {
    await expect(mainSigningClient.nftEditToken(mainAddress, correctDenom.id, correctToken.id, correctToken.name,
      correctToken.uri, 'editedData', gasPrice))
      .resolves.not.toThrowError();
    const editedToken = await queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id);
    return expect(editedToken.nft?.data).toEqual('editedData');
  })

  test('transfer token - happy path', async () => {
    await expect(mainSigningClient.nftTransfer(mainAddress, correctDenom.id, correctToken.id, mainAddress,
      alice.address, gasPrice))
      .resolves.not.toThrowError();
    const editedToken = await queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id);
    return expect(editedToken.nft?.owner).toEqual(alice.address);
  })

  test('edit token - fails not owner', async () => {
    return expect(mainSigningClient.nftEditToken(mainAddress, correctDenom.id, correctToken.id, correctToken.name,
      correctToken.uri, 'editedData', gasPrice))
      .rejects.toThrow(`failed to execute message`);
  })

  test('transfer token - fails not owner', async () => {
    return expect(mainSigningClient.nftTransfer(mainAddress, correctDenom.id, correctToken.id, mainAddress,
      alice.address, gasPrice))
      .rejects.toThrow(`failed to execute message`);
  })

  test('approve token - happy path', async () => {
    await expect(mainSigningClient.nftMintToken(mainAddress, correctDenom.id, correctToken.name, correctToken.uri,
      correctToken.data, mainAddress, gasPrice))
      .resolves.not.toThrowError();

    newTokenId++;
    await expect(mainSigningClient.nftApprove(mainAddress, correctDenom.id, `${newTokenId}`, alice.address, gasPrice))
      .resolves.not.toThrowError();

    const nft = await queryClient.nftModule.getNftToken(correctDenom.id, `${newTokenId}`);

    return expect(nft?.nft?.approvedAddresses).toContain(alice.address);
  })

  test('revoke token - happy path', async () => {
    await expect(mainSigningClient.nftRevokeToken(mainAddress, correctDenom.id, `${newTokenId}`, alice.address,
      gasPrice))
      .resolves.not.toThrowError();
    const nft = await queryClient.nftModule.getNftToken(correctDenom.id, `${newTokenId}`);

    return expect(nft?.nft?.approvedAddresses).not.toContain(alice.address);
  })

  test('revoke token - fails not approved address', async () => {
    return expect(mainSigningClient.nftRevokeToken(mainAddress, correctDenom.id, `${newTokenId}`, alice.address,
      gasPrice))
      .rejects.toThrowError('Query failed with (18): failed to execute message; message index: 0: No approved address');
  })

  test('approve all true - happy path', async () => {
    await expect(mainSigningClient.nftApproveAll(mainAddress, alice.address, true, gasPrice))
      .resolves.not.toThrowError();
    return expect(queryClient.nftModule.nftIsApprovedForAll(mainAddress, alice.address))
      .resolves.toEqual({ isApproved: true });
  })

  test('approve all false - happy path', async () => {
    await expect(mainSigningClient.nftApproveAll(mainAddress, alice.address, false, gasPrice))
      .resolves.not.toThrowError();
    return expect(queryClient.nftModule.nftIsApprovedForAll(mainAddress, alice.address))
      .resolves.toEqual({ isApproved: false });
  })

  test('burn token - happy path', async () => {
    await expect(queryClient.nftModule.getNftToken(correctDenom.id, `${newTokenId}`))
      .resolves.not.toThrowError();
    await expect(mainSigningClient.nftBurnToken(mainAddress, correctDenom.id, `${newTokenId}`, gasPrice))
      .resolves.not.toThrowError();

    return expect(queryClient.nftModule.getNftToken(correctDenom.id, `${newTokenId}`))
      .rejects.toThrowError('Query failed with (18): invalid NFT');
  })

  test('burn token - fails token not found', async () => {
    return expect(mainSigningClient.nftBurnToken(mainAddress, correctDenom.id, `${newTokenId}`, gasPrice))
      .rejects.toThrowError('Query failed with (18): failed to execute message; message index: 0: not found NFT');
  })

  test('mint token - happy path', async () => {
    const nftInfos: NftInfo[] = [];
    const mintedTokenCount = 10;

    for (let i = 0; i < mintedTokenCount; i++) {
      nftInfos.push(new NftInfo(
        correctDenom.id,
        correctToken.name,
        correctToken.uri,
        correctToken.data,
        mainAddress
      ))
    }

    await expect(mainSigningClient.nftMintMultipleTokens(nftInfos, mainAddress, gasPrice)).resolves.not.toThrowError();

    for (let i = 0; i < mintedTokenCount; i++) {
      newTokenId += 1;
      correctToken.id = newTokenId.toString();
      await expect(queryClient.nftModule.getNftToken(correctDenom.id, newTokenId.toString()))
        .resolves.toEqual({ nft: correctToken });
    }
  })
})