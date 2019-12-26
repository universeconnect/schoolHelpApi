module.exports = function (app) {
    app.get("/app",(req,res,next)=>{
        require("./routers/app")(req,res,next)//导入模块时顺便执行了，因为该模块返回的是一个函数。
    });
    app.post("/bbb",()=>{
        require("./routers/bbb")(req,res,next)//导入模块时顺便执行了，因为该模块返回的是一个函数。
    });
};
