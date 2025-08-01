FROM node:20-alpine

WORKDIR /app

# Gestion du cache de Docker lors du build
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "api/index.js"]