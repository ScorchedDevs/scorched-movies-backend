from node:18

WORKDIR /workspace

COPY package.json ./

COPY yarn.lock ./

RUN yarn config set network-timeout 300000

RUN yarn install

copy . .

RUN yarn prisma generate && yarn build

CMD [ "node", "dist/main.js" ]