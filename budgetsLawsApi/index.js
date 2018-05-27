var budgetsLawsApi = {};
var BASE_API_PATH = "/api/v1";


module.exports = budgetsLawsApi;

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

budgetsLawsApi.register = function(app, db) {
    console.log("Register routes for goals API");


    var buscador = function(base, aux_set, param_community, param_year, param_section, param_budgetofcapital, param_total) {


        if (param_community != undefined || param_year != undefined || param_section != undefined || param_budgetofcapital != undefined || param_total != undefined) {

            for (var j = 0; j < base.length; j++) {

                var year = parseInt(base[j].year);
                var community = base[j].community;
                var section = base[j].section;
                var budgetofcapital = base[j].budgetofcapital;
                var total = base[j].total;

                if (param_community != undefined && param_year == undefined && param_section == undefined && param_budgetofcapital == undefined && param_total == undefined) {

                    if (param_community == community) {
                        aux_set.push(base[j]);
                    }

                }

                else if (param_community == undefined && param_year == undefined && param_section != undefined && param_budgetofcapital == undefined && param_total == undefined) {

                    if (param_section == section) {
                        aux_set.push(base[j]);
                    }


                }

                else if (param_community == undefined && param_year == undefined && param_section == undefined && param_budgetofcapital != undefined && param_total == undefined) {

                    if (param_budgetofcapital == budgetofcapital) {
                        aux_set.push(base[j]);
                    }
                }

                else if (param_community == undefined && param_year == undefined && param_section == undefined && param_budgetofcapital == undefined && param_total != undefined) {

                    if (param_total == total) {
                        aux_set.push(base[j]);
                    }


                }
                else if (param_community == undefined && param_year == undefined && param_section == undefined && param_budgetofcapital == undefined && param_total == undefined) {

                    if (param_year == year) {
                        aux_set.push(base[j]);
                    }
                }
            }
        }

        return aux_set;

    };



    app.get(BASE_API_PATH + "/budgets-laws/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/4051792/collection/RVu5iTsK");
    });

    app.get(BASE_API_PATH + "/budgets-laws/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /budgets-laws/loadInitialData" + InitialBudgetsLaws);
        //db.insert(initialteams);
        db.find({}).toArray((err, budgets) => {
            if (err) {
                console.log("Error acccesing DB");
                process.exit(1);
                return;
            }
            if (budgets.length == 0) {
                console.log("Empty DB");
                db.insert(InitialBudgetsLaws);
            }
            res.send(budgets.map((c) => {
                delete c._id;
                return c;
            }));
        });

    });

    app.post(BASE_API_PATH + "/budgets-laws", (req, res) => {
        console.log(Date() + " - POST /budgets");
        var newbudget = req.body;
        if (!newbudget.community || !newbudget.year || !newbudget.section || !newbudget.budgetofcapital || !newbudget.total || Object.keys(newbudget).length != 5) {
            console.log("Warning : new GET request ");
            res.sendStatus(400);
        }



        db.find({ "section": newbudget.section }).toArray((err, filteredBudgets) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            }
            if (filteredBudgets.length > 0) {
                console.log("WARNING");
                res.sendStatus(409); //conflict
            }
            else {
                db.insert(newbudget);
                res.sendStatus(201);
            }

        });
    });

    app.put(BASE_API_PATH + "/budgets-laws", (req, res) => {
        console.log(Date() + " - PUT /budgets");
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/budgets-laws", (req, res) => {
        console.log(Date() + " - DELETE /budgets");
        db.remove({});
        res.sendStatus(200);

    });


    app.get(BASE_API_PATH + "/budgets-laws/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - GET /budgets/" + section);
        if (!section) {
            console.log("Warning : new GET request ");
            res.sendStatus(400);
        }
        db.find({ "section": section }).toArray((err, filteredBudgets) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            }
            else {
                if (filteredBudgets.length > 0) {
                    res.send(filteredBudgets.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
                else {
                    console.log("WARNING");
                    res.sendStatus(404);
                }
            }
        });
    });

    app.delete(BASE_API_PATH + "/budgets-laws/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - DELETE /budgets/" + section);

        db.remove({ "section": section });
        res.sendStatus(200);
    });

    app.post(BASE_API_PATH + "/budgets-laws/:section/", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - POST /budgets/" + section);
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/budgets-laws/:section", (req, res) => {
        var section = req.params.section;
        var budget = req.body;

        console.log(Date() + " - PUT /budgets-laws/" + section);

        if (section != budget.section) {
            res.sendStatus(400);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }

        db.update({ "section": budget.section }, budget);
        res.sendStatus(200);
    });
    //Busqueda
    app.get(BASE_API_PATH + "/budgets-laws", function(request, response) {


        console.log("INFO: New GET request to /budgets-laws");

        /*PRUEBA DE BUSQUEDA */
        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        var year = request.query.year;
        var community = request.query.community;
        var section = request.query.section;
        var budgetofcapital = request.query.budgetofcapital;
        var total = request.query.total;
        var aux = [];
        var aux2 = [];
        var aux3 = [];


        if (limit || offset >= 0) {
            db.find({}).skip(offset).limit(limit).toArray(function(err, filteredBudgets) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                    return;
                }
                else {
                    if (filteredBudgets.length === 0) {
                        response.sendStatus(404); //No content
                        return;
                    }
                    console.log("INFO: Sending budgets :: " + JSON.stringify(filteredBudgets, 2, null));
                    if (community || year || section || budgetofcapital || total) {

                        aux = buscador(filteredBudgets, aux, community, year, section, budgetofcapital, total);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);

                            response.send(aux2);
                        }
                        else {

                            response.send(aux3); // No content 
                            return;
                        }
                    }
                    else {
                        response.send(filteredBudgets.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                }
            });

        }
        else {

            db.find({}).toArray(function(err, filteredBudgets) {
                if (err) {
                    console.error('ERROR from database');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (filteredBudgets.length === 0) {

                        response.send(filteredBudgets);
                        return;
                    }

                    if (community || year || section || budgetofcapital || total) {
                        aux = buscador(filteredBudgets, aux, community, year, section, budgetofcapital, total);
                        if (aux.length > 0) {
                            response.send(aux);
                        }
                        else {
                            response.sendStatus(404); //No content
                            return;
                        }
                    }
                    else {
                        response.send(filteredBudgets.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                }
            });
        }

    });
};
