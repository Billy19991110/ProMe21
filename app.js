var express = require('express');
var app = express();

app.listen(3000);

var mysql = require('mysql');

var conn = mysql.createConnection({
    database: 'demo',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root'
});

conn.connect(function(err){
    console.log(err);
})

///////////////////網頁首頁/////////////////////
app.get('/', function(req, res){
    res.render('index.ejs');
})
//////////////////網頁首頁/////////////////////

//////////////拿國家資料/////////////////
app.get('/nation', function(req, res){
    conn.query('select * from `nation`',
    [],
    function(err, result){
        res.render('index.ejs',{
            nation: result
        });
    });
})