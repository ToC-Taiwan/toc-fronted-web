#!/bin/bash

docker buildx build -t ghcr.io/toc-taiwan/toc-fronted-web .
docker system prune --volumes -f
