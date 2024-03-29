# Awesome Nest.js Auth RBAC GraphQL Postgre Prisma Boilerplate

## Getting started

```bash
# Install packages
$ pnpm install
```

## Databases setup

```bash
# configure .env
$ cp .env.example .env

# run local postres
$ docker-compose up -d

# generate prisma client
$ npx prisma generate

# run migrations
$ npx prisma migrate dev

# run db seed
$ npx prisma db seed
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev
```
