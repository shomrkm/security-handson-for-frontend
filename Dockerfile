FROM node:19.8-alpine

ENV PROJECT_ROOTDIR /usr/src/security-handson

WORKDIR $PROJECT_ROOTDIR

COPY package.json package-lock.json $PROJECT_ROOTDIR

RUN npm install

COPY . $PROJECT_ROOTDIR

EXPOSE 3000
