FROM node:18

USER root

RUN mkdir -p /home/tecsus/app/node_modules && chown -R tecsus:tecsus /home/tecsus/app

USER tecsus

WORKDIR /home/tecsus/app

COPY ./api/package.json ./

RUN npm install --ignore-scripts

COPY ./api/ ./

CMD ["npm", "run", "start"]
