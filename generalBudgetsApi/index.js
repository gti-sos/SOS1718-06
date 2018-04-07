var generalBudgetsApi = {};
var BASE_API_PATH = "/api/v1"; //variable global
var BASE_API_PATH_GB = "/api/v1/generalBudgets";

module.exports = generalBudgetsApi; //voy a exportar ese objeto

generalBudgetsApi.register = function(app, db) {
    console.log("Registering routs for contact API..");

    app.get(BASE_API_PATH + "/help", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3895452/sos1718-06/RVu4GVnA"); //postman
    });

    var InitialGeneralBudgets = [{
            "community": "andalucia",
            "year": 2017,
            "section": "parlamento-de-andalucia",
            "total-budget": "45.479.748",
            "percentage-over-total": "0.137"
        },
        {
            "community": "andalucia",
            "year": 2017,
            "section": "deuda-publica",
            "total-budget": "4.162.050.097",
            "percentage-over-total": "12.521"
        },
        {
            "community": "andalucia",
            "year": 2017,
            "section": "camara-de-cuentas",
            "total-budget": "10.408.549",
            "percentage-over-total": "31"
        },
        {
            "community": "andalucia",
            "year": 2017,
            "section": "consejeria-de-educacion",
            "total-budget": "6.100.323.433",
            "percentage-over-total": "18.353"
        },
        {
            "community": "andalucia",
            "year": 2017,
            "section": "consejeria-de-salud",
            "total-budget": "725.885.406",
            "percentage-over-total": "2.184"
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

    //-------GET a todos los presupuestos generales-------------
    app.get(BASE_API_PATH + "/generalBudgets", (req, res) => {
        console.log(Date() + " - GET /generalBudgets");

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
    app.get(BASE_API_PATH + "/generalBudgets/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - GET /section/" + section);

        db.find({ "section": section }).toArray((err, generalBudgets) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(generalBudgets.map((c) => {
                delete c._id;
                return c;
            })[0]); // coge el primero que haya que cumpla la condición
        });
    });

    //DELETE de TODO
    app.delete(BASE_API_PATH + "/generalBudgets", (req, res) => { //igual
        console.log(Date() + " - DELETE /generalBudgets");
        generalBudgets = [];

        db.remove({});

        res.sendStatus(200);
    });

    //DELETE de algo concreto
    app.delete(BASE_API_PATH_GB + "/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - DELETE /generalBudgets/" + section);

        db.remove({ "section": section });
        res.sendStatus(200);
    });

    //POST normal
    app.post(BASE_API_PATH_GB, (req, res) => {
        console.log(Date() + " - POST /generalBudgets");
        var budget = req.body;

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
        console.log(Date() + " - POST /generalBudgets/" + section);
        res.sendStatus(405);
    });

    //PUT general
    app.put(BASE_API_PATH_GB, (req, res) => { // debe dar un error de método no permitido
        console.log(Date() + " - PUT /generalBudgets");
        res.sendStatus(405);
    });

    //PUT a un recurso concreto
   app.put(BASE_API_PATH_GB + "/:section",(req,res)=>{
   var section = req.params.section;
   var budget = req.body;

   console.log(Date() + " - PUT /generalBudgets/" + section);
    
    if(!section){
        console.log("warning: new Put");
        res.sendStatus(400);
    }
    
   if(section != budget.section){
       res.sendStatus(409);
       console.warn(Date() + " - Hacking attempt!");
       return;
   }


   db.update({"section": budget.section},budget);
   res.sendStatus(200);
});
};
