FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm install -g typescript

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN cd ./app && npm install && ng build --prod && cd ../ && mv ./app/dist . && rm -rf ./app

EXPOSE 8080
CMD [ "node", "server.js" ]
