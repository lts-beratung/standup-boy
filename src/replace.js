'use strict';
const config = require('./config');

const SUB_WITH_MATCH = '%VAL%';

module.exports = text => {
	const replacer = config.get('replace');
	for (const key in replacer) {
		if (Object.prototype.hasOwnProperty.call(replacer, key)) {
			const value = replacer[key];
			const regex = new RegExp(key, 'gi');
			const matches = text.match(regex);
			if (!matches) {
				continue;
			}
			// Transform the array into a set to avoid
			// duplicates
			const unique = [...new Set(matches)];
			for (let i = 0; i < unique.length; ++i) {
				const match = unique[i];
				text =
					text.replace(new RegExp(match, 'gi'), value);
				text =
					text.replace(
						new RegExp(SUB_WITH_MATCH, 'gi'),
						match);
			}
		}
	}
	return text;
};
