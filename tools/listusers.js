#!/usr/bin/mongo
/*
 * This is a javscript which prints out all users and their artefacts
 * onto stdout
 * useful for administrative work
 *
 * to launch the script, do:
 * mongo setupdb.js
 *
 */

//connects to the local mongodb instance
//PLEASE change this based on where the mongo is
const dbconn = connect('localhost:27017/minxpressnode');

var userlist = null

//set a reference to all documents in the database
userlist = dbconn.users.find();

//iterate the names collection and output each document
while (userlist.hasNext()) {
	printjson(userlist.next());
}
