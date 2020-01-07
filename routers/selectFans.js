const sqlApi = require("../lib/sqlApi");
module.exports = function(req,res,next){
    if("user_id" in req.body){//判断是否接收到指定的参数
        let sql = `SELECT * FROM user,(SELECT fans_user FROM a,user WHERE a.user=user.user_id AND user.user_id=${user_id}) as b WHERE b.fans_user=user.user_id ;`;
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

