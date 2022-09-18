# Uniplato API

This repository is a collective of opinionated testing api

# How This Repository Work

This repository contains two main module that called user and category .every module has its own controller , router , validationSchema , etc. for implementing this testing api we use object oriented programming concept for managing source code

# Technologies

> express,
> typescript,
> jsonwebtoken,
> bcrypt,
> joi,
> prisma

# EndPoints

- Category Endpoints

  - GET /category -> for selecting all categories
  - GET /category/:id -> for selecting single category by id
  - POST /category -> for create new category based on title and amount
  - PATCH /category/:id -> for updating title and amount of category based on id

- User Endpoints
  - POST /user/signup -> for signing up new user in system that based on email, password, role, bio
  - POST /user/login -> for login based on email and password
  - GET /user -> get user profile based on token

# How Use This API

follow these steps to work with this api

### Install Third Party Package

> for use this api first of all you must install dependencies

- npm install

### Prisma

> for orm we use prisma to manage database query, for use it first of all you must inject all models into specefic database. for that you must you use

- first specify correct database_url on .env file
- npx prisma migrate dev --name you-migrate-name

### Environment Variables

> for running prisma on specefic database you need url. that url points to database . and you also need port for running server on specefic routes

- PORT
- DATABASE_URL
- SECRET_KEY
- TOKEN_EXP

### At The End Start And Enjoy That
> after doing all previos steps , now you ready to use this apis
- npm start