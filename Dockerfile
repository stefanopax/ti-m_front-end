FROM node:alpine

# add `/app/node_modules/.bin` to $PATH
ENV PATH $PROJECT_HOME/node_modules/.bin:$PATHE

# install dependencies
RUN npm install

# copy app folders
COPY . .

ENTRYPOINT ["npm","start"]
