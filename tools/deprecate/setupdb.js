#!/usr/bin/mongo

/*
 * This is a javscript which setups the mongodb connection
 * and creates and adds the administrator for the minxpressnode
 * project
 *
 * to launch the script, do:
 * mongo setupdb.js
 *
 */

//connects to the local mongodb instance
//PLEASE change this based on where the mongo is
const dbconn = connect('localhost:27017/minxpressnode');

const app_admin = {
	user: "mxn-admin",
	pwd: passwordPrompt(), //you could also use cleartext, but please don't
	customData: { project: "mxn" },
	roles: [
	{ role: "readWrite", db: "minxpressnode" }
	],
	mechanisms: [ "SCRAM-SHA-256" ],
	passwordDigestor: "server"
};

try {
	dbconn.createUser( app_admin );
} catch (e){
	print(e)
	//or printjson(e)
}
