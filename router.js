module.exports = function (app) {
    app.get("/app",(req,res,next)=>{
        require("./routers/app")(req,res,next)//导入模块时顺便执行了，因为该模块返回的是一个函数。
    });
    app.get("/url",(req,res,next)=>{
        require("./routers/url")(req,res,next)//导入模块时顺便执行了，因为该模块返回的是一个函数。
    });
    app.get("/number1",(req,res,next)=>{
        require("./routers/number1")(req,res,next)//导入模块时顺便执行了，因为该模块返回的是一个函数。
    });
    app.post("/number2",(req,res,next)=>{
        require("./routers/number2")(req,res,next)//导入模块时顺便执行了，因为该模块返回的是一个函数。
    });
};
