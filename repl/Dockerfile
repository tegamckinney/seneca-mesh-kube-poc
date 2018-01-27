FROM node:8.3.0
LABEL maintainer="Demo Admin"

RUN mkdir /app
ENV APP_HOME=/app

COPY package.json package-lock.json $APP_HOME/
WORKDIR $APP_HOME

RUN npm install

COPY srv $APP_HOME/srv
COPY monitor $APP_HOME/monitor

CMD ["node", "./srv/prod.js"]