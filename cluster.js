/*
 * Using clusters for the application
 * imports the main.js application and forks
 * it. the maximum number of forks is defined
 * under .env
 */

const logger = require('./services/logger.js')
const cluster = require('cluster');
const os = require('os');
const run = require('./main.js');

//this is used to track the number of termination
var failcount = 0

// Check if current process is master.
if (cluster.isMaster) {
	logger.verbose({label:'Server',message:`Server Running in ${process.env.NODE_ENV}`})
	//display port number the server is running on
	logger.info({label:'Cluster',message:`Starting NodeJS Cluster on port ${process.env.PORT}`})
	//output logger information
	logger.debug({
		label:'Logger',
		message:
`Level=${process.env.LOG_LEVEL} \
Color=${process.env.LOG_COLOR} \
Console=${process.env.LOG_CONSOLE}`
	})


	try{
		//require the key
		require(process.env.JWT_KEYFILE)
		//manipulate the env file to make sure
		//modules in subdirs can access the file as well
		resolve = require('path').resolve
		kfp = resolve(process.env.JWT_KEYFILE)
		logger.info({label:'JWT', message:`Keyfile@${kfp}`})
		process.env.JWT_KEYFILE = kfp
	}catch (error){
		logger.error({label:'JWT', message:error})
		logger.error({label:'JWT',
			message:'JWT Key not initialized, please run \'node tools/genkey.js\''})
		process.exit(1)
	}

	// Get total CPU cores.
	const cpuCount = os.cpus().length;

	// Spawn a worker for every core.
	for (let j = 0; j < cpuCount && j < process.env.MAX_THREADS; j++) {
		cluster.fork();
		logger.verbose({label:'Cluster',message:`Worker thread ${j} started`})
	}

	// runs the MSSC (MQTT server side client)
	if( process.env.MSSC_ENABLE == 'true' || process.env.MSSC_ENABLE == '1' ){
		const mssc = require('./mssc.js');
		mssc()
	}
} else {
	// This is not the master process, so we spawn the express server.
	run()
}

// Cluster API has a variety of events.
// Here we are creating a new process if a worker die.
cluster.on('exit', function (worker) {
	logger.warn({label:'Cluster',
		message:`Worker ${worker.id} died`})
	if( failcount++ < 5 ){
		//try agait
		logger.warn({label:'Cluster',
			message:`Restarting new instance`})
		cluster.fork()
	}else{
		//failed more than a hundred times
		logger.warn({label:'Cluster',
			message:`Threshold reached, aborting fork`})
	}
});

//catch all unhandled rejection and logs it
process.on('unhandledRejection', (reason, p) => {
	//log it first
	logger.error({label:'Error',
		message:`Unhandled Rejection, ${reason}`});
	console.log(reason)
	//dump exception
	// application specific logging, throwing an error, or other logic here
});
