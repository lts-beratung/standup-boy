#!/usr/bin/env node
'use strict';
const Conf = require('conf');

const conf = new Conf();
const DEFAULT_YESTERDAY_TEXT =
':triumph: **`What did I accomplish yesterday`**';
const DEFAULT_TODAY_TEXT =
':scream_cat: **`What will I do today`**';
const DEFAULT_OBSTACLES_TEXT =
':cry: **`What obstacles are impeding my progress? Any info I need or want to share?`**';

function getConf(name, defText) {
	if (conf.has(name)) {
		return conf.get(name);
	}
	return defText;
}

module.exports = {
	path: () => conf.path,
	yesterday: () => getConf('yesterday',
		DEFAULT_YESTERDAY_TEXT),
	today: () => getConf('today',
		DEFAULT_TODAY_TEXT),
	obstacles: () => getConf('obstacles',
		DEFAULT_OBSTACLES_TEXT)
};
