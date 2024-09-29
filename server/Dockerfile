FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# production stage

FROM node:18-alpine

COPY package*.json ./

ENV NODE_ENV=production

COPY .env ./

RUN npm ci --omit=dev

# copy build output from the builder stagee

COPY --from=builder /app/dist ./dist

RUN npm install pm2 -g

COPY ecosystem.config.js .


CMD [ "pm2-runtime","start","ecosystem.config.js" ]