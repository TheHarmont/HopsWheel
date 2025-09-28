FROM node:22.18.0-alpine
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

# Start the application
CMD [ "npm", "run", "start" ]
