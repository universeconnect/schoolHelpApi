var express = require('express');//express
var app = express();
let bodyParser = require('body-parser');//引入用于获取post参数的模块

/*引入用于获取post参数的模块
引入用于获取post参数的模块connection = mysql.createConnection({//创建连接
    host     : 'localhost', //主机地址
    user     : 'root',        //用户名
    password : '168168',    //密码
    database : 'ssm'      //数据库名
});
connection.connect();//连接数据库*/


//配置body-parser模块
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress ||  req.socket.remoteFamily || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0];
    }
    let port =  req.connection.remoteProt || req.socket.remoteProt || '';
    console.log("收到请求：ip："+ip+"     端口："+port);
    next();
});



let router = require("./router");
router(app);


//设置端口
const {HTTP_PORT} = require('./config')
app.listen(HTTP_PORT, () => console.log('Example app listening on port 3000!'))
