var express = require("express");
var bodyParser = require("body-parser");
//var DataStore = require("nedb");

var MongoClient = require("mongodb").MongoClient;

var budgetsLawsApi = require("./budgetsLawsApi");
var generalBudgetsApi = require("./generalBudgetsApi");
var spendingPoliciesApi = require("./spendingPoliciesApi");

var port = (process.env.PORT || 1607);

var mdbBudgetsLawsURL = "mongodb://dbaom:sos1718-06@ds231559.mlab.com:31559/sos1718-aom-sandbox";
var mdbGeneralBudgetURL = "mongodb://diogalcam:061196dioni@ds237489.mlab.com:37489/diogalcam";
var mdbSpendingPliciesURL = "mongodb://s-p-api:spapi@ds129939.mlab.com:29939/sos1718-spending-policies";

var app = express();
app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});

var InitialGeneralBudgets = [{
        "community": "andalucia",
        "year": 2017,
        "section": "parlamento-de-andalucia",
         "totalbudget": 454.7,
        "percentage-over-total": 0.1
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "deuda-publica",
         "totalbudget": 412.5,
        "percentage-over-total": 12.5
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "camara-de-cuentas",
        "totalbudget": 104.1,
        "percentage-over-total": 31.0
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "consejeria-de-educacion",
        "totalbudget": 610.3,
        "percentage-over-total": 18.3
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "consejeria-de-salud",
        "totalbudget": 725.6,
        "percentage-over-total": 2.1
    },


];

var BudgetsLawsInitial = [{
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA-consolidado",
        "budget-of-capital": "5.686.779",
        "total": "169.692.400"
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA",
        "budget-of-capital": "968.284",
        "total": "161.435.032"
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-andaluza-del-conocimiento",
        "budget-of-capital": "200.000",
        "total": "7.153.248"
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-publica-andaluza-de-educacion",
        "budget-of-capital": "1.500.000",
        "total": "379.706.833"
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-publica-empresarial-sanitaria-bajo-Guadalquivir",
        "budget-of-capital": "800.000",
        "total": "50.892.169"
    }


];

var initialSpendingPolicies = [
        { 
            "section" : "GastosDePersonal",
            "community" : "Andalucia",
            "year" : 2017,
            "percentagetotal" : 30.8 ,
            "percentagevariable" : 1.7
        },
        { 
            "section" : "GastosCorrientesEnBienesYServicios",
            "community" : "Andalucia",
            "year" : 2017,
            "percentagetotal" : 9.9 ,
            "percentagevariable" : 12.9
        },
        { 
            "section" : "GastosFinancieros",
            "community" : "Andalucia",
            "year" : 2017,
            "percentagetotal" : 1.5 ,
            "percentagevariable" : -5.1
        },
        { 
            "section" : "TransferenciasCorrientes",
            "community" : "Andalucia",
            "year" : 2017,
            "percentagetotal" : 35.4 ,
            "percentagevariable" : 1.4
        },
        { 
            "section" : "InversionesReales",
            "community" : "Andalucia",
            "year" : 2017,
            "percentagetotal" : 4 ,
            "percentagevariable" : 10.3
        }
    ];


MongoClient.connect(mdbBudgetsLawsURL, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB:" + err);
        process.exit(1);
    }
    console.log("Connected to DB in mlabs");

    var database = mlabs.db("sos1718-aom-sandbox");
    var db = database.collection("budgetsLaws");

    db.find({}, (err, budgetsLaws) => {
            if (err) {
                console.error("error accesing db");
                process.exit(1);
            }
            if (BudgetsLawsInitial.length == 0) {
                console.log("Empty DB");
                db.insert(BudgetsLawsInitial);
            }
            else {
                console.log("Db has " + BudgetsLawsInitial.length + " budgetsLaws");
            }
        });


budgetsLawsApi.register(app, db);

});

//---------------------conexión BD DIONI--------------------------

        MongoClient.connect(mdbGeneralBudgetURL, { native_parser: true }, (err, mlabs) => {
            if (err) {
                console.error("Error accesing DB:" + err);
                process.exit(1);
            }
            console.log("\r\r\r\r"); //saltos de línea
            console.log("Connected to DB in mlabs");

            var database = mlabs.db("diogalcam");
            var db = database.collection("generalBudgets");


            db.find({}, (err, generalBudgets) => {
                if (err) {
                    console.error("error accesing db");
                    process.exit(1);
                }
                if (InitialGeneralBudgets.length == 0) {
                    console.log("Empty DB");
                    db.insert(InitialGeneralBudgets);
                }
                else {
                    console.log("Db has " + InitialGeneralBudgets.length + " generalBudgets");
                }
            });





            generalBudgetsApi.register(app, db);

        
    });
    
    //-------Conexión BD Zoilo--------

    MongoClient.connect(mdbSpendingPliciesURL, { native_parser: true }, (err, mlabs) => {
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

        spendingPoliciesApi.register(app, db);
        
    });


