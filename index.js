var express = require("express");
var app = express();
var port = (process.env.PORT || 1607);
var budgetsLawsApi = require("./budgetsLawsApi");
var bodyParser = require("body-parser");

    
var initialBudgetsLaws = [
        { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-Pública-Empresarial-de-la-Radio-y-Televisión-de-Andalucía-(RTVA)-(Consolidado)",
            "budget-of-capital" : "5.686.779",
            "total" : "169.692.400"
        },
         { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-Pública-Empresarial-de-la-Radio-y-Televisión-de-Andalucía-(RTVA)",
            "budget-of-capital" : "968.284",
            "total" : "161.435.032"
        }];
    
app.use(bodyParser.json());
var mdbURL = "mongodb://dbaom:sos1718-06@ds231559.mlab.com:31559/sos1718-aom-sandbox";

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect(mdbURL,{native_parser:true},(err,mlabs)=>{
   if(err){
       console.error("Error accesing DB:"+ err);
       process.exit(1);
   }
       console.log("Connected to DB in mlabs");
       
       var database = mlabs.db("sos1718-aom-sandbox");
       var db = database.collection("budgetsLaws");
   
   
   db.find({}).toArray((err,budgetsLaws)=>{
    
    if(budgetsLaws.length == 0){
        console.log("Empty DB");
        db.insert(initialBudgetsLaws);
    }else{
        console.log("Db has " + budgetsLaws.length + " budgetsLaws");
    }
});

budgetsLawsApi.register(app,db);
app.listen(port,()=>{
    console.log("Server ready on port" + port + "!");
}).on("error",(e)=>{
    console.log("Server not ready" + e);
});
       
});
























