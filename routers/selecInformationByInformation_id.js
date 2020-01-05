const sqlApi = require("../lib/sqlApi");
const pool = require('../lib/database');
module.exports = function(req,res,next){
    pool.getConnection(function(err,connection) {
        if (err){
            res.send({
                "status_code":905,//数据库连接错误
                "data":[],
            });
        }else {
            if(req.body.information_id){//判断是否接收到指定的参数
                let sql = `SELECT * FROM information_help WHERE information_id=${req.body.information_id};`;
                sqlApi(req,connection,sql)
                .then(function (data) {
                    res.send({
                        "status_code":805,
                        "data":data
                    });
                })
                .catch(function (error) {
                    console.log(error);//输出sql语句执行错误的错误对象，可以知道sql错在哪。
                    res.send({
                        "status_code":905,//错误状态码
                        "data":[],
                    });
                });
                connection.release();
            }else {//没有接收到指定参数
                res.send({
                    "status_code":908,//未接收到参数状态码
                    "data":[],
                });
            }
        }
    })
};

