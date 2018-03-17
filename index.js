var express = require("express");
var port = (process.env.PORT || 1607); //proces objeto definido para acceded a la variable de entorno PORT
var server = express();

server.use("",express.static("/home/ubuntu/workspace/SOS1718-06-sandbox/public"));

server.listen(port,()=>{
    console.log("server readyon porto "+port+"!!!!!"); //cuando se va iniciar de verdad el listen
}).on("error",(error)=>{
    console.log("server NOT readyon porto "+error); 
});

console.log("server setting up lul");