const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/shop.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        product_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        price REAL
    )`).run(`CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY,
        order_num INTEGER NOT NULL,
        product_id INTEGER,
        amount INTEGER NOT NULL,
        completed INTEGER DEFAULT 0,
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`);
    db.run(`INSERT INTO products (name, price)
        VALUES
        ("Lager", 1.80),
        ("IPA", 2.30),
        ("Stout", 2.10),
        ("Wheat beer", 2.80),
        ("APA", 3.00)
    `);
});

db.close();
