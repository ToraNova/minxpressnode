/*
 * Routes used for user control and events
 * all urls are prefixed with /user (defined under main.js)
 */

//router module to be used
const express = require("express")
const router = express.Router()

//logger imports
const logger = require("../services/logger.js")
logger.defaultMeta = { label:"User" }

//require the user schema
const User = require("../schemas/user.js")
const auth = require("../middlewares/auth.js")

//scheduler TODO: fix the scheduler
//const agendajs = require("../jobs/agenda.js")

// Create a new user
router.post('/add', async (req, res) => {
	const user = new User(req.body)
	logger.debug(`User Add Request ${user.name}:${user.email}`)
	try{
		await user.save()
	} catch (e){
		//database error (can't save)
		//most probably a bad request
		logger.info("Add/",e)
		return res.status(400).send({error: "Registration failed"})
	}

	user.generateAuthToken()
	.then( (token) => {
		//send welcome mail to user in 2 minutes
		//agendajs.schedule('in 2 minutes', 'send-welcome-email', { email: user.email },);
		logger.info(`New User Registered ${user.email}:${user.name}`)
		return res.status(201).send({ user, token })
	}).catch( e=> {
		//error with token generation
		logger.error("TokenGen/",e)
		//server error
		return res.status(500).send({error: "TokenGen failed"})
	})
})

//Login a registered user via email
//edited to use promise error handling (2019 Oct 13)
router.post("/login", async(req, res) => {

	//FIND THE USER IN THE DATABASE FIRST, AND VALIDATE CREDENTIALS
	//failing to execute here should send a 401
	var user = undefined
	try{
		const { email, password } = req.body
		//the following will throw error if
		// email is null, user is invalid, password is invalid
		// it ONLY returns valid user
		user = await User.findAndValidateUser(email, password)
	}catch (e){
		//either bad request (no body) or invalid credentials
		//TODO: log brute force attempts and ipban ?
		logger.debug("UserValid/",e)
		logger.info(`Failed login attempt from ${req.body.email} ${req.ip}`)
		return res.status(401).send({error: "Invalid authentication credentials"})
	}

	//by here, user is valid. if we fail here most likely server fault
	try{
		const token = await user.generateAuthToken()
		logger.info(`Successful login attempt from ${user.name}`)
		//return 201 (created user token and session)
		return res.status(201).send({ user, token})
	}catch (e){
		//token gen error or other unknown causes
		//error with token generation
		logger.error("TokenGen/",e)
		//server error
		return res.status(500).send({error: "TokenGen failed"})
	}
})

//Obtain profile of a user
router.get("/profile", auth, async(req, res) => {
	res.send(req.user);
})

// Log user out of the application
router.post("/logout", auth, async (req, res) => {
	try {
		//remove one token
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token != req.token
		})
		//log and send
		logger.info(`Logging ${req.user.name} out of device`)
		await req.user.save()
		//logger.silly("success")
		res.send({res: "success"})
	} catch (e) {
		logger.error("Logout/",e)
		res.status(500).send(e)
	}
})

// Log user out of all devices
router.post("/logout/all", auth, async(req, res) => {
	try {
		//remove all tokens
		req.user.tokens.splice(0, req.user.tokens.length)
		//log and send
		logger.info(`Logging ${req.user.name} out of system`)
		await req.user.save()
		//logger.silly("success")
		res.send({res: "success"})
	} catch (e) {
		logger.error("Logoutall/",e)
		res.status(500).send(e)
	}
})

//Delete the user
router.get("/del", auth, async(req, res) => {
	try {
		//Delete the user
		logger.info(`${req.user.name} deleted from system`)
		await req.user.remove()
		//send 204 to indicate success (no content)
		res.status(204).send()
	} catch (e) {
		logger.error("Del/",e)
		res.status(500).send(e)
	}
})

//export the routes
module.exports = router
//clear the meta
logger.defaultMeta = undefined;
