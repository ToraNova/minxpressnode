/*
 * Routes for wildcards *
 * usually for error handling (404)
 */

//404 handler for expressJS
function handle404(req, res, next){
	console.log(`Unrouted Request ${req.method} from ${req.ip} on ${req.originalUrl}`);
	res.status(404);

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
