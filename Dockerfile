# build
FROM node:12 AS build-stage

WORKDIR /deploy

COPY . .

RUN yarn
RUN yarn build

# nginx
FROM nginx:alpine AS production-stage

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /deploy/dist /usr/share/nginx/html

RUN rm -rf /deploy

CMD ["nginx", "-g", "daemon off;"]
