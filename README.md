# FramerMessengerChatBot

![](https://github.com/mamezito/FramerMessengerChatBot/blob/master/chatbot.png)

If you want to prototype messenger chatbot in Framer, this module can be usefull.
It does all layer creation behind the scenes. You will just need to write down the function for the userinput logic and bot messages choices logic.

Installation - copy whole modules folder of the example in git to your project.

embed module into your framer project

```
chatBot = require "chatBot"
```

Specify metainformation like name of the bot, path to bot avatar, number of likes and category and user name.

```
botName="McDonalds"
botImage="images/logo.png"
likes="282k people like this"
botCategory="Food/Beverages"
user="Sergiy"
```

There are several types of messages that can be rendered with this module:

1. User initiated - done automatically using input field and keyboard on bottom
2. 


live sample http://share.framerjs.com/umpe2e9jmci2/
