var express = require('express');
var app = express();

app.listen(3000);

var mysql = require('mysql');

var conn = mysql.createConnection({
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
    conn.query('SELECT * FROM `nation`',
        function (err, result) {
            // nation = result
            res.render('index.ejs', { result });
        });
    /* conn.query('SELECT * FROM `product`',
        function (err, result) {
            product = result
        }); */

})
//////////////////網頁首頁/////////////////////

//////////////拿國家資料/////////////////
app.get('/nation', function (req, res) {
})