FROM node:20-alpine

WORKDIR /app

# Install dependencies first (cache layer)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# Run migrations then start
CMD ["sh", "-c", "node config/migrate.js && node server.js"]

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3001/health || exit 1
