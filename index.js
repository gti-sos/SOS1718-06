var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");

var MongoClient = require("mongodb").MongoClient;

var budgetsLawsApi = require("./budgetsLawsApi");

var port = (process.env.PORT || 1607);

var mdbURL = "mongodb://dbaom:sos1718-06@ds231559.mlab.com:31559/sos1718-aom-sandbox";

var app = express();
app.use("/",express.static(__dirname+"/public"));
app.use(bodyParser.json());


    
var InitialBudgetsLaws = [
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
        },
         { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-Andaluza-del-Conocimiento",
            "budget-of-capital" : "200.000",
            "total" : "7.153.248"
        },
         { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-Pública-Andaluza-de-Educación",
            "budget-of-capital" : "1.500.000",
            "total" : "379.706.833"
        },
         { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-Pública-Empresarial-Sanitaria-Bajo-Guadalquivir",
            "budget-of-capital" : "800.000",
            "total" : "50.892.169"
        }
       
       
    ];
    

MongoClient.connect(mdbURL,{native_parser:true},(err,mlabs)=>{
   if(err){
       console.error("Error accesing DB:"+ err);
       process.exit(1);
   }
       console.log("Connected to DB in mlabs");
       
       var database = mlabs.db("sos1718-aom-sandbox");
       var db = database.collection("budgetsLaws");
   
   
   db.find({},(err,budgetsLaws)=>{
    if(err){
        console.error("error accesing db");
        process.exit(1);
    }
    if(InitialBudgetsLaws.length == 0){
        console.log("Empty DB");
        db.insert(InitialBudgetsLaws);
    }else{
        console.log("Db has " + InitialBudgetsLaws.length + " budgetsLaws");
    }
});

budgetsLawsApi.register(app,db);

app.listen(port,()=>{
    console.log("Server ready on port" + port + "!");
}).on("error",(e)=>{
    console.log("Server not ready" + e);
});
       
});
























