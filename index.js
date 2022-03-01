const express = require('express')
const db = require('./routes/db-config')
const app = express();
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
    routes = require('./routes')
    , http = require('http')
    , path = require('path'),
    busboy = require("then-busboy"),
    fileUpload = require('express-fileupload'),
    mysql = require('mysql'),
    bodyParser = require("body-parser");

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());


app.get('/wishList', routes.wishList);//call for main index page
app.post('/', routes.wishList);//call for signup post 
//Middleware

app.get('/todowishingPond', function (req, res) {
    connection.query('SELECT * FROM `users_image`',
        function (err, result) {
            res.render('todowishingPond.ejs', { result });
        })
});
// =====demo=====


app.use('/', require('./routes/pages'))
app.use('/api', require('./controllers/auth'));

app.listen(PORT)