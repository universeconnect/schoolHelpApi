module.exports = function(req,res,next){
    const connection = require('../lib/database')
    connection.query('SELECT * FROM `bill`;', function (error, results, fields) {
        if (error) {
            console.error(error)
        } else {
            console.log(results)
            res.send({"info":results})//返回数据给前端
        }
    });
}


