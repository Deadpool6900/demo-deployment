# FROM node:24

# WORKDIR /app

# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5173

# RUN npm run build

# CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]


# Stage 1: Build
FROM node:24 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run (only needs build output + preview server)
FROM node:24-slim
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

EXPOSE 5173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
