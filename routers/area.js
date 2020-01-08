const sqlApi = require("../lib/sqlApi");
module.exports = function(req,res,next){
    if("information_type" in req.body){//判断是否接收到指定的参数
        let sql = `SELECT information_latitude,information_longitude,COUNT(information_town) as sum FROM information_help WHERE information_type=${req.body.information_type} GROUP BY information_town;`;
        sqlApi(req,sql)
        .then(function (data) {
            res.send({
                "status_code":805,
                "data":data
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
