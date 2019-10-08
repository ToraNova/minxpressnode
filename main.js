/* Main server runfile
 * ToraNova Minimalist ExpressJS Bootstrapper
 * 2019 Oct 05
 */
var portnum = 8000;

//requires the express and pug (JADE) module
var express = require("express");
var app = express();

//setup the webapp to use ejs templating engine
app.set('view engine', 'ejs')

//static vars
//views are kept under /views/
const vpath = __dirname + '/views/';
const layout = __dirname + '/templates/bootstrap.ejs';

//router routing
var router = express.Router(); //router route

//Router defines
router.use(function (req,res,next){
	console.log("/" + req.method);
	next(); //execute the router
});

//For all GET routes
router.get("/",function(req,res){
	res.render( layout,
		{nav : vpath + "nav.html",
		view : vpath + "index.html"}
	);
});

router.get("/about",function(req,res){
	res.render( layout,
		{nav : vpath + "nav.html",
		view : vpath + "about.html"}
	);
});

router.get("/contact",function(req,res){
	res.render( layout,
		{nav : vpath + "nav.html",
		view : vpath + "contact.html"}
	);
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
	res.render( layout,
		{nav : vpath + "nav.html",
		view : vpath + "404.html"}
	);
});

//specify listening port
app.listen(portnum,function(){
	console.log("Listening on port "+portnum);
});
