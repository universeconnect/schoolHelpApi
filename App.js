const express = require('express');//express
const app = express();
let bodyParser = require('body-parser');//引入用于获取post参数的模块
let il = require("./lib/insertLog");

global.connection = require('./lib/database');
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

