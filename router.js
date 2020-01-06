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
    app.post("/selecInformation",(req,res,next)=>{
        require("./routers/selecInformation")(req,res,next)
    });
    app.post("/selecInformationByInformation_id",(req,res,next)=>{
        require("./routers/selecInformationByInformation_id")(req,res,next)
    });
    app.post("/select_userid",(req,res,next)=>{
        require("./routers/select_userid")(req,res,next)
    });
    app.post("/cancel_Focus",(req,res,next)=>{
        require("./routers/cancel_Focus")(req,res,next)
    });







    //*****************************************************************请勿修改以下接口*******************************************************************************
    app.use((req,res,next)=>{//写在该接口后面的接口将会失效，请把所有接口写在该接口前面
        res.send({
            "status_code":999,
            "data":[],
        });
    })
};
