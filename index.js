var express = require("express");
var bodyParser = require("body-parser");
//var DataStore = require("nedb");

var MongoClient = require("mongodb").MongoClient;

var budgetsLawsApi = require("./budgetsLawsApi");
var generalBudgetsApi = require("./generalBudgetsApi");

var port = (process.env.PORT || 1607);

var mdbURL = "mongodb://dbaom:sos1718-06@ds231559.mlab.com:31559/sos1718-aom-sandbox";
var mdbGeneralBudgetURL = "mongodb://diogalcam:061196dioni@ds237489.mlab.com:37489/diogalcam";

var app = express();
app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.json());

var InitialGeneralBudgets = [{
        "community": "andalucia",
        "year": 2017,
        "section": "parlamento-de-andalucia",
        "total-budget": "45.479.748",
        "percentage-over-total": "0.137"
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "deuda-publica",
        "total-budget": "4.162.050.097",
        "percentage-over-total": "12.521"
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "camara-de-cuentas",
        "total-budget": "10.408.549",
        "percentage-over-total": "31"
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "consejeria-de-educacion",
        "total-budget": "6.100.323.433",
        "percentage-over-total": "18.353"
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "consejeria-de-salud",
        "total-budget": "725.885.406",
        "percentage-over-total": "2.184"
    },


];

var InitialBudgetsLaws = [{
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

//----------------conexion DB Alvaro-------------------------
MongoClient.connect(mdbURL, { native_parser: true }, (err, mlabs) => {
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
        if (InitialBudgetsLaws.length == 0) {
            console.log("Empty DB");
            db.insert(InitialBudgetsLaws);
        }
        else {
            console.log("Db has " + InitialBudgetsLaws.length + " budgetsLaws");
        }
    });


    budgetsLawsApi.register(app, db);

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


        app.listen(port, () => {
            console.log("Server ready on port " + port + "!");
        }).on("error", (e) => {
            console.log("Server NOT READY:" + e);
        });

        console.log("Server setting up...");

    });
});
