const axios = require('axios').default;

axios.post('http://localhost:1996/user/add', {
	name: 'testuser',
	email: 'user@testmail.com',
	password: 'test123',
}).then(response => {
	// Handle success.
	console.log('User profile', response.data.user);
	console.log('User token', response.data.token);
}).catch(error => {
	// Handle error.
	console.log('An error occurred:', error);
});
