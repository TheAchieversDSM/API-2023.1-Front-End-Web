FROM cypress/browsers:node14.17.0-chrome91-ff89

WORKDIR /app

COPY ./api/package.json ./

RUN npm install

COPY ./api/ ./

CMD ["npm", "run", "cypress:run"]
