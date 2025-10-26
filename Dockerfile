FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Копируем весь код приложения
COPY . .

RUN npm run build

RUN npm install -g serve

# Команда для запуска приложения
CMD ["serve", "-s", "dist", "-l", "3000"]