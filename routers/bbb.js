module.exports = function(req,res,next) {
    global.connection.connect();
    res.send({"info":"results"})
};




