/*
 * This is the database controller file
 * we use mongoose for minxpressnode
 * user:admin pass:test123 on the database
 * minxpressnode
 * MONGODB_URL
 * mongodb+srv://admin:test123@localhost/minxpressnode?retryWrites=true&w=majority
 */
const mongoose = require("mongoose")

//attempt to connect
try {
	mongoose.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})

} catch (error) {
	console.log("MongoDB connection failed.")
	console.log(error)
}

//listen for error emits
mongoose.connection.on("error", error => {
	console.log(error)
});
