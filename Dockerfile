FROM node:16.19.0-bullseye

WORKDIR /app

COPY . .

RUN set -xe; \
    npm install; \
    chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
