#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

read -p "Enter full path to your cudos-node root directory:" CUDOS_NODE_DIR
CUDOS_NODE_PROTO_DIR="$(realpath $CUDOS_NODE_DIR/proto)"
THIRD_PARTY_PROTO_DIR="$(realpath $CUDOS_NODE_DIR/third_party/proto)"
TS_PROTO_OPTS="esModuleInterop=true,forceLong=long,useOptionals=messages,useDate=false"

read -p "Enter output folder:" OUT_DIR
mkdir -p "$OUT_DIR"

protoc \
--plugin="$(yarn bin protoc-gen-ts_proto)" \
--ts_proto_out="$OUT_DIR" \
--proto_path="$CUDOS_NODE_PROTO_DIR" \
--proto_path="$THIRD_PARTY_PROTO_DIR" \
--ts_proto_opt="$TS_PROTO_OPTS" \
$CUDOS_NODE_PROTO_DIR/*/**.proto