module.exports = function (app,connection) {
    //新增接口步骤

    app.get("/url",(req,res,next)=>{                            //1.创建一个路由接口，url为接口的url
        //2.在routers文件夹中创建一个与该接口名称一致的js文件
        require("./routers/url")(req,res,next,connection)       //3.导入该文件并执行该文件的返回结果
                                                                //3.编写该接口对应的routeers文件夹下的文件
    });
    // 下面是俩例子


    //get请求
    app.get("/app",(req,res,next)=>{
        require("./routers/app")(req,res,next,connection)//导入模块时顺便执行了，因为该模块返回的是一个函数。
    });

    //post请求
    app.post("/bbb",(req,res,next)=>{
        require("./routers/bbb")(req,res,next,connection)//导入模块时顺便执行了，因为该模块返回的是一个函数。
    });
};
