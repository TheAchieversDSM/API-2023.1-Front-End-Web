FROM node:18

RUN useradd -ms /bin/bash tecsus

USER tecsus

WORKDIR /home/tecsus/app

COPY ./api/package.json ./

RUN npm install --ignore-scripts

COPY ./api/ ./

CMD ["npm", "run", "start"]