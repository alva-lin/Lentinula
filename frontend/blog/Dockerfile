# base image
FROM node:16 as builder
WORKDIR /app

# install and cache app dependencies
COPY ["frontend/blog/package*.json", "."]
RUN yarn config set registry https://mirrors.cloud.tencent.com/npm/ && \
    yarn

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY ["frontend/blog/", "/app"]
RUN ng build --configuration production --aot

FROM nginx:1.23 as final
COPY --from=builder /app/dist/blog /usr/share/nginx/html
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
