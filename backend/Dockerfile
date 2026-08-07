FROM node:22.23-bookworm-slim
COPY . .
EXPOSE 3001
RUN npm install
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
CMD ["node","./files/index.js"]
