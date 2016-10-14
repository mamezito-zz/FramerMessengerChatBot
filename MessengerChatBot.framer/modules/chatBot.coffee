# Author - Sergiy Voronov
# twitter.com/mamezito


ios = require "ios-kit"
# module requires ioskit from Kevyn Arnott https://github.com/k-vyn/framer-ios-kit

botName=""
botImage=""
#styles
messageClass=
	"padding": "15px 40px"
question=
	"border": "2px solid #E2E2E2",
	"padding": "15px 40px",
	"border-radius":"34px",
	"float":"left"

answer=
	"background": "#0084FF",
	"color":"#fff",
	"border-radius":"34px",
	"padding": "15px 40px",
	"float":"left"


#interface
exports.createMessenger =(botName,image,likes,botCategory,user) ->
	botImage=image
	user=user
	keyboard = new ios.Keyboard
		hidden:true

	statusBar = new ios.StatusBar
	    carrier:"Verizon"
	    network:"3G"
	    battery:70
	    style:"dark"

	nav = new ios.NavBar
		right:"Block"
		left:"< Home"
		title:botName
		blur:false

	window["customTabBar"]=new Layer
		width:Screen.width
		height:60
		backgroundColor: "white"
		y:Align.bottom
		shadowY: -1
		shadowSpread: 2
		shadowColor: "rgba(123,123,123,0.2)"
	customTabBar.on "change:y", ->
		scroll.height=customTabBar.y

	window["textField"] = new ios.Field
		width:Screen.width
		keyboard:keyboard
		placeholder:"Type a message"
		borderWidth:0
		constraints:
			top:0
			leading:0

	textField.parent=customTabBar

	window["scroll"] = new ScrollComponent
		width: Screen.width
		name:"scroll"
		height:Screen.height-60
		scrollHorizontal: false
		directionLock :true
		contentInset:
			top: nav.height
			bottom:40
	scroll.content.backgroundColor="null"
	scroll.content.height=0
	scroll.sendToBack()

	botHeader=new Layer
		superLayer:scroll.content
		width:Screen.width
		backgroundColor:"#fff"
		shadowY: -1
		shadowSpread: 2
		shadowColor: "rgba(123,123,123,0.2)"
	userPicBig=new avatar
		parent:botHeader
		name:"avatar"
		image:botImage
		size:120
		midY:botHeader.midY
		x:50
	botTitle=new ios.Text
		fontSize:21
		fontWeight:300
		text:botName
		superLayer:botHeader
		y:userPicBig.y
		x:userPicBig.maxX+50
	likes=new ios.Text
		fontSize:14
		text:likes
		superLayer:botHeader
		y:userPicBig.y+50
		x:userPicBig.maxX+50
	category=new ios.Text
		fontSize:14
		text:botCategory
		superLayer:botHeader
		y:userPicBig.y+90
		x:userPicBig.maxX+50
		color:"#929292"


	backgroundA = new BackgroundLayer

	#functions
	textField.on Events.TouchEnd, ->

		textField.keyboard.keys.return.on Events.TouchStart, ->

			if textField.text.html.length>0
				msg=new Message
					type:"userMsg"
					text:textField.text.html
				userInput(textField.text.html)
				textField.text.html=""

		textField.keyboard.on "change:y", ->
			if textField.keyboard.maxY>Screen.height
							customTabBar.maxY=textField.keyboard.y
			if textField.keyboard.y==Screen.height
				textField.keyboard.area.visible=true

	Events.wrap(window).addEventListener "keydown", (event) ->
		if event.keyCode is 13
				if textField.text.html.length>0
					msg=new Message
						type:"userMsg"
						text:textField.text.html
					userInput(textField.text.html)
					textField.text.html=""


messages=[]
class avatar extends Layer
	constructor: (opts)->
		super opts
		@width=opts.size
		@height=opts.size
		@borderRadius=opts.size
buildChoices=(array, parentLayer)->
	for choice,i in array
		choiceLayer= new ios.Text
			fontSize:16
			name:"choice"
			fontWeight:500
			color:"#0084FF"
			text:choice[0]
			lineHeight:32
			y:parentLayer.height
			constraints:
				width:parentLayer.width/2
			superLayer:parentLayer
		do(choiceLayer)->
			choiceLayer.action=choice[1]
			choiceLayer.onClick ->
				response=new Message
					type:"userMsg"
					text:choiceLayer.html

				choiceFunc(this.action)
		if i>0
			choiceLayer.style=
					"text-align":"center"
					"border-top":"2px solid #e2e2e2"
		choiceLayer.style=
					"text-align":"center"
		parentLayer.height+=choiceLayer.height
