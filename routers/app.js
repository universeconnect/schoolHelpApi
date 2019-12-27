module.exports = function(req,res,next){
<<<<<<< Updated upstream
    const connection = require('../lib/database')
    connection.query('SELECT * FROM `information_help`;', function (error, results, fields) {
        if (error) {
            console.error(error)
        } else {
            console.log(results)
            res.send({"info":results})//返回数据给前端
        }
=======
    const pool = require('../lib/database');
    c
>>>>>>> Stashed changes
    });
}



