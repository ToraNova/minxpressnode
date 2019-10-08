/*
 * Middleware to check if a request is authenticated
 */

//requires the jwt module
const jwt = require("jsonwebtoken")
const User = require("../schemas/user.js")

//this middleware is used to check if a request is authorized before
//reaching the server
const auth = async(req, res, next) => {
	const token = req.header("Authorization").replace("Bearer ", '')
	const data = jwt.verify(token, process.env.JWT_KEY)
	try {
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
