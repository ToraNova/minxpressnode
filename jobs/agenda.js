/*
 * Agenda.js is a task scheduler for nodejs
 * it is suitable for scaling nodejs applications
 * this service sets up the agendajs scheduler job
 */

//requires the agenda module
const agendajs = require("agenda")

//export the agendajs function
module.exports = (mongoConnection) => {
	const agendajs = new agendajs()

	(async () => {
		//wait for scheduler to be ready
		await agendajs._ready
		try {
			agendajs._collection.ensureIndex({
			disabled: 1,
			lockedAt: 1,
			name: 1,
			nextRunAt: 1,
			priority: -1
		}, {
			name: 'findAndLockNextJobIndex'
		})
		} catch (err) {
			console.log('Failed to create agendajs index!')
			console.log(err)
			throw err
		}
	})();

	agendajs
	.mongo(mongoConnection, 'agendajobs')
	.processEvery('5 seconds')
	.maxConcurrency(20)

	return agendajs
}
