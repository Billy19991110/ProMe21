var express = require('express');
var app = express();

app.listen(3000);
app.use(express.static('public'));

/* var bodyparser = require('bodyparser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json()); */

var mysql = require('mysql');

var conn = mysql.createConnection({
    multipleStatements: true,

    database: 'test_v1',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root'

});

conn.connect(function(err) {
    console.log(err);
})

////////////////網頁首頁//////////////////
app.get('/', function(req, res) {
    conn.query('SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1` FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` WHERE `product`.`nationID` = 1 ORDER BY rand() LIMIT 4 ; SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1` FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` WHERE `product`.`nationID` = 2 ORDER BY rand() LIMIT 4 ; ',
        function(err, result) {
            res.render('index.ejs', {
                japan: result[0],
                korea: result[1]
            });
        });
})

//////////////日本頁/////////////////
app.get('/japan', function(req, res) {
    conn.query('SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1` FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` WHERE `product`.`nationID` = 1',
        function(err, result) {
            res.render('japan.ejs', {
                result
            });
        });
})

//////////////韓國頁/////////////////
app.get('/korea', function(req, res) {
    conn.query('SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1` FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` WHERE `product`.`nationID` = 2',
        function(err, result) {
            res.render('korea.ejs', {
                result
            });
        });
})

//////////////指定商品頁/////////////////
app.get('/product/:ID', function(req, res) {
    var id = req.params.ID;
    conn.query('SELECT * FROM `product`JOIN `picture` ON `product`.`productID` = `picture`.`productID`WHERE `product`.`productID` = ?', [`${id}`],
        function(err, result) {
            res.render('product.ejs', {
                result
            });
        });
})

//INSERT INTO `buy` (`byID`, `userID`, `productID`, `productNUM`) VALUES (NULL, '1', '1', '1');
/////////////新增商品到購物車/////////////
app.get('/shopp', function(req, res) {
    var userID = 1;
    var productID = 1;
    conn.query('INSERT INTO `buy` (`byID`, `userID`, `productID`, `productNUM`) VALUES (NULL, ?,?,1)', [`${userID}`, `${productID}`],
        function(err, field) {
            if (err)
                throw err;
        })
});

app.get('/car', function(req, res) {
    conn.query('SELECT * FROM `buy`',
        function(err, result) {
            res.render('shopp.ejs', {
                result
            });
        })
});

app.get('/data', function(req, res) {
    conn.query('SELECT * FROM `buy` JOIN `picture` ON `buy`.`productID` = `picture`.`productID` JOIN `product` ON `buy`.`productID` = `product`.`productID`',
        function(err, result) {
            var jsonString = JSON.stringify(result);
            res.send(jsonString);
        });
});
app.get("/cart", function(req, res) {
    conn.query('SELECT * FROM `buy` JOIN `picture` ON `buy`.`productID` = `picture`.`productID` JOIN `product` ON `buy`.`productID` = `product`.`productID`', [], function(err, result) {
        res.render("cart.ejs", {
            product: result
        });
    });
});
app.put("/cart", function(req, res) {
    conn.query("update buy set productNUM = ? where byID = ?", [req.body.productNUM, req.body.byID],
        function(err, rows) {
            res.send(JSON.stringify(req.body));
        }
    );
});
app.delete("/cart", function(req, res) {
    conn.query("delete from buy where byID = ?", [req.body.byID],
        function(err, result) {
            res.send(JSON.stringify(req.body));
        }
    );
});