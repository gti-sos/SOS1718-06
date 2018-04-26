var express = require("express");
var bodyParser = require("body-parser");
//var DataStore = require("nedb");
var path = require("path");

var budgetsLawsApi = require("./budgetsLawsApi/index.js");
var generalBudgetsApi = require("./generalBudgetsApi");
var spendingPoliciesApi = require("./spendingPoliciesApi");

var port = (process.env.PORT || 1607);


var app = express();
app.use("/", express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json());

budgetsLawsApi.register(app);
generalBudgetsApi.register(app);
spendingPoliciesApi.register(app);

app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});
console.log("Server setting up...");

