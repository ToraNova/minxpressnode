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

//the dbname to insert onto a collection
const dbname = "minxpressnode"

db = db.getSiblingDB( dbname )

//test insert onto the "users" collection
try {
	db.users.insert({"email":"xyzabc@testmail.com","name":"testinsert","password":"$2b$08$y7LXaB8KSeeJ4yoolDF2ge/ouzRdt2twLj6Id9ELPAPJllLzW4wsS"})
} catch (e){
	print(e)
}
