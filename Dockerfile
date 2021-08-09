FROM node:10.24-slim

EXPOSE 3000

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["node", "server.js"]
