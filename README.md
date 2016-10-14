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

Next step call create messenger function which will pass all the properties to the module to build the interface

```
chatBot.createMessenger(botName,botImage,likes,botCategory,user)
```

There are several types of messages that can be rendered with this module:

1. User initiated - done automatically using input field and keyboard on bottom
2. Bubbles - options that are flying at bottom of chat screen
```
msg=new chatBot.Message
 type:"bubbles"
 choices:[["coffee","cf"],["meal","ml"],["desert","dsrt"]]
```
type variable of message class specify the type - in this case bubbles, choices array specify  pairs of choices - first variable is text label, second variable is like a code for the choice - that u can use for logic functions

3. Bot message - can be just text bubble, or text bubbles with options
```
msg=new chatBot.Message
  type:"botMsg"
  text:"Hope everything is fine on your side. How can we help you today?"
	choices:[["Order food","of"],["Talk to Support","support"]]
```

4. Bot message with cards, that contains image (later on it will be able to contain framer layer), card title, card text, card link, card options

```
msg=new chatBot.Message
  type:"cards"
	cards:[{cover:"image",image:"images/sandwiches/mcdonalds-Big-Tasty.png",title:"Big tasty",text:"Take a big bite into 100% beef, with cheese slices made from delicious Emmental, slices of tomato, lettuce, onion and Big Tasty sauce.",choices:[["Select","sandwichselected"]]},{cover:"image",image:"images/sandwiches/mcdonalds-Cheeseburger.png",title:"Cheeseburger",text:"The simple classic made with a 100% beef patty, cheese, onions, pickles, mustard and a dollop of Tomato Ketchup - all in a soft bun.",choices:[["Select","sandwichselected"]]},{cover:"image",image:"images/sandwiches/mcdonalds-Hamburger.png",title:"Hamburger",text:"A quarter pound, 100% beef patty with two slices of cheese, onions, pickles, mustard and a dollop of Tomato Ketchup.",choices:[["Select","sandwichselected"]]},{cover:"image",image:"images/sandwiches/mcdonalds-Big-Mac.png",title:"Big Mac",text:"Two 100% beef patties with lettuce, onions, pickles, cheese and our unbeatable Big Mac sauce - all in a sesame seed bun.",choices:[["Select","sandwichselected"]]},{cover:"image",image:"images/sandwiches/mcdonalds-The-BBQ.png",title:"The BBQ",text:"100% British and Irish Beef, BBQ sauce, coleslaw, red onion, lettuce, Beechwood smoked bacon and cheddar cheese",choices:[["Select","sandwichselected"]]}]
```

![](https://github.com/mamezito/FramerMessengerChatBot/blob/master/screen1.png)
![](https://github.com/mamezito/FramerMessengerChatBot/blob/master/screen2.png)
![](https://github.com/mamezito/FramerMessengerChatBot/blob/master/bubbles.png)

You need to use 2 functions to create logic
1. Function that tracks user input from textfield on bottom
```
window["userInput"]=(input)->
	if input.indexOf("ello") != -1
		msg=new chatBot.Message
			type:"botMsg"
			text:"Hello"+" #{user}."

		msg=new chatBot.Message
			type:"botMsg"
			text:"Hope everything is fine on your side. How can we help you today?"
			choices:[["Order food","of"],["Talk to Support","support"]]
	else 
		msg=new chatBot.Message
			type:"botMsg"
			text:"Sorry, we had hard night yesterday in bot's club. Having problems to understand you right:). Here are the things that we can do for you"
			choices:[["Order food","of"],["Talk to Support","support"]]
```

Basically this function will get user input as string when you tap on "return" key. 
It will check whether the string contains some text - in this case - "ello". So when we say hello to bot- module will create bot message with greetings and options to order food or talk to support


2. Function that tracks user clicks on options in bot messages and bubbles
Remember those choice code I mentioned before when describing code for message class? We are using it here. Depending on what user click in cards, bubbles, and bot messages with options - we are doing some stuff in prototype, in this case - we are creating new bot responses
```
window["choiceFunc"]=(choiceVar)->
	if choiceVar=="of"
		msg=new chatBot.Message
			type:"botMsg"
			text:"Great, we will try to help you <br>with that:)"
		msg=new chatBot.Message
			type:"botMsg"
			text:"Do you have anything particular in mind?"
			choices:[["Sandwiches","sndw"],["Sides","sides"],["Drinks","drnks"],["Desserts","dsrt"],["More","moreoptions"]]

```


live sample http://share.framerjs.com/umpe2e9jmci2/

mock of all types of messages without a logic 
http://share.framerjs.com/2cv5s75m3uwm/
