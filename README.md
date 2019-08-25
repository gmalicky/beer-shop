Beer shop webapp
===

Simple Node.js web shop application demonstration with database and integration tests.

Built with:

  * [Express](https://expressjs.com/) - Node.js web framework
  * [Pug](https://pugjs.org/api/getting-started.html) - template engine
  * [sqlite3](https://github.com/mapbox/node-sqlite3) - SQLite bindings for Node.js
  * [Cypress](https://www.cypress.io/) - JavaScript E2E test solution

Application shows some basics of eshop functionality provided via simple UI. User is able to:
- see offered products
- add products to cart
- check and modify the cart state
- complete an order
- query for a completed order using its id
- delete completed order

## Functionality

Main `app.js` file handles the routes (both URL and API) and application logic. 

HTML files are generated with template engine from `views` folder and contain embedded `client/client.js` script, which contains event listeners for buttons and inputs. 

In `db` folder, database API (`dbApi.js`) handles methods for communication with database. Other files in this folder are used to setup the schema, teardown and seed the database for tests. All products and orders (both complete and open) are saved persistently to database.

End-to-end tests are located in `cypress/integration` folder.

## Development

1. Clone the project
1. `npm install` to install dependencies
2. `npm run db:up` to setup local database including 5 example products
3. `npm start` to launch a local development server
- `npm run db:reset` to revert the database to clean state

### testing

- `npm test` to run cypress integration tests


