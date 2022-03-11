var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.listen(3000);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
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

conn.connect(function(err) {
    console.log(err);
})

////////////////網頁首頁//////////////////
var cookieParser = require('cookie-parser')
const loggedIn = require('./controllers/loggedin');

app.use(cookieParser())
app.get('/', loggedIn, (req, res) => {
    let sql = "SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1` FROM `product` \
    JOIN `picture` ON `product`.`productID` = `picture`.`productID` \
    WHERE `product`.`nationID` = 1 ORDER BY rand() LIMIT 4 ; \
    SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1` FROM `product` \
    JOIN `picture` ON `product`.`productID` = `picture`.`productID` \
    WHERE `product`.`nationID` = 2 ORDER BY rand() LIMIT 4";

    if (req.user) {
        conn.query(sql,
            function(err, result) {
                res.render('index.ejs', {
                    japan: result[0],
                    korea: result[1],
                    status: 'loggedIn',
                    user: req.user
                });
            })
    } else {
        conn.query(sql,
            function(err, result) {
                res.render('index.ejs', {
                    japan: result[0],
                    korea: result[1],
                    status: 'no',
                    user: 'nothing'
                });
            })
    }
})

let sqlPage = "SELECT `product`.`productID`,`product`.`productName`,`product`.`productPrice`,`picture`.`pictureSeat1`, \
        (SELECT COUNT(*) FROM `product`) AS COUNT FROM `product` JOIN `picture` ON `product`.`productID` = `picture`.`productID` \
        WHERE `product`.`nationID` = ? LIMIT ?,?";

//////////////日本頁/////////////////
app.get('/japan/page:NUM', function(req, res) {
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
    conn.query(sqlPage, [1, start, end],
        function(err, result) {
            res.render('japan.ejs', {
                result,
                status: 'loggedIn',
            });
        });
})
//////////////韓國頁/////////////////
app.get('/korea/page:NUM', function(req, res) {
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
    conn.query(sqlPage, [2, start, end],
        function(err, result) {
            res.render('korea.ejs', {
                result,
                status: 'loggedIn',
            });
        });
})

//////////////指定商品頁/////////////////
app.get('/product/:ID', function(req, res) {
    let sql = "SELECT * FROM `product`JOIN `picture` ON `product`.`productID` = `picture`.`productID` \
                WHERE `product`.`productID` = ?";
    let id = req.params.ID;
    conn.query(sql, [id],
        function(err, result) {
            res.render('product.ejs', {
                product: result,
                status: 'loggedIn',
            });
        }
    );
})

app.get('/shopp/:ID', function(req, res) {
    let sql = "INSERT INTO `buy` (`byID`, `id`, `productID`, `productNUM`) VALUES (NULL, '7', ? , '1') ; \
                SELECT * FROM`product`JOIN `picture` ON`product`.`productID` = `picture`.`productID` \
                WHERE`product`.`productID` = ? "
    let id = req.params.ID;
    conn.query(sql, [id, id],
        function(err, result) {
            res.render('product.ejs', {
                product: result[1],
                status: 'loggedIn',
            })
        }
    );
})

//INSERT INTO `buy` (`byID`, `userID`, `productID`, `productNUM`) VALUES (NULL, '1', '1', '1');

let sqlCart = "SELECT `buy`.`byID`, `buy`.`id`, `buy`.`productID`, \
                `buy`.`productNUM`, `picture`.`pictureSeat1`, `product`.`productName`, `product`.`productPrice` FROM `buy` \
                JOIN `picture` ON `buy`.`productID` = `picture`.`productID`\
                JOIN `product` ON `buy`.`productID` = `product`.`productID`";
//WHERE `buy`.`id` = ?";

app.get('/data', function(req, res) {
    // let id = req.user.id;
    conn.query(sqlCart, [],
        function(err, result) {
            var jsonString = JSON.stringify(result);
            res.send(jsonString);
        });
});
app.get("/cart", function(req, res) {
    // let id = req.user.id;
    conn.query(sqlCart, [],
        function(err, result) {
            res.render("cart.ejs", {
                product: result,
                status: 'loggedIn'
            });
        });
});
app.put("/cart", function(req, res) {
    conn.query("update buy set productNUM = ? where byID = ?", [req.body.productNUM, req.body.byID],
        function(err, rows) {
            res.send(JSON.stringify(req.body));
        });
});
app.delete("/cart", function(req, res) {
    conn.query("delete from buy where byID = ?", [req.body.byID],
        (err, result) => {
            res.send(JSON.stringify(req.body));
        });
});
app.get("/checkout", function(req, res) {
    res.render("checkout.ejs", {
        status: 'loggedIn'
    });
});
app.get("/checkout_2", function(req, res) {
    res.render("checkout_2.ejs", {
        status: 'loggedIn'
    });
});
app.get("/flipCard", function(req, res) {
    res.render("flipCard.ejs", {
        status: 'loggedIn'
    });
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
const {
    log
} = require('console');
const {
    compareSync
} = require('bcryptjs');

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


app.get('/wishList', routes.wishList);
app.post('/', routes.wishList);

app.get('/todowishingPond', function(req, res) {
    connection.query('SELECT * FROM `users_image`',
        function(err, result) {
            res.render('todowishingPond.ejs', {
                result,
                status: 'loggedIn',
            });
        })
});


app.get('/customer_feedback', function(req, res) {
    connection.query('SELECT * FROM `form` ORDER BY `form`.`id` DESC ',
        function(err, result) {
            res.render('customer_feedback.ejs', {
                result,
                status: 'loggedIn',
            });
        })
});


// =====demo=====


app.use('/', require('./routes/pages'))
app.use('/api', require('./controllers/auth'));



// ====== login ======================================================================