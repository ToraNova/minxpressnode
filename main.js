/* Main server runfile
 * ToraNova Minimalist ExpressJS Bootstrapper
 * 2019 Oct 05
 */
var portnum = 8000;

//requires the express and pug (JADE) module
var express = require("express");
var pug = require('pug'); //TODO please fix this issue
var app = express();

//static vars
//views are kept under /views/
const path = __dirname + '/views/';

//router routing
var router = express.Router(); //router route

//Router defines
router.use(function (req,res,next){
	console.log("/" + req.method);
	next(); //execute the router
});

//For all GET routes
router.get("/",function(req,res){
	res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
	res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
	res.sendFile(path + "contact.html");
});

router.get("/login",function(req,res){
	res.sendFile(path + "login.html");
});

//For all POST routes
//router.post("/login",blabla);

app.use("/", router);

//declare the static directory
app.use(express.static("static"))

//handle undefined routes
//this route declare must be on the last line
app.use("*",function(req,res){
	res.sendFile(path + "404.html");
});

//specify listening port
app.listen(portnum,function(){
	console.log("Listening on port "+portnum);
});
