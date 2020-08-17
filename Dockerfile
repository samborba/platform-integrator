FROM node:alpine

WORKDIR /user/src/app

COPY package*.json ./

RUN npm cache clean --force

RUN npm install

COPY . ./

ENTRYPOINT ["npm", "start"]