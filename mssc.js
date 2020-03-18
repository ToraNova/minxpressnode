/* Main MQTT server side client
 * MSSC.js
 * This is started in cluster. if not using cluster, one
 * may start manually
 * ToraNova Minimalist ExpressJS Bootstrapper
 * 2020 Mar 19
 */

const logger = require('./services/logger.js')
logger.defaultMeta = { label:"MSSC" }
const mqtt = require('mqtt');

module.exports = () => {


	var conn_opt = { clientId : 'mqtt-serverside-0',
			 clean : true,
			 keepalive : 60 }

	if (process.env.MSSC_LOGIN === 'true' || process.env.MSSC_LOGIN === '1') {
		//login mode
		logger.info(`Login Mode: ${process.env.MSSC_USER}`)
		conn_opt['username'] = process.env.MSSC_USER
		conn_opt['password'] = process.env.MSSC_PW
	}else{
		logger.info('Anon Mode')
	}

	//connect
	var client = mqtt.connect(`mqtt://${process.env.MSSC_HOST}:${process.env.MSSC_PORT}`,conn_opt)

	//callbacks
	client.on('connect', function (connack) {
		logger.info(`MSSC Connected to broker connack.rc:${connack.returnCode}`)
	})
	client.on('error',function(error) {
		logger.info(`MSSC ${error}`)
	})
}
