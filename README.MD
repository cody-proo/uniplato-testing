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

# How Use This API

follow these steps to work with this api

## First npm install

for install third party packages and dependencies you must use ( npm install )

## Prisma
for orm we use prisma to manage database query, for use it first of all you must inject all models into specefic database. for that you must you npx prisma migrate dev --name you-migrate-name
