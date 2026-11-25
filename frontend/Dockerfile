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


FROM nginx:alpine
COPY --from=front_image /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]



