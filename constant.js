/*
 * This file controls the constants across the app
 * some of the names could be affected by environment
 * variables
 */

//static vars
//views are kept under /views/
exports.vpath = __dirname + "/views/"

//currently using bootstrap layout
exports.layout = __dirname + "/templates/bootstrap.ejs"

//shortcuts for /views/nav.html
exports.nav = exports.vpath + "nav.html"

