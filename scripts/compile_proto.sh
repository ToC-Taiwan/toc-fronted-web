#!/bin/bash

set -e

npm install -g protoc-gen-ts
rm -rf toc-trade-protobuf
git clone git@github.com:ToC-Taiwan/toc-trade-protobuf.git

OUT_DIR="./src/pb"

rm -rf $OUT_DIR
mkdir -p $OUT_DIR

protoc \
    --proto_path=./toc-trade-protobuf/protos/v3 \
    --ts_opt=no_grpc \
    --ts_opt=no_namespace \
    --ts_out="${OUT_DIR}" \
    ./toc-trade-protobuf/protos/v3/*/*.proto

rm -rf toc-trade-protobuf
git add $OUT_DIR
