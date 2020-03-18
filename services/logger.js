/*
 * Logging Service
 * uses winston npm module
 * for logging throughout the backend app
 * this module can be imported via
 * const logger = require('services/logger.js')
 */

//requires modules
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf, colorize, json } = format

//rotating file handler (to manage space when logfiles get larger)
const DailyRotateFile = require('winston-daily-rotate-file')

//to use HOUR based logging, ensure the HH meta chars are in the date pattern
//datePattern: `YYYY-MM-DD-HH`
//else just use YYYY-MM-DD without the HH (this forces rotation everyday)
//remove the maxFiles to disable file removal (maxFiles remove files after ##days)
const rotfile = new (DailyRotateFile)({
	filename: 'json-%DATE%.log',
	dirname: './logs',
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '40m',
	maxFiles: '360d'
});

rotfile.on('rotate', function(oldFilename, newFilename) {
	//TODO: perhaps some function here to alert the admin on file rotation?
});

//custom defined format
const format0 = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});
//alternatively one may use
//winston.format.json()
//winston.format.simple()
//`${info.level}: ${info.message} JSON.stringify({ ...rest }) `

//define a basic logger for info logging
//if in development, logger logs to console with format0
const logger = createLogger({
	level: process.env.LOG_LEVEL,
	format: json(),
	transports: [
	//
	// - Write to all logs to the rotfile rotating file handler
	// - Write all logs error (and above) to `error.log`.
	//
	rotfile,
	new transports.File({ filename: 'error.log', level: 'error' })
	],
	exitOnError: false
});
//TODO when using logger,
// this allows the easy syntax of logger.info( "some message" )
// instead of logger.info({label:"somelabel", message:"some message"})
// DO:
//logger.defaultMeta = {label: "somelabel"}
// NOTE:
// clear the meta DO THIS AT THE END OF THE FILE!
//logger.defaultMeta = undefined;

// If we're not in production then log to the `console` with the format:
// also allow is the LOG_CONSOLE flag is set (overrides the production flag)
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production' || process.env.LOG_CONSOLE ) {
	logger.add(new transports.Console({
		format: process.env.LOG_COLOR?
			combine( colorize(), timestamp(), format0 ) :
			combine( timestamp(), format0 )
	}));
}

//export the logger
module.exports = logger
