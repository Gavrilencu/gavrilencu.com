# Stage 1 — build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiem dependențele
COPY package*.json ./
RUN npm install

# Copiem restul codului
COPY . .

# Build aplicația
RUN npm run build

# Stage 2 — production
FROM node:20-alpine

WORKDIR /app

# Copiem doar build-ul
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./

# Instalăm doar dependențe necesare pentru runtime
RUN npm install --omit=dev

# Expunem portul
EXPOSE 3000

# Pornim serverul
CMD ["node", "build"]
