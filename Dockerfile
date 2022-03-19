FROM node:latest

RUN mkdir -p /home/app

COPY ./app /home/app

CMD ["node","/home/app/server.js"]