const sqlApi = require("../lib/sqlApi");
module.exports = function(req,res,next){
    if(req.body.information_id){//判断是否接收到指定的参数
        let sql = `UPDATE information_help SET information_status=1 WHERE information_id=${req.body.information_id}`;
        sqlApi(req,sql)
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

