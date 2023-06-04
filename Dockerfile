FROM node:18

WORKDIR /app

COPY ./api/package.json ./

RUN npm install

COPY ./api/ ./

CMD ["npm", "run", "start"]