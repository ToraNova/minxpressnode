//Main server runfile
var portnum = 3000;

//requires the express module
var express = require("express");
var app = express();
var router = express.Router();

//views are kept under /views/
var path = __dirname + '/views/';

//Router defines
router.use(function (req,res,next){
	console.log("/" + req.method);
	next(); //execute the router
});

router.get("/",function(req,res){
	res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
	res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
	res.sendFile(path + "contact.html");
});

//Webapp defines
app.use("/",router);

app.use("*",function(req,res){
	res.sendFile(path + "404.html");
});

app.listen(portnum,function(){
	console.log("Listening on port "+portnum);
});
