/*
 * Sends a welcome mail for new registers
 * this job is scheduled by agenda.js
 */

const MailerService = require("../../services/mailer.js")

class SendWelcomeEmail {

	public async handler (job, done): Promise<any> {
		const { email } = job.attrs.data
		const mailerServiceInstance = new MailerService()
		await mailerServiceInstance.SendWelcomeEmail(email)
		done()
	}
}

//exports
module.exports = SendWelcomeEmail
