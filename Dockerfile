from node:18

WORKDIR /workspace

COPY package*.json ./

RUN yarn install

copy . .

RUN npm run build

CMD [ "node", "dist/main.js" ]