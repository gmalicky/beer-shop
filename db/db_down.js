const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/shop.db');

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS products`).run(`DROP TABLE IF EXISTS orders`);
});

db.close();
