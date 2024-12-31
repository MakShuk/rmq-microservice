# Используем образ node версии 20 как базовый для этапа сборки
FROM node:20 as build

# Устанавливаем переменную окружения NODE_ENV
ENV NODE_ENV=production

# Устанавливаем рабочую директорию в контейнере
WORKDIR /opt/app/

# Копируем файлы package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем все зависимости, включая devDependencies
RUN npm ci

# Устанавливаем NestJS CLI глобально
RUN npm install -g @nestjs/cli

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Используем образ node версии 20 как базовый для финального этапа
FROM node:20-slim as production

# Устанавливаем переменную окружения NODE_ENV
ENV NODE_ENV=production

# Устанавливаем рабочую директорию в контейнере
WORKDIR /opt/app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

# Копируем собранное приложение из build stage
COPY --from=build /opt/app/dist ./dist

# Создаем папку envs и копируем в нее .env.production
COPY --from=build /opt/app/envs/.env.production ./envs/.env.production

# Запускаем приложение
CMD ["node", "dist/main"]