/*
 * Routes for bases (index/login/home)
 * all urls are pure (no prefixing)
 * PLEASE DO NOT prefix any of the reserved routes
 * check up main.js before prefixing
 */

//static values import from constants.js
const cst = require("../constant.js")

//router module to be used
const express = require("express")
const router = express.Router()

const auth = require("../middlewares/auth.js")

//Router defines
router.use(function (req,res,next){
	//console.log("/" + req.method)
	next() //execute the router
})

//For all GET routes
router.get("/", function(req,res){
	res.render( cst.layout,
		{nav : cst.nav,
		view : cst.vpath + "index.html"}
	)
})

router.get("/about",function(req,res){
	res.render( cst.layout,
		{nav : cst.nav,
		view : cst.vpath + "about.html"}
	)
})

router.get("/contact",function(req,res){
	res.render( cst.layout,
		{nav : cst.nav,
		view : cst.vpath + "contact.html"}
	)
})

router.get("/profile", auth ,function(req,res){
	res.send( req.user );
})

router.get("/login",function(req,res){
	res.sendFile(cst.vpath + "login.html");
})

//export the routes
module.exports = router
