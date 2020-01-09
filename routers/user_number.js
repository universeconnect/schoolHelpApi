const sqlApi = require("../lib/sqlApi");
module.exports = function(req,res,next){
    console.log(req.body);//输出post数据（用于调试，上传时请删除）
    console.log(res.query);
    if(req.body.integral_number&&req.body.user_id){//判断是否接收到指定的参数
        let sql = `INSERT INTO integration_number (integral_number,user_id) VALUES(${req.body.integral_number},${req.body.user_id})`;
        let sql2 = `UPDATE user SET integration=${req.body.integral_number}+50 WHERE user_id=${req.body.user_id}`;
        console.log(sql);
        sqlApi(req,sql)
            .then(function (data) {
                console.log(sql2);
                return sqlApi(req,sql2)
            })
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
    }else {//没有接收到指定参数
        res.send({
            "status_code":908,//未接收到参数状态码
            "data":[],
        });
    }
};

