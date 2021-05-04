FROM node:14-alpine as builder

WORKDIR /srv
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN mkdir app \
  && cp -a package.json package-lock.json .env app/ \
  && cd app \
  && NODE_ENV=production npm ci


FROM node:14-alpine

ENV NODE_ENV production
WORKDIR /srv/app

COPY --from=builder /srv/.next .next
COPY --from=builder /srv/app .

EXPOSE 80

CMD ["npm", "start"]
