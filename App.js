var express = require('express');
var app = express();
var mysql = require('mysql');//引包


var connection = mysql.createConnection({//创建连接
    host     : 'localhost', //主机地址
    user     : 'root',        //用户名
    password : '168168',    //密码
    database : 'universe'      //数据库名
});

connection.connect();

app.post('/home', (req, res) => {
    res.send({"a":500,"b":2})
})

app.get('/home01', (req, res) => {
    connection.query('SELECT * FROM `userinfo`;', function (error, results, fields) {
        if (error) throw error;//抛出错误
        res.send({"info":results})
});
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
