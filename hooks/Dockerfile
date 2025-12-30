FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build



FROM node:20-alpine

WORKDIR /app


# Copy only what runtime needs
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose hooks server port
EXPOSE 4001

# Start server (NOT migrations here)
CMD ["npm","run","start"]
