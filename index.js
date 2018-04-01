var express = require("express");
<<<<<<< HEAD
var app = express();
var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_LAWS = "/api/v1/budgets-laws";
var bodyParser = require("body-parser");
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
    
var initialBudgetsLaws = [
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
        }];
    
var dbFileName = __dirname+"/budgetsLaws.db";
var DataStore = require("nedb");

var db = new DataStore({
    
    filename: dbFileName,
    autoload: true
});

db.find({},(err,budgetsLaws)=>{
    if(err){
        console.error("Error accesing DB");
        process.exit(1);
    }
    
    if(budgetsLaws.length == 0){
        console.log("Empty DB");
        db.insert(initialBudgetsLaws);
    }else{
        console.log("Db initialized with " + budgetsLaws.length + "budgetsLaws");
    }
});


=======
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var port = (process.env.PORT || 1607);
>>>>>>> 358bf7137a89056cceec0a62c64b7de18bb5a89b

var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_BUDGETS = "/api/v1/budgets-generals";
var BASE_API_PATH_HELP = "/api/v1/help";
var BASE_API_PATH_Spending = "/apiSpending-policies/v1";

var dbBudgets= __dirname + "budgets-generals.db";

<<<<<<< HEAD
=======
var app = express();

>>>>>>> 358bf7137a89056cceec0a62c64b7de18bb5a89b
app.use(bodyParser.json());
app.get(BASE_API_PATH_HELP,(req,res)=>{
    res.redirect("https://documenter.getpostman.com/collection/view/3895452-62614861-fe34-4ef4-83a2-a39409f16891#443a5885-f455-4f36-b0e1-3fc2a43728d1");
});


var budgets = [
        { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "parlamento-de-andalucia",
            "total-budget" : "45.479.748",
            "percentage-over-total" : 0.137,
        },
         { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "deuda-publica",
            "total-budget" : "4.162.050.097",
            "percentage-over-total" : 12.521,
        },
         { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "camara-de-cuentas",
            "total-budget" : "10.408.549",
            "percentage-over-total" : 31,
        },
         { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "consejeria-de-educacion",
            "total-budget" : "6.100.323.433",
            "percentage-over-total" : 18.353,
        },
         { 
            "community" : "andalucia",
            "year" : 2017,
            "section" : "consejeria-de-salud",
            "total-budget" : "725.885.406",
            "percentage-over-total" : 2.184,
        },
       
       
    ];
    
//////base de Datos de budgets////////
var db = new DataStore({  //inicializar base de datos
    filename: dbBudgets,
    autoload: true
}) ; 


db.find({},(err,budget)=>{
    if(err){
        console.log("Error accesing DB");
        process.exit(1);
    }
    
    if(budget.length==0){
        console.log("Empty DB");
        db.insert(budgets);
        
    }else{
        console.log("Inicializaed with " + budget);
    }
});
//loadInitial de Budgets
app.get(BASE_API_PATH_BUDGETS + "/loadInitialData", (req, res) => {
    db.find({}, (err, budget) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        }
        else if (budget.length == 0) {
            db.insert(budgets);
            budgets.push(budgets);
            console.log("DB initialized with " + budgets.length + " budgets");
            res.sendStatus(200);
        }
        else{
            console.log("DB initialized with " + budgets.length + " budgets.");
            res.sendStatus(200);
        }
    });
});
    
  
//////-----budgets-generals------///////

app.get(BASE_API_PATH_BUDGETS, (req, res) => {
      db.find({},(err,budget)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
    }
    res.send(budgets);
});
});

app.post(BASE_API_PATH_BUDGETS,(req,res)=>{
    console.log(Date() + " - POST /budgets-generals");
    db.insert(req.body, (err, budget) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        
        res.sendStatus(201);
    });
});

app.put(BASE_API_PATH_BUDGETS,(req,res)=>{ // debe dar un error de método no permitido
    console.log(Date() + " - PUT /budgets-generals"); 
    res.sendStatus(405);
});

app.delete(BASE_API_PATH_BUDGETS,(req,res)=>{
    console.log(Date() + " - DELETE /budgets-generals/");
    db.find({},(err,bud)=>{
        for(var i=0;i<bud.length;i++){
            db.remove({});
        }
    });
    res.sendStatus(200);
});


app.get(BASE_API_PATH_BUDGETS+"/:section",(req,res)=>{
    var section = req.params.section;
    console.log(Date() + " - GET /budgets-generals/"+section);
    
    db.find({"section":section},(err,sect)=>{
        if(err){
            console.error("Error acesing DB");
            res.sendStatus(500);
            return;
        }
    res.send(sect);});

});

<<<<<<< HEAD
app.get(BASE_API_PATH + "/help", (req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/3889720/collection/RVu1HAkq");
});

