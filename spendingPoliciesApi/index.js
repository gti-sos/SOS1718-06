var spendingPoliciesApi = {};
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_SP = "/api/v1/spending-policies";


module.exports = spendingPoliciesApi;

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


spendingPoliciesApi.register = function(app, db) {
    console.log("Registering routes for spending policies API...");

    var buscador = function(base, aux_set, param_section, param_community, param_year, param_percentagetotal, param_percentagevariable) {


        if (param_section != undefined || param_community != undefined || param_year != undefined || param_percentagetotal != undefined || param_percentagevariable != undefined) {

            for (var j = 0; j < base.length; j++) {

                var section = base[j].section;
                var community = base[j].community;
                var year = parseInt(base[j].year);
                var percentagetotal = base[j].percentagetotal;
                var percentagevariable = base[j].percentagevariable;

                // Section
                if (param_section != undefined && param_community == undefined && param_year == undefined && param_percentagetotal == undefined && param_percentagevariable == undefined) {
                    if (param_section == section) {
                        aux_set.push(base[j]);
                    }

                }
                //Community
                else if (param_section == undefined && param_community != undefined && param_year == undefined && param_percentagetotal == undefined && param_percentagevariable == undefined) {
                    if (param_community == community) {
                        aux_set.push(base[j]);
                    }

                }
                //Year
                else if (param_section == undefined && param_community == undefined && param_year != undefined && param_percentagetotal == undefined && param_percentagevariable == undefined) {
                    if (param_year == year) {
                        aux_set.push(base[j]);
                    }
                }
                //Percentagetotal
                else if (param_section == undefined && param_community == undefined && param_year == undefined && param_percentagetotal != undefined && param_percentagevariable == undefined) {
                    if (param_percentagetotal == percentagetotal) {
                        aux_set.push(base[j]);
                    }

                }
                //Percentagevariable
                else if (param_section == undefined && param_community == undefined && param_year == undefined && param_percentagetotal == undefined && param_percentagevariable != undefined) {
                    if (param_percentagevariable == percentagevariable) {
                        aux_set.push(base[j]);
                    }
                }
            }
        }
        return aux_set;

    };

    app.get(BASE_API_PATH + "/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3910868/RVu4Gq2r"); //postman
    });


    //loadInitialData
    app.get(BASE_API_PATH_SP + "/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /loadInitialData");

        db.find({}).toArray((err, spendingPolicies) => {
            if (err) {
                console.error("Error acccesing DB");
                res.sendStatus(500);
                return;
            }
            if (spendingPolicies.length == 0) {
                console.log("Empty DB");
                db.insert(initialSpendingPolicies);
                res.sendStatus(200);
            }
            else {
                console.log("DB initialized with " + spendingPolicies.length + "spendingPolicies");
                res.sendStatus(200);
            }
            res.send(spendingPolicies.map((c) => {
                delete c._id;
                return c;
            }));
        });

    });



    /*  //------GET a todos los recursos-----
      app.get(BASE_API_PATH + "/spending-policies", (req, res) => {
          console.log(Date() + " - GET /spending-policies/");

          db.find({}).toArray((err, spendingPolicies) => {
              if (err) {
                  console.error("Error accesing DB");
                  res.sendStatus(500);
                  return;
              }

              res.send(spendingPolicies.map((c) => {
                  delete c._id;
                  return c;
              }));
          });
      }); */


    //------POST a todos los recursos-------
    app.post(BASE_API_PATH + "/spending-policies", (req, res) => {
        console.log(Date() + " - POST /spending-policies");
        var spendingPolicie = req.body;

        if (Object.keys(spendingPolicie).length > 5 || !spendingPolicie.hasOwnProperty("section") || !spendingPolicie.hasOwnProperty("community") ||
            !spendingPolicie.hasOwnProperty("year") || !spendingPolicie.hasOwnProperty("percentagetotal") || !spendingPolicie.hasOwnProperty("percentagevariable")) {
            res.sendStatus(400);
            return;
        }

        if (!spendingPolicie) {
            console.log("warning : new Get req");
            res.sendStatus(400);
        }
        db.find({ "section": spendingPolicie.section }).toArray((err, spendingPolicies) => {
            if (err) {
                console.log("error accesing db");
                res.sendStatus(500);
            }
            if (spendingPolicies.length > 0) {
                console.log("warning");
                res.sendStatus(409);
            }
            else {
                db.insert(spendingPolicie);
                res.sendStatus(201);
            }
        });

    });

    //-------PUT a todos los recursos-------
    app.put(BASE_API_PATH + "/spending-policies", (req, res) => {
        console.log(Date() + " - PUT /spending-policies");
        res.sendStatus(405);
    });

    //-----DELETE de todo---------
    app.delete(BASE_API_PATH + "/spending-policies", (req, res) => {
        console.log(Date() + " - DELETE /spending-policies");
        spendingPolicies = [];
        db.remove({});
        res.sendStatus(200);

    });

    //------GET de un recurso concreto-----
    app.get(BASE_API_PATH + "/spending-policies/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - GET /spending-policies/" + section);

        db.find({ "section": section }).toArray((err, spendingPolicies) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (spendingPolicies.length == 0) {
                res.sendStatus(404);
                return;
            }

            res.send(spendingPolicies.map((c) => {
                delete c._id;
                return c;
            })[0]); //se queda con el primero que cumpla la condición.
        });
    });

    //-----DELETE de un recurso concreto------
    app.delete(BASE_API_PATH + "/spending-policies/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - DELETE /spending-policies/" + section);

        db.find({ "section": section }).toArray((err, spendingPolicie) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (spendingPolicie.length == 0) {
                res.sendStatus(404);
            }

            else {
                db.remove({ "section": section });
                res.sendStatus(200);
            }

        });

    });

    //------POST de un recurso concreto------
    app.post(BASE_API_PATH + "/spending-policies/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - POST /spending-policies/" + section);

        res.sendStatus(405);
    });

    //------PUT a un recurso concreto-----
    app.put(BASE_API_PATH + "/spending-policies/:section", (req, res) => {
        var section = req.params.section;
        var spendingPolicie = req.body;

        console.log(Date() + " - PUT /spending-policies/" + section);

        if (Object.keys(spendingPolicie).length > 5 || !spendingPolicie.hasOwnProperty("section") || !spendingPolicie.hasOwnProperty("community") ||
            !spendingPolicie.hasOwnProperty("year") || !spendingPolicie.hasOwnProperty("percentage-total") || !spendingPolicie.hasOwnProperty("percentage-variable")) {
            res.sendStatus(400);
            return;
        }

        if (!section) {
            console.log("warning: new Put");
            res.sendStatus(400);
        }

        if (section != spendingPolicie.section) {
            res.sendStatus(400);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }

        db.update({ "section": spendingPolicie.section }, spendingPolicie, (err, numUpdated) => {
            console.log("Updated: " + numUpdated);
        });

        res.sendStatus(200);
    });


    //Búsqueda
    app.get(BASE_API_PATH + "/spending-policies", function(request, response) {

        console.log("INFO: New GET request to /spending-policies");
        
        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        var section = request.query.section;
        var community = request.query.community;
        var year = request.query.year;
        var percentagetotal = request.query.percentagetotal;
        var percentagevariable = request.query.percentagevariable;
        var aux = [];
        var aux2 = [];
        var aux3 = [];


        if (limit || offset >= 0) {
            db.find({}).skip(offset).limit(limit).toArray(function(err, spendingPolicies) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                    return;
                }
                else {
                    if (spendingPolicies.length === 0) {
                        response.sendStatus(404); //No content
                        return;
                    }
                    console.log("INFO: Sending params :: " + JSON.stringify(spendingPolicies, 2, null));
                    if (section || community || year || percentagetotal || percentagevariable) {

                        aux = buscador(spendingPolicies, aux, section, community, year, percentagetotal, percentagevariable);
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
                        response.send(spendingPolicies.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                }
            });

        }
        else {

            db.find({}).toArray(function(err, spendingPolicies) {
                if (err) {
                    console.error('ERROR from database');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (spendingPolicies.length === 0) {
                        response.send(spendingPolicies);
                        return;
                    }

                    if (section || community || year || percentagetotal || percentagevariable) {
                        aux = buscador(spendingPolicies, aux, section, community, year, percentagetotal, percentagevariable);
                        if (aux.length > 0) {
                            response.send(aux);
                        }
                        else {
                            response.sendStatus(404); //No content
                            return;
                        }
                    }
                    else {
                        response.send(spendingPolicies.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                }
            });
        }

    });


};
