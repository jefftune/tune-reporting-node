FROM tunesdk/tune-reporting-node-setup:latest

MAINTAINER jefft@tune.com

WORKDIR /data/tune-reporting-node

RUN npm install

ENV NODE_ENV=test
ENV API_KEY=b951b30cc17b6a77dad4f1ef1471bd5d

CMD ["./node_modules/.bin/mocha"]
