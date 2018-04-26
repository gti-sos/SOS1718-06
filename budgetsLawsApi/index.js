var budgetsLawsApi = {};
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_LAWS = "/api/v1/budgets-laws";
module.exports = budgetsLawsApi;

budgetsLawsApi.register = function(app, budgetsLawsdb, InitialBudgetsLaws){
    console.log("Registering routes for budgets-laws API...");
    
    //DOCS
    app.get(BASE_API_PATH_LAWS + "/docs", (req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/4051792/collection/RVu5iTsK");
    });
    
    //LOADINITIALDATA
    app.get(BASE_API_PATH_LAWS + "/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /loadInitialData");
        
        budgetsLawsdb.find({}).toArray((err, budgets)=>{
            if(err){
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if(budgets.length == 0){
                console.log("Empty DB");
                budgetsLawsdb.insert(InitialBudgetsLaws);
                res.sendStatus(200);
            }
            else{
            console.log("DB initialized with " + budgets.length + "budgets");
            res.sendStatus(200);
            }
        });  
    });
    
    //GET A RECURSO BASE CON BUSQUEDAS Y PAGINACION IMPLEMENTADO
    app.get(BASE_API_PATH_LAWS,function(req, res) {
        var dbquery = {};
        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;

        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        Object.keys(req.query).forEach((at) => {

            if (isNaN(req.query[at]) == false) {
                dbquery[at] = parseInt(req.query[at]);
            }
            else {
                dbquery[at] = req.query[at];
            }

        });

        if (Object.keys(req.query).includes('from') && Object.keys(req.query).includes('to')) {

            delete dbquery.from;
            delete dbquery.to;
            dbquery['year'] = { "$lte": parseInt(req.query['to']), "$gte": parseInt(req.query['from']) };

        }
        else if (Object.keys(req.query).includes('from')) {

            delete dbquery.from;
            dbquery['year'] = { "$gte": parseInt(req.query['from']) };

        }
        else if (Object.keys(req.query).includes('to')) {

            delete dbquery.to;
            dbquery['year'] = { "$lte": parseInt(req.query['to']) };

        }

        budgetsLawsdb.find(dbquery).skip(offset).limit(limit).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }
            /*
                        if (stats.length == 0) {
                            res.sendStatus(404);
                        }*/
            else {

                res.send(stats.map((s) => {
                    delete s._id;
                    return s;
                }));

            }

        });

    });
    
    app.post(BASE_API_PATH_LAWS, (req, res) => {

        console.log(Date() + " - POST ");
        var budget = req.body;

        budgetsLawsdb.find({ "community": budget.community, "year": budget.year }).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }


            if (Object.keys(budget).length !== 6) {

                console.warn("Stat does not have the expected fields");
                res.sendStatus(400);

            }
            else if (stats.length !== 0) {

                res.sendStatus(409);

            }
            else {

                budgetsLawsdb.insert(budget);
                res.sendStatus(201);
            }

        });

    });
    
    app.put(BASE_API_PATH_LAWS, (req, res) => {

        console.log(Date() + " - PUT ");
        res.sendStatus(405);
    });
    
    app.delete(BASE_API_PATH_LAWS, (req, res) => {


        console.log(Date() + " Delete ");

        budgetsLawsdb.find({}).toArray((err, budgets) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (budgets.length == 0) {

                res.sendStatus(404);

            }
            else {

                budgetsLawsdb.remove({});
                res.sendStatus(200);
            }

        });

    });
    
    app.get(BASE_API_PATH_LAWS + "/:section", (req, res) => {

        var section = req.params.section;
        console.log(Date() + " - GET /span-univ-stats/" + section);

        budgetsLawsdb.find({ "section": section }).toArray((err, budgets) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (budgets.length == 0) {

                res.sendStatus(404);

            }
            else {

                res.send(budgets.map((s) => {
                    delete s._id;
                    return s;
                }));

            }

        });
    });
    
    app.delete(BASE_API_PATH_LAWS + "/:section", (req, res) => {

        var section = req.params.section;

        console.log(Date() + " - DELETE " + section);

        budgetsLawsdb.find({ "section": section }).toArray((err, budgets) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (budgets.length == 0) {

                res.sendStatus(404);

            }
            else {

                budgetsLawsdb.remove({ "section": section });
                res.sendStatus(200);

            }

        });


    });
    
    app.post(BASE_API_PATH_LAWS + "/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - POST " + section);
        res.sendStatus(405);
    });
    
    app.put(BASE_API_PATH_LAWS + "/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - PUT " + section);
        res.sendStatus(405);
    });
    
};























































