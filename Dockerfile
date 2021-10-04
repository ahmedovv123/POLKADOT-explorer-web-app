FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8081
CMD ["http-server", "dist"]

# build stage
FROM node:lts-alpine as build-stage
WORKDIR /POLKADOT-web-app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build



FROM node:16.8.0 as production-stage
COPY /server /server
COPY --from=build-stage /POLKADOT-web-app/dist /home/dist
WORKDIR /server
RUN npm install
CMD ["node", "index.js"]

