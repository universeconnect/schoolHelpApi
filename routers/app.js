module.exports = function(req,res,next,connection) {
    connection.query('SELECT * FROM `userinfo`;', function (error, results, fields) {
        res.send({"info":results})//返回数据给前端
    });
};
