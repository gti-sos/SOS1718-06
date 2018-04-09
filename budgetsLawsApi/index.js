var budgetsLawsApi = {};
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_LAWS = "/api/v1/budgets-laws";

module.exports = budgetsLawsApi;

budgetsLawsApi.register= function(app,db){
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


//paginacion
app.get(BASE_API_PATH_LAWS + "/limit=:limit&offset=:offset", (req, res) => {
        var limit = parseInt(req.params.limit);
        var offset = parseInt(req.params.offset);
        console.log(Date() + " - GET /budgets-laws"+"/limit="+limit +"&offset="+offset);
    
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
    
//busquedas
app.get(BASE_API_PATH_LAWS + "/community=:community", (req, res) => {
        var community = req.params.community;
        console.log(Date() + " - GET /budgets-laws/community=" + community);
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
    
    app.get(BASE_API_PATH_LAWS + "/year=:year", (req, res) => {
        var year = parseInt(req.params.year);
        console.log(Date() + " - GET /budgets-laws/year=" + year);
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
    

app.get(BASE_API_PATH_LAWS + "/budget-of-capital=:x1&:x2", (req, res) => {
        var x1 = parseFloat(req.params.x1);
        var x2 = parseFloat(req.params.x2);
        console.log(Date() + " - GET /budgets-laws/budget-of-capital=" + x1 + "-"+x2);
        db.find({"budget-of-capital":{$gte:x1 , $lte:x2}}).toArray((err, budget) => { //mayor que x1 y menor que x2
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
    
    app.get(BASE_API_PATH_LAWS + "/total=:x1&:x2", (req, res) => {
        var x1 = parseFloat(req.params.x1);
        var x2 = parseFloat(req.params.x2);
        console.log(Date() + " - GET /budgets-laws/total=" + x1 + "-"+x2);
        db.find({"total":{$gte:x1 , $lte:x2}}).toArray((err, budget) => {
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




//BUDGETSLAWS GENERAL
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

app.post(BASE_API_PATH_LAWS ,(req,res)=>{
    console.log(Date() + " - POST /budgets-laws");
    var budget = req.body;
    
    if (Object.keys(budget).length > 5 ||!budget.hasOwnProperty("community")|| !budget.hasOwnProperty("year") ||
        !budget.hasOwnProperty("section") || !budget.hasOwnProperty("budget-of-capital") || !budget.hasOwnProperty("total")){
        res.sendStatus(400);
        return;
    }
    
    db.find({"section":budget.section}).toArray((err,InitialBudgetsLaws)=>{  //budgetsLaws
        if(err){
            console.log("error accesing db");
            res.sendStatus(500);
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

app.put(BASE_API_PATH_LAWS ,(req,res)=>{
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
});
};