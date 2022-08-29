# FROM node:16 as builder
FROM node:alpine AS builder
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /reposearch
ENV PATH /reposearch/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
CMD ["nx", "serve"]

