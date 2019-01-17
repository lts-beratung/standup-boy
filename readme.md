# standup-boy

> A simple module to create daily standup texts :clock10:

Standup-boy helps you create daily standup texts fast and easy.
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

## Configuration

One can configure `standup-boy` to replace the default templates for the resulting standup text.

You can obtain the path to the configuration file by simply running `standup-boy --path`. Edit the resulting file to override the defaults.

An example of an alternative configuration, written in JSON format:

```json
{
  "yesterday": "Hey, you! What did you do yesterday?",

  "today": "Oh really? And what are you gonna do today?"

  "obstacles": "Did you find any obstacles along the way, tho?"
}
```

Mind that this configuration only alters the final text that gets copied into your clipboard.

## License

MIT © [vikepic](https://vikepic.github.io)
