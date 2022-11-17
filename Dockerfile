FROM node:18

WORKDIR /var/app

RUN apt-get update && apt-get install -y yarn npm

# COPY . /var/app/.

RUN npm install -g next

# RUN yarn install && yarn build