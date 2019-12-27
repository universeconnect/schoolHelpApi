module.exports = function(req,res,next){
    const pool = require('../lib/database')
    pool.getConnection(function(err, connection) {
        if (err) throw err;                 // 抛出异常
        // 使用连接
        try{
            connection.query('SELECT * FROM `information_help`;', function (error, results, fields) {
                console.log(4);
                res.send({"info": results})      //返回数据给前端
                console.log(3);
            });
        }catch (e) {
            console.log("发生sql错误，错误信息："+e);
            res.send({"info": "error"})      //返回数据给前端
            console.log(2);
        }finally {
           // connection.release();           //释放连接
            console.log(1);
        }
    })
};



