var generalBudgetsApi = {};
var BASE_API_PATH = "/api/v1"; //variable global
var BASE_API_PATH_GB = "/api/v1/general-budgets";

module.exports = generalBudgetsApi; //voy a exportar ese objeto

generalBudgetsApi.register = function(app, db) {
    console.log("Registering routs for contact API..");

    app.get(BASE_API_PATH_GB + "/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3895452/sos1718-06-dgc-definitiva/RVu4HAbJ"); //postman
    });

    var InitialGeneralBudgets = [{
            "community": "andalucia",
            "year": 2017,
            "section": "parlamento-de-andalucia",
            "totalbudget": 454.7,
            "percentage-over-total": 0.1
        },
        {
            "community": "andalucia",
            "year": 2017,
            "section": "deuda-publica",
            "totalbudget": 412.5,
            "percentage-over-total": 12.5
        },
        {
            "community": "andalucia",
            "year": 2017,
            "section": "camara-de-cuentas",
            "totalbudget": 104.1,
            "percentage-over-total": 31.0
        },
        {
            "community": "andalucia",
            "year": 2017,
            "section": "consejeria-de-educacion",
            "totalbudget": 610.3,
            "percentage-over-total": 18.3
        },
        {
            "community": "andalucia",
            "year": 2017,
            "section": "consejeria-de-salud",
            "totalbudget": 725.6,
            "percentage-over-total": 2.1
        },


    ];

    //loadInitialData
    app.get(BASE_API_PATH_GB + "/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /loadInitialData" + InitialGeneralBudgets);

        db.find({}).toArray((err, generalBudgets) => {
            if (err) {
                console.log("Error acccesing DB");
                process.exit(1);
                return;
            }
            if (generalBudgets.length == 0) {
                console.log("Empty DB");
                db.insert(InitialGeneralBudgets);
            }
            res.send(generalBudgets.map((c) => {
                delete c._id;
                return c;
            }));
        });

    });
    
    //----paginación-----------
   app.get(BASE_API_PATH_GB + "/limit=:limit&offset=:offset", (req, res) => {
        var limit = parseInt(req.params.limit);
        var offset = parseInt(req.params.offset);
        console.log(Date() + " - GET /general-budgets"+"/limit="+limit +"&offset="+offset);
    
        db.find({}).skip(offset).limit(limit).toArray((err, budgets) => {
            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.send(budgets.map((c) => {
                delete c._id; 
                return c;
            }));
        });
    });
    
    //-------búsquedas----------
   app.get(BASE_API_PATH_GB + "/community=:community", (req, res) => {
        var community = req.params.community;
        console.log(Date() + " - GET /general-budgets/community=" + community);
        db.find({"community": community }).toArray((err, budget) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (budget.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(budget.map((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
    
    app.get(BASE_API_PATH_GB + "/year=:year", (req, res) => {
        var year = parseInt(req.params.year);
        console.log(Date() + " - GET /general-budgets/year=" + year);
        db.find({"year": year}).toArray((err, budget) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (budget.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(budget.map((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
    

app.get(BASE_API_PATH_GB + "/percentage-over-total=:x1&:x2", (req, res) => {
        var x1 = parseFloat(req.params.x1);
        var x2 = parseFloat(req.params.x2);
        console.log(Date() + " - GET /general-budgets/percentage-over-total=" + x1 + "-"+x2);
        db.find({"percentage-over-total":{$gte:x1 , $lte:x2}}).toArray((err, budget) => { //mayor que x1 y menor que x2
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (budget.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(budget.map((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
    
    app.get(BASE_API_PATH_GB + "/totalbudget=:x1&:x2", (req, res) => {
        var x1 = parseFloat(req.params.x1);
        var x2 = parseFloat(req.params.x2);
        console.log(Date() + " - GET /general-budgets/totalbudget=" + x1 + "-"+x2);
        db.find({"totalbudget":{$gte:x1 , $lte:x2}}).toArray((err, budget) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (budget.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(budget.map((c)=>{
               delete c._id;
               return c;
            }));
        });
    });


    
    //-------GET a todos los presupuestos generales-------------
    app.get(BASE_API_PATH + "/general-budgets", (req, res) => {
        console.log(Date() + " - GET /general-budgets");

        db.find({}).toArray((err, generalBudgets) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(generalBudgets.map((c) => {
                delete c._id;
                return c;
            }));
        });

    });

    //--------GET de un solo recurso--------------
    app.get(BASE_API_PATH + "/general-budgets/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - GET /section/" + section);

        db.find({ "section": section }).toArray((err, generalBudgets) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (generalBudgets.length == 0) {
                res.sendStatus(404);
                return;
            }

            res.send(generalBudgets.map((c) => {
                delete c._id;
                return c;
            })[0]); // coge el primero que haya que cumpla la condición
        });
    });

    //DELETE de TODO
    app.delete(BASE_API_PATH + "/general-budgets", (req, res) => { //igual
        console.log(Date() + " - DELETE /general-budgets");
        generalBudgets = [];

        db.remove({});

        res.sendStatus(200);
    });

    //DELETE de algo concreto
    app.delete(BASE_API_PATH_GB + "/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - DELETE /general-budgets/" + section);

        db.remove({ "section": section });
        res.sendStatus(200);
    });

    //POST normal
    app.post(BASE_API_PATH_GB, (req, res) => {
        console.log(Date() + " - POST /general-budgets");
        var budget = req.body;
        
        if (Object.keys(budget).length > 5 ||!budget.hasOwnProperty("community")|| !budget.hasOwnProperty("year") ||
            !budget.hasOwnProperty("section") || !budget.hasOwnProperty("totalbudget") || !budget.hasOwnProperty("percentage-over-total")){
            res.sendStatus(400);
            return;
            }

        if (!budget) {
            console.log("warning : new Get req");
            res.sendStatus(400);
        }
        db.find({ "section": budget.section }).toArray((err, generalBudgets) => {
            if (err) {
                console.log("error accesing db");
                res.sendStatus(400);
            }
            if (generalBudgets.length > 0) {
                console.log("warning");
                res.sendStatus(409);
            }
            else {
                db.insert(budget);
                res.sendStatus(201);
            }
        });

    });

    //POST a un recurso concreto
    app.post(BASE_API_PATH_GB + "/:section", (req, res) => { //debe dar error de método no permitido
        var section = req.params.section;
        console.log(Date() + " - POST /general-budgets/" + section);
        res.sendStatus(405);
    });

    //PUT general
    app.put(BASE_API_PATH_GB, (req, res) => { // debe dar un error de método no permitido
        console.log(Date() + " - PUT /general-budgets");
        res.sendStatus(405);
    });

    //PUT a un recurso concreto
   app.put(BASE_API_PATH_GB + "/:section",(req,res)=>{
   var section = req.params.section;
   var budget = req.body;

   console.log(Date() + " - PUT /general-budgets/" + section);
    
    if(!section){
        console.log("warning: new Put");
        res.sendStatus(400);
    }
    
   if(section != budget.section){
       res.sendStatus(400);
       console.warn(Date() + " - Hacking attempt!");
       return;
   }


   db.update({"section": budget.section},budget);
   res.sendStatus(200);
});
};
