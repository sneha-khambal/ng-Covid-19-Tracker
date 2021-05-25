#stage 1
FROM node:latest as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

RUN npm install

COPY . /app

RUN npm run build --prod


#stage 2
FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/Covid-19-Tracker /usr/share/nginx/html
