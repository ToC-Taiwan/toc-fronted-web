FROM nginx:stable-alpine

RUN apk update && apk add -U tzdata

ENV TZ=Asia/Taipei \
    TMT_HOST=127.0.0.1 \
    TMT_PORT=26670

COPY ./dist /usr/share/nginx/html/tmt-dist
COPY ./ads.txt /usr/share/nginx/adsense/ads.txt
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./scripts/entry_point.sh /usr/share/nginx/html/entry_point.sh

RUN chmod +x /usr/share/nginx/html/entry_point.sh
CMD ["sh","/usr/share/nginx/html/entry_point.sh"]
