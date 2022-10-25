#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install -g @nestjs/cli@7.5.6

npm run start:dev