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

app.listen(port,()=>{
    console.log("Server ready on port" + port + "!");
}).on("error",(e)=>{
    console.log("Server not ready" + e);
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