class Message
	constructor: (opts)->
		cardWidth=Screen.width-300
		childarray=scroll.content.children
		if childarray[0]
			posY=childarray[childarray.length-1].maxY+10
		else
			posY=0
		if opts.type=="bubbles"

			bubbles=new Layer
				y:-84
				backgroundColor:"null"
				height:64
				superLayer:customTabBar
			bubbleX=0
			for choice,i in opts.choices
				bubble= new ios.Text
					fontSize:17
					text:choice[0]
					action:choice[1]
					superLayer:bubbles
				do(bubble)->
					bubble.action=choice[1]
					bubble.width+=80
					bubble.height+=30
					bubble.x=bubbleX
					bubbleX=bubble.maxX+10
					bubble.style=answer
					bubble.onClick ->
						response=new Message
							type:"userMsg"
							text:bubble.html
						bubbles.destroy()
						choiceFunc(this.action)


			bubbles.width=bubbleX
			bubbles.constraints =
				horizontalCenter:customTabBar
			ios.layout.set()
		else if opts.type=="userMsg" or opts.type=="botMsg"
			if opts.text.length>30
				message= new ios.Text
					fontSize:17
					text:opts.text
					superLayer:scroll.content
					y:posY

					constraints:
						width:300
			else
				message= new ios.Text
					fontSize:17
					text:opts.text
					superLayer:scroll.content
					y:posY
				message.width=message._element.children[0].offsetWidth+80
				message._element.style.width = null
			message.style=messageClass
			message.height=message._element.children[0].offsetHeight+40
			if opts.choices
				message.height+=30
				if message.width<cardWidth
					message.width=cardWidth
				buildChoices(opts.choices,message)
				message.children[0].style=
					"border-top":"2px solid #e2e2e2"

		else if opts.type=="cards"
			message=new Layer
				width:Screen.width-90
				superLayer:scroll.content
				y:posY
				backgroundColor:"null"
			messageHolder=new Layer
				x:2
				y:2
				width:message.width
				backgroundColor:"null"
				superLayer:message

			if opts.cards.length>1
				cardsPager=new PageComponent
					superLayer:messageHolder
					width:cardWidth
					backgroundColor:"null"
					scrollVertical:false
					directionLock :true
					clip:false
				parentObject=cardsPager.content
			else
				parentObject=messageHolder
			for card,i in opts.cards

				cardLayer=new Layer
					width:cardWidth
					backgroundColor:"#fff"
					superLayer:parentObject
					borderWidth: 2
					borderColor: "#E2E2E2"
					borderRadius:34
					clip:true
					x:(cardWidth+20)*i
					height:0

				if card.image
					cover=new Layer
						width:cardLayer.width
						height:300
						name:"cover"
						image:card.image
						superLayer:cardLayer
					cardLayer.height=cover.height
					cover.style=
						"border-bottom":"2px solid #e2e2e2"
				cardTextHolder=new Layer
						superLayer:cardLayer
						width:cardWidth
						backgroundColor:"#fff"
						y:cardLayer.height
						height:0
				if card.title or card.text or card.link

					cardTextHolder.style=
						"border-bottom":"2px solid #e2e2e2"

				if card.title
					titleLayer= new ios.Text
						fontSize:15
						fontWeight:500
						text:card.title
						x:20
						lineHeight:30
						y:cardTextHolder.height
						name:"title"
						constraints:
							width:(cardLayer.width-40)/2
						superLayer:cardTextHolder
					cardTextHolder.height+=titleLayer.height
				if card.text
					text= new ios.Text
						fontSize:13
						x:20
						color:"#666666"
						text:card.text
						y:cardTextHolder.height
						name:"text"
						constraints:
							width:(cardLayer.width-40)/2
						superLayer:cardTextHolder
					cardTextHolder.height+=text.height
				if card.link
					link= new ios.Text
						fontSize:13
						color:"#666666"
						x:20
						lineHeight:30
						text:card.link
						y:cardTextHolder.height
						name:"link"
						constraints:
							width:(cardLayer.width-40)/2
						superLayer:cardTextHolder
					cardTextHolder.height+=link.height
				cardTextHolder.height+=20
				cardLayer.height+=cardTextHolder.height
				buildChoices(card.choices,cardLayer)
				message.height=cardLayer.height
				messageHolder.height=cardLayer.height
				if cardsPager
					cardsPager.height=cardLayer.height
					messageHolder.height=cardLayer.height




		if opts.type=="userMsg"
			message.style=answer
			message.x=Screen.width
			message.opacity=0
			message.animate
				properties:
					maxX:Screen.width-20
					opacity:1
				time: 0.2
				curve: "ease-in-out"
		else if opts.type=="botMsg"
			message.style=question

		if opts.type=="botMsg" or opts.type=="cards"
			message.opacity=0
			message.maxX=0
			message.animate
				properties:
					x:90
					opacity:1
				time: 0.2
				delay:0.3
				curve: "ease-in-out"
			userPic=new avatar
				parent:message
				name:"avatar"
				image:botImage
				size:60
			userPic.x-=70
			userPic.y=Align.bottom
			userPic.sendToBack()
		if opts.type!="bubbles"
			messages.push(message)
		for msg,i in messages
			if messages[i+1]
				if msg.children[0] and messages[i+1].children[0]
					msg.childrenWithName("avatar")[0].opacity=0
		scroll.updateContent()
		messagesShown=scroll.content.children

		if (messagesShown[messagesShown.length-1].screenFrame.y+200)>scroll.height

			scroll.scrollToPoint( y: scroll.content.height+200, true, curve: "ease")
	exports.Message=Message
