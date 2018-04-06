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

 db.find({}).toArray((err,budgetsLaws)=>{
    if(err){
        console.log("Error acccesing DB");
        process.exit(1);
        return;
        }
    if(budgetsLaws.length == 0){
        console.log("Empty DB");
        db.insert(InitialBudgetsLaws);
    }
    res.send(budgetsLaws.map((c)=> {
            delete c._id;
            return c;
        }));
});

});


//BUDGETSLAWS GENERAL
app.get(BASE_API_PATH_LAWS,(req,res)=>{
   console.log(Date() + " - GET /budgets-laws");

   db.find({}).toArray((err,budgetsLaws)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
        return;
    }

    res.send(budgetsLaws.map((c)=>{
        delete c._id;
        return c;
    }));
    });
});

app.post(BASE_API_PATH_LAWS,(req,res)=>{
    console.log(Date() + " - POST /budgets-laws");
    var budget = req.body;

    if(!budget){
        console.log("warning : new Get req");
        res.sendStatus(400);
    }
    db.find({"section":budget.section}).toArray((err,budgetsLaws)=>{
        if(err){
            console.log("error accesing db");
            res.sendStatus(400);
        }
        if(budgetsLaws.length>0){
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
    db.remove({});
    res.sendStatus(200);
});

//BUDGETSLAWS ESPECIFICO
app.get(BASE_API_PATH_LAWS + "/:section",(req,res)=>{
   var section = req.params.section;
   console.log(Date() + " - GET /budgets-laws/" + section);

   if(!section){
       console.log("warning : new Get req");
       res.sendStatus(400);
   }
   db.find({"section": section}).toArray((err,budgetsLaws)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
        return;
    }
    res.send(budgetsLaws.map((c)=>{
        delete c._id;
        return c;
    })[0]);
    });
});

app.delete(BASE_API_PATH_LAWS + "/:section",(req,res)=>{
   var section = req.params.section;
   console.log(Date() + " - DELETE /budgets-laws/" + section);
   /*budgetsLaws = budgetsLaws.filter((c)=>{
       return (c.section != section);
   });*/
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