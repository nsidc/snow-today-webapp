FROM node:18-alpine AS builder

WORKDIR /app

COPY package* ./
# Install from lockfile
RUN npm ci

# NOTE: _DO NOT_ copy node_modules, that would overwrite the install we just
# did.
# COPY scripts ./scripts
COPY src ./src
COPY webpack.config.js tsconfig.json .eslintrc.js .stylelintrc ./

ARG env="production"
RUN if [ "$env" = "production" ]; then \
  npm run build; \
fi

# These lines are only required to use this stage of the build to run a dev
# server (see docker-compose.dev.yml).
EXPOSE 3000
CMD ["npm", "start"]


FROM nginx:1.23-alpine AS server

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .

# Make a self-signed SSL certificate
RUN mkdir /cert
COPY ./nginx/openssl.conf .
RUN apk add openssl
RUN openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -config openssl.conf \
    -keyout /cert/ssl.key -out /cert/ssl.crt

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
