const pool = require('./database');
module.exports = function sqlApi(req) {
    let ip = req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.connection.remoteAddres || req.socket.remoteAddress ||  "";
    if(ip.split(",").length>0){
        ip = ip.split(",")[0];
    }
    let port =  req.connection.remotePort || req.socket.remotePort || "";
    let myDate = new Date();
//获取当前年
    let year = myDate.getFullYear();
//获取当前月
    let month = myDate.getMonth() + 1;
//获取当前日
    let date = myDate.getDate();
    let h = myDate.getHours(); //获取当前小时数(0-23)
    let m = myDate.getMinutes(); //获取当前分钟数(0-59)
    let s = myDate.getSeconds();
//获取当前时间
    let time = year+"-"+month+'-'+date+' '+h+":"+m+':'+s;
    pool.getConnection(function(err) {
        if (err){

        }else {
            const sqlApi = require("./sqlApi");
            sqlApi(req,'INSERT INTO `backstage` (id,ip,url,time,port) VALUES (0,"'+ ip +'","'+ req.url +'","'+ time +'","'+ port +'");')
            .then(function(data){

            })
            .catch(function (error) {
                console.log("日志添加失败   在" + time + "来自  " + ip + "的请求     原因是：" + error);
            })
        }
    })





};









