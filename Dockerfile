FROM node:19.7.0-alpine As development

WORKDIR /wishlist-api

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm ci

COPY . .

FROM node:19.7.0-alpine As build

WORKDIR /wishlist-api

COPY package*.json ./
COPY --from=development /wishlist-api/node_modules ./node_modules
COPY . .

ENV NODE_ENV production

RUN npm run build
RUN npm ci --only=production

RUN npm cache clean --force

FROM node:19.7.0-alpine As production

COPY --from=build /wishlist-api/node_modules ./node_modules
COPY --from=build /wishlist-api/dist ./dist

CMD [ "node", "dist/App" ]
