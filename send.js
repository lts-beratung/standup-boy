'use strict';
const got = require('got');
const config = require('./config.js');

module.exports = async text => {
	const username = config.get('username');
	const channel = config.get('channel');
	const url = config.get('url');

	const options = {
		method: 'POST',
		body: JSON.stringify({
			username,
			channel,
			text
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		await got(url, options);
		console.log('Message sent successfully');
	} catch (error) {
		console.log('Failed to send the message:');
		console.log(error.response.body);
	}
};
