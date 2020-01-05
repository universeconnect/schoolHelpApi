const sqlApi = require("../lib/sqlApi");//引入封装的sqlAPI（该api在sql语句执行错误时会自动存放错误日志）
module.exports = function(req,res,next){
    sqlApi(req,'SELECT * FROM `information_help` where information_title="${req.body.information_title}";')//使用封装的sqlAPI，第三个参数是sql语句
    //当sql语句正确执行会进入.then()，传入一个函数，该函数的第一个参数是sql语句的执行结果。
    //当sql语句执行失败或.then中出现错误时都会进入.catch(),传入一个函数，该函数的第一个参数是错误信息
    .then(function (data) {
        res.send({//res.send()只能执行一次
            "status_code":data?805:905,
            "data":data?data:[],
            //data是sql语句执行结果，最外层是一个数组
        });
    })
    .catch(function (error) {//sql语句执行失败或者出现错误
        res.send({
            "status_code":905,
            "data":[],//同样返回一个空数组
        });
    });
};



