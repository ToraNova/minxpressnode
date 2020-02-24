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

var collections = db.getCollectionNames();
for(var i = 0; i< collections.length; i++){
	// print the name of each collection
	print('Collection: ' + collections[i]);
	//and then print the json of each of its elements
	db.getCollection(collections[i]).find().forEach(printjson);
}
