from node:18

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn config set network-timeout 300000

RUN yarn install

COPY . .

RUN yarn prisma generate && yarn build

CMD [ "/bin/bash", "-c", "yarn migrate:dev; node dist/src/main.js" ]