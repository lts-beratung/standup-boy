'use strict';
const got = require('got');
const config = require('./config.js');
const prompt = require('./prompt.js');

module.exports = async (text, projectName) => {
	const answer = await prompt.sendQuestion();
	if (!answer.send) {
		return;
	}

	let username;
	let channel;
	let url;

	const projects = config.get('projects');
	if (projects) {
		if (!projectName) {
			const answer =
				await prompt.sendDestinationQuestions(projects);
			projectName = answer.project;
		}

		const project = projects[projectName];
		({username, channel, url} = project);
	} else {
		username = config.get('username');
		channel = config.get('channel');
		url = config.get('url');
	}

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
