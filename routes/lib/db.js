var mysql = require('mysql');

var conn = mysql.createConnection({
    multipleStatements: true,
    // 無可用連線時是否等待pool連線釋放(預設為true)
    waitForConnections: true,
    // 連線池可建立的總連線數上限(預設最多為10個連線數)
    connectionLimit: 10,

    database: 'test_v1',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root'

});

conn.connect(function (err) {
    console.log(err);
})