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

conn.connect(function (err) {
    console.log(err);
})

////////////////網頁首頁//////////////////
app.get('/', function (req, res) {
    conn.query('SELECT * FROM `nation` ; SELECT * FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID`',
        function (err, result) {
            res.render('index.ejs', { nation: result[0], product: result[1] });
        });
})
///////////////網頁首頁//////////////////

//////////////所有商品頁/////////////////
app.get('/product', function (req, res) {
    conn.query('SELECT * FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` JOIN `class` ON `product`.`classID` = `class`.`classID`',
        function (err, result) {
            // product = result
            res.render('Allproduct.ejs', { result });
        });
})
//////////////所有商品頁/////////////////

//////////////指定商品頁/////////////////
app.get('/product/:ID', function (req, res) {
    var id = req.params.ID;
    conn.query('SELECT * FROM `product`JOIN `picture` ON `product`.`productID` = `picture`.`productID`WHERE `product`.`productID` = ?',
        [`${id}`],
        function (err, result) {
            res.render('product.ejs', { result });
        });
})
//////////////指定商品頁/////////////////
//INSERT INTO `buy` (`byID`, `userID`, `productID`, `productNUM`) VALUES (NULL, '1', '1', '1');
/////////////新增商品到購物車/////////////
app.get('/shopp', function (req, res) {
    var userID = 1;
    var productID = 1;
    conn.query('INSERT INTO `buy` (`byID`, `userID`, `productID`, `productNUM`) VALUES (NULL, ?,?,1)',
        [`${userID}`, `${productID}`],
        function (err, field) {
            if (err)
                throw err;
        })
});

app.get('/car', function (req, res) {
    conn.query('SELECT * FROM `buy`',
        function (err, result) {
            res.render('shopp.ejs', { result });
        })
});