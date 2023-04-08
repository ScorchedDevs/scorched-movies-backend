from node:18

WORKDIR /workspace

COPY package*.json ./

RUN yarn install

copy . .

RUN yarn prisma generate && yarn build

CMD [ "node", "dist/main.js" ]