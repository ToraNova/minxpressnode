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
const fs = require("fs")

//attempt to connect
try {

	var url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
	if(process.env.MONGO_TLS == 'true' || process.env.MONGO_TLS == '1' ) {
		const newuri = url + `&ssl=true\
&tlsCAFile=${process.env.MONGO_TLS_CAFILE}\
&tlsAllowInvalidCertificates=${process.env.MONGO_TLS_ALLOWINVALID}`
		//console.log(newuri) //debugging use only
		mongoose.connect(newuri,
		{	auth: { user:process.env.MONGO_USER,
			password:process.env.MONGO_PW },
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		})
	}else{
		logger.warn({label:"Database", message:"Unencrypted connection to mongodb server"})
		mongoose.connect(url,
		{	auth: { user:process.env.MONGO_USER,
			password:process.env.MONGO_PW },
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		})
	}
} catch (e) {
	logger.error({label:"Database", message:"connect/"+e})
}

//listen for error emits
mongoose.connection.on("error", e => {
	logger.error({label:"Database", message:"subscribe/"+e})
});
