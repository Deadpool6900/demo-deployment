FROM node:current-alpine3.21

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173

RUN npm run build

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]