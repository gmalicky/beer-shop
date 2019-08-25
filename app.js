const express = require('express');
const app = express();
const port = 3000;
const favicon = require('serve-favicon');
const db = require('./db/dbApi');

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('client'))
app.use(favicon(__dirname + '/assets/favicon.ico'));

let currentOrderNum;
const regenerateOrderNum = () => currentOrderNum = Math.floor((Math.random() * 90000) + 10000);

// generate new order number if needed
db.getOpenOrders((result) => {
    if (result.length > 0) {
        currentOrderNum = result[0].order_num
    } else {
        regenerateOrderNum();
    }
});

// views
app.get('/', (req, res) => {
    db.getProducts((result) => {
        res.render('index', {
            title: 'Beer shop',
            welcome: 'Welcome to our beer shop!',
            products: result
        });
    });
});

app.get('/cart', (req, res) => {
    db.getOpenOrders((result) => {
        res.render('cart', {
            title: 'Beer shop > Cart',
            orders: result
        });
    });
});

app.get('/order/:orderNum', (req, res) => {
    db.searchOrder(req.params.orderNum, (result) => {
        if (result.length > 0) {
            res.render('order', {
                title: 'Beer shop > Order summary',
                orders: result,
                orderNum: req.params.orderNum
            });
        } else {
            res.render('message', {
                message: 'ERROR: Order number ' + req.params.orderNum + ' does not exist.',
                color: 'red'
            });
        }
    });
});

// API
app.get('/add/:productId', (req, res) => {
    db.addOrderItem(currentOrderNum, req.params.productId, () => {
        res.sendStatus(200);
    });
});

app.get('/update/:task/:orderId', (req, res) => {
    db.updateOrderItem(req.params.task, req.params.orderId, () => {
        db.getOpenOrders((result) => {
            res.render('cart', {
                title: 'Beer shop > Cart',
                orders: result
            });
        });
    });
});

app.get('/complete', (req, res) => {
    db.completeOrder(() => {
        res.render('message', {
            message: 'Order number ' + currentOrderNum + ' completed successfully!',
            color: 'green'
        });
        regenerateOrderNum();
    });
});

app.get('/delete/:orderNum', (req, res) => {
    db.deleteOrder(req.params.orderNum, () => {
        res.render('message', {
            message: 'Order number ' + req.params.orderNum + ' was deleted.',
            color: 'red'
        });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
