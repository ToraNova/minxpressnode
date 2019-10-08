/*
 * Routes for wildcards *
 * usually for error handling (404)
 */

//static values import from constants.js
const cst = require("../constant.js")

//404 handler for expressJS
function handle404(req, res, next){
	console.log(`Unrouted Request ${req.method} from ${req.ip} on ${req.originalUrl}`);
	res.status(404);

	// respond with html page
	if (req.accepts("html")) {
		res.render( cst.layout,
			{nav : cst.nav,
			view : cst.vpath + "404.html"}
		)
		return;
	}

	// respond with json
	if (req.accepts("json")) {
		res.send({ code: 404, error: "Not found" });
		return;
	}

	// default to plain-text. send()
	res.type("txt").send("Not found");
}

//export the handler
module.exports = handle404