//CONTACTS GENERAL
app.get(BASE_API_PATH_LAWS,(req,res)=>{
   console.log(Date() + " - GET /budgets-laws");
   
   db.find({},(err,budgetsLaws)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
        return;
    }
    
    res.send(budgetsLaws);
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
   res.send(budgetsLaws.filter((c)=>{
       return (c.section == section);
   })[0]);
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
=======
/*
app.delete(BASE_API_PATH_BUDGETS+"/:section",(req,res)=>{
    var section = req.params.section;
    console.log(Date() + " - DELETE /budgets-generals/"+section);
    
    budgets = budgets.filter((b)=>{
        return (b.section != section);
    });
    
    res.sendStatus(200);
});*/

app.delete(BASE_API_PATH_BUDGETS+"/:section",(req,res)=>{
     var section1 = req.params.section;
    console.log(Date() + " - DELETE /budgets-generals/"+section1);
     db.remove({section:section1}, {multi: true}, (err, budget) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        
        res.sendStatus(200);
    });
    
});

app.post(BASE_API_PATH_BUDGETS+"/:section",(req,res)=>{ //debe dar error de método no permitido
    var section = req.params.section;
    console.log(Date() + " - POST /budgets-generals/"+section);
    res.sendStatus(405);
});

app.put(BASE_API_PATH_BUDGETS+"/:section",(req,res)=>{
    var section = req.params.section;
    var b = req.body;
    
    console.log(Date() + " - PUT /budgets-generals/"+section);
    
   if (section != b.section) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }
    
    db.update({"section": b.section},b,(err,numUpdated)=>{
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        console.log("Updated: " + numUpdated);
    });
    res.sendStatus(200);
});

var spendingPolicies = [
        { 
            "section" : "GastosDePersonal",
            "community" : "Andalucia",
            "year" : 2017,
            "percentage-total" : 30.8 ,
            "percentage-variable" : 1.7
        },
        { 
            "section" : "GastosCorrientesEnBienesYServicios",
            "community" : "Andalucia",
            "year" : 2017,
            "percentage-total" : 9.9 ,
            "percentage-variable" : 12.9
        },
        { 
            "section" : "GastosFinancieros",
            "community" : "Andalucia",
            "year" : 2017,
            "percentage-total" : 1.5 ,
            "percentage-variable" : -5.1
        },
        { 
            "section" : "TransferenciasCorrientes",
            "community" : "Andalucia",
            "year" : 2017,
            "percentage-total" : 35.4 ,
            "percentage-variable" : 1.4
        },
        { 
            "section" : "InversionesReales",
            "community" : "Andalucia",
            "year" : 2017,
            "percentage-total" : 4 ,
            "percentage-variable" : 10.3
        }
    ];
    
    
    

app.get(BASE_API_PATH_Spending+"/spendingPolicies",(req,res)=>{
    console.log(Date() + " - GET /spendingPolicies");
    res.send(spendingPolicies);
});

app.post(BASE_API_PATH_Spending+"/spendingPolicies",(req,res)=>{
    console.log(Date() + " - POST /spendingPolicies");
    var spendingPolicie = req.body;
    spendingPolicies.push(spendingPolicie);
    res.sendStatus(201);
});

app.put(BASE_API_PATH_Spending+"/spendingPolicies",(req,res)=>{
    console.log(Date() + " - PUT /spendingPolicies");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH_Spending+"/spendingPolicies",(req,res)=>{
    console.log(Date() + " - DELETE /spendingPolicies");
    spendingPolicies = [];
    res.sendStatus(200);
});


app.get(BASE_API_PATH_Spending+"/spendingPolicies/:section",(req,res)=>{
    var section = req.params.section;
    console.log(Date() + " - GET /spendingPolicies/"+section);
    
    res.send(spendingPolicies.filter((c)=>{
        return (c.section == section);
    })[0]);
});

app.delete(BASE_API_PATH_Spending+"/spendingPolicies/:section",(req,res)=>{
    var section = req.params.section;
    console.log(Date() + " - DELETE /spendingPolicies/"+section);
    
    spendingPolicies = spendingPolicies.filter((c)=>{
        return (c.section != section);
    });
    
    res.sendStatus(200);
});

app.post(BASE_API_PATH_Spending+"/spendingPolicies/:section",(req,res)=>{
    var section = req.params.section;
    console.log(Date() + " - POST /spendingPolicies/"+section);
    res.sendStatus(405);
});

app.put(BASE_API_PATH_Spending+"/spendingPolicies/:section",(req,res)=>{
    var section = req.params.section;
    var spendingPolicie = req.body;
    
    console.log(Date() + " - PUT /spendingPolicies/"+section);
    
    if(section != spendingPolicie.section){
        res.sendStatus(409);
        console.warn(Date()+" - Hacking attempt!");
        return;
    }
    
    spendingPolicies = spendingPolicies.map((c)=>{
        if(c.section == spendingPolicie.section)
            return spendingPolicie;
        else
            return c;
    });
    
    res.sendStatus(200);
>>>>>>> 358bf7137a89056cceec0a62c64b7de18bb5a89b
});



<<<<<<< HEAD




















=======
app.listen(port,()=>{
    console.log("Server ready on port "+port+"!");
}).on("error",(e)=>{
    console.log("Server NOT READY:"+e);
});

console.log("Server setting up...");
>>>>>>> 358bf7137a89056cceec0a62c64b7de18bb5a89b
