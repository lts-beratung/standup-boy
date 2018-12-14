#!/usr/bin/env node
'use strict';
const meow = require('meow');
const inquirer = require('inquirer');
const clipboardy = require('clipboardy');

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
`);

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

inquirer.prompt(questions).then(answers => {
	const res =
		`
:triumph: **\`What did I accomplish yesterday\`**
${answers.yesterday}
:scream_cat: **\`What will I do today\`**
${answers.today}
:cry: **\`What obstacles are impeding my progress? Any info I need or want to share?\`**
${answers.obstacles}
	`;
	console.log(res);
	clipboardy.writeSync(res);
	console.log('Copied the result to the clipboard!');
});
