const connection = require("./database");
const fs = require('fs');
module.exports = function sqlApi(req,sql) {
    return new Promise(function (resolve,reject) {
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
        try{
            connection.query(sql, function (error, results, fields) {
                if(error){
                    fs.readFile(__dirname+'/../log/errorLog.json',function (err,data) {
                        if(err){
                            console.log("日志文件读取失败   在" + time + "来自  " + ip + "的请求     原因是：" + err);
                        }else{
                            let person = data.toString();//将二进制的数据转换为字符串
                            person = JSON.parse(person);//将字符串转换为json对象
                            person.push({
                                'ip':ip,
                                'post.data':req.body,
                                'get.data':req.query,
                                'msg':error,
                                'port':port,
                                'time':time,
                                'type':'sql语法错误',
                                'sql':sql
                            });
                            fs.writeFile(__dirname+'/../log/errorLog.json',JSON.stringify(person),function(err){
                                if(err){
                                    console.log("日志文件添加失败   在" + time + "来自  " + ip + "的请求     原因是：" + err);
                                }
                            });
                        }
                    });
                    reject(error);
                }
                resolve(results)
            });
        }catch (error) {
            console.log("sql语句执行出错   在" + time + "来自  " + ip + "的请求     原因是：" + error);
        }
    })
};
