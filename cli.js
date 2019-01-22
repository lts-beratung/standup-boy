#!/usr/bin/env node
'use strict';
const meow = require('meow');
const inquirer = require('inquirer');
const clipboardy = require('clipboardy');
const config = require('./config.js');
const template = require('./template.js');
const replace = require('./replace.js');
const send = require('./send.js');

// eslint-disable-next-line no-unused-vars
const cli = meow(`
	Usage
		standup-boy

	Examples
		$ standup-boy
		? What did I accomplish yesterday? Something!
		? What will I do today? Something Else!
		? What obstacles are impeding my progress? Any info I need or want to share? Not much...

		:triumph: **\`What did I accomplish yesterday\`**
		Something!
		:scream_cat: **\`What will I do today\`**
		Something Else!
		:cry: **\`What obstacles are impeding my progress? Any info I need or want to share?\`**
		Not much...
		Copied the result to the clipboard!
`, {
	inferType: true,
	flags: {
		path: {
			type: 'boolean',
			alias: 'p'
		}
	}
}
);

if (cli.flags.path) {
	console.log(config.path);
	process.exit(0);
}

const questions = [
	{
		type: 'input',
		name: 'yesterday',
		message: 'What did I accomplish yesterday?'
	},
	{
		type: 'input',
		name: 'today',
		message: 'What will I do today?'
	},
	{
		type: 'input',
		name: 'obstacles',
		message: 'What obstacles are impeding my progress? Any info I need or want to share?'
	}
];

function promptForSending(res) {
	const question = [
		{
			type: 'confirm',
			name: 'send',
			message: 'Slack / Mattermost integration details found. Do you want to send the message?'
		}
	];

	inquirer.prompt(question).then(async answer => {
		if (answer.send) {
			await send(res);
		}
	});
}

function processAnswers(answers) {
	let res =
`${template.yesterday()}

${answers.yesterday}

${template.today()}

${answers.today}

${template.obstacles()}

${answers.obstacles}`;

	res = replace(res);
	console.log(res);
	clipboardy.writeSync(res);
	console.log('Copied the result to the clipboard!');

	if (config.has('username') &&
		config.has('channel') &&
		config.has('url')) {
		promptForSending(res);
	}
}

inquirer.prompt(questions).then(
	answers => processAnswers(answers)
);
