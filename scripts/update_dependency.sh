#!/bin/bash
set -e

rm -rf dist
rm -rf node_modules
rm -rf package-lock.json

# npm i -g npm-check-updates
# ncu -u

npm install
npm run build

git add package.json
git add package-lock.json
