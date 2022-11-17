# Running
Steps to run
`yarn install && yarn build`
`next start`

Using docker compose
`docker compose up --build`

you can build the image by modifying the Dockerfile, and use docker run
`docker run -it -p 127.0.0.1:80:3000 zeropoint-react next start`