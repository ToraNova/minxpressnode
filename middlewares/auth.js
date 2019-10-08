/*
 * Middleware to check if a request is authenticated
 */

//requires the jwt module
const jwt = require("jsonwebtoken")
const User = require("../schemas/user.js")

//custom include of secret jwt key
const jwtkey = require(process.env.JWT_KEYFILE)

//this middleware is used to check if a request is authorized before
//reaching the server
const auth = async(req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", '')
		const data = jwt.verify(token, jwtkey.secret)
		const user = await User.findOne({ _id: data._id, "tokens.token": token })
		if (!user) {
			throw new Error()
		}
		req.user = user
		req.token = token
		next()
	} catch (error) {
		res.status(401).send({ error: "Not authorized to access this resource" })
	}
}

//export the middleware
module.exports = auth
