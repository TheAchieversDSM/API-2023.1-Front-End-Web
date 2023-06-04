FROM node:18

USER root

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

USER node

WORKDIR /home/node/app

COPY ./api/package.json ./

RUN npm install --ignore-scripts

COPY ./api/ ./

CMD ["npm", "run", "start"]
