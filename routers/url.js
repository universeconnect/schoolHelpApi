const sqlApi = require("../lib/sqlApi");//引入封装的sqlAPI（该api在sql语句执行错误时会自动存放错误日志）
const pool = require('../lib/database');//引入数据库连接池
module.exports = function(req,res,next){
    pool.getConnection(function(err,connection) {//连接数据库
        if (err) throw err; // not connected!
        if (err){//连接失败
            res.send({
                "msg":"database connect error",//返回的状态信息
                "data":[],//返回的数据为空数组
            });
        }else {//连接成功
            sqlApi(req,connection,'SELECT information_type FROM `information_help`')//使用封装的sqlAPI，第三个参数是sql语句
            //当sql语句正确执行会进入.then()，传入一个函数，该函数的第一个参数是sql语句的执行结果。
            //当sql语句执行失败或.then中出现错误时都会进入.catch(),传入一个函数，该函数的第一个参数是错误信息。
            .then(function(data){//使用.then表示sql语句正确执行
                //继续执行下一个sql语句
                return sqlApi(req,connection,'SELECT * FROM `type` where type_id=' + data[0].information_type + ';');//继续执行下一个sql语句
            })
            .then(function (data) {
                res.send({//res.send()只能执行一次
                    "msg":"ok",
                    "data":data,//data是sql语句执行结果，最外层是一个数组
                });
            })
            .catch(function (error) {//sql语句执行失败或者出现错误
                res.send({
                    "msg":"sql execute error",
                    "data":[],//同样返回一个空数组
                });
            });
            connection.release();//释放连接
        }
    })
};



