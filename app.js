var express = require('express');
var app = express();

app.listen(3000);
app.use(express.static('public'));

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

///////////////////網頁首頁/////////////////////
app.get('/', function (req, res) {
    conn.query('SELECT * FROM `nation` ; SELECT * FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` JOIN `class` ON `product`.`classID` = `class`.`classID`',
        function (err, result) {
            res.render('index.ejs', { nation: result[0], product: result[1] });
        });

})
//////////////////網頁首頁/////////////////////

//////////////所有商品頁/////////////////
app.get('/product', function (req, res) {
    conn.query('SELECT * FROM `product`',
        function (err, result) {
            // product = result
            res.render('product.ejs', { result });
        });
})
