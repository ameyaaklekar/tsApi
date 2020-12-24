FROM node:latest

WORKDIR /var/www/html/api

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "start" ]

