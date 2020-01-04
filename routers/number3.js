const sqlApi = require("../lib/sqlApi");
const pool = require('../lib/database');
module.exports = function(req,res,next){
    pool.getConnection(function(err,connection) {
        if (err){
            res.send({
                "msg":"database connect error",
                "data":[],
            });
        }else {
            //console.log(req.body);//输出post数据（用于调试，上传时请删除）
            //console.log(res.query);//输出get数据（用于调试，上传时请删除）
            let sql = `INSERT INTO information_help (information_type,information_title,information_content,information_money,information_status,information_user,information_place,information_latitude,information_longitude,information_endmouthtime,information_endtime,information_phone) VALUES (1,"${req.body.information_title}","${req.body.information_content}",${req.body.information_money},${req.body.information_status},${req.body.information_user},"${req.body.information_place}","${req.body.information_latitude}","${req.body.information_longitude}","${req.body.information_endmouthtime}","${req.body.information_endtime}","${req.body.information_phone}");`;//因为hobby_name字段是varchar类型所以${}两边有"包裹。
            //console.log(sql);//输出sql数据,可以查看sql语句是否正确（用于调试，上传时请删除）

            sqlApi(req,connection,sql)
                .then(function (data) {
                    res.send({
                        "msg":data?"ok":"fail",//成功返回ok失败返回fail（除啦查询操作其他操作的data都是是否成功data）
                        "data":[],
                    });
                })
                .catch(function (error) {
                    console.log(error);//输出sql语句执行宠物的错误对象，可以知道sql错在哪。
                    res.send({
                        "msg":"sql execute error",
                        "data":[],
                    });
                });
            connection.release();
        }
    })
};

