module.exports = function(req,res,next,connection) {//该参数不可变，所有接口代码文件都所有这个方式。
    //以下是代码区域
    // 如何获取前端传入的参数？
    //获取get参数使用req.query，该值是一个对象，里面包含所有的get参数；
    let get = req.query;
    // 如何操作数据库？

    /*sql语句的讲究：
    1.sql语句必须是一个字符串（这没啥好的），当sql语句中有需要是否变量的时候直接使用+号拼串即可
    2.正常sql语句中的字符串使用``而不是""和''*/
    connection.query('SELECT * FROM `userinfo`;', function (error, results, fields) {//执行sql语句
        // error:只有该sql语句执行失败时才不为空，包含的是该sql语句执行的错误信息
        //results：sql语句执行的结果，当为查询语句时是查询到的数据
        //fields：当前表的信息
        if(error){
            res.send({"msg":"sql语句执行错误","info":null,error})//返回数据给前端,error仅仅是测试时使用。
            // res.send（）只会执行一次，执行后将不在执行该中间件。如同函数的return
        }else {
            res.send({"msg":"sql语句执行正确","info":results,"get":get})//这里返回get和post参数是用于测试
        }
    });
};
