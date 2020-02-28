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
db.users.update({}, {$unset: {tokens: 1}}, {multi: true}); //logout ALL users
