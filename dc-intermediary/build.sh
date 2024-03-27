#!/bin/bash

CONTAINER="dc-intermediary"
REPOSITORY="oydeu"
TAG="latest"

# read commandline options
BUILD_CLEAN=false
DOCKER_UPDATE=false
BUILD_ARM=false
PLATFORM="linux/amd64"
BUILD_X86=true
BUILD_LOCAL=false
DEBUG_OPTION=""
DOCKERFILE="./docker/Dockerfile"

while [ $# -gt 0 ]; do
    case "$1" in
        --local*)
            # setopt localoptions rmstarsilent
            rm -f docker/local-gem/*
            cp ~/dev/semcon/ruby-gem/pkg/semcon-`cat ~/dev/semcon/ruby-gem/VERSION`.gem docker/local-gem
            cp ~/dev/oydid/ruby-gem/pkg/oydid-`cat ~/dev/oydid/ruby-gem/VERSION`.gem docker/local-gem
            BUILD_LOCAL=true
            DOCKERFILE="${DOCKERFILE}-local"
            ;;
        --clean*)
            BUILD_CLEAN=true
            ;;
        --dockerhub*)
            DOCKER_UPDATE=true
            ;;
        --arm*)
            BUILD_X86=false
            BUILD_ARM=true
            PLATFORM="linux/arm64"
            DOCKERFILE="${DOCKERFILE}.arm64v8"
            TAG="arm64v8"
            ;;
        --x86*)
            BUILD_X86=true
            PLATFORM="linux/amd64"
            ;;
        --debug*)
            DEBUG_OPTION="--progress=plain"
            ;;
        *)
            printf "unknown option(s)\n"
            if [ "${BASH_SOURCE[0]}" != "${0}" ]; then
                return 1
            else
                exit 1
            fi
    esac
    shift
done

if $BUILD_CLEAN; then
    docker build $DEBUG_OPTION --platform $PLATFORM --no-cache -f $DOCKERFILE -t $REPOSITORY/$CONTAINER:$TAG .
else
    docker build $DEBUG_OPTION --platform $PLATFORM -f $DOCKERFILE -t $REPOSITORY/$CONTAINER:$TAG .
fi

if $DOCKER_UPDATE; then
    docker push $REPOSITORY/$CONTAINER:$TAG
fi
