FROM node:16-alpine

# Create app directory.
WORKDIR /usr/src/app
COPY . .

EXPOSE 80

RUN npm install sequelize-cli -g
RUN npm install

RUN sequelize db:migrate

CMD node src/index.js