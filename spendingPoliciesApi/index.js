var spendingPoliciesApi = {};
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_SP = "/api/v1/spending-policies";

module.exports = spendingPoliciesApi;


spendingPoliciesApi.register = function(app, db) {
    console.log("Registering routes for spending policies API...");

    var initialSpendingPolicies = [{
            "section": "GastosDePersonal",
            "community": "Andalucia",
            "year": 2017,
            "percentage-total": 30.8,
            "percentage-variable": 1.7
        },
        {
            "section": "GastosCorrientesEnBienesYServicios",
            "community": "Andalucia",
            "year": 2017,
            "percentage-total": 9.9,
            "percentage-variable": 12.9
        },
        {
            "section": "GastosFinancieros",
            "community": "Andalucia",
            "year": 2017,
            "percentage-total": 1.5,
            "percentage-variable": -5.1
        },
        {
            "section": "TransferenciasCorrientes",
            "community": "Andalucia",
            "year": 2017,
            "percentage-total": 35.4,
            "percentage-variable": 1.4
        },
        {
            "section": "InversionesReales",
            "community": "Andalucia",
            "year": 2017,
            "percentage-total": 4,
            "percentage-variable": 10.3
        }
    ];
    
     //loadInitialData
    app.get(BASE_API_PATH_SP + "/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /loadInitialData" + initialSpendingPolicies);

        db.find({}).toArray((err, spendingPolicies) => {
            if (err) {
                console.log("Error acccesing DB");
                process.exit(1);
                return;
            }
            if (spendingPolicies.length == 0) {
                console.log("Empty DB");
                db.insert(initialSpendingPolicies);
            }
            res.send(spendingPolicies.map((c) => {
                delete c._id;
                return c;
            }));
        });

    });


    //------GET a todos los recursos-----
    app.get(BASE_API_PATH + "/spending-policies", (req, res) => {
        console.log(Date() + " - GET /spending-policies");

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
    });

    //------POST a todos los recursos-------
    app.post(BASE_API_PATH + "/spending-policies", (req, res) => {
        console.log(Date() + " - POST /spending-policies");
        var spendingPolicie = req.body;

        if (Object.keys(spendingPolicie).length > 5 || !spendingPolicie.hasOwnProperty("section") || !spendingPolicie.hasOwnProperty("community") ||
            !spendingPolicie.hasOwnProperty("year") || !spendingPolicie.hasOwnProperty("percentage-total") || !spendingPolicie.hasOwnProperty("percentage-variable")) {
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
                res.sendStatus(400);
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

        db.remove({ "section": section }, { multi: true }, (err, spendingPolicie) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.sendStatus(200);
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

   
};
