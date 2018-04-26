var mdbBudgetsLawsURL = "mongodb://dbaom:sos1718-06@ds231559.mlab.com:31559/sos1718-aom-sandbox";
var budgetsLawsApi = {};
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_LAWS = "/api/v1/budgets-laws";
var MongoClient = require("mongodb").MongoClient;
module.exports = budgetsLawsApi;

var InitialBudgetsLaws = [
        {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA-consolidado",
            "budgetofcapital" : 5.779,
            "total" : 169.400
        },
         {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-publica-empresarial-de-la-radio-y-television-de-andalucia-RTVA",
            "budgetofapital" : 968.284,
            "total" : 161.032
        },
         {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-andaluza-del-conocimiento",
            "budgetofcapital" : 200.000,
            "total" : 7.248
        },
         {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-publica-andaluza-de-educacion",
            "budgetofcapital" : 1.000,
            "total" : 379.833
        },
         {
            "community" : "andalucia",
            "year" : 2017,
            "section" : "Agencia-publica-empresarial-sanitaria-bajo-Guadalquivir",
            "budgetofcapital" : 800.000,
            "total" : 892.169
        }
    ];

budgetsLawsApi.register = function(app){
    //urlQuery
    app.get(BASE_API_PATH_LAWS + "?", (req,res) =>{
        console.log("urlQuery");
        console.log(req.query);
        MongoClient.connect(mdbBudgetsLawsURL, function(err,db){
            if (err) throw err;
            var dba = db.db("sos1718-aom-sandbox");
            var query = req.query;
            var limit = 0;
            var offset = 0;
            if (req.query.year) {
                query.year = Number(req.query.year);
            }
            if (req.query.budgetofapital) {
                query.budgetofapital = Number(req.query.budgetofapital);
            }
            if (req.query.total) {
                query.total = Number(req.query.total);
            }
            if (req.query.offset) {
                offset = Number(req.query.offset);
            }
            if (req.query.limit) {
                limit = Number(req.query.limit);
            }
            delete query.offset;
            delete query.limit;
            dba.collection("budgetsLaws").find(query).skip(offset).limit(limit).toArray(function(err, result) {
                if (!err && !result.length) {
                    console.log("Not found");
                    res.sendStatus(404);
                }
                else {
                    res.send(result.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
                db.close();
            });
        });
    }); 
    
    app.get(BASE_API_PATH_LAWS + "/docs", (req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/4051792/collection/RVu5iTsK");
    });

    app.get(BASE_API_PATH_LAWS + "/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /loadInitialData" + InitialBudgetsLaws);

        MongoClient.connect(mdbBudgetsLawsURL, function(err, db) {
            if(err) throw err;
            var dba = db.db("sos1718-aom-sandbox");
            dba.collection("budgetsLaws").count(function(err, count){
                if(!err && !count) {
                    dba.collection("budgetsLaws").insertMany(InitialBudgetsLaws, function(err, resu){
                        if(err) throw err;
                        console.log("Number of documents inserted: " + resu.insertedCount);
                        res.send("Number of documents inserted: " + resu.insertedCount);
                        db.close();
                    });
                }
                else{
                    console.log("Budgets laws has " + count + "documents inserted");
                    res.send("Budgets laws has " + count + "documents inserted");
                }
                db.close();
            });
        });  
});

    //GET AL SECURED
    app.get(BASE_API_PATH + "/secure/budgets-laws", (req, res) => {
        var user = req.headers.user;
        var pass = req.headers.pass;
        if (user == "alvaro" && pass == "rb1907") {
            MongoClient.connect(mdbBudgetsLawsURL, function(err, db) {
                if (err) throw err;
                var dba = db.db("sos1718-aom-sandbox");
                dba.collection("budgetsLaws").find().toArray(function(err, result) {
                    if (!err && !result.length) {
                        console.log("Not found");
                        res.sendStatus(404);
                    }
                    else {
                        res.send(result.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                    db.close();
                });
            });
        }
        else {
            console.log("Unauthorized");
            res.sendStatus(401);
        }
    });
    
    

app.get(BASE_API_PATH,(req,res)=>{
   res.sendStatus(405);
   console.log("Method not allowed");
});

app.post(BASE_API_PATH_LAWS + "/*",(req,res)=>{
    res.sendStatus(405);
    console.log("Method not allowed");
});

app.put(BASE_API_PATH_LAWS ,(req,res)=>{
    res.sendStatus(405);
    console.log("Method not allowed");
});

app.put(BASE_API_PATH_LAWS + "/:obj", (req,res)=>{
   res.sendStatus(405);
   console.log("Method not allowed");
});





//GET section
app.get(BASE_API_PATH_LAWS + "/:section",(req,res)=>{
   console.log("GET section");
   var myquery = { section: req.body.section};
   MongoClient.connect(mdbBudgetsLawsURL, function(err, db) {
       if(err) throw err;
       var dba = db.db("sos1718-aom-sandbox");
       dba.collection("budgetsLaws").find(myquery).toArray(function(err,result){
           if(!err && !result.length){
               console.log("Not found");
                res.sendStatus(404);
                res.send(null);
           }
           else{
               res.send(result.map((c)=>{
                   delete c._id;
                   return c;
               }));
           }
           db.close();
       });
   });
});


//POST create a budget
app.post(BASE_API_PATH_LAWS, (req,res)=>{
    console.log("post");
    var myquery = { section : req.body.section};
    if(req.body.id || isNaN(req.body.community) || isNaN(req.body.year) || isNaN(req.body.section) || isNaN(req.body.budgetofapital) || isNaN(req.body.total)){
        res.sendStatus(400);
        console.log("Bad request");
    }
    else{
        var newValues = {
            community: req.body.community,
            year: Number(req.body.year),
            section: req.body.section,
            budgetofapital: Number(req.body.budgetofapital),
            total: Number(req.body.total)
        };
        MongoClient.connect(mdbBudgetsLawsURL, function(err, db) {
            if(err) throw err;
            var dba = db.db("sos1718-aom-sandbox");
            dba.collection("budgetsLaws").count(myquery, function(err, count){
                if(!err && !count){
                    dba.collection("budgetsLaws").insertOne(newValues, function(err, result){
                        if(err) throw err;
                        console.log("1 document inserted");
                        res.sendStatus(201);
                        db.close();
                    });
                }
                else{
                    res.sendStatus(409);
                    console.log("Conflict");
                }
                db.close();
            });
        });
    }
});

//PUT actualizacion
app.put(BASE_API_PATH_LAWS + "/:section", (req,res)=>{
    console.log("PUT");
    console.log(req.params);
    console.log(req.body);
    if(req.body.id != undefined || req.body.section != req.params.section || !isNaN(req.body.section) || isNaN(req.body.community) || isNaN(req.body.year) || isNaN(req.body.budgetofapital) || isNaN(req.body.total)){
        res.sendStatus(400);
        console.log("Bad request");
    }
    else{
        MongoClient.connect(mdbBudgetsLawsURL, function(err, db) {
            if(err) throw err;
            var dba = db.db("sos1718-aom-sandbox");
            var myquery = { section: req.params.section};
            var newValues = { 
                $set: {
                    community: req.body.community,
                    year: Number(req.body.year),
                    section: req.body.section,
                    budgetofapital: Number(req.body.budgetofapital),
                    total: Number(req.body.total)
                }
            };
            dba.collection("budgetsLaws").count(myquery, function(err, count){
                if(!err && count){
                    dba.collection("budgetsLaws").updateOne(myquery, newValues, function(err, result){
                        if(err) throw err;
                        console.log("1 budget law updated");
                        res.sendStatus(200);
                        db.close();
                    });
                }
                else{
                    console.log("Not found");
                    res.sendStatus(404);
                }
                db.close();
            });
        });
    }
});

app.delete(BASE_API_PATH_LAWS, (req,res)=>{
    MongoClient.connect(mdbBudgetsLawsURL, function(err, db) {
        console.log("Delete all");
        if(err) throw err;
        var dba = db.db("sos1718-aom-sandbox");
        dba.collection("budgetsLaws").count(function(err, count){
            if(!err & count){
                dba.collection("budgetsLaws").deleteMany(function(err ,obj){
                    if(err) throw err;
                    console.log(count + "registers deleted");
                    res.send(count + "registers deleted");
                    db.close();
                });
            }
            else{
                console.log("Not found");
                res.send("Nothing for delete");
            }
            db.close();
        });
    });
});

//DELETE section
app.delete(BASE_API_PATH_LAWS + "/:section", (req,res)=>{
        console.log("Delete section");
        var myquery = { section: req.params.section};
        MongoClient.connect(mdbBudgetsLawsURL,function(err, db) {
            if(err) throw err;
            var dba = db.db("sos1718-aom-sandbox");
            dba.collection("budgetsLaws").count(function(err,count){
                if(!err && count){
                    dba.collection("budgetsLaws").deleteMany(myquery, function(err,obj){
                        if(err) throw err;
                        console.log("OK");
                        res.sendStatus(200);
                        db.close();
                    });
                }
                else{
                    console.log("Not found");
                    res.sendStatus(404);
                }
                db.close();
            });
        });
    });
};






















































