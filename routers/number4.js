const sqlApi = require("../lib/sqlApi");
module.exports = function(req,res,next){
    if(req.body.information_type){//判断是否接收到指定的参数
        let sql = `SELECT * FROM information_help as a INNER JOIN user as b ON a.information_user = b.user_id AND a.information_type = ${req.body.information_type};`;
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

