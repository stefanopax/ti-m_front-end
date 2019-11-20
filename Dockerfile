#### Stage 1: Build the react application
FROM node:alpine

RUN mkdir -p /opt/app
ENV PROJECT_HOME /opt/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH $PROJECT_HOME/node_modules/.bin:$PATH

# copy package json
ARG PACKAGE="./package.json"
COPY $PACKAGE $PROJECT_HOME/package.json

WORKDIR $PROJECT_HOME

# install dependencies
RUN npm install

# copy app folders
COPY ./src $PROJECT_HOME/src
COPY ./public $PROJECT_HOME/public

# run express server
RUN npm start

#RUN nohup node $PROJECT_HOME/src/service/Proxy.js >> app.log 2>&1 &

CMD ["node","$PROJECT_HOME/src/service/Proxy.js"]