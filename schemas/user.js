/*
 * Schema for users of the web application
 * using NoSQL MongoDB
 *
 * Reference:
 * https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
 * https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
 *
 * Edited by github/ToraNova 2019
 */

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//logger imports NOT USED FOR NOW
//const logger = require("../services/logger.js")
//logger.defaultMeta = { label:"User" }

//custom include of secret jwt key
const jwtkey = require(process.env.JWT_KEYFILE)

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: value => {
			if (!validator.isEmail(value)) {
				throw new Error('Invalid email address')
			}
		}
	},
	password: {
		type: String,
		required: true,
		minLength: 7,
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
})

// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
	const user = this
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8)
	}
	next()
})

// Perhaps we can do something after saving ?
userSchema.post('save', function(doc) {
	//doc is the saved document (?)
});

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function( expiryTime ) {
	const user = this

	//default fallback to 1hour
	if (!expiryTime) {
		expiryTime = 3600
	}

	const token = jwt.sign({ _id: user._id }, jwtkey.secret,
		{
		algorithm: 'HS256',
		expiresIn: expiryTime
		}
	)

	//append to valid tokens
	user.tokens = user.tokens.concat({token})
	await user.save()
	return token
}

// Search for a user by email and password.
// This throws error if input is invalid or if user don't exist or password is wrong
userSchema.statics.findAndValidateUser = async (email, password) => {
	//SANITIZATION
	//TODO: other sanitization works
	if(!email){
		throw new Error("Sanitization reject")
	}

	//SEARCH COLLECTIONS
	const user = await User.findOne({email} )
	if (!user) {
		throw new Error("Invalid user")
	}

	//PASSWORD CHECK
	const isPasswordMatch = await bcrypt.compare(password, user.password)
	if (!isPasswordMatch) {
		throw new Error("Invalid password")
	}
	return user
}

//construct the model
const User = mongoose.model("User", userSchema)

//export the schema
module.exports = User
