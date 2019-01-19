# standup-boy

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
```

## Configuration

You can obtain the path to the configuration file by simply running `standup-boy --path`. Edit the resulting file to override the defaults.

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

## License

MIT © [vikepic](https://vikepic.github.io)
