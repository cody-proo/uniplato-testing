FROM node:16-alpine
WORKDIR /usr/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm get cache
RUN npm install
COPY . .
RUN npm run db
RUN npx prisma generate
EXPOSE 3306
CMD ["npm", "run", "prod"]