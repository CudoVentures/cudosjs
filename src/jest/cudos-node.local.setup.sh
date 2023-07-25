#!/bin/bash -e

# set current working directory to cudosjs/src/jest
cd $(dirname $0)

# load environment variables
source ./cudos-node.local.env
# set CUDOS_HOME global env to be used as default --home folder
export CUDOS_HOME=$CUDOS_HOME
# cleanup data folder from previous runs
rm -rf $CUDOS_HOME

# the tests require cudos-noded binary
# our github actions workflow does this
# otherwise we need to manually clone the repo and build from source
if [[ $GITHUB_ACTIONS != true ]]; then
  rm -rf cudos-node
  git clone --branch=$BINARY_VERSION https://github.com/CudoVentures/cudos-node.git &> /dev/null || true
  cd cudos-node
  make install &> /dev/null
fi

# initialize data folder with config and genesis
cudos-noded init $MONIKER --chain-id=$CHAIN_ID &> /dev/null

# create self-delegate account
echo $VALIDATOR_MNEMONIC | cudos-noded keys add validator --keyring-backend=test --recover
# get self-delegate address
validatorAddress=$(cudos-noded keys show validator -a --keyring-backend=test)
# fund self-delegate and add to genesis
cudos-noded add-genesis-account $validatorAddress ${VALIDATOR_BALANCE}

# create orchestrator account
echo $ORCH_MNEMONIC | cudos-noded keys add orch --keyring-backend=test --recover
# get orchestrator address
orchAddress=$(cudos-noded keys show orch -a --keyring-backend=test)
# fund orchestrator and add to genesis
cudos-noded add-genesis-account $orchAddress ${ORCH_BALANCE}

# create validator account
cudos-noded gentx validator ${MIN_SELF_DELEGATION}${DENOM} ${ORCH_ETH_ADDRESS} ${orchAddress} --min-self-delegation=$MIN_SELF_DELEGATION  --chain-id=$CHAIN_ID --keyring-backend=test &> /dev/null
# add to genesis
cudos-noded collect-gentxs &> /dev/null

# set minimum-gas-prices
sed -i.bak "s/minimum-gas-prices = \"\"/minimum-gas-prices = \"$GAS_PRICE\"/" $CUDOS_HOME/config/app.toml
# set denom name
sed -i.bak "s/\"stake\"/\"$DENOM\"/g" $CUDOS_HOME/config/genesis.json
# set validator self-delegate address
sed -i.bak "s/\"static_val_cosmos_addrs\"\: \[\]/\"static_val_cosmos_addrs\": [\"$validatorAddress\"]/" $CUDOS_HOME/config/genesis.json
# set token contract address on ethereum
sed -i.bak "s/\"erc20_to_denoms\"\: \[\]/\"erc20_to_denoms\": [{\"erc20\":\"$CUDOS_TOKEN_CONTRACT_ADDRESS\",\"denom\":\"$DENOM\"}]/" $CUDOS_HOME/config/genesis.json
