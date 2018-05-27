var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var path = require("path");
var cors = require("cors");
var request = require("request");

var MongoClient = require("mongodb").MongoClient;

//comment
var budgetsLawsApi = require("./budgetsLawsApi");

var port = (process.env.PORT || 1607);

var mdbURL = "mongodb://dbaom:sos1718-06@ds231559.mlab.com:31559/sos1718-aom-sandbox";

var app = express();

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());

var InitialBudgetsLaws = [{
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA-consolidado",
        "budgetofcapital": 5779,
        "total": 169400
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA",
        "budgetofcapital": 968284,
        "total": 161032
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-andaluza-del-conocimiento",
        "budgetofcapital": 200000,
        "total": 7248
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-publica-andaluza-de-educacion",
        "budgetofcapital": 1000,
        "total": 379833
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-publica-empresarial-sanitaria-bajo-Guadalquivir",
        "budgetofcapital": 800000,
        "total": 892169
    }
];

MongoClient.connect(mdbURL, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB:" + err);
        process.exit(1);
    }
    console.log("connected to DB in mlabs");

    var database = mlabs.db("sos1718-aom-sandbox");
    var db = database.collection("budgetsLaws");

    db.find({}).toArray((err, budgets) => {
        if (err) {
            console.error("Error accesing DB");
            process.exit(1);
        }
        if (budgets.length == 0) {
            console.log("Empty DB");
            db.insert(InitialBudgetsLaws);

        }
        else {
            console.log("DB has " + budgets.length + " budgets ");
        }

    });
    budgetsLawsApi.register(app, db);

});

var apiServerHost = "https://sos1718-01.herokuapp.com";

app.use("/proxyALVARO", function(req, res) {
    var url = apiServerHost + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});


app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});
