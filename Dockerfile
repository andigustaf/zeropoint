FROM node:16

WORKDIR /var/app

RUN apt-get update && apt-get install -y yarn npm

COPY . /var/app/.

RUN npm install -g next

RUN yarn install && yarn build

EXPOSE 3000

RUN chown 1000:1000 .next

CMD next start