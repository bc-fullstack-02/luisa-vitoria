FROM node:16-alpine as base
WORKDIR /src
COPY package*.json ./

FROM base as dev

RUN npm install
COPY ./* ./
CMD ["npm", "start"]

