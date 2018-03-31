var express = require("express");
var bodyParser = require("body-parser");

var MongoClient = require("mongodb").MongoClient;

var SPApi = require("./SPApi");

var port = (process.env.PORT || 1607);
//var BASE_API_PATH_Spending = "/apiSpending-policies/v1";

var mdbURL = "mongodb://s-p-api:spapi@ds129939.mlab.com:29939/sos1718-spending-policies";


var app = express();

/*app.get(BASE_API_PATH+"/help",(req,res)=>{
    res.redirect("una url que tengo que poner");
});*/

app.use(bodyParser.json());


var initialSpendingPolicies = [
        { 
            "section" : "GastosDePersonal",
            "community" : "Andalucia",
            "year" : 2017,
            "percentage-total" : 30.8 ,
            "percentage-variable" : 1.7
        },
        { 
            "section" : "GastosCorrientesEnBienesYServicios",
            "community" : "Andalucia",
            "year" : 2017,
            "percentage-total" : 9.9 ,
            "percentage-variable" : 12.9
        },
        { 
            "section" : "GastosFinancieros",
            "community" : "Andalucia",
            "year" : 2017,
            "percentage-total" : 1.5 ,
            "percentage-variable" : -5.1
        },
        { 
            "section" : "TransferenciasCorrientes",
            "community" : "Andalucia",
            "year" : 2017,
            "percentage-total" : 35.4 ,
            "percentage-variable" : 1.4
        },
        { 
            "section" : "InversionesReales",
            "community" : "Andalucia",
            "year" : 2017,
            "percentage-total" : 4 ,
            "percentage-variable" : 10.3
        }
    ];
    
MongoClient.connect(mdbURL, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB:" + err);
        process.exit(1);
    }

    console.log("Connected to DB in mlabs");

    var database = mlabs.db("sos1718-spending-policies");
    var db = database.collection("spendingPolicies");

    db.find({}).toArray((err, spendingPolicies) => {

        if (spendingPolicies.length == 0) {
            console.log("Empty DB");
            db.insert(initialSpendingPolicies);
        }
        else {
            console.log("DB has " + spendingPolicies.length + " spendingPolicies");
        }

    });

    SPApi.register(app, db);

    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });
});