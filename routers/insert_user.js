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
            if(req.body.user_name&&
            req.body.nickname&&
            req.body.avatarurl&&
            req.body.sex&&
            req.body.city&&
            req.body.phone&&
            req.body.integration&&
            req.body.role_id&&
            req.body.hobbt_help_id){//判断是否接收到指定的参数
                let sql = `INSERT INTO user (user_name,nickname,avatarurl,sex,city,phone,integration,role_id,hobbt_help_id) VALUES("${req.body.user_name}","${req.body.nickname}","${req.body.avatarurl}",${req.body.sex},"${req.body.city}","${req.body.phone}",${req.body.integration},${req.body.role_id},${req.body.hobbt_help_id})`;
                sqlApi(req,connection,sql)
                    .then(function (data) {
                        res.send({
                            "status_code":data?805:905,
                            "data":[],
                        });
                    })
                    .catch(function (error) {
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

