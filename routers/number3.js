const sqlApi = require("../lib/sqlApi");
module.exports = function(req,res,next){
    if(req.body.information_type
    &&req.body.information_title
    &&req.body.information_content
    &&req.body.information_money
    &&req.body.information_status
    &&req.body.information_user
    &&req.body.information_place
    &&req.body.information_latitude
    &&req.body.information_longitude
    &&req.body.information_endmouthtime
    &&req.body.information_endtime
    &&req.body.information_phone
    &&req.body.information_town
    &&req.body.information_detaiLocation
    &&req.body.information_limitSex){//判断是否接收到指定的参数
        let myDate = new Date();//获取当前年
        let year = myDate.getFullYear();//获取当前月
        let month = myDate.getMonth() + 1;//获取当前日
        let date = myDate.getDate();
        let h = myDate.getHours(); //获取当前小时数(0-23)
        let m = myDate.getMinutes(); //获取当前分钟数(0-59)
        let s = myDate.getSeconds();
        let time = year+"-"+month+'-'+date+' '+h+":"+m+':'+s;//拼接得到当前时间
        let sql = `INSERT INTO information_help (information_time,information_type,information_title,information_content,information_money,information_status,information_user,information_place,information_latitude,information_longitude,information_endmouthtime,information_endtime,information_phone,information_town,information_detaiLocation,information_limitSex) VALUES ("${time}",${req.body.information_type},"${req.body.information_title}","${req.body.information_content}",${req.body.information_money},${req.body.information_status},${req.body.information_user},"${req.body.information_place}","${req.body.information_latitude}","${req.body.information_longitude}","${req.body.information_endmouthtime}","${req.body.information_endtime}","${req.body.information_phone}","${req.body.information_town}","${req.body.information_detaiLocation}",${req.body.information_limitSex});`;
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

