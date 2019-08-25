const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/shop.db');

db.serialize(() => {
    db.run(`INSERT INTO orders (order_num, product_id, amount, completed)
        VALUES
        (12345, 5, 2, 1),
        (12345, 3, 12, 1),
        (12345, 1, 30, 1)
    `);
});

db.close();
