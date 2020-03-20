//tokendel.js , or logout/all
const axios = require('axios').default;

axios.post('http://localhost:1996/user/login', {
	email: 'user@testmail.com',
	password: 'test123',
}).then(response => {
	// Handle success.
	console.log('User token', response.data.token);

	// Request API.
	axios.post('http://localhost:1996/user/logout/all',
	{
		//empty data
	},
	{
		headers: {
			Authorization: `Bearer ${response.data.token}`,
		},
	}).then(response => {
		// Handle success.
		console.log('Data: ', response.data);
	}).catch(error => {
		// Handle error.
		console.log('An error occurred:', error);
	});

}).catch(error => {
	// Handle error.
	console.log('An error occurred:', error);
});



