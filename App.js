const express = require('express');//express
const app = express();
var bodyParser = require('body-parser');//引入用于获取post参数的模块

let il = require("./lib/insertLog");
/*引入用于获取post参数的模块
引入用于获取post参数的模块connection = mysql.createConnection({//创建连接
    host     : 'localhost', //主机地址
    user     : 'root',        //用户名
    password : '168168',    //密码
    database : 'ssm'      //数据库名
});
connection.connect();//连接数据库*/

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());




app.use((req,res,next)=>{
    il(req);//添加请求日志
    next();
});

//开放public目录，该目录用于存放静态资源
app.use('/public/',express.static(__dirname + '/public/'));


let router = require("./router");
router(app);


//设置端口
const {HTTP_PORT} = require('./config');
app.listen(HTTP_PORT, () => console.log('Example app listening on port 3000!'));
