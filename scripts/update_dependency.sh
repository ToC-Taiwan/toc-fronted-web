#!/bin/bash
set -e

rm -rf dist
rm -rf node_modules
rm -rf pnpm-lock.yaml

pnpm i
npm i -g npm-check-updates
ncu --reject primevue,@syncfusion/ej2-base,@syncfusion/ej2-vue-charts --peer -u
ncu --peer -u -t minor -f primevue,@syncfusion/ej2-base,@syncfusion/ej2-vue-charts

pnpm i
pnpm build

git add package.json
git add pnpm-lock.yaml
