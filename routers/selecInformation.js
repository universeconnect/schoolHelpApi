const sqlApi = require("../lib/sqlApi");
module.exports = function(req,res,next){
    if("information_field"&&"information_value" in req.body){//判断是否接收到指定的参数
        let sql = `SELECT * FROM information_help as a INNER JOIN user as b ON a.information_user = b.user_id AND a.${req.body.information_field}=${req.body.information_value};`;
        sqlApi(req,sql)
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
    }else {//没有接收到指定参数
        res.send({
            "status_code":908,//未接收到参数状态码
            "data":[],
        });
    }
};

