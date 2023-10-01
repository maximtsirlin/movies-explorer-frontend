# Используем официальный образ Node.js с LTS версией
FROM node:14 as build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы из текущей директории внутрь контейнера
COPY . .

# Собираем приложение
RUN npm run build

# Создаем production-ready образ nginx
FROM nginx:alpine

# Копируем собранные файлы React приложения из предыдущего этапа внутрь контейнера nginx
COPY --from=build /app/build /usr/share/nginx/html

# Определяем порт на котором будет работать nginx (по умолчанию 80)
EXPOSE 80

# Запускаем nginx в фоновом режиме при старте контейнера
CMD ["nginx", "-g", "daemon off;"]