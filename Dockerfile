FROM node:18-alpine AS builder

WORKDIR /app

# Install locked dependencies
# NOTE: `node_modules` is intentionally not copied into the image! We want to
# be sure that the environment installed into the image is exactly as specified
# in our lock file.
COPY package*.json ./
RUN npm ci

# COPY scripts ./scripts
COPY src ./src
COPY index.html ./
COPY webpack.config.js tsconfig.json .eslintrc.js .stylelintrc.json ./

ARG env="production"
RUN if [ "$env" = "production" ]; then \
  npm run build; \
fi

# These lines are only required to use this stage of the build to run a dev
# server (see compose.dev.yml).
EXPOSE 3000
CMD ["npm", "run", "serve"]


FROM nginx:1.23-alpine AS server

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .

# Make a self-signed SSL certificate
RUN mkdir /cert
COPY ./nginx/openssl.conf .
RUN apk add openssl
RUN openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -config openssl.conf \
    -keyout /cert/ssl.key -out /cert/ssl.crt

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
