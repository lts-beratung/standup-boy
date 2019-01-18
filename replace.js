'use strict';
const config = require('./config.js');

const SUB_WITH_MATCH = '%VAL%';

module.exports = text => {
	const replacer = config.get('replace');
	for (const key in replacer) {
		if (Object.prototype.hasOwnProperty.call(replacer, key)) {
			const value = replacer[key];
			const regex = new RegExp(key, 'gi');
			const matches = text.match(regex);
			for (let i = 0; i < matches.length; ++i) {
				const match = matches[i];
				text = text.replace(match, value);
				text =
					text.replace(
						new RegExp(SUB_WITH_MATCH, 'gi'),
						match);
			}
		}
	}
	return text;
};
