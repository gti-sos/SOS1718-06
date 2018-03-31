var express = require("express");
var app = express();
var port = (process.env.PORT || 1607);
var BASE_API = "/api/v1";
var bodyParser = require("body-parser");
var contacts = [{
    "name":"pablo",
    "phone":12345
},
{
    "name":"pepe",
    "phone":6789
}];

<<<<<<< HEAD
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
=======
app.listen(port,()=>{
    console.log("Server ready on port" + port + "!");
}).on("error",(e)=>{
    console.log("Server not ready" + e);
>>>>>>> 0154054cf693569e7626ec01f760d962162da486
});

app.use("/",express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.get(BASE_API + "/contacts",(req,res)=>{
   res.send(contacts); 
});

app.post(BASE_API + "/contacts",(req,res)=>{
    var contact = req.body;
    contacts.push(contact);
    res.sendStatus(201);
});
