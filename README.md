# Exchange Aggregator backend app.
This app enables users to register, login and  upload a CSV of exchanges metadata in to a database and fetch this.

Built with TypeScript, NestJS, MongoDB and Docker.

## Installation

```bash
$ npm install
```

## Running the app

Remove .example, from te end of the .env.example file name.
Install then start Mongo DB, by following the official documentation.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

To test manually, import the postman.json in to your postman application to interract with the server and the database.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


Nest is [MIT licensed](LICENSE).
