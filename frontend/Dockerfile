FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Для разработки (запускает сервер)
CMD ["npm", "start"]
