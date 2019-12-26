var express = require('express');//express
var app = express();
let mysql = require('mysql');//引入mysql模块
let bodyParser = require('body-parser');//引入用于获取post参数的模块



connection = mysql.createConnection({//创建连接
    host     : 'localhost', //主机地址
    user     : 'root',        //用户名
    password : '168168',    //密码
    database : 'universe'      //数据库名
});
connection.connect();//连接数据库



//配置body-parser模块
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



let router = require("./router");
router(app,connection);
app.listen(3000, () => console.log('Example app listening on port 3000!'))
