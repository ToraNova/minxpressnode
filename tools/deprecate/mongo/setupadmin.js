#!/usr/bin/mongo

/*
 * This is a javscript which setups the mongodb connection
 * and creates and adds the administrator for the minxpressnode
 * project
 *
 * to launch the script, do:
 * mongoscript.sh setupadmin.js
 *
 */

const username = "mxn-admin"
const dbname = "minxpressnode"
const projname = "mxn"

db = db.getSiblingDB(dbname)

const app_admin = {
	user: username,
	pwd: passwordPrompt(), //you could also use cleartext, but please don't
	customData: { project: projname },
	roles: [
	{ role: "readWrite", db: dbname }
	],
	mechanisms: [ "SCRAM-SHA-256" ],
	passwordDigestor: "server"
};

try {
	db.createUser( app_admin );
} catch (e){
	print(e)
	//or printjson(e)
}
