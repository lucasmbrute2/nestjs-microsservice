FROM node:12.14.0-alpine3.11

RUN apk add --no-cache bash

RUN apt get update \
  apt-get -y install sudo

USER node

RUN npm install @nestjs/cli@7.5.6

WORKDIR /home/node/app