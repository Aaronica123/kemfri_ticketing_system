FROM nginx:1.30-alpine-slim
COPY ./frontend/nginx.conf /etc/nginx/ngnx.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]