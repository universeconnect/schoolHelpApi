const sqlApi = require("../lib/sqlApi");
module.exports = function(req,res,next){
    if("user_id"&&"fans_user_id" in req.body){//判断是否接收到指定的参数
        let sql = `SELECT * FROM fans WHERE user=${req.body.user_id} AND fans_user=${req.body.fans_user_id};`;//查询是否已经关注过了
        sqlApi(req,sql)
        .then(function (data) {
            if(data.length >=1){//已经关注过了
                res.send({
                    "status_code":805,
                    "data":[{"msg":0}],
                });
            }else{
                let sql = `INSERT INTO fans(user,fans_user) VALUES(${req.body.user_id},${req.body.fans_user_id});`;
                return sqlApi(req,sql);
            }
        })
        .then((data)=>{
            res.send({
                "status_code":805,
                "data":[{"msg":1}],//关注成功
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

