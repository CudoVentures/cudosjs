#!/bin/bash

CHAIN_ID='cudos-local-network'
FEE_FLAGS='--gas auto --gas-adjustment 1.3 --gas-prices 5000000000000acudos'

# Check if a local node is already running
if nc -vz localhost 26657 &>/dev/null || pgrep cudos-noded &>/dev/null
then
    echo 'http://localhost:26657 is busy or "cudos-noded" process is running. The tests require a fresh instance of a local node on that port.'
    read -p "Press ENTER to kill the existing node process or ctrl-C to exit..."
    pkill cudos-noded
fi

# Setup and start the node
source ./setup-node.sh

# Periodically check if the node is up
for (( i=1; ; i++ )); do
    nc -vz localhost 26657 &>/dev/null && break
    if (( $i > 25 )); then
        echo 'Error: Too many attempts to connect local node'
        exit 1
    fi 
    sleep 3
done


echo 'Starting tests...'
npx jest /tests

echo 'Stopping the node by killing the process...'
pkill cudos-noded
