var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var MongoClient = require("mongodb").MongoClient;

var port = (process.env.PORT || 1607);

var mdbBudgetsLawsURL = "mongodb://dbaom:sos1718-06@ds231559.mlab.com:31559/sos1718-aom-sandbox";

var budgetsLawsApi = require("./budgetsLawsApi");

var app = express();

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public")));




/* API SPANISH UNIVERSITIES */

var InitialBudgetsLaws = [
        {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA-consolidado",
            "budgetofcapital" : 5.779,
            "total" : 169.400
        },
         {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA",
            "budgetofapital" : 968.284,
            "total" : 161.032
        },
         {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-andaluza-del-conocimiento",
            "budgetofcapital" : 200.000,
            "total" : 7.248
        },
         {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-publica-andaluza-de-educacion",
            "budgetofcapital" : 1.000,
            "total" : 379.833
        },
         {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-publica-empresarial-sanitaria-bajo-Guadalquivir",
            "budgetofcapital" : 800.000,
            "total" : 892.169
        }
    ];


MongoClient.connect(mdbBudgetsLawsURL, { native_parser: true }, (err, mlabs) => {

    if (err) {
        console.error("Error accesing DB : " + err);
        process.exit(1);
    }

    console.log("Conected to DB in mlabs");

    var budgetsLawsDataBase = mlabs.db("sos1718-aom-sandbox");
    var budgetsLawsdb = budgetsLawsDataBase.collection("budgetsLaws");

    budgetsLawsApi.register(app, budgetsLawsdb, InitialBudgetsLaws);

    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server not ready " + e);
    });


});