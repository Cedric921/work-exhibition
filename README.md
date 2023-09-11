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

### Users

- users list

```bash
  /users [GET]
```

```js
  // response
  {
    "message": "users list",
    "data": [
        {
            "createdAt": "2023-09-11T09:16:40.955Z",
            "updatedAt": "2023-09-11T09:16:40.955Z",
            "deletedAt": null,
            "id": "e829ce5a-9361-4013-9c3a-52b9dde6811a",
            "name": "cedric",
            "email": "ckarungu921@gmail.com",
            "password": "$argon2id$v=19$m=65536,t=3,p=4$5RCWeycd9TxwevPWSOvj7Q$qAOI7QaGA+9VoTSwi7CehyJVfJ2iPpY14ft+BlOaNSQ",
            "lastName": "karungu",
            "biography": null,
            "tel": "97949392922",
            "avatar": null
        }
    ]
  }
```

- user data

```bash
    /users/:userId [GET]
```

```js
  // response
  {
    "message": "user data",
    "data": {
        "createdAt": "2023-09-11T09:16:40.955Z",
        "updatedAt": "2023-09-11T09:16:40.955Z",
        "deletedAt": null,
        "id": "e829ce5a-9361-4013-9c3a-52b9dde6811a",
        "name": "cedric",
        "email": "ckarungu921@gmail.com",
        "password": "$argon2id$v=19$m=65536,t=3,p=4$5RCWeycd9TxwevPWSOvj7Q$qAOI7QaGA+9VoTSwi7CehyJVfJ2iPpY14ft+BlOaNSQ",
        "lastName": "karungu",
        "biography": null,
        "tel": "97949392922",
        "avatar": null,
        "projects": [
            {
                "createdAt": "2023-09-11T09:41:02.114Z",
                "updatedAt": "2023-09-11T09:41:02.114Z",
                "deletedAt": null,
                "id": "58ca2d1b-ee3b-41c1-8d22-29d346ae847d",
                "title": "start up project",
                "description": "start up for devs",
                "activityDomain": "tech",
                "duration": "10 year",
                "website": null,
                "budget": "6000",
                "imagesUrl": [
                  "https://res.cloudinary.com/dteyspzef/image/upload/v1694433388/file_gvpr22.jpg",
                  "https://res.cloudinary.com/dteyspzef/image/upload/v1694433433/file_czr4z3.png"
            ],
                "collaborators": {
                    "names": [
                        {
                            "name": "ben"
                        },
                        {
                            "name": "ced"
                        },
                        {
                            "name": "dav"
                        }
                    ]
                }
            }
        ]
    }
}
```

- change avatar

```bash
  /users/avatar [PUT]
```

```js
// req need bear token
// send file in files field (form data)
// reponse
  {
    "message": "user data updated",
    "data": {
        "createdAt": "2023-09-11T09:16:40.955Z",
        "updatedAt": "2023-09-11T10:47:28.942Z",
        "deletedAt": null,
        "id": "e829ce5a-9361-4013-9c3a-52b9dde6811a",
        "name": "cedric",
        "email": "ckarungu921@gmail.com",
        "password": "$argon2id$v=19$m=65536,t=3,p=4$5RCWeycd9TxwevPWSOvj7Q$qAOI7QaGA+9VoTSwi7CehyJVfJ2iPpY14ft+BlOaNSQ",
        "lastName": "karungu",
        "biography": null,
        "tel": "97949392922",
        "avatar": "https://res.cloudinary.com/dteyspzef/image/upload/v1694429248/file_zlir9v.png"
    }
  }
```

### projects

- projects list

```js
  /projects [GET] //all
  /projects?q=education  [GET]//with  search param
```

