module.exports = function (app) {
    app.get("/url",(req,res,next)=>{
        require("./routers/url")(req,res,next)
    });
    app.post("/number2",(req,res,next)=>{
        require("./routers/number2")(req,res,next)
    });
    //************************************************以下是业务接口（上面的接口用于测试和作为模板）********************************************************************
    app.post("/number3",(req,res,next)=>{
        require("./routers/number3")(req,res,next)
    });
    app.post("/insert_user",(req,res,next)=>{
        require("./routers/insert_user")(req,res,next)
    });
    app.post("/update_status",(req,res,next)=>{
        require("./routers/update_status")(req,res,next)
    });
    app.post("/selectInformation",(req,res,next)=>{//按条件查询Information_help和user表的联合信息
        require("./routers/selectInformation")(req,res,next)
    });
    app.post("/select_userid",(req,res,next)=>{
        require("./routers/select_userid")(req,res,next)
    });
    app.post("/selectFans",(req,res,next)=>{//所有粉丝信息
        require("./routers/selectFans")(req,res,next)
    });
    app.post("/selectFansSum",(req,res,next)=>{//统计粉丝数量
        require("./routers/selectFansSum")(req,res,next)
    });
    app.post("/cancel_Focus",(req,res,next)=>{
        require("./routers/cancel_Focus")(req,res,next)
    });
    app.post("/attention",(req,res,next)=>{//关注
        require("./routers/attention")(req,res,next)
    });
    app.post("/area",(req,res,next)=>{//获取指定type按town分组的所有需求数量和一个地址
        require("./routers/area")(req,res,next)
    });
    app.post("/getOpenId",(req,res,next)=>{//获取openID
        require("./routers/getOpenId")(req,res,next)
    });
    app.post("/user_number",(req,res,next)=>{
        require("./routers/user_number")(req,res,next)
    });
    app.post("/select_information_help",(req,res,next)=>{
        require("./routers/select_information_help")(req,res,next)
    });







    //*****************************************************************请勿修改以下接口*******************************************************************************
    app.use((req,res,next)=>{//写在该接口后面的接口将会失效，请把所有接口写在该接口前面
        res.send({
            "status_code":999,
            "data":[],
        });
    })
};
