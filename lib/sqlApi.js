const fs = require('fs');
const pool = require("./database");
module.exports = function sqlApi(req,sql) {
    return new Promise(function (resolve,reject) {
        let ip = req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.connection.remoteAddres || req.socket.remoteAddress ||  "";
        if(ip.split(",").length>0){
            ip = ip.split(",")[0];
        }
        let port =  req.connection.remotePort || req.socket.remotePort || "";
        let myDate = new Date();//获取当前年
        let year = myDate.getFullYear();//获取当前月
        let month = myDate.getMonth() + 1;//获取当前日
        let date = myDate.getDate();
        let h = myDate.getHours(); //获取当前小时数(0-23)
        let m = myDate.getMinutes(); //获取当前分钟数(0-59)
        let s = myDate.getSeconds();
        let time = year+"-"+month+'-'+date+' '+h+":"+m+':'+s;//拼接得到当前时间
        try{
            pool.getConnection(function(error,conn){
                if(error){
                    fs.readFile(__dirname+'/../log/errorLog.json',function (err,data) {
                        if(err){
                            console.log("日志文件读取失败   在" + time + "来自  " + ip + "的请求     原因是：" + err);
                        }else{
                            let person = JSON.parse(data);//将字符串转换为json对象
                            person.push({//将错误信息添加到读取到的错误日志文件数据中
                                'ip':ip,
                                'post.data':req.body,
                                'get.data':req.query,
                                'msg':error,
                                'port':port,
                                'time':time,
                                'type':'数据库连接错误',
                                'sql':sql
                            });
                            fs.writeFile(__dirname+'/../log/errorLog.json',JSON.stringify(person),function(err){//将数据存入错误日志文件中
                                if(err){
                                    console.log("日志文件添加失败   在" + time + "来自  " + ip + "的请求     原因是：" + err);
                                }
                            });
                        }
                    });
                    reject(error);
                }else{
                    conn.query(sql,function(error,results,fields){
                        //事件驱动回调
                        if(error){
                            fs.readFile(__dirname+'/../log/errorLog.json',function (err,data) {
                                if(err){
                                    console.log("日志文件读取失败   在" + time + "来自  " + ip + "的请求     原因是：" + err);
                                }else{
                                    let person = JSON.parse(data);//将字符串转换为json对象
                                    person.push({//将错误信息添加到读取到的错误日志文件数据中
                                        'ip':ip,
                                        'post.data':req.body,
                                        'get.data':req.query,
                                        'msg':error,
                                        'port':port,
                                        'time':time,
                                        'type':'sql语法错误',
                                        'sql':sql
                                    });
                                    fs.writeFile(__dirname+'/../log/errorLog.json',JSON.stringify(person),function(err){//将数据存入错误日志文件中
                                        if(err){
                                            console.log("日志文件添加失败   在" + time + "来自  " + ip + "的请求     原因是：" + err);
                                        }
                                    });
                                }
                            });
                            reject(error);
                        }else{
                            resolve(results);
                        }
                    });
                    //释放连接，需要注意的是连接释放需要在此处释放，而不是在查询回调里面释放
                    conn.release();
                }
            });
/*            global.connection.query(sql, function (error, results, fields) {
                if(error){
                    fs.readFile(__dirname+'/../log/errorLog.json',function (err,data) {
                        if(err){
                            console.log("日志文件读取失败   在" + time + "来自  " + ip + "的请求     原因是：" + err);
                        }else{
                            let person = JSON.parse(data);//将字符串转换为json对象
                            person.push({//将错误信息添加到读取到的错误日志文件数据中
                                'ip':ip,
                                'post.data':req.body,
                                'get.data':req.query,
                                'msg':error,
                                'port':port,
                                'time':time,
                                'type':'sql语法错误',
                                'sql':sql
                            });
                            fs.writeFile(__dirname+'/../log/errorLog.json',JSON.stringify(person),function(err){//将数据存入错误日志文件中
                                if(err){
                                    console.log("日志文件添加失败   在" + time + "来自  " + ip + "的请求     原因是：" + err);
                                }
                            });
                        }
                    });
                    reject(error);
                }else {
                    resolve(results)
                }
            });*/
        }catch (error) {
            console.log("sql语句执行出错（无法确定错误信息是否已存入日志）   在" + time + "来自  " + ip + "的请求     原因是：" + error);
        }
    })
};
