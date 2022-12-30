#build

FROM node:18-alpine AS build 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


#production

FROM node:18-alpine  

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist .dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

EXPOSE 3000

CMD ['node', 'dist/main.js']