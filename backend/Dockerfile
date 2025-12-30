# building stage 

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build


#runtime stage

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy only what is needed
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

EXPOSE 4000

CMD ["npm" , "run" , "start"]
