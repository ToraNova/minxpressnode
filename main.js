/* Main server runfile
 * ToraNova Minimalist ExpressJS Bootstrapper
 * 2019 Oct 05
 */

module.exports = () => {

	//obtain port number
	const port = process.env.PORT

	//the main express application (using cross origin requests)
	const express = require("express")
	const cors = require("cors")
	const app = express();

	//whitelisted domains to allow for
	var whitelist = ['http://localhost:3000']
	var corsOptions = {
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		}
	}

	//declares the use of database.js
	//THIS MUST BE IN THE MAIN FUNCTION
	require("./database.js")

	//setup the webapp to use ejs templating engine
	app.set("view engine", "ejs")

	//obtain the routers
	const urouter = require("./routers/user.js")
	const frouter = require("./routers/file.js")
	const brouter = require("./routers/base.js")

	app.use(express.json())

	//user routes are added unto the /user url base
	app.use("/user", cors() ) //allow cross origin for /user/*
	app.use("/user", urouter )

	//file routes are added unto the /file base
	app.use("/file", frouter )

	//base routes
	app.use("/", brouter )

	//declare the static directory
	app.use(express.static("static"))

	//handle undefined routes
	//this route declare must be on the last line
	const handle404 = require("./routers/404.js")
	app.use(handle404)

	app.listen(port)
}
