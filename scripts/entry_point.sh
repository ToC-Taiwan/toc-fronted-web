#!/bin/bash

sed -i "s/127.0.0.1:26670/${TMT_HOST}:${TMT_PORT}/g" /etc/nginx/nginx.conf
nginx -g 'daemon off;'
