import { NftInfo } from './module';

describe('nft', () => {
  const alice = globalThis.node?.validator!;
  const bob = globalThis.node?.orchestrator!;
  const queryClient = globalThis.node?.queryClient!;
  const gas = globalThis.gasPrice;

  const correctDenom = {
    creator: alice.address,
    id: 'testdenom',
    name: 'test-denom-name',
    symbol: 'test-denom-symbol',
    schema: 'test-denom-schema',
    traits: '',
    description: '',
    data: '',
    minter: '',
  };

  const correctToken = {
    approvedAddresses: [],
    id: '1',
    owner: alice.address,
    name: 'testToken',
    uri: 'testUir',
    data: 'testData',
  };

  let newTokenId = 0;

  // positive test case
  test('issue denom - happy path', async () => {
    await expect(
      alice.nftIssueDenom(
        alice.address,
        correctDenom.id,
        correctDenom.name,
        correctDenom.schema,
        correctDenom.symbol,
        correctDenom.traits,
        correctDenom.minter,
        correctDenom.description,
        correctDenom.data,
        gas
      )
    ).resolves.not.toThrowError();
    return expect(queryClient.nftModule.getNftDenom(correctDenom.id)).resolves.toEqual({
      denom: correctDenom,
    });
  });

  test('issue denom - fail denom id exists', async () => {
    return expect(
      alice.nftIssueDenom(
        alice.address,
        correctDenom.id,
        correctDenom.name,
        correctDenom.schema,
        correctDenom.symbol,
        correctDenom.traits,
        correctDenom.minter,
        correctDenom.description,
        correctDenom.data,
        gas
      )
    ).rejects.toThrow(
      `Query failed with (18): failed to execute message; message index: 0: denomID ${correctDenom.id} has already exists: invalid denom: invalid request`
    );
  });

  test('issue denom - fail invalid denom', async () => {
    return expect(
      alice.nftIssueDenom(
        alice.address,
        'DenomIdCantStartWithUpperCase',
        correctDenom.name,
        correctDenom.schema,
        correctDenom.symbol,
        correctDenom.traits,
        correctDenom.minter,
        correctDenom.description,
        correctDenom.data,
        gas
      )
    ).rejects.toThrow(
      `Invalid denom id - only accepts lowercase alphanumeric characters, and begin with an english letter`
    );
  });

  test('mint token - happy path', async () => {
    await alice.nftMintToken(
      alice.address,
      correctDenom.id,
      correctToken.name,
      correctToken.uri,
      correctToken.data,
      alice.address,
      gas
    );
    newTokenId++;
    return expect(queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id)).resolves.toEqual({
      nft: correctToken,
    });
  });

  test('mint token - invalid denom id', async () => {
    return expect(
      alice.nftMintToken(
        alice.address,
        'InvalidDenomId',
        correctToken.name,
        correctToken.uri,
        correctToken.data,
        alice.address,
        gas
      )
    ).rejects.toThrow(
      `Invalid denom id - only accepts lowercase alphanumeric characters, and begin with an english letter`
    );
  });

  test('mint token - fails missing denom id', async () => {
    return expect(
      alice.nftMintToken(
        alice.address,
        'missingdenomid',
        correctToken.name,
        correctToken.uri,
        correctToken.data,
        alice.address,
        gas
      )
    ).rejects.toThrow(
      `Query failed with (18): failed to execute message; message index: 0: not found denomID: missingdenomid: invalid denom: invalid request`
    );
  });

  test('mint token - fails invalid sender address', async () => {
    return expect(
      alice.nftMintToken(
        'invalidAddress',
        correctDenom.id,
        correctToken.name,
        correctToken.uri,
        correctToken.data,
        bob.address,
        gas
      )
    ).rejects.toThrow(`Invalid address`);
  });

  test('edit token - happy path edit name', async () => {
    await expect(
      alice.nftEditToken(
        alice.address,
        correctDenom.id,
        correctToken.id,
        'editedName',
        correctToken.uri,
        correctToken.data,
        gas
      )
    ).resolves.not.toThrowError();
    const editedToken = await queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id);
    return expect(editedToken.nft?.name).toEqual('editedName');
  });

  test('edit token - happy path edit uri', async () => {
    await expect(
      alice.nftEditToken(
        alice.address,
        correctDenom.id,
        correctToken.id,
        correctToken.name,
        'editedUri',
        correctToken.data,
        gas
      )
    ).resolves.not.toThrowError();
    const editedToken = await queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id);
    return expect(editedToken.nft?.uri).toEqual('editedUri');
  });

  test('edit token - happy path edit data', async () => {
    await expect(
      alice.nftEditToken(
        alice.address,
        correctDenom.id,
        correctToken.id,
        correctToken.name,
        correctToken.uri,
        'editedData',
        gas
      )
    ).resolves.not.toThrowError();
    const editedToken = await queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id);
    return expect(editedToken.nft?.data).toEqual('editedData');
  });

  test('transfer token - happy path', async () => {
    await expect(
      alice.nftTransfer(alice.address, correctDenom.id, correctToken.id, alice.address, bob.address, gas)
    ).resolves.not.toThrowError();
    const editedToken = await queryClient.nftModule.getNftToken(correctDenom.id, correctToken.id);
    return expect(editedToken.nft?.owner).toEqual(bob.address);
  });

  test('edit token - fails not owner', async () => {
    return expect(
      alice.nftEditToken(
        alice.address,
        correctDenom.id,
        correctToken.id,
        correctToken.name,
        correctToken.uri,
        'editedData',
        gas
      )
    ).rejects.toThrow(`failed to execute message`);
  });

  test('transfer token - fails not owner', async () => {
    return expect(
      alice.nftTransfer(alice.address, correctDenom.id, correctToken.id, alice.address, bob.address, gas)
    ).rejects.toThrow(`failed to execute message`);
  });

  test('approve token - happy path', async () => {
    await expect(
      alice.nftMintToken(
        alice.address,
        correctDenom.id,
        correctToken.name,
        correctToken.uri,
        correctToken.data,
        alice.address,
        gas
      )
    ).resolves.not.toThrowError();

    newTokenId++;
    await expect(
      alice.nftApprove(alice.address, correctDenom.id, `${newTokenId}`, bob.address, gas)
    ).resolves.not.toThrowError();

    const nft = await queryClient.nftModule.getNftToken(correctDenom.id, `${newTokenId}`);

    return expect(nft?.nft?.approvedAddresses).toContain(bob.address);
  });

  test('revoke token - happy path', async () => {
    await expect(
      alice.nftRevokeToken(alice.address, correctDenom.id, `${newTokenId}`, bob.address, gas)
    ).resolves.not.toThrowError();
    const nft = await queryClient.nftModule.getNftToken(correctDenom.id, `${newTokenId}`);

    return expect(nft?.nft?.approvedAddresses).not.toContain(bob.address);
  });

  test('revoke token - fails not approved address', async () => {
    return expect(
      alice.nftRevokeToken(alice.address, correctDenom.id, `${newTokenId}`, bob.address, gas)
    ).rejects.toThrowError(
      'Query failed with (18): failed to execute message; message index: 0: No approved address'
    );
  });

  test('approve all true - happy path', async () => {
    await expect(alice.nftApproveAll(alice.address, bob.address, true, gas)).resolves.not.toThrowError();
    return expect(queryClient.nftModule.nftIsApprovedForAll(alice.address, bob.address)).resolves.toEqual({
      isApproved: true,
    });
  });

  test('approve all false - happy path', async () => {
    await expect(alice.nftApproveAll(alice.address, bob.address, false, gas)).resolves.not.toThrowError();
    return expect(queryClient.nftModule.nftIsApprovedForAll(alice.address, bob.address)).resolves.toEqual({
      isApproved: false,
    });
  });

  test('burn token - happy path', async () => {
    await expect(
      queryClient.nftModule.getNftToken(correctDenom.id, `${newTokenId}`)
    ).resolves.not.toThrowError();
    await expect(
      alice.nftBurnToken(alice.address, correctDenom.id, `${newTokenId}`, gas)
    ).resolves.not.toThrowError();

    return expect(queryClient.nftModule.getNftToken(correctDenom.id, `${newTokenId}`)).rejects.toThrowError(
      'Query failed with (18): invalid NFT'
    );
  });

  test('burn token - fails token not found', async () => {
    return expect(
      alice.nftBurnToken(alice.address, correctDenom.id, `${newTokenId}`, gas)
    ).rejects.toThrowError(
      'Query failed with (18): failed to execute message; message index: 0: not found NFT'
    );
  });

  test('mint token - happy path', async () => {
    const nftInfos: NftInfo[] = [];
    const mintedTokenCount = 10;

    for (let i = 0; i < mintedTokenCount; i++) {
      nftInfos.push(
        new NftInfo(correctDenom.id, correctToken.name, correctToken.uri, correctToken.data, alice.address)
      );
    }

    await expect(alice.nftMintMultipleTokens(nftInfos, alice.address, gas)).resolves.not.toThrowError();

    for (let i = 0; i < mintedTokenCount; i++) {
      newTokenId += 1;
      correctToken.id = newTokenId.toString();
      await expect(
        queryClient.nftModule.getNftToken(correctDenom.id, newTokenId.toString())
      ).resolves.toEqual({ nft: correctToken });
    }
  });
});
