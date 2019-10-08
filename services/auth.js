/* The auth service module is used for authentication
 * currently supports signup and logins
 * Reference:
 * https://softwareontheroad.com/nodejs-jwt-authentication-oauth/#signup
 * Edited by ToraNova 2019 Oct 08
 */

//argon2 library used for hasing and verification
var argon2 = require("argon2")

//requires the user schema
var User = require("../schemas/user.js")

class AuthService {

	//Signup method
	public async SignUp(email, username, password): Promise<any> {
		const passwordHashed = await argon2.hash(password);
		const userRecord = await User.create({
			password: passwordHashed,
			email: email,
			username: username,
		});

		//emit for other listeners to handle
		this.eventEmitter.emit('user_signup', { user: userRecord })

		return {
			//Password is never returned
			user: {
			email: userRecord.email,
			username: userRecord.username,
			},
		}
	}

	//Login method
	public async Login(username, password): Promise<any> {
		const userRecord = await User.findOne({ username });
		if (!userRecord) {
			throw new Error("User not found")
		} else {
			const correctPassword = await argon2.verify(userRecord.password, password);
			if (!correctPassword) {
				throw new Error("Incorrect password")
			}
		}

		//emit for other listeners to handle
		this.eventEmitter.emit('user_login', { user: userRecord })

		return {
			user: {
			email: userRecord.email,
			username: userRecord.username,
			},
			token: this.generateJWT(userRecord),
		}
	}

	//JWT generation (Javascript web token for user auth)
	private generateJWT(user) {
		const data =  {
			_id: user._id,
			username: user.username,
			email: user.email
		};
		const signature = 'secret';
		const expiration = '1h';
		return jwt.sign({ data, }, signature, { expiresIn: expiration });
	}
}

//export for use
module.exports = AuthService;
