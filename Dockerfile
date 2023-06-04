FROM node:18

RUN useradd -ms /bin/bash api
USER api
WORKDIR /home/api/app
COPY ./api/package.json ./
RUN npm install --ignore-scripts --quiet && chown -R api:api /home/api/app
COPY ./api/ ./
CMD ["npm", "run", "start"]
