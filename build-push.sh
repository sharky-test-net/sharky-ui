#!/bin/bash

IMAGE="sharky-ui"
VERSION="00019"

docker build -t ${IMAGE}:${VERSION} . && \
docker tag ${IMAGE}:${VERSION} "gcr.io/sharky-259408/${IMAGE}:latest" && \
docker tag ${IMAGE}:${VERSION} "gcr.io/sharky-259408/${IMAGE}:${VERSION}" && \
docker push "gcr.io/sharky-259408/${IMAGE}:latest" && \
docker push "gcr.io/sharky-259408/${IMAGE}:${VERSION}"

exit 0
