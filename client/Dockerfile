# Use a Node.js image to build our app
FROM node:14 as build-stage

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY ./ /app/
RUN npm run build

# Use Nginx to serve the build React app
FROM nginx:1.19

COPY --from=build-stage /app/build/ /usr/share/nginx/html
EXPOSE 80


