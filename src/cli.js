#!/usr/bin/env node
'use strict';
const meow = require('meow');
const clipboardy = require('clipboardy');
const config = require('./config');
const template = require('./template');
const replace = require('./replace');
const send = require('./send');
const prompt = require('./prompt');

const cli = meow(`
	Usage
		standup-boy [--path | -p | --project projectName]

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

	Options
			--path -p Get the path to the configuration file (read-only).
			--project Specify the name of the project you want to send the message to.
`, {
	inferType: true,
	flags: {
		path: {
			type: 'boolean',
			alias: 'p'
		},
		project: {
			type: 'string'
		}
	}
}
);

if (cli.flags.path) {
	console.log(config.path);
	process.exit(0);
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

	if ((config.has('username') &&
		config.has('channel') &&
		config.has('url')) ||
		config.has('projects')) {
		send(res, cli.flags.project);
	}
}

prompt.initialQuestions().then(
	answers => processAnswers(answers)
);
