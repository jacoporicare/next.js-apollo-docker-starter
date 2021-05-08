FROM node:14-alpine as builder

WORKDIR /srv
RUN npm i -g npm
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN mkdir build \
  && mv package.json package-lock.json .next .env node_modules build/ \
  && cd build \
  && npm prune --production


FROM node:14-alpine

ENV NODE_ENV production
WORKDIR /srv/app

COPY --from=builder /srv/build .

EXPOSE 80

CMD ["npm", "start"]
