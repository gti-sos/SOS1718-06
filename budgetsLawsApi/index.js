var budgetsLawsApi = {};
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_LAWS = "/api/v1/budgets-laws";

module.exports = budgetsLawsApi;

budgetsLawsApi.register= function (app,db){
    console.log("Registering routes for contacts API...");

var InitialBudgetsLaws = [
        {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA-consolidado",
            "budget-of-capital" : "5.686.779",
            "total" : "169.692.400"
        },
         {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA",
            "budget-of-capital" : "968.284",
            "total" : "161.435.032"
        },
         {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-andaluza-del-conocimiento",
            "budget-of-capital" : "200.000",
            "total" : "7.153.248"
        },
         {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-publica-andaluza-de-educacion",
            "budget-of-capital" : "1.500.000",
            "total" : "379.706.833"
        },
         {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-publica-empresarial-sanitaria-bajo-Guadalquivir",
            "budget-of-capital" : "800.000",
            "total" : "50.892.169"
        }


    ];

app.get(BASE_API_PATH_LAWS + "/docs", (req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/4051792/collection/RVu1HAzC");
});

app.get(BASE_API_PATH_LAWS + "/loadInitialData", (req, res) => {
 console.log(Date() + " - GET /loadInitialData" + InitialBudgetsLaws);

 db.find({}).toArray((err,InitialBudgetsLaws)=>{ //budgetsLaws
    if(err){
        console.log("Error acccesing DB");
        process.exit(1);
        return;
        }
    if(InitialBudgetsLaws.length == 0){ //budgetsLaws
        console.log("Empty DB");
        db.insert(InitialBudgetsLaws);
    }
    res.send(InitialBudgetsLaws.map((c)=> { //budgetsLaws
            delete c._id;
            return c;
        }));
});

});


/* BUDGETSLAWS GENERAL
app.get(BASE_API_PATH_LAWS,(req,res)=>{
   console.log(Date() + " - GET /budgets-laws");

   db.find({}).toArray((err,InitialBudgetsLaws)=>{ //budgetsLaws
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
        return;
    }

    res.send(InitialBudgetsLaws.map((c)=>{ //budgetsLaws
        delete c._id;
        return c;
    }));
    });
});

app.post(BASE_API_PATH_LAWS,(req,res)=>{
    console.log(Date() + " - POST /budgets-laws");
    var budget = req.body;
    
    if(!budget){
        console.log("warning: new Get req");
        res.sendStatus(400);
    }
    
    db.find({"section":budget.section}).toArray((err,InitialBudgetsLaws)=>{  //budgetsLaws
        if(err){
            console.log("error accesing db");
            res.sendStatus(400);
        }
        if(InitialBudgetsLaws.length>0){  //budgetsLaws
            console.log("warning");
            res.sendStatus(409);
        }else{
            db.insert(budget);
            res.sendStatus(201);
        }
    });

  });

app.put(BASE_API_PATH_LAWS,(req,res)=>{
    console.log(Date() + " - PUT /budgets-laws");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH_LAWS,(req,res)=>{
    console.log(Date() + " - DELETE /budgets-laws");
    InitialBudgetsLaws = [];
    db.remove({});
    res.sendStatus(200);
});

//BUDGETSLAWS ESPECIFICO
app.get(BASE_API_PATH_LAWS + "/:section",(req,res)=>{
   var section = req.params.section;
   console.log(Date() + " - GET /budgets-laws/" + section);

   db.find({"section": section}).toArray((err,InitialBudgetsLaws)=>{ //budgetsLaws
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
        return;
    }
    if(InitialBudgetsLaws.length == 0){
        res.sendStatus(404);
        return;
    }
    res.send(InitialBudgetsLaws.map((c)=>{  //budgetsLaws
        delete c._id;
        return c;
    })[0]);
    });
});

app.delete(BASE_API_PATH_LAWS + "/:section",(req,res)=>{
   var section = req.params.section;
   console.log(Date() + " - DELETE /budgets-laws/" + section);

   db.remove({"section":section});
   res.sendStatus(200);
});

app.post(BASE_API_PATH_LAWS + "/:section",(req,res)=>{
    var section = req.params.section;
    console.log(Date() + " - POST /budgets-laws/" + section);
    res.sendStatus(405);
});

app.put(BASE_API_PATH_LAWS + "/:section",(req,res)=>{
   var section = req.params.section;
   var budget = req.body;

   console.log(Date() + " - PUT /budgets-laws/" + section);
    
    if(!section){
        console.log("warning: new Put");
        res.sendStatus(404);
    }
    
   if(section != budget.section){
       res.sendStatus(400);
       console.warn(Date() + " - Hacking attempt!");
       return;
   }


   db.update({"section": budget.section},budget);
   res.sendStatus(200);
}); */

 app.get(BASE_API_PATH_LAWS, (req, res) => {
        console.log(Date() + " - GET /general-budgets");

        db.find({}).toArray((err, InitialBudgetsLaws) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(InitialBudgetsLaws.map((c) => {
                delete c._id;
                return c;
            }));
        });

    });

    //--------GET de un solo recurso--------------
    app.get(BASE_API_PATH_LAWS + "/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - GET /section/" + section);

        db.find({ "section": section }).toArray((err, InitialBudgetsLaws) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (InitialBudgetsLaws.length == 0) {
                res.sendStatus(404);
                return;
            }

            res.send(InitialBudgetsLaws.map((c) => {
                delete c._id;
                return c;
            })[0]); // coge el primero que haya que cumpla la condición
        });
    });

    //DELETE de TODO
    app.delete(BASE_API_PATH_LAWS, (req, res) => { //igual
        console.log(Date() + " - DELETE /general-budgets");
        InitialBudgetsLaws = [];

        db.remove({});

        res.sendStatus(200);
    });

    //DELETE de algo concreto
    app.delete(BASE_API_PATH_LAWS + "/:section", (req, res) => {
        var section = req.params.section;
        console.log(Date() + " - DELETE /general-budgets/" + section);

        db.remove({ "section": section });
        res.sendStatus(200);
    });

    //POST normal
    app.post(BASE_API_PATH_LAWS, (req, res) => {
        console.log(Date() + " - POST /general-budgets");
        var budget = req.body;
        
        if (Object.keys(budget).length > 5 ||!budget.hasOwnProperty("community")|| !budget.hasOwnProperty("year") ||
            !budget.hasOwnProperty("section") || !budget.hasOwnProperty("budget-of-capital") || !budget.hasOwnProperty("total")){
            res.sendStatus(400);
            return;
            }

        if (!budget) {
            console.log("warning : new Get req");
            res.sendStatus(400);
        }
        db.find({ "section": budget.section }).toArray((err, InitialBudgetsLaws) => {
            if (err) {
                console.log("error accesing db");
                res.sendStatus(400);
            }
            if (InitialBudgetsLaws.length > 0) {
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
    app.post(BASE_API_PATH_LAWS + "/:section", (req, res) => { //debe dar error de método no permitido
        var section = req.params.section;
        console.log(Date() + " - POST /general-budgets/" + section);
        res.sendStatus(405);
    });

    //PUT general
    app.put(BASE_API_PATH_LAWS, (req, res) => { // debe dar un error de método no permitido
        console.log(Date() + " - PUT /general-budgets");
        res.sendStatus(405);
    });

    //PUT a un recurso concreto
   app.put(BASE_API_PATH_LAWS + "/:section",(req,res)=>{
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


