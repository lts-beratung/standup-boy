#!/usr/bin/env node
'use strict';

const inquirer = require('inquirer');

module.exports = {
	initialQuestions: () => inquirer.prompt([
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
	]),
	sendQuestion: () => inquirer.prompt([
		{
			type: 'confirm',
			name: 'send',
			message: 'Slack / Mattermost integration details found. Do you want to send the message?'
		}
	]),
	sendDestinationQuestions: projects => {
		const choices = [];
		for (const key in projects) {
			if (Object.prototype.hasOwnProperty.call(projects, key)) {
				choices.push(key);
			}
		}
		return inquirer.prompt([
			{
				type: 'list',
				name: 'project',
				message: 'Multiple projects found. Please, select the project you want to send the results to.',
				choices
			}
		]);
	}
};
