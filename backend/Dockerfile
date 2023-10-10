FROM node:16-alpine3.17
WORKDIR /app
ADD . .
RUN npm install
ADD . /app/
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]