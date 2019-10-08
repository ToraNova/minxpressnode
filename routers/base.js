/*
 * Routes for bases (index/login/home)
 * all urls are pure (no prefixing)
 * PLEASE DO NOT prefix any of the reserved routes
 * check up main.js before prefixing
 */

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
	res.send("ToraNova 2019");
})

router.get("/profile", auth ,function(req,res){
	res.send(req.user);
})

//export the routes
module.exports = router
