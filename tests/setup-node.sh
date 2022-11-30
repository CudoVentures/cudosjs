TEST_DIR=$PWD
DATA_DIR=$TEST_DIR/test-data
BRANCH='cudos-dev'

echo 'Cloning repos...'
git clone -b $BRANCH https://github.com/CudoVentures/cudos-node.git $DATA_DIR/cudos-node
git clone -b $BRANCH https://github.com/CudoVentures/cudos-builders.git $DATA_DIR/cudos-builders

echo 'Building node...'
cd $DATA_DIR/cudos-node
make install

cd $TEST_DIR
cp $TEST_DIR'/root-node.local.env' $DATA_DIR'/cudos-builders/docker/root-node/root-node.local.env'

echo 'Editing init-root.sh...'
sed -i '' -e 's/keyring-backend os/keyring-backend test/g' $DATA_DIR'/cudos-builders/docker/root-node/scripts/init-root.sh'
# injecting code to add accounts to genesis.
# dev: how to format? - replace new lines with "\n" and escape "&"
ADD_ACC_TEXT='# add testing accounts\necho "${ACCOUNT1_MNEMONIC}" | cudos-noded keys add account1 --keyring-backend=test --recover |\& tee "${CUDOS_HOME}/account1.wallet"\nchmod 600 "${CUDOS_HOME}/account1.wallet"\naccountAddress=$(echo "${ACCOUNT1_MNEMONIC}" | cudos-noded keys show account1 -a --keyring-backend test)\ncudos-noded add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"\n\necho "${ACCOUNT2_MNEMONIC}" | cudos-noded keys add account2 --keyring-backend=test --recover |\& tee "${CUDOS_HOME}/account2.wallet"\nchmod 600 "${CUDOS_HOME}/account2.wallet"\naccountAddress=$(echo "${ACCOUNT2_MNEMONIC}" | cudos-noded keys show account2 -a --keyring-backend test)\ncudos-noded add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"\n\necho "${ACCOUNT3_MNEMONIC}" | cudos-noded keys add account3 --keyring-backend=test --recover |\& tee "${CUDOS_HOME}/account3.wallet"\nchmod 600 "${CUDOS_HOME}/account3.wallet"\naccountAddress=$(echo "${ACCOUNT3_MNEMONIC}" | cudos-noded keys show account3 -a --keyring-backend test)\ncudos-noded add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"\n\necho "${ACCOUNT4_MNEMONIC}" | cudos-noded keys add account4 --keyring-backend=test --recover |\& tee "${CUDOS_HOME}/account4.wallet"\nchmod 600 "${CUDOS_HOME}/account4.wallet"\naccountAddress=$(echo "${ACCOUNT4_MNEMONIC}" | cudos-noded keys show account4 -a --keyring-backend test)\ncudos-noded add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM},${ACCOUNT_BALANCE}cudosAdmin"\n\necho "${ACCOUNT5_MNEMONIC}" | cudos-noded keys add account5 --keyring-backend=test --recover |\& tee "${CUDOS_HOME}/account5.wallet"\nchmod 600 "${CUDOS_HOME}/account5.wallet"\naccountAddress=$(echo "${ACCOUNT5_MNEMONIC}" | cudos-noded keys show account5 -a --keyring-backend test)\ncudos-noded add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"\n\necho "${ACCOUNT6_MNEMONIC}" | cudos-noded keys add account6 --keyring-backend=test --recover |\& tee "${CUDOS_HOME}/account6.wallet"\nchmod 600 "${CUDOS_HOME}/account6.wallet"\naccountAddress=$(echo "${ACCOUNT6_MNEMONIC}" | cudos-noded keys show account6 -a --keyring-backend test)\ncudos-noded add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"\n\necho "${ACCOUNT7_MNEMONIC}" | cudos-noded keys add account7 --keyring-backend=test --recover |\& tee "${CUDOS_HOME}/account7.wallet"\nchmod 600 "${CUDOS_HOME}/account7.wallet"\naccountAddress=$(echo "${ACCOUNT7_MNEMONIC}" | cudos-noded keys show account7 -a --keyring-backend test)\ncudos-noded add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"\n\necho "${ACCOUNT8_MNEMONIC}" | cudos-noded keys add account8 --keyring-backend=test --recover |\& tee "${CUDOS_HOME}/account8.wallet"\nchmod 600 "${CUDOS_HOME}/account8.wallet"\naccountAddress=$(echo "${ACCOUNT8_MNEMONIC}" | cudos-noded keys show account8 -a --keyring-backend test)\ncudos-noded add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"'
# skip adding accounts if re-run tests without clearing the temp local test storage
grep "# add testing accounts" $DATA_DIR'/cudos-builders/docker/root-node/scripts/init-root.sh' &>/dev/null || sed -i '' -e "/\"\${FAUCET_BALANCE}\${BOND_DENOM}\"/{
    $!N
    s^fi^fi\n\n${ADD_ACC_TEXT}^
}" $DATA_DIR'/cudos-builders/docker/root-node/scripts/init-root.sh'

echo 'Starting the node in background...'
cd $DATA_DIR'/cudos-builders/tools-nodejs/init-local-node-without-docker'
chmod u+x init.sh
source ./init.sh 2>node.output &

cd $TEST_DIR
