var budgetsLawsApi = {};
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_LAWS = "/api/v1/budgets-laws";

var budgetsLaws = [
        { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-Pública-Empresarial-de-la-Radio-y-Televisión-de-Andalucía-(RTVA)-(Consolidado)",
            "budget-of-capital" : "5.686.779",
            "total" : "169.692.400"
        },
         { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-Pública-Empresarial-de-la-Radio-y-Televisión-de-Andalucía-(RTVA)",
            "budget-of-capital" : "968.284",
            "total" : "161.435.032"
        },
         { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-Andaluza-del-Conocimiento",
            "budget-of-capital" : "200.000",
            "total" : "7.153.248"
        },
         { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-Pública-Andaluza-de-Educación",
            "budget-of-capital" : "1.500.000",
            "total" : "379.706.833"
        },
         { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-Pública-Empresarial-Sanitaria-Bajo-Guadalquivir",
            "budget-of-capital" : "800.000",
            "total" : "50.892.169"
        }
       
       
    ];


module.exports = budgetsLawsApi;

budgetsLawsApi.register= function (app,db){
    console.log("Registering routes for contacts API...");



app.get(BASE_API_PATH + "/help", (req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/3889720/collection/RVu1HAkq");
});

    
//CONTACTS GENERAL
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
    budgetsLaws.push(budget);
    res.sendStatus(201);
});

app.put(BASE_API_PATH_LAWS,(req,res)=>{
    console.log(Date() + " - PUT /budgets-laws");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH_LAWS,(req,res)=>{
    console.log(Date() + " - DELETE /budgets-laws");
    budgetsLaws = [];
    
    db.remove({});
    
    res.sendStatus(200);
});

//CONTACTS ESPECIFICO
app.get(BASE_API_PATH_LAWS + "/:section",(req,res)=>{
   var section = req.params.section;
   console.log(Date() + " - GET /budgets-laws/" + section);
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
   budgetsLaws = budgetsLaws.filter((c)=>{
       return (c.section != section);
   });
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
  
   if(section != budget.section){
       res.sendStatus(409);
       console.warn(Date() + " - Hacking attempt!");
       return;
   }
   
    
   db.update({"section": budget.section},budget,(err,numUpdated)=>{
       console.log("Update:"+numUpdated);
   });
   
   res.sendStatus(200);
});
    
    
}