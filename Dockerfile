FROM node:18
WORKDIR /app
COPY package.json /.
RUN npm install --force
COPY . .
EXPOSE 3030
CMD ["npm", "run", "dev"]