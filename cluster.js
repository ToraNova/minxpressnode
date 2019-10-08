/*
 * Using clusters for the application
 * imports the main.js application and forks
 * it. the maximum number of forks is defined
 * under .env
 */

const cluster = require('cluster');
const os = require('os');
const run = require('./main.js');

// Check if current process is master.
if (cluster.isMaster) {

	try{
		//require the key
		require(process.env.JWT_KEYFILE)
		//manipulate the env file to make sure
		//modules in subdirs can access the file as well
		resolve = require('path').resolve
		kfp = resolve(process.env.JWT_KEYFILE)
		console.log("Keyfile : " + kfp)
		process.env.JWT_KEYFILE = kfp
	}catch (error){
		console.log(error)
		console.log("JWT Key not initialized, please run \'node genkey.js\'.")
		process.exit(1)
	}

	// Get total CPU cores.
	const cpuCount = os.cpus().length;

	// Spawn a worker for every core.
	for (let j = 0; j < cpuCount && j < process.env.MAX_THREADS; j++) {
		cluster.fork();
		console.log(`Worker thread ${j} started.`)
	}

} else {
	// This is not the master process, so we spawn the express server.
	run();
}

// Cluster API has a variety of events.
// Here we are creating a new process if a worker die.
cluster.on('exit', function (worker) {
	console.log(`Worker ${worker.id} died, starting a new one...'`);
	cluster.fork();
});
