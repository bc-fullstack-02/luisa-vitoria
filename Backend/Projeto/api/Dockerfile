FROM node:16-alpine as base
WORKDIR /src
COPY package*.json ./

FROM base as dev

RUN npm install
COPY ./* ./

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

ENTRYPOINT [ "npm" ]

CMD [ "run", "start:docker" ]


