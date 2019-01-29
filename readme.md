# standup-boy [![Build Status](https://travis-ci.org/vikepic/standup-boy.svg?branch=master)](https://travis-ci.org/vikepic/standup-boy) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo) 

> A simple module to create daily standup texts :clock10:

`standup-boy` helps you create daily standup texts fast and easy.
It prompts you the usual stuff for a daily standup, then outputs a nicely-formatted, emoji-ready text for you to use in whatever platform you desire.
Assumes markdown formatting.

## Install

```
$ npm install --global standup-boy
```

```
$ standup-boy --help

	Usage
		standup-boy

	Examples
		$ standup-boy
		? What did I accomplish yesterday? Something!
		? What will I do today? Something Else!
		? What obstacles are impeding my progress? Any info I need or want to share? Not much...

		:triumph: **`What did I accomplish yesterday`**
		Something!
		:scream_cat: **`What will I do today`**
		Something Else!
		:cry: **`What obstacles are impeding my progress? Any info I need or want to share?`**
		Not much...
		Copied the result to the clipboard!
	Options
			--path -p Get the path to the configuration file (read-only).
			--project Specify the name of the project you want to send the message to.
```

## Configuration

You can obtain the path to the configuration file by simply running `standup-boy --path` (read-only). Edit the resulting file to override the defaults.

Mind that this configuration only alters the final text that gets copied into your clipboard.

### Templates

One can configure `standup-boy` to replace the default templates for the resulting standup text.

An example of an alternative configuration, written in JSON format:

```json
{
  "yesterday": "Hey, you! What did you do yesterday?",

  "today": "Oh really? And what are you gonna do today?",

  "obstacles": "Did you find any obstacles along the way, tho?"
}
```

### Replace words

`standup-boy` can also be configured to search and replace certain keywords for, for example, automatically link to JIRA tasks. RegExp syntax is supported.

If you want to introduce the matched string into the replaced value, you can add the `%VAL%` keyword anywhere in your resulting text to interpolate the matched variable into it.

An example of an alternative configuration, written in JSON format:

```json
{
  "replace" :
  {
    "JIRA-[0-9]*": "[%VAL%](https://your-jira.url/%VAL%)"
  }
}
```

This results in this text:

```
I completed JIRA-220 today!
```

Being replaced by:

```
I completed [JIRA-220](https://your-jira.url/JIRA-220) today!
```

If translated to markdown, a nice link appears in place of the old, lame, jira task name.

### Slack / Mattermost integration

This module can also be configured to automatically send the resulting message to your desired slack / mattermost channel once you've answered all the questions.

If your configuration is valid, a prompt should appear once your message has been written:

```
? Slack / Mattermost integration details found. Do you want to send the message? (Y/n)
```

On confirmation, the message will be sent to the destination specified by your configuration.

An example of a valid configuration, written in JSON format:

```json
{
	"username" : "vikepic",
	"channel" : "daily-standup",
	"url" : "https://your-slack-url"
}
```

Alternatively, you can have more than one project on your configuration file:

```json
{
	"projects" :
	{
		"project-turnip":
		{
			"username" : "vikepic",
				"channel" : "daily-standup-turnip",
				"url" : "https://your-slack-url"
		},
			"project-avocado":
			{
				"username" : "vikepic",
				"channel" : "daily-standup-avocado",
				"url" : "https://your-slack-url"
			}
	} 
}
```

If that is the case, you can specify with the `--project` flag which one will you send the message to. If not specified, the program will prompt to you which of the existing projects you want to use to send your message:

```
? Multiple projects found. Please, select the project you want to send the results to. (Use arrow keys)
❯ project-turnip
  project-avocado
```

Once selected, `standup-boy` will send the message to the project of your choice.

## License

MIT © [vikepic](https://vikepic.github.io)
