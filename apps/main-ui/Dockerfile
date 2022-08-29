FROM my-base-image:nx-base AS builder

ARG NODE_ENV
ARG BUILD_FLAG
ENV NX_ADMIN_ENV=production

WORKDIR /app/builder
COPY . .
RUN npm nx build main-ui ${BUILD_FLAG}

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/builder/dist/apps/main-ui ./
COPY --from=builder /app/builder/apps/main-ui/nginx.conf /etc/nginx/nginx.conf