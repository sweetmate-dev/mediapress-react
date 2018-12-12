FROM nginx:stable
LABEL maintainer="mark@afrotoss.com.au"

COPY ./src/config/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY ./dist /var/www/mediapress/

EXPOSE 80
