FROM cypress/browsers:node14.17.0-chrome91-ff89

WORKDIR /app

COPY ./API/package.json ./

RUN npm install

COPY ./API/ ./

CMD ["npm", "run", "cypress:run"]
