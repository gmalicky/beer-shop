const sqlite3 = require('sqlite3').verbose();

const getProducts = (result) => {
    const db = new sqlite3.Database('./db/shop.db');

    db.all(`SELECT * FROM products`, (err, rows) => {
        if (err) return console.error(err);

        result(rows);
    });

    db.close();
};

const addOrderItem = (orderNum, productId, result) => {
    const db = new sqlite3.Database('./db/shop.db');

    db.get(`SELECT * FROM orders WHERE product_id = ${productId} AND completed = 0`, (err, row) => {
        if (err) return console.error(err);

        if (!row) {
            db.run(`INSERT INTO orders (order_num, product_id, amount)
                VALUES (${orderNum}, ${productId}, 1)`, (err) => {
                    if (err) return console.error(err);
                    result();
                });
        } else {
            db.run(`UPDATE orders SET amount = amount + 1 WHERE product_id = ${row.product_id}
            AND completed = 0`, (err) => {
                    if (err) return console.error(err);
                    result();
                });
        }
    });

    db.close();
};

const updateOrderItem = (task, orderId, result) => {
    const db = new sqlite3.Database('./db/shop.db');
    let sign;

    if (task == 'add') {
        sign = '+';
    } else if (task == 'del') {
        sign = '-';
    }

    db.get(`SELECT amount FROM orders WHERE order_id = ${orderId} AND completed = 0`, (err, row) => {
        if (row.amount <= 1 && sign == '-') {
            db.run(`DELETE FROM orders WHERE order_id = ${orderId}`, (err) => {
                if (err) return console.error(err);
                result();
            });
        } else {
            db.run(`UPDATE orders SET amount = amount ${sign} 1 WHERE order_id = ${orderId}
            AND completed = 0`, (err) => {
                    if (err) return console.error(err);
                    result();
                });
        }
    });

    db.close();
};

const getOpenOrders = (result) => {
    const db = new sqlite3.Database('./db/shop.db');

    db.all(`SELECT order_id, order_num, amount, name, price FROM orders
        INNER JOIN products on products.product_id = orders.product_id
        WHERE completed = 0`, (err, rows) => {
            if (err) return console.error(err);
            result(rows);
        });

    db.close();
};

const completeOrder = (result) => {
    const db = new sqlite3.Database('./db/shop.db');

    db.run(`UPDATE orders SET completed = 1 WHERE completed = 0`, (err) => {
            if (err) return console.error(err);
            result();
        });

    db.close();
};

const searchOrder = (orderNum, result) => {
    const db = new sqlite3.Database('./db/shop.db');

    db.all(`SELECT order_id, order_num, amount, name, price FROM orders
    INNER JOIN products on products.product_id = orders.product_id
    WHERE order_num = ${orderNum} AND completed = 1`, (err, rows) => {
            if (err) return console.error(err);
            result(rows);
        });

    db.close();
};

const deleteOrder = (orderNum, result) => {
    const db = new sqlite3.Database('./db/shop.db');

    db.run(`DELETE FROM orders WHERE order_num = ${orderNum} AND completed = 1`, (err) => {
            if (err) return console.error(err);
            result();
        });

    db.close();
};

module.exports.getProducts = getProducts;
module.exports.getOpenOrders = getOpenOrders;
module.exports.addOrderItem = addOrderItem;
module.exports.updateOrderItem = updateOrderItem;
module.exports.completeOrder = completeOrder;
module.exports.searchOrder = searchOrder;
module.exports.deleteOrder = deleteOrder;
