/*
 * Middleware to check if a request is authenticated
 */

//requires the jwt module
const jwt = require("jsonwebtoken")
const User = require("../schemas/user.js")

//logger imports
const logger = require("../services/logger.js")
//do not use defaultMeta as middlewares are imported by other classes
//logger.defaultMeta = {label: "Auth"}

//custom include of secret jwt key
const jwtkey = require(process.env.JWT_KEYFILE)

//this middleware is used to check if a request is authorized before
//reaching the server
const auth = async(req, res, next) => {
	try {
		if( !req.header("Authorization") ){
			logger.debug({label:"Auth",message:`Authorization header missing`})
			return res.status(401).send({ error: "Missing auth header" })
		}
		const token = req.header("Authorization").replace("Bearer ", '')
		//logger.debug({label:"Auth",message:"token:"+token})
		const data = jwt.verify(token, jwtkey.secret)
		const user = await User.findOne({ _id: data._id, "tokens.token": token })
		if (!user) {
			//throw this so its catched by the outer catch
			logger.debug({label:"Auth",message:`User-token pair not found`})
			return res.status(401).send({ error: "User-token pair not found" })
		}
		req.user = user
		req.token = token
		next()
	} catch (e) {
		logger.debug({label:"Auth",message:`parse-verify/${e}`})
		res.status(401).send({ e: "Not authorized to access this resource" })
	}
}

//export the middleware
module.exports = auth
