const express = require("express");
const app = express();
app.use(express.json())
const fs = require("fs")

function sampleMiddleware(req,res,next){
    const username = req.body.username;
    if(username ==="Arbeena"){
        next()
    }
    else{
        res.send("Something went wrong")
    }
}

function middlewareIpAddress(req,res,next){
    const ip = req.headers.ip;
    if(ip ==="12345455"){
        next()
    }
    else{
        res.send("IP Address is not matching")
    }
}

app.post("/user",sampleMiddleware,middlewareIpAddress,(req,res)=>{   
        res.send("sucess in user")   
})

app.post("/signup",sampleMiddleware,middlewareIpAddress,(req,res)=>{
        res.send("sucess in signup")
})

app.post("/login",sampleMiddleware,middlewareIpAddress,(req,res)=>{
        res.send("sucess in login")
})


app.listen(3001,()=>{
    console.log("server is listing on port no 3001");
})