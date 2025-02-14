FROM node:20

WORKDIR /app

RUN apt update && apt install -y default-mysql-client

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
