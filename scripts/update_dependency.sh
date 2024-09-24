#!/bin/bash
set -e

rm -rf dist
rm -rf node_modules
rm -rf pnpm-lock.yaml

pnpm i
npm i -g npm-check-updates
ncu --reject primevue --peer -u
ncu --peer -u -t minor -f primevue

pnpm i
pnpm build

git add package.json
git add pnpm-lock.yaml
