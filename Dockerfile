#Build Steps
FROM node:14.15.3-alpine as build-step

RUN mkdir /app
WORKDIR /app
RUN npm install -g @angular/cli@14.2.0
COPY package.json /app
RUN npm install
COPY . /app

RUN npm run build --configuration=production


#Run Steps
FROM nginxinc/nginx-unprivileged  
RUN rm -rf /etc/nginx/nginx.conf.default && rm -rf /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
###RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-step /app/dist/front-biblioteca-front /usr/share/nginx/html

EXPOSE 8080:8080