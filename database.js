/*
 * This is the database controller file
 * we use mongoose for minxpressnode
 * user:admin pass:test123 on the database
 * minxpressnode
 * MONGODB_URL
 * mongodb+srv://admin:test123@localhost/minxpressnode?retryWrites=true&w=majority
 */

/* !NOTICE
 * PLEASE do require(<thisfile>) in the js file where we define the APP or EXPRESS object
 */

const logger = require("./services/logger.js")
const mongoose = require("mongoose")

//attempt to connect
try {
	mongoose.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	logger.verbose({label:"Database", message:"connect/OK"})
} catch (e) {
	logger.error({label:"Database", message:"connect/"+e})
}

//listen for error emits
mongoose.connection.on("error", e => {
	logger.error({label:"Database", message:"subscribe/"+e})
});
