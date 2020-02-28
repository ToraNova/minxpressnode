#!/usr/bin/mongo
/*
 * This is a javscript which prints out all collections on a db
 * useful for administrative work
 *
 * to launch the script, do:
 * mongoscript.sh coll.js
 *
 */

const dbname = "minxpressnode"

db = db.getSiblingDB( dbname )

//db.users.remove( { email: "test@gmail.com" } ) //remove all users with this email
db.users.remove( { email: "xyzabc@testmail.com" }, true ) //remove ONE user with this email
//db.users.remove( {} ) //remove all documents inside the 'user' collection
