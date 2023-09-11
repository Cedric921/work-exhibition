## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Routes

base URI `https://work-exhibition.onrender.com/api/v1`

### auth

- signup

```bash
  /auth/login [POST]
```

```js
  // body
  {
    "name": "cedric",
    "lastName": "karungu",
    "email" : "ckarungu921@gmail.com",
    "password": "123456",
    "tel": "97949392922"
  }

  // response
  {
    "message": "account created ",
    "data": {
        "name": "cedric",
        "lastName": "karungu",
        "email": "ckarungu921@gmail.com",
        "tel": "97949392922",
        "deletedAt": null,
        "biography": null,
        "avatar": null,
        "createdAt": "2023-09-11T09:16:40.955Z",
        "updatedAt": "2023-09-11T09:16:40.955Z",
        "id": "e829ce5a-9361-4013-9c3a-52b9dde6811a",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODI5Y2U1YS05MzYxLTQwMTMtOWMzYS01MmI5ZGRlNjgxMWEiLCJpYXQiOjE2OTQ0MjM4MDEsImV4cCI6MTY5NDk0MjIwMX0.j8Jrwlbl7DlzS6_YnjWtIHGkshb23YEdNVD6HGzIM7c"
    }
}
```

- login

```bash
  /auth/login [POST]
```

```js
  // body
  {
    "email": "ckarungu921@gmail.com",
    "password": "123456"
  }

  // response
  {
    "message": "logged in ",
    "data": {
        "createdAt": "2023-09-11T09:16:40.955Z",
        "updatedAt": "2023-09-11T09:16:40.955Z",
        "deletedAt": null,
        "id": "e829ce5a-9361-4013-9c3a-52b9dde6811a",
        "name": "cedric",
        "email": "ckarungu921@gmail.com",
        "lastName": "karungu",
        "biography": null,
        "tel": "97949392922",
        "avatar": null,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODI5Y2U1YS05MzYxLTQwMTMtOWMzYS01MmI5ZGRlNjgxMWEiLCJpYXQiOjE2OTQ0MjM4MzgsImV4cCI6MTY5NDk0MjIzOH0.uzFd7C8L7NXWbgBKNJXL9jCtoW0lONngI7tgMWoVxrM"
    }
  }
```
