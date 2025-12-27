# Build stage

FROM node:24-bookworm AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Final stage

RUN npm run build

FROM nginx:stable-bookworm

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
