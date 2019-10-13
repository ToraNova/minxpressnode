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


//test insert
try {
	dbconn.users.insert({"email":"xyzabc@testmail.com","name":"testinsert","password":"$2b$08$y7LXaB8KSeeJ4yoolDF2ge/ouzRdt2twLj6Id9ELPAPJllLzW4wsS"})
} catch (e){
	print(e)
}
