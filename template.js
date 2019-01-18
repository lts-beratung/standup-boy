'use strict';
const config = require('./config.js');

const DEFAULT_YESTERDAY_TEXT =
':triumph: **`What did I accomplish yesterday`**';
const DEFAULT_TODAY_TEXT =
':scream_cat: **`What will I do today`**';
const DEFAULT_OBSTACLES_TEXT =
':cry: **`What obstacles are impeding my progress? Any info I need or want to share?`**';

function getConf(name, defText) {
	if (config.has(name)) {
		return config.get(name);
	}
	return defText;
}

module.exports = {
	yesterday: () => getConf('yesterday',
		DEFAULT_YESTERDAY_TEXT),
	today: () => getConf('today',
		DEFAULT_TODAY_TEXT),
	obstacles: () => getConf('obstacles',
		DEFAULT_OBSTACLES_TEXT)
};
