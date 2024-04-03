const express=require("express");
const hbs=require("hbs");
const app=express();
const path=require("path");
const port= process.env.PORT ||3000;

const publicPath=path.join(__dirname,"../public");
const viewPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");


app.set("view engine","hbs");
app.set("views",viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));


 const weatherData=require("../utils/weatherData.js")
 app.get("/",(req,res)=>{
    res.render("index",{title:'Weather App'});

 });
 app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.json("Address is required")
    }
    weatherData(req.query.address,(error,result)=>{
        if(error){
           return res.send(error);
        }
        else{
            res.send(result);
        }
    })
 });

 app.get("*",(req,res)=>{
     return res.render("404",{title:"Page not found"});
 })
 app.listen(port,(req,res)=>{
    console.log(`server started on localhost:${port}`)
    
 })