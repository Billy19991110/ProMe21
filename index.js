var express = require('express');
var router = express.Router(); //***/
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

var linePerPage = 20;   //每頁產品數

router.get('/product', function (req, res) {
    var pageNo = parseInt(req.query.pageNo);     //取得傳送的目前頁數
    if (isNaN(pageNo) || pageNo < 1) {     //如果沒有傳送參數,設目前頁數為第1頁
        pageNo = 1;
    }

    conn.query('SELECT count(*) FROM `product`',
        function (err, result) {     //讀取資料總筆數
            if (err) throw err;
            var totalList = result[0].cnt;    //資料總筆數
            var totalPage = Math.ceil(totalList / linePerPage);   //總頁數

            conn.query('SELECT * FROM  `product` order by news_date desc limit ?, ?', [(pageNo - 1) * linePerPage, linePerPage],
                function (err, results) {  //根據目前頁數讀取資料
                    if (err) throw err;
                    res.render('index', {
                        data: results,
                        pageNo: pageNo,
                        totalLine: totalLine,
                        totalPage: totalPage,
                        linePerPage: linePerPage
                    });
                });
        });
});