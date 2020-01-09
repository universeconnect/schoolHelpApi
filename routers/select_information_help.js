const sqlApi = require("../lib/sqlApi");
module.exports = function(req,res,next){
    if(req.body.information_content){//判断是否接收到指定的参数
        let sql = `select * from information_help where information_content like concat('%',"${req.body.information_content}",'%')`;
        sqlApi(req,sql)
            .then(function (data) {
                res.send({
                    "status_code":data?805:905,
                    "data":data?data:[],
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

