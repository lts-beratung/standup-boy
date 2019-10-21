#!/usr/bin/env node
'use strict';
const meow = require('meow');
const clipboardy = require('clipboardy');
const envPaths = require('env-paths');

const paths = envPaths('standup-boy');
const fs = require('fs-extra');
const chalk = require('chalk');
const config = require('./config');
const template = require('./template');
const replace = require('./replace');
const send = require('./send');
const prompt = require('./prompt');

const HISTORY_PATH = paths.data + '/history_v2.log';

const cli = meow(`
	Usage
		standup-boy [options]

	Options
	  --log  [--from date] Get a log of the messages sent. Specify the date from wich to retrieve te messages on with --from date
	  --path -p Get the path to the configuration file (read-only).
	  --project projectName Specify the name of the project you want to send the message to.

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

		$ standup-boy --log --from "Mon Oct 19 2019"
		Mon Oct 21 2019 21:21:09 GMT+0200 (Central European Summer Time)
		[
			"Did some cool stuff!",
			"Work on some awesome stuff!",
			"The coffee machine has run out of coffee!"
		]
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

if (cli.flags.log) {
	fs.ensureFileSync(HISTORY_PATH);
	try {
		const res = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
		// Get first day of the month
		const today = new Date();
		let date = new Date(today.getFullYear(), today.getMonth(), 1);
		if (cli.flags.from) {
			date = Date.parse(cli.flags.from);
			if (isNaN(date)) {
				throw Error("Invalid date format provided!");
			}
		}

		for (let i = 0; i < res.length; i++) {
			printLog(res[i], date);
		}
	}
	catch (error) {
		console.error(error);
		console.error("Error while retrieving the logs.")
		process.exit(-1);
	}
	process.exit(0);
}

function printLog(log, date) {
	if(Date.parse(log.date) > date )
	{
		console.log(log.date);
		console.log(JSON.stringify(log.messages, null, 2));
		console.log();
	}
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

	saveToHistory(answers);
}

prompt.initialQuestions().then(
	answers => processAnswers(answers)
);

function saveToHistory(answers) {
	let log = {};
	log.date = new Date().toString();
	log.messages = [answers.yesterday, answers.today, answers.obstacles];

	fs.ensureFileSync(HISTORY_PATH);
	const histLogsText = fs.readFileSync(HISTORY_PATH, 'utf8');

	let newHistLogsText;
	try {
		var histLogs = JSON.parse(histLogsText);
		histLogs.push(log);
		newHistLogsText = JSON.stringify(histLogs);
	} catch {
		newHistLogsText = JSON.stringify([log]);
	}

	fs.writeFileSync(HISTORY_PATH, newHistLogsText);
}
