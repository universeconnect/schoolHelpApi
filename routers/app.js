const sqlApi = require("../lib/sqlApi");//引入封装的sqlAPI（该api在sql语句执行错误时会自动存放错误日志）
const pool = require('../lib/database');//引入数据库连接池
module.exports = function(req,res,next){
    pool.getConnection(function(err) {//连接数据库
        if (err){//连接失败
            res.send({
                "msg":"database connect error",//返回的状态信息
                "data":[],//返回的数据为空数组
            });
        }else {//连接成功
            sqlApi(req,'SELECT * FROM `information_help`')//使用封装的sqlAPI，第一个参数是req，第二个参数是sql语句
            //当sql语句正确执行会进入.then()，传入一个函数，该函数的第一个参数是sql语句的执行结果。
            //当sql语句执行失败或.then中出现错误时都会进入.catch(),传入一个函数，该函数的第一个参数是错误信息。
            .then(function(data){//使用.then表示sql语句正确执行
                res.send({
                    "msg":"ok",
                    "data":data,//data是sql语句执行结果，最外层是一个数组
                });
            })
            .catch(function (error) {//sql语句执行失败或者出现错误
                res.send({
                    "msg":"sql execute error",
                    "data":[],//同样返回一个空数组
                });
            })
        }
    })
};



