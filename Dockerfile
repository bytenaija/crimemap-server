FROM node:latest

WORKDIR /home/node
ENV NODE_ENV=production

COPY package.json /home/node/
RUN npm install

COPY app /home/node/app
COPY server.js /home/node/

CMD ["node", "server.js"]