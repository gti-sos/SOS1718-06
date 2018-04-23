var express = require("express");
var bodyParser = require("body-parser");
var path = require("path"); //Para que funcione tanto en windows como en linux.


var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";

var app = express();

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public")));


var initialSpendingPolicies = [{
        "section": "GastosDePersonal",
        "community": "Andalucia",
        "year": 2017,
        "percentagetotal": 30.8,
        "percentagevariable": 1.7
    },
    {
        "section": "GastosCorrientesEnBienesYServicios",
        "community": "Andalucia",
        "year": 2017,
        "percentagetotal": 9.9,
        "percentagevariable": 12.9
    },
    {
        "section": "GastosFinancieros",
        "community": "Andalucia",
        "year": 2017,
        "percentagetotal": 1.5,
        "percentagevariable": -5.1
    },
    {
        "section": "TransferenciasCorrientes",
        "community": "Andalucia",
        "year": 2017,
        "percentagetotal": 35.4,
        "percentagevariable": 1.4
    },
    {
        "section": "InversionesReales",
        "community": "Andalucia",
        "year": 2017,
        "percentagetotal": 4,
        "percentagevariable": 10.3
    }
];

app.get(BASE_API_PATH + "/spending-policies", (req, res) => {
    console.log(Date() + " - GET /spending-policies");
    res.send(initialSpendingPolicies);
});

app.post(BASE_API_PATH + "/spending-policies", (req, res) => {
    console.log(Date() + " - POST /spending-policies");
    var spendingPolicie = req.body;
    initialSpendingPolicies.push(spendingPolicie);
    res.sendStatus(201);
});

app.put(BASE_API_PATH + "/spending-policies", (req, res) => {
    console.log(Date() + " - PUT /spending-policies");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/spending-policies", (req, res) => {
    console.log(Date() + " - DELETE /spending-policies");
    initialSpendingPolicies = [];
    res.sendStatus(200);
});

app.get(BASE_API_PATH + "/spending-policies/:section", (req, res) => {
    var section = req.params.section;
    console.log(Date() + " - GET /spending-policies/" + section);

    res.send(initialSpendingPolicies.filter((c) => {
        return (c.section == section);
    })[0]);
});

app.delete(BASE_API_PATH + "/spending-policies/:section", (req, res) => {
    var section = req.params.section;
    console.log(Date() + " - DELETE /spending-policies/" + section);

    initialSpendingPolicies = initialSpendingPolicies.filter((c) => {
        return (c.section != section);
    });

    res.sendStatus(200);
});

app.post(BASE_API_PATH + "/spending-policies/:section", (req, res) => {
    var section = req.params.section;
    console.log(Date() + " - POST /spending-policies/" + section);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/spending-policies/:section", (req, res) => {
    var section = req.params.section;
    var spendingPolicie = req.body;

    console.log(Date() + " - PUT /spending-policies/" + section);

    if (section != spendingPolicie.section) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    initialSpendingPolicies = initialSpendingPolicies.map((c) => {
        if (c.section == spendingPolicie.section)
            return spendingPolicie;
        else
            return c;
    });

    res.sendStatus(200);
});


var InitialBudgetsLaws = [{
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA-consolidado",
        "budgetofcapital": "5.686.779",
        "total": "169.692.400"
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA",
        "budgetofcapital": "968.284",
        "total": "161.435.032"
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-andaluza-del-conocimiento",
        "budgetofcapital": "200.000",
        "total": "7.153.248"
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-publica-andaluza-de-educacion",
        "budgetofcapital": "1.500.000",
        "total": "379.706.833"
    },
    {
        "community": "andalucia",
        "year": 2017,
        "section": "Agencia-publica-empresarial-sanitaria-bajo-Guadalquivir",
        "budgetofcapital": "800.000",
        "total": "50.892.169"
    }


];

app.get(BASE_API_PATH + "/budgets-laws", (req, res) => {
    console.log(Date() + " - GET /budgets-laws");
    res.send(InitialBudgetsLaws);
});

app.post(BASE_API_PATH + "/budgets-laws", (req, res) => {
    console.log(Date() + " - POST /budgets-laws");
    var budgetsLaw = req.body;
    InitialBudgetsLaws.push(budgetsLaw);
    res.sendStatus(201);
});

app.put(BASE_API_PATH + "/budgets-laws", (req, res) => {
    console.log(Date() + " - PUT /budgets-laws");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/budgets-laws", (req, res) => {
    console.log(Date() + " - DELETE /budgets-laws");
    InitialBudgetsLaws = [];
    res.sendStatus(200);
});

app.get(BASE_API_PATH + "/budgets-laws/:section", (req, res) => {
    var section = req.params.section;
    console.log(Date() + " - GET /budgets-laws/" + section);

    res.send(InitialBudgetsLaws.filter((c) => {
        return (c.section == section);
    })[0]);
});

app.delete(BASE_API_PATH + "/budgets-laws/:section", (req, res) => {
    var section = req.params.section;
    console.log(Date() + " - DELETE /budgets-laws/" + section);

    InitialBudgetsLaws = InitialBudgetsLaws.filter((c) => {
        return (c.section != section);
    });

    res.sendStatus(200);
});

app.post(BASE_API_PATH + "/budgets-laws/:section", (req, res) => {
    var section = req.params.section;
    console.log(Date() + " - POST /budgets-laws/" + section);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/budgets-laws/:section", (req, res) => {
    var section = req.params.section;
    var budgetsLaw = req.body;

    console.log(Date() + " - PUT /budgets-laws/" + section);

    if (section != budgetsLaw.section) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    InitialBudgetsLaws = InitialBudgetsLaws.map((c) => {
        if (c.section == budgetsLaw.section)
            return budgetsLaw;
        else
            return c;
    });

    res.sendStatus(200);
});



app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});

console.log("Server setting up...");
