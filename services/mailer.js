/*
 * Mailing Service
 * Uses mailgun to send mails
 */

const mailgun = require("mailgun")

class Mailer {
	constructor() {}

	public async SendWelcomeEmail(email){
		const data = {
		from: "MinXPRESSNode Admin",
		to: email,
		subject: "Welcome !",
		text: "Thanks for sign up",
		};
		return mailgun.messages().send(data);
	}
}

module.exports = Mailer
