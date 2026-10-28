FROM node:22.23-bookworm-slim as front_image
COPY . .
RUN npm install
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
ARG VITE_API_KEY
ENV VITE_API_KEY=${VITE_API_KEY}
RUN echo "URL is: $VITE_API_URL"
RUN echo "API is: ${VITE_API_KEY}"
RUN npm run build
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*


FROM nginx:1.30-alpine-slim
COPY --from=front_image ./dist  /frontend/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
