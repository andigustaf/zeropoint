# Zeropoint

Simple attendance app built from react with Google as backend, AWS s3 for storage

# Prerequisite

- Google Firebase Json conf

```json
{
    "apiKey": "AIxxxx",
    "authDomain": "",
    "databaseURL": "",
    "projectId": "",
    "storageBucket": "",
    "messagingSenderId": "",
    "appId": "",
    "measurementId": ""
}
```

- AWS Json conf

```json
{
  "accessKeyId":"",
  "secretAccessKey":"",
  "region":"",
  "bucket" : "",
  "bucket-url" : ""
}
```

and place it under src/config

# Running

Steps to run

`yarn install && yarn build`

`next start`

Using docker compose

`docker compose up --build`

you can build the image by modifying the Dockerfile, and use docker run

`docker run -it -p 127.0.0.1:80:3000 zeropoint-react next start`