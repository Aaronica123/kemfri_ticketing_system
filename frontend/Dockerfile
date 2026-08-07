FROM node:22.23-bookworm-slim as front_image
COPY . .
RUN npm install
RUN npm run build
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*


FROM nginx:1.30-alpine-slim
COPY --from=front_image ./dist  /frontend/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
