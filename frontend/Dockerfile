FROM node:22.23-bookworm-slim as front_image
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
ARG VITE_API_KEY
ENV VITE_API_KEY=${VITE_API_KEY}
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN npm run build
EXPOSE 5173
CMD ["npm","run","dev"]



