FROM node:18

RUN useradd -ms /bin/bash api
USER api
WORKDIR /home/api/app
COPY ./api/package.json ./
RUN chown -R api /var/lib/apt/lists
RUN npm install
COPY ./api/ ./
CMD ["npm", "run", "start"]
