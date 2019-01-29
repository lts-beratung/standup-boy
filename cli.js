#!/usr/bin/env node
'use strict';
const meow = require('meow');
const clipboardy = require('clipboardy');
const config = require('./config.js');
const template = require('./template.js');
const replace = require('./replace.js');
const send = require('./send.js');
const prompt = require('./prompt.js');

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

	if (config.has('username') &&
		config.has('channel') &&
		config.has('url')) {
		send(res, cli.flags.project);
	}
}

prompt.initialQuestions().then(
	answers => processAnswers(answers)
);
