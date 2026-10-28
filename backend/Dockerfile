FROM node:22.23-bookworm-slim
COPY . .
EXPOSE 3001
RUN npm install
ARG url
ENV url=${url}
ARG api_key
ENV api_key=${api_key}
ARG endPoint
ENV endpoint=${endPoint}
ARG port
ENV port=${port}
ARG accessKey
ENV accessKey=${accessKey}
ARG secretKey
ENV secretKey=${secretKey}
ARG frontendurl
ENV frontendurl=${frontendurl}
ARG redisurl
ENV redisurl=${redisurl}
ARG rabbitmq
ENV rabbitmq=${rabbitmq}

RUN echo "$url,${api_key},${endPoint},${port},${accessKey},${secretKey},${frontendurl},${redisurl},${rabbitmq}"
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
CMD ["node","./files/index.js"]
