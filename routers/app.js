module.exports = function(req,res,next){
    const pool = require('../lib/database')
    pool.getConnection(function(err, connection) {
        if (err) throw err;                 // 抛出异常
        // 使用连接
        connection.query('SELECT * FROM `information_help`;', function (error, results, fields) {
            console.log(results)            //控制台输出数据
            res.send({"info": results})      //返回数据给前端
            connection.release();           //释放连接
            if (error) throw error;         //抛出异常
        });
    })
};



