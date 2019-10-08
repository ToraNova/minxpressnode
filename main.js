/* Main server runfile
 * ToraNova Minimalist ExpressJS Bootstrapper
 * 2019 Oct 05
 */

module.exports = () => {

	//obtain port number
	const port = process.env.PORT

	//the main express application
	const express = require("express")
	const app = express();

	//setup the webapp to use ejs templating engine
	app.set("view engine", "ejs")

	//declares the use of database.js
	require("./database.js")

	//obtain the routers
	const urouter = require("./routers/user.js")
	const brouter = require("./routers/base.js")

	app.use(express.json())

	//user routes are added unto the /user url base
	app.use("/user", urouter )

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
