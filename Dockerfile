# node:18-alpine 300mb
# node:18.12.1 900mb
FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /dist
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit=dev

COPY . .
RUN npm run build:prod

CMD ["node", "dist/server.js"]
EXPOSE 3000
