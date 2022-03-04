var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyparser = require('body-parser');

app.listen(3000);
app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));

/* var bodyparser = require('bodyparser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json()); */


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
var cookieParser = require('cookie-parser')
const loggedIn = require('./controllers/loggedin');

app.use(cookieParser())
app.get('/',loggedIn ,(req, res) =>{
    console.log('cookie',req.user); 
    if (req.user){
    conn.query('SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1` FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` WHERE `product`.`nationID` = 1 ORDER BY rand() LIMIT 4 ; SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1` FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` WHERE `product`.`nationID` = 2 ORDER BY rand() LIMIT 4 ; ',
    function (err, result) {
        res.render('index.ejs', {
            japan: result[0],
            korea: result[1],
            status: 'loggedIn', 
            user: req.user
        });
    
    })}else{
        conn.query('SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1` FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` WHERE `product`.`nationID` = 1 ORDER BY rand() LIMIT 4 ; SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1` FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` WHERE `product`.`nationID` = 2 ORDER BY rand() LIMIT 4 ; ',
        function (err, result) {
            res.render('index.ejs', {
                japan: result[0],
                korea: result[1],
                status: 'no', 
                user: 'nothing'
            });
        
        })
    } 
})


//////////////日本頁/////////////////
app.get('/japan/page:NUM', function (req, res) {
    let pageNum = req.params.NUM;
    let start, end;
    if (pageNum == null) {
        pageNum = 1;
        start = 0;
        end = 12;
    } else {
        start = (pageNum - 1) * 12;
        end = 12;
    }

    conn.query('SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1`, (SELECT COUNT(*) FROM `product`) AS COUNT FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` WHERE `product`.`nationID` = 1 LIMIT ?,?', [start, end],
        function (err, result) {
            res.render('japan.ejs', {
                result
            });
        });
})


//////////////韓國頁/////////////////
app.get('/korea/page:NUM', function (req, res) {

    let pageNum = req.params.NUM;
    let start, end;
    if (pageNum == null) {
        pageNum = 1;
        start = 0;
        end = 12;
    } else {
        start = (pageNum - 1) * 12;
        end = 12;
    }

    conn.query('SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1`, (SELECT COUNT(*) FROM `product`) AS COUNT FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` WHERE `product`.`nationID` = 2 LIMIT ?,?', [start, end],
        function (err, result) {
            res.render('korea.ejs', {
                result
            });
        });
})

//////////////指定商品頁/////////////////
app.get('/product/:ID', function (req, res) {
    let id = req.params.ID;
    conn.query('SELECT * FROM `product`JOIN `picture` ON `product`.`productID` = `picture`.`productID`WHERE `product`.`productID` = ?', [`${id}`],
        function (err, result) {
            res.render('product.ejs', {
                result
            });
        });
})

//INSERT INTO `buy` (`byID`, `userID`, `productID`, `productNUM`) VALUES (NULL, '1', '1', '1');

app.get('/data', function (req, res) {
    conn.query('SELECT * FROM `buy` JOIN `picture` ON `buy`.`productID` = `picture`.`productID` JOIN `product` ON `buy`.`productID` = `product`.`productID`',
        function (err, result) {
            var jsonString = JSON.stringify(result);
            res.send(jsonString);
        });
});
app.get("/cart", function (req, res) {
    conn.query('SELECT * FROM `buy` JOIN `picture` ON `buy`.`productID` = `picture`.`productID` JOIN `product` ON `buy`.`productID` = `product`.`productID`',
        [],
        function (err, result) {
            res.render("cart.ejs", { product: result });
        });
});
app.put("/cart", function (req, res) {
    conn.query("update buy set productNUM = ? where id = ?",
        [req.body.productNUM, req.body.id],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        });
    console.log(req.body.productNUM);
});
app.delete("/cart", function (req, res) {
    conn.query("delete from buy where byID = ?",
        [req.body.byID],
        (err, result) => {
            res.send(JSON.stringify(req.body));
        });
});
app.get("/checkout", function (req, res) {
    res.render("checkout.ejs");
});



// ====== login ======================================================================

const db = require('./routes/db-config')
const cookie = require('cookie-parser');
const req = require('express/lib/request');
const PORT = process.env.PORT || 5000;

app.use('/js', express.static(__dirname + '/public/js'))
app.use('/css', express.static(__dirname + '/public/css'))

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(cookie());
app.use(express.json())

db.connect((err) => {
    if (err) throw err;
    console.log('database connected');
})
// ===== 許願專區=====
var
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    busboy = require("then-busboy"),
    fileUpload = require('express-fileupload'),
    mysql = require('mysql'),
    bodyParser = require("body-parser");
const { log } = require('console');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test_v1'
});

connection.connect();

global.db = connection;

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());


app.get('/wishList', routes.wishList); //call for main index page
app.post('/', routes.wishList); //call for signup post 
//Middleware

app.get('/todowishingPond', function (req, res) {
    connection.query('SELECT * FROM `users_image`',
        function (err, result) {
            res.render('todowishingPond.ejs', {
                result
            });
        })
});
// =====demo=====


app.use('/', require('./routes/pages'))
app.use('/api', require('./controllers/auth'));



// ====== login ======================================================================