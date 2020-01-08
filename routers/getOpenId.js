const axios = require("axios");
const {APP_ID,APP_SECRET} = require("../config");
module.exports = function(req,res,next){
    if("code" in req.body){//判断是否接收到指定的参数
        axios.get("https://api.weixin.qq.com/sns/jscode2session",{
            params:{
                appid:APP_ID,
                secret:APP_SECRET,
                js_code:req.body.code,
                grant_type:'authorization_code'
            }
        })
        .then(function (data) {
            res.send(data.data);
        })
        .catch(function (data) {
            res.send(data.data)
        });
    }else {//没有接收到指定参数
        res.send({
            "status_code":908,//未接收到参数状态码
            "data":[],
        });
    }
};
