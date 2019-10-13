/*
 * Starter for agendajs to begin the schedulers
 */

//import the emails/welcome job
const SendWelcome = require("./emails/welcome.js")
//logger imports
const logger = require("../services/logger.js")
logger.defaultMeta = {label: "Agendajs"}

module.exports = ({ agendajs }) => {

	//define a job "send-welcome-email"
	// reference to the handler, but not executing it!
	agendajs.define('send-welcome-email',
		{ priority: 'high', concurrency: 10 },
		new SendWelcomeEmail().handler,
	)

	//begin the job scheduler
	logger.verbose("Starting Agendajs")
	agendajs.start();
}
