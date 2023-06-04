FROM cypress/browsers:node18.12.0-chrome107

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "cypress:run"]