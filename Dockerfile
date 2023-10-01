# Используем официальный образ Node.js для сборки приложения
FROM node:18 as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Собираем приложение
RUN npm run build

# Создаем образ Nginx для запуска приложения
FROM nginx:latest

# Копируем собранные файлы из предыдущего этапа в папку /usr/share/nginx/html
COPY --from=build /app/build /usr/share/nginx/html

# Копируем файл nginx.conf в папку /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Добавляем папку vendor со статикой
COPY src/vendor /usr/share/nginx/html/vendor

# Экспонируем порт 80, на котором будет доступно приложение
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]