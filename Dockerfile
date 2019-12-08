FROM node:12-alpine AS builder

RUN npm install -g typescript@~3.5.3
RUN npm install -g @angular/cli@~8.3.20

WORKDIR /usr/src/app

COPY app .
RUN npm install
RUN ng build --prod

FROM node:12-alpine

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./server/package*.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle server source.
COPY server ./server

# Bundle app source.
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080
CMD [ "node", "server/index.js" ]