```js
  {
    "message": "all projects",
    "data": [
        {
            "createdAt": "2023-09-11T09:41:02.114Z",
            "updatedAt": "2023-09-11T09:41:02.114Z",
            "deletedAt": null,
            "id": "58ca2d1b-ee3b-41c1-8d22-29d346ae847d",
            "title": "start up project",
            "description": "start up for devs",
            "activityDomain": "tech",
            "duration": "10 year",
            "website": null,
            "budget": "6000",
            "imagesUrl": [
                "https://res.cloudinary.com/dteyspzef/image/upload/v1694433388/file_gvpr22.jpg",
                "https://res.cloudinary.com/dteyspzef/image/upload/v1694433433/file_czr4z3.png"
            ],
            "collaborators": {
                "names": [
                    {
                        "name": "ben"
                    },
                    {
                        "name": "ced"
                    },
                    {
                        "name": "dav"
                    }
                ]
            },
            "user": {
                "createdAt": "2023-09-11T09:16:40.955Z",
                "updatedAt": "2023-09-11T09:16:40.955Z",
                "deletedAt": null,
                "id": "e829ce5a-9361-4013-9c3a-52b9dde6811a",
                "name": "cedric",
                "email": "ckarungu921@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$5RCWeycd9TxwevPWSOvj7Q$qAOI7QaGA+9VoTSwi7CehyJVfJ2iPpY14ft+BlOaNSQ",
                "lastName": "karungu",
                "biography": null,
                "tel": "97949392922",
                "avatar": null
            }
        }
    ]
  }

```

- create

```bash
  /projects [POST]
```

```js
  // body req
  {
    "title": "start up project",
    "description":"start up for devs",
    "activityDomain":"tech",
    "duration": "10 year",
    "budget": "6000",
    "collaborators": ["ben", "ced", "dav"]
  }
  // req header authorization
  beader token

  // response
  {
    "message": "project created",
    "data": {
        "title": "start up project",
        "description": "start up for devs",
        "activityDomain": "tech",
        "duration": "10 year",
        "budget": "6000",
        "collaborators": {
            "names": [
                {
                    "name": "ben"
                },
                {
                    "name": "ced"
                },
                {
                    "name": "dav"
                }
            ]
        },
        "user": {
            "createdAt": "2023-09-11T09:16:40.955Z",
            "updatedAt": "2023-09-11T09:16:40.955Z",
            "deletedAt": null,
            "id": "e829ce5a-9361-4013-9c3a-52b9dde6811a",
            "name": "cedric",
            "email": "ckarungu921@gmail.com",
            "lastName": "karungu",
            "biography": null,
            "tel": "97949392922",
            "avatar": null
        },
        "deletedAt": null,
        "website": null,
        "imagesUrl": null,
        "createdAt": "2023-09-11T09:41:02.114Z",
        "updatedAt": "2023-09-11T09:41:02.114Z",
        "id": "58ca2d1b-ee3b-41c1-8d22-29d346ae847d"
    }
  }
```

- projects details

```js
  /projects/:projectID
```

```js
  // response
  {
    "message": "project details",
    "data": {
        "createdAt": "2023-09-11T09:41:02.114Z",
        "updatedAt": "2023-09-11T09:41:02.114Z",
        "deletedAt": null,
        "id": "58ca2d1b-ee3b-41c1-8d22-29d346ae847d",
        "title": "start up project",
        "description": "start up for devs",
        "activityDomain": "tech",
        "duration": "10 year",
        "website": null,
        "budget": "6000",
        "imagesUrl": [
          "https://res.cloudinary.com/dteyspzef/image/upload/v1694433388/file_gvpr22.jpg",
          "https://res.cloudinary.com/dteyspzef/image/upload/v1694433433/file_czr4z3.png"
            ],
        "collaborators": {
            "names": [
                {
                    "name": "ben"
                },
                {
                    "name": "ced"
                },
                {
                    "name": "dav"
                }
            ]
        },
        "user": {
            "createdAt": "2023-09-11T09:16:40.955Z",
            "updatedAt": "2023-09-11T09:16:40.955Z",
            "deletedAt": null,
            "id": "e829ce5a-9361-4013-9c3a-52b9dde6811a",
            "name": "cedric",
            "email": "ckarungu921@gmail.com",
            "password": "$argon2id$v=19$m=65536,t=3,p=4$5RCWeycd9TxwevPWSOvj7Q$qAOI7QaGA+9VoTSwi7CehyJVfJ2iPpY14ft+BlOaNSQ",
            "lastName": "karungu",
            "biography": null,
            "tel": "97949392922",
            "avatar": null
        }
    }
  }
```
