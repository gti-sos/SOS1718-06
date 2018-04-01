var SPApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = SPApi;


SPApi.register = function(app, db) {
    console.log("Registering routes for spending policies API...");


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

    /* app.post(BASE_API_PATH + "/spendingPolicies", (req, res) => {
         console.log(Date() + " - POST /spendingPolicies");

         db.insert({}).toArray((err, spendingPolicies) => {
             if (err) {
                 console.error("Error accesing DB");
                 res.sendStatus(500);
                 return;
             }

             var spendingPolicie = req.body;
             spendingPolicies.push(spendingPolicie);
             res.sendStatus(201);
         });
     });*/

    app.post(BASE_API_PATH + "/spending-policies", (req, res) => {
        var section = req.params.section;
        var spendingPolicie = req.body;
        
        console.log(Date() + " - POST /spending-policies");
        
        
         /*if (section != spendingPolicie.section) {
            res.sendStatus(409);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }*/
        
        db.insert(req.body, (err, spendingPolicie1) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            
            

            res.sendStatus(201);
        });
    });

    /*app.post(BASE_API_PATH_BUDGETS, (req, res) => {
        console.log(Date() + " - POST /budgets-generals");
        
        db.insert(req.body, (err, budget) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.sendStatus(201);
        });
    });*/


    app.put(BASE_API_PATH + "/spending-policies", (req, res) => {
        console.log(Date() + " - PUT /spending-policies");

        db.find({}).toArray((err, spendingPolicies) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.sendStatus(405);
        });
    });

    app.delete(BASE_API_PATH + "/spending-policies", (req, res) => {
        console.log(Date() + " - DELETE /spending-policies");
        spendingPolicies = [];

        db.remove({});

        res.sendStatus(200);

    });

    app.get(BASE_API_PATH + "/spending-policies/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - GET /spending-policies/" + section);

        db.find({ "section": section }).toArray((err, spendingPolicies) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(spendingPolicies.map((c) => {
                delete c._id;
                return c;
            })[0]);
        });
    });


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


    app.post(BASE_API_PATH + "/spending-policies/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - POST /spending-policies/" + section);

        db.find({ "section": section }).toArray((err, spendingPolicies) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.sendStatus(405);
        });
    });


    app.put(BASE_API_PATH + "/spending-policies/:section", (req, res) => {
        var section = req.params.section;
        var spendingPolicie = req.body;

        console.log(Date() + " - PUT /spending-policies/" + section);

        if (section != spendingPolicie.section) {
            res.sendStatus(400);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }

        db.update({ "section": spendingPolicie.section }, spendingPolicie, (err, numUpdated) => {
            console.log("Updated: " + numUpdated);

            /*spendingPolicies = spendingPolicies.map((c) => {
                if (c.section == spendingPolicie.section)
                    return spendingPolicie;
                else
                    return c;
            });*/

        });

        res.sendStatus(200);
    });

    //loadInitial de spendingPolicies
    app.get(BASE_API_PATH + "/spending-policies/loadInitialData", (req, res) => {
        db.find({}, (err, spendingPolicie) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            }
            else if (spendingPolicie.length == 0) {
                db.insert(spendingPolicies);
                spendingPolicies.push(spendingPolicies);
                console.log("DB initialized with " + spendingPolicies.length + " spendingPolicies");
                res.sendStatus(200);
            }
            else {
                console.log("DB initialized with " + spendingPolicies.length + " spendingPolicies");
                res.sendStatus(200);
            }
        });
    });

}
