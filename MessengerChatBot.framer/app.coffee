
#framer info
Framer.Info =
	title: "Facebook messenger chatbot"
	description: "prototyping framer messenger bots"
	author: "Sergey Voronov"
	twitter: "mamezito"

#modules
chatBot = require "chatBot"

#initial settings
botName="McDonalds"
botImage="images/logo.png"
likes="282k people like this"
botCategory="Food/Beverages"
user="Sergiy"

chatBot.createMessenger(botName,botImage,likes,botCategory,user)


#bot logic
#function checking for user input

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
			
			
			
#function checking what u have clicked at bot msg options
window["choiceFunc"]=(choiceVar)->
	if choiceVar=="of"
		msg=new chatBot.Message
			type:"botMsg"
			text:"Great, we will try to help you <br>with that:)"
		msg=new chatBot.Message
			type:"botMsg"
			text:"Do you have anything particular in mind?"
			choices:[["Sandwiches","sndw"],["Sides","sides"],["Drinks","drnks"],["Desserts","dsrt"],["More","moreoptions"]]
	else if choiceVar=="sndw"
		msg=new chatBot.Message
			type:"cards"
			cards:[{cover:"image",image:"images/sandwiches/mcdonalds-Big-Tasty.png",title:"Big tasty",text:"Take a big bite into 100% beef, with cheese slices made from delicious Emmental, slices of tomato, lettuce, onion and Big Tasty sauce.",choices:[["Select","sandwichselected"]]},{cover:"image",image:"images/sandwiches/mcdonalds-Cheeseburger.png",title:"Cheeseburger",text:"The simple classic made with a 100% beef patty, cheese, onions, pickles, mustard and a dollop of Tomato Ketchup - all in a soft bun.",choices:[["Select","sandwichselected"]]},{cover:"image",image:"images/sandwiches/mcdonalds-Hamburger.png",title:"Hamburger",text:"A quarter pound, 100% beef patty with two slices of cheese, onions, pickles, mustard and a dollop of Tomato Ketchup.",choices:[["Select","sandwichselected"]]},{cover:"image",image:"images/sandwiches/mcdonalds-Big-Mac.png",title:"Big Mac",text:"Two 100% beef patties with lettuce, onions, pickles, cheese and our unbeatable Big Mac sauce - all in a sesame seed bun.",choices:[["Select","sandwichselected"]]},{cover:"image",image:"images/sandwiches/mcdonalds-The-BBQ.png",title:"The BBQ",text:"100% British and Irish Beef, BBQ sauce, coleslaw, red onion, lettuce, Beechwood smoked bacon and cheddar cheese",choices:[["Select","sandwichselected"]]}]
	else if choiceVar=="sandwichselected"
		msg=new chatBot.Message
			type:"botMsg"
			text:"Good choice:) Anything else?"
			choices:[["Sides","sides"],["Drinks","drnks"],["Desserts","dsrt"],["Complete order","completeOrder"]]
	else if choiceVar=="sides"
		msg=new chatBot.Message
			type:"cards"
			cards:[{cover:"image",image:"images/sides/mcdonalds-Fries-Medium.png",title:"Fries",text:"Our famous French Fries - fluffy on the inside, golden brown and crispy on the outside.",choices:[["Select","sideschosen"]]},{cover:"image",image:"images/sides/mcdonalds-Cheddar-Melts.png",title:"Cheddar Melts",text:"A portion of five mild cheddar cheese bites with a crunchy coating. ",choices:[["Select","sideschosen"]]},{cover:"image",image:"images/sides/mcdonalds-Apple-Grape-Fruit-Bag.png",title:"Apple&Grape Fruit Bag",text:"Slices of apple and grape fruits, washed and ready to eat. Suitable for vegeterians",choices:[["Select","sideschosen"]]}]
	else if choiceVar=="sideschosen"
		msg=new chatBot.Message
			type:"botMsg"
			text:"Delicious. Anything else?"
			choices:[["Drinks","drnks"],["Desserts","dsrt"],["Complete order","completeOrder"]]
	else if choiceVar=="drnks"
		msg=new chatBot.Message
			type:"cards"
			cards:[{cover:"image",image:"images/drinks/cold/mcdonalds-Diet-Coke-Medium.png",title:"Diet Coke",choices:[["Select","drinkschosen"]]},{cover:"image",image:"images/drinks/cold/mcdonalds-Tropicana-Orange-Juice.png",title:"Tropicana orange juice",choices:[["Select","drinkschosen"]]},{cover:"image",image:"images/drinks/cold/mcdonalds-Fanta-Orange-Medium.png",title:"Fanta Orange",choices:[["Select","drinkschosen"]]}]
	else if choiceVar=="drinkschosen"
		msg=new chatBot.Message
			type:"botMsg"
			text:"Refreshing:) Some desserts maybe?"
			choices:[["Choose desserts","dsrt"],["Complete order","completeOrder"]]
	else if choiceVar=="dsrt"
		msg=new chatBot.Message
			type:"cards"
			cards:[{cover:"image",image:"images/dessert/mcdonalds-Strawberry-Sundae.png",title:"Strawberry Sundae",text:"Soft dairy ice cream swirled with strawberry sauce.  Perfect for summer heat",choices:[["Select","dessertschosen"]]},{cover:"image",image:"images/dessert/mcdonalds-Blueberry-Muffin.png",title:"Blueberry Muffin",text:"A moist blueberry muffin with blueberry pieces and a crumble topping",choices:[["Select","dessertschosen"]]},{cover:"image",image:"images/dessert/mcdonalds-Chocolatey-Donut.png",title:"Chocolatey Donut",text:"An iced donut with a chocolatey filling, sprinkled with milk chocolate flakes.",choices:[["Select","dessertschosen"]]}]
	else if choiceVar=="dessertschosen" or choiceVar=="completeOrder"
		
		msg=new chatBot.Message
			type:"botMsg"
			text:"Cool, we will deliver the order to secret hideout"
		
	
	
	
			
