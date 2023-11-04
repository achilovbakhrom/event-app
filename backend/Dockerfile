FROM node:21-alpine3.17

WORKDIR /var/www/app

# COPY ./backend/package*.json /var/www/app/

# COPY ./backend/package*.json .

COPY . .

RUN yarn install && yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]