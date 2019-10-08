/*
 * Schema for users of the web application
 * using NoSQL MongoDB
 *
 * Reference:
 * https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
 *
 * Edited by github/ToraNova 2019
 */
var mongoose = require('mongoose');

//schema definition
var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},

	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},

	password: {
		type: String,
		required: true,
	}
});

var User = mongoose.model('User', UserSchema);

//export for use
module.exports = User;
