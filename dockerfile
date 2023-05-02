FROM node:alpine3.16

# Create app directory
WORKDIR /app

COPY package*.json ./

COPY alumnos.json ./data

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "ejer4.js" ]