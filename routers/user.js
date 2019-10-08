/*
 * Routes used for user control and events
 * all urls are prefixed with /user (defined under main.js)
 */

//router module to be used
const express = require("express")
const router = express.Router()

//require the user schema
const User = require("../schemas/user.js")
const auth = require("../middlewares/auth.js")

// Create a new user
router.post('/add', async (req, res) => {
	try {
		const user = new User(req.body)
		await user.save()
		const token = await user.generateAuthToken()
		res.status(201).send({ user, token })
	} catch (error) {
		res.status(400).send(error)
	}
})

//Login a registered user
router.post("/login", async(req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findByCredentials(email, password)
		if (!user) {
			return res.status(401).send({error: "Login failed! Check authentication credentials"})
		}
		const token = await user.generateAuthToken()
		console.log(req.body)
		res.send({ user, token })
	} catch (error) {
		console.log(error);
		res.status(400).send(error)
	}
})

// Log user out of the application
router.post("/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token != req.token
		})
		await req.user.save()
		res.send()
	} catch (error) {
		res.status(500).send(error)
	}
})

// Log user out of all devices
router.post("/logout/all", auth, async(req, res) => {
	try {
		req.user.tokens.splice(0, req.user.tokens.length)
		await req.user.save()
		res.send()
	} catch (error) {
		res.status(500).send(error)
	}
})

//export the routes
module.exports = router
