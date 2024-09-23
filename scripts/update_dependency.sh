#!/bin/bash
set -e

rm -rf dist
rm -rf node_modules
rm -rf package-lock.json

npm i
npm i -g npm-check-updates
npm i -g npm-check-updates
ncu --reject primevue --peer -u
ncu --peer -u -t minor -f primevue

npm install
npm run build

git add package.json
git add package-lock.json
