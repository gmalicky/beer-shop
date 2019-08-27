Beer shop webapp [![Build Status](https://travis-ci.com/gmalicky/beer-shop.svg?branch=master)](https://travis-ci.com/gmalicky/beer-shop)
===

Simple Node.js web shop application demonstration with database, integration tests and CI pipeline.

Built with:

  * [Express](https://expressjs.com/) - Node.js web framework
  * [Pug](https://pugjs.org/api/getting-started.html) - template engine
  * [sqlite3](https://github.com/mapbox/node-sqlite3) - SQLite bindings for Node.js
  * [Cypress](https://www.cypress.io/) - JavaScript E2E test solution

User is able to:
- see offered products
- add products to cart
- check and modify the cart state
- complete an order
- query for a completed order using its id
- delete completed order

# How to

## Development

1. Clone the project
1. `npm install` to install dependencies
2. `npm run db:up` to setup database with 5 products
3. `npm run start:dev` to launch a local development server
- `npm run db:reset` to revert the database to clean state

### testing

- `npm run test:local` to run cypress integration tests locally
- `npm run cypress` to open Cypress test runner for test development with UI

## Deploy

1. Clone or copy the project
2. `npm install --production` to install without devDependencies
3. `npm run db:up` to setup database
4. `NODE_ENV=production PORT=<port> npm start` to start the server on specified port

## Functionality

Main `app.js` file handles the routes (both URL and API) and application logic. 

HTML files are rendered with template engine from `views` folder and contain embedded `client/client.js` script, which contains event listeners for buttons and inputs. 

In `db` folder, database API (`dbApi.js`) handles methods for communication with database. Other files in this folder are used to setup the schema, teardown and seed the database for tests. All products and orders (both complete and open) are saved persistently to database.

End-to-end tests are located in `cypress/integration` folder.

CI pipeline is set up using Travis CI (`.travis.yml` config) to run the tests when push is detected on any branch. If tests pass on master branch, app is deployed to Heroku (start script in `Procfile`) and can visited
at https://beer-shop.herokuapp.com/.