const sqlApi = require("../lib/sqlApi");
module.exports = function(req,res,next){
    if(req.body.information_user){//判断是否接收到指定的参数
        let sql = `SELECT * FROM information_help WHERE information_user=${req.body.information_user}`;
        console.log(sql);//输出sql数据,可以查看sql语句是否正确（用于调试，上传时请删除）
        sqlApi(req,sql)
        .then(function (data) {
            res.send({
                "status_code":data?805:905,//成功返回ok失败返回fail（除啦查询操作其他操作的data都是是否成功）
                "data":data,
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

