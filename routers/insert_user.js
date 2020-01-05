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
            console.log(req.body);//输出post数据（用于调试，上传时请删除）
            console.log(res.query);//输出get数据（用于调试，上传时请删除）

            if(req.body.user_name&&req.body.nickname&&req.body.avatarurl&&req.body.sex&&req.body.city&&req.body.phone&&req.body.integration&&req.body.role_id&&req.body.hobbt_help_id){//判断是否接收到指定的参数

                let sql = `INSERT INTO user (user_name,nickname,avatarurl,sex,city,phone,integration,role_id,hobbt_help_id) VALUES("${req.body.user_name}","${req.body.nickname}","${req.body.avatarurl}",${req.body.sex},"${req.body.city}","${req.body.phone}",${req.body.integration},${req.body.role_id},${req.body.hobbt_help_id})`;//因为hobby_name字段是varchar类型所以${}两边有"包裹。

                console.log(sql);//输出sql数据,可以查看sql语句是否正确（用于调试，上传时请删除）

                sqlApi(req,connection,sql)
                    .then(function (data) {
                        res.send({
                            "status_code":data?805:905,//成功返回ok失败返回fail（除啦查询操作其他操作的data都是是否成功）
                            "data":[],
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

