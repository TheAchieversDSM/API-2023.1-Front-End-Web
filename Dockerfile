FROM node:18

RUN useradd -ms /bin/bash api
USER api
WORKDIR /home/api/app
COPY ./api/package.json ./
RUN mkdir -p /home/api/app/node_modules && chown -R api:api /home/api/app
RUN npm install --ignore-scripts --quiet
COPY ./api/ ./
CMD ["npm", "run", "start"]
