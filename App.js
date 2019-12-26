var express = require('express');
var app = express();
let mysql = require('mysql');//引包

global.connection = mysql.createConnection({//创建连接
    host     : 'localhost', //主机地址
    user     : 'root',        //用户名
    password : '168168',    //密码
    database : 'universe'      //数据库名
});
connection.connect();//连接数据库


let router = require("./router");
router(app);
connection.end()
app.listen(3000, () => console.log('Example app listening on port 3000!'))
