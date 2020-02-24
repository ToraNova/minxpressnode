#!/usr/bin/mongo
/*
 * This is a javscript which prints out all users on a specific database
 * useful for administrative work
 *
 * to launch the script, do:
 * mongoscript.sh listusers.js
 *
 */

const dbname = "admin"
//const dbname = "minxpressnode"

db = db.getSiblingDB( dbname )

//print the users of the db "dbname"
printjson(db.getUsers())
