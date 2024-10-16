# syntax = docker/dockerfile:1.4.1

FROM node:23.0.0-alpine3.20 AS payload
LABEL name='api build'
# enable corepack
RUN corepack enable
# set user and working directory and copy all project files
USER node
WORKDIR /home/node/workspace/dev
COPY --chown=node . .
# install node module for plugin
RUN pnpm install
# set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV development
ENV NODE_OPTIONS --no-deprecation
ENV PATH  /home/node/workspace/dev/node_modules/.bin:$PATH
# set internal port
EXPOSE 3000
# start test environment
CMD pnpm run dev

FROM mongo:8.0.1-noble as db
LABEL name='db build'
# database admin user
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=secret
# set internal port
EXPOSE 27017