# Microblog Challenge

## Setup

Follow the steps to setup your environment

- Fill your `.env` file based on the `.env.sample` sample
- Create the database with `docker-compose up`
- Install the dependencies with `pnpm install`

> NOTE: If you don't have pnpm activated just run these two commands <br> `corepack enable`<br>`corepack prepare pnpm@latest --activate` <br>
you don't need to download a thing, it comes already with node

### Development

After that you may want to run the migrations for checking everything is working

- For filling the database `pnpm prisma:migrate`
- Now you have to generate the models `pnpm prisma:generate`

Now you can _safely_ run `pnpm dev`

### Production

You can run the following commands for deploying

- Deploy the database `pnpm prisma:deploy`

You can nest the project start `pnpm start` with tools like `pm2`

## Project Scripts

Description of the project scripts made on `package.json`

| Command                | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `pnpm start`           | Launches the project in production.              |
| `pnpm dev`             | Launches the project in development mode.        |
| `pnpm build`           | Transpiles the project ready for production.     |
| `pnpm format`          | Formats the entire code as configured.           |
| `pnpm lint`            | Runs ESLint to check the project files.          |
| `pnpm test`            | Runs Jest tests.                                 |
| `pnpm coverage`        | Runs Jest tests and generates a coverage report. |
| `pnpm prisma:reset`    | Resets the Prisma migrations.                    |
| `pnpm prisma:migrate`  | Runs Prisma migrations in development mode       |
| `pnpm prisma:generate` | Generates Prisma client.                         |
| `pnpm prisma:seed`     | Seeds the Prisma database.                       |
| `pnpm prisma:format`   | Formats the Prisma schema.                       |
