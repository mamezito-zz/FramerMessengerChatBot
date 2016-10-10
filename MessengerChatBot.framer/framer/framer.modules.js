require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"chatBot":[function(require,module,exports){
var Message, answer, avatar, botImage, botName, buildChoices, ios, messageClass, messages, question,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ios = require("ios-kit");

botName = "";

botImage = "";

messageClass = {
  "padding": "15px 40px"
};

question = {
  "border": "2px solid #E2E2E2",
  "padding": "15px 40px",
  "border-radius": "34px",
  "float": "left"
};

answer = {
  "background": "#0084FF",
  "color": "#fff",
  "border-radius": "34px",
  "padding": "15px 40px",
  "float": "left"
};

exports.createMessenger = function(botName, image, likes, botCategory, user) {
  var backgroundA, botHeader, botTitle, category, customTabBar, keyboard, nav, statusBar, userPicBig;
  botImage = image;
  user = user;
  keyboard = new ios.Keyboard({
    hidden: true
  });
  statusBar = new ios.StatusBar({
    carrier: "Verizon",
    network: "3G",
    battery: 70,
    style: "dark"
  });
  nav = new ios.NavBar({
    right: "Block",
    left: "< Home",
    title: botName,
    blur: false
  });
  customTabBar = new Layer({
    width: Screen.width,
    height: 60,
    backgroundColor: "white",
    y: Align.bottom,
    shadowY: -1,
    shadowSpread: 2,
    shadowColor: "rgba(123,123,123,0.2)"
  });
  customTabBar.on("change:y", function() {
    return scroll.height = customTabBar.y;
  });
  window["textField"] = new ios.Field({
    width: Screen.width,
    keyboard: keyboard,
    placeholder: "Type a message",
    borderWidth: 0,
    constraints: {
      top: 0,
      leading: 0
    }
  });
  textField.parent = customTabBar;
  window["scroll"] = new ScrollComponent({
    width: Screen.width,
    name: "scroll",
    height: Screen.height - 60,
    scrollHorizontal: false,
    directionLock: true,
    contentInset: {
      top: nav.height,
      bottom: 40
    }
  });
  scroll.content.backgroundColor = "null";
  scroll.content.height = 0;
  scroll.sendToBack();
  botHeader = new Layer({
    superLayer: scroll.content,
    width: Screen.width,
    backgroundColor: "#fff",
    shadowY: -1,
    shadowSpread: 2,
    shadowColor: "rgba(123,123,123,0.2)"
  });
  userPicBig = new avatar({
    parent: botHeader,
    name: "avatar",
    image: botImage,
    size: 120,
    midY: botHeader.midY,
    x: 50
  });
  botTitle = new ios.Text({
    fontSize: 21,
    fontWeight: 300,
    text: botName,
    superLayer: botHeader,
    y: userPicBig.y,
    x: userPicBig.maxX + 50
  });
  likes = new ios.Text({
    fontSize: 14,
    text: likes,
    superLayer: botHeader,
    y: userPicBig.y + 50,
    x: userPicBig.maxX + 50
  });
  category = new ios.Text({
    fontSize: 14,
    text: botCategory,
    superLayer: botHeader,
    y: userPicBig.y + 90,
    x: userPicBig.maxX + 50,
    color: "#929292"
  });
  backgroundA = new BackgroundLayer;
  textField.on(Events.TouchEnd, function() {
    textField.keyboard.keys["return"].on(Events.TouchStart, function() {
      var msg;
      if (textField.text.html.length > 0) {
        msg = new Message({
          type: "userMsg",
          text: textField.text.html
        });
        userInput(textField.text.html);
        return textField.text.html = "";
      }
    });
    return textField.keyboard.on("change:y", function() {
      if (textField.keyboard.maxY > Screen.height) {
        customTabBar.maxY = textField.keyboard.y;
      }
      if (textField.keyboard.y === Screen.height) {
        return textField.keyboard.area.visible = true;
      }
    });
  });
  return Events.wrap(window).addEventListener("keydown", function(event) {
    var msg;
    if (event.keyCode === 13) {
      if (textField.text.html.length > 0) {
        msg = new Message({
          type: "userMsg",
          text: textField.text.html
        });
        userInput(textField.text.html);
        return textField.text.html = "";
      }
    }
  });
};

messages = [];

avatar = (function(superClass) {
  extend(avatar, superClass);

  function avatar(opts) {
    avatar.__super__.constructor.call(this, opts);
    this.width = opts.size;
    this.height = opts.size;
    this.borderRadius = opts.size;
  }

  return avatar;

})(Layer);

buildChoices = function(array, parentLayer) {
  var choice, choiceLayer, fn, i, j, len, results;
  fn = function(choiceLayer) {
    choiceLayer.action = choice[1];
    return choiceLayer.onClick(function() {
      var response;
      response = new Message({
        type: "userMsg",
        text: choiceLayer.html
      });
      return choiceFunc(this.action);
    });
  };
  results = [];
  for (i = j = 0, len = array.length; j < len; i = ++j) {
    choice = array[i];
    choiceLayer = new ios.Text({
      fontSize: 16,
      name: "choice",
      fontWeight: 500,
      color: "#0084FF",
      text: choice[0],
      lineHeight: 32,
      y: parentLayer.height,
      constraints: {
        width: parentLayer.width / 2
      },
      superLayer: parentLayer
    });
    fn(choiceLayer);
    if (i > 0) {
      choiceLayer.style = {
        "text-align": "center",
        "border-top": "2px solid #e2e2e2"
      };
    }
    choiceLayer.style = {
      "text-align": "center"
    };
    results.push(parentLayer.height += choiceLayer.height);
  }
  return results;
};

Message = (function() {
  function Message(opts) {
    var bubble, bubbleX, bubbles, card, cardLayer, cardTextHolder, cardWidth, cardsPager, childarray, choice, cover, fn, i, j, k, l, len, len1, len2, link, message, messageHolder, messagesShown, msg, parentObject, posY, ref, ref1, text, titleLayer, userPic;
    cardWidth = Screen.width - 300;
    childarray = scroll.content.children;
    if (childarray[0]) {
      posY = childarray[childarray.length - 1].maxY + 10;
    } else {
      posY = 0;
    }
    if (opts.type === "bubbles") {
      bubbles = new Layer({
        y: -84,
        backgroundColor: "null",
        height: 64,
        superLayer: customTabBar
      });
      bubbleX = 0;
      ref = opts.choices;
      fn = function(bubble) {
        bubble.action = choice[1];
        bubble.width += 80;
        bubble.height += 30;
        bubble.x = bubbleX;
        bubbleX = bubble.maxX + 10;
        bubble.style = answer;
        return bubble.onClick(function() {
          var response;
          response = new Message({
            type: "userMsg",
            text: bubble.html
          });
          bubbles.destroy();
          return choiceFunc(this.action);
        });
      };
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        choice = ref[i];
        bubble = new ios.Text({
          fontSize: 17,
          text: choice[0],
          action: choice[1],
          superLayer: bubbles
        });
        fn(bubble);
      }
      bubbles.width = bubbleX;
      bubbles.constraints = {
        horizontalCenter: customTabBar
      };
      ios.layout.set();
    } else if (opts.type === "userMsg" || opts.type === "botMsg") {
      if (opts.text.length > 30) {
        message = new ios.Text({
          fontSize: 17,
          text: opts.text,
          superLayer: scroll.content,
          y: posY,
          constraints: {
            width: 300
          }
        });
      } else {
        message = new ios.Text({
          fontSize: 17,
          text: opts.text,
          superLayer: scroll.content,
          y: posY
        });
        message.width = message._element.children[0].offsetWidth + 80;
        message._element.style.width = null;
      }
      message.style = messageClass;
      message.height = message._element.children[0].offsetHeight + 30;
      if (opts.choices) {
        message.height += 30;
        if (message.width < cardWidth) {
          message.width = cardWidth;
        }
        buildChoices(opts.choices, message);
        message.children[0].style = {
          "border-top": "2px solid #e2e2e2"
        };
      }
    } else if (opts.type === "cards") {
      message = new Layer({
        width: Screen.width - 90,
        superLayer: scroll.content,
        y: posY,
        backgroundColor: "null"
      });
      messageHolder = new Layer({
        x: 2,
        y: 2,
        width: message.width,
        backgroundColor: "null",
        superLayer: message
      });
      if (opts.cards.length > 1) {
        cardsPager = new PageComponent({
          superLayer: messageHolder,
          width: cardWidth,
          backgroundColor: "null",
          scrollVertical: false,
          directionLock: true,
          clip: false
        });
        parentObject = cardsPager.content;
      } else {
        parentObject = messageHolder;
      }
      ref1 = opts.cards;
      for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
        card = ref1[i];
        cardLayer = new Layer({
          width: cardWidth,
          backgroundColor: "#fff",
          superLayer: parentObject,
          borderWidth: 2,
          borderColor: "#E2E2E2",
          borderRadius: 34,
          clip: true,
          x: (cardWidth + 20) * i,
          height: 0
        });
        if (card.image) {
          cover = new Layer({
            width: cardLayer.width,
            height: 300,
            name: "cover",
            image: card.image,
            superLayer: cardLayer
          });
          cardLayer.height = cover.height;
          cover.style = {
            "border-bottom": "2px solid #e2e2e2"
          };
        }
        cardTextHolder = new Layer({
          superLayer: cardLayer,
          width: cardWidth,
          backgroundColor: "#fff",
          y: cardLayer.height,
          height: 0
        });
        if (card.title || card.text || card.link) {
          cardTextHolder.style = {
            "border-bottom": "2px solid #e2e2e2"
          };
        }
        if (card.title) {
          titleLayer = new ios.Text({
            fontSize: 15,
            fontWeight: 500,
            text: card.title,
            x: 20,
            lineHeight: 30,
            y: cardTextHolder.height,
            name: "title",
            constraints: {
              width: (cardLayer.width - 40) / 2
            },
            superLayer: cardTextHolder
          });
          cardTextHolder.height += titleLayer.height;
        }
        if (card.text) {
          text = new ios.Text({
            fontSize: 13,
            x: 20,
            color: "#666666",
            text: card.text,
            y: cardTextHolder.height,
            name: "text",
            constraints: {
              width: (cardLayer.width - 40) / 2
            },
            superLayer: cardTextHolder
          });
          cardTextHolder.height += text.height;
        }
        if (card.link) {
          link = new ios.Text({
            fontSize: 13,
            color: "#666666",
            x: 20,
            lineHeight: 30,
            text: card.link,
            y: cardTextHolder.height,
            name: "link",
            constraints: {
              width: (cardLayer.width - 40) / 2
            },
            superLayer: cardTextHolder
          });
          cardTextHolder.height += link.height;
        }
        cardTextHolder.height += 20;
        cardLayer.height += cardTextHolder.height;
        buildChoices(card.choices, cardLayer);
        message.height = cardLayer.height;
        messageHolder.height = cardLayer.height;
        if (cardsPager) {
          cardsPager.height = cardLayer.height;
          messageHolder.height = cardLayer.height;
        }
      }
    }
    if (opts.type === "userMsg") {
      message.style = answer;
      message.x = Screen.width;
      message.opacity = 0;
      message.animate({
        properties: {
          maxX: Screen.width - 20,
          opacity: 1
        },
        time: 0.2,
        curve: "ease-in-out"
      });
    } else if (opts.type === "botMsg") {
      message.style = question;
    }
    if (opts.type === "botMsg" || opts.type === "cards") {
      message.opacity = 0;
      message.maxX = 0;
      message.animate({
        properties: {
          x: 90,
          opacity: 1
        },
        time: 0.2,
        delay: 0.3,
        curve: "ease-in-out"
      });
      userPic = new avatar({
        parent: message,
        name: "avatar",
        image: botImage,
        size: 60
      });
      userPic.x -= 70;
      userPic.y = Align.bottom;
      userPic.sendToBack();
    }
    messages.push(message);
    for (i = l = 0, len2 = messages.length; l < len2; i = ++l) {
      msg = messages[i];
      if (messages[i + 1]) {
        if (msg.children[0] && messages[i + 1].children[0]) {
          msg.childrenWithName("avatar")[0].opacity = 0;
        }
      }
    }
    scroll.updateContent();
    messagesShown = scroll.content.children;
    if ((messagesShown[messagesShown.length - 1].screenFrame.y + 200) > scroll.height) {
      scroll.scrollToPoint({
        y: scroll.content.height + 200
      }, true, {
        curve: "ease"
      });
    }
  }

  exports.Message = Message;

  return Message;

})();


},{"ios-kit":"ios-kit"}],"ios-kit-alert":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  title: "Title",
  message: "",
  actions: ["OK"]
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(obj) {
  var act, actLabel, actLabel2, action, action2, actionDivider, actions, alert, cleanName, i, index, j, len, len1, ref, setup;
  setup = ios.utils.setupComponent(obj, exports.defaults);
  alert = new ios.View({
    backgroundColor: "transparent",
    name: "alert",
    constraints: {
      leading: 0,
      trailing: 0,
      top: 0,
      bottom: 0
    }
  });
  alert.overlay = new ios.View({
    backgroundColor: "rgba(0,0,0,.3)",
    superLayer: alert,
    name: ".overlay",
    constraints: {
      leading: 0,
      trailing: 0,
      top: 0,
      bottom: 0
    }
  });
  alert.modal = new ios.View({
    backgroundColor: "white",
    superLayer: alert,
    borderRadius: ios.utils.px(10),
    name: ".modal",
    constraints: {
      align: "center",
      width: 280,
      height: 400
    }
  });
  alert.title = new ios.Text({
    superLayer: alert.modal,
    text: setup.title,
    fontWeight: "semibold",
    name: ".title",
    textAlign: "center",
    lineHeight: 20,
    constraints: {
      top: 20,
      width: 220,
      align: "horizontal"
    }
  });
  alert.message = new ios.Text({
    superLayer: alert.modal,
    text: setup.message,
    fontSize: 13,
    name: ".message",
    textAlign: "center",
    lineHeight: 16,
    constraints: {
      top: [alert.title, 10],
      align: "horizontal",
      width: 220
    }
  });
  if (setup.message.length === 0) {
    alert.message.height = -24;
  }
  alert.horiDivider = new ios.View({
    superLayer: alert.modal,
    backgroundColor: "#E2E8EB",
    name: ".horiDivider",
    constraints: {
      leading: 0,
      trailing: 0,
      height: 1,
      bottom: 44
    }
  });
  cleanName = function(n) {
    if (n[0] === "-") {
      return n.slice(9);
    } else {
      return n;
    }
  };
  alert.modal.constraints["height"] = 20 + ios.utils.pt(alert.title.height) + 10 + ios.utils.pt(alert.message.height) + 24 + 44;
  actions = [];
  switch (setup.actions.length) {
    case 1:
      actLabel = ios.utils.capitalize(setup.actions[0]);
      action = new ios.View({
        superLayer: alert.modal,
        backgroundColor: "white",
        name: cleanName(setup.actions[0]),
        borderRadius: ios.utils.px(10),
        constraints: {
          leading: 0,
          trailing: 0,
          bottom: 0,
          height: 44
        }
      });
      action.label = new ios.Text({
        color: ios.utils.color("blue"),
        superLayer: action,
        text: actLabel,
        name: "label",
        constraints: {
          align: "horizontal",
          bottom: 16
        }
      });
      actions.push(action);
      break;
    case 2:
      actLabel = ios.utils.capitalize(setup.actions[0]);
      action = new ios.View({
        superLayer: alert.modal,
        name: cleanName(setup.actions[0]),
        borderRadius: ios.utils.px(10),
        backgroundColor: "white",
        constraints: {
          leading: 0,
          trailing: ios.utils.pt(alert.modal.width / 2),
          bottom: 0,
          height: 44
        }
      });
      action.label = new ios.Text({
        color: ios.utils.color("blue"),
        superLayer: action,
        text: actLabel,
        name: "label",
        constraints: {
          align: "horizontal",
          bottom: 16
        }
      });
      actions.push(action);
      alert.vertDivider = new ios.View({
        superLayer: alert.modal,
        backgroundColor: "#E2E8EB",
        name: ".vertDivider",
        constraints: {
          width: 1,
          bottom: 0,
          height: 44,
          align: "horizontal"
        }
      });
      actLabel2 = ios.utils.capitalize(setup.actions[1]);
      action2 = new ios.View({
        superLayer: alert.modal,
        name: cleanName(setup.actions[1]),
        borderRadius: ios.utils.px(10),
        backgroundColor: "white",
        constraints: {
          leading: ios.utils.pt(alert.modal.width / 2),
          trailing: 0,
          bottom: 0,
          height: 44
        }
      });
      action2.label = new ios.Text({
        color: ios.utils.color("blue"),
        superLayer: action2,
        text: actLabel2,
        name: "label",
        constraints: {
          align: "horizontal",
          bottom: 16
        }
      });
      actions.push(action2);
      break;
    default:
      ref = setup.actions;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        act = ref[index];
        actLabel = ios.utils.capitalize(act);
        action = new ios.View({
          superLayer: alert.modal,
          name: cleanName(act),
          borderRadius: ios.utils.px(10),
          backgroundColor: "white",
          constraints: {
            leading: 0,
            trailing: 0,
            bottom: 0 + ((setup.actions.length - index - 1) * 44),
            height: 44
          }
        });
        actionDivider = new ios.View({
          superLayer: alert.modal,
          backgroundColor: "#E2E8EB",
          name: "action divider",
          constraints: {
            leading: 0,
            trailing: 0,
            height: 1,
            bottom: 0 + ((setup.actions.length - index) * 44)
          }
        });
        action.label = new ios.Text({
          style: "alertAction",
          color: ios.utils.color("blue"),
          superLayer: action,
          text: actLabel,
          name: "label",
          constraints: {
            align: "horizontal",
            bottom: 14
          }
        });
        actions.push(action);
        alert.modal.constraints["height"] = alert.modal.constraints["height"] + 42 - 12;
      }
  }
  alert.actions = {};
  for (index = j = 0, len1 = actions.length; j < len1; index = ++j) {
    act = actions[index];
    act.type = "button";
    ios.utils.specialChar(act);
    if (setup.actions[index].indexOf("-r") === 0) {
      act.origColor = ios.utils.color("red");
    } else {
      act.origColor = ios.utils.color("blue");
    }
    ios.layout.set(act.label);
    act.on(Events.TouchStart, function() {
      this.backgroundColor = "white";
      this.animate({
        properties: {
          backgroundColor: act.backgroundColor.darken(5)
        },
        time: .25
      });
      return this.label.animate({
        properties: {
          color: this.origColor.lighten(10)
        },
        time: .25
      });
    });
    act.on(Events.TouchEnd, function() {
      this.animate({
        properties: {
          backgroundColor: "white"
        },
        time: .25
      });
      this.label.animate({
        properties: {
          color: this.origColor
        },
        time: .25
      });
      return alert.destroy();
    });
    alert.actions[act.name] = act;
  }
  ios.layout.set(actions[actions.length - 1]);
  return alert;
};


},{"ios-kit":"ios-kit"}],"ios-kit-banner":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  title: "Title",
  message: "Message",
  action: "Action",
  time: "now",
  app: "app",
  icon: void 0,
  duration: 7,
  animated: true,
  reply: true
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(obj) {
  var banner, setup, specs;
  setup = ios.utils.setupComponent(obj, exports.defaults);
  specs = {
    leadingIcon: 15,
    topIcon: 8,
    topTitle: 6,
    width: 0
  };
  switch (ios.device.name) {
    case "iphone-5":
      specs.width = 304;
      break;
    case "iphone-6s":
      specs.width = 359;
      break;
    case "iphone-6s-plus":
      specs.leadingIcon = 15;
      specs.topIcon = 12;
      specs.topTitle = 10;
      specs.width = 398;
      break;
    case "ipad":
      specs.leadingIcon = 8;
      specs.topIcon = 8;
      specs.topTitle = 11;
      specs.width = 398;
      break;
    case "ipad-pro":
      specs.leadingIcon = 8;
      specs.topIcon = 8;
      specs.topTitle = 9;
      specs.width = 556;
  }
  banner = new ios.View({
    backgroundColor: "rgba(255,255,255,.6)",
    name: "banner",
    borderRadius: ios.px(12),
    shadowColor: "rgba(0,0,0,.3)",
    shadowY: ios.px(2),
    shadowBlur: ios.px(10),
    clip: true,
    constraints: {
      align: 'horizontal',
      width: specs.width,
      top: 8,
      height: 93
    }
  });
  banner.header = new ios.View({
    backgroundColor: "rgba(255,255,255, .3)",
    name: ".header",
    superLayer: banner,
    constraints: {
      height: 36,
      leading: 0,
      trailing: 0
    }
  });
  if (setup.icon === void 0) {
    banner.icon = new ios.View({
      superLayer: banner.header
    });
    banner.icon.style["background"] = "linear-gradient(-180deg, #67FF81 0%, #01B41F 100%)";
  } else {
    banner.header.addSubLayer(setup.icon);
    banner.icon = setup.icon;
  }
  banner.icon.borderRadius = ios.utils.px(4.5);
  banner.icon.name = ".icon";
  banner.icon.constraints = {
    height: 20,
    width: 20,
    leading: specs.leadingIcon,
    align: "vertical"
  };
  ios.layout.set(banner.icon);
  banner.app = new ios.Text({
    text: setup.app.toUpperCase(),
    color: "rgba(0,0,0,.5)",
    fontSize: 13,
    letterSpacing: .5,
    superLayer: banner.header,
    constraints: {
      leading: [banner.icon, 6],
      align: "vertical"
    }
  });
  banner.title = new ios.Text({
    text: setup.title,
    color: "black",
    fontWeight: "semibold",
    fontSize: 15,
    superLayer: banner,
    name: ".title",
    constraints: {
      top: 45,
      leading: 15
    }
  });
  banner.message = new ios.Text({
    text: setup.message,
    color: "black",
    fontSize: 15,
    fontWeight: "light",
    superLayer: banner,
    name: ".message",
    constraints: {
      leadingEdges: banner.title,
      top: [banner.title, 6]
    }
  });
  banner.time = new ios.Text({
    text: setup.time,
    color: "rgba(0,0,0,.5)",
    fontSize: 13,
    superLayer: banner.header,
    name: ".time",
    constraints: {
      trailing: 16,
      align: "vertical"
    }
  });
  if (ios.device.name === "ipad" || ios.device.name === "ipad-pro") {
    banner.time.constraints = {
      bottomEdges: banner.title,
      trailing: specs.leadingIcon
    };
  }
  ios.utils.bgBlur(banner);
  banner.draggable = true;
  banner.draggable.horizontal = false;
  banner.draggable.constraints = {
    y: ios.px(8),
    x: ios.px(8)
  };
  banner.draggable.bounceOptions = {
    friction: 25,
    tension: 250
  };
  banner.on(Events.DragEnd, function() {
    if (banner.maxY < ios.utils.px(68)) {
      banner.animate({
        properties: {
          maxY: 0
        },
        time: .15,
        curve: "ease-in-out"
      });
      return Utils.delay(.25, function() {
        return banner.destroy();
      });
    }
  });
  if (setup.animated === true) {
    banner.y = 0 - banner.height;
    ios.layout.animate({
      target: banner,
      time: .25,
      curve: 'ease-in-out'
    });
  }
  if (setup.duration) {
    Utils.delay(setup.duration, function() {
      return banner.animate({
        properties: {
          maxY: 0
        },
        time: .25,
        curve: "ease-in-out"
      });
    });
    Utils.delay(setup.duration + .25, function() {
      return banner.destroy();
    });
  }
  return banner;
};


},{"ios-kit":"ios-kit"}],"ios-kit-button":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  text: "Button",
  type: "text",
  style: "light",
  backgroundColor: "white",
  color: "#007AFF",
  fontSize: 17,
  fontWeight: "regular",
  name: "button",
  blur: true,
  superLayer: void 0,
  constraints: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var backgroundColor, button, color, rgbString, rgbaString, setup;
  setup = ios.utils.setupComponent(array, exports.defaults);
  button = new ios.View({
    name: setup.name,
    constraints: setup.constraints,
    superLayer: setup.superLayer
  });
  button.type = setup.type;
  color = "";
  switch (setup.type) {
    case "big":
      setup.fontSize = 20;
      setup.fontWeight = "medium";
      button.borderRadius = ios.utils.px(12.5);
      backgroundColor = "";
      if (button.constraints === void 0) {
        button.constraints = {};
      }
      button.constraints.leading = 10;
      button.constraints.trailing = 10;
      button.constraints.height = 57;
      switch (setup.style) {
        case "light":
          color = ios.utils.color("blue");
          if (setup.blur) {
            backgroundColor = "rgba(255, 255, 255, .9)";
            ios.utils.bgBlur(button);
          } else {
            backgroundColor = "white";
          }
          break;
        case "dark":
          color = "#FFF";
          if (setup.blur) {
            backgroundColor = "rgba(43, 43, 43, .9)";
            ios.utils.bgBlur(button);
          } else {
            backgroundColor = "#282828";
          }
          break;
        default:
          if (setup.blur) {
            color = setup.color;
            backgroundColor = new Color(setup.backgroundColor);
            rgbString = backgroundColor.toRgbString();
            rgbaString = rgbString.replace(")", ", .9)");
            rgbaString = rgbaString.replace("rgb", "rgba");
            backgroundColor = rgbaString;
            ios.utils.bgBlur(button);
          } else {
            color = setup.color;
            backgroundColor = new Color(setup.backgroundColor);
          }
      }
      button.backgroundColor = backgroundColor;
      button.on(Events.TouchStart, function() {
        var newColor;
        newColor = "";
        if (setup.style === "dark") {
          newColor = button.backgroundColor.lighten(10);
        } else {
          newColor = button.backgroundColor.darken(10);
        }
        return button.animate({
          properties: {
            backgroundColor: newColor
          },
          time: .5
        });
      });
      button.on(Events.TouchEnd, function() {
        return button.animate({
          properties: {
            backgroundColor: backgroundColor
          },
          time: .5
        });
      });
      break;
    case "small":
      setup.fontSize = 14;
      setup.top = 4;
      button.borderRadius = ios.utils.px(2.5);
      setup.fontWeight = 500;
      setup.text = setup.text.toUpperCase();
      color = setup.color;
      button.borderColor = setup.color;
      button.backgroundColor = "transparent";
      button.borderWidth = ios.utils.px(1);
      break;
    default:
      button.backgroundColor = "transparent";
      button.origColor = ios.utils.specialChar(button);
      color = setup.color;
      button.labelOrigColor = color;
      button.on(Events.TouchStart, function() {
        var newColor;
        this.labelOrigColor = button.label.color;
        newColor = button.subLayers[0].color.lighten(30);
        return button.subLayers[0].animate({
          properties: {
            color: newColor
          },
          time: .5
        });
      });
      button.on(Events.TouchEnd, function() {
        return this.subLayers[0].animate({
          properties: {
            color: ios.utils.color(this.labelOrigColor)
          },
          time: .5
        });
      });
  }
  button.label = new ios.Text({
    name: ".label",
    text: setup.text,
    color: color,
    lineHeight: 16,
    superLayer: button,
    fontSize: setup.fontSize,
    fontWeight: setup.fontWeight,
    constraints: {
      align: "center"
    }
  });
  switch (setup.type) {
    case "small":
      button.props = {
        width: button.label.width + ios.utils.px(20),
        height: button.label.height + ios.utils.px(10)
      };
      button.on(Events.TouchStart, function() {
        button.animate({
          properties: {
            backgroundColor: color
          },
          time: .5
        });
        return button.label.animate({
          properties: {
            color: "#FFF"
          },
          time: .5
        });
      });
      button.on(Events.TouchEnd, function() {
        button.animate({
          properties: {
            backgroundColor: "transparent"
          },
          time: .5
        });
        return button.label.animate({
          properties: {
            color: color
          },
          time: .5
        });
      });
      break;
    default:
      button.props = {
        width: button.label.width,
        height: button.label.height
      };
  }
  ios.layout.set({
    target: button
  });
  ios.layout.set({
    target: button.label
  });
  return button;
};


},{"ios-kit":"ios-kit"}],"ios-kit-converter":[function(require,module,exports){
var genCSS, ios;

ios = require('ios-kit');

genCSS = function(cssArray) {
  var colonIndex, cssObj, i, j, key, len, prop, value;
  cssObj = {};
  for (i = j = 0, len = cssArray.length; j < len; i = ++j) {
    prop = cssArray[i];
    colonIndex = prop.indexOf(":");
    key = prop.slice(0, colonIndex);
    value = prop.slice(colonIndex + 2, prop.length - 1);
    cssObj[key] = value;
  }
  return cssObj;
};

exports.convert = function(obj) {
  var Artboard, artboards, b, children, device, found, genAlert, genBanner, genButton, genConstraints, genField, genKeyboard, genLayer, genNavBar, genSheet, genStatusBar, genTabBar, genText, getCSS, getColorString, getDesignedDevice, getImage, getLayer, getString, j, key, layerKeys, layers, len, len1, m, newArtboards, newLayers;
  getDesignedDevice = function(w) {
    var device;
    device = {};
    switch (w) {
      case 320:
      case 480:
      case 640:
      case 960:
      case 1280:
        device.scale = 2;
        device.height = 568;
        device.width = 320;
        device.name = 'iphone-5';
        break;
      case 375:
      case 562.5:
      case 750:
      case 1125:
      case 1500:
        device.scale = 2;
        device.height = 667;
        device.width = 375;
        device.name = 'iphone-6s';
        break;
      case 414:
      case 621:
      case 828:
      case 1242:
      case 1656:
        device.scale = 3;
        device.height = 736;
        device.width = 414;
        device.name = 'iphone-6s-plus';
        break;
      case 768:
      case 1152:
      case 1536:
      case 2304:
      case 3072:
        device.scale = 2;
        device.height = 1024;
        device.width = 768;
        device.name = 'ipad';
        break;
      case 1024:
      case 1536:
      case 2048:
      case 3072:
      case 4096:
        device.scale = 2;
        device.height = 1366;
        device.width = 1024;
        device.name = 'ipad-pro';
    }
    switch (w) {
      case 320:
      case 375:
      case 414:
      case 768:
      case 1024:
        device.iScale = 1;
        break;
      case 480:
      case 562.5:
      case 621:
      case 1152:
      case 1536:
        device.iScale = 1.5;
        break;
      case 640:
      case 750:
      case 828:
      case 1536:
      case 2048:
        device.iScale = 2;
        break;
      case 960:
      case 1125:
      case 1242:
      case 2304:
      case 3072:
        device.iScale = 3;
        break;
      case 1280:
      case 1500:
      case 1656:
      case 3072:
      case 4096:
        device.iScale = 4;
    }
    device.obj = 'device';
    return device;
  };
  layerKeys = Object.keys(obj);
  layers = [];
  artboards = [];
  newLayers = {};
  newArtboards = [];
  for (j = 0, len = layerKeys.length; j < len; j++) {
    key = layerKeys[j];
    if (obj[key]._info.kind === 'artboard') {
      artboards.push(obj[key]);
    }
  }
  for (m = 0, len1 = artboards.length; m < len1; m++) {
    b = artboards[m];
    device = getDesignedDevice(b.width);
    Artboard = function(artboard) {
      var board;
      board = new ios.View({
        name: artboard.name,
        backgroundColor: b.backgroundColor,
        constraints: {
          top: 0,
          bottom: 0,
          leading: 0,
          trailing: 0
        }
      });
      return board;
    };
    getString = function(l) {
      return l._info.metadata.string;
    };
    getCSS = function(l) {
      return genCSS(l._info.metadata.css);
    };
    getColorString = function(l) {
      return '-' + getCSS(l).color + ' ' + getString(l);
    };
    getImage = function(l) {
      return l.image;
    };
    getLayer = function(l) {
      return l.copy();
    };
    found = function(o, t) {
      if (o.indexOf(t) !== -1) {
        return true;
      }
    };
    genConstraints = function(l) {
      var bY, cX, cY, constraints, f, lX, r, s, tX, tY;
      constraints = {};
      s = device.iScale;
      cX = device.width / 2;
      cY = device.height / 2;
      tY = device.height / 4 * 3;
      bY = device.height / 4 * 3;
      lX = device.width / 4 * 3;
      tX = device.width / 4 * 3;
      r = function(n) {
        return Math.round(n);
      };
      f = function(n) {
        return Math.floor(n);
      };
      if (cX === l.midX / s || r(cX) === r(l.midX / s) || f(cX) === f(l.midX / s)) {
        constraints.align = 'horizontal';
      }
      if (cY === l.midY / s || r(cY) === r(l.midY / s) || f(cY) === f(l.midY / s)) {
        if (constraints.align === 'horizontal') {
          constraints.align = 'center';
        } else {
          constraints.align = 'vertical';
        }
      }
      if (l.x / s < lX) {
        constraints.leading = r(l.x / s);
      }
      if (l.x / s > tX) {
        constraints.trailing = r(l.parent.width / s - l.maxX / s);
      }
      if (l.y / s < tY) {
        constraints.top = r(l.y / s);
      }
      if (l.y / s > bY) {
        constraints.bottom = r(l.parent.height / s - l.maxY / s);
      }
      if (l.width / s === device.width) {
        constraints.leading = 0;
        constraints.trailing = 0;
      } else {
        constraints.width = l.width / s;
      }
      if (l.height / s === device.height) {
        constraints.top = 0;
        constraints.bottom = 0;
      } else {
        constraints.height = l.height / s;
      }
      return constraints;
    };
    genLayer = function(l, parent) {
      var props;
      props = {
        backgroundColor: 'transparent',
        name: l.name,
        image: l.image,
        superLayer: parent,
        constraints: genConstraints(l)
      };
      return new ios.View(props);
    };
    genAlert = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        actions: [],
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'title')) {
          props.title = getString(c);
        }
        if (found(n, 'message')) {
          props.message = getString(c);
        }
        if (found(n, 'action')) {
          props.actions.unshift(getColorString(c));
        }
        c.destroy();
      }
      return new ios.Alert(props);
    };
    genBanner = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'app')) {
          props.app = getString(c);
        }
        if (found(n, 'title')) {
          props.title = getString(c);
        }
        if (found(n, 'message')) {
          props.message = getString(c);
        }
        if (found(n, 'time')) {
          props.time = getString(c);
        }
        if (found(n, 'icon')) {
          props.icon = getLayer(c);
        }
        c.destroy();
      }
      return new ios.Banner(props);
    };
    genButton = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP,
        constraints: genConstraints(l)
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'small')) {
          props.type = 'small';
        }
        if (found(n, 'big')) {
          props.type = 'big';
        }
        if (found(n, 'dark')) {
          props.style = 'dark';
        }
        if (found(n, 'label')) {
          props.text = getString(c);
          props.color = getCSS(c).color;
          props.fontSize = getCSS(c)['font-size'].replace('px', '');
        }
        c.destroy();
      }
      return new ios.Button(props);
    };
    genField = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP,
        constraints: genConstraints(l)
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'placeholder')) {
          props.placeholder = getString(c);
        }
        c.destroy();
      }
      return new ios.Field(props);
    };
    genKeyboard = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'return')) {
          props.returnText = getString(c);
        }
        if (found(n, 'dark')) {
          props.style = 'dark';
        }
        c.destroy();
      }
      return new ios.Keyboard(props);
    };
    genNavBar = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'title')) {
          props.title = getString(c);
          props.titleColor = getCSS(c).color;
        }
        if (found(n, 'right')) {
          props.right = getString(c);
          props.color = getCSS(c).color;
        }
        if (found(n, 'left')) {
          props.left = getString(c);
        }
        c.destroy();
      }
      return new ios.NavBar(props);
    };
    genSheet = function(l, nP) {
      var c, i, len2, n, props, q, ref;
      props = {
        actions: [],
        superLayer: nP
      };
      ref = l.children;
      for (i = q = 0, len2 = ref.length; q < len2; i = ++q) {
        c = ref[i];
        n = c.name;
        if (found(n, 'action')) {
          props.actions.push(getColorString(c));
        }
        if (found(n, 'exit')) {
          props.exit = getString(c);
        }
        c.destroy();
      }
      return new ios.Sheet(props);
    };
    genStatusBar = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'carrier')) {
          props.carrier = getString(c);
        }
        if (found(n, 'battery')) {
          props.battery = getString(c).replace('%', '');
        }
        if (found(n, 'network')) {
          props.network = getString(c);
        }
        if (found(n, 'dark')) {
          props.style = 'light';
        }
        c.destroy();
      }
      return new ios.StatusBar(props);
    };
    genTabBar = function(l, nP) {
      var c, len2, len3, n, props, q, ref, ref1, t, tn, tprops, u;
      props = {
        tabs: [],
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        tprops = {};
        ref1 = c.children;
        for (u = 0, len3 = ref1.length; u < len3; u++) {
          t = ref1[u];
          tn = t.name;
          if (n === 'tab_active' && tn.indexOf('label') !== -1) {
            props.activeColor = getCSS(t).color;
          }
          if (n !== 'tab_active' && tn.indexOf('label') !== -1) {
            props.inactiveColor = getCSS(t).color;
          }
          if (found(tn, 'active') && tn.indexOf('inactive') === -1) {
            tprops.active = getLayer(t);
          }
          if (found(tn, 'inactive')) {
            tprops.inactive = getLayer(t);
          }
          if (found(tn, 'label')) {
            tprops.label = getString(t);
          }
          t.destroy();
        }
        props.tabs.unshift(new ios.Tab(tprops));
        c.destroy();
      }
      return new ios.TabBar(props);
    };
    genText = function(l, nP) {
      var css, k, keys, len2, props, q;
      props = {
        superLayer: nP,
        text: getString(l),
        constraints: genConstraints(l)
      };
      css = getCSS(l);
      keys = Object.keys(getCSS(l));
      for (q = 0, len2 = keys.length; q < len2; q++) {
        k = keys[q];
        if (found(k, 'font-family')) {
          props.fontFamily = css[k];
        }
        if (found(k, 'opacity')) {
          props.opacity = Number(css[k]);
        }
        if (found(k, 'color')) {
          props.color = css[k];
        }
        if (found(k, 'font-size')) {
          props.fontSize = css[k].replace('px', '');
        }
        if (found(k, 'letter-spacing')) {
          props.letterSpacing = css[k];
        }
        if (found(k, 'line-height')) {
          props.lineHeight = css[k].replace('px', '');
        }
      }
      return new ios.Text(props);
    };
    children = function(p, nP) {
      var c, len2, n, newLayer, q, ref, results;
      ref = p.children;
      results = [];
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        newLayer = 0;
        if (c.name[0] === '_') {
          if (found(n, '_Alert')) {
            newLayer = genAlert(c, nP);
          }
          if (found(n, '_Banner')) {
            newLayer = genBanner(c, nP);
          }
          if (found(n, '_Button')) {
            newLayer = genButton(c, nP);
          }
          if (found(n, '_Field')) {
            newLayer = genField(c, nP);
          }
          if (found(n, '_Keyboard')) {
            newLayer = genKeyboard(c, nP);
          }
          if (found(n, '_NavBar')) {
            newLayer = genNavBar(c, nP);
          }
          if (found(n, '_Sheet')) {
            newLayer = genSheet(c, nP);
          }
          if (found(n, '_TabBar')) {
            newLayer = genTabBar(c, nP);
          }
          if (found(n, '_StatusBar')) {
            newLayer = new genStatusBar(c, nP);
          }
          if (found(n, '_Text')) {
            newLayer = genText(c, nP);
          }
          if (newLayer === void 0) {
            newLayer = genLayer(c, nP);
          }
        } else {
          newLayer = genLayer(c, nP);
        }
        newLayers[n] = newLayer;
        if (c.children) {
          children(c, newLayer);
        }
        results.push(c.destroy());
      }
      return results;
    };
    ios.l[b.name] = new Artboard(b);
    children(b, ios.l[b.name]);
    b.destroy();
    newArtboards.push(ios.l[b.name]);
    newLayers[b.name] = ios.l[b.name];
  }
  return newLayers;
};


},{"ios-kit":"ios-kit"}],"ios-kit-field":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  name: 'field',
  active: false,
  keyboard: true,
  placeholder: "Enter text",
  placeholderColor: "#999",
  superLayer: void 0,
  backgroundColor: "white",
  borderColor: "#CCCCCC",
  borderRadius: ios.px(5),
  borderWidth: ios.px(1),
  height: ios.px(30),
  width: ios.px(97),
  fontSize: 17,
  color: 'black',
  textConstraints: {
    leading: 4,
    align: "vertical"
  },
  constraints: {
    height: 30,
    width: 97,
    align: "center"
  }
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var field, setup;
  setup = ios.utils.setupComponent(array, exports.defaults);
  field = new ios.View({
    name: setup.name,
    constraints: setup.constraints,
    backgroundColor: setup.backgroundColor,
    borderColor: setup.borderColor,
    borderRadius: setup.borderRadius,
    borderWidth: setup.borderWidth,
    height: setup.height,
    width: setup.width,
    clip: true,
    superLayer: setup.superLayer
  });
  field.text = new ios.Text({
    superLayer: field,
    name: ".text",
    constraints: setup.textConstraints,
    text: '',
    fontSize: 17,
    color: setup.color
  });
  field.text.placeholder = new ios.Text({
    superLayer: field,
    name: ".placeholder",
    constraints: setup.textConstraints,
    text: setup.placeholder,
    fontSize: 17,
    color: setup.placeholderColor
  });
  field.active = setup.active;
  field.type = 'field';
  field.on(Events.TouchEnd, function() {
    if (field.active !== true) {
      field.active = true;
      if (setup.keyboard === true && field.keyboard === void 0) {
        field.keyboard = new ios.Keyboard({
          output: field.text,
          hidden: true
        });
      }
      if (typeof setup.keyboard === 'object') {
        field.input(setup.keyboard);
        field.keyboard = setup.keyboard;
      }
      field.keyboard.call();
      field.text.cursor = new ios.View({
        superLayer: field,
        name: "cursor",
        backgroundColor: ios.color("blue"),
        constraints: {
          width: 2,
          height: setup.fontSize + 6,
          leading: 4,
          align: "vertical"
        }
      });
      if (field.text.html !== setup.placeholder) {
        field.text.cursor.constraints.leading = field.text;
        ios.layout.set(field.text.cursor);
      }
      field.listeningToField = Utils.interval(.1, function() {
        if (field.active === false) {
          clearInterval(field.interval);
          clearInterval(field.listeningToField);
          return field.text.cursor.destroy();
        }
      });
      field.interval = Utils.interval(.6, function() {
        if (field.active) {
          if (field.text.cursor.opacity) {
            return field.text.cursor.animate({
              properties: {
                opacity: 0
              },
              time: .5
            });
          } else {
            return field.text.cursor.animate({
              properties: {
                opacity: 1
              },
              time: .5
            });
          }
        }
      });
      return field.text.on("change:html", function() {
        this.cursor.constraints.leading = this;
        if (this.html === '') {
          this.placeholder.visible = true;
        } else {
          this.placeholder.visible = false;
        }
        if (this.html.indexOf(this.placeholder) !== -1) {
          this.html = this.html.replace(this.placeholder, '');
        }
        return ios.layout.set(this.cursor);
      });
    }
  });
  field.input = function(keyboard) {
    return keyboard.output(field);
  };
  return field;
};


},{"ios-kit":"ios-kit"}],"ios-kit-keyboard":[function(require,module,exports){
var arrayOfCodes, codeMap, device, ios, letters, numbers, symbols;

ios = require('ios-kit');

exports.defaults = {
  style: "light",
  shift: true,
  output: void 0,
  returnText: "return",
  state: "letters",
  hidden: false,
  returnColor: "blue",
  superLayer: void 0
};

device = {
  "iphone-5": {
    popUpChar: 40,
    popUpTop: 4,
    height: 215,
    lineHeight: 36,
    letterKey: {
      keyTop: 6,
      height: 39,
      width: 26.5,
      borderRadius: 5,
      fontSize: 22.5
    },
    specialKeyWidth: 38.5,
    specialKeyHeight: 38.5,
    space: 5,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 19,
      top: 16
    },
    row3: {
      top: 16,
      leading: 51
    },
    area: {
      top: 11,
      leading: 3,
      trailing: 3,
      bottom: 4
    },
    returnWidth: 75,
    popUpOffset: {
      x: 4,
      y: 30
    }
  },
  "iphone-6s": {
    popUpChar: 40,
    popUpTop: 6,
    height: 218,
    lineHeight: 40,
    letterKey: {
      keyTop: 10,
      height: 42,
      width: 31.5,
      borderRadius: 5,
      fontSize: 23,
      top: 10
    },
    specialKeyWidth: 42,
    specialKeyHeight: 42,
    space: 6,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 22,
      top: 12
    },
    row3: {
      top: 12,
      leading: 59
    },
    area: {
      top: 12,
      leading: 3,
      trailing: 3,
      bottom: 4
    },
    returnWidth: 87,
    popUpOffset: {
      x: 5,
      y: 32
    }
  },
  "iphone-6s-plus": {
    popUpChar: 38,
    popUpTop: 6,
    height: 226,
    lineHeight: 42,
    letterKey: {
      keyTop: 12,
      height: 45,
      width: 36,
      borderRadius: 5,
      fontSize: 24,
      top: 10
    },
    specialKeyWidth: 45,
    specialKeyHeight: 45,
    space: 5,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 20,
      top: 11
    },
    row3: {
      top: 11,
      leading: 63
    },
    area: {
      top: 8,
      leading: 4,
      trailing: 4,
      bottom: 5
    },
    returnWidth: 97,
    popUpOffset: {
      x: 10,
      y: 38
    }
  },
  "ipad": {
    height: 313,
    lineHeight: 55,
    letterKey: {
      height: 55,
      width: 56,
      borderRadius: 5,
      fontSize: 23
    },
    specialKeyWidth: 56,
    specialKeyHeight: 55,
    space: 12,
    returnWidth: 106,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 30,
      top: 9
    },
    row3: {
      leading: 68,
      top: 9
    },
    area: {
      top: 55,
      leading: 6,
      trailing: 6,
      bottom: 8
    }
  },
  "ipad-pro": {
    height: 378,
    lineHeight: 61,
    letterKey: {
      height: 61,
      width: 63,
      borderRadius: 5,
      fontSize: 23
    },
    space: 7,
    returnWidth: 120,
    specialKeyHeight: 61,
    specialKeyWidth: 93,
    row1: {
      leading: 111,
      top: 53
    },
    row2: {
      leading: 126,
      top: 7
    },
    row3: {
      leading: 161,
      top: 7
    },
    area: {
      top: 56,
      leading: 4,
      trailing: 4,
      bottom: 4
    }
  }
};

codeMap = {
  8: 'delete',
  9: 'tab',
  13: 'return',
  16: 'shift',
  20: 'caps',
  32: 'space',
  27: "dismiss",
  33: "!",
  34: "\"",
  35: "#",
  36: "$",
  37: "%",
  38: "&",
  39: "\'",
  40: "(",
  41: ")",
  42: "*",
  43: "+",
  44: ",",
  45: "-",
  47: "/",
  46: ".",
  48: "0",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  48: ")",
  59: "_",
  60: "<",
  61: "=",
  62: ">",
  63: "?",
  64: "@",
  65: "A",
  66: "B",
  67: "C",
  68: "D",
  69: "E",
  70: "F",
  71: "G",
  72: "H",
  73: "I",
  74: "J",
  75: "K",
  76: "L",
  77: "M",
  78: "N",
  79: "O",
  80: "P",
  81: "Q",
  82: "R",
  83: "S",
  84: "T",
  85: "U",
  86: "V",
  87: "W",
  88: "X",
  89: "Y",
  90: "Z",
  91: 'cmd',
  219: "[",
  92: "\\",
  221: "]",
  94: "^",
  95: "_",
  96: "`",
  97: "a",
  98: "b",
  99: "c",
  100: "d",
  101: "e",
  102: "f",
  103: "g",
  104: "h",
  105: "i",
  106: "j",
  107: "k",
  108: "l",
  109: "m",
  110: "n",
  111: "o",
  112: "p",
  113: "q",
  114: "r",
  115: "s",
  116: "t",
  117: "u",
  118: "v",
  119: "w",
  120: "x",
  121: "y",
  122: "z",
  123: "{",
  124: "|",
  125: "}",
  126: "~",
  186: ":",
  187: "+",
  188: "<",
  190: ">",
  191: "?",
  189: "_",
  192: "~",
  219: "{",
  220: "\|",
  221: "}",
  222: "&rdquo;"
};

arrayOfCodes = Object.keys(codeMap);

letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];

numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "/", ":", ";", "(", ")", "$", "&", "@", "\"", ".", ",", "?", "!", "′"];

symbols = ["[", "]", "{", "}", "#", "%", "^", "*", "+", "=", "_", "\\", "|", "~", "<", ">", "€", "£", "¥", "•"];

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(obj) {
  var Delete, Dismiss, Emoji, Icon, IconWithState, Key, Letter, Numbers, Return, Shift, Space, SpecialKey, Tab, board, capitalizeKeys, colors, handleKeyColor, popUp, setup, specs, style;
  setup = ios.utils.setupComponent(obj, exports.defaults);
  style = {
    light: {
      backgroundColor: "#D1D5DA",
      color: "#000",
      specialKeyBG: "#ACB3BD",
      keyBG: "#F7F7F7",
      shadowY: ios.px(1),
      shadowColor: "#898B8F",
      returnBG: ios.color(setup.returnColor)
    },
    dark: {
      backgroundColor: "rgba(0,0,0,.7)",
      color: "#FFF",
      specialKeyBG: "rgba(67,67,67,.8)",
      keyBG: "rgba(105,105,105,.8)",
      shadowY: ios.px(1),
      shadowColor: "rgba(0,0,0,.4)",
      returnBG: ios.color(setup.returnColor)
    }
  };
  specs = device[ios.device.name];
  colors = style[setup.style];
  device;
  board = new ios.View({
    name: "Keyboard",
    superLayer: setup.superLayer,
    backgroundColor: style[setup.style].backgroundColor,
    y: ios.device.height,
    constraints: {
      leading: 0,
      trailing: 0,
      bottom: -1 * specs.height,
      height: specs.height
    }
  });
  ios.utils.bgBlur(board);
  board.output = function(obj) {
    if (board.target) {
      if (board.target.type === 'field') {
        board.target.active = false;
      }
    }
    board.target = obj;
    if (board.target) {
      if (board.target.type === 'field') {
        return board.target.active = true;
      }
    }
  };
  board.hidden = setup.hidden;
  if (board.hidden === false) {
    board.constraints.bottom = 0;
    ios.layout.set(board);
  }
  board.call = function() {
    board.y = ios.device.height;
    board.constraints.bottom = 0;
    if (board.hidden) {
      board.hidden = false;
      ios.layout.animate({
        target: board,
        time: .5,
        curve: 'ease-in-out'
      });
    }
    return board.bringToFront();
  };
  board.dismiss = function() {
    board.constraints.bottom = -1 * ios.pt(board.height);
    board.hidden = true;
    board.target.active = false;
    return ios.layout.animate({
      target: board,
      time: .5,
      curve: 'ease-in-out'
    });
  };
  board["delete"] = function() {
    var isSpace, layer, text;
    layer = "";
    if (board.target) {
      if (board.target.type === 'field') {
        layer = board.target.text;
      } else {
        layer = board.target;
      }
      isSpace = layer.html.slice(layer.html.length - 5, +(layer.html.length - 1) + 1 || 9e9);
      if (isSpace !== 'nbsp;') {
        text = layer.html.slice(0, -1);
        return layer.html = text;
      } else {
        text = layer.html.slice(0, -6);
        return layer.html = text;
      }
    }
  };
  board.capsLock = function() {
    board.isCapsLock = true;
    board.isCapital = true;
    board.keys.shift.icon.toggle('off');
    handleKeyColor(board.keys.shift);
    if (ios.device.name === 'ipad-pro') {
      board.keys.shiftalt.icon.toggle('off');
      return handleKeyColor(board.keys.shiftalt);
    }
  };
  board.output(setup.output);
  board.keysArray = [];
  board.keys = {};
  board.isCapital = setup.shift;
  board.area = new ios.View({
    name: ".area",
    superLayer: board,
    constraints: specs.area,
    backgroundColor: "transparent"
  });
  Key = function(obj) {
    var key;
    key = new ios.View({
      name: ".keys." + obj.name,
      constraints: obj.constraints,
      superLayer: board.area,
      borderRadius: ios.px(specs.letterKey.borderRadius),
      shadowY: colors.shadowY,
      shadowColor: colors.shadowColor
    });
    key.style.fontFamily = "-apple-system, Helvetica, Arial, sans-serif";
    key.on(Events.TouchStart, function(event) {
      return event.preventDefault();
    });
    return key;
  };
  Letter = function(obj) {
    var key;
    key = new Key(obj);
    key.backgroundColor = colors.keyBG;
    key.html = obj.letter;
    key.color = colors.color;
    key.style.textAlign = "center";
    key.style.lineHeight = ios.px(specs.lineHeight) + "px";
    key.style.fontSize = ios.px(specs.letterKey.fontSize) + "px";
    key.value = obj.letter;
    if (key.value === "space") {
      key.value = "&nbsp;";
    }
    if (ios.isPad()) {
      key.down = function() {
        key.backgroundColor = colors.specialKeyBG;
        if (board.target) {
          return ios.utils.write(board.target, key.value);
        }
      };
      key.up = function() {
        key.backgroundColor = colors.keyBG;
        if (board.isCapital && board.isCapsLock !== true) {
          board.isCapital = false;
          capitalizeKeys();
          board.keys.shift.up();
          if (ios.isPad()) {
            return board.keys.shiftalt.up();
          }
        }
      };
      key.on(Events.TouchStart, function() {
        return key.down();
      });
      key.on(Events.TouchEnd, function() {
        return key.up();
      });
    } else {
      if (key.value !== '&nbsp;') {
        key.down = function() {
          board.popUp.visible = true;
          board.bringToFront();
          board.popUp.bringToFront();
          board.popUp.midX = key.midX;
          board.popUp.maxY = key.maxY;
          board.popUp.text.html = key.value;
          if (board.target) {
            return ios.utils.write(board.target, key.value);
          }
        };
        key.up = function() {
          board.popUp.visible = false;
          if (board.isCapital && board.capsLock !== true) {
            board.isCapital = false;
            capitalizeKeys();
            return board.keys.shift.up();
          }
        };
        key.on(Events.TouchStart, function() {
          return key.down();
        });
        key.on(Events.TouchEnd, function() {
          return key.up();
        });
      } else {
        key.down = function() {
          key.backgroundColor = colors.specialKeyBG;
          if (board.target) {
            return ios.utils.write(board.target, key.value);
          }
        };
        key.up = function() {
          return key.backgroundColor = colors.keyBG;
        };
        key.on(Events.TouchStart, function() {
          return key.down();
        });
        key.on(Events.TouchEnd, function() {
          return key.up();
        });
      }
    }
    return key;
  };
  SpecialKey = function(obj) {
    var key;
    key = new Key(obj);
    key.backgroundColor = colors.specialKeyBG;
    key.color = colors.color;
    key.style.textAlign = "center";
    if (ios.device.name === 'ipad-pro') {
      key.style.fontSize = ios.px(18) + "px";
    } else {
      key.style.fontSize = ios.px(16) + "px";
    }
    return key;
  };
  Icon = function(obj) {
    var icon;
    icon = new ios.View({
      name: 'icon',
      backgroundColor: "transparent",
      superLayer: obj.superLayer,
      constraints: {
        align: 'center'
      }
    });
    icon.props = {
      height: obj.icon.height,
      width: obj.icon.width,
      html: obj.icon.svg
    };
    ios.utils.changeFill(icon, colors.color);
    return icon;
  };
  IconWithState = function(obj) {
    var icon;
    icon = new ios.View({
      name: 'icon',
      backgroundColor: "transparent",
      superLayer: obj.superLayer,
      constraints: {
        align: 'center'
      }
    });
    icon.toggle = function(state) {
      if (state === void 0) {
        if (icon.state === 'on') {
          state = 'off';
        } else {
          state = 'on';
        }
      }
      if (state === "on") {
        if (ios.device.name !== 'ipad-pro') {
          icon.html = obj.on.svg;
          icon.width = obj.on.width;
          icon.height = obj.on.height;
        }
        icon.state = 'on';
      } else {
        if (ios.device.name !== 'ipad-pro') {
          icon.html = obj.off.svg;
          icon.width = obj.on.width;
          icon.height = obj.on.height;
        }
        icon.state = 'off';
      }
      return ios.utils.changeFill(icon, colors.color);
    };
    if (obj.state) {
      icon.toggle('on');
    } else {
      icon.toggle('off');
    }
    return icon;
  };
  capitalizeKeys = function() {
    var j, key, len, ref, results;
    ref = board.keysArray;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      key = ref[j];
      if (board.isCapital) {
        if (key.html.length === 1 && key.html.match(/[a-z]/i)) {
          key.html = key.html.toUpperCase();
          key.value = key.html;
        }
        if (key.alt) {
          key.alt.destroy();
          key.alt = void 0;
        }
        if (key.height > ios.px(46)) {
          key.style.lineHeight = ios.px(specs.letterKey.height) + 'px';
          key.style.fontSize = ios.px(23) + 'px';
        } else {
          if (ios.device.name === 'ipad-pro') {
            key.style.lineHeight = ios.px(46) + 'px';
          } else {
            key.style.lineHeight = ios.px(specs.lineHeight) + 'px';
          }
          key.style.fontSize = ios.px(20) + 'px';
        }
        results.push(key.value = key.html);
      } else {
        if (key.html.length === 1 && key.html.match(/[a-z]/i)) {
          key.html = key.html.toLowerCase();
          results.push(key.value = key.html);
        } else {
          if (key.alt === void 0) {
            key.alt = new ios.Text({
              text: "",
              superLayer: key,
              color: colors.color,
              constraints: {
                align: "horizontal",
                bottom: 4
              },
              fontSize: specs.letterKey.fontSize
            });
            if (board.topRow) {
              if (board.topRow.indexOf(key) !== -1) {
                key.style.lineHeight = ios.px(23) + 'px';
                key.style.fontSize = ios.px(16) + 'px';
                key.alt.style.fontSize = ios.px(16) + 'px';
              } else {
                key.style.lineHeight = ios.px(36) + 'px';
                key.style.fontSize = ios.px(20) + 'px';
                key.alt.style.fontSize = ios.px(20) + 'px';
                key.alt.constraints.bottom = 8;
              }
            }
            switch (key.value) {
              case "&lt;":
                key.alt.html = ".";
                break;
              case "&gt;":
                key.alt.html = ",";
                break;
              case "<":
                key.alt.html = ".";
                break;
              case ">":
                key.alt.html = ",";
                break;
              case "?":
                key.alt.html = ".";
                break;
              case "{":
                key.alt.html = "[";
                break;
              case "}":
                key.alt.html = "}";
                break;
              case "\|":
                key.alt.html = "\\";
                break;
              case "~":
                key.alt.html = "`";
                break;
              case "!":
                key.alt.html = ".";
                break;
              case "@":
                key.alt.html = "2";
                break;
              case "#":
                key.alt.html = "3";
                break;
              case "$":
                key.alt.html = "4";
                break;
              case "%":
                key.alt.html = "5";
                break;
              case "^":
                key.alt.html = "6";
                break;
              case "&amp;":
                key.alt.html = "7";
                break;
              case "&":
                key.alt.html = "7";
                break;
              case "*":
                key.alt.html = "8";
                break;
              case "(":
                key.alt.html = "9";
                break;
              case ")":
                key.alt.html = "0";
                break;
              case "_":
                key.alt.html = "-";
                break;
              case "+":
                key.alt.html = "=";
                break;
              default:
                key.alt.html = "&prime;";
            }
            ios.layout.set(key.alt);
            if (ios.device.name === 'ipad-pro' && key.value === '!') {
              key.alt.html = '1';
            }
            if (ios.device.name === 'ipad-pro' && key.value === '?') {
              key.alt.html = '/';
            }
            if (ios.device.name === 'ipad-pro' && key.value === ':') {
              key.alt.html = ';';
            }
            if (ios.device.name === 'ipad-pro' && key.value === '&rdquo;') {
              key.alt.html = '&prime;';
            }
            results.push(key.value = key.alt.html);
          } else {
            results.push(void 0);
          }
        }
      }
    }
    return results;
  };
  handleKeyColor = function(key) {
    if (ios.isPhone) {
      if (key.icon.state === 'on') {
        return key.backgroundColor = colors.keyBG;
      } else {
        return key.backgroundColor = colors.specialKeyBG;
      }
    }
  };
  Space = function(obj) {
    var key;
    key = new Letter(obj);
    key.html = 'space';
    key.backgroundColor = colors.keyBG;
    key.style.lineHeight = ios.px(specs.specialKeyHeight) + "px";
    key.style.fontSize = ios.px(16) + 'px';
    return key;
  };
  Shift = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.icon = new IconWithState({
      superLayer: key,
      state: obj.shift,
      on: ios.utils.svg(ios.assets.shift.on),
      off: ios.utils.svg(ios.assets.shift.off)
    });
    handleKeyColor(key);
    key.on(Events.TouchEnd, function() {
      this.icon.toggle();
      handleKeyColor(key);
      if (this.icon.state === 'on') {
        board.isCapital = true;
      } else {
        board.isCapital = false;
      }
      return capitalizeKeys();
    });
    key.down = function() {
      key.icon.toggle('on');
      handleKeyColor(key);
      board.isCapital = true;
      return capitalizeKeys();
    };
    key.up = function() {
      key.icon.toggle('off');
      handleKeyColor(key);
      board.isCapital = false;
      return capitalizeKeys();
    };
    ios.layout.set(key.icon);
    if (ios.isPad()) {
      key.on(Events.TouchEnd, function() {
        if (this.icon.state === 'on') {
          board.keys.shift.icon.toggle('on');
          board.keys.shiftalt.icon.toggle('on');
        } else {
          board.keys.shift.icon.toggle('off');
          board.keys.shiftalt.icon.toggle('off');
        }
        handleKeyColor(board.keys.shift);
        return handleKeyColor(board.keys.shiftalt);
      });
    }
    return key;
  };
  Delete = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.icon = new IconWithState({
      superLayer: key,
      on: ios.utils.svg(ios.assets["delete"].on),
      off: ios.utils.svg(ios.assets["delete"].off)
    });
    key.fire = function() {
      return board["delete"]();
    };
    key.down = function() {
      key.icon.toggle('on');
      handleKeyColor(key);
      return key.fire();
    };
    key.up = function() {
      key.icon.toggle('off');
      return handleKeyColor(key);
    };
    key.on(Events.TouchStart, function() {
      return key.down();
    });
    key.on(Events.TouchEnd, function() {
      return key.up();
    });
    return key;
  };
  Numbers = function(obj) {
    var key;
    key = new SpecialKey(obj);
    if (ios.isPhone()) {
      key.html = '123';
    } else {
      key.html = '.?123';
    }
    key.style.lineHeight = ios.px(specs.specialKeyHeight) + "px";
    return key;
  };
  Emoji = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.icon = new Icon({
      superLayer: key,
      icon: ios.utils.svg(ios.assets.emoji)
    });
    return key;
  };
  Return = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.backgroundColor = colors.returnBG;
    key.html = setup.returnText;
    key.style.lineHeight = ios.px(specs.specialKeyHeight) + "px";
    key.color = ios.utils.autoColor(colors.returnBG);
    key.down = function() {
      var nothingHappens;
      return nothingHappens = true;
    };
    key.up = function() {
      board.dismiss();
      if (board.target) {
        if (board.target.parent) {
          return board.target.parent.active = false;
        }
      }
    };
    key.on(Events.TouchEnd, function() {
      return key.down();
    });
    key.on(Events.TouchStart, function() {
      return key.up();
    });
    return key;
  };
  Dismiss = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.icon = new Icon({
      superLayer: key,
      icon: ios.utils.svg(ios.assets.keyboard)
    });
    key.icon.scale = .8;
    key.icon.constraints = {
      bottom: 12,
      trailing: 12
    };
    ios.layout.set(key.icon);
    key.down = function() {
      return board.dismiss();
    };
    key.up = function() {
      var nothingHappens;
      return nothingHappens = false;
    };
    key.on(Events.TouchEnd, function() {
      return key.down();
    });
    return key;
  };
  Tab = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.html = 'tab';
    key.style.lineHeight = ios.px(70) + 'px';
    key.style.textAlign = 'left';
    key.style.paddingLeft = ios.px(12) + 'px';
    return key;
  };
  board.switchLetters = function() {
    var i, j, k, key, l, len, len1, row1Break, row2Break, topKey, topLetters;
    row1Break = 10;
    row2Break = 19;
    if (ios.isPad()) {
      letters.push('!');
      letters.push('?');
    }
    if (ios.device.name === "ipad-pro") {
      letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "\|", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "&rdquo;", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?"];
      topLetters = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"];
      row1Break = 13;
      row2Break = 24;
    }
    for (i = j = 0, len = letters.length; j < len; i = ++j) {
      l = letters[i];
      key = new Letter({
        name: l,
        constraints: {
          height: specs.letterKey.height,
          width: specs.letterKey.width
        },
        letter: l
      });
      if (l === 'w' || l === 'r' || l === 'y' || l === 'i' || l === 'p') {
        key.constraints.width = key.constraints.width + 1;
      }
      board.keys[l] = key;
      board.keysArray.push(key);
      if (i === 0) {
        key.constraints.leading = specs.row1.leading;
        key.constraints.top = specs.row1.top;
      }
      if (i > 0 && i < row1Break) {
        key.constraints.leading = [board.keysArray[i - 1], specs.space];
        key.constraints.top = specs.row1.top;
      }
      if (i === row1Break) {
        key.constraints.leading = specs.row2.leading;
        key.constraints.top = [board.keysArray[0], specs.row2.top];
      }
      if (i > row1Break && i < row2Break) {
        key.constraints.leading = [board.keysArray[i - 1], specs.space];
        key.constraints.top = [board.keysArray[0], specs.row2.top];
      }
      if (i === row2Break) {
        key.constraints.leading = specs.row3.leading;
        key.constraints.top = [board.keysArray[row1Break], specs.row3.top];
      }
      if (i > row2Break) {
        key.constraints.leading = [board.keysArray[i - 1], specs.space];
        key.constraints.top = [board.keysArray[row1Break], specs.row3.top];
      }
      ios.layout.set(key);
    }
    board.keys.shift = new Shift({
      name: "shift",
      shift: setup.shift,
      constraints: {
        height: specs.specialKeyHeight,
        width: specs.specialKeyWidth,
        bottomEdges: board.keys.z
      }
    });
    board.keys["delete"] = new Delete({
      name: "delete",
      constraints: {
        height: specs.specialKeyHeight,
        width: specs.specialKeyWidth,
        bottomEdges: board.keys.z,
        trailing: 0
      }
    });
    board.keys.numbers = new Numbers({
      name: "numbers",
      constraints: {
        height: specs.specialKeyHeight,
        width: specs.specialKeyWidth,
        bottom: 0,
        leading: 0
      }
    });
    board.keys.emoji = new Emoji({
      name: "emoji",
      constraints: {
        height: specs.specialKeyHeight,
        width: specs.specialKeyWidth,
        leading: [board.keys.numbers, specs.space],
        bottom: 0
      }
    });
    board.keys["return"] = new Return({
      name: "return",
      constraints: {
        bottom: 0,
        trailing: 0,
        width: specs.returnWidth,
        height: specs.specialKeyHeight
      }
    });
    board.keys.space = new Space({
      name: "space",
      letter: "space",
      constraints: {
        leading: [board.keys.emoji, specs.space],
        trailing: [board.keys["return"], specs.space],
        bottom: 0,
        height: specs.specialKeyHeight
      }
    });
    if (ios.isPad()) {
      board.keys["return"].constraints.bottom = void 0;
      board.keys["return"].constraints.bottomEdges = board.keysArray[row1Break];
      board.keys["delete"].constraints.top = 0;
      board.keys["delete"].constraints.bottomEdges = void 0;
      board.keys["delete"].constraints.width = 61;
      board.keys.shiftalt = new Shift({
        name: "shiftalt",
        shift: setup.shift,
        constraints: {
          height: specs.specialKeyHeight,
          width: 76,
          bottomEdges: board.keys.z,
          trailing: 0
        }
      });
      board.keys.dismiss = new Dismiss({
        name: "dismiss",
        constraints: {
          height: specs.specialKeyHeight,
          width: specs.specialKeyWidth,
          bottom: 0,
          trailing: 0
        }
      });
      board.keys.numbersalt = new Numbers({
        name: "numbersalt",
        constraints: {
          height: specs.specialKeyHeight,
          width: 93,
          bottom: 0,
          trailing: [board.keys.dismiss, specs.space]
        }
      });
      board.keys.space.html = "";
      board.keys.space.constraints.trailing = [board.keys.numbersalt, specs.space];
      ios.layout.set();
    }
    board.topRow = [];
    if (ios.device.name === 'ipad-pro') {
      for (i = k = 0, len1 = topLetters.length; k < len1; i = ++k) {
        l = topLetters[i];
        topKey = new Letter({
          letter: l,
          name: l,
          constraints: {
            height: 46,
            width: 63,
            top: 0
          }
        });
        if (i === 0) {
          topKey.constraints.leading = 0;
        } else {
          topKey.constraints.leading = [board.topRow[i - 1], specs.space];
        }
        topKey.style.lineHeight = ios.px(46) + 'px';
        ios.layout.set(topKey);
        board.topRow.push(topKey);
        board.keysArray.push(topKey);
        board.keys[l] = topKey;
      }
      board.keys["delete"].icon.destroy();
      board.keys["delete"].html = 'delete';
      board.keys["delete"].style.lineHeight = ios.px(53) + 'px';
      board.keys["delete"].style.textAlign = 'right';
      board.keys["delete"].style.paddingRight = ios.px(12) + 'px';
      board.keys["delete"].constraints = {
        top: 0,
        trailing: 0,
        height: 46,
        width: 106
      };
      board.keys.shift.icon.destroy();
      board.keys.shift.html = 'shift';
      board.keys.shift.style.lineHeight = ios.px(70) + 'px';
      board.keys.shift.style.textAlign = 'left';
      board.keys.shift.style.paddingLeft = ios.px(12) + 'px';
      board.keys.shift.constraints.width = 154;
      board.keys.shiftalt.icon.destroy();
      board.keys.shiftalt.html = 'shift';
      board.keys.shiftalt.style.lineHeight = ios.px(70) + 'px';
      board.keys.shiftalt.style.textAlign = 'right';
      board.keys.shiftalt.style.paddingRight = ios.px(12) + 'px';
      board.keys.shiftalt.constraints.width = 155;
      board.keys.emoji.icon.constraints = {
        leading: 15,
        bottom: 11
      };
      board.keys.emoji.constraints = {
        width: 144,
        height: 61,
        leading: 0,
        bottom: 0
      };
      ios.layout.set();
      board.keys.numbersalt.constraints.width = 93;
      board.keys.dismiss.constraints.width = 93;
      board.keys.com = new Letter({
        name: '.com',
        letter: '.com',
        constraints: {
          height: specs.letterKey.height,
          width: specs.letterKey.width,
          bottom: 0,
          trailing: [board.keys.numbersalt, specs.space]
        }
      });
      board.keys.com.style.fontSize = ios.px(16) + 'px';
      board.keys.numbers.constraints = {
        width: 143,
        height: 61,
        leading: [board.keys.emoji, specs.space]
      };
      board.keys.numbers.style.lineHeight = ios.px(70) + 'px';
      board.keys.numbers.style.textAlign = 'left';
      board.keys.numbers.style.paddingLeft = ios.px(12) + 'px';
      board.keys["return"].style.lineHeight = ios.px(70) + 'px';
      board.keys["return"].style.textAlign = 'right';
      board.keys["return"].style.paddingRight = ios.px(12) + 'px';
      board.keys.space.constraints.leading = [board.keys.numbers, specs.space];
      board.keys.space.constraints.trailing = [board.keys.com, specs.space];
      board.keys.caps = new Shift({
        name: 'caps',
        caps: true,
        constraints: {
          height: specs.specialKeyHeight,
          width: 119,
          bottomEdges: board.keysArray[row1Break]
        }
      });
      board.keys.caps.icon.destroy();
      board.keys.caps.html = 'caps lock';
      board.keys.caps.style.lineHeight = ios.px(70) + 'px';
      board.keys.caps.style.textAlign = 'left';
      board.keys.caps.style.paddingLeft = ios.px(12) + 'px';
      board.keys.caps.down = function() {
        if (board.isCapsLock) {
          return board.isCapsLock = false;
        } else {
          return board.capsLock();
        }
      };
      board.keys.caps.on(Events.TouchEnd, function() {
        return board.keys.caps.down();
      });
      board.keys.caps.up = function() {
        var nothingHappens;
        return nothingHappens = true;
      };
      board.keys.tab = new Tab({
        name: 'tab',
        constraints: {
          height: specs.specialKeyHeight,
          width: 106,
          bottomEdges: board.keysArray[0]
        }
      });
      return ios.layout.set();
    }
  };
  if (ios.isPhone()) {
    popUp = ios.utils.svg(ios.assets.keyPopUp[setup.style][ios.device.name]);
    board.popUp = new Layer({
      height: popUp.height,
      width: popUp.width,
      backgroundColor: 'transparent',
      name: '.popUp',
      superLayer: board.area,
      visible: false
    });
    board.popUp.svg = new Layer({
      html: popUp.svg,
      height: popUp.height,
      width: popUp.width,
      superLayer: board.popUp,
      name: '.svg',
      backgroundColor: 'transparent'
    });
    board.popUp.text = new ios.Text({
      text: 'A',
      superLayer: board.popUp,
      fontSize: specs.popUpChar,
      fontWeight: 300,
      color: colors.color,
      textAlign: 'center',
      constraints: {
        align: 'horizontal',
        top: specs.popUpTop,
        width: ios.pt(popUp.width)
      }
    });
    board.popUp.center();
    switch (ios.device.name) {
      case 'iphone-6s-plus':
        board.popUp.width = board.popUp.width - 18;
        board.popUp.height = board.popUp.height - 24;
        board.popUp.svg.x = ios.px(-3);
        board.popUp.svg.y = ios.px(-3);
        break;
      case 'iphone-6s':
        board.popUp.width = board.popUp.width - 12;
        board.popUp.height = board.popUp.height - 12;
        board.popUp.svg.x = ios.px(-3);
        board.popUp.svg.y = ios.px(-2);
        break;
      case 'iphone-5':
        board.popUp.width = board.popUp.width - 12;
        board.popUp.height = board.popUp.height - 12;
        board.popUp.svg.x = ios.px(-3);
        board.popUp.svg.y = ios.px(-2);
    }
    capitalizeKeys();
  }
  board["switch"] = function(state) {
    switch (state) {
      case "letters":
        return board.switchLetters();
    }
  };
  board["switch"]("letters");
  document.addEventListener('keydown', function(e) {
    var key;
    if (arrayOfCodes.indexOf(e.keyCode.toString()) !== -1) {
      key = board.keys[codeMap[e.keyCode].toLowerCase()];
      if (key) {
        key.down();
      }
      if (ios.isPad()) {
        if (key === board.keys.shift || key === board.keys.shiftalt) {
          board.keys.shift.down();
          board.keys.shiftalt.icon.toggle('on');
          return handleKeyColor(board.keys.shiftalt);
        }
      }
    }
  });
  document.addEventListener('keyup', function(e) {
    var key;
    if (arrayOfCodes.indexOf(e.keyCode.toString()) !== -1) {
      key = board.keys[codeMap[e.keyCode].toLowerCase()];
      if (key) {
        key.up();
      }
      if (ios.isPad()) {
        if (key === board.keys.shift || key === board.keys.shiftalt) {
          board.keys.shift.up();
          board.keys.shiftalt.icon.toggle('off');
          return handleKeyColor(board.keys.shiftalt);
        }
      }
    }
  });
  capitalizeKeys();
  return board;
};


},{"ios-kit":"ios-kit"}],"ios-kit-layout":[function(require,module,exports){
var ios, layout;

ios = require('ios-kit');

exports.defaults = {
  animations: {
    target: void 0,
    constraints: void 0,
    curve: "ease-in-out",
    curveOptions: void 0,
    time: 1,
    delay: 0,
    repeat: void 0,
    colorModel: void 0,
    stagger: void 0,
    fadeOut: false,
    fadeIn: false
  }
};

layout = function(array) {
  var blueprint, i, index, j, k, l, layer, len, len1, len2, newConstraint, props, ref, ref1, setup, targetLayers;
  setup = {};
  targetLayers = [];
  blueprint = [];
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  if (setup.target) {
    if (setup.target.length) {
      targetLayers = setup.target;
    } else {
      targetLayers.push(setup.target);
    }
  } else {
    targetLayers = Framer.CurrentContext.layers;
  }
  if (setup.target) {
    if (setup.constraints) {
      ref1 = Object.keys(setup.constraints);
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        newConstraint = ref1[k];
        setup.target.constraints[newConstraint] = setup.constraints[newConstraint];
      }
    }
  }
  for (index = l = 0, len2 = targetLayers.length; l < len2; index = ++l) {
    layer = targetLayers[index];
    layer.calculatedPosition = {};
    if (layer.constraints) {
      props = {};
      layer.superFrame = {};
      if (layer.superLayer) {
        layer.superFrame.height = layer.superLayer.height;
        layer.superFrame.width = layer.superLayer.width;
      } else {
        layer.superFrame.height = ios.device.height;
        layer.superFrame.width = ios.device.width;
      }
      if (layer.constraints.leading !== void 0 && layer.constraints.trailing !== void 0) {
        layer.constraints.autoWidth = {};
      }
      if (layer.constraints.top !== void 0 && layer.constraints.bottom !== void 0) {
        layer.constraints.autoHeight = {};
      }
      if (layer.constraints.width !== void 0) {
        props.width = ios.utils.px(layer.constraints.width);
      } else {
        props.width = layer.width;
      }
      if (layer.constraints.height !== void 0) {
        props.height = ios.utils.px(layer.constraints.height);
      } else {
        props.height = layer.height;
      }
      if (layer.constraints.leading !== void 0) {
        if (layer.constraints.leading === parseInt(layer.constraints.leading, 10)) {
          props.x = ios.utils.px(layer.constraints.leading);
        } else {
          if (layer.constraints.leading.length === void 0) {
            props.x = layer.constraints.leading.calculatedPosition.x + layer.constraints.leading.calculatedPosition.width;
          } else {
            props.x = layer.constraints.leading[0].calculatedPosition.x + layer.constraints.leading[0].calculatedPosition.width + ios.utils.px(layer.constraints.leading[1]);
          }
        }
      }
      if (layer.constraints.autoWidth !== void 0) {
        layer.constraints.autoWidth.startX = props.x;
      }
      if (layer.constraints.trailing !== void 0) {
        if (layer.constraints.trailing === parseInt(layer.constraints.trailing, 10)) {
          props.x = layer.superFrame.width - ios.utils.px(layer.constraints.trailing) - props.width;
        } else {
          if (layer.constraints.trailing.length === void 0) {
            props.x = layer.constraints.trailing.calculatedPosition.x - props.width;
          } else {
            props.x = layer.constraints.trailing[0].calculatedPosition.x - ios.utils.px(layer.constraints.trailing[1]) - props.width;
          }
        }
      }
      if (layer.constraints.autoWidth !== void 0) {
        layer.constraints.autoWidth.calculatedPositionX = props.x;
        props.x = layer.constraints.autoWidth.startX;
        props.width = layer.constraints.autoWidth.calculatedPositionX - layer.constraints.autoWidth.startX + props.width;
      }
      if (layer.constraints.top !== void 0) {
        if (layer.constraints.top === parseInt(layer.constraints.top, 10)) {
          props.y = ios.utils.px(layer.constraints.top);
        } else {
          if (layer.constraints.top.length === void 0) {
            props.y = layer.constraints.top.calculatedPosition.y + layer.constraints.top.calculatedPosition.height;
          } else {
            props.y = layer.constraints.top[0].calculatedPosition.y + layer.constraints.top[0].calculatedPosition.height + ios.utils.px(layer.constraints.top[1]);
          }
        }
      }
      if (layer.constraints.autoHeight !== void 0) {
        layer.constraints.autoHeight.startY = props.y;
      }
      if (layer.constraints.bottom !== void 0) {
        if (layer.constraints.bottom === parseInt(layer.constraints.bottom, 10)) {
          props.y = layer.superFrame.height - ios.utils.px(layer.constraints.bottom) - props.height;
        } else {
          if (layer.constraints.bottom.length === void 0) {
            props.y = layer.constraints.bottom.calculatedPosition.y - props.height;
          } else {
            props.y = layer.constraints.bottom[0].calculatedPosition.y - ios.utils.px(layer.constraints.bottom[1]) - props.height;
          }
        }
      }
      if (layer.constraints.autoHeight !== void 0) {
        layer.constraints.autoHeight.calculatedPositionY = props.y;
        props.height = layer.constraints.autoHeight.calculatedPositionY - layer.constraints.autoHeight.startY + props.height;
        props.y = layer.constraints.autoHeight.startY;
      }
      if (layer.constraints.align !== void 0) {
        if (layer.constraints.align === "horizontal") {
          props.x = layer.superFrame.width / 2 - props.width / 2;
        }
        if (layer.constraints.align === "vertical") {
          props.y = layer.superFrame.height / 2 - props.height / 2;
        }
        if (layer.constraints.align === "center") {
          props.x = layer.superFrame.width / 2 - props.width / 2;
          props.y = layer.superFrame.height / 2 - props.height / 2;
        }
      }
      if (layer.constraints.horizontalCenter !== void 0) {
        props.x = layer.constraints.horizontalCenter.calculatedPosition.x + (layer.constraints.horizontalCenter.calculatedPosition.width - props.width) / 2;
      }
      if (layer.constraints.verticalCenter !== void 0) {
        props.y = layer.constraints.verticalCenter.calculatedPosition.y + (layer.constraints.verticalCenter.calculatedPosition.height - props.height) / 2;
      }
      if (layer.constraints.center !== void 0) {
        props.x = layer.constraints.center.calculatedPosition.x + (layer.constraints.center.calculatedPosition.width - props.width) / 2;
        props.y = layer.constraints.center.calculatedPosition.y + (layer.constraints.center.calculatedPosition.height - props.height) / 2;
      }
      if (layer.constraints.leadingEdges !== void 0) {
        props.x = layer.constraints.leadingEdges.calculatedPosition.x;
      }
      if (layer.constraints.trailingEdges !== void 0) {
        props.x = layer.constraints.trailingEdges.calculatedPosition.x - props.width + layer.constraints.trailingEdges.calculatedPosition.width;
      }
      if (layer.constraints.topEdges !== void 0) {
        props.y = layer.constraints.topEdges.calculatedPosition.y;
      }
      if (layer.constraints.bottomEdges !== void 0) {
        props.y = layer.constraints.bottomEdges.calculatedPosition.y - props.height + layer.constraints.bottomEdges.calculatedPosition.height;
      }
      layer.calculatedPosition = props;
    } else {
      layer.calculatedPosition = layer.props;
    }
    blueprint.push(layer);
  }
  return blueprint;
};

exports.set = function(array) {
  var blueprint, i, index, j, k, key, layer, len, len1, props, ref, results, setup;
  setup = {};
  props = {};
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  blueprint = layout(array);
  results = [];
  for (index = k = 0, len1 = blueprint.length; k < len1; index = ++k) {
    layer = blueprint[index];
    results.push((function() {
      var l, len2, ref1, results1;
      ref1 = Object.keys(layer.calculatedPosition);
      results1 = [];
      for (l = 0, len2 = ref1.length; l < len2; l++) {
        key = ref1[l];
        results1.push(layer[key] = layer.calculatedPosition[key]);
      }
      return results1;
    })());
  }
  return results;
};

exports.animate = function(array) {
  var blueprint, delay, i, index, j, k, layer, len, len1, props, ref, results, setup, stag;
  setup = {};
  props = {};
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  blueprint = layout(array);
  results = [];
  for (index = k = 0, len1 = blueprint.length; k < len1; index = ++k) {
    layer = blueprint[index];
    delay = setup.delay;
    if (setup.stagger) {
      stag = setup.stagger;
      delay = (index * stag) + delay;
    }
    if (setup.fadeOut) {
      if (layer === setup.fadeOut) {
        layer.calculatedPosition.opacity = 0;
      }
    }
    if (setup.fadeIn) {
      layer.calculatedPosition.opacity = 1;
    }
    layer.animate({
      properties: layer.calculatedPosition,
      time: setup.time,
      delay: delay,
      curve: setup.curve,
      repeat: setup.repeat,
      colorModel: setup.colorModel,
      curveOptions: setup.curveOptions
    });
    results.push(layer.calculatedPosition = props);
  }
  return results;
};


},{"ios-kit":"ios-kit"}],"ios-kit-library":[function(require,module,exports){
var ios, layer;

ios = require("ios-kit");

layer = new Layer;

exports.layerProps = Object.keys(layer.props);

exports.layerProps.push("superLayer");

exports.layerProps.push("constraints");

exports.layerStyles = Object.keys(layer.style);

layer.destroy();

exports.assets = {
  sheetTip: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='27px' height='13px' viewBox='0 0 27 13' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Triangle</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-Kit' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Navigation-Bar-Copy' transform='translate(-2634.000000, -124.000000)' fill='#FFFFFF'> <path d='M2644.71916,125.883834 C2646.25498,124.291136 2648.74585,124.291992 2650.28084,125.883834 L2661,137 L2634,137 L2644.71916,125.883834 Z' id='Triangle'></path> </g> </g> </svg>",
  bluetooth: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='7px' height='13px' viewBox='0 0 8 15' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Bluetooth</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Status-Icons-(White)' transform='translate(-137.000000, 0.000000)' fill='#FFF'> <path d='M140.5,14.5 L145,10.25 L141.8,7.5 L145,4.75 L140.5,0.5 L140.5,6.07142857 L137.8,3.75 L137,4.5 L140.258333,7.375 L137,10.25 L137.8,11 L140.5,8.67857143 L140.5,14.5 Z M141.5,3 L143.366667,4.75 L141.5,6.25 L141.5,3 Z M141.5,8.5 L143.366667,10.25 L141.5,12 L141.5,8.5 Z' id='Bluetooth'></path> </g> </svg>",
  batteryHigh: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='25px' height='10px' viewBox='0 0 25 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <title>Battery</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Status-Bar/Black/100%' transform='translate(-345.000000, -5.000000)' fill='#030303'> <path d='M346.493713,5.5 C345.668758,5.5 345,6.16802155 345,7.00530324 L345,13.4946968 C345,14.3260528 345.67338,15 346.493713,15 L366.006287,15 C366.831242,15 367.5,14.3319784 367.5,13.4946968 L367.5,7.00530324 C367.5,6.17394722 366.82662,5.5 366.006287,5.5 L346.493713,5.5 Z M368,8.5 L368,12 L368.75,12 C369.164214,12 369.5,11.6644053 369.5,11.25774 L369.5,9.24225998 C369.5,8.83232111 369.167101,8.5 368.75,8.5 L368,8.5 Z M346.508152,6 C345.951365,6 345.5,6.45699692 345.5,7.00844055 L345.5,13.4915594 C345.5,14.0485058 345.949058,14.5 346.508152,14.5 L365.991848,14.5 C366.548635,14.5 367,14.0430031 367,13.4915594 L367,7.00844055 C367,6.45149422 366.550942,6 365.991848,6 L346.508152,6 Z M346.506744,6.5 C346.226877,6.5 346,6.71637201 346,6.99209595 L346,13.5079041 C346,13.7796811 346.230225,14 346.506744,14 L365.993256,14 C366.273123,14 366.5,13.783628 366.5,13.5079041 L366.5,6.99209595 C366.5,6.72031886 366.269775,6.5 365.993256,6.5 L346.506744,6.5 Z' id='Battery'></path> </g> </g> </svg>",
  batteryMid: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='25px' height='10px' viewBox='0 0 25 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <title>Battery</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Status-Bar/Black/Low-Power' transform='translate(-345.000000, -5.000000)' fill='#030303'> <path d='M346.493713,5.5 C345.668758,5.5 345,6.16802155 345,7.00530324 L345,13.4946968 C345,14.3260528 345.67338,15 346.493713,15 L366.006287,15 C366.831242,15 367.5,14.3319784 367.5,13.4946968 L367.5,7.00530324 C367.5,6.17394722 366.82662,5.5 366.006287,5.5 L346.493713,5.5 Z M368,8.5 L368,12 L368.75,12 C369.164214,12 369.5,11.6644053 369.5,11.25774 L369.5,9.24225998 C369.5,8.83232111 369.167101,8.5 368.75,8.5 L368,8.5 Z M346.508152,6 C345.951365,6 345.5,6.45699692 345.5,7.00844055 L345.5,13.4915594 C345.5,14.0485058 345.949058,14.5 346.508152,14.5 L365.991848,14.5 C366.548635,14.5 367,14.0430031 367,13.4915594 L367,7.00844055 C367,6.45149422 366.550942,6 365.991848,6 L346.508152,6 Z M346.50965,6.5 C346.228178,6.5 346,6.71637201 346,6.99209595 L346,13.5079041 C346,13.7796811 346.227653,14 346.50965,14 L356,14 L356,6.5 L346.50965,6.5 Z' id='Battery'></path> </g> </g> </svg>",
  batteryLow: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='25px' height='10px' viewBox='0 0 25 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <title>Battery</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Status-Bar/Black/20%' transform='translate(-345.000000, -5.000000)' fill='#030303'> <path d='M346.493713,5.5 C345.668758,5.5 345,6.16802155 345,7.00530324 L345,13.4946968 C345,14.3260528 345.67338,15 346.493713,15 L366.006287,15 C366.831242,15 367.5,14.3319784 367.5,13.4946968 L367.5,7.00530324 C367.5,6.17394722 366.82662,5.5 366.006287,5.5 L346.493713,5.5 L346.493713,5.5 Z M368,8.5 L368,12 L368.75,12 C369.164214,12 369.5,11.6644053 369.5,11.25774 L369.5,9.24225998 C369.5,8.83232111 369.167101,8.5 368.75,8.5 L368,8.5 L368,8.5 Z M346.508152,6 C345.951365,6 345.5,6.45699692 345.5,7.00844055 L345.5,13.4915594 C345.5,14.0485058 345.949058,14.5 346.508152,14.5 L365.991848,14.5 C366.548635,14.5 367,14.0430031 367,13.4915594 L367,7.00844055 C367,6.45149422 366.550942,6 365.991848,6 L346.508152,6 Z M346.490479,6.5 C346.219595,6.5 346,6.71637201 346,6.99209595 L346,13.5079041 C346,13.7796811 346.215057,14 346.490479,14 L350,14 L350,6.5 L346.490479,6.5 Z' id='Battery'></path> </g> </g> </svg>",
  bannerBG: {
    "iphone-5": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='320px' height='68px' viewBox='0 0 320 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>iphone5</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPhone-5/5S/5C' fill='#1A1A1C'> <path d='M0,0 L320,0 L320,68 L0,68 L0,0 Z M142,61.0048815 C142,59.897616 142.896279,59 144.0024,59 L176.9976,59 C178.103495,59 179,59.8938998 179,61.0048815 L179,61.9951185 C179,63.102384 178.103721,64 176.9976,64 L144.0024,64 C142.896505,64 142,63.1061002 142,61.9951185 L142,61.0048815 Z' id='iphone5'></path> </g> </g> </svg>",
    "iphone-6s": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='375px' height='68px' viewBox='0 0 375 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6 (26304) - http://www.bohemiancoding.com/sketch --> <title>Notification background</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iOS8-Push-Notification' transform='translate(-58.000000, -23.000000)' fill='#1A1A1C'> <g transform='translate(58.000000, 7.000000)' id='Notification-container'> <g> <path d='M0,16 L375,16 L375,84 L0,84 L0,16 Z M169,77.0048815 C169,75.897616 169.896279,75 171.0024,75 L203.9976,75 C205.103495,75 206,75.8938998 206,77.0048815 L206,77.9951185 C206,79.102384 205.103721,80 203.9976,80 L171.0024,80 C169.896505,80 169,79.1061002 169,77.9951185 L169,77.0048815 Z' id='Notification-background'></path> </g> </g> </g> </g> </svg>",
    "iphone-6s-plus": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='414px' height='68px' viewBox='0 0 414 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6 (26304) - http://www.bohemiancoding.com/sketch --> <title>Notification background Copy</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iOS8-Push-Notification' transform='translate(-43.000000, -74.000000)' fill='#1A1A1C'> <g transform='translate(43.000000, 74.000000)' id='Notification-container'> <g> <path d='M0,0 L414,0 L414,68 L0,68 L0,0 Z M189,61.0048815 C189,59.897616 189.896279,59 191.0024,59 L223.9976,59 C225.103495,59 226,59.8938998 226,61.0048815 L226,61.9951185 C226,63.102384 225.103721,64 223.9976,64 L191.0024,64 C189.896505,64 189,63.1061002 189,61.9951185 L189,61.0048815 Z' id='Notification-background-Copy'></path> </g> </g> </g> </g> </svg>",
    "ipad": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='768px' height='68px' viewBox='0 0 768 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>ipad-portrait</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPad-Portrait' fill='#1A1A1C'> <path d='M0,0 L768,0 L768,68 L0,68 L0,0 Z M366,61.0048815 C366,59.897616 366.896279,59 368.0024,59 L400.9976,59 C402.103495,59 403,59.8938998 403,61.0048815 L403,61.9951185 C403,63.102384 402.103721,64 400.9976,64 L368.0024,64 C366.896505,64 366,63.1061002 366,61.9951185 L366,61.0048815 Z' id='ipad-portrait'></path> </g> </g> </svg>",
    "ipad-pro": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='1024px' height='68px' viewBox='0 0 1024 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>ipad-pro-portrait</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPad-Pro-Portrait' fill='#1A1A1C'> <path d='M0,0 L1024,0 L1024,68 L0,68 L0,0 Z M494,61.0048815 C494,59.897616 494.896279,59 496.0024,59 L528.9976,59 C530.103495,59 531,59.8938998 531,61.0048815 L531,61.9951185 C531,63.102384 530.103721,64 528.9976,64 L496.0024,64 C494.896505,64 494,63.1061002 494,61.9951185 L494,61.0048815 Z' id='ipad-pro-portrait'></path> </g> </g> </svg>"
  },
  emojiCodes: ["98 80", "98 AC", "98 81", "98 82", "98 83", "98 84", "98 85", "98 86", "98 87", "98 89", "98 8a", "99 82", "99 83", "E2 98 BA EF B8 8F", "98 8B", "98 8C", "98 8D", "98 98", "98 97", "98 99", "98 9A", "98 9C", "98 9D", "98 9B", "A4 91", "A4 93", "98 8E", "A4 97", "98 8F", "98 B6", "98 90", "98 91", "98 92", "99 84", "A4 94", "98 B3", "98 9E", "98 9F", "98 A0", "98 A1", "98 94", "98 95", "99 81", "E2 98 B9 EF B8 8F", "98 A3", "98 96", "98 AB", "98 A9", "98 A4", "98 AE", "98 B1", "98 A8", "98 B0", "98 AF", "98 A6", "98 A7", "98 A2", "98 A5", "98 AA", "98 93", "98 AD", "98 B5", "98 B2", "A4 90", "98 B7", "A4 92", "A4 95", "98 B4", "92 A4", "92 A9", "98 88", "91 BF", "91 B9", "91 BA", "92 80", "91 BB", "91 BD", "A4 96", "98 BA", "98 B8", "98 B9", "98 BB", "98 BC", "98 BD", "99 80", "98 BF", "98 BE", "99 8C", "91 8F", "91 8B", "91 8D", "91 8E", "91 8A", "E2 9C 8A", "E2 9C 8C EF B8 8F", "91 8C", "E2 9C 8B", "91 90", "92 AA", "99 8F", "E2 98 9D EF B8 8F", "91 86", "91 87", "91 88", "91 89", "96 95", "96 90", "A4 98", "96 96", "E2 9C 8D EF B8 8F", "92 85", "91 84", "91 85", "91 82", "91 83", "91 81", "91 80", "91 A4", "91 A5", "97 A3", "91 B6", "91 A6", "91 A7", "91 A8", "91 A9", "91 B1", "91 B4", "91 B5", "91 B2", "91 B3", "91 AE", "91 B7", "92 82", "95 B5", "8E 85", "91 BC", "91 B8", "91 B0", "9A B6", "8F 83", "92 83", "91 AF", "91 AB", "91 AC", "91 AD", "99 87", "92 81", "99 85", "99 86", "99 8B", "99 8E", "99 8D", "92 87", "92 86", "92 91", "91 A9 E2 80 8D E2 9D A4 EF B8 8F E2 80 8D F0 9F 91 A9", "91 A8 E2 80 8D E2 9D A4 EF B8 8F E2 80 8D F0 9F 91 A8", "92 8F", "91 A9 E2 80 8D E2 9D A4 EF B8 8F E2 80 8D F0 9F 92 8B E2 80 8D F0 9F 91 A9", "91 A8 E2 80 8D E2 9D A4 EF B8 8F E2 80 8D F0 9F 92 8B E2 80 8D F0 9F 91 A8", "91 AA", "91 A8 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7", "91 A8 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A6 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A7", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A6", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A6", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A6 E2 80 8D F0 9F 91 A6", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A7", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A7", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A6 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A7", "91 9A", "91 95", "91 96", "91 94", "91 97", "91 99", "91 98", "92 84", "92 8B", "91 A3", "91 A0", "91 A1", "91 A2", "91 9E", "91 9F", "91 92", "8E A9", "E2 9B 91", "8E 93", "91 91", "8E 92", "91 9D", "91 9B", "91 9C", "92 BC", "91 93", "95 B6", "92 8D", "8C 82", "9B 91", "90 B6", "90 B1", "90 AD", "90 B9", "90 B0", "90 BB", "90 BC", "90 A8", "90 AF", "A6 81", "90 AE", "90 B7", "90 BD", "90 B8", "90 99", "90 B5", "99 88", "99 89", "99 8A", "90 92", "90 94", "90 A7", "90 A6", "90 A4", "90 A3", "90 A5", "90 BA", "90 97", "90 B4", "A6 84", "90 9D", "90 9B", "90 8C", "90 9E", "90 9C", "95 B7", "A6 82", "A6 80", "90 8D", "90 A2", "90 A0", "90 9F", "90 A1", "90 AC", "90 B3", "90 8B", "90 8A", "90 86", "90 85", "90 83", "90 82", "90 84", "90 AA", "90 AB", "90 98", "90 90", "90 8F", "90 91", "90 8E", "90 96", "90 80", "90 81", "90 93", "A6 83", "95 8A", "90 95", "90 A9", "90 88", "90 87", "90 BF", "90 BE", "90 89", "90 B2", "8C B5", "8E 84", "8C B2", "8C B3", "8C B4", "8C B1", "8C BF", "E2 98 98", "8D 80", "8E 8D", "8E 8B", "8D 83", "8D 82", "8D 81", "8C BE", "8C BA", "8C BA", "8C BB", "8C B9", "8C B7", "8C BC", "8C B8", "92 90", "8D 84", "8C B0", "8E 83", "90 9A", "95 B8", "8C 8E", "8C 8D", "8C 8F", "8C 95", "8C 96", "8C 97", "8C 98", "8C 91", "8C 92", "8C 93", "8C 94", "8C 9A", "8C 9D", "8C 9B", "8C 9C", "8C 9E", "8C 99", "E2 AD 90 EF B8 8F", "8C 9F", "92 AB", "E2 9C A8", "E2 98 84 EF B8 8F", "E2 98 80 EF B8 8F", "8C A4", "E2 9B 85 EF B8 8F", "8C A5", "8C A6", "E2 98 81 EF B8 8F", "8C A7", "E2 9B 88", "8C A9", "E2 9A A1 EF B8 8F", "94 A5", "92 A5", "E2 9D 84 EF B8 8F", "8C A8", "E2 98 83 EF B8 8F", "E2 9B 84 EF B8 8F", "8C AC", "92 A8", "8C AA", "8C AB", "E2 98 82 EF B8 8F", "E2 98 94 EF B8 8F", "92 A7", "92 A6", "8C 8A", "9B 91", "9B 91", "8D 8F", "8D 8E", "8D 90", "8D 8A", "8D 8B", "8D 8C", "8D 89", "8D 87", "8D 93", "8D 88", "8D 92", "8D 91", "8D 8D", "8D 85", "8D 86", "8C B6", "8C BD", "8D A0", "8D AF", "8D 9E", "A7 80", "8D 97", "8D 96", "8D A4", "8D B3", "8D 94", "8D 9F", "8C AD", "8D 95", "8D 9D", "8C AE", "8C AF", "8D 9C", "8D B2", "8D A5", "8D A3", "8D B1", "8D 9B", "8D 99", "8D 9A", "8D 98", "8D A2", "8D A1", "8D A7", "8D A8", "8D A6", "8D B0", "8E 82", "8D AE", "8D AC", "8D AD", "8D AB", "8D BF", "8D A9", "8D AA", "8D BA", "8D BB", "8D B7", "8D B8", "8D B9", "8D BE", "8D B6", "8D B5", "E2 98 95 EF B8 8F", "8D BC", "8D B4", "8D BD", "9B 91", "9B 91", "9B 91", "E2 9A BD EF B8 8F", "8F 80", "8F 88", "E2 9A BE EF B8 8F", "8E BE", "8F 90", "8F 89", "8E B1", "E2 9B B3 EF B8 8F", "8F 8C", "8F 93", "8F B8", "8F 92", "8F 91", "8F 8F", "8E BF", "E2 9B B7", "8F 82", "E2 9B B8", "8F B9", "8E A3", "9A A3", "8F 8A", "8F 84", "9B 80", "E2 9B B9", "8F 8B", "9A B4", "9A B5", "8F 87", "95 B4", "8F 86", "8E BD", "8F 85", "8E 96", "8E 97", "8F B5", "8E AB", "8E 9F", "8E AD", "8E A8", "8E AA", "8E A4", "8E A7", "8E BC", "8E B9", "8E B7", "8E BA", "8E B8", "8E BB", "8E AC", "8E AE", "91 BE", "8E AF", "8E B2", "8E B0", "8E B3", "9B 91", "9B 91", "9B 91", "9A 97", "9A 95", "9A 99", "9A 8C", "9A 8E", "8F 8E", "9A 93", "9A 91", "9A 92", "9A 90", "9A 9A", "9A 9B", "9A 9C", "8F 8D", "9A B2", "9A A8", "9A 94", "9A 8D", "9A 98", "9A 96", "9A A1", "9A A0", "9A AF", "9A 83", "9A 8B", "9A 9D", "9A 84", "9A 85", "9A 88", "9A 9E", "9A 82", "9A 86", "9A 87", "9A 8A", "9A 89", "9A 81", "9B A9", "E2 9C 88 EF B8 8F", "9B AB", "9B AC", "E2 9B B5 EF B8 8F", "9B A5", "9A A4", "E2 9B B4", "9B B3", "9A 80", "9B B0", "92 BA", "E2 9A 93 EF B8 8F", "9A A7", "E2 9B BD EF B8 8F", "9A 8F", "9A A6", "9A A5", "8F 81", "9A A2", "8E A1", "8E A2", "8E A0", "8F 97", "8C 81", "97 BC", "8F AD", "E2 9B B2 EF B8 8F", "8E 91", "E2 9B B0", "8F 94", "97 BB", "8C 8B", "97 BE", "8F 95", "E2 9B BA EF B8 8F", "8F 9E", "9B A3", "9B A4", "8C 85", "8C 84", "8F 9C", "8F 96", "8F 9D", "8C 87", "8C 86", "8F 99", "8C 83", "8C 89", "8C 8C", "8C A0", "8E 87", "8E 86", "8C 88", "8F 98", "8F B0", "8F AF", "8F 9F", "97 BD", "8F A0", "8F A1", "8F 9A", "8F A2", "8F AC", "8F A3", "8F A4", "8F A5", "8F A6", "8F A8", "8F AA", "8F AB", "8F A9", "92 92", "8F 9B", "E2 9B AA EF B8 8F", "95 8C", "95 8D", "95 8B", "E2 9B A9", "E2 8C 9A EF B8 8F", "93 B1", "93 B2", "92 BB", "E2 8C A8 EF B8 8F", "96 A5", "96 A8", "96 B1", "96 B2", "95 B9", "97 9C", "92 BD", "92 BE", "92 BF", "93 80", "93 BC", "93 B7", "93 B8", "93 B9", "8E A5", "93 BD", "8E 9E", "93 9E", "E2 98 8E EF B8 8F", "93 9F", "93 A0", "93 BA", "93 BB", "8E 99", "8E 9A", "8E 9B", "E2 8F B1", "E2 8F B2", "E2 8F B0", "95 B0", "E2 8F B3", "E2 8C 9B EF B8 8F", "93 A1", "94 8B", "94 8C", "92 A1", "94 A6", "95 AF", "97 91", "9B A2", "92 B8", "92 B5", "92 B4", "92 B6", "92 B7", "92 B0", "92 B3", "92 8E", "E2 9A 96", "94 A7", "94 A8", "E2 9A 92", "9B A0", "E2 9B 8F", "94 A9", "E2 9A 99", "E2 9B 93", "94 AB", "92 A3", "94 AA", "97 A1", "E2 9A 94", "9B A1", "9A AC", "E2 98 A0 EF B8 8F", "E2 9A B0", "E2 9A B1", "8F BA", "94 AE", "93 BF", "92 88", "E2 9A 97", "94 AD", "94 AC", "95 B3", "92 8A", "92 89", "8C A1", "8F B7", "94 96", "9A BD", "9A BF", "9B 81", "94 91", "97 9D", "9B 8B", "9B 8C", "9B 8F", "9A AA", "9B 8E", "96 BC", "97 BA", "E2 9B B1", "97 BF", "9B 8D", "8E 88", "8E 8F", "8E 80", "8E 81", "8E 8A", "8E 89", "8E 8E", "8E 90", "8E 8C", "8F AE", "E2 9C 89 EF B8 8F", "93 A9", "93 A8", "93 A7", "92 8C", "93 AE", "93 AA", "93 AB", "93 AC", "93 AD", "93 A6", "93 AF", "93 A5", "93 A4", "93 9C", "93 83", "93 91", "93 8A", "93 88", "93 89", "93 84", "93 85", "93 86", "97 93", "93 87", "97 83", "97 B3", "97 84", "93 8B", "97 92", "93 81", "93 82", "97 82", "97 9E", "93 B0", "93 93", "93 95", "93 97", "93 98", "93 99", "93 94", "93 92", "93 9A", "93 96", "94 97", "93 8E", "96 87", "E2 9C 82 EF B8 8F", "93 90", "93 8F", "93 8C", "93 8D", "9A A9", "8F B3", "8F B4", "94 90", "94 92", "94 93", "94 8F", "96 8A", "96 8B", "E2 9C 92 EF B8 8F", "93 9D", "E2 9C 8F EF B8 8F", "96 8D", "96 8C", "94 8D", "94 8E", "9B 91", "9B 91", "E2 9D A4 EF B8 8F", "92 9B", "92 9A", "92 99", "92 9C", "92 94", "E2 9D A3 EF B8 8F", "92 95", "92 9E", "92 93", "92 97", "92 96", "92 98", "92 9D", "92 9F", "E2 98 AE EF B8 8F", "E2 9C 9D EF B8 8F", "E2 98 AA EF B8 8F", "95 89", "E2 98 B8 EF B8 8F", "E2 9C A1 EF B8 8F", "94 AF", "95 8E", "E2 98 AF EF B8 8F", "E2 98 A6 EF B8 8F", "9B 90", "E2 9B 8E", "E2 99 88 EF B8 8F", "E2 99 89 EF B8 8F", "E2 99 8A EF B8 8F", "E2 99 8B EF B8 8F", "E2 99 8C EF B8 8F", "E2 99 8D EF B8 8F", "E2 99 8E EF B8 8F", "E2 99 8F EF B8 8F", "E2 99 90 EF B8 8F", "E2 99 91 EF B8 8F", "E2 99 92 EF B8 8F", "E2 99 93 EF B8 8F", "86 94", "E2 9A 9B", "88 B3", "88 B9", "E2 98 A2 EF B8 8F", "E2 98 A3 EF B8 8F", "93 B4", "93 B3", "88 B6", "88 9A EF B8 8F", "88 B8", "88 BA", "88 B7 EF B8 8F", "E2 9C B4 EF B8 8F", "86 9A", "89 91", "92 AE", "89 90", "E3 8A 99 EF B8 8F", "E3 8A 97 EF B8 8F", "88 B4", "88 B5", "88 B2", "85 B0 EF B8 8F", "85 B1 EF B8 8F", "86 8E", "86 91", "85 BE EF B8 8F", "86 98", "E2 9B 94 EF B8 8F", "93 9B", "9A AB", "E2 9D 8C", "E2 AD 95 EF B8 8F", "92 A2", "E2 99 A8 EF B8 8F", "9A B7", "9A AF", "9A B3", "9A B1", "94 9E", "93 B5", "E2 9D 97 EF B8 8F", "E2 9D 95", "E2 9D 93", "E2 9D 94", "E2 80 BC EF B8 8F", "E2 81 89 EF B8 8F", "92 AF", "94 85", "94 86", "94 B1", "E2 9A 9C", "E3 80 BD EF B8 8F", "E2 9A A0 EF B8 8F", "9A B8", "94 B0", "E2 99 BB EF B8 8F", "88 AF EF B8 8F", "92 B9", "E2 9D 87 EF B8 8F", "E2 9C B3 EF B8 8F", "E2 9D 8E", "E2 9C 85", "92 A0", "8C 80", "E2 9E BF", "8C 90", "E2 93 82 EF B8 8F", "8F A7", "88 82 EF B8 8F", "9B 82", "9B 83", "9B 84", "9B 85", "E2 99 BF EF B8 8F", "9A AD", "9A BE", "85 BF EF B8 8F", "9A B0", "9A B9", "9A BA", "9A BC", "9A BB", "9A AE", "8E A6", "93 B6", "88 81", "86 96", "86 97", "86 99", "86 92", "86 95", "86 93", "30 EF B8 8F E2 83 A3", "31 EF B8 8F E2 83 A3", "32 EF B8 8F E2 83 A3", "33 EF B8 8F E2 83 A3", "34 EF B8 8F E2 83 A3", "35 EF B8 8F E2 83 A3", "36 EF B8 8F E2 83 A3", "37 EF B8 8F E2 83 A3", "38 EF B8 8F E2 83 A3", "39 EF B8 8F E2 83 A3", "94 9F", "94 A2", "E2 96 B6 EF B8 8F", "E2 8F B8", "E2 8F AF", "E2 8F B9", "E2 8F BA", "E2 8F AD", "E2 8F AE", "E2 8F A9", "E2 8F AA", "94 80", "94 81", "94 82", "E2 97 80 EF B8 8F", "94 BC", "94 BD", "E2 8F AB", "E2 8F AC", "E2 9E A1 EF B8 8F", "E2 AC 85 EF B8 8F", "E2 AC 86 EF B8 8F", "E2 AC 87 EF B8 8F", "E2 86 97 EF B8 8F", "E2 86 98 EF B8 8F", "E2 86 99 EF B8 8F", "E2 86 96 EF B8 8F", "E2 86 95 EF B8 8F", "E2 86 94 EF B8 8F", "94 84", "E2 86 AA EF B8 8F", "E2 86 A9 EF B8 8F", "E2 A4 B4 EF B8 8F", "E2 A4 B5 EF B8 8F", "23 EF B8 8F E2 83 A3", "2A EF B8 8F E2 83 A3", "E2 84 B9 EF B8 8F", "94 A4", "94 A1", "94 A0", "94 A3", "8E B5", "8E B6", "E3 80 B0 EF B8 8F", "E2 9E B0", "E2 9C 94 EF B8 8F", "94 83", "E2 9E 95", "E2 9E 96", "E2 9E 97", "E2 9C 96 EF B8 8F", "92 B2", "92 B1", "C2 A9 EF B8 8F", "C2 AE EF B8 8F", "E2 84 A2 EF B8 8F", "94 9A", "94 99", "94 9B", "94 9D", "94 9C", "E2 98 91 EF B8 8F", "94 98", "E2 9A AA EF B8 8F", "E2 9A AB EF B8 8F", "94 B4", "94 B5", "94 B8", "94 B9", "94 B6", "94 B7", "94 BA", "E2 96 AA EF B8 8F", "E2 96 AB EF B8 8F", "E2 AC 9B EF B8 8F", "E2 AC 9C EF B8 8F", "94 BB", "E2 97 BC EF B8 8F", "E2 97 BB EF B8 8F", "E2 97 BE EF B8 8F", "E2 97 BD EF B8 8F", "94 B2", "94 B3", "94 88", "94 89", "94 8A", "94 87", "93 A3", "93 A2", "94 94", "94 95", "83 8F", "80 84 EF B8 8F", "E2 99 A0 EF B8 8F", "E2 99 A3 EF B8 8F", "E2 99 A5 EF B8 8F", "E2 99 A6 EF B8 8F", "8E B4", "91 81 E2 80 8D F0 9F 97 A8", "92 AD", "97 AF", "92 AC", "95 90", "95 91", "95 92", "95 93", "95 94", "95 95", "95 96", "95 97", "95 98", "95 99", "95 9A", "95 9B", "95 9C", "95 9D", "95 9E", "95 9F", "95 A0", "95 A1", "95 A2", "95 A3", "95 A4", "95 A5", "95 A6", "95 A7", "9B 91", "87 A6 F0 9F 87 AB", "87 A6 F0 9F 87 BD", "87 A6 F0 9F 87 B1", "87 A9 F0 9F 87 BF", "87 A6 F0 9F 87 B8", "87 A6 F0 9F 87 A9", "87 A6 F0 9F 87 B4", "87 A6 F0 9F 87 AE", "87 A6 F0 9F 87 B6", "87 A6 F0 9F 87 AC", "87 A6 F0 9F 87 B7", "87 A6 F0 9F 87 B2", "87 A6 F0 9F 87 BC", "87 A6 F0 9F 87 BA", "87 A6 F0 9F 87 B9", "87 A6 F0 9F 87 BF", "87 A7 F0 9F 87 B8", "87 A7 F0 9F 87 AD", "87 A7 F0 9F 87 A9", "87 A7 F0 9F 87 A7", "87 A7 F0 9F 87 BE", "87 A7 F0 9F 87 AA", "87 A7 F0 9F 87 BF", "87 A7 F0 9F 87 AF", "87 A7 F0 9F 87 B2", "87 A7 F0 9F 87 B9", "87 A7 F0 9F 87 B4", "87 A7 F0 9F 87 B6", "87 A7 F0 9F 87 A6", "87 A7 F0 9F 87 BC", "87 A7 F0 9F 87 B7", "87 AE F0 9F 87 B4", "87 BB F0 9F 87 AC", "87 A7 F0 9F 87 B3", "87 A7 F0 9F 87 AC", "87 A7 F0 9F 87 AB", "87 A7 F0 9F 87 AE", "87 A8 F0 9F 87 BB", "87 B0 F0 9F 87 AD", "87 A8 F0 9F 87 B2", "87 A8 F0 9F 87 A6", "87 AE F0 9F 87 A8", "87 B0 F0 9F 87 BE", "87 A8 F0 9F 87 AB", "87 B9 F0 9F 87 A9", "87 A8 F0 9F 87 B1", "87 A8 F0 9F 87 B3", "87 A8 F0 9F 87 BD", "87 A8 F0 9F 87 A8", "87 A8 F0 9F 87 B4", "87 B0 F0 9F 87 B2", "87 A8 F0 9F 87 AC", "87 A8 F0 9F 87 A9", "87 A8 F0 9F 87 B0", "87 A8 F0 9F 87 B7", "87 AD F0 9F 87 B7", "87 A8 F0 9F 87 BA", "87 A8 F0 9F 87 BC", "87 A8 F0 9F 87 BE", "87 A8 F0 9F 87 BF", "87 A9 F0 9F 87 B0", "87 A9 F0 9F 87 AF", "87 A9 F0 9F 87 B2", "87 A9 F0 9F 87 B4", "87 AA F0 9F 87 A8", "87 AA F0 9F 87 AC", "87 B8 F0 9F 87 BB", "87 AC F0 9F 87 B6", "87 AA F0 9F 87 B7", "87 AA F0 9F 87 AA", "87 AA F0 9F 87 B9", "87 AA F0 9F 87 BA", "87 AB F0 9F 87 B0", "87 AB F0 9F 87 B4", "87 AB F0 9F 87 AF", "87 AB F0 9F 87 AE", "87 AB F0 9F 87 B7", "87 AC F0 9F 87 AB", "87 B5 F0 9F 87 AB", "87 B9 F0 9F 87 AB", "87 AC F0 9F 87 A6", "87 AC F0 9F 87 B2", "87 AC F0 9F 87 AA", "87 A9 F0 9F 87 AA", "87 AC F0 9F 87 AD", "87 AC F0 9F 87 AE", "87 AC F0 9F 87 B7", "87 AC F0 9F 87 B1", "87 AC F0 9F 87 A9", "87 AC F0 9F 87 B5", "87 AC F0 9F 87 BA", "87 AC F0 9F 87 B9", "87 AC F0 9F 87 AC", "87 AC F0 9F 87 B3", "87 AC F0 9F 87 BC", "87 AC F0 9F 87 BE", "87 AD F0 9F 87 B9", "87 AD F0 9F 87 B3", "87 AD F0 9F 87 B0", "87 AD F0 9F 87 BA", "87 AE F0 9F 87 B8", "87 AE F0 9F 87 B3", "87 AE F0 9F 87 A9", "87 AE F0 9F 87 B7", "87 AE F0 9F 87 B6", "87 AE F0 9F 87 AA", "87 AE F0 9F 87 B2", "87 AE F0 9F 87 B1", "87 AE F0 9F 87 B9", "87 A8 F0 9F 87 AE", "87 AF F0 9F 87 B2", "87 AF F0 9F 87 B5", "87 AF F0 9F 87 AA", "87 AF F0 9F 87 B4", "87 B0 F0 9F 87 BF", "87 B0 F0 9F 87 AA", "87 B0 F0 9F 87 AE", "87 BD F0 9F 87 B0", "87 B0 F0 9F 87 BC", "87 B0 F0 9F 87 AC", "87 B1 F0 9F 87 A6", "87 B1 F0 9F 87 BB", "87 B1 F0 9F 87 A7", "87 B1 F0 9F 87 B8", "87 B1 F0 9F 87 B7", "87 B1 F0 9F 87 BE", "87 B1 F0 9F 87 AE", "87 B1 F0 9F 87 B9", "87 B1 F0 9F 87 BA", "87 B2 F0 9F 87 B4", "87 B2 F0 9F 87 B0", "87 B2 F0 9F 87 AC", "87 B2 F0 9F 87 BC", "87 B2 F0 9F 87 BE", "87 B2 F0 9F 87 BB", "87 B2 F0 9F 87 B1", "87 B2 F0 9F 87 B9", "87 B2 F0 9F 87 AD", "87 B2 F0 9F 87 B6", "87 B2 F0 9F 87 B7", "87 B2 F0 9F 87 BA", "87 BE F0 9F 87 B9", "87 B2 F0 9F 87 BD", "87 AB F0 9F 87 B2", "87 B2 F0 9F 87 A9", "87 B2 F0 9F 87 A8", "87 B2 F0 9F 87 B3", "87 B2 F0 9F 87 AA", "87 B2 F0 9F 87 B8", "87 B2 F0 9F 87 A6", "87 B2 F0 9F 87 BF", "87 B2 F0 9F 87 B2", "87 B3 F0 9F 87 A6", "87 B3 F0 9F 87 B7", "87 B3 F0 9F 87 B5", "87 B3 F0 9F 87 B1", "87 B3 F0 9F 87 A8", "87 B3 F0 9F 87 BF", "87 B3 F0 9F 87 AE", "87 B3 F0 9F 87 AA", "87 B3 F0 9F 87 AC", "87 B3 F0 9F 87 BA", "87 B3 F0 9F 87 AB", "87 B2 F0 9F 87 B5", "87 B0 F0 9F 87 B5", "87 B3 F0 9F 87 B4", "87 B4 F0 9F 87 B2", "87 B5 F0 9F 87 B0", "87 B5 F0 9F 87 BC", "87 B5 F0 9F 87 B8", "87 B5 F0 9F 87 A6", "87 B5 F0 9F 87 AC", "87 B5 F0 9F 87 BE", "87 B5 F0 9F 87 AA", "87 B5 F0 9F 87 AD", "87 B5 F0 9F 87 B3", "87 B5 F0 9F 87 B1", "87 B5 F0 9F 87 B9", "87 B5 F0 9F 87 B7", "87 B6 F0 9F 87 A6", "87 B7 F0 9F 87 AA", "87 B7 F0 9F 87 B4", "87 B7 F0 9F 87 BA", "87 B7 F0 9F 87 BC", "87 A7 F0 9F 87 B1", "87 B8 F0 9F 87 AD", "87 B0 F0 9F 87 B3", "87 B1 F0 9F 87 A8", "87 B5 F0 9F 87 B2", "87 BB F0 9F 87 A8", "87 BC F0 9F 87 B8", "87 B8 F0 9F 87 B2", "87 B8 F0 9F 87 B9", "87 B8 F0 9F 87 A6", "87 B8 F0 9F 87 B3", "87 B7 F0 9F 87 B8", "87 B8 F0 9F 87 A8", "87 B8 F0 9F 87 B1", "87 B8 F0 9F 87 AC", "87 B8 F0 9F 87 BD", "87 B8 F0 9F 87 B0", "87 B8 F0 9F 87 AE", "87 B8 F0 9F 87 A7", "87 B8 F0 9F 87 B4", "87 BF F0 9F 87 A6", "87 AC F0 9F 87 B8", "87 B0 F0 9F 87 B7", "87 B8 F0 9F 87 B8", "87 AA F0 9F 87 B8", "87 B1 F0 9F 87 B0", "87 B8 F0 9F 87 A9", "87 B8 F0 9F 87 B7", "87 B8 F0 9F 87 BF", "87 B8 F0 9F 87 AA", "87 A8 F0 9F 87 AD", "87 B8 F0 9F 87 BE", "87 B9 F0 9F 87 BC", "87 B9 F0 9F 87 AF", "87 B9 F0 9F 87 BF", "87 B9 F0 9F 87 AD", "87 B9 F0 9F 87 B1", "87 B9 F0 9F 87 AC", "87 B9 F0 9F 87 B0", "87 B9 F0 9F 87 B4", "87 B9 F0 9F 87 B9", "87 B9 F0 9F 87 B3", "87 B9 F0 9F 87 B7", "87 B9 F0 9F 87 B2", "87 B9 F0 9F 87 A8", "87 B9 F0 9F 87 BB", "87 BA F0 9F 87 AC", "87 BA F0 9F 87 A6", "87 A6 F0 9F 87 AA", "87 AC F0 9F 87 A7", "87 BA F0 9F 87 B8", "87 BB F0 9F 87 AE", "87 BA F0 9F 87 BE", "87 BA F0 9F 87 BF", "87 BB F0 9F 87 BA", "87 BB F0 9F 87 A6", "87 BB F0 9F 87 AA", "87 BB F0 9F 87 B3", "87 BC F0 9F 87 AB", "87 AA F0 9F 87 AD", "87 BE F0 9F 87 AA", "87 BF F0 9F 87 B2", "87 BF F0 9F 87 BC"],
  network: "<svg width='14px' height='10px' viewBox='87 5 14 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs></defs> <path d='M96.1444208,12.4385043 C95.626374,11.8454456 94.8523616,11.4689119 93.987563,11.4689119 C93.1390073,11.4689119 92.3778594,11.8314341 91.8601652,12.4053177 L94.0225391,14.5 L96.1444208,12.4385043 Z M98.3234964,10.3214425 C97.2447794,9.19174563 95.7014387,8.48445596 93.987563,8.48445596 C92.2882723,8.48445596 90.7566264,9.17975893 89.6792698,10.2926936 L90.7692987,11.3486 C91.567205,10.5053708 92.713648,9.97668394 93.987563,9.97668394 C95.2768836,9.97668394 96.4356305,10.518235 97.2346215,11.3793293 L98.3234964,10.3214425 L98.3234964,10.3214425 Z M100.5,8.20687933 C98.8629578,6.53943672 96.5505699,5.5 93.987563,5.5 C91.4375103,5.5 89.1355496,6.52895605 87.5,8.18164431 L88.5895579,9.23709441 C89.9460798,7.85431655 91.8628921,6.99222798 93.987563,6.99222798 C96.1260026,6.99222798 98.0538809,7.86552609 99.4118698,9.26404272 L100.5,8.20687933 Z' id='Wi-Fi' stroke='none' fill='#030303' fill-rule='evenodd'></path> </svg>",
  activity: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Soccer Ball</title> <desc>Created with Sketch.</desc> <defs> <circle id='path-1' cx='8' cy='8' r='8'></circle> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-179.000000, -639.000000)'> <g id='Soccer-Ball' sketch:type='MSLayerGroup' transform='translate(179.000000, 639.000000)'> <mask id='mask-2' sketch:name='Mask' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='Mask' stroke='#4A5361' sketch:type='MSShapeGroup' xlink:href='#path-1'></use> <path d='M6,12.1203046 L12.8573384,8 L13.3723765,8.8571673 L6.51503807,12.9774719 L6,12.1203046 L6,12.1203046 Z' id='Rectangle-47' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.849648,8.7260551 L19.1001103,5.34510901 L19.5227285,6.2514168 L12.2722662,9.63236289 L11.849648,8.7260551 L11.849648,8.7260551 Z' id='Rectangle-47-Copy-3' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M6,3.1203046 L12.8573384,-1 L13.3723765,-0.142832699 L6.51503807,3.9774719 L6,3.1203046 L6,3.1203046 Z' id='Rectangle-47-Copy-2' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M-1,7.1203046 L5.85733841,3 L6.37237648,3.8571673 L-0.484961925,7.9774719 L-1,7.1203046 L-1,7.1203046 Z' id='Rectangle-47-Copy-4' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <rect id='Rectangle-50' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)' x='4' y='6' width='1' height='5'></rect> <rect id='Rectangle-51' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)' x='11.5' y='3' width='1' height='12'></rect> <path d='M5,4.8571673 L11.8573384,8.9774719 L12.3723765,8.1203046 L5.51503807,4 L5,4.8571673' id='Rectangle-47-Copy' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M5,12.8571673 L11.8573384,16.9774719 L12.3723765,16.1203046 L5.51503807,12 L5,12.8571673' id='Rectangle-47-Copy-5' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.9048972,6.14766064 L13.8714227,8.33170849 L12.4019596,10.8768933 L9.52725589,10.2658562 L9.22005445,7.34302965 L11.9048972,6.14766064' id='Polygon-1' fill='#D8D8D8' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.9048972,6.14766064 L13.8714227,8.33170849 L12.4019596,10.8768933 L9.52725589,10.2658562 L9.22005445,7.34302965 L11.9048972,6.14766064' id='Polygon-1-Copy' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M7.45771189,3.19504739 L7.35514484,6.13218333 L4.5300676,6.9422612 L2.88664089,4.5057809 L4.69602457,2.18987541 L7.45771189,3.19504739' id='Polygon-1-Copy-2' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M7.45771189,11.1950474 L7.35514484,14.1321833 L4.5300676,14.9422612 L2.88664089,12.5057809 L4.69602457,10.1898754 L7.45771189,11.1950474' id='Polygon-1-Copy-3' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M14.5431701,0.0725939314 L14.4406031,3.00972988 L11.6155258,3.81980774 L9.97209912,1.38332745 L11.7814828,-0.93257805 L14.5431701,0.0725939314' id='Polygon-1-Copy-4' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> </g> </g> </g> </svg>",
  animals: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Group</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-117.000000, -639.000000)' stroke='#4A5361'> <g id='ic_Food' sketch:type='MSLayerGroup' transform='translate(118.000000, 640.000000)'> <g id='Group' sketch:type='MSShapeGroup'> <path d='M5.68377537,1.38156646 C6.23926066,1.13624 6.85372005,1 7.5,1 C8.14627995,1 8.76073934,1.13624 9.31622463,1.38156646 C9.80879275,0.562359019 10.8255888,0 12,0 C13.6568542,0 15,1.11928813 15,2.5 C15,3.5571398 14.2126246,4.46102843 13.0999226,4.82662514 C14.2496528,5.64185422 15,6.98330062 15,8.5 C15,10.7167144 13.3971873,12.5590719 11.2872671,12.9313673 C10.4867248,14.1757703 9.08961696,15 7.5,15 C5.91038304,15 4.51327524,14.1757703 3.71273291,12.9313673 C1.60281268,12.5590719 0,10.7167144 0,8.5 C0,6.98330062 0.750347244,5.64185422 1.90007741,4.82662514 C0.787375445,4.46102843 0,3.5571398 0,2.5 C0,1.11928813 1.34314575,0 3,0 C4.17441122,0 5.19120725,0.562359019 5.68377537,1.38156646 Z' id='Oval-8'></path> <path d='M5.73834228,12 C5.86290979,12 6.14642353,12 6.14642353,12 C6.14642353,12 6.43215696,12.4426123 6.5246582,12.4919739 C6.66455601,12.5666277 7,12.4919739 7,12.4919739 L7,12 L8,12 L8,12.4919739 L8.49799228,12.4919739 L8.84301769,12 L9.3918457,12 C9.3918457,12 8.99598457,12.9839478 8.49799228,12.9839478 L6.60702407,12.9839478 C6.21404813,12.9839478 5.45996094,12 5.73834228,12 Z' id='Rectangle-44-Copy-2'></path> <circle id='Oval-14' cx='10.5' cy='7.5' r='0.5'></circle> <circle id='Oval-14-Copy' cx='4.5' cy='7.5' r='0.5'></circle> <path d='M12.6999969,5 C12.6999969,3.06700338 11.1329936,1.5 9.19999695,1.5' id='Oval-16'></path> <path d='M5.5,5 C5.5,3.06700338 3.93299662,1.5 2,1.5' id='Oval-16-Copy' transform='translate(3.750000, 3.250000) scale(-1, 1) translate(-3.750000, -3.250000) '></path> <rect id='Rectangle-44-Copy' x='7' y='11' width='1' height='1'></rect> <path d='M6,10 L6.5,10 L6.49999999,9.5 L8.50000005,9.5 L8.50000005,10 L9,10 L9,10.5 L8.5,10.5 L8.5,11 L6.5,11 L6.5,10.5 L6,10.5 L6,10 Z' id='Path'></path> </g> </g> </g> </g> </svg>",
  chevron: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='13px' height='22px' viewBox='0 0 13 22' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Back Chevron</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Navigation-Bar/Back' transform='translate(-8.000000, -31.000000)' fill='#0076FF'> <path d='M8.5,42 L19,31.5 L21,33.5 L12.5,42 L21,50.5 L19,52.5 L8.5,42 Z' id='Back-Chevron'></path> </g> </g> </svg>",
  emojis: ["😀", "😬", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😉", "😊", "🙂", "🙃", "☺️", "😋", "😌", "😍", "😘", "😗", "😙", "😚", "😜", "😝", "😛", "🤑", "🤓", "😎", "🤗", "😏", "😶", "😐", "😑", "😒", "🙄", "🤔", "😳", "😞", "😟", "😠", "😡", "😔", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😮", "😱", "😨", "😰", "😯", "😦", "😧", "😢", "😥", "😪", "😓", "😭", "😵", "😲", "🤐", "😷", "🤒", "🤕", "😴", "💤", "💩", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙌", "👏", "👋", "👍", "👎", "👊", "✊", "✌️", "👌", "✋", "👐", "💪", "🙏", "☝️", "👆", "👇", "👈", "👉", "🖕", "🖐", "🤘", "🖖", "✍️", "💅", "👄", "👅", "👂", "👃", "👁", "👀", "👤", "👥", "🗣", "👶", "👦", "👧", "👨", "👩", "👱", "👴", "👵", "👲", "👳", "👮", "👷", "💂", "🕵", "🎅", "👼", "👸", "👰", "🚶", "🏃", "💃", "👯", "👫", "👬", "👭", "🙇", "💁", "🙅", "🙆", "🙋", "🙎", "🙍", "💇", "💆", "💑", "👩‍❤️‍👩", "👨‍❤️‍👨", "💏", "👩‍❤️‍💋‍👩", "👨‍❤️‍💋‍👨", "👪", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👚", "👕", "👖", "👔", "👗", "👙", "👘", "💄", "💋", "👣", "👠", "👡", "👢", "👞", "👟", "👒", "🎩", "⛑", "🎓", "👑", "🎒", "👝", "👛", "👜", "💼", "👓", "🕶", "💍", "🌂", "🛑", "🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐙", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🐌", "🐞", "🐜", "🕷", "🦂", "🦀", "🐍", "🐢", "🐠", "🐟", "🐡", "🐬", "🐳", "🐋", "🐊", "🐆", "🐅", "🐃", "🐂", "🐄", "🐪", "🐫", "🐘", "🐐", "🐏", "🐑", "🐎", "🐖", "🐀", "🐁", "🐓", "🦃", "🕊", "🐕", "🐩", "🐈", "🐇", "🐿", "🐾", "🐉", "🐲", "🌵", "🎄", "🌲", "🌳", "🌴", "🌱", "🌿", "☘", "🍀", "🎍", "🎋", "🍃", "🍂", "🍁", "🌾", "🌺", "🌺", "🌻", "🌹", "🌷", "🌼", "🌸", "💐", "🍄", "🌰", "🎃", "🐚", "🕸", "🌎", "🌍", "🌏", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔", "🌚", "🌝", "🌛", "🌜", "🌞", "🌙", "⭐️", "🌟", "💫", "✨", "☄️", "☀️", "🌤", "⛅️", "🌥", "🌦", "☁️", "🌧", "⛈", "🌩", "⚡️", "🔥", "💥", "❄️", "🌨", "☃️", "⛄️", "🌬", "💨", "🌪", "🌫", "☂️", "☔️", "💧", "💦", "🌊", "🛑", "🛑", "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🍍", "🍅", "🍆", "🌶", "🌽", "🍠", "🍯", "🍞", "🧀", "🍗", "🍖", "🍤", "🍳", "🍔", "🍟", "🌭", "🍕", "🍝", "🌮", "🌯", "🍜", "🍲", "🍥", "🍣", "🍱", "🍛", "🍙", "🍚", "🍘", "🍢", "🍡", "🍧", "🍨", "🍦", "🍰", "🎂", "🍮", "🍬", "🍭", "🍫", "🍿", "🍩", "🍪", "🍺", "🍻", "🍷", "🍸", "🍹", "🍾", "🍶", "🍵", "☕️", "🍼", "🍴", "🍽", "🛑", "🛑", "🛑", "⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉", "🎱", "⛳️", "🏌", "🏓", "🏸", "🏒", "🏑", "🏏", "🎿", "⛷", "🏂", "⛸", "🏹", "🎣", "🚣", "🏊", "🏄", "🛀", "⛹", "🏋", "🚴", "🚵", "🏇", "🕴", "🏆", "🎽", "🏅", "🎖", "🎗", "🏵", "🎫", "🎟", "🎭", "🎨", "🎪", "🎤", "🎧", "🎼", "🎹", "🎷", "🎺", "🎸", "🎻", "🎬", "🎮", "👾", "🎯", "🎲", "🎰", "🎳", "🛑", "🛑", "🛑", "🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🏍", "🚲", "🚨", "🚔", "🚍", "🚘", "🚖", "🚡", "🚠", "🚯", "🚃", "🚋", "🚝", "🚄", "🚅", "🚈", "🚞", "🚂", "🚆", "🚇", "🚊", "🚉", "🚁", "🛩", "✈️", "🛫", "🛬", "⛵️", "🛥", "🚤", "⛴", "🛳", "🚀", "🛰", "💺", "⚓️", "🚧", "⛽️", "🚏", "🚦", "🚥", "🏁", "🚢", "🎡", "🎢", "🎠", "🏗", "🌁", "🗼", "🏭", "⛲️", "🎑", "⛰", "🏔", "🗻", "🌋", "🗾", "🏕", "⛺️", "🏞", "🛣", "🛤", "🌅", "🌄", "🏜", "🏖", "🏝", "🌇", "🌆", "🏙", "🌃", "🌉", "🌌", "🌠", "🎇", "🎆", "🌈", "🏘", "🏰", "🏯", "🏟", "🗽", "🏠", "🏡", "🏚", "🏢", "🏬", "🏣", "🏤", "🏥", "🏦", "🏨", "🏪", "🏫", "🏩", "💒", "🏛", "⛪️", "🕌", "🕍", "🕋", "⛩", "⌚️", "📱", "📲", "💻", "⌨️", "🖥", "🖨", "🖱", "🖲", "🕹", "🗜", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽", "🎞", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙", "🎚", "🎛", "⏱", "⏲", "⏰", "🕰", "⏳", "⌛️", "📡", "🔋", "🔌", "💡", "🔦", "🕯", "🗑", "🛢", "💸", "💵", "💴", "💶", "💷", "💰", "💳", "💎", "⚖", "🔧", "🔨", "⚒", "🛠", "⛏", "🔩", "⚙", "⛓", "🔫", "💣", "🔪", "🗡", "⚔", "🛡", "🚬", "☠️", "⚰", "⚱", "🏺", "🔮", "📿", "💈", "⚗", "🔭", "🔬", "🕳", "💊", "💉", "🌡", "🏷", "🔖", "🚽", "🚿", "🛁", "🔑", "🗝", "🛋", "🛌", "🛏", "🚪", "🛎", "🖼", "🗺", "⛱", "🗿", "🛍", "🎈", "🎏", "🎀", "🎁", "🎊", "🎉", "🎎", "🎐", "🎌", "🏮", "✉️", "📩", "📨", "📧", "💌", "📮", "📪", "📫", "📬", "📭", "📦", "📯", "📥", "📤", "📜", "📃", "📑", "📊", "📈", "📉", "📄", "📅", "📆", "🗓", "📇", "🗃", "🗳", "🗄", "📋", "🗒", "📁", "📂", "🗂", "🗞", "📰", "📓", "📕", "📗", "📘", "📙", "📔", "📒", "📚", "📖", "🔗", "📎", "🖇", "✂️", "📐", "📏", "📌", "📍", "🚩", "🏳", "🏴", "🔐", "🔒", "🔓", "🔏", "🖊", "🖋", "✒️", "📝", "✏️", "🖍", "🖌", "🔍", "🔎", "🛑", "🛑", "❤️", "💛", "💚", "💙", "💜", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈️", "♉️", "♊️", "♋️", "♌️", "♍️", "♎️", "♏️", "♐️", "♑️", "♒️", "♓️", "🆔", "⚛", "🈳", "🈹", "☢️", "☣️", "📴", "📳", "🈶", "🈚️", "🈸", "🈺", "🈷️", "✴️", "🆚", "🉑", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "⛔️", "📛", "🚫", "❌", "⭕️", "💢", "♨️", "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "❗️", "❕", "❓", "❔", "‼️", "⁉️", "💯", "🔅", "🔆", "🔱", "⚜", "〽️", "⚠️", "🚸", "🔰", "♻️", "🈯️", "💹", "❇️", "✳️", "❎", "✅", "💠", "🌀", "➿", "🌐", "Ⓜ️", "🏧", "🈂️", "🛂", "🛃", "🛄", "🛅", "♿️", "🚭", "🚾", "🅿️", "🚰", "🚹", "🚺", "🚼", "🚻", "🚮", "🎦", "📶", "🈁", "🆖", "🆗", "🆙", "🆒", "🆕", "🆓", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔢", "▶️", "⏸", "⏯", "⏹", "⏺", "⏭", "⏮", "⏩", "⏪", "🔀", "🔁", "🔂", "◀️", "🔼", "🔽", "⏫", "⏬", "➡️", "⬅️", "⬆️", "⬇️", "↗️", "↘️", "↙️", "↖️", "↕️", "↔️", "🔄", "↪️", "↩️", "⤴️", "⤵️", "#️⃣", "*️⃣", "ℹ️", "🔤", "🔡", "🔠", "🔣", "🎵", "🎶", "〰️", "➰", "✔️", "🔃", "➕", "➖", "➗", "✖️", "💲", "💱", "©️", "®️", "™️", "🔚", "🔙", "🔛", "🔝", "🔜", "☑️", "🔘", "⚪️", "⚫️", "🔴", "🔵", "🔸", "🔹", "🔶", "🔷", "🔺", "▪️", "▫️", "⬛️", "⬜️", "🔻", "◼️", "◻️", "◾️", "◽️", "🔲", "🔳", "🔈", "🔉", "🔊", "🔇", "📣", "📢", "🔔", "🔕", "🃏", "🀄️", "♠️", "♣️", "♥️", "♦️", "🎴", "👁‍🗨", "💭", "🗯", "💬", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛", "🕜", "🕝", "🕞", "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥", "🕦", "🕧", "🛑", "🇦🇫", "🇦🇽", "🇦🇱", "🇩🇿", "🇦🇸", "🇦🇩", "🇦🇴", "🇦🇮", "🇦🇶", "🇦🇬", "🇦🇷", "🇦🇲", "🇦🇼", "🇦🇺", "🇦🇹", "🇦🇿", "🇧🇸", "🇧🇭", "🇧🇩", "🇧🇧", "🇧🇾", "🇧🇪", "🇧🇿", "🇧🇯", "🇧🇲", "🇧🇹", "🇧🇴", "🇧🇶", "🇧🇦", "🇧🇼", "🇧🇷", "🇮🇴", "🇻🇬", "🇧🇳", "🇧🇬", "🇧🇫", "🇧🇮", "🇨🇻", "🇰🇭", "🇨🇲", "🇨🇦", "🇮🇨", "🇰🇾", "🇨🇫", "🇹🇩", "🇨🇱", "🇨🇳", "🇨🇽", "🇨🇨", "🇨🇴", "🇰🇲", "🇨🇬", "🇨🇩", "🇨🇰", "🇨🇷", "🇭🇷", "🇨🇺", "🇨🇼", "🇨🇾", "🇨🇿", "🇩🇰", "🇩🇯", "🇩🇲", "🇩🇴", "🇪🇨", "🇪🇬", "🇸🇻", "🇬🇶", "🇪🇷", "🇪🇪", "🇪🇹", "🇪🇺", "🇫🇰", "🇫🇴", "🇫🇯", "🇫🇮", "🇫🇷", "🇬🇫", "🇵🇫", "🇹🇫", "🇬🇦", "🇬🇲", "🇬🇪", "🇩🇪", "🇬🇭", "🇬🇮", "🇬🇷", "🇬🇱", "🇬🇩", "🇬🇵", "🇬🇺", "🇬🇹", "🇬🇬", "🇬🇳", "🇬🇼", "🇬🇾", "🇭🇹", "🇭🇳", "🇭🇰", "🇭🇺", "🇮🇸", "🇮🇳", "🇮🇩", "🇮🇷", "🇮🇶", "🇮🇪", "🇮🇲", "🇮🇱", "🇮🇹", "🇨🇮", "🇯🇲", "🇯🇵", "🇯🇪", "🇯🇴", "🇰🇿", "🇰🇪", "🇰🇮", "🇽🇰", "🇰🇼", "🇰🇬", "🇱🇦", "🇱🇻", "🇱🇧", "🇱🇸", "🇱🇷", "🇱🇾", "🇱🇮", "🇱🇹", "🇱🇺", "🇲🇴", "🇲🇰", "🇲🇬", "🇲🇼", "🇲🇾", "🇲🇻", "🇲🇱", "🇲🇹", "🇲🇭", "🇲🇶", "🇲🇷", "🇲🇺", "🇾🇹", "🇲🇽", "🇫🇲", "🇲🇩", "🇲🇨", "🇲🇳", "🇲🇪", "🇲🇸", "🇲🇦", "🇲🇿", "🇲🇲", "🇳🇦", "🇳🇷", "🇳🇵", "🇳🇱", "🇳🇨", "🇳🇿", "🇳🇮", "🇳🇪", "🇳🇬", "🇳🇺", "🇳🇫", "🇲🇵", "🇰🇵", "🇳🇴", "🇴🇲", "🇵🇰", "🇵🇼", "🇵🇸", "🇵🇦", "🇵🇬", "🇵🇾", "🇵🇪", "🇵🇭", "🇵🇳", "🇵🇱", "🇵🇹", "🇵🇷", "🇶🇦", "🇷🇪", "🇷🇴", "🇷🇺", "🇷🇼", "🇧🇱", "🇸🇭", "🇰🇳", "🇱🇨", "🇵🇲", "🇻🇨", "🇼🇸", "🇸🇲", "🇸🇹", "🇸🇦", "🇸🇳", "🇷🇸", "🇸🇨", "🇸🇱", "🇸🇬", "🇸🇽", "🇸🇰", "🇸🇮", "🇸🇧", "🇸🇴", "🇿🇦", "🇬🇸", "🇰🇷", "🇸🇸", "🇪🇸", "🇱🇰", "🇸🇩", "🇸🇷", "🇸🇿", "🇸🇪", "🇨🇭", "🇸🇾", "🇹🇼", "🇹🇯", "🇹🇿", "🇹🇭", "🇹🇱", "🇹🇬", "🇹🇰", "🇹🇴", "🇹🇹", "🇹🇳", "🇹🇷", "🇹🇲", "🇹🇨", "🇹🇻", "🇺🇬", "🇺🇦", "🇦🇪", "🇬🇧", "🇺🇸", "🇻🇮", "🇺🇾", "🇺🇿", "🇻🇺", "🇻🇦", "🇻🇪", "🇻🇳", "🇼🇫", "🇪🇭", "🇾🇪", "🇿🇲", "🇿🇼"],
  emoji: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='20px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Emoji</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Lower' sketch:type='MSLayerGroup' transform='translate(-60.000000, -181.000000)' fill='#030303'> <g id='Bottom-Row' transform='translate(3.000000, 170.000000)' sketch:type='MSShapeGroup'> <path d='M66.75,30.5 C72.1347763,30.5 76.5,26.1347763 76.5,20.75 C76.5,15.3652237 72.1347763,11 66.75,11 C61.3652237,11 57,15.3652237 57,20.75 C57,26.1347763 61.3652237,30.5 66.75,30.5 Z M66.75,29.5 C71.5824916,29.5 75.5,25.5824916 75.5,20.75 C75.5,15.9175084 71.5824916,12 66.75,12 C61.9175084,12 58,15.9175084 58,20.75 C58,25.5824916 61.9175084,29.5 66.75,29.5 Z M63.75,19 C64.4403559,19 65,18.4403559 65,17.75 C65,17.0596441 64.4403559,16.5 63.75,16.5 C63.0596441,16.5 62.5,17.0596441 62.5,17.75 C62.5,18.4403559 63.0596441,19 63.75,19 Z M69.75,19 C70.4403559,19 71,18.4403559 71,17.75 C71,17.0596441 70.4403559,16.5 69.75,16.5 C69.0596441,16.5 68.5,17.0596441 68.5,17.75 C68.5,18.4403559 69.0596441,19 69.75,19 Z M59.8876334,22.1641444 C59.6390316,21.383134 60.065918,20.9785156 60.8530951,21.2329304 C60.8530951,21.2329304 63.0937503,22.2125 66.7500001,22.2125 C70.4062499,22.2125 72.6469047,21.2329304 72.6469047,21.2329304 C73.4287162,20.9662153 73.8812463,21.4044097 73.6058477,22.1807437 C73.6058477,22.1807437 72.6,27.575 66.75,27.575 C60.9,27.575 59.8876334,22.1641444 59.8876334,22.1641444 Z M66.75,23.1875 C64.06875,23.1875 61.8544055,22.4737821 61.8544055,22.4737821 C61.3273019,22.32948 61.1781233,22.5721615 61.5639555,22.957075 C61.5639555,22.957075 62.3625,24.65 66.75,24.65 C71.1375,24.65 71.9508503,22.9438304 71.9508503,22.9438304 C72.3093659,22.5399278 72.1690793,22.3359844 71.6354273,22.476349 C71.6354273,22.476349 69.43125,23.1875 66.75,23.1875 Z' id='Emoji'></path> </g> </g> </g> </svg>",
  "delete": {
    on: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='24px' height='18px' viewBox='0 0 24 18' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Back</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-339.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M351.642663,20.9776903 L354.466795,18.1535585 C354.760106,17.8602476 354.763983,17.3814962 354.47109,17.088603 C354.176155,16.7936677 353.7014,16.7976328 353.406135,17.0928983 L350.582003,19.9170301 L347.757871,17.0928983 C347.46456,16.7995874 346.985809,16.7957097 346.692916,17.088603 C346.39798,17.3835382 346.401945,17.858293 346.697211,18.1535585 L349.521343,20.9776903 L346.697211,23.801822 C346.4039,24.0951329 346.400022,24.5738843 346.692916,24.8667776 C346.987851,25.1617128 347.462606,25.1577477 347.757871,24.8624822 L350.582003,22.0383504 L353.406135,24.8624822 C353.699445,25.1557931 354.178197,25.1596708 354.47109,24.8667776 C354.766025,24.5718423 354.76206,24.0970875 354.466795,23.801822 L351.642663,20.9776903 Z M337.059345,22.0593445 C336.474285,21.4742847 336.481351,20.5186489 337.059345,19.9406555 L343.789915,13.2100853 C344.182084,12.817916 344.94892,12.5 345.507484,12.5 L356.002098,12.5 C357.933936,12.5 359.5,14.0688477 359.5,16.0017983 L359.5,25.9982017 C359.5,27.9321915 357.923088,29.5 356.002098,29.5 L345.507484,29.5 C344.951066,29.5 344.177169,29.1771693 343.789915,28.7899148 L337.059345,22.0593445 Z' id='Back'></path> </g> </g> </g> </svg>",
    off: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='24px' height='18px' viewBox='0 0 24 18' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Back</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-339.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M337.059345,22.0593445 C336.474285,21.4742847 336.481351,20.5186489 337.059345,19.9406555 L343.789915,13.2100853 C344.182084,12.817916 344.94892,12.5 345.507484,12.5 L356.002098,12.5 C357.933936,12.5 359.5,14.0688477 359.5,16.0017983 L359.5,25.9982017 C359.5,27.9321915 357.923088,29.5 356.002098,29.5 L345.507484,29.5 C344.951066,29.5 344.177169,29.1771693 343.789915,28.7899148 L337.059345,22.0593445 Z M351.642663,20.9776903 L354.466795,18.1535585 C354.760106,17.8602476 354.763983,17.3814962 354.47109,17.088603 C354.176155,16.7936677 353.7014,16.7976328 353.406135,17.0928983 L350.582003,19.9170301 L347.757871,17.0928983 C347.46456,16.7995874 346.985809,16.7957097 346.692916,17.088603 C346.39798,17.3835382 346.401945,17.858293 346.697211,18.1535585 L349.521343,20.9776903 L346.697211,23.801822 C346.4039,24.0951329 346.400022,24.5738843 346.692916,24.8667776 C346.987851,25.1617128 347.462606,25.1577477 347.757871,24.8624822 L350.582003,22.0383504 L353.406135,24.8624822 C353.699445,25.1557931 354.178197,25.1596708 354.47109,24.8667776 C354.766025,24.5718423 354.76206,24.0970875 354.466795,23.801822 L351.642663,20.9776903 Z M338.70972,21.7097195 C338.317752,21.3177522 338.318965,20.6810349 338.70972,20.2902805 L344.643245,14.3567547 C344.840276,14.1597245 345.225639,14 345.493741,14 L355.997239,14 C357.103333,14 357.999999,14.8970601 357.999999,16.0058586 L357.999999,25.9941412 C357.999999,27.1019464 357.106457,27.9999999 355.997239,27.9999999 L345.493741,28 C345.221056,28 344.840643,27.8406431 344.643246,27.6432453 L338.70972,21.7097195 Z' id='Back'></path> </g> </g> </g> </svg>"
  },
  food: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Food</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-148.000000, -637.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Food' transform='translate(149.500000, 229.500000)' sketch:type='MSShapeGroup'> <path d='M5.5,15.5 L1,15.5 L0,5 L6.5,5 L6.26360933,7.48210202' id='Drink' stroke='#4A5461'></path> <path d='M6.01077545,1.96930098 L6.51571352,5.22270539 L5.71908184,5.67947812 L5.0389009,1.96930098 L4.85557247,1.96930098 L4.85557247,0.96930098 L8.85557247,0.96930098 L8.85557247,1.96930098 L6.01077545,1.96930098 Z' id='Straw' fill='#4A5461' transform='translate(6.855572, 3.324390) rotate(24.000000) translate(-6.855572, -3.324390) '></path> <rect id='Bottom-Bun' stroke='#4A5461' x='3' y='14' width='10.5' height='1.5' rx='1'></rect> <path d='M1.5,12.5024408 C1.5,11.948808 1.94916916,11.5 2.49268723,11.5 L14.0073128,11.5 C14.5555588,11.5 15,11.9469499 15,12.5024408 L15,12.9975592 C15,13.551192 14.5508308,14 14.0073128,14 L2.49268723,14 C1.94444121,14 1.5,13.5530501 1.5,12.9975592 L1.5,12.5024408 Z M3.93300003,11.8392727 C3.41771834,11.6518976 3.44483697,11.5 3.9955775,11.5 L13.0044225,11.5 C13.5542648,11.5 13.5866061,11.6503251 13.067,11.8392727 L8.5,13.5 L3.93300003,11.8392727 Z' id='&quot;Patty&quot;' fill='#4A5461'></path> <path d='M2.5,10.5 L13.5,10.5 L15,11.5 L1,11.5 L2.5,10.5 Z' id='Cheese' fill='#4A5461'></path> <path d='M8.25,10.5 C11.4256373,10.5 14,10.3284271 14,9.5 C14,8.67157288 11.4256373,8 8.25,8 C5.07436269,8 2.5,8.67157288 2.5,9.5 C2.5,10.3284271 5.07436269,10.5 8.25,10.5 Z' id='Top-Bun' stroke='#4A5461' stroke-width='0.75'></path> </g> </g> </g> </g> </svg>",
  flags: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='11px' height='15px' viewBox='0 0 11 15' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Flag</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-275.000000, -639.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Flag' transform='translate(275.000000, 231.500000)' sketch:type='MSShapeGroup'> <rect id='Pole' fill='#4A5461' x='0' y='0' width='1' height='14'></rect> <path d='M1,1 C1,1 1.25,2 3.5,2 C5.75,2 6,0.749999998 8,0.75 C10,0.749999998 10,1.5 10,1.5 L10,7.5 C10,7.5 10,6.5 8,6.5 C6,6.5 4.80623911,8 3.5,8 C2.19376089,8 1,7 1,7 L1,1 Z' stroke='#4A5461' stroke-linejoin='round'></path> </g> </g> </g> </g> </svg>",
  frequent: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Recent</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-55.000000, -638.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Recent' transform='translate(55.500000, 230.000000)' sketch:type='MSShapeGroup'> <circle id='Body' stroke='#4A5461' cx='8' cy='8' r='8'></circle> <path d='M7.5,7.5 L7.5,8.5 L8.5,8.5 L8.5,2 L7.5,2 L7.5,7.5 L4,7.5 L4,8.5 L8.5,8.5 L8.5,7.5 L7.5,7.5 Z' id='Hands' fill='#4A5461'></path> </g> </g> </g> </g> </svg>",
  keyboard: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='32.5px' height='23.5px' viewBox='0 0 65 47' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Shape</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='iPad-Portrait' transform='translate(-1436.000000, -1956.000000)' fill='#000000'> <g id='Keyboard-Light' transform='translate(0.000000, 1422.000000)'> <g id='Keyboard-down' transform='translate(1412.000000, 500.000000)'> <path d='M87.001332,34 C88.1051659,34 89,34.8997127 89,35.9932874 L89,61.0067126 C89,62.1075748 88.1058759,63 87.001332,63 L25.998668,63 C24.8948341,63 24,62.1002873 24,61.0067126 L24,35.9932874 C24,34.8924252 24.8941241,34 25.998668,34 L87.001332,34 Z M26,36 L26,61 L87,61 L87,36 L26,36 Z M79,40 L83,40 L83,44 L79,44 L79,40 Z M72,40 L76,40 L76,44 L72,44 L72,40 Z M65,40 L69,40 L69,44 L65,44 L65,40 Z M58,40 L62,40 L62,44 L58,44 L58,40 Z M51,40 L55,40 L55,44 L51,44 L51,40 Z M44,40 L48,40 L48,44 L44,44 L44,40 Z M37,40 L41,40 L41,44 L37,44 L37,40 Z M30,40 L34,40 L34,44 L30,44 L30,40 Z M79,47 L83,47 L83,51 L79,51 L79,47 Z M72,47 L76,47 L76,51 L72,51 L72,47 Z M65,47 L69,47 L69,51 L65,51 L65,47 Z M58,47 L62,47 L62,51 L58,51 L58,47 Z M51,47 L55,47 L55,51 L51,51 L51,47 Z M44,47 L48,47 L48,51 L44,51 L44,47 Z M37,47 L41,47 L41,51 L37,51 L37,47 Z M30,47 L34,47 L34,51 L30,51 L30,47 Z M79,54 L83,54 L83,58 L79,58 L79,54 Z M72,54 L76,54 L76,58 L72,58 L72,54 Z M44,54 L69,54 L69,58 L44,58 L44,54 Z M37,54 L41,54 L41,58 L37,58 L37,54 Z M30,54 L34,54 L34,58 L30,58 L30,54 Z M44.3163498,69.9771047 C43.3684225,70.5420342 43.3338721,71.5096495 44.2378217,72.1373912 L55.3621539,79.8626088 C56.2667113,80.4907726 57.7338965,80.4903505 58.6378461,79.8626088 L69.7621783,72.1373912 C70.6667357,71.5092274 70.648012,70.5205204 69.7115187,69.9234166 L69.9825731,70.0962396 C69.5181333,69.800115 68.7782557,69.8126493 68.3261307,70.1269323 L57.8154999,77.4331263 C57.3651117,77.746202 56.628165,77.7381786 56.1762103,77.4199424 L45.8386137,70.1408977 C45.3836472,69.8205407 44.6375039,69.7857088 44.1566393,70.0722862 L44.3163498,69.9771047 Z' id='Shape'></path> </g> </g> </g> </g> </svg>",
  keyPopUp: {
    light: {
      "iphone-5": "<svg width='55px' height='92px' viewBox='53 316 55 92' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.34173231,40.9391701 C0.517466128,40.20589 0,39.1374251 0,37.9477635 L0,4.00345598 C0,1.78917136 1.79528248,0 4.00987566,0 L44.9901243,0 C47.2125608,0 49,1.7924083 49,4.00345598 L49,37.9477635 C49,38.9124051 48.6592798,39.7963659 48.0916041,40.4868665 C48.0414233,40.9032289 47.7111888,41.4074672 47.0825908,41.95225 C47.0825908,41.95225 38.5299145,49.0643362 38.5299145,51.1526424 C38.5299145,61.6497561 38.1770099,82.0025406 38.1770099,82.0025406 C38.1412304,84.2024354 36.3210284,86 34.1128495,86 L15.3059539,86 C13.10796,86 11.2781884,84.2100789 11.2417936,82.0020993 C11.2417936,82.0020993 10.8888889,61.6470852 10.8888889,51.1486361 C10.8888889,49.0616654 2.34143662,42.238655 2.34143662,42.238655 C1.77827311,41.7641365 1.44881354,41.3204237 1.34173231,40.9391701 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='49' height='86' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(56.000000, 318.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>",
      "iphone-6s": "<svg width='64px' height='107px' viewBox='24 387 64 107' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.48647646,48.3779947 C0.58026649,47.6464296 0,46.529587 0,45.2781948 L0,3.99009787 C0,1.7825912 1.79509577,0 4.00945862,0 L53.9905414,0 C56.2005746,0 58,1.78642767 58,3.99009787 L58,45.2781948 C58,46.1833004 57.6982258,47.0169733 57.1895097,47.6856325 C57.0396865,48.0212497 56.7360098,48.3972834 56.2718363,48.7950661 C56.2718363,48.7950661 45.6068376,57.6220693 45.6068376,60.0746149 C45.6068376,72.4026205 45.177967,96.9923164 45.177967,96.9923164 C45.1413748,99.2122214 43.3193065,101 41.1090035,101 L17.386723,101 C15.1812722,101 13.354683,99.2055009 13.3177595,96.9918741 C13.3177595,96.9918741 12.8888889,72.3994838 12.8888889,60.0699099 C12.8888889,57.6189326 2.22673437,49.1462936 2.22673437,49.1462936 C1.90524087,48.8788327 1.65911655,48.620733 1.48647646,48.3779947 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='58' height='101' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(27.000000, 389.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>",
      "iphone-6s-plus": "<svg width='70px' height='119px' viewBox='28 450 70 119' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.95729395,54.0728304 C0.785911132,53.3757699 0,52.098776 0,50.6389022 L0,3.99524419 C0,1.78671428 1.79242202,0 4.00348663,0 L59.9965134,0 C62.2046235,0 64,1.78873175 64,3.99524419 L64,50.6389022 C64,51.9233686 63.3937116,53.0651556 62.451391,53.795754 C62.4427752,53.8032433 62.4341019,53.8107404 62.4253709,53.8182454 C62.4253709,53.8182454 50.3247863,63.8977402 50.3247863,66.6173947 C50.3247863,80.2880544 49.8443049,108.002007 49.8443049,108.002007 C49.8079665,110.210234 47.9874232,112 45.7789089,112 L18.7680997,112 C16.5534397,112 14.7394456,110.20984 14.7027037,108.001566 C14.7027037,108.001566 14.2222222,80.2845761 14.2222222,66.6121773 C14.2222222,63.8942619 2.14081422,54.2321337 2.14081422,54.2321337 C2.07664913,54.1786298 2.01548111,54.1255134 1.95729395,54.0728304 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='64' height='112' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(31.000000, 452.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>"
    },
    dark: {
      "iphone-5": "<svg width='55px' height='92px' viewBox='53 316 55 92' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.34173231,40.9391701 C0.517466128,40.20589 0,39.1374251 0,37.9477635 L0,4.00345598 C0,1.78917136 1.79528248,0 4.00987566,0 L44.9901243,0 C47.2125608,0 49,1.7924083 49,4.00345598 L49,37.9477635 C49,38.9124051 48.6592798,39.7963659 48.0916041,40.4868665 C48.0414233,40.9032289 47.7111888,41.4074672 47.0825908,41.95225 C47.0825908,41.95225 38.5299145,49.0643362 38.5299145,51.1526424 C38.5299145,61.6497561 38.1770099,82.0025406 38.1770099,82.0025406 C38.1412304,84.2024354 36.3210284,86 34.1128495,86 L15.3059539,86 C13.10796,86 11.2781884,84.2100789 11.2417936,82.0020993 C11.2417936,82.0020993 10.8888889,61.6470852 10.8888889,51.1486361 C10.8888889,49.0616654 2.34143662,42.238655 2.34143662,42.238655 C1.77827311,41.7641365 1.44881354,41.3204237 1.34173231,40.9391701 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='49' height='86' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(56.000000, 318.000000)'> <use id='Rectangle-14' stroke='#636363' mask='url(#mask-3)' fill='#636363' xlink:href='#path-2'></use> </g> </svg>",
      "iphone-6s": "<svg width='64px' height='107px' viewBox='24 387 64 107' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.48647646,48.3779947 C0.58026649,47.6464296 0,46.529587 0,45.2781948 L0,3.99009787 C0,1.7825912 1.79509577,0 4.00945862,0 L53.9905414,0 C56.2005746,0 58,1.78642767 58,3.99009787 L58,45.2781948 C58,46.1833004 57.6982258,47.0169733 57.1895097,47.6856325 C57.0396865,48.0212497 56.7360098,48.3972834 56.2718363,48.7950661 C56.2718363,48.7950661 45.6068376,57.6220693 45.6068376,60.0746149 C45.6068376,72.4026205 45.177967,96.9923164 45.177967,96.9923164 C45.1413748,99.2122214 43.3193065,101 41.1090035,101 L17.386723,101 C15.1812722,101 13.354683,99.2055009 13.3177595,96.9918741 C13.3177595,96.9918741 12.8888889,72.3994838 12.8888889,60.0699099 C12.8888889,57.6189326 2.22673437,49.1462936 2.22673437,49.1462936 C1.90524087,48.8788327 1.65911655,48.620733 1.48647646,48.3779947 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='58' height='101' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(27.000000, 389.000000)'> <use id='Rectangle-14' stroke='##636363' mask='url(#mask-3)' fill='#636363' xlink:href='#path-2'></use> </g> </svg>",
      "iphone-6s-plus": "<svg width='70px' height='119px' viewBox='28 450 70 119' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.95729395,54.0728304 C0.785911132,53.3757699 0,52.098776 0,50.6389022 L0,3.99524419 C0,1.78671428 1.79242202,0 4.00348663,0 L59.9965134,0 C62.2046235,0 64,1.78873175 64,3.99524419 L64,50.6389022 C64,51.9233686 63.3937116,53.0651556 62.451391,53.795754 C62.4427752,53.8032433 62.4341019,53.8107404 62.4253709,53.8182454 C62.4253709,53.8182454 50.3247863,63.8977402 50.3247863,66.6173947 C50.3247863,80.2880544 49.8443049,108.002007 49.8443049,108.002007 C49.8079665,110.210234 47.9874232,112 45.7789089,112 L18.7680997,112 C16.5534397,112 14.7394456,110.20984 14.7027037,108.001566 C14.7027037,108.001566 14.2222222,80.2845761 14.2222222,66.6121773 C14.2222222,63.8942619 2.14081422,54.2321337 2.14081422,54.2321337 C2.07664913,54.1786298 2.01548111,54.1255134 1.95729395,54.0728304 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='64' height='112' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(31.000000, 452.000000)'> <use id='Rectangle-14' stroke='#636363' mask='url(#mask-3)' fill='#636363' xlink:href='#path-2'></use> </g> </svg>"
    }
  },
  objects: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='11px' height='16px' viewBox='0 0 11 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Lightbulb</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-244.000000, -639.000000)' stroke='#4A5361'> <g id='Lightbulb' sketch:type='MSLayerGroup' transform='translate(244.000000, 639.000000)'> <path d='M8,10.4002904 C9.78083795,9.48993491 11,7.63734273 11,5.5 C11,2.46243388 8.53756612,0 5.5,0 C2.46243388,0 0,2.46243388 0,5.5 C0,7.63734273 1.21916205,9.48993491 3,10.4002904 L3,14.0020869 C3,15.1017394 3.89761602,16 5.0048815,16 L5.9951185,16 C7.1061002,16 8,15.1055038 8,14.0020869 L8,10.4002904 Z' id='Oval-17' sketch:type='MSShapeGroup'></path> <rect id='Rectangle-50' sketch:type='MSShapeGroup' x='3' y='12' width='5' height='1'></rect> <rect id='Rectangle-51' sketch:type='MSShapeGroup' x='4' y='13.5' width='1.5' height='1'></rect> <path d='M5,8.5 C5,8.5 3.49999999,7.50000001 4,7 C4.50000001,6.49999999 5,7.66666667 5.5,8 C5.5,8 6.5,6.50000001 7,7 C7.5,7.49999999 6,8.5 6,8.5 L6,11 L5,11 L5,8.5 Z' id='Rectangle-52' sketch:type='MSShapeGroup'></path> </g> </g> </g> </svg>",
  shift: {
    on: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='18px' viewBox='0 0 20 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Shift</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-14.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M21.7052388,13.2052388 C21.3157462,12.8157462 20.6857559,12.8142441 20.2947612,13.2052388 L11.9160767,21.5839233 C11.1339991,22.3660009 11.3982606,23 12.4979131,23 L16.5,23 L16.5,28.009222 C16.5,28.5564136 16.9463114,29 17.4975446,29 L24.5024554,29 C25.053384,29 25.5,28.5490248 25.5,28.009222 L25.5,23 L29.5020869,23 C30.6055038,23 30.866824,22.366824 30.0839233,21.5839233 L21.7052388,13.2052388 Z' id='Shift'></path> </g> </g> </g> </svg>",
    off: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='18px' viewBox='0 0 20 19' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Shift</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Lower' sketch:type='MSLayerGroup' transform='translate(-14.000000, -129.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M21.6719008,12.2325898 C21.301032,11.8279916 20.6946892,11.8334731 20.3288195,12.2325898 L11.6947023,21.6512983 C10.7587441,22.672308 11.1285541,23.5 12.5097751,23.5 L15.9999999,23.5000002 L15.9999999,28.0014241 C15.9999999,28.8290648 16.6716559,29.5000001 17.497101,29.5000001 L24.5028992,29.5000001 C25.3297253,29.5000001 26.0000003,28.8349703 26.0000003,28.0014241 L26.0000003,23.5000001 L29.4902251,23.5000002 C30.8763357,23.5000002 31.2439521,22.6751916 30.3054161,21.6512985 L21.6719008,12.2325898 Z M21.341748,14.3645316 C21.1530056,14.1632064 20.8433515,14.1670914 20.6582514,14.3645316 L13.5,21.9999998 L17.5000001,21.9999999 L17.5000002,27.5089956 C17.5000002,27.7801703 17.7329027,28.0000008 18.0034229,28.0000008 L23.996577,28.0000008 C24.2746097,28.0000008 24.4999997,27.7721203 24.4999997,27.5089956 L24.4999997,21.9999999 L28.5,21.9999999 L21.341748,14.3645316 Z' id='Shift'></path> </g> </g> </g> </svg>"
  },
  messages_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Messages Copy</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#66FD7F' offset='0%'></stop> <stop stop-color='#09B826' offset='100%'></stop> </linearGradient> </defs> <g id='iOS-Kit' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen' transform='translate(-1452.000000, -853.000000)'> <g id='Home-Screen-•-iPhone-6s-Plus' transform='translate(1417.000000, 812.000000)'> <g id='Messages-Copy' transform='translate(35.000000, 41.000000)'> <rect id='BG' fill='url(#linearGradient-1)' x='0' y='0' width='60' height='60' rx='14'></rect> <path d='M19.4223976,44.3088006 C13.1664228,41.1348949 9,35.4655421 9,29 C9,19.0588745 18.8497355,11 31,11 C43.1502645,11 53,19.0588745 53,29 C53,38.9411255 43.1502645,47 31,47 C28.6994588,47 26.4813914,46.7110897 24.3970409,46.1751953 C23.9442653,46.8838143 21.9065377,49.5 16.5,49.5 C15.6150187,49.5 17.1834749,48.5915921 18,47.5 C18.7894286,46.4446326 19.2505625,44.9480362 19.4223976,44.3088006 Z' id='Bubble' fill='#FFFFFF'></path> </g> </g> </g> </g> </svg>",
  calendar_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Calendar</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-92.000000, -27.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Calendar' transform='translate(92.000000, 0.000000)'> <rect id='BG' fill='#FFFFFF' x='0' y='0' width='60' height='60' rx='14'></rect> <text id='25' font-family='SFUIDisplay-Ultralight, SF UI Display' font-size='40' font-weight='200' letter-spacing='0.379999995' fill='#000000'> <tspan x='7.10828125' y='49'>25</tspan> </text> <text id='Monday' font-family='SFUIDisplay-Medium, SF UI Display' font-size='11' font-weight='400' letter-spacing='0.379999995' fill='#FF3B30'> <tspan x='9.02992189' y='15'>Monday</tspan> </text> </g> </g> </g> </g> </svg>",
  photos_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Photos</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-168.000000, -27.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Photos' transform='translate(168.000000, 0.000000)'> <rect id='BG' fill='#FFFFFF' x='0' y='0' width='60' height='60' rx='14'></rect> <rect id='Pedal' fill='#F26E64' style='mix-blend-mode: multiply;' transform='translate(20.142136, 20.142136) rotate(45.000000) translate(-20.142136, -20.142136) ' x='8.14213562' y='12.1421356' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#F0E22A' style='mix-blend-mode: multiply;' transform='translate(39.142136, 19.142136) rotate(135.000000) translate(-39.142136, -19.142136) ' x='27.1421356' y='11.1421356' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#D288B1' style='mix-blend-mode: multiply;' x='4' y='22' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#FBAD31' style='mix-blend-mode: multiply;' transform='translate(30.000000, 16.000000) rotate(90.000000) translate(-30.000000, -16.000000) ' x='18' y='8' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#A58EC2' style='mix-blend-mode: multiply;' transform='translate(20.142136, 40.142136) scale(1, -1) rotate(45.000000) translate(-20.142136, -40.142136) ' x='8.14213562' y='32.1421356' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#6CC199' style='mix-blend-mode: multiply;' transform='translate(40.142136, 40.142136) scale(1, -1) rotate(135.000000) translate(-40.142136, -40.142136) ' x='28.1421356' y='32.1421356' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#77AEDD' style='mix-blend-mode: multiply;' transform='translate(30.000000, 44.000000) scale(1, -1) rotate(90.000000) translate(-30.000000, -44.000000) ' x='18' y='36' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#B5D655' style='mix-blend-mode: multiply;' transform='translate(44.000000, 30.000000) rotate(180.000000) translate(-44.000000, -30.000000) ' x='32' y='22' width='24' height='16' rx='8'></rect> </g> </g> </g> </g> </svg>",
  camera_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Camera</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#DBDDDE' offset='0%'></stop> <stop stop-color='#898B91' offset='100%'></stop> </linearGradient> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-2'> <stop stop-color='#474747' offset='0%'></stop> <stop stop-color='#2B2B2B' offset='100%'></stop> </linearGradient> <path d='M9,20 L51,20 L51,42 L9,42 L9,20 Z M9,42.9975722 C9,44.3795877 10.1199653,45.5 11.5015125,45.5 L48.4984875,45.5 C49.8766015,45.5 51,44.3796249 51,42.9975722 L51,42.5 L9,42.5 L9,42.9975722 Z M9,19.5 L9,19.0024278 C9,17.6203751 10.1233985,16.5 11.5015125,16.5 L17.5304496,16.5 C18.4572011,16.4180186 19.3218208,16.2416313 19.9205322,15.8902588 C21.8326425,14.7680772 21.9641113,11.5 24.996205,11.5 L30.026083,11.5 L35.0559611,11.5 C38.0880548,11.5 38.2195236,14.7680772 40.1316339,15.8902588 C40.7303453,16.2416313 41.594965,16.4180186 42.5217165,16.5 L48.4984875,16.5 C49.8800347,16.5 51,17.6204123 51,19.0024278 L51,19.5 L9,19.5 L9,19.5 Z M39.25,31 C39.25,25.8913661 35.1086339,21.75 30,21.75 C24.8913661,21.75 20.75,25.8913661 20.75,31 C20.75,36.1086339 24.8913661,40.25 30,40.25 C35.1086339,40.25 39.25,36.1086339 39.25,31 L39.25,31 Z M22.25,31 C22.25,26.7197932 25.7197932,23.25 30,23.25 C34.2802068,23.25 37.75,26.7197932 37.75,31 C37.75,35.2802068 34.2802068,38.75 30,38.75 C25.7197932,38.75 22.25,35.2802068 22.25,31 L22.25,31 Z' id='path-3'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-4'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.5 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-5'> <feGaussianBlur stdDeviation='1' in='SourceAlpha' result='shadowBlurInner1'></feGaussianBlur> <feOffset dx='0' dy='1' in='shadowBlurInner1' result='shadowOffsetInner1'></feOffset> <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner1' result='shadowMatrixInner1'></feColorMatrix> <feGaussianBlur stdDeviation='0.5' in='SourceAlpha' result='shadowBlurInner2'></feGaussianBlur> <feOffset dx='0' dy='1' in='shadowBlurInner2' result='shadowOffsetInner2'></feOffset> <feComposite in='shadowOffsetInner2' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner2'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner2' result='shadowMatrixInner2'></feColorMatrix> <feGaussianBlur stdDeviation='0.5' in='SourceAlpha' result='shadowBlurInner3'></feGaussianBlur> <feOffset dx='0' dy='0' in='shadowBlurInner3' result='shadowOffsetInner3'></feOffset> <feComposite in='shadowOffsetInner3' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner3'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner3' result='shadowMatrixInner3'></feColorMatrix> <feGaussianBlur stdDeviation='0.5' in='SourceAlpha' result='shadowBlurInner4'></feGaussianBlur> <feOffset dx='-0' dy='0' in='shadowBlurInner4' result='shadowOffsetInner4'></feOffset> <feComposite in='shadowOffsetInner4' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner4'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner4' result='shadowMatrixInner4'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixInner1'></feMergeNode> <feMergeNode in='shadowMatrixInner2'></feMergeNode> <feMergeNode in='shadowMatrixInner3'></feMergeNode> <feMergeNode in='shadowMatrixInner4'></feMergeNode> </feMerge> </filter> <path d='M13,15.25 C13,14.8357864 13.3355947,14.5 13.7508378,14.5 L15.7491622,14.5 C16.1638385,14.5 16.5,14.8328986 16.5,15.25 L16.5,16 L13,16 L13,15.25 L13,15.25 Z' id='path-6'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-7'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.5 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-8'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetInner1'></feOffset> <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0' type='matrix' in='shadowInnerInner1'></feColorMatrix> </filter> <circle id='path-9' cx='39.5' cy='23' r='1'></circle> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-10'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-11'> <feGaussianBlur stdDeviation='0.5' in='SourceAlpha' result='shadowBlurInner1'></feGaussianBlur> <feOffset dx='0' dy='0' in='shadowBlurInner1' result='shadowOffsetInner1'></feOffset> <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-244.000000, -27.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Camera' transform='translate(244.000000, 0.000000)'> <g id='icon'> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='Icon' fill='url(#linearGradient-1)'></path> <g id='Camera'> <use fill='black' fill-opacity='1' filter='url(#filter-4)' xlink:href='#path-3'></use> <use fill='url(#linearGradient-2)' fill-rule='evenodd' xlink:href='#path-3'></use> <use fill='black' fill-opacity='1' filter='url(#filter-5)' xlink:href='#path-3'></use> </g> <g id='Path'> <use fill='black' fill-opacity='1' filter='url(#filter-7)' xlink:href='#path-6'></use> <use fill='url(#linearGradient-2)' fill-rule='evenodd' xlink:href='#path-6'></use> <use fill='black' fill-opacity='1' filter='url(#filter-8)' xlink:href='#path-6'></use> </g> <g id='Oval-16'> <use fill='black' fill-opacity='1' filter='url(#filter-10)' xlink:href='#path-9'></use> <use fill='#FFC209' fill-rule='evenodd' xlink:href='#path-9'></use> <use fill='black' fill-opacity='1' filter='url(#filter-11)' xlink:href='#path-9'></use> </g> </g> </g> </g> </g> </g> </svg>",
  weather_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Wealther</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#1D62F0' offset='0%'></stop> <stop stop-color='#19D5FD' offset='100%'></stop> </linearGradient> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-16.000000, -115.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Wealther' transform='translate(16.000000, 88.000000)'> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='BG' fill='url(#linearGradient-1)'></path> <circle id='Sun' fill='#FFD800' cx='19.75' cy='24.25' r='11.25'></circle> <path d='M41.5,43.996687 C46.4930625,43.8642035 50.5,39.775037 50.5,34.75 C50.5,29.6413661 46.3586339,25.5 41.25,25.5 C41.0574549,25.5 40.8662838,25.505883 40.6766567,25.5174791 C39.0043353,21.4018889 34.9660539,18.5 30.25,18.5 C24.0367966,18.5 19,23.5367966 19,29.75 C19,30.0391915 19.0109117,30.3258344 19.032346,30.6095395 C15.8856244,31.1828157 13.5,33.9378116 13.5,37.25 C13.5,40.8942242 16.3879002,43.8639431 20,43.9954562 L20,44 L41.5,44 L41.5,43.996687 L41.5,43.996687 Z' id='Cloud' fill='#FFFFFF' opacity='0.900536381'></path> </g> </g> </g> </g> </svg>",
  clock_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Clock</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#F1F1F1' offset='0%'></stop> <stop stop-color='#EEEEEE' offset='100%'></stop> </linearGradient> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-92.000000, -115.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Clock' transform='translate(92.000000, 88.000000)'> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='Icon' fill='#1E1E1F'></path> <circle id='Oval-12' fill='url(#linearGradient-1)' cx='30' cy='30' r='26'></circle> <g id='Digits' transform='translate(8.000000, 7.000000)' fill='#616161'> <path d='M32.468,8 L32.468,3.746 L32.078,3.746 C32.0499999,3.9060008 31.9980004,4.03799948 31.922,4.142 C31.8459996,4.24600052 31.7530005,4.3279997 31.643,4.388 C31.5329994,4.4480003 31.4100007,4.48899989 31.274,4.511 C31.1379993,4.53300011 30.9980007,4.544 30.854,4.544 L30.854,4.952 L31.958,4.952 L31.958,8 L32.468,8 Z' id='1'></path> <path d='M38.096,12.752 L38.606,12.752 C38.602,12.6239994 38.6149999,12.4970006 38.645,12.371 C38.6750002,12.2449994 38.7239997,12.1320005 38.792,12.032 C38.8600003,11.9319995 38.9469995,11.8510003 39.053,11.789 C39.1590005,11.7269997 39.2859993,11.696 39.434,11.696 C39.5460006,11.696 39.6519995,11.7139998 39.752,11.75 C39.8520005,11.7860002 39.9389996,11.8379997 40.013,11.906 C40.0870004,11.9740003 40.1459998,12.0549995 40.19,12.149 C40.2340002,12.2430005 40.256,12.3479994 40.256,12.464 C40.256,12.6120007 40.2330002,12.7419994 40.187,12.854 C40.1409998,12.9660006 40.0730005,13.0699995 39.983,13.166 C39.8929996,13.2620005 39.7800007,13.3569995 39.644,13.451 C39.5079993,13.5450005 39.3500009,13.6479994 39.17,13.76 C39.0219993,13.8480004 38.8800007,13.9419995 38.744,14.042 C38.6079993,14.1420005 38.4860005,14.2579993 38.378,14.39 C38.2699995,14.5220007 38.1810004,14.6769991 38.111,14.855 C38.0409997,15.0330009 37.9960001,15.2479987 37.976,15.5 L40.754,15.5 L40.754,15.05 L38.57,15.05 C38.5940001,14.9179993 38.6449996,14.8010005 38.723,14.699 C38.8010004,14.5969995 38.8949995,14.5020004 39.005,14.414 C39.1150006,14.3259996 39.2359993,14.2430004 39.368,14.165 C39.5000007,14.0869996 39.6319993,14.0080004 39.764,13.928 C39.8960007,13.8439996 40.0239994,13.7560005 40.148,13.664 C40.2720006,13.5719995 40.3819995,13.4690006 40.478,13.355 C40.5740005,13.2409994 40.6509997,13.1120007 40.709,12.968 C40.7670003,12.8239993 40.796,12.6580009 40.796,12.47 C40.796,12.269999 40.7610004,12.0940008 40.691,11.942 C40.6209997,11.7899992 40.5260006,11.6630005 40.406,11.561 C40.2859994,11.4589995 40.1450008,11.3810003 39.983,11.327 C39.8209992,11.2729997 39.6480009,11.246 39.464,11.246 C39.2399989,11.246 39.0400009,11.2839996 38.864,11.36 C38.6879991,11.4360004 38.5410006,11.5409993 38.423,11.675 C38.3049994,11.8090007 38.2180003,11.9679991 38.162,12.152 C38.1059997,12.3360009 38.0839999,12.5359989 38.096,12.752 L38.096,12.752 Z' id='2'></path> <path d='M42.14,22.57 L42.14,23.002 C42.2360005,22.9899999 42.3379995,22.984 42.446,22.984 C42.5740006,22.984 42.6929995,23.0009998 42.803,23.035 C42.9130006,23.0690002 43.0079996,23.1209997 43.088,23.191 C43.1680004,23.2610004 43.2319998,23.3469995 43.28,23.449 C43.3280002,23.5510005 43.352,23.6679993 43.352,23.8 C43.352,23.9280006 43.3270003,24.0429995 43.277,24.145 C43.2269998,24.2470005 43.1600004,24.3329997 43.076,24.403 C42.9919996,24.4730004 42.8940006,24.5269998 42.782,24.565 C42.6699994,24.6030002 42.5520006,24.622 42.428,24.622 C42.1359985,24.622 41.9140008,24.5350009 41.762,24.361 C41.6099992,24.1869991 41.53,23.9620014 41.522,23.686 L41.012,23.686 C41.008,23.9060011 41.0389997,24.1019991 41.105,24.274 C41.1710003,24.4460009 41.2659994,24.5909994 41.39,24.709 C41.5140006,24.8270006 41.6639991,24.9159997 41.84,24.976 C42.0160009,25.0360003 42.2119989,25.066 42.428,25.066 C42.628001,25.066 42.8169991,25.0390003 42.995,24.985 C43.1730009,24.9309997 43.3279993,24.8500005 43.46,24.742 C43.5920007,24.6339995 43.6969996,24.4990008 43.775,24.337 C43.8530004,24.1749992 43.892,23.9880011 43.892,23.776 C43.892,23.5199987 43.8290006,23.2980009 43.703,23.11 C43.5769994,22.9219991 43.3840013,22.8000003 43.124,22.744 L43.124,22.732 C43.2920008,22.6559996 43.4319994,22.5440007 43.544,22.396 C43.6560006,22.2479993 43.712,22.078001 43.712,21.886 C43.712,21.689999 43.6790003,21.5200007 43.613,21.376 C43.5469997,21.2319993 43.4560006,21.1140005 43.34,21.022 C43.2239994,20.9299995 43.0870008,20.8610002 42.929,20.815 C42.7709992,20.7689998 42.6000009,20.746 42.416,20.746 C42.2039989,20.746 42.0170008,20.7799997 41.855,20.848 C41.6929992,20.9160003 41.5580005,21.0099994 41.45,21.13 C41.3419995,21.2500006 41.2590003,21.3939992 41.201,21.562 C41.1429997,21.7300008 41.11,21.915999 41.102,22.12 L41.612,22.12 C41.612,21.9959994 41.6279998,21.8780006 41.66,21.766 C41.6920002,21.6539994 41.7409997,21.5560004 41.807,21.472 C41.8730003,21.3879996 41.9569995,21.3210003 42.059,21.271 C42.1610005,21.2209998 42.2799993,21.196 42.416,21.196 C42.6320011,21.196 42.8119993,21.2529994 42.956,21.367 C43.1000007,21.4810006 43.172,21.6519989 43.172,21.88 C43.172,21.9920006 43.1500002,22.0919996 43.106,22.18 C43.0619998,22.2680004 43.0030004,22.3409997 42.929,22.399 C42.8549996,22.4570003 42.7690005,22.5009999 42.671,22.531 C42.5729995,22.5610002 42.4700005,22.576 42.362,22.576 L42.254,22.576 L42.194,22.576 C42.1779999,22.576 42.1600001,22.574 42.14,22.57 L42.14,22.57 Z' id='3'></path> <path d='M40.366,34.054 L38.938,34.054 L40.354,31.972 L40.366,31.972 L40.366,34.054 Z M40.846,34.054 L40.846,31.246 L40.438,31.246 L38.5,34.012 L38.5,34.504 L40.366,34.504 L40.366,35.5 L40.846,35.5 L40.846,34.504 L41.422,34.504 L41.422,34.054 L40.846,34.054 Z' id='4'></path> <path d='M33.652,38.768 L33.652,38.318 L31.552,38.318 L31.156,40.526 L31.594,40.55 C31.6940005,40.4299994 31.8089993,40.3330004 31.939,40.259 C32.0690006,40.1849996 32.2179992,40.148 32.386,40.148 C32.5300007,40.148 32.6609994,40.1719998 32.779,40.22 C32.8970006,40.2680002 32.9979996,40.3349996 33.082,40.421 C33.1660004,40.5070004 33.2309998,40.6089994 33.277,40.727 C33.3230002,40.8450006 33.346,40.9739993 33.346,41.114 C33.346,41.2820008 33.3220002,41.4289994 33.274,41.555 C33.2259998,41.6810006 33.1610004,41.7859996 33.079,41.87 C32.9969996,41.9540004 32.9010005,42.0169998 32.791,42.059 C32.6809994,42.1010002 32.5660006,42.122 32.446,42.122 C32.3179994,42.122 32.2010005,42.1030002 32.095,42.065 C31.9889995,42.0269998 31.8970004,41.9730004 31.819,41.903 C31.7409996,41.8329997 31.6790002,41.7510005 31.633,41.657 C31.5869998,41.5629995 31.56,41.4620005 31.552,41.354 L31.042,41.354 C31.046,41.546001 31.0839996,41.7179992 31.156,41.87 C31.2280004,42.0220008 31.3259994,42.1489995 31.45,42.251 C31.5740006,42.3530005 31.7169992,42.4309997 31.879,42.485 C32.0410008,42.5390003 32.2139991,42.566 32.398,42.566 C32.6460012,42.566 32.8629991,42.5270004 33.049,42.449 C33.2350009,42.3709996 33.3899994,42.2660007 33.514,42.134 C33.6380006,42.0019993 33.7309997,41.8510009 33.793,41.681 C33.8550003,41.5109992 33.886,41.3360009 33.886,41.156 C33.886,40.9119988 33.8500004,40.6990009 33.778,40.517 C33.7059996,40.3349991 33.6080006,40.1830006 33.484,40.061 C33.3599994,39.9389994 33.2140008,39.8480003 33.046,39.788 C32.8779992,39.7279997 32.7000009,39.698 32.512,39.698 C32.3679993,39.698 32.2230007,39.7229998 32.077,39.773 C31.9309993,39.8230003 31.8120005,39.8999995 31.72,40.004 L31.708,39.992 L31.936,38.768 L33.652,38.768 Z' id='5'></path> <path d='M22.816,42.332 L23.326,42.332 C23.2939998,41.9799982 23.174001,41.7110009 22.966,41.525 C22.757999,41.3389991 22.4780018,41.246 22.126,41.246 C21.8219985,41.246 21.570001,41.3099994 21.37,41.438 C21.169999,41.5660006 21.0100006,41.7359989 20.89,41.948 C20.7699994,42.1600011 20.6850002,42.4029986 20.635,42.677 C20.5849997,42.9510014 20.56,43.2339985 20.56,43.526 C20.56,43.7500011 20.5769998,43.9819988 20.611,44.222 C20.6450002,44.4620012 20.7139995,44.681999 20.818,44.882 C20.9220005,45.082001 21.069999,45.2459994 21.262,45.374 C21.454001,45.5020006 21.7079984,45.566 22.024,45.566 C22.2920013,45.566 22.5169991,45.5210005 22.699,45.431 C22.8810009,45.3409996 23.0269994,45.2270007 23.137,45.089 C23.2470005,44.9509993 23.3259998,44.7980008 23.374,44.63 C23.4220002,44.4619992 23.446,44.3000008 23.446,44.144 C23.446,43.947999 23.4160003,43.7660008 23.356,43.598 C23.2959997,43.4299992 23.2110005,43.2840006 23.101,43.16 C22.9909994,43.0359994 22.8550008,42.9390004 22.693,42.869 C22.5309992,42.7989997 22.348001,42.764 22.144,42.764 C21.9119988,42.764 21.7070009,42.8079996 21.529,42.896 C21.3509991,42.9840004 21.2020006,43.125999 21.082,43.322 L21.07,43.31 C21.074,43.1459992 21.0899999,42.9700009 21.118,42.782 C21.1460001,42.5939991 21.1969996,42.4190008 21.271,42.257 C21.3450004,42.0949992 21.4479993,41.9610005 21.58,41.855 C21.7120007,41.7489995 21.8859989,41.696 22.102,41.696 C22.306001,41.696 22.4699994,41.7539994 22.594,41.87 C22.7180006,41.9860006 22.7919999,42.139999 22.816,42.332 L22.816,42.332 Z M22.048,43.214 C22.1920007,43.214 22.3179995,43.2399997 22.426,43.292 C22.5340005,43.3440003 22.6239996,43.4129996 22.696,43.499 C22.7680004,43.5850004 22.8209998,43.6869994 22.855,43.805 C22.8890002,43.9230006 22.906,44.0479993 22.906,44.18 C22.906,44.3040006 22.8870002,44.4229994 22.849,44.537 C22.8109998,44.6510006 22.7560004,44.7519996 22.684,44.84 C22.6119996,44.9280004 22.5230005,44.9969998 22.417,45.047 C22.3109995,45.0970003 22.1880007,45.122 22.048,45.122 C21.9079993,45.122 21.7830005,45.0970003 21.673,45.047 C21.5629994,44.9969998 21.4710004,44.9300004 21.397,44.846 C21.3229996,44.7619996 21.2660002,44.6620006 21.226,44.546 C21.1859998,44.4299994 21.166,44.3060007 21.166,44.174 C21.166,44.0419993 21.1849998,43.9170006 21.223,43.799 C21.2610002,43.6809994 21.3179996,43.5790004 21.394,43.493 C21.4700004,43.4069996 21.5619995,43.3390003 21.67,43.289 C21.7780005,43.2389998 21.9039993,43.214 22.048,43.214 L22.048,43.214 Z' id='6'></path> <path d='M12.886,38.756 L12.886,38.318 L10.132,38.318 L10.132,38.798 L12.364,38.798 C12.1399989,39.0340012 11.931001,39.2919986 11.737,39.572 C11.542999,39.8520014 11.3720007,40.1489984 11.224,40.463 C11.0759993,40.7770016 10.9550005,41.1049983 10.861,41.447 C10.7669995,41.7890017 10.7080001,42.1399982 10.684,42.5 L11.254,42.5 C11.2740001,42.1679983 11.3299995,41.8260018 11.422,41.474 C11.5140005,41.1219982 11.6329993,40.7800017 11.779,40.448 C11.9250007,40.1159983 12.0919991,39.8040015 12.28,39.512 C12.4680009,39.2199985 12.6699989,38.9680011 12.886,38.756 L12.886,38.756 Z' id='7'></path> <path d='M3.262,32.35 C3.262,32.2419995 3.2819998,32.1480004 3.322,32.068 C3.3620002,31.9879996 3.41499967,31.9200003 3.481,31.864 C3.54700033,31.8079997 3.62599954,31.7660001 3.718,31.738 C3.81000046,31.7099999 3.9059995,31.696 4.006,31.696 C4.21400104,31.696 4.38499933,31.7509995 4.519,31.861 C4.65300067,31.9710006 4.72,32.1339989 4.72,32.35 C4.72,32.5660011 4.65400066,32.7339994 4.522,32.854 C4.38999934,32.9740006 4.22200102,33.034 4.018,33.034 C3.91399948,33.034 3.81600046,33.0200001 3.724,32.992 C3.63199954,32.9639999 3.55200034,32.9220003 3.484,32.866 C3.41599966,32.8099997 3.3620002,32.7390004 3.322,32.653 C3.2819998,32.5669996 3.262,32.4660006 3.262,32.35 L3.262,32.35 Z M2.722,32.332 C2.722,32.524001 2.77599946,32.7009992 2.884,32.863 C2.99200054,33.0250008 3.1359991,33.1419996 3.316,33.214 C3.0759988,33.2980004 2.89200064,33.4329991 2.764,33.619 C2.63599936,33.8050009 2.572,34.0239987 2.572,34.276 C2.572,34.4920011 2.60899963,34.6809992 2.683,34.843 C2.75700037,35.0050008 2.85899935,35.1399995 2.989,35.248 C3.11900065,35.3560005 3.27199912,35.4359997 3.448,35.488 C3.62400088,35.5400003 3.81399898,35.566 4.018,35.566 C4.21400098,35.566 4.39799914,35.5380003 4.57,35.482 C4.74200086,35.4259997 4.89099937,35.3430006 5.017,35.233 C5.14300063,35.1229995 5.24299963,34.9880008 5.317,34.828 C5.39100037,34.6679992 5.428,34.484001 5.428,34.276 C5.428,34.0119987 5.36600062,33.7890009 5.242,33.607 C5.11799938,33.4249991 4.92800128,33.2940004 4.672,33.214 C4.8520009,33.1339996 4.99499947,33.0150008 5.101,32.857 C5.20700053,32.6989992 5.26,32.524001 5.26,32.332 C5.26,32.1959993 5.23600024,32.0630007 5.188,31.933 C5.13999976,31.8029994 5.06500051,31.6870005 4.963,31.585 C4.86099949,31.4829995 4.72800082,31.4010003 4.564,31.339 C4.39999918,31.2769997 4.20200116,31.246 3.97,31.246 C3.80599918,31.246 3.64900075,31.2699998 3.499,31.318 C3.34899925,31.3660002 3.21600058,31.4359995 3.1,31.528 C2.98399942,31.6200005 2.89200034,31.7329993 2.824,31.867 C2.75599966,32.0010007 2.722,32.1559991 2.722,32.332 L2.722,32.332 Z M3.112,34.3 C3.112,34.1759994 3.13499977,34.0640005 3.181,33.964 C3.22700023,33.8639995 3.29099959,33.7780004 3.373,33.706 C3.45500041,33.6339996 3.55099945,33.5790002 3.661,33.541 C3.77100055,33.5029998 3.88799938,33.484 4.012,33.484 C4.1320006,33.484 4.24499947,33.5049998 4.351,33.547 C4.45700053,33.5890002 4.5499996,33.6459996 4.63,33.718 C4.7100004,33.7900004 4.77299977,33.8749995 4.819,33.973 C4.86500023,34.0710005 4.888,34.1779994 4.888,34.294 C4.888,34.4140006 4.86700021,34.5239995 4.825,34.624 C4.78299979,34.7240005 4.72300039,34.8109996 4.645,34.885 C4.56699961,34.9590004 4.47500053,35.0169998 4.369,35.059 C4.26299947,35.1010002 4.14600064,35.122 4.018,35.122 C3.75399868,35.122 3.53700085,35.0490007 3.367,34.903 C3.19699915,34.7569993 3.112,34.5560013 3.112,34.3 L3.112,34.3 Z' id='8'></path> <path d='M1.136,23.974 L0.626,23.974 C0.65800016,24.3420018 0.79199882,24.6159991 1.028,24.796 C1.26400118,24.9760009 1.55999822,25.066 1.916,25.066 C2.43200258,25.066 2.80699883,24.869002 3.041,24.475 C3.27500117,24.080998 3.392,23.5160037 3.392,22.78 C3.392,22.375998 3.35300039,22.0430013 3.275,21.781 C3.19699961,21.5189987 3.09200066,21.3120008 2.96,21.16 C2.82799934,21.0079992 2.67400088,20.9010003 2.498,20.839 C2.32199912,20.7769997 2.134001,20.746 1.934,20.746 C1.72999898,20.746 1.54200086,20.7799997 1.37,20.848 C1.19799914,20.9160003 1.05000062,21.0109994 0.926,21.133 C0.80199938,21.2550006 0.70600034,21.4009992 0.638,21.571 C0.56999966,21.7410009 0.536,21.927999 0.536,22.132 C0.536,22.340001 0.56499971,22.5319991 0.623,22.708 C0.68100029,22.8840009 0.76699943,23.0339994 0.881,23.158 C0.99500057,23.2820006 1.13599916,23.3789997 1.304,23.449 C1.47200084,23.5190004 1.66399892,23.554 1.88,23.554 C2.08800104,23.554 2.27999912,23.5010005 2.456,23.395 C2.63200088,23.2889995 2.76799952,23.1460009 2.864,22.966 L2.876,22.978 C2.85999992,23.5340028 2.77400078,23.9469987 2.618,24.217 C2.46199922,24.4870014 2.22800156,24.622 1.916,24.622 C1.71199898,24.622 1.53600074,24.5660006 1.388,24.454 C1.23999926,24.3419994 1.1560001,24.182001 1.136,23.974 L1.136,23.974 Z M2.786,22.168 C2.786,22.2920006 2.7660002,22.4109994 2.726,22.525 C2.6859998,22.6390006 2.62800038,22.7389996 2.552,22.825 C2.47599962,22.9110004 2.38400054,22.9789998 2.276,23.029 C2.16799946,23.0790003 2.04800066,23.104 1.916,23.104 C1.79199938,23.104 1.67900051,23.0790003 1.577,23.029 C1.47499949,22.9789998 1.38700037,22.9120004 1.313,22.828 C1.23899963,22.7439996 1.18100021,22.6480005 1.139,22.54 C1.09699979,22.4319995 1.076,22.3200006 1.076,22.204 C1.076,22.0719993 1.09099985,21.9460006 1.121,21.826 C1.15100015,21.7059994 1.19899967,21.5990005 1.265,21.505 C1.33100033,21.4109995 1.41699947,21.3360003 1.523,21.28 C1.62900053,21.2239997 1.75799924,21.196 1.91,21.196 C2.05400072,21.196 2.17999946,21.2219997 2.288,21.274 C2.39600054,21.3260003 2.48699963,21.3969996 2.561,21.487 C2.63500037,21.5770005 2.69099981,21.6799994 2.729,21.796 C2.76700019,21.9120006 2.786,22.0359993 2.786,22.168 L2.786,22.168 Z' id='9'></path> <path d='M2.8,15.5 L2.8,11.246 L2.41,11.246 C2.38199986,11.4060008 2.33000038,11.5379995 2.254,11.642 C2.17799962,11.7460005 2.08500055,11.8279997 1.975,11.888 C1.86499945,11.9480003 1.74200068,11.9889999 1.606,12.011 C1.46999932,12.0330001 1.33000072,12.044 1.186,12.044 L1.186,12.452 L2.29,12.452 L2.29,15.5 L2.8,15.5 Z M4.792,13.406 C4.792,13.3019995 4.79299999,13.1870006 4.795,13.061 C4.79700001,12.9349994 4.80699991,12.8090006 4.825,12.683 C4.84300009,12.5569994 4.86899983,12.4340006 4.903,12.314 C4.93700017,12.1939994 4.98699967,12.0890005 5.053,11.999 C5.11900033,11.9089996 5.2019995,11.8360003 5.302,11.78 C5.4020005,11.7239997 5.52399928,11.696 5.668,11.696 C5.81200072,11.696 5.9339995,11.7239997 6.034,11.78 C6.1340005,11.8360003 6.21699967,11.9089996 6.283,11.999 C6.34900033,12.0890005 6.39899983,12.1939994 6.433,12.314 C6.46700017,12.4340006 6.49299991,12.5569994 6.511,12.683 C6.52900009,12.8090006 6.53899999,12.9349994 6.541,13.061 C6.54300001,13.1870006 6.544,13.3019995 6.544,13.406 C6.544,13.5660008 6.53900005,13.744999 6.529,13.943 C6.51899995,14.141001 6.48700027,14.3269991 6.433,14.501 C6.37899973,14.6750009 6.2920006,14.8219994 6.172,14.942 C6.0519994,15.0620006 5.88400108,15.122 5.668,15.122 C5.45199892,15.122 5.2840006,15.0620006 5.164,14.942 C5.0439994,14.8219994 4.95700027,14.6750009 4.903,14.501 C4.84899973,14.3269991 4.81700005,14.141001 4.807,13.943 C4.79699995,13.744999 4.792,13.5660008 4.792,13.406 L4.792,13.406 Z M4.252,13.412 C4.252,13.5680008 4.25599996,13.7299992 4.264,13.898 C4.27200004,14.0660008 4.29199984,14.2299992 4.324,14.39 C4.35600016,14.5500008 4.4019997,14.7009993 4.462,14.843 C4.5220003,14.9850007 4.60399948,15.1099995 4.708,15.218 C4.81200052,15.3260005 4.94299921,15.4109997 5.101,15.473 C5.25900079,15.5350003 5.4479989,15.566 5.668,15.566 C5.89200112,15.566 6.08199922,15.5350003 6.238,15.473 C6.39400078,15.4109997 6.52399948,15.3260005 6.628,15.218 C6.73200052,15.1099995 6.8139997,14.9850007 6.874,14.843 C6.9340003,14.7009993 6.97999984,14.5500008 7.012,14.39 C7.04400016,14.2299992 7.06399996,14.0660008 7.072,13.898 C7.08000004,13.7299992 7.084,13.5680008 7.084,13.412 C7.084,13.2559992 7.08000004,13.0940008 7.072,12.926 C7.06399996,12.7579992 7.04400016,12.5940008 7.012,12.434 C6.97999984,12.2739992 6.9340003,12.1220007 6.874,11.978 C6.8139997,11.8339993 6.73200052,11.7080005 6.628,11.6 C6.52399948,11.4919995 6.39300079,11.4060003 6.235,11.342 C6.07699921,11.2779997 5.8880011,11.246 5.668,11.246 C5.4479989,11.246 5.25900079,11.2779997 5.101,11.342 C4.94299921,11.4060003 4.81200052,11.4919995 4.708,11.6 C4.60399948,11.7080005 4.5220003,11.8339993 4.462,11.978 C4.4019997,12.1220007 4.35600016,12.2739992 4.324,12.434 C4.29199984,12.5940008 4.27200004,12.7579992 4.264,12.926 C4.25599996,13.0940008 4.252,13.2559992 4.252,13.412 L4.252,13.412 Z' id='10'></path> <path d='M10.8,8 L10.8,3.746 L10.41,3.746 C10.3819999,3.9060008 10.3300004,4.03799948 10.254,4.142 C10.1779996,4.24600052 10.0850005,4.3279997 9.975,4.388 C9.86499945,4.4480003 9.74200068,4.48899989 9.606,4.511 C9.46999932,4.53300011 9.33000072,4.544 9.186,4.544 L9.186,4.952 L10.29,4.952 L10.29,8 L10.8,8 Z M14.136,8 L14.136,3.746 L13.746,3.746 C13.7179999,3.9060008 13.6660004,4.03799948 13.59,4.142 C13.5139996,4.24600052 13.4210005,4.3279997 13.311,4.388 C13.2009994,4.4480003 13.0780007,4.48899989 12.942,4.511 C12.8059993,4.53300011 12.6660007,4.544 12.522,4.544 L12.522,4.952 L13.626,4.952 L13.626,8 L14.136,8 Z' id='11'></path> <path d='M20.8,5 L20.8,0.746 L20.41,0.746 C20.3819999,0.9060008 20.3300004,1.03799948 20.254,1.142 C20.1779996,1.24600052 20.0850005,1.3279997 19.975,1.388 C19.8649994,1.4480003 19.7420007,1.48899989 19.606,1.511 C19.4699993,1.53300011 19.3300007,1.544 19.186,1.544 L19.186,1.952 L20.29,1.952 L20.29,5 L20.8,5 Z M22.264,2.252 L22.774,2.252 C22.77,2.12399936 22.7829998,1.99700063 22.813,1.871 C22.8430001,1.74499937 22.8919997,1.6320005 22.96,1.532 C23.0280003,1.4319995 23.1149995,1.35100031 23.221,1.289 C23.3270005,1.22699969 23.4539993,1.196 23.602,1.196 C23.7140006,1.196 23.8199995,1.21399982 23.92,1.25 C24.0200005,1.28600018 24.1069996,1.33799966 24.181,1.406 C24.2550004,1.47400034 24.3139998,1.55499953 24.358,1.649 C24.4020002,1.74300047 24.424,1.84799942 24.424,1.964 C24.424,2.11200074 24.4010002,2.24199944 24.355,2.354 C24.3089998,2.46600056 24.2410004,2.56999952 24.151,2.666 C24.0609995,2.76200048 23.9480007,2.85699953 23.812,2.951 C23.6759993,3.04500047 23.5180009,3.14799944 23.338,3.26 C23.1899993,3.34800044 23.0480007,3.4419995 22.912,3.542 C22.7759993,3.6420005 22.6540005,3.75799934 22.546,3.89 C22.4379995,4.02200066 22.3490003,4.17699911 22.279,4.355 C22.2089996,4.53300089 22.1640001,4.74799874 22.144,5 L24.922,5 L24.922,4.55 L22.738,4.55 C22.7620001,4.41799934 22.8129996,4.30100051 22.891,4.199 C22.9690004,4.09699949 23.0629994,4.00200044 23.173,3.914 C23.2830005,3.82599956 23.4039993,3.74300039 23.536,3.665 C23.6680007,3.58699961 23.7999993,3.5080004 23.932,3.428 C24.0640007,3.34399958 24.1919994,3.25600046 24.316,3.164 C24.4400006,3.07199954 24.5499995,2.96900057 24.646,2.855 C24.7420005,2.74099943 24.8189997,2.61200072 24.877,2.468 C24.9350003,2.32399928 24.964,2.15800094 24.964,1.97 C24.964,1.769999 24.9290003,1.59400076 24.859,1.442 C24.7889996,1.28999924 24.6940006,1.16300051 24.574,1.061 C24.4539994,0.95899949 24.3130008,0.88100027 24.151,0.827 C23.9889992,0.77299973 23.8160009,0.746 23.632,0.746 C23.4079989,0.746 23.2080009,0.78399962 23.032,0.86 C22.8559991,0.93600038 22.7090006,1.04099933 22.591,1.175 C22.4729994,1.30900067 22.3860003,1.46799908 22.33,1.652 C22.2739997,1.83600092 22.2519999,2.03599892 22.264,2.252 L22.264,2.252 Z' id='12'></path> </g> <polygon id='Hour' fill='#2A2929' transform='translate(25.319297, 23.611917) rotate(-38.000000) translate(-25.319297, -23.611917) ' points='24.8192972 15.6119168 25.8192972 15.6119168 25.8192972 31.6119168 24.8192972 31.6119168'></polygon> <polygon id='Minute' fill='#2A2929' transform='translate(19.329949, 35.730028) rotate(62.000000) translate(-19.329949, -35.730028) ' points='19.0494321 24.2986991 19.9184363 24.2986991 19.7874404 47.2986991 18.9184363 47.2986991'></polygon> <polygon id='Second' fill='#DD4524' transform='translate(39.644621, 32.129480) rotate(-76.000000) translate(-39.644621, -32.129480) ' points='38.9523565 18.2482315 39.9221138 18.2482315 39.9523565 46.2482315 38.9825992 46.2482315'></polygon> <circle id='Oval-13' fill='#2A2929' cx='30' cy='30' r='1.25'></circle> <circle id='Oval-14' fill='#DD4524' cx='30' cy='30' r='0.75'></circle> </g> </g> </g> </g> </svg>",
  maps_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Maps</title> <desc>Created with Sketch.</desc> <defs> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='path-1'></path> <path d='M-4.5,30 C-4.5,30 -4.47462625,30.4967807 -4.42511695,30.4912401 C-3.44229055,30.3812506 9.10445696,28.4946923 17.5075684,34.5092773 C23.2683105,38.6325684 26.42078,43.7490087 31,48.1848145 C36.7919922,53.7954102 44.3314042,55.6680664 50.4058144,56.250293 C56.4802246,56.8325195 65,56 65,56 L65,66 C65,66 53.5489633,65.3769385 47.8234863,64.6784668 C42.0980093,63.9799951 33.2470703,62.026123 27.392334,57.927002 C17.9909668,50.1728516 19.277874,47.8193763 12.291748,43.2246094 C5.24072266,38.5871582 -4.5,40.5 -4.5,40.5 L-4.5,30 Z' id='path-3'></path> <mask id='mask-4' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='70.5' height='37'> <rect x='-5' y='29.5' width='70.5' height='37' fill='white'></rect> <use xlink:href='#path-3' fill='black'></use> </mask> <polygon id='path-5' points='50.5 60 41.5 60 41.5 18.8429752 0 18.8429752 0 9.91735537 41.5 9.91735537 41.5 0 50.5 0 50.5 9.91735537 60 9.91735537 60 18.8429752 50.5 18.8429752 50.5 36.6942149 60 36.6942149 60 45.6198347 50.5 45.6198347'></polygon> <mask id='mask-6' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='61' height='61'> <rect x='-0.5' y='-0.5' width='61' height='61' fill='white'></rect> <use xlink:href='#path-5' fill='black'></use> </mask> <path d='M0.5,7.5 C0.814961548,13.8459051 5.03679656,19.5 12.75,19.5 C20.4632034,19.5 24.6314755,13.8439381 25,7.5 C25.1235352,5.37341309 24.3674316,2.56555176 23.5068131,1.2710142 C22.4549565,2.02599285 20.4373562,2.5 18.75,2.5 C16.1596631,2.5 13.4693848,1.88292106 12.75,0.347133799 C12.0306152,1.88292106 9.34033689,2.5 6.75,2.5 C5.06264383,2.5 3.04504346,2.02599285 1.99318686,1.2710142 C1.13293457,2.76416016 0.392089844,5.32580566 0.5,7.5 Z' id='path-7'></path> <mask id='mask-8' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='24.5237787' height='19.1528662' fill='white'> <use xlink:href='#path-7'></use> </mask> <mask id='mask-10' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='24.5237787' height='19.1528662' fill='white'> <use xlink:href='#path-7'></use> </mask> <rect id='path-11' x='0' y='0.5' width='25' height='5'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-12'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 1 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> <path d='M0.5,7.5 C0.814961548,13.8459051 5.03679656,19.5 12.75,19.5 C20.4632034,19.5 24.6314755,13.8439381 25,7.5 C25.1235352,5.37341309 24.3674316,2.56555176 23.5068131,1.2710142 C22.4549565,2.02599285 20.4373562,2.5 18.75,2.5 C16.1596631,2.5 13.4693848,1.88292106 12.75,0.347133799 C12.0306152,1.88292106 9.34033689,2.5 6.75,2.5 C5.06264383,2.5 3.04504346,2.02599285 1.99318686,1.2710142 C1.13293457,2.76416016 0.392089844,5.32580566 0.5,7.5 Z' id='path-13'></path> <mask id='mask-14' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='24.5237787' height='19.1528662' fill='white'> <use xlink:href='#path-13'></use> </mask> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-168.000000, -115.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Maps' transform='translate(168.000000, 88.000000)'> <mask id='mask-2' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='BG' fill='#E4DDC9' xlink:href='#path-1'></use> <rect id='Block' fill='#76C63B' mask='url(#mask-2)' x='0' y='0' width='42' height='10'></rect> <rect id='Block' fill='#FBC6D1' mask='url(#mask-2)' x='45' y='0.5' width='15' height='10'></rect> <g id='Highway' mask='url(#mask-2)'> <use fill='#FFDE02' fill-rule='evenodd' xlink:href='#path-3'></use> <use stroke='#FEB312' mask='url(#mask-4)' stroke-width='1' xlink:href='#path-3'></use> </g> <g id='Map' mask='url(#mask-2)'> <use fill='#FFFFFF' fill-rule='evenodd' xlink:href='#path-5'></use> <use stroke-opacity='0.1' stroke='#000000' mask='url(#mask-6)' stroke-width='1' xlink:href='#path-5'></use> </g> <path d='M43.6565914,35.5 L43.4489796,35.5 L43.4489796,17 L-1,17 L-1,12 L48.5,12 L48.5,14.5 L48.5,14.5 L48.5,35.5 L48.2923882,35.5 C47.586899,35.178996 46.801811,35 45.9744898,35 C45.1471685,35 44.3620806,35.178996 43.6565914,35.5 L43.6565914,35.5 Z' id='Route' fill='#409BFF' mask='url(#mask-2)'></path> <g id='Indicator' mask='url(#mask-2)'> <g transform='translate(40.500000, 35.500000)'> <circle id='Circle' fill='#007AFF' cx='5.5' cy='5.5' r='5.5'></circle> <polygon id='Arrow' fill='#FFFFFF' points='7.75 8.75 5.5 1.65380592 3.25 8.75 5.5 6.65380592'></polygon> </g> </g> <g id='280' mask='url(#mask-2)'> <g transform='translate(8.000000, 22.500000)'> <mask id='mask-9' fill='white'> <use xlink:href='#path-7'></use> </mask> <g id='Oval-20' stroke='#FFFFFF' mask='url(#mask-8)' stroke-width='1' fill='#007AFF' fill-rule='evenodd'> <use mask='url(#mask-10)' xlink:href='#path-7'></use> </g> <g id='Top' stroke='none' fill='none' mask='url(#mask-9)'> <use fill='black' fill-opacity='1' filter='url(#filter-12)' xlink:href='#path-11'></use> <use fill='#DE1D26' fill-rule='evenodd' xlink:href='#path-11'></use> </g> <g id='Shield' stroke='none' fill='none' mask='url(#mask-9)' stroke-width='1.5'> <use stroke='#FFFFFF' mask='url(#mask-14)' xlink:href='#path-13'></use> </g> <path d='M5.64,9.378 L6.405,9.378 C6.39899997,9.18599904 6.41849978,8.99550095 6.4635,8.8065 C6.50850023,8.61749906 6.58199949,8.44800075 6.684,8.298 C6.78600051,8.14799925 6.91649921,8.02650047 7.0755,7.9335 C7.2345008,7.84049954 7.42499889,7.794 7.647,7.794 C7.81500084,7.794 7.97399925,7.82099973 8.124,7.875 C8.27400075,7.92900027 8.40449945,8.00699949 8.5155,8.109 C8.62650056,8.21100051 8.71499967,8.3324993 8.781,8.4735 C8.84700033,8.61450071 8.88,8.77199913 8.88,8.946 C8.88,9.16800111 8.84550035,9.36299916 8.7765,9.531 C8.70749966,9.69900084 8.60550068,9.85499928 8.4705,9.999 C8.33549933,10.1430007 8.16600102,10.2854993 7.962,10.4265 C7.75799898,10.5675007 7.52100135,10.7219992 7.251,10.89 C7.02899889,11.0220007 6.81600102,11.1629993 6.612,11.313 C6.40799898,11.4630008 6.22500081,11.636999 6.063,11.835 C5.90099919,12.033001 5.76750053,12.2654987 5.6625,12.5325 C5.55749948,12.7995013 5.49000015,13.1219981 5.46,13.5 L9.627,13.5 L9.627,12.825 L6.351,12.825 C6.38700018,12.626999 6.46349942,12.4515008 6.5805,12.2985 C6.69750059,12.1454992 6.83849918,12.0030007 7.0035,11.871 C7.16850083,11.7389993 7.34999901,11.6145006 7.548,11.4975 C7.74600099,11.3804994 7.94399901,11.2620006 8.142,11.142 C8.34000099,11.0159994 8.53199907,10.8840007 8.718,10.746 C8.90400093,10.6079993 9.06899928,10.4535009 9.213,10.2825 C9.35700072,10.1114991 9.47249957,9.91800108 9.5595,9.702 C9.64650044,9.48599892 9.69,9.23700141 9.69,8.955 C9.69,8.6549985 9.63750053,8.39100114 9.5325,8.163 C9.42749948,7.93499886 9.2850009,7.74450077 9.105,7.5915 C8.9249991,7.43849924 8.71350122,7.32150041 8.4705,7.2405 C8.22749879,7.1594996 7.96800138,7.119 7.692,7.119 C7.35599832,7.119 7.05600132,7.17599943 6.792,7.29 C6.52799868,7.40400057 6.30750089,7.561499 6.1305,7.7625 C5.95349912,7.96350101 5.82300042,8.20199862 5.739,8.478 C5.65499958,8.75400138 5.62199991,9.05399838 5.64,9.378 L5.64,9.378 Z M11.643,8.775 C11.643,8.61299919 11.6729997,8.4720006 11.733,8.352 C11.7930003,8.2319994 11.8724995,8.13000042 11.9715,8.046 C12.0705005,7.96199958 12.1889993,7.89900021 12.327,7.857 C12.4650007,7.81499979 12.6089993,7.794 12.759,7.794 C13.0710016,7.794 13.327499,7.87649918 13.5285,8.0415 C13.729501,8.20650083 13.83,8.45099838 13.83,8.775 C13.83,9.09900162 13.731001,9.3509991 13.533,9.531 C13.334999,9.7110009 13.0830015,9.801 12.777,9.801 C12.6209992,9.801 12.4740007,9.78000021 12.336,9.738 C12.1979993,9.69599979 12.0780005,9.63300042 11.976,9.549 C11.8739995,9.46499958 11.7930003,9.35850065 11.733,9.2295 C11.6729997,9.10049936 11.643,8.94900087 11.643,8.775 L11.643,8.775 Z M10.833,8.748 C10.833,9.03600144 10.9139992,9.30149879 11.076,9.5445 C11.2380008,9.78750122 11.4539987,9.96299946 11.724,10.071 C11.3639982,10.1970006 11.088001,10.3994986 10.896,10.6785 C10.703999,10.9575014 10.608,11.2859981 10.608,11.664 C10.608,11.9880016 10.6634994,12.2714988 10.7745,12.5145 C10.8855006,12.7575012 11.038499,12.9599992 11.2335,13.122 C11.428501,13.2840008 11.6579987,13.4039996 11.922,13.482 C12.1860013,13.5600004 12.4709985,13.599 12.777,13.599 C13.0710015,13.599 13.3469987,13.5570004 13.605,13.473 C13.8630013,13.3889996 14.0864991,13.2645008 14.2755,13.0995 C14.4645009,12.9344992 14.6144994,12.7320012 14.7255,12.492 C14.8365006,12.2519988 14.892,11.9760016 14.892,11.664 C14.892,11.267998 14.7990009,10.9335014 14.613,10.6605 C14.4269991,10.3874986 14.1420019,10.1910006 13.758,10.071 C14.0280014,9.9509994 14.2424992,9.77250119 14.4015,9.5355 C14.5605008,9.29849882 14.64,9.03600144 14.64,8.748 C14.64,8.54399898 14.6040004,8.34450098 14.532,8.1495 C14.4599996,7.95449903 14.3475008,7.78050077 14.1945,7.6275 C14.0414992,7.47449924 13.8420012,7.35150047 13.596,7.2585 C13.3499988,7.16549954 13.0530017,7.119 12.705,7.119 C12.4589988,7.119 12.2235011,7.15499964 11.9985,7.227 C11.7734989,7.29900036 11.5740009,7.40399931 11.4,7.542 C11.2259991,7.68000069 11.0880005,7.849499 10.986,8.0505 C10.8839995,8.25150101 10.833,8.48399868 10.833,8.748 L10.833,8.748 Z M11.418,11.7 C11.418,11.5139991 11.4524997,11.3460008 11.5215,11.196 C11.5905003,11.0459993 11.6864994,10.9170005 11.8095,10.809 C11.9325006,10.7009995 12.0764992,10.6185003 12.2415,10.5615 C12.4065008,10.5044997 12.5819991,10.476 12.768,10.476 C12.9480009,10.476 13.1174992,10.5074997 13.2765,10.5705 C13.4355008,10.6335003 13.5749994,10.7189995 13.695,10.827 C13.8150006,10.9350005 13.9094997,11.0624993 13.9785,11.2095 C14.0475003,11.3565007 14.082,11.5169991 14.082,11.691 C14.082,11.8710009 14.0505003,12.0359993 13.9875,12.186 C13.9244997,12.3360008 13.8345006,12.4664994 13.7175,12.5775 C13.6004994,12.6885006 13.4625008,12.7754997 13.3035,12.8385 C13.1444992,12.9015003 12.969001,12.933 12.777,12.933 C12.380998,12.933 12.0555013,12.8235011 11.8005,12.6045 C11.5454987,12.3854989 11.418,12.0840019 11.418,11.7 L11.418,11.7 Z M16.44,10.359 C16.44,10.2029992 16.4415,10.0305009 16.4445,9.8415 C16.4475,9.65249906 16.4624999,9.46350095 16.4895,9.2745 C16.5165001,9.08549906 16.5554997,8.9010009 16.6065,8.721 C16.6575003,8.5409991 16.7324995,8.38350068 16.8315,8.2485 C16.9305005,8.11349933 17.0549993,8.00400042 17.205,7.92 C17.3550008,7.83599958 17.5379989,7.794 17.754,7.794 C17.9700011,7.794 18.1529993,7.83599958 18.303,7.92 C18.4530008,8.00400042 18.5774995,8.11349933 18.6765,8.2485 C18.7755005,8.38350068 18.8504997,8.5409991 18.9015,8.721 C18.9525003,8.9010009 18.9914999,9.08549906 19.0185,9.2745 C19.0455001,9.46350095 19.0605,9.65249906 19.0635,9.8415 C19.0665,10.0305009 19.068,10.2029992 19.068,10.359 C19.068,10.5990012 19.0605001,10.8674985 19.0455,11.1645 C19.0304999,11.4615015 18.9825004,11.7404987 18.9015,12.0015 C18.8204996,12.2625013 18.6900009,12.4829991 18.51,12.663 C18.3299991,12.8430009 18.0780016,12.933 17.754,12.933 C17.4299984,12.933 17.1780009,12.8430009 16.998,12.663 C16.8179991,12.4829991 16.6875004,12.2625013 16.6065,12.0015 C16.5254996,11.7404987 16.4775001,11.4615015 16.4625,11.1645 C16.4474999,10.8674985 16.44,10.5990012 16.44,10.359 L16.44,10.359 Z M15.63,10.368 C15.63,10.6020012 15.6359999,10.8449987 15.648,11.097 C15.6600001,11.3490013 15.6899998,11.5949988 15.738,11.835 C15.7860002,12.0750012 15.8549996,12.3014989 15.945,12.5145 C16.0350005,12.7275011 16.1579992,12.9149992 16.314,13.077 C16.4700008,13.2390008 16.6664988,13.3664995 16.9035,13.4595 C17.1405012,13.5525005 17.4239984,13.599 17.754,13.599 C18.0900017,13.599 18.3749988,13.5525005 18.609,13.4595 C18.8430012,13.3664995 19.0379992,13.2390008 19.194,13.077 C19.3500008,12.9149992 19.4729996,12.7275011 19.563,12.5145 C19.6530005,12.3014989 19.7219998,12.0750012 19.77,11.835 C19.8180002,11.5949988 19.8479999,11.3490013 19.86,11.097 C19.8720001,10.8449987 19.878,10.6020012 19.878,10.368 C19.878,10.1339988 19.8720001,9.89100126 19.86,9.639 C19.8479999,9.38699874 19.8180002,9.1410012 19.77,8.901 C19.7219998,8.6609988 19.6530005,8.43300108 19.563,8.217 C19.4729996,8.00099892 19.3500008,7.81200081 19.194,7.65 C19.0379992,7.48799919 18.8415012,7.35900048 18.6045,7.263 C18.3674988,7.16699952 18.0840017,7.119 17.754,7.119 C17.4239984,7.119 17.1405012,7.16699952 16.9035,7.263 C16.6664988,7.35900048 16.4700008,7.48799919 16.314,7.65 C16.1579992,7.81200081 16.0350005,8.00099892 15.945,8.217 C15.8549996,8.43300108 15.7860002,8.6609988 15.738,8.901 C15.6899998,9.1410012 15.6600001,9.38699874 15.648,9.639 C15.6359999,9.89100126 15.63,10.1339988 15.63,10.368 L15.63,10.368 Z' id='280' stroke='none' fill='#FFFFFF' fill-rule='evenodd' mask='url(#mask-9)'></path> </g> </g> </g> </g> </g> </g> </svg>",
  news_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>News</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#FC5363' offset='0%'></stop> <stop stop-color='#FC3359' offset='100%'></stop> </linearGradient> <path d='M10.136624,47.3823853 C11,47.3823853 11,46.5 11,46.5 L11,12.0052617 C11,11.450071 11.4532303,11 11.9968754,11 L48.0031246,11 C48.5536837,11 49,11.4413032 49,12.0088498 L49,46.9911502 C49,47.5483226 48.543925,48.0029034 47.9964076,48.0062782 C47.9964076,48.0062782 18.6084831,48.1997544 11.0000001,48 C10.1174113,47.9768284 9.41662598,47.668457 9.05755615,47.3823853 C8.69848633,47.0963135 8.36309815,46.7116462 8.36309814,46.6607056 C8.36309814,46.457472 9.27324796,47.3823853 10.136624,47.3823853 Z' id='path-2'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-4'> <feOffset dx='-1' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-244.000000, -115.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='News' transform='translate(244.000000, 88.000000)'> <rect id='BG' fill='url(#linearGradient-1)' x='0' y='0' width='60' height='60' rx='14'></rect> <path d='M8,45.9165262 L8,16.9953764 C8,16.4456452 8.45526288,16 8.99545703,16 L32.004543,16 C32.5543187,16 33,16.4523621 33,16.9927864 L33,47.0072136 C33,47.5555144 32.5447371,48 32.004543,48 L10.9907522,48 C9.33900538,48 8,46.6569475 8,45.9165262 L8,45.9165262 Z' id='Fold' fill='#FFFFFF'></path> <mask id='mask-3' fill='white'> <use xlink:href='#path-2'></use> </mask> <g id='Mask'> <use fill='black' fill-opacity='1' filter='url(#filter-4)' xlink:href='#path-2'></use> <use fill='#FFFFFF' fill-rule='evenodd' xlink:href='#path-2'></use> </g> <rect id='lines' fill='#BDBDBD' mask='url(#mask-3)' x='17' y='35' width='33' height='2' rx='1'></rect> <rect id='lines' fill='#BDBDBD' mask='url(#mask-3)' x='17' y='39' width='33' height='2' rx='1'></rect> <rect id='lines' fill='#BDBDBD' mask='url(#mask-3)' x='17' y='43' width='33' height='2' rx='1'></rect> <path d='M16,20.1213203 L16,16.9976567 C16,16.4466661 16.4410535,16 16.9976567,16 L20.1213203,16 L20,16.1213203 L31,27.1213203 L31,30.0011436 C31,30.5527968 30.5550661,31 30.0011436,31 L27.1213203,31 L16.1213203,20 L16,20.1213203 L16,20.1213203 Z M16,29.9997809 C16,30.5521867 16.4513294,31 17.0002191,31 L21.8784606,31 C22.4308663,31 22.5652427,30.6865631 22.1684484,30.2897688 L16.7102312,24.8315516 C16.3179814,24.4393017 16,24.5726497 16,25.1215394 L16,29.9997809 Z M29.9997809,16 C30.5521867,16 31,16.4513294 31,17.0002191 L31,21.8784606 C31,22.4308663 30.6873855,22.5660652 30.2956989,22.1743785 L29.5913977,21.4700774 L24.825239,16.7039186 C24.4364754,16.3151551 24.5726497,16 25.1215394,16 L29.9997809,16 Z' id='Logo' fill='#FD4C61' mask='url(#mask-3)'></path> </g> </g> </g> </g> </svg>",
  wallet_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Wallet</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#1E1E1F' offset='0%'></stop> <stop stop-color='#1E1E1F' offset='100%'></stop> </linearGradient> <rect id='path-2' x='9' y='15' width='42' height='13' rx='2'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-3'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <rect id='path-4' x='9' y='18' width='42' height='13' rx='2'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-5'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <rect id='path-6' x='9' y='21' width='42' height='13' rx='2'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-7'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <rect id='path-8' x='9' y='25' width='42' height='13' rx='2'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-9'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <path d='M7,28 L7,42 L53,42 L53,28 L38.9065073,28 C37.7983339,28 36.3057558,28.6722229 35.5501237,29.4784882 C35.5501237,29.4784882 32.4189579,33.3076923 30,33.3076923 C27.5810421,33.3076923 24.4498763,29.4784882 24.4498763,29.4784882 C23.7043702,28.6619417 22.2114781,28 21.0934927,28 L7,28 Z' id='path-10'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-11'> <feOffset dx='0' dy='-1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-16.000000, -203.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Wallet' transform='translate(16.000000, 176.000000)'> <rect id='BG' fill='url(#linearGradient-1)' x='0' y='0' width='60' height='60' rx='14'></rect> <rect id='wallet' fill='#D9D6CC' x='7' y='12' width='46' height='34' rx='4'></rect> <g id='cards'> <use fill='black' fill-opacity='1' filter='url(#filter-3)' xlink:href='#path-2'></use> <use fill='#3B99C9' fill-rule='evenodd' xlink:href='#path-2'></use> </g> <g id='cards'> <use fill='black' fill-opacity='1' filter='url(#filter-5)' xlink:href='#path-4'></use> <use fill='#FFB003' fill-rule='evenodd' xlink:href='#path-4'></use> </g> <g id='cards'> <use fill='black' fill-opacity='1' filter='url(#filter-7)' xlink:href='#path-6'></use> <use fill='#50BE3D' fill-rule='evenodd' xlink:href='#path-6'></use> </g> <g id='cards'> <use fill='black' fill-opacity='1' filter='url(#filter-9)' xlink:href='#path-8'></use> <use fill='#F16C5E' fill-rule='evenodd' xlink:href='#path-8'></use> </g> <g id='Combined-Shape'> <use fill='black' fill-opacity='1' filter='url(#filter-11)' xlink:href='#path-10'></use> <use fill='#D9D6CC' fill-rule='evenodd' xlink:href='#path-10'></use> </g> </g> </g> </g> </g> </svg>",
  notes_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Notes</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#F8F8F8' offset='0%'></stop> <stop stop-color='#EDEDED' offset='100%'></stop> </linearGradient> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='path-2'></path> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-4'> <stop stop-color='#FFDF63' offset='0%'></stop> <stop stop-color='#FFCD02' offset='100%'></stop> </linearGradient> <rect id='path-5' x='0' y='-1' width='60' height='20'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-6'> <feOffset dx='0' dy='0.5' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-7'> <feOffset dx='0' dy='-0.5' in='SourceAlpha' result='shadowOffsetInner1'></feOffset> <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.2 0' type='matrix' in='shadowInnerInner1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-92.000000, -203.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Notes' transform='translate(92.000000, 176.000000)'> <mask id='mask-3' fill='white'> <use xlink:href='#path-2'></use> </mask> <use id='BG' fill='url(#linearGradient-1)' xlink:href='#path-2'></use> <g id='header' mask='url(#mask-3)'> <use fill='black' fill-opacity='1' filter='url(#filter-6)' xlink:href='#path-5'></use> <use fill='url(#linearGradient-4)' fill-rule='evenodd' xlink:href='#path-5'></use> <use fill='black' fill-opacity='1' filter='url(#filter-7)' xlink:href='#path-5'></use> </g> <polygon id='line' fill='#B7B7B7' mask='url(#mask-3)' points='59.75 30.5 60 30.5 60 30 59.75 30 -0.25 30 -0.5 30 -0.5 30.5 -0.25 30.5'></polygon> <polygon id='line' fill='#B7B7B7' mask='url(#mask-3)' points='59.75 41.5 60 41.5 60 41 59.75 41 -0.25 41 -0.5 41 -0.5 41.5 -0.25 41.5'></polygon> <polygon id='line' fill='#B7B7B7' mask='url(#mask-3)' points='59.75 53 60 53 60 52.5 59.75 52.5 -0.25 52.5 -0.5 52.5 -0.5 53 -0.25 53'></polygon> <path d='M58.5,22 L59.5,22 L59.5,23 L58.5,23 L58.5,22 L58.5,22 Z M56.5,22 L57.5,22 L57.5,23 L56.5,23 L56.5,22 L56.5,22 Z M54.5,22 L55.5,22 L55.5,23 L54.5,23 L54.5,22 L54.5,22 Z M52.5,22 L53.5,22 L53.5,23 L52.5,23 L52.5,22 L52.5,22 Z M50.5,22 L51.5,22 L51.5,23 L50.5,23 L50.5,22 L50.5,22 Z M48.5,22 L49.5,22 L49.5,23 L48.5,23 L48.5,22 L48.5,22 Z M46.5,22 L47.5,22 L47.5,23 L46.5,23 L46.5,22 L46.5,22 Z M44.5,22 L45.5,22 L45.5,23 L44.5,23 L44.5,22 L44.5,22 Z M42.5,22 L43.5,22 L43.5,23 L42.5,23 L42.5,22 L42.5,22 Z M40.5,22 L41.5,22 L41.5,23 L40.5,23 L40.5,22 L40.5,22 Z M38.5,22 L39.5,22 L39.5,23 L38.5,23 L38.5,22 L38.5,22 Z M36.5,22 L37.5,22 L37.5,23 L36.5,23 L36.5,22 L36.5,22 Z M34.5,22 L35.5,22 L35.5,23 L34.5,23 L34.5,22 L34.5,22 Z M32.5,22 L33.5,22 L33.5,23 L32.5,23 L32.5,22 L32.5,22 Z M30.5,22 L31.5,22 L31.5,23 L30.5,23 L30.5,22 L30.5,22 Z M28.5,22 L29.5,22 L29.5,23 L28.5,23 L28.5,22 L28.5,22 Z M26.5,22 L27.5,22 L27.5,23 L26.5,23 L26.5,22 L26.5,22 Z M24.5,22 L25.5,22 L25.5,23 L24.5,23 L24.5,22 L24.5,22 Z M22.5,22 L23.5,22 L23.5,23 L22.5,23 L22.5,22 L22.5,22 Z M20.5,22 L21.5,22 L21.5,23 L20.5,23 L20.5,22 L20.5,22 Z M18.5,22 L19.5,22 L19.5,23 L18.5,23 L18.5,22 L18.5,22 Z M16.5,22 L17.5,22 L17.5,23 L16.5,23 L16.5,22 L16.5,22 Z M14.5,22 L15.5,22 L15.5,23 L14.5,23 L14.5,22 L14.5,22 Z M12.5,22 L13.5,22 L13.5,23 L12.5,23 L12.5,22 L12.5,22 Z M10.5,22 L11.5,22 L11.5,23 L10.5,23 L10.5,22 L10.5,22 Z M8.5,22 L9.5,22 L9.5,23 L8.5,23 L8.5,22 L8.5,22 Z M6.5,22 L7.5,22 L7.5,23 L6.5,23 L6.5,22 L6.5,22 Z M4.5,22 L5.5,22 L5.5,23 L4.5,23 L4.5,22 L4.5,22 Z M2.5,22 L3.5,22 L3.5,23 L2.5,23 L2.5,22 L2.5,22 Z M0.5,22 L1.5,22 L1.5,23 L0.5,23 L0.5,22 L0.5,22 Z' id='Rectangle-37' fill='#AAAAAA' mask='url(#mask-3)'></path> </g> </g> </g> </g> </svg>",
  reminders_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>min</title> <desc>Created with Sketch.</desc> <defs> <rect id='path-1' x='0' y='0' width='60' height='60' rx='14'></rect> <circle id='path-3' cx='10' cy='12' r='4'></circle> <mask id='mask-4' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='8' height='8' fill='white'> <use xlink:href='#path-3'></use> </mask> <mask id='mask-5' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='9' height='9'> <rect x='5.5' y='7.5' width='9' height='9' fill='white'></rect> <use xlink:href='#path-3' fill='black'></use> </mask> <circle id='path-6' cx='10' cy='23' r='4'></circle> <mask id='mask-7' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='8' height='8' fill='white'> <use xlink:href='#path-6'></use> </mask> <mask id='mask-8' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='9' height='9'> <rect x='5.5' y='18.5' width='9' height='9' fill='white'></rect> <use xlink:href='#path-6' fill='black'></use> </mask> <circle id='path-9' cx='10' cy='35' r='4'></circle> <mask id='mask-10' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='8' height='8' fill='white'> <use xlink:href='#path-9'></use> </mask> <mask id='mask-11' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='9' height='9'> <rect x='5.5' y='30.5' width='9' height='9' fill='white'></rect> <use xlink:href='#path-9' fill='black'></use> </mask> <circle id='path-12' cx='10' cy='46' r='4'></circle> <mask id='mask-13' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='8' height='8' fill='white'> <use xlink:href='#path-12'></use> </mask> <mask id='mask-14' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='9' height='9'> <rect x='5.5' y='41.5' width='9' height='9' fill='white'></rect> <use xlink:href='#path-12' fill='black'></use> </mask> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-168.000000, -203.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='min' transform='translate(168.000000, 176.000000)'> <mask id='mask-2' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='BG' fill='#FFFFFF' xlink:href='#path-1'></use> <g id='circle' mask='url(#mask-2)'> <use stroke='#FFFFFF' mask='url(#mask-4)' fill='#FF9500' fill-rule='evenodd' xlink:href='#path-3'></use> <use stroke='#FF9500' mask='url(#mask-5)' xlink:href='#path-3'></use> </g> <g id='circle' mask='url(#mask-2)'> <use stroke='#FFFFFF' mask='url(#mask-7)' fill='#1BADF8' fill-rule='evenodd' xlink:href='#path-6'></use> <use stroke='#1BADF8' mask='url(#mask-8)' xlink:href='#path-6'></use> </g> <g id='circle' mask='url(#mask-2)'> <use stroke='#FFFFFF' mask='url(#mask-10)' fill='#63DA38' fill-rule='evenodd' xlink:href='#path-9'></use> <use stroke='#63DA38' mask='url(#mask-11)' xlink:href='#path-9'></use> </g> <g id='circle' mask='url(#mask-2)'> <use stroke='#FFFFFF' mask='url(#mask-13)' fill='#CC73E1' fill-rule='evenodd' xlink:href='#path-12'></use> <use stroke='#CC73E1' mask='url(#mask-14)' xlink:href='#path-12'></use> </g> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='17.5' width='41' height='0.5'></rect> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='6' width='41' height='0.5'></rect> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='29' width='41' height='0.5'></rect> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='40' width='41' height='0.5'></rect> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='51.5' width='41' height='0.5'></rect> </g> </g> </g> </g> </svg>",
  stocks_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Stocks</title> <desc>Created with Sketch.</desc> <defs> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='path-1'></path> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-3'> <stop stop-color='#454545' offset='0%'></stop> <stop stop-color='#111112' offset='100%'></stop> </linearGradient> <path d='M41.5,16.0112108 L41.5,-1.5 L41,-1.5 L41,16.0112108 C41.0823405,16.0037907 41.1657276,16 41.25,16 C41.3342724,16 41.4176595,16.0037907 41.5,16.0112108 Z M41.5,21.4887892 L41.5,63 L41,63 L41,21.4887892 C41.0823405,21.4962093 41.1657276,21.5 41.25,21.5 C41.3342724,21.5 41.4176595,21.4962093 41.5,21.4887892 Z M41.25,21 C42.4926407,21 43.5,19.9926407 43.5,18.75 C43.5,17.5073593 42.4926407,16.5 41.25,16.5 C40.0073593,16.5 39,17.5073593 39,18.75 C39,19.9926407 40.0073593,21 41.25,21 Z' id='path-4'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-5'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-244.000000, -203.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Stocks' transform='translate(244.000000, 176.000000)'> <mask id='mask-2' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='BG' fill='#141416' xlink:href='#path-1'></use> <path d='M-0.484863281,34.0537109 C-0.484863281,34.0537109 1.27239211,34.0644686 3.11938477,34.6320801 C4.70794495,35.120271 6.30098176,36.2523786 7.23388672,36.1945801 C9.25146484,36.0695801 11.3344727,35.3759766 11.3344727,35.3759766 L15.1208496,30.4450684 L18.7275391,33.5263672 L22.4941406,24.6245117 L26.1196289,34.3369141 L30.25,36.8659668 L33.9467773,30.2084961 L37.5385742,29.276123 L41.4316406,18.1323242 L45.1474609,27.2033691 L48.9438477,24.6655273 L52.7734375,31.9936523 L56.3422852,23.8173828 L60.3457031,19.65625 L60.3457031,60.4791166 L-0.304989325,60.4791166 L-0.484863281,34.0537109 Z' id='graph' stroke='#FFFFFF' stroke-width='0.75' fill='url(#linearGradient-3)' mask='url(#mask-2)'></path> <g id='mark' mask='url(#mask-2)'> <use fill='black' fill-opacity='1' filter='url(#filter-5)' xlink:href='#path-4'></use> <use fill='#01A6F1' fill-rule='evenodd' xlink:href='#path-4'></use> </g> <g id='Spark-line' mask='url(#mask-2)' fill='#777778'> <g transform='translate(7.000000, -1.500000)' id='mark'> <rect x='0' y='0' width='0.5' height='64.5'></rect> <rect x='11.5' y='0' width='0.5' height='64.5'></rect> <rect x='23' y='0' width='0.5' height='64.5'></rect> <rect x='45.5' y='0' width='0.5' height='64.5'></rect> </g> </g> </g> </g> </g> </g> </svg>"
};

exports.frames = {
  "fullscreen": {
    height: window.innerHeight,
    width: window.innerWidth,
    scale: 1,
    mobile: false,
    platform: "web"
  },
  "apple-iphone-5s-space-gray": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5s-silver": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5s-gold": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-green": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-blue": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-red": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-white": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-yellow": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-pink": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-space-gray": {
    height: 1334,
    width: 750,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-silver": {
    height: 1334,
    width: 750,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-gold": {
    height: 1334,
    width: 750,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-rose-gold": {
    height: 1334,
    width: 750,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus-gold": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus-silver": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus-space-gray": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus-rose-gold": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-air-2-gold": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-air-2-silver": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-air-2-space-gray": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-mini-4-gold": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-mini-4-space-gray": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-mini-4-silver": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-pro-gold": {
    height: 2732,
    width: 2048,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-pro-silver": {
    height: 2732,
    width: 2048,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-pro-space-gray": {
    height: 2732,
    width: 2048,
    scale: 2,
    mobile: true,
    platform: "iOS"
  }
};

exports.framerFrames = {
  640: 2,
  750: 2,
  768: 2,
  1080: 3,
  1242: 3,
  1440: 4,
  1536: 2
};

exports.realDevices = {
  320: {
    480: {
      name: "iphone",
      display_name: "iPhone",
      width: 320,
      height: 480,
      scale: 1
    }
  },
  480: {
    854: {
      name: "Android One",
      width: 480,
      height: 854,
      scale: 1.5
    }
  },
  640: {
    960: {
      name: "iphone-5",
      display_name: "iPhone 4",
      width: 640,
      height: 960,
      scale: 2
    },
    1136: {
      name: "iphone-5",
      display_name: "iPhone 5",
      width: 640,
      height: 1136,
      scale: 2
    }
  },
  720: {
    1280: {
      name: "XHDPI",
      width: 720,
      height: 1280,
      scale: 2
    }
  },
  750: {
    1118: {
      name: "iphone-6s",
      display_name: "iPhone 6s",
      width: 750,
      height: 1118,
      scale: 2
    },
    1334: {
      name: "iphone-6s",
      display_name: "iPhone 6s",
      width: 750,
      height: 1334,
      scale: 2
    }
  },
  768: {
    1024: {
      name: "ipad",
      display_name: "iPad",
      width: 768,
      height: 1024,
      scale: 1
    },
    1280: {
      name: "Nexus 4",
      width: 768,
      height: 1280,
      scale: 2
    }
  },
  800: {
    1280: {
      name: "Nexus 7",
      width: 800,
      height: 1280,
      scale: 1
    }
  },
  1080: {
    1920: {
      name: "XXHDPI",
      width: 1080,
      height: 1920,
      scale: 3
    }
  },
  1200: {
    1920: {
      name: "Nexus 7",
      width: 1200,
      height: 1920,
      scale: 2
    }
  },
  1242: {
    2208: {
      name: "iphone-6s-plus",
      display_name: "iPhone 6 Plus",
      width: 1242,
      height: 2208,
      scale: 3
    }
  },
  1334: {
    750: {
      name: "iphone-6s",
      display_name: "iPhone 6s",
      width: 750,
      height: 1334,
      scale: 2
    }
  },
  1440: {
    2560: {
      name: "XXXHDPI",
      width: 1440,
      height: 2560,
      scale: 4
    }
  },
  1441: {
    2561: {
      name: "Nexus 6",
      width: 1440,
      height: 2560,
      scale: 4
    }
  },
  1536: {
    2048: {
      name: "ipad",
      display_name: "iPad",
      width: 1536,
      height: 2048,
      scale: 2
    }
  },
  1600: {
    2056: {
      name: "Nexus 10",
      width: 1600,
      height: 2056,
      scale: 2
    }
  },
  2208: {
    1242: {
      name: "iphone-6s-plus",
      display_name: "iPhone 6 Plus",
      width: 1242,
      height: 2208,
      scale: 3
    }
  },
  2048: {
    1536: {
      name: "Nexus 9",
      width: 2048,
      height: 1536,
      scale: 2
    },
    2732: {
      name: "ipad-pro",
      display_name: "iPad Pro",
      width: 2048,
      height: 2732,
      scale: 2
    }
  },
  2560: {
    1600: {
      name: "Nexus 10",
      width: 2560,
      height: 1600,
      scale: 2
    }
  },
  2732: {
    2048: {
      name: "ipad-pro",
      display_name: "iPad Pro",
      width: 2732,
      height: 2048,
      scale: 2
    }
  }
};


},{"ios-kit":"ios-kit"}],"ios-kit-nav-bar":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  title: "Title",
  left: void 0,
  right: "Edit",
  blur: true,
  superLayer: void 0,
  type: "navBar",
  color: 'blue',
  titleColor: 'black',
  backgroundColor: "rgba(255, 255, 255, .8)",
  dividerBackgroundColor: "#B2B2B2"
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var bar, i, layer, len, ref, setLeading, setup, svg;
  setup = ios.utils.setupComponent(array, exports.defaults);
  bar = new ios.View({
    name: "navBar",
    backgroundColor: setup.backgroundColor,
    constraints: {
      leading: 0,
      trailing: 0,
      top: 0,
      height: 64
    }
  });
  bar.bg = new ios.View({
    superLayer: bar,
    backgroundColor: 'transparent',
    name: ".bg",
    constraints: {
      leading: 0,
      trailing: 0,
      height: 44,
      bottom: 0
    }
  });
  bar.divider = new ios.View({
    backgroundColor: setup.dividerBackgroundColor,
    name: ".divider",
    superLayer: bar.bg,
    constraints: {
      height: .5,
      bottom: 0,
      leading: 0,
      trailing: 0
    }
  });
  if (setup.superLayer) {
    setup.superLayer.addSubLayer(bar);
  }
  if (setup.blur) {
    ios.utils.bgBlur(bar);
  }
  if (setup.blur === false && setup.backgroundColor === "rgba(255, 255, 255, .8)") {
    bar.backgroundColor = 'white';
  }
  bar.type = setup.type;
  ref = Framer.CurrentContext.layers;
  for (i = 0, len = ref.length; i < len; i++) {
    layer = ref[i];
    if (layer.type === "statusBar") {
      this.statusBar = layer;
      bar.placeBehind(this.statusBar);
    }
  }
  if (typeof setup.title === "object") {
    setup.title = setup.title.label.html;
  }
  bar.title = new ios.Text({
    fontWeight: "semibold",
    superLayer: bar.bg,
    text: setup.title,
    name: ".title",
    color: setup.titleColor,
    constraints: {
      align: "horizontal",
      bottom: 12
    }
  });
  ios.utils.specialChar(bar.title);
  if (typeof setup.right === "string" && typeof setup.right !== "boolean") {
    bar.right = new ios.Button({
      name: ".right",
      superLayer: bar.bg,
      text: setup.right,
      color: setup.color,
      fontWeight: 500,
      constraints: {
        bottom: 12,
        trailing: 8
      }
    });
    bar.right.type = "button";
    ios.utils.specialChar(bar.right);
  }
  if (typeof setup.right === "object") {
    bar.right = setup.right;
    bar.right.name = ".right";
    bar.right.superLayer = bar.bg;
    bar.right.constraints = {
      trailing: 8,
      bottom: 12
    };
    ios.layout.set(bar.right);
  }
  if (typeof setup.left === "string" && typeof setup.left !== "boolean") {
    setLeading = 8;
    if (setup.left.indexOf("<") !== -1) {
      svg = ios.utils.svg(ios.assets.chevron);
      bar.chevron = new ios.View({
        name: ".chevron",
        width: svg.width,
        height: svg.height,
        backgroundColor: "transparent",
        superLayer: bar.bg
      });
      bar.chevron.html = svg.svg;
      bar.chevron.constraints = {
        bottom: 9,
        leading: 8
      };
      setup.left = setup.left.replace("<", "");
      ios.utils.changeFill(bar.chevron, setup.color);
      setLeading = [bar.chevron, 4];
      ios.layout.set(bar.chevron);
    }
    bar.left = new ios.Button({
      name: ".left",
      superLayer: bar.bg,
      text: setup.left,
      color: setup.color,
      fontWeight: 500,
      constraints: {
        bottom: 12,
        leading: setLeading
      }
    });
    bar.left.type = "button";
    ios.utils.specialChar(bar.left);
    bar.left.on(Events.TouchStart, function() {
      if (bar.chevron) {
        return bar.chevron.animate({
          properties: {
            opacity: .25
          },
          time: .5
        });
      }
    });
    bar.left.on(Events.TouchEnd, function() {
      if (bar.chevron) {
        return bar.chevron.animate({
          properties: {
            opacity: 1
          },
          time: .5
        });
      }
    });
  }
  if (typeof setup.left === "object") {
    bar.left = setup.left;
    bar.left.name = ".left";
    bar.left.superLayer = bar.bg;
    bar.left.constraints = {
      leading: 8,
      bottom: 12
    };
  }
  ios.layout.set(bar.left);
  return bar;
};


},{"ios-kit":"ios-kit"}],"ios-kit-sheet":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  actions: ["Reply", "Reply All", "Forward", "Print"],
  exit: "Cancel",
  animated: true,
  description: void 0,
  target: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var a, action, i, j, k, l, len, len1, place, ref, ref1, setup, sheet, sheetTip;
  setup = ios.utils.setupComponent(array, exports.defaults);
  ref = Framer.CurrentContext.layers;
  for (j = 0, len = ref.length; j < len; j++) {
    l = ref[j];
    if (l.type === 'sheet') {
      l.dismiss();
    }
  }
  sheet = new ios.View({
    name: "sheet",
    backgroundColor: "transparent",
    constraints: {
      top: 0,
      leading: 0,
      trailing: 0,
      bottom: 0
    }
  });
  sheet.type = 'sheet';
  sheet.menu = new Layer({
    name: "menu",
    superLayer: sheet,
    backgroundColor: "transparent",
    borderRadius: ios.px(12),
    clip: true
  }, ios.isPad() ? (sheetTip = ios.utils.svg(ios.assets.sheetTip), sheet.tip = new ios.View({
    name: '.tip',
    color: 'black',
    superLayer: sheet,
    html: sheetTip.svg,
    height: sheetTip.height - 4,
    width: sheetTip.width,
    backgroundColor: 'transparent',
    constraints: {
      horizontalCenter: setup.target
    }
  }), sheet.linked = setup.target, sheet.linked.ignoreEvents = true) : void 0);
  place = function(t, l) {
    var centerX, h, w;
    w = ios.device.width;
    h = ios.device.height;
    centerX = w / 2;
    if (w - t.x > centerX) {
      if (t.x - ios.px(150) < 0) {
        l.constraints.leading = 10;
      } else {
        l.constraints.horizontalCenter = t;
      }
    } else {
      if (t.x + ios.px(150) > w) {
        l.constraints.trailing = 10;
      } else {
        l.constraints.horizontalCenter = t;
      }
    }
    if (t.y + l.height < h) {
      l.constraints.top = [t, 40];
      if (ios.isPad()) {
        sheet.tip.constraints.bottom = [l, 1];
      }
    } else {
      l.constraints.bottom = [t, 40];
      if (ios.isPad()) {
        sheet.tip.constraints.top = [l, 1];
        sheet.tip.rotation = 180;
      }
    }
    if (ios.isPad()) {
      return ios.layout.set(sheet.tip);
    }
  };
  sheet.dismiss = function() {
    if (ios.isPhone()) {
      sheet.menu.animate({
        properties: {
          y: ios.device.height
        },
        time: .25
      });
      sheet.cancel.animate({
        properties: {
          y: ios.device.height + ios.px(75)
        },
        time: .25
      });
      sheet.overlay.animate({
        properties: {
          opacity: 0
        },
        time: .25
      });
      return Utils.delay(.25, function() {
        return sheet.destroy();
      });
    } else {
      sheet.linked.ignoreEvents = false;
      return Utils.delay(.15, function() {
        return sheet.destroy();
      });
    }
  };
  sheet.call = function() {
    if (ios.isPhone()) {
      sheet.menu.y = ios.device.height;
      sheet.cancel.y = ios.device.height + ios.px(75);
      sheet.overlay.opacity = 0;
      sheet.overlay.animate({
        properties: {
          opacity: .5
        },
        time: .25
      });
      return ios.layout.animate({
        target: [sheet.menu, sheet.cancel],
        time: .25
      });
    } else {
      place(setup.target, sheet.menu);
      return ios.layout.set(sheet.menu);
    }
  };
  if (ios.device.name.indexOf("ipad") === -1) {
    sheet.overlay = new ios.View({
      name: ".overlay",
      backgroundColor: "black",
      opacity: .5,
      superLayer: sheet,
      constraints: {
        top: 0,
        leading: 0,
        trailing: 0,
        bottom: 0
      }
    });
    sheet.overlay.sendToBack();
    sheet.menu.constraints = {
      leading: 10,
      trailing: 10,
      bottom: 57 + 8 + 10,
      height: setup.actions.length * 57
    };
    sheet.cancel = new ios.Button({
      name: ".cancel",
      type: "big",
      text: setup.exit,
      superLayer: sheet,
      constraints: {
        bottom: 10,
        leading: 0,
        trailing: 0
      }
    });
    sheet.cancel.on(Events.TouchEnd, function() {
      return sheet.dismiss();
    });
  } else {
    sheet.menu.constraints = {
      width: 300,
      height: setup.actions.length * 57
    };
    sheet.menu.props = {
      shadowY: 2,
      shadowBlur: ios.px(100),
      shadowColor: "rgba(0,0,0,0.1)"
    };
  }
  ios.layout.set(sheet);
  sheet.actionsArray = [];
  sheet.actions = {};
  ref1 = setup.actions;
  for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
    a = ref1[i];
    action = new ios.View({
      name: ".actions.[\"" + a.toLowerCase() + "\"]",
      backgroundColor: "rgba(255,255,255,1)",
      superLayer: sheet.menu,
      constraints: {
        leading: 0,
        trailing: 0,
        height: 57
      }
    });
    action.style["-webkit-box-shadow"] = "inset 0 0 " + ios.px(.5) + "px rgba(0,0,0,.25)";
    action.label = new ios.Text({
      text: a,
      color: ios.color("blue"),
      fontSize: 20,
      superLayer: action,
      constraints: {
        align: "center"
      }
    });
    ios.utils.specialChar(action.label);
    if (i === 0) {
      action.constraints.top = 0;
    } else {
      action.constraints.top = sheet.actionsArray[i - 1];
    }
    action.on(Events.TouchStart, function() {
      return this.animate({
        properties: {
          backgroundColor: this.backgroundColor.darken(10),
          time: .2
        }
      });
    });
    action.on(Events.TouchEnd, function() {
      this.animate({
        properties: {
          backgroundColor: "rgba(255,255,255, .8)"
        },
        time: .2
      });
      return sheet.dismiss();
    });
    ios.layout.set(action);
    sheet.actionsArray.push(action);
    sheet.actions[a.toLowerCase()] = action;
  }
  if (setup.animated) {
    sheet.call();
  }
  if (ios.isPad()) {
    sheet.tip.bringToFront();
  }
  return sheet;
};


},{"ios-kit":"ios-kit"}],"ios-kit-status-bar":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  carrier: "",
  network: "LTE",
  battery: 100,
  signal: 5,
  style: "dark",
  clock24: false,
  type: "statusBar",
  superLayer: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var batteryIcon, batteryPercent, bluetooth, bluetoothSVG, carrier, dot, gripper, highBattery, i, j, k, l, layer, len, lowBattery, midBattery, network, networkIcon, noNetwork, nonDot, nonDots, ref, ref1, ref2, setup, signal, statusBar, time;
  setup = ios.utils.setupComponent(array, exports.defaults);
  statusBar = new Layer({
    backgroundColor: "transparent",
    name: "statusBar.all",
    superLayer: setup.superLayer
  });
  statusBar.type = setup.type;
  statusBar.constraints = {
    leading: 0,
    trailing: 0,
    height: 20
  };
  switch (ios.device.name) {
    case "iphone-6s-plus":
      this.topConstraint = 5;
      this.batteryIcon = 5;
      this.bluetooth = 5;
      break;
    case "fullscreen":
      this.topConstraint = 5;
      this.batteryIcon = -12;
      this.bluetooth = -10;
      break;
    default:
      this.topConstraint = 3;
      this.batteryIcon = 2;
      this.bluetooth = 3;
  }
  if (setup.style === "light") {
    this.color = "white";
  } else {
    this.color = "black";
  }
  ref = Framer.CurrentContext.layers;
  for (j = 0, len = ref.length; j < len; j++) {
    layer = ref[j];
    if (layer.type === "lockScreen") {
      this.isLockScreenPutilsent = true;
    }
  }
  if (this.isLockScreenPutilsent) {
    gripper = new Layer({
      superLayer: statusBar,
      width: utils.px(37),
      height: utils.px(5),
      name: "gripper",
      backgroundColor: "transparent",
      opacity: .5,
      name: "gripper"
    });
    gripper.html = "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='" + (utils.px(37)) + "px' height='" + (utils.px(5)) + "px' viewBox='0 0 37 5' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Gripper</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Keyboard/Auto-Complete-Bar-Closed' transform='translate(-169.000000, -2.000000)' fill='#FFFFFF'> <rect id='Gripper' x='169.5' y='2.5' width='36' height='4' rx='2.5'></rect> </g> </g> </svg>";
    gripper.constraints = {
      align: "horizontal",
      top: 2
    };
  } else {
    this.time = ios.utils.getTime();
    if (setup.clock24 === false) {
      if (this.time.hours > 11) {
        this.time.stamp = "PM";
      } else {
        this.time.stamp = "AM";
      }
    } else {
      this.time.stamp = "";
    }
    time = new ios.Text({
      style: "statusBarTime",
      text: ios.utils.timeFormatter(this.time, setup.clock24) + " " + this.time.stamp,
      fontSize: 12,
      fontWeight: "semibold",
      superLayer: statusBar,
      color: this.color,
      name: "time"
    });
    time.constraints = {
      align: "horizontal",
      top: this.topConstraint
    };
  }
  signal = [];
  if (setup.signal < 1) {
    noNetwork = new ios.Text({
      superLayer: statusBar,
      fontSize: 12,
      text: "No Network"
    });
    noNetwork.constraints = {
      leading: 7,
      top: 3
    };
  } else {
    for (i = k = 0, ref1 = setup.signal; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
      dot = new Layer({
        height: ios.utils.px(5.5),
        width: ios.utils.px(5.5),
        backgroundColor: "black",
        superLayer: statusBar,
        borderRadius: ios.utils.px(5.5) / 2,
        backgroundColor: this.color,
        name: "signal[" + i + "]"
      });
      if (i === 0) {
        dot.constraints = {
          leading: 7,
          top: 7
        };
      } else {
        dot.constraints = {
          leading: [signal[i - 1], 1],
          top: 7
        };
      }
      signal.push(dot);
      ios.layout.set();
    }
    if (setup.signal < 5) {
      nonDots = 5 - setup.signal;
      for (i = l = 0, ref2 = nonDots; 0 <= ref2 ? l < ref2 : l > ref2; i = 0 <= ref2 ? ++l : --l) {
        nonDot = new Layer({
          height: ios.utils.px(5.5),
          width: ios.utils.px(5.5),
          superLayer: statusBar,
          borderRadius: ios.utils.px(5.5) / 2,
          backgroundColor: "transparent",
          name: "signal[" + signal.length + "]"
        });
        nonDot.style.border = (ios.utils.px(1)) + "px solid " + this.color;
        nonDot.constraints = {
          leading: [signal[signal.length - 1], 1],
          top: 7
        };
        signal.push(nonDot);
        ios.layout.set();
      }
    }
    carrier = new ios.Text({
      style: "statusBarCarrier",
      text: setup.carrier,
      superLayer: statusBar,
      fontSize: 12,
      color: this.color,
      name: "carrier",
      textTransform: "capitalize"
    });
    carrier.constraints = {
      leading: [signal[signal.length - 1], 7],
      top: 3
    };
    ios.layout.set();
    if (setup.carrier) {
      network = new ios.Text({
        style: "statusBarNetwork",
        text: setup.network,
        superLayer: statusBar,
        fontSize: 12,
        color: this.color,
        name: "network",
        textTransform: "uppercase"
      });
      network.constraints = {
        leading: [carrier, 5],
        top: 3
      };
    }
    if (setup.carrier === "" || setup.carrier === "wifi") {
      networkIcon = ios.utils.svg(ios.assets.network, this.color);
      network = new Layer({
        width: networkIcon.width,
        height: networkIcon.height,
        superLayer: statusBar,
        backgroundColor: "transparent",
        name: "network"
      });
      network.html = networkIcon.svg;
      ios.utils.changeFill(network, this.color);
      network.constraints = {
        leading: [signal[signal.length - 1], 5],
        top: this.topConstraint
      };
    }
  }
  batteryIcon = new Layer({
    width: ios.utils.px(25),
    height: ios.utils.px(10),
    superLayer: statusBar,
    backgroundColor: "transparent",
    name: "batteryIcon"
  });
  if (setup.battery > 70) {
    highBattery = ios.utils.svg(ios.assets.batteryHigh);
    batteryIcon.html = highBattery.svg;
    ios.utils.changeFill(batteryIcon, this.color);
  }
  if (setup.battery <= 70 && setup.battery > 20) {
    midBattery = ios.utils.svg(ios.assets.batteryMid);
    batteryIcon.html = midBattery.svg;
    ios.utils.changeFill(batteryIcon, this.color);
  }
  if (setup.battery <= 20) {
    lowBattery = ios.utils.svg(ios.assets.batteryLow);
    batteryIcon.html = lowBattery.svg;
    ios.utils.changeFill(batteryIcon, this.color);
  }
  batteryIcon.constraints = {
    trailing: 7,
    top: this.batteryIcon
  };
  batteryPercent = new ios.Text({
    style: "statusBarBatteryPercent",
    text: setup.battery + "%",
    superLayer: statusBar,
    fontSize: 12,
    color: this.color,
    name: "batteryPercent"
  });
  batteryPercent.constraints = {
    trailing: [batteryIcon, 3],
    verticalCenter: time
  };
  bluetoothSVG = ios.utils.svg(ios.assets.bluetooth);
  bluetooth = new Layer({
    width: bluetoothSVG.width,
    height: bluetoothSVG.height,
    superLayer: statusBar,
    opacity: .5,
    backgroundColor: "transparent",
    name: "bluetooth"
  });
  bluetooth.html = bluetoothSVG.svg;
  ios.utils.changeFill(bluetooth, this.color);
  bluetooth.constraints = {
    top: this.bluetooth,
    trailing: [batteryPercent, 7]
  };
  ios.layout.set();
  statusBar.battery = {};
  statusBar.battery.percent = batteryPercent;
  statusBar.battery.icon = batteryIcon;
  statusBar.bluetooth = bluetooth;
  statusBar.time = time;
  statusBar.network = network;
  statusBar.carrier = carrier;
  statusBar.signal = signal;
  return statusBar;
};


},{"ios-kit":"ios-kit"}],"ios-kit-tab-bar":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  tab: {
    label: "label",
    icon: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='25px' height='25px' viewBox='0 0 25 25' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>1</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='1'> <g id='Bottom-Bar/Tab-Bar' transform='translate(-25.000000, -7.000000)' fill='#0076FF'> <g id='Placeholders' transform='translate(25.000000, 7.000000)'> <rect id='1' x='0' y='0' width='25' height='25' rx='3'></rect> </g> </g> </g> </svg>",
    active: void 0,
    inactive: void 0,
    tabBar: void 0,
    type: "tab"
  },
  bar: {
    tabs: [],
    start: 0,
    type: "tabBar",
    backgroundColor: "white",
    activeColor: "blue",
    inactiveColor: "gray",
    blur: true
  }
};

exports.defaults.tab.props = Object.keys(exports.defaults.tab);

exports.defaults.bar.props = Object.keys(exports.defaults.bar);

exports.tab = function(array) {
  var setup, specs, svgFrame, tab;
  setup = ios.utils.setupComponent(array, exports.defaults.tab);
  specs = {
    width: 75
  };
  switch (ios.device.name) {
    case "iphone-5":
      specs.width = 55;
  }
  tab = new ios.View({
    backgroundColor: "transparent",
    name: setup.label,
    constraints: {
      width: specs.width,
      height: 49
    }
  });
  tab.view = new ios.View({
    name: setup.label + ".view",
    backgroundColor: "transparent",
    constraints: {
      top: 0,
      bottom: 0,
      leading: 0,
      trailing: 0
    }
  });
  tab.active = new ios.View({
    name: ".active",
    backgroundColor: "transparent",
    constraints: {
      top: 0,
      bottom: 0,
      leading: 0,
      trailing: 0
    },
    superLayer: tab
  });
  tab.active.icon = new ios.View({
    name: ".active.icon",
    constraints: {
      width: 25,
      height: 25,
      align: "horizontal",
      top: 7
    },
    backgroundColor: "transparent",
    superLayer: tab.active
  });
  if (setup.active === void 0) {
    svgFrame = ios.utils.svg(setup.icon);
    tab.active.icon.html = svgFrame.svg;
    tab.active.icon.width = svgFrame.width;
    tab.active.icon.height = svgFrame.height;
  } else {
    setup.active.superLayer = tab.active.icon;
    setup.active.props = {
      width: tab.active.icon.width,
      height: tab.active.icon.height
    };
  }
  tab.inactive = new ios.View({
    backgroundColor: "transparent",
    name: ".inactive",
    constraints: {
      top: 0,
      bottom: 0,
      leading: 0,
      trailing: 0
    },
    superLayer: tab
  });
  tab.inactive.icon = new ios.View({
    constraints: {
      width: 25,
      height: 25,
      align: "horizontal",
      top: 7
    },
    backgroundColor: "transparent",
    name: ".inactive.icon",
    superLayer: tab.inactive
  });
  tab.label = new ios.Text({
    text: setup.label,
    superLayer: tab,
    color: "#929292",
    fontSize: 10,
    name: ".label",
    textTransform: "capitalize"
  });
  tab.label.constraints = {
    bottom: 2,
    horizontalCenter: tab.active.icon
  };
  if (setup.inactive === void 0) {
    svgFrame = ios.utils.svg(setup.icon);
    tab.inactive.icon.html = svgFrame.svg;
    tab.inactive.icon.width = svgFrame.width;
    tab.inactive.icon.height = svgFrame.height;
  } else {
    setup.inactive.superLayer = tab.inactive.icon;
    setup.inactive.props = {
      width: tab.inactive.icon.width,
      height: tab.inactive.icon.height
    };
  }
  return tab;
};

exports.bar = function(array) {
  var bar, dummyTab, dummyTab2, i, index, len, ref, setActive, setup, specs, tab;
  setup = ios.utils.setupComponent(array, exports.defaults.bar);
  if (setup.tabs.length === 0) {
    dummyTab = new exports.tab;
    dummyTab2 = new exports.tab;
    setup.tabs.push(dummyTab);
    setup.tabs.push(dummyTab2);
  }
  specs = {
    width: 75
  };
  switch (ios.device.name) {
    case "iphone-5":
      specs.width = 55;
  }
  bar = new ios.View({
    backgroundColor: "transparent",
    name: "tabBar",
    constraints: {
      leading: 0,
      trailing: 0,
      bottom: 0,
      height: 49
    }
  });
  bar.bg = new ios.View({
    superLayer: bar,
    name: ".bg",
    constraints: {
      leading: 0,
      trailing: 0,
      bottom: 0,
      height: 49
    }
  });
  bar.divider = new ios.View({
    backgroundColor: "#B2B2B2",
    name: ".divider",
    superLayer: bar,
    constraints: {
      top: 0,
      leading: 0,
      trailing: 0,
      height: .5
    }
  });
  bar.box = new ios.View({
    superLayer: bar,
    backgroundColor: "transparent",
    name: ".box",
    constraints: {
      height: 49,
      width: setup.tabs.length * specs.width
    }
  });
  setActive = function(tabIndex) {
    var i, index, len, ref, results, tab;
    ref = setup.tabs;
    results = [];
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      tab = ref[index];
      if (index === tabIndex) {
        tab.label.color = ios.utils.color(setup.activeColor);
        tab.active.visible = true;
        tab.inactive.visible = false;
        results.push(tab.view.visible = true);
      } else {
        tab.label.color = ios.utils.color(setup.inactiveColor);
        tab.active.visible = false;
        tab.inactive.visible = true;
        results.push(tab.view.visible = false);
      }
    }
    return results;
  };
  ref = setup.tabs;
  for (index = i = 0, len = ref.length; i < len; index = ++i) {
    tab = ref[index];
    bar.box.addSubLayer(tab);
    ios.utils.changeFill(tab.active.icon, ios.utils.color(setup.activeColor));
    ios.utils.changeFill(tab.inactive.icon, ios.utils.color(setup.inactiveColor));
    tab.label.color = ios.utils.color(setup.inactiveColor);
    bar.bg.backgroundColor = setup.backgroundColor;
    if (setup.blur) {
      bar.bg.backgroundColor = "rgba(255,255,255, .9)";
      ios.utils.bgBlur(bar.bg);
    }
    if (index === 0) {
      tab.constraints.leading = 0;
    } else {
      tab.constraints.leading = setup.tabs[index - 1];
    }
    ios.layout.set(tab);
    tab.on(Events.TouchStart, function() {
      var tabIndex;
      tabIndex = this.x / ios.utils.px(specs.width);
      return setActive(tabIndex);
    });
  }
  bar.box.constraints = {
    align: "horizontal"
  };
  ios.layout.set(bar.box);
  setActive(setup.start);
  bar.tabs = setup.tabs;
  return bar;
};


},{"ios-kit":"ios-kit"}],"ios-kit-temp":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  key: "value"
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var setup;
  setup = ios.utils.setupComponent(array, exports.defaults);
};


},{"ios-kit":"ios-kit"}],"ios-kit-text":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  editable: true,
  constraints: void 0,
  text: "iOS Text Layer",
  type: "text",
  x: 0,
  y: 0,
  width: -1,
  height: -1,
  superLayer: void 0,
  style: "default",
  lines: 1,
  textAlign: "left",
  backgroundColor: "transparent",
  color: "black",
  fontSize: 17,
  fontFamily: "-apple-system, Helvetica, Arial, sans-serif",
  fontWeight: "regular",
  lineHeight: "auto",
  name: "text layer",
  opacity: 1,
  textTransform: "none",
  letterSpacing: 0,
  name: "text layer",
  selectable: true,
  selectColor: "rgba(0, 118, 255, .2)",
  selectControls: "#0076FF"
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var exceptions, i, j, len, len1, prop, ref, ref1, setup, textFrame, textLayer;
  setup = ios.utils.setupComponent(array, exports.defaults);
  exceptions = Object.keys(setup);
  textLayer = new ios.View({
    backgroundColor: "transparent",
    name: setup.name,
    superLayer: setup.superLayer,
    constraints: setup.constraints
  });
  textLayer.type = "text";
  textLayer.html = setup.text;
  ref = ios.lib.layerProps;
  for (i = 0, len = ref.length; i < len; i++) {
    prop = ref[i];
    if (setup[prop]) {
      if (prop === "color") {
        setup[prop] = ios.utils.color(setup[prop]);
      }
      textLayer[prop] = setup[prop];
    }
  }
  ref1 = ios.lib.layerStyles;
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    prop = ref1[j];
    if (setup[prop]) {
      if (prop === "lineHeight" && setup[prop] === "auto") {
        textLayer.style.lineHeight = setup.fontSize;
      }
      if (prop === "fontWeight") {
        switch (setup[prop]) {
          case "ultrathin":
            setup[prop] = 100;
            break;
          case "thin":
            setup[prop] = 200;
            break;
          case "light":
            setup[prop] = 300;
            break;
          case "regular":
            setup[prop] = 400;
            break;
          case "medium":
            setup[prop] = 500;
            break;
          case "semibold":
            setup[prop] = 600;
            break;
          case "bold":
            setup[prop] = 700;
            break;
          case "black":
            setup[prop] = 800;
        }
      }
      if (prop === "fontSize" || prop === "lineHeight" || prop === "letterSpacing") {
        setup[prop] = ios.utils.px(setup[prop]) + "px";
      }
      textLayer.style[prop] = setup[prop];
    }
  }
  textFrame = ios.utils.textAutoSize(textLayer);
  textLayer.props = {
    height: textFrame.height,
    width: textFrame.width
  };
  if (setup.editable) {
    textLayer.on("change:html", function() {
      textFrame = ios.utils.textAutoSize(textLayer);
      return textLayer.props = {
        height: textFrame.height,
        width: textFrame.width
      };
    });
  }
  ios.layout.set({
    target: textLayer
  });
  return textLayer;
};


},{"ios-kit":"ios-kit"}],"ios-kit-utils":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.pt = function(px) {
  var pt;
  pt = px / ios.device.scale;
  pt = Math.round(pt);
  return pt;
};

exports.px = function(pt) {
  var px;
  px = pt * ios.device.scale;
  px = Math.round(px);
  return px;
};

exports.color = function(colorString) {
  var color;
  color = "";
  if (typeof colorString === "string") {
    colorString = colorString.toLowerCase();
    if (colorString.slice(0, 4) === "rgba") {
      return colorString;
    }
  }
  switch (colorString) {
    case "red":
      color = new Color("#FE3824");
      break;
    case "blue":
      color = new Color("#0076FF");
      break;
    case "pink":
      color = new Color("#FE2851");
      break;
    case "grey":
      color = new Color("#929292");
      break;
    case "gray":
      color = new Color("#929292");
      break;
    case "black":
      color = new Color("#030303");
      break;
    case "white":
      color = new Color("#EFEFF4");
      break;
    case "orange":
      color = new Color("#FF9600");
      break;
    case "green":
      color = new Color("#44DB5E");
      break;
    case "light blue":
      color = new Color("#54C7FC");
      break;
    case "light-blue":
      color = new Color("#54C7FC");
      break;
    case "yellow":
      color = new Color("#FFCD00");
      break;
    case "light key":
      color = new Color("#9DA7B3");
      break;
    case "light-key":
      color = new Color("#9DA7B3");
      break;
    default:
      if (colorString[0] === "#" || colorString.toHexString()[0] === "#") {
        color = new Color(colorString);
      } else {
        color = new Color("#929292");
      }
  }
  return color;
};

exports.clean = function(string) {
  string = string.replace(/[&]nbsp[;]/gi, " ").replace(/[<]br[>]/gi, "");
  return string;
};

exports.svg = function(svg) {
  var endIndex, hEndIndex, hStartIndex, height, heightString, newHeight, newString, newWidth, startIndex, string, wEndIndex, wStartIndex, width;
  startIndex = svg.search("<svg width=");
  endIndex = svg.search(" viewBox");
  string = svg.slice(startIndex, endIndex);
  wStartIndex = string.search("=") + 2;
  wEndIndex = string.search("px");
  width = string.slice(wStartIndex, wEndIndex);
  newWidth = exports.px(width);
  heightString = string.slice(wEndIndex + 4, string.length);
  hStartIndex = heightString.search("=") + 2;
  hEndIndex = heightString.search("px");
  height = heightString.slice(hStartIndex, hEndIndex);
  newHeight = exports.px(height);
  newString = string.replace(width, newWidth);
  newString = newString.replace(height, newHeight);
  svg = svg.replace(string, newString);
  return {
    svg: svg,
    width: newWidth,
    height: newHeight
  };
};

exports.changeFill = function(layer, color) {
  var endIndex, fillString, newString, startIndex, string;
  startIndex = layer.html.search("fill=\"#");
  fillString = layer.html.slice(startIndex, layer.html.length);
  endIndex = fillString.search("\">");
  string = fillString.slice(0, endIndex);
  newString = "fill=\"" + exports.color(color);
  return layer.html = layer.html.replace(string, newString);
};

exports.capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.getTime = function() {
  var date, dateObj, day, daysOfTheWeek, hours, mins, month, monthsOfTheYear, secs;
  daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dateObj = new Date();
  month = monthsOfTheYear[dateObj.getMonth()];
  date = dateObj.getDate();
  day = daysOfTheWeek[dateObj.getDay()];
  hours = dateObj.getHours();
  mins = dateObj.getMinutes();
  secs = dateObj.getSeconds();
  return {
    month: month,
    date: date,
    day: day,
    hours: hours,
    mins: mins,
    secs: secs
  };
};

exports.bgBlur = function(layer) {
  layer.style["-webkit-backdrop-filter"] = "blur(" + (exports.px(5)) + "px)";
  return layer;
};

exports.textAutoSize = function(textLayer) {
  var constraints, styles, textFrame;
  constraints = {};
  if (textLayer.constraints) {
    if (textLayer.constraints.height) {
      constraints.height = exports.px(textLayer.constraints.height);
    }
    if (textLayer.constraints.width) {
      constraints.width = exports.px(textLayer.constraints.width);
    }
  }
  styles = {
    fontSize: textLayer.style.fontSize,
    fontFamily: textLayer.style.fontFamily,
    fontWeight: textLayer.style.fontWeight,
    lineHeight: textLayer.style.lineHeight,
    letterSpacing: textLayer.style.letterSpacing,
    textTransform: textLayer.style.textTransform
  };
  textFrame = Utils.textSize(textLayer.html, styles, constraints);
  return {
    width: textFrame.width,
    height: textFrame.height
  };
};

exports.getDevice = function() {
  var device, frame, nameFormatter;
  nameFormatter = function(name) {
    var j, len, removeTerms, term;
    removeTerms = ["apple-", "-gold", "-silver", "-rose", "-space-gray", "-yellow", "-green", "-red", "-white", "-blue", "-mini", "-air", "-2", "-4"];
    for (j = 0, len = removeTerms.length; j < len; j++) {
      term = removeTerms[j];
      name = name.replace(term, "");
    }
    if (name.indexOf("-5s") !== -1) {
      name = name.replace("-5s", "-5");
    }
    if (name.indexOf("-5c") !== -1) {
      name = name.replace("-5c", "-5");
    }
    return name;
  };
  device = "";
  frame = true;
  if (ios.lib.realDevices[innerWidth] && ios.lib.realDevices[innerWidth][innerHeight]) {
    device = ios.lib.realDevices[innerWidth][innerHeight];
    frame = false;
    Framer.Device.deviceType = "fullscreen";
  }
  if (frame) {
    device = {
      name: nameFormatter(Framer.Device.deviceType),
      display_name: Framer.DeviceView.Devices[Framer.Device.deviceType].display_name,
      width: Framer.DeviceView.Devices[Framer.Device.deviceType].screenWidth,
      height: Framer.DeviceView.Devices[Framer.Device.deviceType].screenHeight,
      scale: ios.lib.framerFrames[Framer.DeviceView.Devices[Framer.Device.deviceType].screenWidth]
    };
  }
  if (device.scale === void 0) {
    device.scale = 2;
  }
  if (device.width === void 0) {
    device.width = innerWidth;
  }
  if (device.height === void 0) {
    device.height = innerHeight;
  }
  return device;
  exports.scale = ios.lib.frames[device].scale;
  if (device === "fullscreen") {
    exports.width = window.innerWidth;
    exports.height = window.innerHeight;
  } else {
    exports.width = ios.lib.frames[device].width;
    exports.height = ios.lib.frames[device].height;
    if (window.innerWidth === 1242 || window.innerWidth === 2208) {
      exports.width = window.innerWidth;
      exports.height = window.innerHeight;
      exports.scale = 3;
    }
  }
  exports.mobile = ios.lib.frames[device].mobile;
  exports.platform = ios.lib.frames[device].platform;
  exports.orientation = Framer.Device.orientation;
  device = device.replace("apple-", "");
  device = device.replace("-gold", "");
  device = device.replace("-green", "");
  device = device.replace("-blue", "");
  device = device.replace("-red", "");
  device = device.replace("-white", "");
  device = device.replace("-yellow", "");
  device = device.replace("-pink", "");
  device = device.replace("-space-grey", "");
  device = device.replace("-rose", "");
  device = device.replace("5s", "5");
  device = device.replace("5c", "5");
  device = device.replace("-mini", "");
  device = device.replace("-air", "");
  device = device.replace("-2", "");
  device = device.replace("-4", "");
  device = device.replace("-silver", "");
  capturedDevice.name = device;
  return capturedDevice;
};

exports.specialChar = function(layer) {
  var chosenColor, newText, text;
  text = layer;
  if (layer.type === "button") {
    text = layer.label;
  }
  if (text.html.indexOf("-b") !== -1) {
    newText = text.html.replace("-b ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        fontWeight: 600
      }
    ]);
  }
  if (text.html.indexOf("-r") !== -1) {
    newText = text.html.replace("-r ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "red"
      }
    ]);
  }
  if (text.html.indexOf("-rb") !== -1) {
    newText = text.html.replace("-rb ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "blue"
      }
    ]);
  }
  if (text.html.indexOf("-lb") !== -1) {
    newText = text.html.replace("-lb ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "light-blue"
      }
    ]);
  }
  if (text.html.indexOf("-g") !== -1) {
    newText = text.html.replace("-g ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "green"
      }
    ]);
  }
  if (text.html.indexOf("-o") !== -1) {
    newText = text.html.replace("-o ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "orange"
      }
    ]);
  }
  if (text.html.indexOf("-p") !== -1) {
    newText = text.html.replace("-p ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "orange"
      }
    ]);
  }
  if (text.html.indexOf("-y") !== -1) {
    newText = text.html.replace("-y ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "yellow"
      }
    ]);
  }
  if (text.html.indexOf("-#") !== -1) {
    chosenColor = text.html.slice(1, 8);
    newText = text.html.slice(9, text.html.length);
    exports.update(text, [
      {
        text: newText
      }, {
        color: chosenColor
      }
    ]);
  }
  if (text.html.indexOf("-") !== -1) {
    newText = text.html.replace("- ", "");
    exports.update(text, [
      {
        text: newText
      }
    ]);
  }
  if (layer.buttonType === "text") {
    layer.width = text.width;
  }
  ios.layout.set(layer);
  if (layer.type === "button") {
    layer.width = text.width;
  }
  return text.color;
};

exports.update = function(layer, array) {
  var change, j, key, len, textFrame, value;
  if (array === void 0) {
    array = [];
  }
  if (layer.type === "text") {
    for (j = 0, len = array.length; j < len; j++) {
      change = array[j];
      key = Object.keys(change)[0];
      value = change[key];
      if (key === "text") {
        layer.html = value;
      }
      if (key === "fontWeight") {
        layer.style[key] = value;
      }
      if (key === "color") {
        layer.color = exports.color(value);
      }
    }
    textFrame = exports.textAutoSize(layer);
    layer.width = textFrame.width;
    layer.height = textFrame.height;
  }
  return ios.layout.set();
};

exports.autoColor = function(colorObject) {
  var blue, color, green, red, rgb;
  rgb = colorObject.toRgbString();
  rgb = rgb.substring(4, rgb.length - 1);
  rgb = rgb.replace(/ /g, '');
  rgb = rgb.replace(/ /g, '');
  rgb = rgb.split(',');
  red = rgb[0];
  green = rgb[1];
  blue = rgb[2];
  color = "";
  if ((red * 0.299 + green * 0.587 + blue * 0.114) > 186) {
    color = "#000";
  } else {
    color = "#FFF";
  }
  return color;
};

exports.sameParent = function(layer1, layer2) {
  var parentOne, parentTwo;
  parentOne = layer1.superLayer;
  parentTwo = layer2.superLayer;
  if (parentOne === parentTwo) {
    return true;
  } else {
    return false;
  }
};

exports.timeDelegate = function(layer, clockType) {
  this.time = exports.getTime();
  return Utils.delay(60 - this.time.secs, function() {
    this.time = exports.getTime();
    exports.update(layer, [
      {
        text: exports.timeFormatter(this.time, clockType)
      }
    ]);
    return Utils.interval(60, function() {
      this.time = exports.getTime();
      return exports.update(layer, [
        {
          text: exports.timeFormatter(this.time, clockType)
        }
      ]);
    });
  });
};

exports.timeFormatter = function(timeObj, clockType) {
  if (clockType === false) {
    if (timeObj.hours > 12) {
      timeObj.hours = timeObj.hours - 12;
    }
    if (timeObj.hours === 0) {
      timeObj.hours = 12;
    }
  }
  if (timeObj.mins < 10) {
    timeObj.mins = "0" + timeObj.mins;
  }
  return timeObj.hours + ":" + timeObj.mins;
};

exports.setupComponent = function(array, defaults) {
  var i, j, len, obj, ref;
  if (array === void 0) {
    array = [];
  }
  obj = {};
  ref = defaults.props;
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    if (array[i] !== void 0) {
      obj[i] = array[i];
    } else {
      obj[i] = defaults[i];
    }
  }
  return obj;
};

exports.emojiFormatter = function(string) {
  var arrayOfCodes, code, decoded, j, k, len, len1, unicodeFormat;
  unicodeFormat = "";
  if (string[0] === "E" || string[0] === "3" || string[0] === "2" || string[0] === "C") {
    arrayOfCodes = string.split(" ");
    for (j = 0, len = arrayOfCodes.length; j < len; j++) {
      code = arrayOfCodes[j];
      unicodeFormat = unicodeFormat + "%" + code;
    }
  } else {
    arrayOfCodes = string.split(" ");
    unicodeFormat = "%F0%9F";
    for (k = 0, len1 = arrayOfCodes.length; k < len1; k++) {
      code = arrayOfCodes[k];
      unicodeFormat = unicodeFormat + "%" + code;
    }
  }
  decoded = decodeURIComponent(unicodeFormat);
  return decoded;
};

exports.buildEmojisObject = function() {
  var code, emoji, emojis, index, j, len, ref, results;
  emojis = [];
  ref = ios.assets.emojiCodes;
  results = [];
  for (index = j = 0, len = ref.length; j < len; index = ++j) {
    code = ref[index];
    emoji = exports.emojiFormatter(code);
    results.push(emojis.push(emoji));
  }
  return results;
};

exports.write = function(obj, text) {
  if (obj.type === 'field') {
    return obj.text.html = obj.text.html + text;
  } else {
    return obj.html = obj.html + text;
  }
};


},{"ios-kit":"ios-kit"}],"ios-kit-view":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.create = function(obj) {
  var i, len, prop, ref, view;
  if (obj === void 0) {
    obj = {};
  }
  view = new Layer;
  view.constraints = {};
  ref = ios.lib.layerProps;
  for (i = 0, len = ref.length; i < len; i++) {
    prop = ref[i];
    if (obj[prop]) {
      view[prop] = obj[prop];
    }
  }
  if (obj["constraints"]) {
    view.constraints = obj["constraints"];
    ios.layout.set(view);
  }
  return view;
};


},{"ios-kit":"ios-kit"}],"ios-kit":[function(require,module,exports){
var conv, layout, library, utils;

exports.layout = layout = require('ios-kit-layout');

exports.lib = library = require('ios-kit-library');

exports.utils = utils = require('ios-kit-utils');

exports.converter = conv = require('ios-kit-converter');

exports.device = utils.getDevice();

exports.assets = library.assets;

exports.isPad = function() {
  if (exports.device.name.indexOf('ipad') !== -1) {
    return true;
  } else {
    return false;
  }
};

exports.isPhone = function() {
  if (exports.device.name.indexOf('iphone') !== -1) {
    return true;
  } else {
    return false;
  }
};

exports.convert = function(sketchObj) {
  return conv.convert(sketchObj);
};

exports.color = function(string) {
  return utils.color(string);
};

exports.px = function(num) {
  return utils.px(num);
};

exports.pt = function(num) {
  return utils.pt(num);
};

exports.alert = require('ios-kit-alert');

exports.banner = require('ios-kit-banner');

exports.button = require('ios-kit-button');

exports.field = require('ios-kit-field');

exports.keyboard = require('ios-kit-keyboard');

exports.nav = require('ios-kit-nav-bar');

exports.sheet = require('ios-kit-sheet');

exports.status = require('ios-kit-status-bar');

exports.tab = require('ios-kit-tab-bar');

exports.text = require('ios-kit-text');

exports.view = require('ios-kit-view');

exports.Alert = exports.alert.create;

exports.Banner = exports.banner.create;

exports.Button = exports.button.create;

exports.Field = exports.field.create;

exports.Keyboard = exports.keyboard.create;

exports.NavBar = exports.nav.create;

exports.Sheet = exports.sheet.create;

exports.StatusBar = exports.status.create;

exports.Tab = exports.tab.tab;

exports.TabBar = exports.tab.bar;

exports.Text = exports.text.create;

exports.View = exports.view.create;

exports.l = {};


},{"ios-kit-alert":"ios-kit-alert","ios-kit-banner":"ios-kit-banner","ios-kit-button":"ios-kit-button","ios-kit-converter":"ios-kit-converter","ios-kit-field":"ios-kit-field","ios-kit-keyboard":"ios-kit-keyboard","ios-kit-layout":"ios-kit-layout","ios-kit-library":"ios-kit-library","ios-kit-nav-bar":"ios-kit-nav-bar","ios-kit-sheet":"ios-kit-sheet","ios-kit-status-bar":"ios-kit-status-bar","ios-kit-tab-bar":"ios-kit-tab-bar","ios-kit-text":"ios-kit-text","ios-kit-utils":"ios-kit-utils","ios-kit-view":"ios-kit-view"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvaW9zLWtpdC5jb2ZmZWUiLCIuLi9tb2R1bGVzL2lvcy1raXQtdmlldy5jb2ZmZWUiLCIuLi9tb2R1bGVzL2lvcy1raXQtdXRpbHMuY29mZmVlIiwiLi4vbW9kdWxlcy9pb3Mta2l0LXRleHQuY29mZmVlIiwiLi4vbW9kdWxlcy9pb3Mta2l0LXRlbXAuY29mZmVlIiwiLi4vbW9kdWxlcy9pb3Mta2l0LXRhYi1iYXIuY29mZmVlIiwiLi4vbW9kdWxlcy9pb3Mta2l0LXN0YXR1cy1iYXIuY29mZmVlIiwiLi4vbW9kdWxlcy9pb3Mta2l0LXNoZWV0LmNvZmZlZSIsIi4uL21vZHVsZXMvaW9zLWtpdC1uYXYtYmFyLmNvZmZlZSIsIi4uL21vZHVsZXMvaW9zLWtpdC1saWJyYXJ5LmNvZmZlZSIsIi4uL21vZHVsZXMvaW9zLWtpdC1sYXlvdXQuY29mZmVlIiwiLi4vbW9kdWxlcy9pb3Mta2l0LWtleWJvYXJkLmNvZmZlZSIsIi4uL21vZHVsZXMvaW9zLWtpdC1maWVsZC5jb2ZmZWUiLCIuLi9tb2R1bGVzL2lvcy1raXQtY29udmVydGVyLmNvZmZlZSIsIi4uL21vZHVsZXMvaW9zLWtpdC1idXR0b24uY29mZmVlIiwiLi4vbW9kdWxlcy9pb3Mta2l0LWJhbm5lci5jb2ZmZWUiLCIuLi9tb2R1bGVzL2lvcy1raXQtYWxlcnQuY29mZmVlIiwiLi4vbW9kdWxlcy9jaGF0Qm90LmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiI2lPU0tpdCBNb2R1bGVcbiNCeSBLZXZ5biBBcm5vdHRcblxuIyBJbXBvcnQgZnJhbWV3b3JrXG5leHBvcnRzLmxheW91dCA9IGxheW91dCA9IHJlcXVpcmUgJ2lvcy1raXQtbGF5b3V0J1xuZXhwb3J0cy5saWIgPSBsaWJyYXJ5ID0gcmVxdWlyZSAnaW9zLWtpdC1saWJyYXJ5J1xuZXhwb3J0cy51dGlscyA9IHV0aWxzID0gcmVxdWlyZSAnaW9zLWtpdC11dGlscydcbmV4cG9ydHMuY29udmVydGVyID0gY29udiA9IHJlcXVpcmUgJ2lvcy1raXQtY29udmVydGVyJ1xuXG4jIFNldHVwIHJlc291cmNlc1xuZXhwb3J0cy5kZXZpY2UgPSB1dGlscy5nZXREZXZpY2UoKVxuZXhwb3J0cy5hc3NldHMgPSBsaWJyYXJ5LmFzc2V0c1xuZXhwb3J0cy5pc1BhZCA9IC0+IGlmIGV4cG9ydHMuZGV2aWNlLm5hbWUuaW5kZXhPZignaXBhZCcpICE9IC0xIHRoZW4gcmV0dXJuIHRydWUgZWxzZSByZXR1cm4gZmFsc2VcbmV4cG9ydHMuaXNQaG9uZSA9IC0+IGlmIGV4cG9ydHMuZGV2aWNlLm5hbWUuaW5kZXhPZignaXBob25lJykgIT0gLTEgdGhlbiByZXR1cm4gdHJ1ZSBlbHNlIHJldHVybiBmYWxzZVxuXG4jIFNob3J0Y3V0c1xuZXhwb3J0cy5jb252ZXJ0ID0gKHNrZXRjaE9iaikgLT5cbiAgY29udi5jb252ZXJ0KHNrZXRjaE9iailcblxuZXhwb3J0cy5jb2xvciA9IChzdHJpbmcpIC0+XG4gIHJldHVybiB1dGlscy5jb2xvcihzdHJpbmcpXG5cbmV4cG9ydHMucHggPSAobnVtKSAtPlxuICByZXR1cm4gdXRpbHMucHgobnVtKVxuXG5leHBvcnRzLnB0ID0gKG51bSkgLT5cbiAgcmV0dXJuIHV0aWxzLnB0KG51bSlcblxuI0ltcG9ydCBDb21wb25lbnRzXG5leHBvcnRzLmFsZXJ0ID0gcmVxdWlyZSAnaW9zLWtpdC1hbGVydCdcbmV4cG9ydHMuYmFubmVyID0gcmVxdWlyZSAnaW9zLWtpdC1iYW5uZXInXG5leHBvcnRzLmJ1dHRvbiA9IHJlcXVpcmUgJ2lvcy1raXQtYnV0dG9uJ1xuZXhwb3J0cy5maWVsZCA9IHJlcXVpcmUgJ2lvcy1raXQtZmllbGQnXG5leHBvcnRzLmtleWJvYXJkID0gcmVxdWlyZSAnaW9zLWtpdC1rZXlib2FyZCdcbmV4cG9ydHMubmF2ID0gcmVxdWlyZSAnaW9zLWtpdC1uYXYtYmFyJ1xuZXhwb3J0cy5zaGVldCA9IHJlcXVpcmUgJ2lvcy1raXQtc2hlZXQnXG5leHBvcnRzLnN0YXR1cyA9IHJlcXVpcmUgJ2lvcy1raXQtc3RhdHVzLWJhcidcbmV4cG9ydHMudGFiID0gcmVxdWlyZSAnaW9zLWtpdC10YWItYmFyJ1xuZXhwb3J0cy50ZXh0ID0gcmVxdWlyZSAnaW9zLWtpdC10ZXh0J1xuZXhwb3J0cy52aWV3ID0gcmVxdWlyZSAnaW9zLWtpdC12aWV3J1xuXG5cbiMjU2V0dXAgQ29tcG9uZW50c1xuZXhwb3J0cy5BbGVydCA9IGV4cG9ydHMuYWxlcnQuY3JlYXRlXG5leHBvcnRzLkJhbm5lciA9IGV4cG9ydHMuYmFubmVyLmNyZWF0ZVxuZXhwb3J0cy5CdXR0b24gPSBleHBvcnRzLmJ1dHRvbi5jcmVhdGVcbmV4cG9ydHMuRmllbGQgPSBleHBvcnRzLmZpZWxkLmNyZWF0ZVxuZXhwb3J0cy5LZXlib2FyZCA9IGV4cG9ydHMua2V5Ym9hcmQuY3JlYXRlXG5leHBvcnRzLk5hdkJhciA9IGV4cG9ydHMubmF2LmNyZWF0ZVxuZXhwb3J0cy5TaGVldCA9IGV4cG9ydHMuc2hlZXQuY3JlYXRlXG5leHBvcnRzLlN0YXR1c0JhciA9IGV4cG9ydHMuc3RhdHVzLmNyZWF0ZVxuZXhwb3J0cy5UYWIgPSBleHBvcnRzLnRhYi50YWJcbmV4cG9ydHMuVGFiQmFyID0gZXhwb3J0cy50YWIuYmFyXG5leHBvcnRzLlRleHQgPSBleHBvcnRzLnRleHQuY3JlYXRlXG5leHBvcnRzLlZpZXcgPSBleHBvcnRzLnZpZXcuY3JlYXRlXG5cblxuIyBMYXllcnMgZnJvbSBjb252ZXJ0aW5nXG5leHBvcnRzLmwgPSB7fVxuIiwiaW9zID0gcmVxdWlyZSAnaW9zLWtpdCdcblxuZXhwb3J0cy5jcmVhdGUgPSAob2JqKSAtPlxuXHRpZiBvYmogPT0gdW5kZWZpbmVkIHRoZW4gb2JqID0ge31cblxuXHR2aWV3ID0gbmV3IExheWVyXG5cdHZpZXcuY29uc3RyYWludHMgPSB7fVxuXG5cdCMgU2V0IGZyYW1lciBwcm9wc1xuXHRmb3IgcHJvcCBpbiBpb3MubGliLmxheWVyUHJvcHNcblx0XHRcdGlmIG9ialtwcm9wXSB0aGVuIHZpZXdbcHJvcF0gPSBvYmpbcHJvcF1cblxuXHQjIFNldCBjb25zdHJhaW50c1xuXHRpZiBvYmpbXCJjb25zdHJhaW50c1wiXVxuXHRcdHZpZXcuY29uc3RyYWludHMgPSBvYmpbXCJjb25zdHJhaW50c1wiXVxuXHRcdGlvcy5sYXlvdXQuc2V0KHZpZXcpXG5cblx0cmV0dXJuIHZpZXdcbiIsImlvcyA9IHJlcXVpcmUgJ2lvcy1raXQnXG5cbiMjIENvbnZlcnRzIHB4IHRvIHB0XG5leHBvcnRzLnB0ID0gKHB4KSAtPlxuXHRwdCA9IHB4L2lvcy5kZXZpY2Uuc2NhbGVcblx0cHQgPSBNYXRoLnJvdW5kKHB0KVxuXHRyZXR1cm4gcHRcblxuIyMgQ29udmVydHMgcHQgdG8gcHhcbmV4cG9ydHMucHggPSAocHQpIC0+XG5cdHB4ID0gcHQgKiBpb3MuZGV2aWNlLnNjYWxlXG5cdHB4ID0gTWF0aC5yb3VuZChweClcblx0cmV0dXJuIHB4XG5cbiMjIGlPUyBDb2xvciDigJMgVGhpcyB3aWxsIHN0b3JlIGFsbCBvZiB0aGUgZGVmYXVsdCBpT1MgY29sb3JzIGludGVhZCBvZiB0aGUgZGVmYXVsdCBDU1MgY29sb3JzLiAqVGhpcyBpcyBvbmx5IHVwIGhlcmUgYmVjYXVzZSBJIHJlZmVyIHRvIGl0IGluIHRoZSBkZWZhdWx0cy4qXG5leHBvcnRzLmNvbG9yID0gKGNvbG9yU3RyaW5nKSAtPlxuXHRjb2xvciA9IFwiXCJcblx0aWYgdHlwZW9mIGNvbG9yU3RyaW5nID09IFwic3RyaW5nXCJcblx0XHRjb2xvclN0cmluZyA9IGNvbG9yU3RyaW5nLnRvTG93ZXJDYXNlKClcblx0XHRpZiBjb2xvclN0cmluZ1swLi4uNF0gPT0gXCJyZ2JhXCJcblx0XHRcdHJldHVybiBjb2xvclN0cmluZ1xuXHRzd2l0Y2ggY29sb3JTdHJpbmdcblx0XHR3aGVuIFwicmVkXCJcblx0XHRcdGNvbG9yID0gbmV3IENvbG9yKFwiI0ZFMzgyNFwiKVxuXHRcdHdoZW4gXCJibHVlXCJcblx0XHRcdGNvbG9yID0gbmV3IENvbG9yKFwiIzAwNzZGRlwiKVxuXHRcdHdoZW4gXCJwaW5rXCJcblx0XHRcdGNvbG9yID0gbmV3IENvbG9yKFwiI0ZFMjg1MVwiKVxuXHRcdHdoZW4gXCJncmV5XCJcblx0XHRcdGNvbG9yID0gbmV3IENvbG9yKFwiIzkyOTI5MlwiKVxuXHRcdHdoZW4gXCJncmF5XCJcblx0XHRcdGNvbG9yID0gbmV3IENvbG9yKFwiIzkyOTI5MlwiKVxuXHRcdHdoZW4gXCJibGFja1wiXG5cdFx0XHRjb2xvciA9IG5ldyBDb2xvcihcIiMwMzAzMDNcIilcblx0XHR3aGVuIFwid2hpdGVcIlxuXHRcdFx0Y29sb3IgPSBuZXcgQ29sb3IoXCIjRUZFRkY0XCIpXG5cdFx0d2hlbiBcIm9yYW5nZVwiXG5cdFx0XHRjb2xvciA9IG5ldyBDb2xvcihcIiNGRjk2MDBcIilcblx0XHR3aGVuIFwiZ3JlZW5cIlxuXHRcdFx0Y29sb3IgPSBuZXcgQ29sb3IoXCIjNDREQjVFXCIpXG5cdFx0d2hlbiBcImxpZ2h0IGJsdWVcIlxuXHRcdFx0Y29sb3IgPSBuZXcgQ29sb3IoXCIjNTRDN0ZDXCIpXG5cdFx0d2hlbiBcImxpZ2h0LWJsdWVcIlxuXHRcdFx0Y29sb3IgPSBuZXcgQ29sb3IoXCIjNTRDN0ZDXCIpXG5cdFx0d2hlbiBcInllbGxvd1wiXG5cdFx0XHRjb2xvciA9IG5ldyBDb2xvcihcIiNGRkNEMDBcIilcblx0XHR3aGVuIFwibGlnaHQga2V5XCJcblx0XHRcdGNvbG9yID0gbmV3IENvbG9yKFwiIzlEQTdCM1wiKVxuXHRcdHdoZW4gXCJsaWdodC1rZXlcIlxuXHRcdFx0Y29sb3IgPSBuZXcgQ29sb3IoXCIjOURBN0IzXCIpXG5cdFx0ZWxzZVxuXHRcdFx0aWYgY29sb3JTdHJpbmdbMF0gPT0gXCIjXCIgfHwgY29sb3JTdHJpbmcudG9IZXhTdHJpbmcoKVswXSA9PSBcIiNcIlxuXHRcdFx0XHRjb2xvciA9IG5ldyBDb2xvcihjb2xvclN0cmluZylcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y29sb3IgPSBuZXcgQ29sb3IoXCIjOTI5MjkyXCIpXG5cdHJldHVybiBjb2xvclxuXG4jIFN1cHBvcnRpbmcgRnVuY3Rpb25zXG4jIFV0aWxzXG5cbiMgQ2xlYW5zIGEgc3RyaW5nIG9mIDxicj4gYW5kICZuYnNwO1xuZXhwb3J0cy5jbGVhbiA9IChzdHJpbmcpIC0+XG5cdCMjIHJlbW92ZSB3aGl0ZSBzcGFjZVxuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvWyZdbmJzcFs7XS9naSwgXCIgXCIpLnJlcGxhY2UoL1s8XWJyWz5dL2dpLCBcIlwiKVxuXHRyZXR1cm4gc3RyaW5nXG5cbiMgQ29udmVydHMgcHgncyBvZiBhbiBTVkcgdG8gc2NhbGFibGUgdmFyaWFibGVzXG5leHBvcnRzLnN2ZyA9IChzdmcpIC0+XG5cdCMgRmluZCBTdHJpbmdcblx0c3RhcnRJbmRleCA9IHN2Zy5zZWFyY2goXCI8c3ZnIHdpZHRoPVwiKVxuXHRlbmRJbmRleCA9IHN2Zy5zZWFyY2goXCIgdmlld0JveFwiKVxuXHRzdHJpbmcgPSBzdmcuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpXG5cblx0I0ZpbmQgd2lkdGhcblx0d1N0YXJ0SW5kZXggPSBzdHJpbmcuc2VhcmNoKFwiPVwiKSArIDJcblx0d0VuZEluZGV4ID0gIHN0cmluZy5zZWFyY2goXCJweFwiKVxuXHR3aWR0aCA9IHN0cmluZy5zbGljZSh3U3RhcnRJbmRleCwgd0VuZEluZGV4KVxuXHRuZXdXaWR0aCA9IGV4cG9ydHMucHgod2lkdGgpXG5cblx0IyBGaW5kIEhlaWdodFxuXHRoZWlnaHRTdHJpbmcgPSBzdHJpbmcuc2xpY2Uod0VuZEluZGV4ICsgNCwgc3RyaW5nLmxlbmd0aClcblx0aFN0YXJ0SW5kZXggPSBoZWlnaHRTdHJpbmcuc2VhcmNoKFwiPVwiKSsgMlxuXHRoRW5kSW5kZXggPSBoZWlnaHRTdHJpbmcuc2VhcmNoKFwicHhcIilcblx0aGVpZ2h0ID0gaGVpZ2h0U3RyaW5nLnNsaWNlKGhTdGFydEluZGV4LCBoRW5kSW5kZXgpXG5cdG5ld0hlaWdodCA9IGV4cG9ydHMucHgoaGVpZ2h0KVxuXG5cdCNDcmVhdGUgbmV3IHN0cmluZ1xuXHRuZXdTdHJpbmcgPSBzdHJpbmcucmVwbGFjZSh3aWR0aCwgbmV3V2lkdGgpXG5cdG5ld1N0cmluZyA9IG5ld1N0cmluZy5yZXBsYWNlKGhlaWdodCwgbmV3SGVpZ2h0KVxuXG5cdCNSZXBsYWNlIHN0cmluZ3Ncblx0c3ZnID0gc3ZnLnJlcGxhY2Uoc3RyaW5nLCBuZXdTdHJpbmcpXG5cblx0cmV0dXJuIHtcblx0XHRzdmc6c3ZnXG5cdFx0d2lkdGg6bmV3V2lkdGhcblx0XHRoZWlnaHQ6bmV3SGVpZ2h0XG5cdH1cblxuIyBDaGFuZ2VzIHRoZSBmaWxsIG9mIGFuIFNWR1xuZXhwb3J0cy5jaGFuZ2VGaWxsID0gKGxheWVyLCBjb2xvcikgLT5cblx0c3RhcnRJbmRleCA9IGxheWVyLmh0bWwuc2VhcmNoKFwiZmlsbD1cXFwiI1wiKVxuXHRmaWxsU3RyaW5nID0gbGF5ZXIuaHRtbC5zbGljZShzdGFydEluZGV4LCBsYXllci5odG1sLmxlbmd0aClcblx0ZW5kSW5kZXggPSBmaWxsU3RyaW5nLnNlYXJjaChcIlxcXCI+XCIpXG5cdHN0cmluZyA9IGZpbGxTdHJpbmcuc2xpY2UoMCwgZW5kSW5kZXgpXG5cdG5ld1N0cmluZyA9IFwiZmlsbD1cXFwiXCIgKyBleHBvcnRzLmNvbG9yKGNvbG9yKVxuXHRsYXllci5odG1sID0gbGF5ZXIuaHRtbC5yZXBsYWNlKHN0cmluZywgbmV3U3RyaW5nKVxuXG5leHBvcnRzLmNhcGl0YWxpemUgPSAoc3RyaW5nKSAtPlxuXHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpXG5cbiMgUmV0dXJucyB0aGUgY3VycmVudCB0aW1lXG5leHBvcnRzLmdldFRpbWUgPSAtPlxuXHRkYXlzT2ZUaGVXZWVrID0gW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl1cblx0bW9udGhzT2ZUaGVZZWFyID0gW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl1cblx0ZGF0ZU9iaiA9IG5ldyBEYXRlKClcblx0bW9udGggPSBtb250aHNPZlRoZVllYXJbZGF0ZU9iai5nZXRNb250aCgpXVxuXHRkYXRlID0gZGF0ZU9iai5nZXREYXRlKClcblx0ZGF5ID0gZGF5c09mVGhlV2Vla1tkYXRlT2JqLmdldERheSgpXVxuXHRob3VycyA9IGRhdGVPYmouZ2V0SG91cnMoKVxuXHRtaW5zID0gZGF0ZU9iai5nZXRNaW51dGVzKClcblx0c2VjcyA9IGRhdGVPYmouZ2V0U2Vjb25kcygpXG5cdHJldHVybiB7XG5cdFx0bW9udGg6bW9udGhcblx0XHRkYXRlOmRhdGVcblx0XHRkYXk6ZGF5XG5cdFx0aG91cnM6aG91cnNcblx0XHRtaW5zOm1pbnNcblx0XHRzZWNzOnNlY3Ncblx0fVxuXG5leHBvcnRzLmJnQmx1ciA9IChsYXllcikgLT5cblx0bGF5ZXIuc3R5bGVbXCItd2Via2l0LWJhY2tkcm9wLWZpbHRlclwiXSA9IFwiYmx1cigje2V4cG9ydHMucHgoNSl9cHgpXCJcblx0cmV0dXJuIGxheWVyXG5cbmV4cG9ydHMudGV4dEF1dG9TaXplID0gKHRleHRMYXllcikgLT5cblx0I0RlZmluZSBXaWR0aFxuXHRjb25zdHJhaW50cyA9IHt9XG5cdGlmIHRleHRMYXllci5jb25zdHJhaW50c1xuXHRcdGlmIHRleHRMYXllci5jb25zdHJhaW50cy5oZWlnaHRcblx0XHRcdGNvbnN0cmFpbnRzLmhlaWdodCA9IGV4cG9ydHMucHgodGV4dExheWVyLmNvbnN0cmFpbnRzLmhlaWdodClcblx0XHRpZiB0ZXh0TGF5ZXIuY29uc3RyYWludHMud2lkdGhcblx0XHRcdGNvbnN0cmFpbnRzLndpZHRoID0gZXhwb3J0cy5weCh0ZXh0TGF5ZXIuY29uc3RyYWludHMud2lkdGgpXG5cblx0c3R5bGVzID1cblx0XHRmb250U2l6ZTogdGV4dExheWVyLnN0eWxlLmZvbnRTaXplXG5cdFx0Zm9udEZhbWlseTogdGV4dExheWVyLnN0eWxlLmZvbnRGYW1pbHlcblx0XHRmb250V2VpZ2h0OiB0ZXh0TGF5ZXIuc3R5bGUuZm9udFdlaWdodFxuXHRcdGxpbmVIZWlnaHQ6IHRleHRMYXllci5zdHlsZS5saW5lSGVpZ2h0XG5cdFx0bGV0dGVyU3BhY2luZzogdGV4dExheWVyLnN0eWxlLmxldHRlclNwYWNpbmdcblx0XHR0ZXh0VHJhbnNmb3JtOiB0ZXh0TGF5ZXIuc3R5bGUudGV4dFRyYW5zZm9ybVxuXHR0ZXh0RnJhbWUgPSBVdGlscy50ZXh0U2l6ZSh0ZXh0TGF5ZXIuaHRtbCwgc3R5bGVzLCBjb25zdHJhaW50cylcblx0cmV0dXJuIHtcblx0XHR3aWR0aCA6IHRleHRGcmFtZS53aWR0aFxuXHRcdGhlaWdodDogdGV4dEZyYW1lLmhlaWdodFxuXHR9XG5cbiMgZXhwb3J0cy5nZXREZXZpY2UgPSAtPlxuI1xuIyBcdCMgTG9hZHMgdGhlIGluaXRpYWwgZnJhbWVcbiMgXHRkZXZpY2UgPSBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVcbiNcbiMgXHQjIyMgVGhpcyBzd2l0Y2ggbG9va3MgYXQgdGhlIGlubmVyV2lkdGggdG8gZGV0ZXJtaW5lIGlmIHRoZSBwcm90b3R5cGUgaXMgYmVpbmcgb3BlbmVkIG9uIGEgZGV2aWNlLlxuIyBcdElmIHNvLCBpdCdsbCBvdmVycmlkZSB0aGUgZGV2aWNlLCBhbmQgaXQnbGwgYWRqdXN0IHRoZSB2aWV3IHRvIGZ1bGxzY3JlZW4uIyMjXG4jIFx0Y2FwdHVyZWREZXZpY2UgPSB7XG4jIFx0XHR3aWR0aDppb3MubGliLmZyYW1lc1tkZXZpY2VdLndpZHRoXG4jIFx0XHRoZWlnaHQ6aW9zLmxpYi5mcmFtZXNbZGV2aWNlXS5oZWlnaHRcbiMgXHRcdHNjYWxlOmlvcy5saWIuZnJhbWVzW2RldmljZV0uc2NhbGVcbiMgXHRcdG1vYmlsZTppb3MubGliLmZyYW1lc1tkZXZpY2VdLm1vYmlsZVxuIyBcdFx0cGxhdGZvcm06aW9zLmxpYi5mcmFtZXNbZGV2aWNlXS5wbGF0Zm9ybVxuIyBcdH1cbiNcbiMgXHRzd2l0Y2ggaW5uZXJXaWR0aFxuIyBcdFx0IyBpUGhvbmUgNWMvNXMvU0VcbiMgXHRcdHdoZW4gNjQwXG4jIFx0XHRcdGRldmljZSA9IFwiYXBwbGUtaXBob25lLTVzLXNpbHZlclwiXG4jIFx0XHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IFwiZnVsbHNjcmVlblwiXG4jXG4jIFx0XHQjIGlQaG9uZSA2c1xuIyBcdFx0d2hlbiA3NTBcbiMgXHRcdFx0ZGV2aWNlID0gXCJhcHBsZS1pcGhvbmUtNnMtc2lsdmVyXCJcbiMgXHRcdFx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gXCJmdWxsc2NyZWVuXCJcbiNcbiMgXHRcdCMgaVBob25lIDZzK1xuIyBcdFx0d2hlbiAxMjQyXG4jIFx0XHRcdGlmIGlubmVySGVpZ2h0ID09IDIyMDhcbiMgXHRcdFx0XHRkZXZpY2UgPSBcImFwcGxlLWlwaG9uZS02cy1wbHVzLXNpbHZlclwiXG4jIFx0XHRcdFx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gXCJmdWxsc2NyZWVuXCJcbiMgXHRcdFx0XHRwcmludCBcInlvXCJcbiNcbiMgXHRcdCMgaVBhZCBpbiBwb3J0cmFpdFxuIyBcdFx0d2hlbiAxNTM2XG4jIFx0XHRcdGlmIGlubmVySGVpZ2h0ID09IDIwNDhcbiMgXHRcdFx0XHRkZXZpY2UgPSBcImFwcGxlLWlwYWQtYWlyLTItc2lsdmVyXCJcbiMgXHRcdFx0XHRGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgPSBcImZ1bGxzY3JlZW5cIlxuI1xuIyBcdFx0IyBpUGFkXG4jIFx0XHR3aGVuIDIwNDhcbiNcbiMgXHRcdFx0IyBpUGFkIFBybyBpbiBwb3J0cmFpdFxuIyBcdFx0XHRpZiBpbm5lckhlaWdodCA9PSAyNzMyXG4jIFx0XHRcdFx0ZGV2aWNlID0gXCJhcHBsZS1pcGFkLXByby1zaWx2ZXJcIlxuI1xuIyBcdFx0XHQjIGlQYWQgaW4gbGFuZHNjY2FwZVxuIyBcdFx0XHRpZiBpbm5lckhlaWdodCA9PSAxNTM2XG4jIFx0XHRcdFx0ZGV2aWNlID0gXCJhcHBsZS1pcGFkLWFpci0yLXNpbHZlclwiXG4jIFx0XHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IFwiZnVsbHNjcmVlblwiXG4jXG4jIFx0XHQjIGlQYWQgUHJvXG4jIFx0XHR3aGVuIDI3MzJcbiMgXHRcdFx0aWYgaW5uZXJIZWlnaHQgPT0gMjA0OFxuIyBcdFx0XHRcdGRldmljZSA9IFwiYXBwbGUtaXBhZC1wcm8tc2lsdmVyXCJcbiMgXHRcdFx0XHRGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgPSBcImZ1bGxzY3JlZW5cIlxuZXhwb3J0cy5nZXREZXZpY2UgPSAtPlxuXHQjIExvYWRzIHRoZSBpbml0aWFsIGZyYW1lXG5cdG5hbWVGb3JtYXR0ZXIgPSAobmFtZSkgLT5cblx0XHRyZW1vdmVUZXJtcyA9IFtcImFwcGxlLVwiLCBcIi1nb2xkXCIsIFwiLXNpbHZlclwiLCBcIi1yb3NlXCIsIFwiLXNwYWNlLWdyYXlcIiwgXCIteWVsbG93XCIsIFwiLWdyZWVuXCIsIFwiLXJlZFwiLCBcIi13aGl0ZVwiLCBcIi1ibHVlXCIsIFwiLW1pbmlcIiwgXCItYWlyXCIsIFwiLTJcIiwgXCItNFwiXVxuXHRcdGZvciB0ZXJtIGluIHJlbW92ZVRlcm1zXG5cdFx0XHRuYW1lID0gbmFtZS5yZXBsYWNlKHRlcm0sIFwiXCIpXG5cdFx0aWYgbmFtZS5pbmRleE9mKFwiLTVzXCIpICE9IC0xIHRoZW4gbmFtZSA9IG5hbWUucmVwbGFjZShcIi01c1wiLCBcIi01XCIpXG5cdFx0aWYgbmFtZS5pbmRleE9mKFwiLTVjXCIpICE9IC0xIHRoZW4gbmFtZSA9IG5hbWUucmVwbGFjZShcIi01Y1wiLCBcIi01XCIpXG5cdFx0cmV0dXJuIG5hbWVcblx0ZGV2aWNlID0gXCJcIlxuXHRmcmFtZSA9IHRydWVcblx0aWYgaW9zLmxpYi5yZWFsRGV2aWNlc1tpbm5lcldpZHRoXSAmJiBpb3MubGliLnJlYWxEZXZpY2VzW2lubmVyV2lkdGhdW2lubmVySGVpZ2h0XVxuXHRcdGRldmljZSA9IGlvcy5saWIucmVhbERldmljZXNbaW5uZXJXaWR0aF1baW5uZXJIZWlnaHRdXG5cdFx0ZnJhbWUgPSBmYWxzZVxuXHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IFwiZnVsbHNjcmVlblwiXG5cblx0aWYgZnJhbWVcblx0XHRkZXZpY2UgPVxuXHRcdFx0bmFtZTogbmFtZUZvcm1hdHRlcihGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUpXG5cdFx0XHRkaXNwbGF5X25hbWUgOiAgRnJhbWVyLkRldmljZVZpZXcuRGV2aWNlc1tGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVdLmRpc3BsYXlfbmFtZVxuXHRcdFx0d2lkdGggOiAgRnJhbWVyLkRldmljZVZpZXcuRGV2aWNlc1tGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVdLnNjcmVlbldpZHRoXG5cdFx0XHRoZWlnaHQ6ICBGcmFtZXIuRGV2aWNlVmlldy5EZXZpY2VzW0ZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZV0uc2NyZWVuSGVpZ2h0XG5cdFx0XHRzY2FsZTogaW9zLmxpYi5mcmFtZXJGcmFtZXNbRnJhbWVyLkRldmljZVZpZXcuRGV2aWNlc1tGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVdLnNjcmVlbldpZHRoXVxuXG5cdGlmIGRldmljZS5zY2FsZSA9PSB1bmRlZmluZWRcblx0XHRkZXZpY2Uuc2NhbGUgPSAyXG5cdGlmIGRldmljZS53aWR0aCA9PSB1bmRlZmluZWRcblx0XHRkZXZpY2Uud2lkdGggPSBpbm5lcldpZHRoXG5cdGlmIGRldmljZS5oZWlnaHQgPT0gdW5kZWZpbmVkXG5cdFx0ZGV2aWNlLmhlaWdodCA9IGlubmVySGVpZ2h0XG5cblx0cmV0dXJuIGRldmljZVxuXG5cdGV4cG9ydHMuc2NhbGUgPSBpb3MubGliLmZyYW1lc1tkZXZpY2VdLnNjYWxlXG5cblx0aWYgZGV2aWNlID09IFwiZnVsbHNjcmVlblwiXG5cdFx0ZXhwb3J0cy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG5cdFx0ZXhwb3J0cy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblx0ZWxzZVxuXHRcdGV4cG9ydHMud2lkdGggPSBpb3MubGliLmZyYW1lc1tkZXZpY2VdLndpZHRoXG5cdFx0ZXhwb3J0cy5oZWlnaHQgPSBpb3MubGliLmZyYW1lc1tkZXZpY2VdLmhlaWdodFxuXHRcdGlmIHdpbmRvdy5pbm5lcldpZHRoID09IDEyNDIgfHwgd2luZG93LmlubmVyV2lkdGggPT0gMjIwOFxuXHRcdFx0ZXhwb3J0cy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG5cdFx0XHRleHBvcnRzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuXHRcdFx0ZXhwb3J0cy5zY2FsZSA9IDNcblx0ZXhwb3J0cy5tb2JpbGUgPSBpb3MubGliLmZyYW1lc1tkZXZpY2VdLm1vYmlsZVxuXHRleHBvcnRzLnBsYXRmb3JtID0gaW9zLmxpYi5mcmFtZXNbZGV2aWNlXS5wbGF0Zm9ybVxuXHRleHBvcnRzLm9yaWVudGF0aW9uID0gIEZyYW1lci5EZXZpY2Uub3JpZW50YXRpb25cblxuXHQjIERldmljZSBTdHJpbmcgU2NydWJiZXJcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCJhcHBsZS1cIiwgXCJcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCItZ29sZFwiLCBcIlwiKVxuXHRkZXZpY2UgPSBkZXZpY2UucmVwbGFjZShcIi1ncmVlblwiLCBcIlwiKVxuXHRkZXZpY2UgPSBkZXZpY2UucmVwbGFjZShcIi1ibHVlXCIsIFwiXCIpXG5cdGRldmljZSA9IGRldmljZS5yZXBsYWNlKFwiLXJlZFwiLCBcIlwiKVxuXHRkZXZpY2UgPSBkZXZpY2UucmVwbGFjZShcIi13aGl0ZVwiLCBcIlwiKVxuXHRkZXZpY2UgPSBkZXZpY2UucmVwbGFjZShcIi15ZWxsb3dcIiwgXCJcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCItcGlua1wiLCBcIlwiKVxuXHRkZXZpY2UgPSBkZXZpY2UucmVwbGFjZShcIi1zcGFjZS1ncmV5XCIsIFwiXCIpXG5cdGRldmljZSA9IGRldmljZS5yZXBsYWNlKFwiLXJvc2VcIiwgXCJcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCI1c1wiLCBcIjVcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCI1Y1wiLCBcIjVcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCItbWluaVwiLCBcIlwiKVxuXHRkZXZpY2UgPSBkZXZpY2UucmVwbGFjZShcIi1haXJcIiwgXCJcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCItMlwiLCBcIlwiKVxuXHRkZXZpY2UgPSBkZXZpY2UucmVwbGFjZShcIi00XCIsIFwiXCIpXG5cdGRldmljZSA9IGRldmljZS5yZXBsYWNlKFwiLXNpbHZlclwiLCBcIlwiKVxuXG5cdGNhcHR1cmVkRGV2aWNlLm5hbWUgPSBkZXZpY2VcblxuXHQjIGV4cG9ydHMuZGV2aWNlIGJlY29tZXMgZWl0aGVyIGlwYWQsIGlwYWQtcHJvLCBpcGhvbmUtNSwgaXBob25lLTZzLCBpcGhvbmUtNnMtcGx1c1xuXHRyZXR1cm4gY2FwdHVyZWREZXZpY2VcblxuXG4jIFNwZWNpYWwgQ2hhcmFjdGVyc1xuZXhwb3J0cy5zcGVjaWFsQ2hhciA9IChsYXllcikgLT5cblx0dGV4dCA9IGxheWVyXG5cdGlmIGxheWVyLnR5cGUgPT0gXCJidXR0b25cIiB0aGVuIHRleHQgPSBsYXllci5sYWJlbFxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1iXCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLWIgXCIsIFwiXCIpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9LCB7Zm9udFdlaWdodDo2MDB9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItclwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi1yIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOlwicmVkXCJ9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItcmJcIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItcmIgXCIsIFwiXCIpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9LCB7Y29sb3I6XCJibHVlXCJ9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItbGJcIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItbGIgXCIsIFwiXCIpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9LCB7Y29sb3I6XCJsaWdodC1ibHVlXCJ9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItZ1wiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi1nIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOlwiZ3JlZW5cIn1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1vXCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLW8gXCIsIFwiXCIpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9LCB7Y29sb3I6XCJvcmFuZ2VcIn1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1wXCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLXAgXCIsIFwiXCIpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9LCB7Y29sb3I6XCJvcmFuZ2VcIn1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi15XCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLXkgXCIsIFwiXCIpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9LCB7Y29sb3I6XCJ5ZWxsb3dcIn1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi0jXCIpICE9IC0xXG5cdFx0Y2hvc2VuQ29sb3IgPSB0ZXh0Lmh0bWwuc2xpY2UoMSwgOClcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnNsaWNlKDksIHRleHQuaHRtbC5sZW5ndGgpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9LCB7Y29sb3I6Y2hvc2VuQ29sb3J9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItXCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLSBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH1dKVxuXHRpZiBsYXllci5idXR0b25UeXBlID09IFwidGV4dFwiXG5cdFx0bGF5ZXIud2lkdGggPSB0ZXh0LndpZHRoXG5cdGlvcy5sYXlvdXQuc2V0KGxheWVyKVxuXHRpZiBsYXllci50eXBlID09IFwiYnV0dG9uXCIgdGhlbiBsYXllci53aWR0aCA9IHRleHQud2lkdGhcblx0cmV0dXJuIHRleHQuY29sb3JcblxuZXhwb3J0cy51cGRhdGUgPSAobGF5ZXIsIGFycmF5KSAtPlxuXHRpZiBhcnJheSA9PSB1bmRlZmluZWRcblx0XHRhcnJheSA9IFtdXG5cdGlmIGxheWVyLnR5cGUgPT0gXCJ0ZXh0XCJcblx0XHRmb3IgY2hhbmdlIGluIGFycmF5XG5cdFx0XHRrZXkgPSBPYmplY3Qua2V5cyhjaGFuZ2UpWzBdXG5cdFx0XHR2YWx1ZSA9IGNoYW5nZVtrZXldXG5cdFx0XHRpZiBrZXkgPT0gXCJ0ZXh0XCJcblx0XHRcdFx0bGF5ZXIuaHRtbCA9IHZhbHVlXG5cdFx0XHRpZiBrZXkgPT0gXCJmb250V2VpZ2h0XCJcblx0XHRcdFx0bGF5ZXIuc3R5bGVba2V5XSA9IHZhbHVlXG5cdFx0XHRpZiBrZXkgPT0gXCJjb2xvclwiXG5cdFx0XHRcdGxheWVyLmNvbG9yID0gZXhwb3J0cy5jb2xvcih2YWx1ZSlcblxuXHRcdHRleHRGcmFtZSA9IGV4cG9ydHMudGV4dEF1dG9TaXplKGxheWVyKVxuXHRcdGxheWVyLndpZHRoID0gdGV4dEZyYW1lLndpZHRoXG5cdFx0bGF5ZXIuaGVpZ2h0ID0gdGV4dEZyYW1lLmhlaWdodFxuXG5cblx0aW9zLmxheW91dC5zZXQoKVxuXG4jIERlY2lkZXMgaWYgaXQgc2hvdWxkIGJlIHdoaXRlL2JsYWNrIHRleHRcbmV4cG9ydHMuYXV0b0NvbG9yID0gKGNvbG9yT2JqZWN0KSAtPlxuXHRyZ2IgPSBjb2xvck9iamVjdC50b1JnYlN0cmluZygpXG5cdHJnYiA9IHJnYi5zdWJzdHJpbmcoNCwgcmdiLmxlbmd0aC0xKVxuXHRyZ2IgPSByZ2IucmVwbGFjZSgvIC9nLCAnJylcblx0cmdiID0gcmdiLnJlcGxhY2UoLyAvZywgJycpXG5cdHJnYiA9IHJnYi5zcGxpdCgnLCcpXG5cdHJlZCA9IHJnYlswXVxuXHRncmVlbiA9IHJnYlsxXVxuXHRibHVlID0gcmdiWzJdXG5cdGNvbG9yID0gXCJcIlxuXHRpZiAocmVkKjAuMjk5ICsgZ3JlZW4qMC41ODcgKyBibHVlKjAuMTE0KSA+IDE4NlxuXHRcdGNvbG9yID0gXCIjMDAwXCJcblx0ZWxzZVxuXHRcdGNvbG9yID0gXCIjRkZGXCJcblx0cmV0dXJuIGNvbG9yXG5cbmV4cG9ydHMuc2FtZVBhcmVudCA9IChsYXllcjEsIGxheWVyMikgLT5cblx0cGFyZW50T25lID0gbGF5ZXIxLnN1cGVyTGF5ZXJcblx0cGFyZW50VHdvID0gbGF5ZXIyLnN1cGVyTGF5ZXJcblx0aWYgcGFyZW50T25lID09IHBhcmVudFR3b1xuXHRcdHJldHVybiB0cnVlXG5cdGVsc2Vcblx0XHRyZXR1cm4gZmFsc2VcblxuXG5leHBvcnRzLnRpbWVEZWxlZ2F0ZSA9IChsYXllciwgY2xvY2tUeXBlKSAtPlxuXHRAdGltZSA9IGV4cG9ydHMuZ2V0VGltZSgpXG5cdFV0aWxzLmRlbGF5IDYwIC0gQHRpbWUuc2VjcywgLT5cblx0XHRAdGltZSA9IGV4cG9ydHMuZ2V0VGltZSgpXG5cdFx0ZXhwb3J0cy51cGRhdGUobGF5ZXIsIFt0ZXh0OmV4cG9ydHMudGltZUZvcm1hdHRlcihAdGltZSwgY2xvY2tUeXBlKV0pXG5cdFx0VXRpbHMuaW50ZXJ2YWwgNjAsIC0+XG5cdFx0XHRAdGltZSA9IGV4cG9ydHMuZ2V0VGltZSgpXG5cdFx0XHRleHBvcnRzLnVwZGF0ZShsYXllciwgW3RleHQ6ZXhwb3J0cy50aW1lRm9ybWF0dGVyKEB0aW1lLCBjbG9ja1R5cGUpXSlcblxuZXhwb3J0cy50aW1lRm9ybWF0dGVyID0gKHRpbWVPYmosIGNsb2NrVHlwZSkgLT5cblx0aWYgY2xvY2tUeXBlID09IGZhbHNlXG5cdFx0aWYgdGltZU9iai5ob3VycyA+IDEyXG5cdFx0XHR0aW1lT2JqLmhvdXJzID0gdGltZU9iai5ob3VycyAtIDEyXG5cdFx0aWYgdGltZU9iai5ob3VycyA9PSAwIHRoZW4gdGltZU9iai5ob3VycyA9IDEyXG5cdGlmIHRpbWVPYmoubWlucyA8IDEwXG5cdFx0dGltZU9iai5taW5zID0gXCIwXCIgKyB0aW1lT2JqLm1pbnNcblx0cmV0dXJuIHRpbWVPYmouaG91cnMgKyBcIjpcIiArIHRpbWVPYmoubWluc1xuXG5leHBvcnRzLnNldHVwQ29tcG9uZW50ID0gKGFycmF5LCBkZWZhdWx0cykgLT5cblx0aWYgYXJyYXkgPT0gdW5kZWZpbmVkXG5cdFx0YXJyYXkgPSBbXVxuXHRvYmogPSB7fVxuXHRmb3IgaSBpbiBkZWZhdWx0cy5wcm9wc1xuXHRcdGlmIGFycmF5W2ldICE9IHVuZGVmaW5lZFxuXHRcdFx0b2JqW2ldID0gYXJyYXlbaV1cblx0XHRlbHNlXG5cdFx0XHRvYmpbaV0gPSBkZWZhdWx0c1tpXVxuXHRyZXR1cm4gb2JqXG5cblxuZXhwb3J0cy5lbW9qaUZvcm1hdHRlciA9IChzdHJpbmcpIC0+XG5cdFx0dW5pY29kZUZvcm1hdCA9IFwiXCJcblx0XHRpZiBzdHJpbmdbMF0gPT0gXCJFXCIgfHwgc3RyaW5nWzBdID09IFwiM1wiIHx8IHN0cmluZ1swXSA9PSBcIjJcIiB8fCBzdHJpbmdbMF0gPT0gXCJDXCJcblx0XHRcdGFycmF5T2ZDb2RlcyA9IHN0cmluZy5zcGxpdChcIiBcIilcblx0XHRcdGZvciBjb2RlIGluIGFycmF5T2ZDb2Rlc1xuXHRcdFx0XHR1bmljb2RlRm9ybWF0ID0gdW5pY29kZUZvcm1hdCArIFwiJVwiICsgY29kZVxuXHRcdGVsc2Vcblx0XHRcdGFycmF5T2ZDb2RlcyA9IHN0cmluZy5zcGxpdChcIiBcIilcblx0XHRcdHVuaWNvZGVGb3JtYXQgPSBcIiVGMCU5RlwiXG5cdFx0XHRmb3IgY29kZSBpbiBhcnJheU9mQ29kZXNcblx0XHRcdFx0dW5pY29kZUZvcm1hdCA9IHVuaWNvZGVGb3JtYXQgKyBcIiVcIiArIGNvZGVcblx0XHRkZWNvZGVkID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuaWNvZGVGb3JtYXQpXG5cdFx0cmV0dXJuIGRlY29kZWRcblxuZXhwb3J0cy5idWlsZEVtb2ppc09iamVjdCA9ICgpIC0+XG5cdGVtb2ppcyA9IFtdXG5cdGZvciBjb2RlLCBpbmRleCBpbiBpb3MuYXNzZXRzLmVtb2ppQ29kZXNcblx0XHRlbW9qaSA9IGV4cG9ydHMuZW1vamlGb3JtYXR0ZXIoY29kZSlcblx0XHRlbW9qaXMucHVzaCBlbW9qaVxuXG5leHBvcnRzLndyaXRlID0gKG9iaiwgdGV4dCkgLT5cblx0aWYgb2JqLnR5cGUgPT0gJ2ZpZWxkJ1xuXHRcdG9iai50ZXh0Lmh0bWwgPSBvYmoudGV4dC5odG1sICsgdGV4dFxuXHRlbHNlXG5cdFx0b2JqLmh0bWwgPSBvYmouaHRtbCArIHRleHRcbiIsImlvcyA9IHJlcXVpcmUgJ2lvcy1raXQnXG5cblxuZXhwb3J0cy5kZWZhdWx0cyA9XG5cdGVkaXRhYmxlOnRydWVcblx0Y29uc3RyYWludHM6dW5kZWZpbmVkXG5cdHRleHQ6IFwiaU9TIFRleHQgTGF5ZXJcIlxuXHR0eXBlOlwidGV4dFwiXG5cdHg6MFxuXHR5OjBcblx0d2lkdGg6LTFcblx0aGVpZ2h0Oi0xXG5cdHN1cGVyTGF5ZXI6dW5kZWZpbmVkXG5cdHN0eWxlOlwiZGVmYXVsdFwiXG5cdGxpbmVzOjFcblx0dGV4dEFsaWduOlwibGVmdFwiXG5cdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0Y29sb3I6XCJibGFja1wiXG5cdGZvbnRTaXplOiAxN1xuXHRmb250RmFtaWx5OlwiLWFwcGxlLXN5c3RlbSwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiXG5cdGZvbnRXZWlnaHQ6XCJyZWd1bGFyXCJcblx0bGluZUhlaWdodDpcImF1dG9cIlxuXHRuYW1lOlwidGV4dCBsYXllclwiXG5cdG9wYWNpdHk6MVxuXHR0ZXh0VHJhbnNmb3JtOlwibm9uZVwiXG5cdGxldHRlclNwYWNpbmc6MFxuXHRuYW1lOlwidGV4dCBsYXllclwiXG5cdHNlbGVjdGFibGU6dHJ1ZVxuXHRzZWxlY3RDb2xvcjpcInJnYmEoMCwgMTE4LCAyNTUsIC4yKVwiXG5cdHNlbGVjdENvbnRyb2xzOlwiIzAwNzZGRlwiXG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IGlvcy51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblx0ZXhjZXB0aW9ucyA9IE9iamVjdC5rZXlzKHNldHVwKVxuXG5cdHRleHRMYXllciA9IG5ldyBpb3MuVmlld1xuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOnNldHVwLm5hbWVcblx0XHRzdXBlckxheWVyOnNldHVwLnN1cGVyTGF5ZXJcblx0XHRjb25zdHJhaW50czpzZXR1cC5jb25zdHJhaW50c1xuXG5cdHRleHRMYXllci50eXBlID0gXCJ0ZXh0XCJcblx0dGV4dExheWVyLmh0bWwgPSBzZXR1cC50ZXh0XG5cdGZvciBwcm9wIGluIGlvcy5saWIubGF5ZXJQcm9wc1xuXHRcdGlmIHNldHVwW3Byb3BdXG5cdFx0XHRpZiBwcm9wID09IFwiY29sb3JcIlxuXHRcdFx0XHRzZXR1cFtwcm9wXSA9IGlvcy51dGlscy5jb2xvcihzZXR1cFtwcm9wXSlcblx0XHRcdHRleHRMYXllcltwcm9wXSA9IHNldHVwW3Byb3BdXG5cdGZvciBwcm9wIGluIGlvcy5saWIubGF5ZXJTdHlsZXNcblx0XHRpZiBzZXR1cFtwcm9wXVxuXHRcdFx0aWYgcHJvcCA9PSBcImxpbmVIZWlnaHRcIiAmJiBzZXR1cFtwcm9wXSA9PSBcImF1dG9cIlxuXHRcdFx0XHR0ZXh0TGF5ZXIuc3R5bGUubGluZUhlaWdodCA9ICBzZXR1cC5mb250U2l6ZVxuXHRcdFx0aWYgcHJvcCA9PSBcImZvbnRXZWlnaHRcIlxuXHRcdFx0XHRzd2l0Y2ggc2V0dXBbcHJvcF1cblx0XHRcdFx0XHR3aGVuIFwidWx0cmF0aGluXCIgdGhlbiBzZXR1cFtwcm9wXSA9IDEwMFxuXHRcdFx0XHRcdHdoZW4gXCJ0aGluXCIgdGhlbiBzZXR1cFtwcm9wXSA9IDIwMFxuXHRcdFx0XHRcdHdoZW4gXCJsaWdodFwiIHRoZW4gc2V0dXBbcHJvcF0gPSAzMDBcblx0XHRcdFx0XHR3aGVuIFwicmVndWxhclwiIHRoZW4gc2V0dXBbcHJvcF0gPSA0MDBcblx0XHRcdFx0XHR3aGVuIFwibWVkaXVtXCIgdGhlbiBzZXR1cFtwcm9wXSA9IDUwMFxuXHRcdFx0XHRcdHdoZW4gXCJzZW1pYm9sZFwiIHRoZW4gc2V0dXBbcHJvcF0gPSA2MDBcblx0XHRcdFx0XHR3aGVuIFwiYm9sZFwiIHRoZW4gc2V0dXBbcHJvcF0gPSA3MDBcblx0XHRcdFx0XHR3aGVuIFwiYmxhY2tcIiB0aGVuIHNldHVwW3Byb3BdID0gODAwXG5cdFx0XHRpZiBwcm9wID09IFwiZm9udFNpemVcIiB8fCBwcm9wID09IFwibGluZUhlaWdodFwiIHx8IHByb3AgPT0gXCJsZXR0ZXJTcGFjaW5nXCJcblx0XHRcdFx0c2V0dXBbcHJvcF0gPSBpb3MudXRpbHMucHgoc2V0dXBbcHJvcF0pICsgXCJweFwiXG5cdFx0XHR0ZXh0TGF5ZXIuc3R5bGVbcHJvcF0gPSBzZXR1cFtwcm9wXVxuXG5cdHRleHRGcmFtZSA9IGlvcy51dGlscy50ZXh0QXV0b1NpemUodGV4dExheWVyKVxuXHR0ZXh0TGF5ZXIucHJvcHMgPSAoaGVpZ2h0OnRleHRGcmFtZS5oZWlnaHQsIHdpZHRoOnRleHRGcmFtZS53aWR0aClcblxuXHRpZiBzZXR1cC5lZGl0YWJsZVxuXHRcdHRleHRMYXllci5vbiBcImNoYW5nZTpodG1sXCIsIC0+XG5cdFx0XHR0ZXh0RnJhbWUgPSBpb3MudXRpbHMudGV4dEF1dG9TaXplKHRleHRMYXllcilcblx0XHRcdHRleHRMYXllci5wcm9wcyA9IChoZWlnaHQ6dGV4dEZyYW1lLmhlaWdodCwgd2lkdGg6dGV4dEZyYW1lLndpZHRoKVxuXG5cblx0aW9zLmxheW91dC5zZXRcblx0XHR0YXJnZXQ6dGV4dExheWVyXG5cdHJldHVybiB0ZXh0TGF5ZXJcbiIsImlvcyA9IHJlcXVpcmUgJ2lvcy1raXQnXG5cblxuZXhwb3J0cy5kZWZhdWx0cyA9XG4gIGtleTpcInZhbHVlXCJcblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuICBzZXR1cCA9IGlvcy51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcbiAgcmV0dXJuXG4iLCJpb3MgPSByZXF1aXJlICdpb3Mta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuXHR0YWI6IHtcblx0XHRsYWJlbDogXCJsYWJlbFwiXG5cdFx0aWNvbjpcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMjVweCcgaGVpZ2h0PScyNXB4JyB2aWV3Qm94PScwIDAgMjUgMjUnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPjE8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBmaWxsLW9wYWNpdHk9JzEnPlxuXHRcdFx0XHRcdDxnIGlkPSdCb3R0b20tQmFyL1RhYi1CYXInIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0yNS4wMDAwMDAsIC03LjAwMDAwMCknIGZpbGw9JyMwMDc2RkYnPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J1BsYWNlaG9sZGVycycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjUuMDAwMDAwLCA3LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nMScgeD0nMCcgeT0nMCcgd2lkdGg9JzI1JyBoZWlnaHQ9JzI1JyByeD0nMyc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0XHRhY3RpdmU6IHVuZGVmaW5lZFxuXHRcdGluYWN0aXZlOiB1bmRlZmluZWRcblx0XHR0YWJCYXI6IHVuZGVmaW5lZFxuXHRcdHR5cGU6IFwidGFiXCJcblx0fVxuXHRiYXI6IHtcblx0XHR0YWJzOiBbXVxuXHRcdHN0YXJ0OjBcblx0XHR0eXBlOlwidGFiQmFyXCJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ3aGl0ZVwiXG5cdFx0YWN0aXZlQ29sb3I6XCJibHVlXCJcblx0XHRpbmFjdGl2ZUNvbG9yOlwiZ3JheVwiXG5cdFx0Ymx1cjp0cnVlXG5cdH1cbn1cblxuZXhwb3J0cy5kZWZhdWx0cy50YWIucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzLnRhYilcbmV4cG9ydHMuZGVmYXVsdHMuYmFyLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cy5iYXIpXG5cbmV4cG9ydHMudGFiID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IGlvcy51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cy50YWIpXG5cdHNwZWNzID1cblx0XHR3aWR0aDogNzVcblxuXHRzd2l0Y2ggaW9zLmRldmljZS5uYW1lXG5cdFx0d2hlbiBcImlwaG9uZS01XCJcblx0XHRcdHNwZWNzLndpZHRoID0gNTVcblxuXHR0YWIgPSBuZXcgaW9zLlZpZXdcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0bmFtZTpzZXR1cC5sYWJlbFxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0d2lkdGg6c3BlY3Mud2lkdGhcblx0XHRcdGhlaWdodDo0OVxuXG5cdHRhYi52aWV3ID0gbmV3IGlvcy5WaWV3XG5cdFx0bmFtZTpzZXR1cC5sYWJlbCArIFwiLnZpZXdcIlxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRjb25zdHJhaW50czpcblx0XHRcdHRvcDowXG5cdFx0XHRib3R0b206MFxuXHRcdFx0bGVhZGluZzowXG5cdFx0XHR0cmFpbGluZzowXG5cblx0IyBDcmVhdGUgQWN0aXZlXG5cdHRhYi5hY3RpdmUgPSBuZXcgaW9zLlZpZXdcblx0XHRuYW1lOlwiLmFjdGl2ZVwiXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0dG9wOjBcblx0XHRcdGJvdHRvbTowXG5cdFx0XHRsZWFkaW5nOjBcblx0XHRcdHRyYWlsaW5nOjBcblx0XHRzdXBlckxheWVyOnRhYlxuXG5cdHRhYi5hY3RpdmUuaWNvbiA9IG5ldyBpb3MuVmlld1xuXHRcdG5hbWU6XCIuYWN0aXZlLmljb25cIlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0d2lkdGg6MjVcblx0XHRcdGhlaWdodDoyNVxuXHRcdFx0YWxpZ246XCJob3Jpem9udGFsXCJcblx0XHRcdHRvcDo3XG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdHN1cGVyTGF5ZXI6dGFiLmFjdGl2ZVxuXHRpZiBzZXR1cC5hY3RpdmUgPT0gdW5kZWZpbmVkXG5cdFx0c3ZnRnJhbWUgPSBpb3MudXRpbHMuc3ZnKHNldHVwLmljb24pXG5cdFx0dGFiLmFjdGl2ZS5pY29uLmh0bWwgPSBzdmdGcmFtZS5zdmdcblx0XHR0YWIuYWN0aXZlLmljb24ud2lkdGggPSBzdmdGcmFtZS53aWR0aFxuXHRcdHRhYi5hY3RpdmUuaWNvbi5oZWlnaHQgPSBzdmdGcmFtZS5oZWlnaHRcblx0ZWxzZVxuXHRcdHNldHVwLmFjdGl2ZS5zdXBlckxheWVyID0gdGFiLmFjdGl2ZS5pY29uXG5cdFx0c2V0dXAuYWN0aXZlLnByb3BzID1cblx0XHRcdHdpZHRoOnRhYi5hY3RpdmUuaWNvbi53aWR0aFxuXHRcdFx0aGVpZ2h0OnRhYi5hY3RpdmUuaWNvbi5oZWlnaHRcblxuXHQjIENyZWF0ZSBJbmFjdGl2ZVxuXHR0YWIuaW5hY3RpdmUgPSBuZXcgaW9zLlZpZXdcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0bmFtZTpcIi5pbmFjdGl2ZVwiXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHR0b3A6MFxuXHRcdFx0Ym90dG9tOjBcblx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0dHJhaWxpbmc6MFxuXHRcdHN1cGVyTGF5ZXI6dGFiXG5cblx0dGFiLmluYWN0aXZlLmljb24gPSBuZXcgaW9zLlZpZXdcblx0XHRjb25zdHJhaW50czpcblx0XHRcdHdpZHRoOjI1XG5cdFx0XHRoZWlnaHQ6MjVcblx0XHRcdGFsaWduOlwiaG9yaXpvbnRhbFwiXG5cdFx0XHR0b3A6N1xuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOlwiLmluYWN0aXZlLmljb25cIlxuXHRcdHN1cGVyTGF5ZXI6dGFiLmluYWN0aXZlXG5cblx0dGFiLmxhYmVsID0gbmV3IGlvcy5UZXh0XG5cdFx0dGV4dDpzZXR1cC5sYWJlbFxuXHRcdHN1cGVyTGF5ZXI6dGFiXG5cdFx0Y29sb3I6XCIjOTI5MjkyXCJcblx0XHRmb250U2l6ZToxMFxuXHRcdG5hbWU6XCIubGFiZWxcIlxuXHRcdHRleHRUcmFuc2Zvcm06XCJjYXBpdGFsaXplXCJcblxuXHR0YWIubGFiZWwuY29uc3RyYWludHMgPVxuXHRcdGJvdHRvbToyXG5cdFx0aG9yaXpvbnRhbENlbnRlcjp0YWIuYWN0aXZlLmljb25cblxuXHRpZiBzZXR1cC5pbmFjdGl2ZSA9PSB1bmRlZmluZWRcblx0XHRzdmdGcmFtZSA9IGlvcy51dGlscy5zdmcoc2V0dXAuaWNvbilcblx0XHR0YWIuaW5hY3RpdmUuaWNvbi5odG1sID0gc3ZnRnJhbWUuc3ZnXG5cdFx0dGFiLmluYWN0aXZlLmljb24ud2lkdGggPSBzdmdGcmFtZS53aWR0aFxuXHRcdHRhYi5pbmFjdGl2ZS5pY29uLmhlaWdodCA9IHN2Z0ZyYW1lLmhlaWdodFxuXG5cdGVsc2Vcblx0XHRzZXR1cC5pbmFjdGl2ZS5zdXBlckxheWVyID0gdGFiLmluYWN0aXZlLmljb25cblx0XHRzZXR1cC5pbmFjdGl2ZS5wcm9wcyA9XG5cdFx0XHR3aWR0aDp0YWIuaW5hY3RpdmUuaWNvbi53aWR0aFxuXHRcdFx0aGVpZ2h0OnRhYi5pbmFjdGl2ZS5pY29uLmhlaWdodFxuXG5cdHJldHVybiB0YWJcblxuZXhwb3J0cy5iYXIgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gaW9zLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzLmJhcilcblxuXHQjIElmIG5vIHRhYnMsIG1ha2UgZHVtbXkgdGFic1xuXHRpZiBzZXR1cC50YWJzLmxlbmd0aCA9PSAwXG5cdFx0ZHVtbXlUYWIgPSBuZXcgZXhwb3J0cy50YWJcblx0XHRkdW1teVRhYjIgPSBuZXcgZXhwb3J0cy50YWJcblx0XHRzZXR1cC50YWJzLnB1c2ggZHVtbXlUYWJcblx0XHRzZXR1cC50YWJzLnB1c2ggZHVtbXlUYWIyXG5cblx0c3BlY3MgPVxuXHRcdHdpZHRoOiA3NVxuXHRzd2l0Y2ggaW9zLmRldmljZS5uYW1lXG5cdFx0d2hlbiBcImlwaG9uZS01XCJcblx0XHRcdHNwZWNzLndpZHRoID0gNTVcblxuXHRiYXIgPSBuZXcgaW9zLlZpZXdcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0bmFtZTpcInRhYkJhclwiXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRsZWFkaW5nOjBcblx0XHRcdHRyYWlsaW5nOjBcblx0XHRcdGJvdHRvbTowXG5cdFx0XHRoZWlnaHQ6NDlcblxuXHRiYXIuYmcgPSBuZXcgaW9zLlZpZXdcblx0XHRzdXBlckxheWVyOmJhclxuXHRcdG5hbWU6XCIuYmdcIlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0bGVhZGluZzowXG5cdFx0XHR0cmFpbGluZzowXG5cdFx0XHRib3R0b206MFxuXHRcdFx0aGVpZ2h0OjQ5XG5cblx0YmFyLmRpdmlkZXIgPSBuZXcgaW9zLlZpZXdcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCIjQjJCMkIyXCJcblx0XHRuYW1lOlwiLmRpdmlkZXJcIlxuXHRcdHN1cGVyTGF5ZXI6YmFyXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHR0b3A6MFxuXHRcdFx0bGVhZGluZzowXG5cdFx0XHR0cmFpbGluZzowXG5cdFx0XHRoZWlnaHQ6LjVcblx0YmFyLmJveCA9IG5ldyBpb3MuVmlld1xuXHRcdHN1cGVyTGF5ZXI6YmFyXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6XCIuYm94XCJcblx0XHRjb25zdHJhaW50czpcblx0XHRcdGhlaWdodDo0OVxuXHRcdFx0d2lkdGg6c2V0dXAudGFicy5sZW5ndGggKiBzcGVjcy53aWR0aFxuXG5cblx0c2V0QWN0aXZlID0gKHRhYkluZGV4KSAtPlxuXHRcdGZvciB0YWIsIGluZGV4IGluIHNldHVwLnRhYnNcblx0XHRcdGlmIGluZGV4ID09IHRhYkluZGV4XG5cdFx0XHRcdHRhYi5sYWJlbC5jb2xvciA9IGlvcy51dGlscy5jb2xvcihzZXR1cC5hY3RpdmVDb2xvcilcblx0XHRcdFx0dGFiLmFjdGl2ZS52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0XHR0YWIuaW5hY3RpdmUudmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRcdHRhYi52aWV3LnZpc2libGUgPSB0cnVlXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRhYi5sYWJlbC5jb2xvciA9IGlvcy51dGlscy5jb2xvcihzZXR1cC5pbmFjdGl2ZUNvbG9yKVxuXHRcdFx0XHR0YWIuYWN0aXZlLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0XHR0YWIuaW5hY3RpdmUudmlzaWJsZSA9IHRydWVcblx0XHRcdFx0dGFiLnZpZXcudmlzaWJsZSA9IGZhbHNlXG5cblxuXHRmb3IgdGFiLCBpbmRleCBpbiBzZXR1cC50YWJzXG5cdFx0I0NoZWNrIGZvciB2YWlsZCB0YWIgb2JqZWN0XG5cdFx0YmFyLmJveC5hZGRTdWJMYXllcih0YWIpXG5cdFx0IyBDaGFuZ2UgY29sb3JzXG5cdFx0aW9zLnV0aWxzLmNoYW5nZUZpbGwodGFiLmFjdGl2ZS5pY29uLCBpb3MudXRpbHMuY29sb3Ioc2V0dXAuYWN0aXZlQ29sb3IpKVxuXHRcdGlvcy51dGlscy5jaGFuZ2VGaWxsKHRhYi5pbmFjdGl2ZS5pY29uLCBpb3MudXRpbHMuY29sb3Ioc2V0dXAuaW5hY3RpdmVDb2xvcikpXG5cdFx0dGFiLmxhYmVsLmNvbG9yID0gaW9zLnV0aWxzLmNvbG9yKHNldHVwLmluYWN0aXZlQ29sb3IpXG5cdFx0YmFyLmJnLmJhY2tncm91bmRDb2xvciA9IHNldHVwLmJhY2tncm91bmRDb2xvclxuXG5cdFx0aWYgc2V0dXAuYmx1clxuXHRcdFx0YmFyLmJnLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyNTUsMjU1LDI1NSwgLjkpXCJcblx0XHRcdGlvcy51dGlscy5iZ0JsdXIoYmFyLmJnKVxuXG5cdFx0aWYgaW5kZXggPT0gMFxuXHRcdFx0dGFiLmNvbnN0cmFpbnRzLmxlYWRpbmcgPSAwXG5cdFx0ZWxzZVxuXHRcdFx0dGFiLmNvbnN0cmFpbnRzLmxlYWRpbmcgPSBzZXR1cC50YWJzW2luZGV4IC0gMV1cblxuXHRcdGlvcy5sYXlvdXQuc2V0KHRhYilcblxuXHRcdHRhYi5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblx0XHRcdHRhYkluZGV4ID0gQC54IC8gaW9zLnV0aWxzLnB4KHNwZWNzLndpZHRoKVxuXHRcdFx0c2V0QWN0aXZlKHRhYkluZGV4KVxuXG5cdGJhci5ib3guY29uc3RyYWludHMgPVxuXHRcdGFsaWduOlwiaG9yaXpvbnRhbFwiXG5cblx0aW9zLmxheW91dC5zZXQoYmFyLmJveClcblx0c2V0QWN0aXZlKHNldHVwLnN0YXJ0KVxuXG5cdGJhci50YWJzID0gc2V0dXAudGFic1xuXG5cdHJldHVybiBiYXJcbiIsImlvcyA9IHJlcXVpcmUgJ2lvcy1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG5cdGNhcnJpZXI6XCJcIlxuXHRuZXR3b3JrOlwiTFRFXCJcblx0YmF0dGVyeToxMDBcblx0c2lnbmFsOjVcblx0c3R5bGU6XCJkYXJrXCJcblx0Y2xvY2syNDpmYWxzZVxuXHR0eXBlOlwic3RhdHVzQmFyXCJcblx0c3VwZXJMYXllcjp1bmRlZmluZWRcbn1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IGlvcy51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblx0c3RhdHVzQmFyID0gbmV3IExheWVyXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6XCJzdGF0dXNCYXIuYWxsXCJcblx0XHRzdXBlckxheWVyOnNldHVwLnN1cGVyTGF5ZXJcblx0c3RhdHVzQmFyLnR5cGUgPSBzZXR1cC50eXBlXG5cdHN0YXR1c0Jhci5jb25zdHJhaW50cyA9XG5cdFx0bGVhZGluZzowXG5cdFx0dHJhaWxpbmc6MFxuXHRcdGhlaWdodDoyMFxuXG5cdHN3aXRjaCBpb3MuZGV2aWNlLm5hbWVcblx0XHR3aGVuIFwiaXBob25lLTZzLXBsdXNcIlxuXHRcdFx0QHRvcENvbnN0cmFpbnQgPSA1XG5cdFx0XHRAYmF0dGVyeUljb24gPSA1XG5cdFx0XHRAYmx1ZXRvb3RoID0gNVxuXG5cdFx0d2hlbiBcImZ1bGxzY3JlZW5cIlxuXHRcdFx0QHRvcENvbnN0cmFpbnQgPSA1XG5cdFx0XHRAYmF0dGVyeUljb24gPSAtIDEyXG5cdFx0XHRAYmx1ZXRvb3RoID0gLSAxMFxuXHRcdGVsc2Vcblx0XHRcdEB0b3BDb25zdHJhaW50ID0gM1xuXHRcdFx0QGJhdHRlcnlJY29uID0gMlxuXHRcdFx0QGJsdWV0b290aCA9IDNcblxuXHRpZiBzZXR1cC5zdHlsZSA9PSBcImxpZ2h0XCJcblx0XHRAY29sb3IgPSBcIndoaXRlXCJcblx0ZWxzZVxuXHRcdEBjb2xvciA9IFwiYmxhY2tcIlxuXHRmb3IgbGF5ZXIgaW4gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmxheWVyc1xuXHRcdGlmIGxheWVyLnR5cGUgPT0gXCJsb2NrU2NyZWVuXCJcblx0XHRcdEBpc0xvY2tTY3JlZW5QdXRpbHNlbnQgPSB0cnVlXG5cdGlmIEBpc0xvY2tTY3JlZW5QdXRpbHNlbnRcblx0XHRncmlwcGVyID0gbmV3IExheWVyIHN1cGVyTGF5ZXI6c3RhdHVzQmFyLCB3aWR0aDp1dGlscy5weCgzNyksIGhlaWdodDp1dGlscy5weCg1KSwgbmFtZTpcImdyaXBwZXJcIiwgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIiwgb3BhY2l0eTouNSwgbmFtZTpcImdyaXBwZXJcIlxuXHRcdGdyaXBwZXIuaHRtbCA9IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScje3V0aWxzLnB4KDM3KX1weCcgaGVpZ2h0PScje3V0aWxzLnB4KDUpfXB4JyB2aWV3Qm94PScwIDAgMzcgNScgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+R3JpcHBlcjwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHRcdFx0XHRcdDxnIGlkPSdLZXlib2FyZC9BdXRvLUNvbXBsZXRlLUJhci1DbG9zZWQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNjkuMDAwMDAwLCAtMi4wMDAwMDApJyBmaWxsPScjRkZGRkZGJz5cblx0XHRcdFx0XHRcdDxyZWN0IGlkPSdHcmlwcGVyJyB4PScxNjkuNScgeT0nMi41JyB3aWR0aD0nMzYnIGhlaWdodD0nNCcgcng9JzIuNSc+PC9yZWN0PlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0XHRncmlwcGVyLmNvbnN0cmFpbnRzID1cblx0XHRcdGFsaWduOlwiaG9yaXpvbnRhbFwiXG5cdFx0XHR0b3A6MlxuXHRlbHNlXG5cdFx0QHRpbWUgPSBpb3MudXRpbHMuZ2V0VGltZSgpXG5cdFx0aWYgc2V0dXAuY2xvY2syNCA9PSBmYWxzZVxuXHRcdFx0aWYgQHRpbWUuaG91cnMgPiAxMVxuXHRcdFx0XHRAdGltZS5zdGFtcCA9IFwiUE1cIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAdGltZS5zdGFtcCA9IFwiQU1cIlxuXHRcdGVsc2Vcblx0XHRcdEB0aW1lLnN0YW1wID0gXCJcIlxuXHRcdHRpbWUgPSBuZXcgaW9zLlRleHQgc3R5bGU6XCJzdGF0dXNCYXJUaW1lXCIsIHRleHQ6aW9zLnV0aWxzLnRpbWVGb3JtYXR0ZXIoQHRpbWUsIHNldHVwLmNsb2NrMjQpICsgXCIgXCIgKyBAdGltZS5zdGFtcCwgZm9udFNpemU6MTIsIGZvbnRXZWlnaHQ6XCJzZW1pYm9sZFwiLCBzdXBlckxheWVyOnN0YXR1c0JhciwgY29sb3I6QGNvbG9yLCBuYW1lOlwidGltZVwiXG5cdFx0dGltZS5jb25zdHJhaW50cyA9XG5cdFx0XHRhbGlnbjpcImhvcml6b250YWxcIlxuXHRcdFx0dG9wOkB0b3BDb25zdHJhaW50XG5cdHNpZ25hbCA9IFtdXG5cdGlmIHNldHVwLnNpZ25hbCA8IDFcblx0XHRub05ldHdvcmsgPSBuZXcgaW9zLlRleHQgc3VwZXJMYXllcjpzdGF0dXNCYXIsIGZvbnRTaXplOjEyLCB0ZXh0OlwiTm8gTmV0d29ya1wiXG5cdFx0bm9OZXR3b3JrLmNvbnN0cmFpbnRzID1cblx0XHRcdGxlYWRpbmc6N1xuXHRcdFx0dG9wOjNcblx0ZWxzZVxuXHRcdGZvciBpIGluIFswLi4uc2V0dXAuc2lnbmFsXVxuXHRcdFx0ZG90ID0gbmV3IExheWVyIGhlaWdodDppb3MudXRpbHMucHgoNS41KSwgd2lkdGg6aW9zLnV0aWxzLnB4KDUuNSksIGJhY2tncm91bmRDb2xvcjpcImJsYWNrXCIsIHN1cGVyTGF5ZXI6c3RhdHVzQmFyLCBib3JkZXJSYWRpdXM6aW9zLnV0aWxzLnB4KDUuNSkvMiwgYmFja2dyb3VuZENvbG9yOkBjb2xvciwgbmFtZTpcInNpZ25hbFsje2l9XVwiXG5cdFx0XHRpZiBpID09IDBcblx0XHRcdFx0ZG90LmNvbnN0cmFpbnRzID1cblx0XHRcdFx0XHRsZWFkaW5nOjdcblx0XHRcdFx0XHR0b3A6N1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRkb3QuY29uc3RyYWludHMgPVxuXHRcdFx0XHRcdGxlYWRpbmc6W3NpZ25hbFtpIC0gMSBdLCAxXVxuXHRcdFx0XHRcdHRvcDo3XG5cdFx0XHRzaWduYWwucHVzaCBkb3Rcblx0XHRcdGlvcy5sYXlvdXQuc2V0KClcblx0XHRpZiBzZXR1cC5zaWduYWwgPCA1XG5cdFx0XHRub25Eb3RzID0gNSAtIHNldHVwLnNpZ25hbFxuXHRcdFx0Zm9yIGkgaW4gWzAuLi5ub25Eb3RzXVxuXHRcdFx0XHRub25Eb3QgPSBuZXcgTGF5ZXIgaGVpZ2h0Omlvcy51dGlscy5weCg1LjUpLCB3aWR0aDppb3MudXRpbHMucHgoNS41KSwgc3VwZXJMYXllcjpzdGF0dXNCYXIsIGJvcmRlclJhZGl1czppb3MudXRpbHMucHgoNS41KS8yLCBiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiLCBuYW1lOlwic2lnbmFsWyN7c2lnbmFsLmxlbmd0aH1dXCJcblx0XHRcdFx0bm9uRG90LnN0eWxlLmJvcmRlciA9IFwiI3tpb3MudXRpbHMucHgoMSl9cHggc29saWQgI3tAY29sb3J9XCJcblx0XHRcdFx0bm9uRG90LmNvbnN0cmFpbnRzID1cblx0XHRcdFx0XHRsZWFkaW5nOltzaWduYWxbc2lnbmFsLmxlbmd0aCAtIDFdLCAxXVxuXHRcdFx0XHRcdHRvcDo3XG5cdFx0XHRcdHNpZ25hbC5wdXNoIG5vbkRvdFxuXHRcdFx0XHRpb3MubGF5b3V0LnNldCgpXG5cdFx0Y2FycmllciA9IG5ldyBpb3MuVGV4dCBzdHlsZTpcInN0YXR1c0JhckNhcnJpZXJcIiwgdGV4dDpzZXR1cC5jYXJyaWVyLCBzdXBlckxheWVyOnN0YXR1c0JhciwgZm9udFNpemU6MTIsIGNvbG9yOkBjb2xvciwgbmFtZTpcImNhcnJpZXJcIiwgdGV4dFRyYW5zZm9ybTpcImNhcGl0YWxpemVcIlxuXHRcdGNhcnJpZXIuY29uc3RyYWludHMgPVxuXHRcdFx0bGVhZGluZzpbc2lnbmFsW3NpZ25hbC5sZW5ndGggLSAxXSwgN11cblx0XHRcdHRvcDozXG5cdFx0aW9zLmxheW91dC5zZXQoKVxuXHRcdGlmIHNldHVwLmNhcnJpZXJcblx0XHRcdG5ldHdvcmsgPSBuZXcgaW9zLlRleHQgc3R5bGU6XCJzdGF0dXNCYXJOZXR3b3JrXCIsIHRleHQ6c2V0dXAubmV0d29yaywgc3VwZXJMYXllcjpzdGF0dXNCYXIsIGZvbnRTaXplOjEyLCBjb2xvcjpAY29sb3IsIG5hbWU6XCJuZXR3b3JrXCIsIHRleHRUcmFuc2Zvcm06XCJ1cHBlcmNhc2VcIlxuXHRcdFx0bmV0d29yay5jb25zdHJhaW50cyA9XG5cdFx0XHRcdGxlYWRpbmc6W2NhcnJpZXIsIDVdXG5cdFx0XHRcdHRvcDozXG5cblx0XHRpZiBzZXR1cC5jYXJyaWVyID09IFwiXCIgfHwgc2V0dXAuY2FycmllciA9PSBcIndpZmlcIlxuXHRcdFx0bmV0d29ya0ljb24gPSBpb3MudXRpbHMuc3ZnKGlvcy5hc3NldHMubmV0d29yaywgQGNvbG9yKVxuXHRcdFx0bmV0d29yayA9IG5ldyBMYXllciB3aWR0aDpuZXR3b3JrSWNvbi53aWR0aCwgaGVpZ2h0Om5ldHdvcmtJY29uLmhlaWdodCwgc3VwZXJMYXllcjpzdGF0dXNCYXIsIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsIG5hbWU6XCJuZXR3b3JrXCJcblx0XHRcdG5ldHdvcmsuaHRtbCA9IG5ldHdvcmtJY29uLnN2Z1xuXHRcdFx0aW9zLnV0aWxzLmNoYW5nZUZpbGwobmV0d29yaywgQGNvbG9yKVxuXHRcdFx0bmV0d29yay5jb25zdHJhaW50cyA9XG5cdFx0XHRcdGxlYWRpbmc6W3NpZ25hbFtzaWduYWwubGVuZ3RoIC0gMV0sIDVdXG5cdFx0XHRcdHRvcDpAdG9wQ29uc3RyYWludFxuXG5cdGJhdHRlcnlJY29uID0gbmV3IExheWVyIHdpZHRoOmlvcy51dGlscy5weCgyNSksIGhlaWdodDppb3MudXRpbHMucHgoMTApLCBzdXBlckxheWVyOnN0YXR1c0JhciwgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIiwgbmFtZTpcImJhdHRlcnlJY29uXCJcblx0aWYgc2V0dXAuYmF0dGVyeSA+IDcwXG5cdFx0aGlnaEJhdHRlcnkgPSBpb3MudXRpbHMuc3ZnKGlvcy5hc3NldHMuYmF0dGVyeUhpZ2gpXG5cdFx0YmF0dGVyeUljb24uaHRtbCA9IGhpZ2hCYXR0ZXJ5LnN2Z1xuXHRcdGlvcy51dGlscy5jaGFuZ2VGaWxsKGJhdHRlcnlJY29uLCBAY29sb3IpXG5cblx0aWYgc2V0dXAuYmF0dGVyeSA8PSA3MCAmJiBzZXR1cC5iYXR0ZXJ5ID4gMjBcblx0XHRtaWRCYXR0ZXJ5ID0gaW9zLnV0aWxzLnN2Zyhpb3MuYXNzZXRzLmJhdHRlcnlNaWQpXG5cdFx0YmF0dGVyeUljb24uaHRtbCA9IG1pZEJhdHRlcnkuc3ZnXG5cdFx0aW9zLnV0aWxzLmNoYW5nZUZpbGwoYmF0dGVyeUljb24sIEBjb2xvcilcblxuXHRpZiBzZXR1cC5iYXR0ZXJ5IDw9IDIwXG5cdFx0bG93QmF0dGVyeSA9IGlvcy51dGlscy5zdmcoaW9zLmFzc2V0cy5iYXR0ZXJ5TG93KVxuXHRcdGJhdHRlcnlJY29uLmh0bWwgPSBsb3dCYXR0ZXJ5LnN2Z1xuXHRcdGlvcy51dGlscy5jaGFuZ2VGaWxsKGJhdHRlcnlJY29uLCBAY29sb3IpXG5cblx0YmF0dGVyeUljb24uY29uc3RyYWludHMgPVxuXHRcdHRyYWlsaW5nIDogN1xuXHRcdHRvcDpAYmF0dGVyeUljb25cblxuXHRiYXR0ZXJ5UGVyY2VudCA9IG5ldyBpb3MuVGV4dCBzdHlsZTpcInN0YXR1c0JhckJhdHRlcnlQZXJjZW50XCIsIHRleHQ6c2V0dXAuYmF0dGVyeSArIFwiJVwiLCBzdXBlckxheWVyOnN0YXR1c0JhciwgZm9udFNpemU6MTIsIGNvbG9yOkBjb2xvciwgbmFtZTpcImJhdHRlcnlQZXJjZW50XCJcblx0YmF0dGVyeVBlcmNlbnQuY29uc3RyYWludHMgPVxuXHRcdHRyYWlsaW5nOiBbYmF0dGVyeUljb24sIDNdXG5cdFx0dmVydGljYWxDZW50ZXI6dGltZVxuXG5cdGJsdWV0b290aFNWRyA9IGlvcy51dGlscy5zdmcoaW9zLmFzc2V0cy5ibHVldG9vdGgpXG5cdGJsdWV0b290aCA9IG5ldyBMYXllciB3aWR0aDpibHVldG9vdGhTVkcud2lkdGgsIGhlaWdodDpibHVldG9vdGhTVkcuaGVpZ2h0LCBzdXBlckxheWVyOnN0YXR1c0Jhciwgb3BhY2l0eTouNSwgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIiwgbmFtZTpcImJsdWV0b290aFwiXG5cdGJsdWV0b290aC5odG1sID0gYmx1ZXRvb3RoU1ZHLnN2Z1xuXHRpb3MudXRpbHMuY2hhbmdlRmlsbChibHVldG9vdGgsIEBjb2xvcilcblx0Ymx1ZXRvb3RoLmNvbnN0cmFpbnRzID1cblx0XHR0b3A6IEBibHVldG9vdGhcblx0XHR0cmFpbGluZzogW2JhdHRlcnlQZXJjZW50LCA3XVxuXG5cdGlvcy5sYXlvdXQuc2V0KClcblxuXHQjIEV4cG9ydCBzdGF0dXNCYXJcblx0c3RhdHVzQmFyLmJhdHRlcnkgPSB7fVxuXHRzdGF0dXNCYXIuYmF0dGVyeS5wZXJjZW50ID0gYmF0dGVyeVBlcmNlbnRcblx0c3RhdHVzQmFyLmJhdHRlcnkuaWNvbiA9IGJhdHRlcnlJY29uXG5cdHN0YXR1c0Jhci5ibHVldG9vdGggPSBibHVldG9vdGhcblx0c3RhdHVzQmFyLnRpbWUgPSB0aW1lXG5cdHN0YXR1c0Jhci5uZXR3b3JrID0gbmV0d29ya1xuXHRzdGF0dXNCYXIuY2FycmllciA9IGNhcnJpZXJcblx0c3RhdHVzQmFyLnNpZ25hbCA9IHNpZ25hbFxuXHRyZXR1cm4gc3RhdHVzQmFyXG4iLCJpb3MgPSByZXF1aXJlICdpb3Mta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuXHRhY3Rpb25zOltcIlJlcGx5XCIsIFwiUmVwbHkgQWxsXCIsIFwiRm9yd2FyZFwiLCBcIlByaW50XCJdXG5cdGV4aXQ6XCJDYW5jZWxcIlxuXHRhbmltYXRlZDp0cnVlXG5cdGRlc2NyaXB0aW9uOnVuZGVmaW5lZFxuXHR0YXJnZXQ6dW5kZWZpbmVkXG59XG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSBpb3MudXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cdGZvciBsIGluIEZyYW1lci5DdXJyZW50Q29udGV4dC5sYXllcnNcblx0XHRpZiBsLnR5cGUgPT0gJ3NoZWV0J1xuXHRcdFx0bC5kaXNtaXNzKClcblxuXHRzaGVldCA9IG5ldyBpb3MuVmlld1xuXHRcdG5hbWU6XCJzaGVldFwiXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0dG9wOjBcblx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0dHJhaWxpbmc6MFxuXHRcdFx0Ym90dG9tOjBcblxuXHRzaGVldC50eXBlID0gJ3NoZWV0J1xuXG5cdHNoZWV0Lm1lbnUgPSBuZXcgTGF5ZXJcblx0XHRuYW1lOlwibWVudVwiXG5cdFx0c3VwZXJMYXllcjpzaGVldFxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRib3JkZXJSYWRpdXM6aW9zLnB4KDEyKVxuXHRcdGNsaXA6dHJ1ZVxuXG5cdFx0aWYgaW9zLmlzUGFkKClcblx0XHRcdHNoZWV0VGlwID0gaW9zLnV0aWxzLnN2Zyhpb3MuYXNzZXRzLnNoZWV0VGlwKVxuXHRcdFx0c2hlZXQudGlwID0gbmV3IGlvcy5WaWV3XG5cdFx0XHRcdG5hbWU6Jy50aXAnXG5cdFx0XHRcdGNvbG9yOidibGFjaydcblx0XHRcdFx0c3VwZXJMYXllcjpzaGVldFxuXHRcdFx0XHRodG1sOnNoZWV0VGlwLnN2Z1xuXHRcdFx0XHRoZWlnaHQ6c2hlZXRUaXAuaGVpZ2h0IC0gNFxuXHRcdFx0XHR3aWR0aDpzaGVldFRpcC53aWR0aFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50J1xuXHRcdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0XHRob3Jpem9udGFsQ2VudGVyOnNldHVwLnRhcmdldFxuXHRcdFx0c2hlZXQubGlua2VkID0gc2V0dXAudGFyZ2V0XG5cdFx0XHRzaGVldC5saW5rZWQuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXG5cdHBsYWNlID0gKHQsIGwpLT5cblx0XHR3ID0gaW9zLmRldmljZS53aWR0aFxuXHRcdGggPSBpb3MuZGV2aWNlLmhlaWdodFxuXHRcdGNlbnRlclggPSB3LzJcblx0XHQjIHggLSBheGlzXG5cdFx0aWYgdyAtIHQueCA+IGNlbnRlclggI2xlZnRcblx0XHRcdGlmIHQueCAtIGlvcy5weCgxNTApIDwgMFxuXHRcdFx0XHRsLmNvbnN0cmFpbnRzLmxlYWRpbmcgPSAxMFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRsLmNvbnN0cmFpbnRzLmhvcml6b250YWxDZW50ZXIgPSB0XG5cblx0XHRlbHNlICNyaWdodFxuXHRcdFx0aWYgdC54ICsgaW9zLnB4KDE1MCkgPiB3XG5cdFx0XHRcdGwuY29uc3RyYWludHMudHJhaWxpbmcgPSAxMFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRsLmNvbnN0cmFpbnRzLmhvcml6b250YWxDZW50ZXIgPSB0XG5cblx0XHRpZiB0LnkgKyBsLmhlaWdodCA8IGggI3RvcFxuXHRcdFx0XHRsLmNvbnN0cmFpbnRzLnRvcCA9IFt0LCA0MF1cblx0XHRcdFx0aWYgaW9zLmlzUGFkKClcblx0XHRcdFx0XHRzaGVldC50aXAuY29uc3RyYWludHMuYm90dG9tID0gW2wsIDFdXG5cdFx0ZWxzZSAjYm90dG9tXG5cdFx0XHRcdGwuY29uc3RyYWludHMuYm90dG9tID0gW3QsIDQwXVxuXHRcdFx0XHRpZiBpb3MuaXNQYWQoKVxuXHRcdFx0XHRcdHNoZWV0LnRpcC5jb25zdHJhaW50cy50b3AgPSBbbCwgMV1cblx0XHRcdFx0XHRzaGVldC50aXAucm90YXRpb24gPSAxODBcblx0XHRpZiBpb3MuaXNQYWQoKVxuXHRcdFx0aW9zLmxheW91dC5zZXQoc2hlZXQudGlwKVxuXHRzaGVldC5kaXNtaXNzID0gLT5cblxuXHRcdGlmIGlvcy5pc1Bob25lKClcblx0XHRcdHNoZWV0Lm1lbnUuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdHk6aW9zLmRldmljZS5oZWlnaHRcblx0XHRcdFx0dGltZTouMjVcblxuXHRcdFx0c2hlZXQuY2FuY2VsLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHR5Omlvcy5kZXZpY2UuaGVpZ2h0ICsgaW9zLnB4KDc1KVxuXHRcdFx0XHR0aW1lOi4yNVxuXHRcdFx0c2hlZXQub3ZlcmxheS5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0b3BhY2l0eTowXG5cdFx0XHRcdHRpbWU6LjI1XG5cdFx0XHRVdGlscy5kZWxheSAuMjUsIC0+XG5cdFx0XHRcdHNoZWV0LmRlc3Ryb3koKVxuXHRcdGVsc2Vcblx0XHRcdHNoZWV0LmxpbmtlZC5pZ25vcmVFdmVudHMgPSBmYWxzZVxuXHRcdFx0VXRpbHMuZGVsYXkgLjE1LCAtPlxuXHRcdFx0XHRzaGVldC5kZXN0cm95KClcblxuXG5cdHNoZWV0LmNhbGwgPSAtPlxuXHRcdGlmIGlvcy5pc1Bob25lKClcblx0XHRcdHNoZWV0Lm1lbnUueSA9IGlvcy5kZXZpY2UuaGVpZ2h0XG5cdFx0XHRzaGVldC5jYW5jZWwueSA9IGlvcy5kZXZpY2UuaGVpZ2h0ICsgaW9zLnB4KDc1KVxuXHRcdFx0c2hlZXQub3ZlcmxheS5vcGFjaXR5ID0gMFxuXG5cdFx0XHRzaGVldC5vdmVybGF5LmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRvcGFjaXR5Oi41XG5cdFx0XHRcdHRpbWU6LjI1XG5cdFx0XHRpb3MubGF5b3V0LmFuaW1hdGVcblx0XHRcdFx0dGFyZ2V0OltzaGVldC5tZW51LCBzaGVldC5jYW5jZWxdXG5cdFx0XHRcdHRpbWU6LjI1XG5cdFx0ZWxzZVxuXHRcdFx0cGxhY2Uoc2V0dXAudGFyZ2V0LCBzaGVldC5tZW51KVxuXHRcdFx0aW9zLmxheW91dC5zZXQoc2hlZXQubWVudSlcblxuXG5cblx0aWYgaW9zLmRldmljZS5uYW1lLmluZGV4T2YoXCJpcGFkXCIpID09IC0xXG5cdFx0c2hlZXQub3ZlcmxheSA9IG5ldyBpb3MuVmlld1xuXHRcdFx0bmFtZTpcIi5vdmVybGF5XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjpcImJsYWNrXCJcblx0XHRcdG9wYWNpdHk6LjVcblx0XHRcdHN1cGVyTGF5ZXI6c2hlZXRcblx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHR0b3A6MFxuXHRcdFx0XHRsZWFkaW5nOjBcblx0XHRcdFx0dHJhaWxpbmc6MFxuXHRcdFx0XHRib3R0b206MFxuXHRcdHNoZWV0Lm92ZXJsYXkuc2VuZFRvQmFjaygpXG5cblx0XHRzaGVldC5tZW51LmNvbnN0cmFpbnRzID1cblx0XHRcdGxlYWRpbmc6MTBcblx0XHRcdHRyYWlsaW5nOjEwXG5cdFx0XHRib3R0b206NTcgKyA4ICsgMTBcblx0XHRcdGhlaWdodDooc2V0dXAuYWN0aW9ucy5sZW5ndGgpICogNTdcblxuXHRcdHNoZWV0LmNhbmNlbCA9IG5ldyBpb3MuQnV0dG9uXG5cdFx0XHRuYW1lOlwiLmNhbmNlbFwiXG5cdFx0XHR0eXBlOlwiYmlnXCJcblx0XHRcdHRleHQ6c2V0dXAuZXhpdFxuXHRcdFx0c3VwZXJMYXllcjpzaGVldFxuXHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdGJvdHRvbToxMFxuXHRcdFx0XHRsZWFkaW5nOjBcblx0XHRcdFx0dHJhaWxpbmc6MFxuXHRcdHNoZWV0LmNhbmNlbC5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG5cdFx0XHRzaGVldC5kaXNtaXNzKClcblx0ZWxzZVxuXHRcdHNoZWV0Lm1lbnUuY29uc3RyYWludHMgPVxuXHRcdFx0d2lkdGg6MzAwXG5cdFx0XHRoZWlnaHQ6KHNldHVwLmFjdGlvbnMubGVuZ3RoKSAqIDU3XG5cblx0XHRzaGVldC5tZW51LnByb3BzID1cblx0XHRcdHNoYWRvd1k6MlxuXHRcdFx0c2hhZG93Qmx1cjppb3MucHgoMTAwKVxuXHRcdFx0c2hhZG93Q29sb3I6XCJyZ2JhKDAsMCwwLDAuMSlcIlxuXG5cdGlvcy5sYXlvdXQuc2V0KHNoZWV0KVxuXG5cdHNoZWV0LmFjdGlvbnNBcnJheSA9IFtdXG5cdHNoZWV0LmFjdGlvbnMgPSB7fVxuXHRmb3IgYSxpIGluIHNldHVwLmFjdGlvbnNcblx0XHRhY3Rpb24gPSBuZXcgaW9zLlZpZXdcblx0XHRcdG5hbWU6IFwiLmFjdGlvbnMuW1xcXCJcIiArIGEudG9Mb3dlckNhc2UoKSArIFwiXFxcIl1cIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOlwicmdiYSgyNTUsMjU1LDI1NSwxKVwiXG5cdFx0XHRzdXBlckxheWVyOnNoZWV0Lm1lbnVcblx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHRsZWFkaW5nOjBcblx0XHRcdFx0dHJhaWxpbmc6MFxuXHRcdFx0XHRoZWlnaHQ6NTdcblx0XHRhY3Rpb24uc3R5bGVbXCItd2Via2l0LWJveC1zaGFkb3dcIl0gPSBcImluc2V0IDAgMCBcIiArIGlvcy5weCguNSkgKyBcInB4IHJnYmEoMCwwLDAsLjI1KVwiXG5cblx0XHRhY3Rpb24ubGFiZWwgPSBuZXcgaW9zLlRleHRcblx0XHRcdHRleHQ6YVxuXHRcdFx0Y29sb3I6aW9zLmNvbG9yKFwiYmx1ZVwiKVxuXHRcdFx0Zm9udFNpemU6MjBcblx0XHRcdHN1cGVyTGF5ZXI6YWN0aW9uXG5cdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0YWxpZ246XCJjZW50ZXJcIlxuXG5cdFx0aW9zLnV0aWxzLnNwZWNpYWxDaGFyKGFjdGlvbi5sYWJlbClcblxuXHRcdGlmIGkgPT0gMFxuXHRcdFx0YWN0aW9uLmNvbnN0cmFpbnRzLnRvcCA9IDBcblx0XHRlbHNlXG5cdFx0XHRhY3Rpb24uY29uc3RyYWludHMudG9wID0gc2hlZXQuYWN0aW9uc0FycmF5W2kgLSAxXVxuXG5cdFx0YWN0aW9uLm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAtPlxuXHRcdFx0QC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOkAuYmFja2dyb3VuZENvbG9yLmRhcmtlbigxMClcblx0XHRcdFx0XHR0aW1lOi4yXG5cblx0XHRhY3Rpb24ub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuXHRcdFx0QC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwicmdiYSgyNTUsMjU1LDI1NSwgLjgpXCJcblx0XHRcdFx0dGltZTouMlxuXHRcdFx0c2hlZXQuZGlzbWlzcygpXG5cblxuXG5cdFx0aW9zLmxheW91dC5zZXQoYWN0aW9uKVxuXG5cdFx0c2hlZXQuYWN0aW9uc0FycmF5LnB1c2ggYWN0aW9uXG5cdFx0c2hlZXQuYWN0aW9uc1thLnRvTG93ZXJDYXNlKCldID0gYWN0aW9uXG5cblxuXHRpZiBzZXR1cC5hbmltYXRlZFxuXHRcdHNoZWV0LmNhbGwoKVxuXHRpZiBpb3MuaXNQYWQoKVxuXHRcdHNoZWV0LnRpcC5icmluZ1RvRnJvbnQoKVxuXHRyZXR1cm4gc2hlZXRcbiIsImlvcyA9IHJlcXVpcmUgJ2lvcy1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPVxuXHR0aXRsZTpcIlRpdGxlXCJcblx0bGVmdDp1bmRlZmluZWRcblx0cmlnaHQ6XCJFZGl0XCJcblx0Ymx1cjp0cnVlXG5cdHN1cGVyTGF5ZXI6dW5kZWZpbmVkXG5cdHR5cGU6XCJuYXZCYXJcIlxuXHRjb2xvcjonYmx1ZSdcblx0dGl0bGVDb2xvcjonYmxhY2snXG5cdGJhY2tncm91bmRDb2xvcjpcInJnYmEoMjU1LCAyNTUsIDI1NSwgLjgpXCJcblx0ZGl2aWRlckJhY2tncm91bmRDb2xvcjpcIiNCMkIyQjJcIlxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gaW9zLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuXG5cdGJhciA9IG5ldyBpb3MuVmlld1xuXHRcdG5hbWU6XCJuYXZCYXJcIlxuXHRcdGJhY2tncm91bmRDb2xvcjogc2V0dXAuYmFja2dyb3VuZENvbG9yXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRsZWFkaW5nOjBcblx0XHRcdHRyYWlsaW5nOjBcblx0XHRcdHRvcDowXG5cdFx0XHRoZWlnaHQ6NjRcblxuXHRiYXIuYmcgPSBuZXcgaW9zLlZpZXdcblx0XHRzdXBlckxheWVyOmJhclxuXHRcdGJhY2tncm91bmRDb2xvcjondHJhbnNwYXJlbnQnXG5cdFx0bmFtZTpcIi5iZ1wiXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRsZWFkaW5nOjBcblx0XHRcdHRyYWlsaW5nOjBcblx0XHRcdGhlaWdodDo0NFxuXHRcdFx0Ym90dG9tOjBcblxuXHRiYXIuZGl2aWRlciA9IG5ldyBpb3MuVmlld1xuXHRcdGJhY2tncm91bmRDb2xvcjpzZXR1cC5kaXZpZGVyQmFja2dyb3VuZENvbG9yXG5cdFx0bmFtZTpcIi5kaXZpZGVyXCJcblx0XHRzdXBlckxheWVyOmJhci5iZ1xuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0aGVpZ2h0Oi41XG5cdFx0XHRib3R0b206MFxuXHRcdFx0bGVhZGluZzowXG5cdFx0XHR0cmFpbGluZzowXG5cblx0aWYgc2V0dXAuc3VwZXJMYXllclxuXHRcdHNldHVwLnN1cGVyTGF5ZXIuYWRkU3ViTGF5ZXIoYmFyKVxuXG5cblx0aWYgc2V0dXAuYmx1clxuXHRcdGlvcy51dGlscy5iZ0JsdXIoYmFyKVxuXG5cdGlmIHNldHVwLmJsdXIgPT0gZmFsc2UgJiYgc2V0dXAuYmFja2dyb3VuZENvbG9yID09IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAuOClcIlxuXHRcdGJhci5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnXG5cblx0YmFyLnR5cGUgPSBzZXR1cC50eXBlXG5cblx0Zm9yIGxheWVyIGluIEZyYW1lci5DdXJyZW50Q29udGV4dC5sYXllcnNcblx0XHRpZiBsYXllci50eXBlID09IFwic3RhdHVzQmFyXCJcblx0XHRcdEBzdGF0dXNCYXIgPSBsYXllclxuXHRcdFx0YmFyLnBsYWNlQmVoaW5kKEBzdGF0dXNCYXIpXG5cblxuXHRpZiB0eXBlb2Ygc2V0dXAudGl0bGUgPT0gXCJvYmplY3RcIlxuXHRcdHNldHVwLnRpdGxlID0gc2V0dXAudGl0bGUubGFiZWwuaHRtbFxuXG5cblx0YmFyLnRpdGxlID0gbmV3IGlvcy5UZXh0XG5cdFx0Zm9udFdlaWdodDpcInNlbWlib2xkXCJcblx0XHRzdXBlckxheWVyOmJhci5iZ1xuXHRcdHRleHQ6c2V0dXAudGl0bGVcblx0XHRuYW1lOlwiLnRpdGxlXCJcblx0XHRjb2xvcjpzZXR1cC50aXRsZUNvbG9yXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRhbGlnbjpcImhvcml6b250YWxcIlxuXHRcdFx0Ym90dG9tOjEyXG5cblx0aW9zLnV0aWxzLnNwZWNpYWxDaGFyKGJhci50aXRsZSlcblxuXHQjIEhhbmRsZSBSaWdodFxuXHRpZiB0eXBlb2Ygc2V0dXAucmlnaHQgPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Ygc2V0dXAucmlnaHQgIT0gXCJib29sZWFuXCJcblx0XHRiYXIucmlnaHQgPSBuZXcgaW9zLkJ1dHRvblxuXHRcdFx0bmFtZTpcIi5yaWdodFwiXG5cdFx0XHRzdXBlckxheWVyOmJhci5iZ1xuXHRcdFx0dGV4dDpzZXR1cC5yaWdodFxuXHRcdFx0Y29sb3I6c2V0dXAuY29sb3Jcblx0XHRcdGZvbnRXZWlnaHQ6NTAwXG5cdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0Ym90dG9tOjEyXG5cdFx0XHRcdHRyYWlsaW5nOjhcblx0XHRiYXIucmlnaHQudHlwZSA9IFwiYnV0dG9uXCJcblx0XHRpb3MudXRpbHMuc3BlY2lhbENoYXIoYmFyLnJpZ2h0KVxuXHRpZiB0eXBlb2Ygc2V0dXAucmlnaHQgPT0gXCJvYmplY3RcIlxuXHRcdGJhci5yaWdodCA9IHNldHVwLnJpZ2h0XG5cdFx0YmFyLnJpZ2h0Lm5hbWUgPSBcIi5yaWdodFwiXG5cdFx0YmFyLnJpZ2h0LnN1cGVyTGF5ZXIgPSBiYXIuYmdcblx0XHRiYXIucmlnaHQuY29uc3RyYWludHMgPVxuXHRcdFx0dHJhaWxpbmc6OFxuXHRcdFx0Ym90dG9tOjEyXG5cdFx0aW9zLmxheW91dC5zZXQoYmFyLnJpZ2h0KVxuXG5cdCMgSGFuZGxlIExlZnRcblx0aWYgdHlwZW9mIHNldHVwLmxlZnQgPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Ygc2V0dXAubGVmdCAhPSBcImJvb2xlYW5cIlxuXHRcdHNldExlYWRpbmcgPSA4XG5cdFx0aWYgc2V0dXAubGVmdC5pbmRleE9mKFwiPFwiKSAhPSAtMVxuXHRcdFx0c3ZnID0gaW9zLnV0aWxzLnN2Zyhpb3MuYXNzZXRzLmNoZXZyb24pXG5cdFx0XHRiYXIuY2hldnJvbiA9IG5ldyBpb3MuVmlld1xuXHRcdFx0XHRuYW1lOlwiLmNoZXZyb25cIlxuXHRcdFx0XHR3aWR0aDpzdmcud2lkdGhcblx0XHRcdFx0aGVpZ2h0OnN2Zy5oZWlnaHRcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdFx0XHRzdXBlckxheWVyOmJhci5iZ1xuXHRcdFx0YmFyLmNoZXZyb24uaHRtbCA9IHN2Zy5zdmdcblx0XHRcdGJhci5jaGV2cm9uLmNvbnN0cmFpbnRzID1cblx0XHRcdFx0XHRib3R0b206OVxuXHRcdFx0XHRcdGxlYWRpbmc6OFxuXHRcdFx0c2V0dXAubGVmdCA9IHNldHVwLmxlZnQucmVwbGFjZShcIjxcIiwgXCJcIilcblx0XHRcdGlvcy51dGlscy5jaGFuZ2VGaWxsKGJhci5jaGV2cm9uLCBzZXR1cC5jb2xvcilcblx0XHRcdHNldExlYWRpbmcgPSBbYmFyLmNoZXZyb24sIDRdXG5cdFx0XHRpb3MubGF5b3V0LnNldChiYXIuY2hldnJvbilcblxuXHRcdGJhci5sZWZ0ID0gbmV3IGlvcy5CdXR0b25cblx0XHRcdG5hbWU6XCIubGVmdFwiXG5cdFx0XHRzdXBlckxheWVyOmJhci5iZ1xuXHRcdFx0dGV4dDpzZXR1cC5sZWZ0XG5cdFx0XHRjb2xvcjpzZXR1cC5jb2xvclxuXHRcdFx0Zm9udFdlaWdodDo1MDBcblx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHRib3R0b206MTJcblx0XHRcdFx0bGVhZGluZzpzZXRMZWFkaW5nXG5cdFx0YmFyLmxlZnQudHlwZSA9IFwiYnV0dG9uXCJcblx0XHRpb3MudXRpbHMuc3BlY2lhbENoYXIoYmFyLmxlZnQpXG5cblx0XHRiYXIubGVmdC5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblx0XHRcdGlmIGJhci5jaGV2cm9uXG5cdFx0XHRcdGJhci5jaGV2cm9uLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOihvcGFjaXR5Oi4yNSlcblx0XHRcdFx0XHR0aW1lOi41XG5cdFx0YmFyLmxlZnQub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuXHRcdFx0aWYgYmFyLmNoZXZyb25cblx0XHRcdFx0YmFyLmNoZXZyb24uYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6KG9wYWNpdHk6MSlcblx0XHRcdFx0XHR0aW1lOi41XG5cblx0aWYgdHlwZW9mIHNldHVwLmxlZnQgPT0gXCJvYmplY3RcIlxuXHRcdGJhci5sZWZ0ID0gc2V0dXAubGVmdFxuXHRcdGJhci5sZWZ0Lm5hbWUgPSBcIi5sZWZ0XCJcblx0XHRiYXIubGVmdC5zdXBlckxheWVyID0gYmFyLmJnXG5cdFx0YmFyLmxlZnQuY29uc3RyYWludHMgPVxuXHRcdFx0bGVhZGluZzo4XG5cdFx0XHRib3R0b206MTJcblxuXHRpb3MubGF5b3V0LnNldChiYXIubGVmdClcblx0cmV0dXJuIGJhclxuIiwiaW9zID0gcmVxdWlyZSBcImlvcy1raXRcIlxuXG4jIEJ1aWxkIExpYnJhcnkgIFByb3BlcnRpZXNcbmxheWVyID0gbmV3IExheWVyXG5leHBvcnRzLmxheWVyUHJvcHMgPSBPYmplY3Qua2V5cyhsYXllci5wcm9wcylcbmV4cG9ydHMubGF5ZXJQcm9wcy5wdXNoIFwic3VwZXJMYXllclwiXG5leHBvcnRzLmxheWVyUHJvcHMucHVzaCBcImNvbnN0cmFpbnRzXCJcbmV4cG9ydHMubGF5ZXJTdHlsZXMgPSBPYmplY3Qua2V5cyhsYXllci5zdHlsZSlcbmxheWVyLmRlc3Ryb3koKVxuXG5leHBvcnRzLmFzc2V0cyA9IHtcblx0c2hlZXRUaXA6XCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0PHN2ZyB3aWR0aD0nMjdweCcgaGVpZ2h0PScxM3B4JyB2aWV3Qm94PScwIDAgMjcgMTMnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDM5LjEgKDMxNzIwKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0ICAgIDx0aXRsZT5UcmlhbmdsZTwvdGl0bGU+XG5cdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0ICAgIDxkZWZzPjwvZGVmcz5cblx0ICAgIDxnIGlkPSdpT1MtS2l0JyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0ICAgICAgICA8ZyBpZD0nTmF2aWdhdGlvbi1CYXItQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTI2MzQuMDAwMDAwLCAtMTI0LjAwMDAwMCknIGZpbGw9JyNGRkZGRkYnPlxuXHQgICAgICAgICAgICA8cGF0aCBkPSdNMjY0NC43MTkxNiwxMjUuODgzODM0IEMyNjQ2LjI1NDk4LDEyNC4yOTExMzYgMjY0OC43NDU4NSwxMjQuMjkxOTkyIDI2NTAuMjgwODQsMTI1Ljg4MzgzNCBMMjY2MSwxMzcgTDI2MzQsMTM3IEwyNjQ0LjcxOTE2LDEyNS44ODM4MzQgWicgaWQ9J1RyaWFuZ2xlJz48L3BhdGg+XG5cdCAgICAgICAgPC9nPlxuXHQgICAgPC9nPlxuXHQ8L3N2Zz5cIlxuXHRibHVldG9vdGg6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0PHN2ZyB3aWR0aD0nN3B4JyBoZWlnaHQ9JzEzcHgnIHZpZXdCb3g9JzAgMCA4IDE1JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0PHRpdGxlPkJsdWV0b290aDwvdGl0bGU+XG5cdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J1N0YXR1cy1JY29ucy0oV2hpdGUpJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMTM3LjAwMDAwMCwgMC4wMDAwMDApJyBmaWxsPScjRkZGJz5cblx0XHRcdFx0XHQ8cGF0aCBkPSdNMTQwLjUsMTQuNSBMMTQ1LDEwLjI1IEwxNDEuOCw3LjUgTDE0NSw0Ljc1IEwxNDAuNSwwLjUgTDE0MC41LDYuMDcxNDI4NTcgTDEzNy44LDMuNzUgTDEzNyw0LjUgTDE0MC4yNTgzMzMsNy4zNzUgTDEzNywxMC4yNSBMMTM3LjgsMTEgTDE0MC41LDguNjc4NTcxNDMgTDE0MC41LDE0LjUgWiBNMTQxLjUsMyBMMTQzLjM2NjY2Nyw0Ljc1IEwxNDEuNSw2LjI1IEwxNDEuNSwzIFogTTE0MS41LDguNSBMMTQzLjM2NjY2NywxMC4yNSBMMTQxLjUsMTIgTDE0MS41LDguNSBaJyBpZD0nQmx1ZXRvb3RoJz48L3BhdGg+XG5cdFx0XHRcdDwvZz5cblx0XHQ8L3N2Zz5cIlxuXHRiYXR0ZXJ5SGlnaCA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0PHN2ZyB3aWR0aD0nMjVweCcgaGVpZ2h0PScxMHB4JyB2aWV3Qm94PScwIDAgMjUgMTAnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHQgICAgPHRpdGxlPkJhdHRlcnk8L3RpdGxlPlxuXHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHQgICAgPGRlZnM+PC9kZWZzPlxuXHRcdCAgICA8ZyBpZD0nU3ltYm9scycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdFx0ICAgICAgICA8ZyBpZD0nU3RhdHVzLUJhci9CbGFjay8xMDAlJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMzQ1LjAwMDAwMCwgLTUuMDAwMDAwKScgZmlsbD0nIzAzMDMwMyc+XG5cdFx0ICAgICAgICAgICAgPHBhdGggZD0nTTM0Ni40OTM3MTMsNS41IEMzNDUuNjY4NzU4LDUuNSAzNDUsNi4xNjgwMjE1NSAzNDUsNy4wMDUzMDMyNCBMMzQ1LDEzLjQ5NDY5NjggQzM0NSwxNC4zMjYwNTI4IDM0NS42NzMzOCwxNSAzNDYuNDkzNzEzLDE1IEwzNjYuMDA2Mjg3LDE1IEMzNjYuODMxMjQyLDE1IDM2Ny41LDE0LjMzMTk3ODQgMzY3LjUsMTMuNDk0Njk2OCBMMzY3LjUsNy4wMDUzMDMyNCBDMzY3LjUsNi4xNzM5NDcyMiAzNjYuODI2NjIsNS41IDM2Ni4wMDYyODcsNS41IEwzNDYuNDkzNzEzLDUuNSBaIE0zNjgsOC41IEwzNjgsMTIgTDM2OC43NSwxMiBDMzY5LjE2NDIxNCwxMiAzNjkuNSwxMS42NjQ0MDUzIDM2OS41LDExLjI1Nzc0IEwzNjkuNSw5LjI0MjI1OTk4IEMzNjkuNSw4LjgzMjMyMTExIDM2OS4xNjcxMDEsOC41IDM2OC43NSw4LjUgTDM2OCw4LjUgWiBNMzQ2LjUwODE1Miw2IEMzNDUuOTUxMzY1LDYgMzQ1LjUsNi40NTY5OTY5MiAzNDUuNSw3LjAwODQ0MDU1IEwzNDUuNSwxMy40OTE1NTk0IEMzNDUuNSwxNC4wNDg1MDU4IDM0NS45NDkwNTgsMTQuNSAzNDYuNTA4MTUyLDE0LjUgTDM2NS45OTE4NDgsMTQuNSBDMzY2LjU0ODYzNSwxNC41IDM2NywxNC4wNDMwMDMxIDM2NywxMy40OTE1NTk0IEwzNjcsNy4wMDg0NDA1NSBDMzY3LDYuNDUxNDk0MjIgMzY2LjU1MDk0Miw2IDM2NS45OTE4NDgsNiBMMzQ2LjUwODE1Miw2IFogTTM0Ni41MDY3NDQsNi41IEMzNDYuMjI2ODc3LDYuNSAzNDYsNi43MTYzNzIwMSAzNDYsNi45OTIwOTU5NSBMMzQ2LDEzLjUwNzkwNDEgQzM0NiwxMy43Nzk2ODExIDM0Ni4yMzAyMjUsMTQgMzQ2LjUwNjc0NCwxNCBMMzY1Ljk5MzI1NiwxNCBDMzY2LjI3MzEyMywxNCAzNjYuNSwxMy43ODM2MjggMzY2LjUsMTMuNTA3OTA0MSBMMzY2LjUsNi45OTIwOTU5NSBDMzY2LjUsNi43MjAzMTg4NiAzNjYuMjY5Nzc1LDYuNSAzNjUuOTkzMjU2LDYuNSBMMzQ2LjUwNjc0NCw2LjUgWicgaWQ9J0JhdHRlcnknPjwvcGF0aD5cblx0XHQgICAgICAgIDwvZz5cblx0XHQgICAgPC9nPlxuXHRcdDwvc3ZnPlwiXG5cdGJhdHRlcnlNaWQgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdDxzdmcgd2lkdGg9JzI1cHgnIGhlaWdodD0nMTBweCcgdmlld0JveD0nMCAwIDI1IDEwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0ICAgIDx0aXRsZT5CYXR0ZXJ5PC90aXRsZT5cblx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0ICAgIDxkZWZzPjwvZGVmcz5cblx0XHQgICAgPGcgaWQ9J1N5bWJvbHMnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHRcdCAgICAgICAgPGcgaWQ9J1N0YXR1cy1CYXIvQmxhY2svTG93LVBvd2VyJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMzQ1LjAwMDAwMCwgLTUuMDAwMDAwKScgZmlsbD0nIzAzMDMwMyc+XG5cdFx0ICAgICAgICAgICAgPHBhdGggZD0nTTM0Ni40OTM3MTMsNS41IEMzNDUuNjY4NzU4LDUuNSAzNDUsNi4xNjgwMjE1NSAzNDUsNy4wMDUzMDMyNCBMMzQ1LDEzLjQ5NDY5NjggQzM0NSwxNC4zMjYwNTI4IDM0NS42NzMzOCwxNSAzNDYuNDkzNzEzLDE1IEwzNjYuMDA2Mjg3LDE1IEMzNjYuODMxMjQyLDE1IDM2Ny41LDE0LjMzMTk3ODQgMzY3LjUsMTMuNDk0Njk2OCBMMzY3LjUsNy4wMDUzMDMyNCBDMzY3LjUsNi4xNzM5NDcyMiAzNjYuODI2NjIsNS41IDM2Ni4wMDYyODcsNS41IEwzNDYuNDkzNzEzLDUuNSBaIE0zNjgsOC41IEwzNjgsMTIgTDM2OC43NSwxMiBDMzY5LjE2NDIxNCwxMiAzNjkuNSwxMS42NjQ0MDUzIDM2OS41LDExLjI1Nzc0IEwzNjkuNSw5LjI0MjI1OTk4IEMzNjkuNSw4LjgzMjMyMTExIDM2OS4xNjcxMDEsOC41IDM2OC43NSw4LjUgTDM2OCw4LjUgWiBNMzQ2LjUwODE1Miw2IEMzNDUuOTUxMzY1LDYgMzQ1LjUsNi40NTY5OTY5MiAzNDUuNSw3LjAwODQ0MDU1IEwzNDUuNSwxMy40OTE1NTk0IEMzNDUuNSwxNC4wNDg1MDU4IDM0NS45NDkwNTgsMTQuNSAzNDYuNTA4MTUyLDE0LjUgTDM2NS45OTE4NDgsMTQuNSBDMzY2LjU0ODYzNSwxNC41IDM2NywxNC4wNDMwMDMxIDM2NywxMy40OTE1NTk0IEwzNjcsNy4wMDg0NDA1NSBDMzY3LDYuNDUxNDk0MjIgMzY2LjU1MDk0Miw2IDM2NS45OTE4NDgsNiBMMzQ2LjUwODE1Miw2IFogTTM0Ni41MDk2NSw2LjUgQzM0Ni4yMjgxNzgsNi41IDM0Niw2LjcxNjM3MjAxIDM0Niw2Ljk5MjA5NTk1IEwzNDYsMTMuNTA3OTA0MSBDMzQ2LDEzLjc3OTY4MTEgMzQ2LjIyNzY1MywxNCAzNDYuNTA5NjUsMTQgTDM1NiwxNCBMMzU2LDYuNSBMMzQ2LjUwOTY1LDYuNSBaJyBpZD0nQmF0dGVyeSc+PC9wYXRoPlxuXHRcdCAgICAgICAgPC9nPlxuXHRcdCAgICA8L2c+XG5cdFx0PC9zdmc+XCJcblx0YmF0dGVyeUxvdyA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0PHN2ZyB3aWR0aD0nMjVweCcgaGVpZ2h0PScxMHB4JyB2aWV3Qm94PScwIDAgMjUgMTAnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHQgICAgPHRpdGxlPkJhdHRlcnk8L3RpdGxlPlxuXHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHQgICAgPGRlZnM+PC9kZWZzPlxuXHRcdCAgICA8ZyBpZD0nU3ltYm9scycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdFx0ICAgICAgICA8ZyBpZD0nU3RhdHVzLUJhci9CbGFjay8yMCUnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0zNDUuMDAwMDAwLCAtNS4wMDAwMDApJyBmaWxsPScjMDMwMzAzJz5cblx0XHQgICAgICAgICAgICA8cGF0aCBkPSdNMzQ2LjQ5MzcxMyw1LjUgQzM0NS42Njg3NTgsNS41IDM0NSw2LjE2ODAyMTU1IDM0NSw3LjAwNTMwMzI0IEwzNDUsMTMuNDk0Njk2OCBDMzQ1LDE0LjMyNjA1MjggMzQ1LjY3MzM4LDE1IDM0Ni40OTM3MTMsMTUgTDM2Ni4wMDYyODcsMTUgQzM2Ni44MzEyNDIsMTUgMzY3LjUsMTQuMzMxOTc4NCAzNjcuNSwxMy40OTQ2OTY4IEwzNjcuNSw3LjAwNTMwMzI0IEMzNjcuNSw2LjE3Mzk0NzIyIDM2Ni44MjY2Miw1LjUgMzY2LjAwNjI4Nyw1LjUgTDM0Ni40OTM3MTMsNS41IEwzNDYuNDkzNzEzLDUuNSBaIE0zNjgsOC41IEwzNjgsMTIgTDM2OC43NSwxMiBDMzY5LjE2NDIxNCwxMiAzNjkuNSwxMS42NjQ0MDUzIDM2OS41LDExLjI1Nzc0IEwzNjkuNSw5LjI0MjI1OTk4IEMzNjkuNSw4LjgzMjMyMTExIDM2OS4xNjcxMDEsOC41IDM2OC43NSw4LjUgTDM2OCw4LjUgTDM2OCw4LjUgWiBNMzQ2LjUwODE1Miw2IEMzNDUuOTUxMzY1LDYgMzQ1LjUsNi40NTY5OTY5MiAzNDUuNSw3LjAwODQ0MDU1IEwzNDUuNSwxMy40OTE1NTk0IEMzNDUuNSwxNC4wNDg1MDU4IDM0NS45NDkwNTgsMTQuNSAzNDYuNTA4MTUyLDE0LjUgTDM2NS45OTE4NDgsMTQuNSBDMzY2LjU0ODYzNSwxNC41IDM2NywxNC4wNDMwMDMxIDM2NywxMy40OTE1NTk0IEwzNjcsNy4wMDg0NDA1NSBDMzY3LDYuNDUxNDk0MjIgMzY2LjU1MDk0Miw2IDM2NS45OTE4NDgsNiBMMzQ2LjUwODE1Miw2IFogTTM0Ni40OTA0NzksNi41IEMzNDYuMjE5NTk1LDYuNSAzNDYsNi43MTYzNzIwMSAzNDYsNi45OTIwOTU5NSBMMzQ2LDEzLjUwNzkwNDEgQzM0NiwxMy43Nzk2ODExIDM0Ni4yMTUwNTcsMTQgMzQ2LjQ5MDQ3OSwxNCBMMzUwLDE0IEwzNTAsNi41IEwzNDYuNDkwNDc5LDYuNSBaJyBpZD0nQmF0dGVyeSc+PC9wYXRoPlxuXHRcdCAgICAgICAgPC9nPlxuXHRcdCAgICA8L2c+XG5cdFx0PC9zdmc+XCJcblx0YmFubmVyQkcgOiB7XG5cdFx0XCJpcGhvbmUtNVwiOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMzIwcHgnIGhlaWdodD0nNjhweCcgdmlld0JveD0nMCAwIDMyMCA2OCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNi4xICgyNjMxMykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHQgICAgPHRpdGxlPmlwaG9uZTU8L3RpdGxlPlxuXHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0ICAgIDxkZWZzPjwvZGVmcz5cblx0XHRcdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBmaWxsLW9wYWNpdHk9JzAuOSc+XG5cdFx0XHQgICAgICAgIDxnIGlkPSdpUGhvbmUtNS81Uy81QycgZmlsbD0nIzFBMUExQyc+XG5cdFx0XHQgICAgICAgICAgICA8cGF0aCBkPSdNMCwwIEwzMjAsMCBMMzIwLDY4IEwwLDY4IEwwLDAgWiBNMTQyLDYxLjAwNDg4MTUgQzE0Miw1OS44OTc2MTYgMTQyLjg5NjI3OSw1OSAxNDQuMDAyNCw1OSBMMTc2Ljk5NzYsNTkgQzE3OC4xMDM0OTUsNTkgMTc5LDU5Ljg5Mzg5OTggMTc5LDYxLjAwNDg4MTUgTDE3OSw2MS45OTUxMTg1IEMxNzksNjMuMTAyMzg0IDE3OC4xMDM3MjEsNjQgMTc2Ljk5NzYsNjQgTDE0NC4wMDI0LDY0IEMxNDIuODk2NTA1LDY0IDE0Miw2My4xMDYxMDAyIDE0Miw2MS45OTUxMTg1IEwxNDIsNjEuMDA0ODgxNSBaJyBpZD0naXBob25lNSc+PC9wYXRoPlxuXHRcdFx0ICAgICAgICA8L2c+XG5cdFx0XHQgICAgPC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0XHRcImlwaG9uZS02c1wiOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0XHQ8c3ZnIHdpZHRoPSczNzVweCcgaGVpZ2h0PSc2OHB4JyB2aWV3Qm94PScwIDAgMzc1IDY4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42ICgyNjMwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdFx0PHRpdGxlPk5vdGlmaWNhdGlvbiBiYWNrZ3JvdW5kPC90aXRsZT5cblx0XHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgZmlsbC1vcGFjaXR5PScwLjknPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J2lPUzgtUHVzaC1Ob3RpZmljYXRpb24nIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC01OC4wMDAwMDAsIC0yMy4wMDAwMDApJyBmaWxsPScjMUExQTFDJz5cblx0XHRcdFx0XHRcdFx0PGcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNTguMDAwMDAwLCA3LjAwMDAwMCknIGlkPSdOb3RpZmljYXRpb24tY29udGFpbmVyJz5cblx0XHRcdFx0XHRcdFx0XHQ8Zz5cblx0XHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00wLDE2IEwzNzUsMTYgTDM3NSw4NCBMMCw4NCBMMCwxNiBaIE0xNjksNzcuMDA0ODgxNSBDMTY5LDc1Ljg5NzYxNiAxNjkuODk2Mjc5LDc1IDE3MS4wMDI0LDc1IEwyMDMuOTk3Niw3NSBDMjA1LjEwMzQ5NSw3NSAyMDYsNzUuODkzODk5OCAyMDYsNzcuMDA0ODgxNSBMMjA2LDc3Ljk5NTExODUgQzIwNiw3OS4xMDIzODQgMjA1LjEwMzcyMSw4MCAyMDMuOTk3Niw4MCBMMTcxLjAwMjQsODAgQzE2OS44OTY1MDUsODAgMTY5LDc5LjEwNjEwMDIgMTY5LDc3Ljk5NTExODUgTDE2OSw3Ny4wMDQ4ODE1IFonIGlkPSdOb3RpZmljYXRpb24tYmFja2dyb3VuZCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9zdmc+XCJcblx0XHRcImlwaG9uZS02cy1wbHVzXCIgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0XHQ8c3ZnIHdpZHRoPSc0MTRweCcgaGVpZ2h0PSc2OHB4JyB2aWV3Qm94PScwIDAgNDE0IDY4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNiAoMjYzMDQpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+Tm90aWZpY2F0aW9uIGJhY2tncm91bmQgQ29weTwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGZpbGwtb3BhY2l0eT0nMC45Jz5cblx0XHRcdFx0XHQ8ZyBpZD0naU9TOC1QdXNoLU5vdGlmaWNhdGlvbicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTQzLjAwMDAwMCwgLTc0LjAwMDAwMCknIGZpbGw9JyMxQTFBMUMnPlxuXHRcdFx0XHRcdFx0PGcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNDMuMDAwMDAwLCA3NC4wMDAwMDApJyBpZD0nTm90aWZpY2F0aW9uLWNvbnRhaW5lcic+XG5cdFx0XHRcdFx0XHRcdDxnPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00wLDAgTDQxNCwwIEw0MTQsNjggTDAsNjggTDAsMCBaIE0xODksNjEuMDA0ODgxNSBDMTg5LDU5Ljg5NzYxNiAxODkuODk2Mjc5LDU5IDE5MS4wMDI0LDU5IEwyMjMuOTk3Niw1OSBDMjI1LjEwMzQ5NSw1OSAyMjYsNTkuODkzODk5OCAyMjYsNjEuMDA0ODgxNSBMMjI2LDYxLjk5NTExODUgQzIyNiw2My4xMDIzODQgMjI1LjEwMzcyMSw2NCAyMjMuOTk3Niw2NCBMMTkxLjAwMjQsNjQgQzE4OS44OTY1MDUsNjQgMTg5LDYzLjEwNjEwMDIgMTg5LDYxLjk5NTExODUgTDE4OSw2MS4wMDQ4ODE1IFonIGlkPSdOb3RpZmljYXRpb24tYmFja2dyb3VuZC1Db3B5Jz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdFx0XCJpcGFkXCIgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0XHQ8c3ZnIHdpZHRoPSc3NjhweCcgaGVpZ2h0PSc2OHB4JyB2aWV3Qm94PScwIDAgNzY4IDY4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQgICAgPHRpdGxlPmlwYWQtcG9ydHJhaXQ8L3RpdGxlPlxuXHRcdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdCAgICA8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBmaWxsLW9wYWNpdHk9JzAuOSc+XG5cdFx0XHRcdCAgICAgICAgPGcgaWQ9J2lQYWQtUG9ydHJhaXQnIGZpbGw9JyMxQTFBMUMnPlxuXHRcdFx0XHQgICAgICAgICAgICA8cGF0aCBkPSdNMCwwIEw3NjgsMCBMNzY4LDY4IEwwLDY4IEwwLDAgWiBNMzY2LDYxLjAwNDg4MTUgQzM2Niw1OS44OTc2MTYgMzY2Ljg5NjI3OSw1OSAzNjguMDAyNCw1OSBMNDAwLjk5NzYsNTkgQzQwMi4xMDM0OTUsNTkgNDAzLDU5Ljg5Mzg5OTggNDAzLDYxLjAwNDg4MTUgTDQwMyw2MS45OTUxMTg1IEM0MDMsNjMuMTAyMzg0IDQwMi4xMDM3MjEsNjQgNDAwLjk5NzYsNjQgTDM2OC4wMDI0LDY0IEMzNjYuODk2NTA1LDY0IDM2Niw2My4xMDYxMDAyIDM2Niw2MS45OTUxMTg1IEwzNjYsNjEuMDA0ODgxNSBaJyBpZD0naXBhZC1wb3J0cmFpdCc+PC9wYXRoPlxuXHRcdFx0XHQgICAgICAgIDwvZz5cblx0XHRcdFx0ICAgIDwvZz5cblx0XHRcdFx0PC9zdmc+XCJcblx0XHRcImlwYWQtcHJvXCIgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0XHQ8c3ZnIHdpZHRoPScxMDI0cHgnIGhlaWdodD0nNjhweCcgdmlld0JveD0nMCAwIDEwMjQgNjgnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNi4xICgyNjMxMykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdCAgICA8dGl0bGU+aXBhZC1wcm8tcG9ydHJhaXQ8L3RpdGxlPlxuXHRcdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdCAgICA8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBmaWxsLW9wYWNpdHk9JzAuOSc+XG5cdFx0XHRcdCAgICAgICAgPGcgaWQ9J2lQYWQtUHJvLVBvcnRyYWl0JyBmaWxsPScjMUExQTFDJz5cblx0XHRcdFx0ICAgICAgICAgICAgPHBhdGggZD0nTTAsMCBMMTAyNCwwIEwxMDI0LDY4IEwwLDY4IEwwLDAgWiBNNDk0LDYxLjAwNDg4MTUgQzQ5NCw1OS44OTc2MTYgNDk0Ljg5NjI3OSw1OSA0OTYuMDAyNCw1OSBMNTI4Ljk5NzYsNTkgQzUzMC4xMDM0OTUsNTkgNTMxLDU5Ljg5Mzg5OTggNTMxLDYxLjAwNDg4MTUgTDUzMSw2MS45OTUxMTg1IEM1MzEsNjMuMTAyMzg0IDUzMC4xMDM3MjEsNjQgNTI4Ljk5NzYsNjQgTDQ5Ni4wMDI0LDY0IEM0OTQuODk2NTA1LDY0IDQ5NCw2My4xMDYxMDAyIDQ5NCw2MS45OTUxMTg1IEw0OTQsNjEuMDA0ODgxNSBaJyBpZD0naXBhZC1wcm8tcG9ydHJhaXQnPjwvcGF0aD5cblx0XHRcdFx0ICAgICAgICA8L2c+XG5cdFx0XHRcdCAgICA8L2c+XG5cdFx0XHRcdDwvc3ZnPlwiXG5cdH1cblx0ZW1vamlDb2RlczogW1wiOTggODBcIiwgXCI5OCBBQ1wiLCBcIjk4IDgxXCIsIFwiOTggODJcIiwgXCI5OCA4M1wiLCBcIjk4IDg0XCIsIFwiOTggODVcIiwgXCI5OCA4NlwiLCBcIjk4IDg3XCIsIFwiOTggODlcIiwgXCI5OCA4YVwiLCBcIjk5IDgyXCIsIFwiOTkgODNcIiwgXCJFMiA5OCBCQSBFRiBCOCA4RlwiLCBcIjk4IDhCXCIgLCBcIjk4IDhDXCIsIFwiOTggOERcIiwgXCI5OCA5OFwiLCBcIjk4IDk3XCIsIFwiOTggOTlcIiwgXCI5OCA5QVwiLCBcIjk4IDlDXCIsIFwiOTggOURcIiwgXCI5OCA5QlwiLCBcIkE0IDkxXCIsIFwiQTQgOTNcIiwgXCI5OCA4RVwiLCBcIkE0IDk3XCIsIFwiOTggOEZcIiwgXCI5OCBCNlwiLCBcIjk4IDkwXCIsIFwiOTggOTFcIiwgXCI5OCA5MlwiLCBcIjk5IDg0XCIsIFwiQTQgOTRcIiwgXCI5OCBCM1wiLCBcIjk4IDlFXCIsIFwiOTggOUZcIiwgXCI5OCBBMFwiLCBcIjk4IEExXCIsIFwiOTggOTRcIiwgXCI5OCA5NVwiLCBcIjk5IDgxXCIsIFwiRTIgOTggQjkgRUYgQjggOEZcIiwgXCI5OCBBM1wiLCBcIjk4IDk2XCIsIFwiOTggQUJcIiwgXCI5OCBBOVwiLCBcIjk4IEE0XCIsIFwiOTggQUVcIiwgXCI5OCBCMVwiLCBcIjk4IEE4XCIsIFwiOTggQjBcIiwgXCI5OCBBRlwiLCBcIjk4IEE2XCIsIFwiOTggQTdcIiwgXCI5OCBBMlwiLCBcIjk4IEE1XCIsIFwiOTggQUFcIiwgXCI5OCA5M1wiLCBcIjk4IEFEXCIsIFwiOTggQjVcIiwgXCI5OCBCMlwiLCBcIkE0IDkwXCIsIFwiOTggQjdcIiwgXCJBNCA5MlwiLCBcIkE0IDk1XCIsIFwiOTggQjRcIiwgXCI5MiBBNFwiLCBcIjkyIEE5XCIsIFwiOTggODhcIiwgXCI5MSBCRlwiLCBcIjkxIEI5XCIsIFwiOTEgQkFcIiwgXCI5MiA4MFwiLCBcIjkxIEJCXCIsIFwiOTEgQkRcIiwgXCJBNCA5NlwiLCBcIjk4IEJBXCIsIFwiOTggQjhcIiwgXCI5OCBCOVwiLCBcIjk4IEJCXCIsIFwiOTggQkNcIiwgXCI5OCBCRFwiLCBcIjk5IDgwXCIsIFwiOTggQkZcIiwgXCI5OCBCRVwiLCBcIjk5IDhDXCIsIFwiOTEgOEZcIiwgXCI5MSA4QlwiLCBcIjkxIDhEXCIsIFwiOTEgOEVcIiwgXCI5MSA4QVwiLCBcIkUyIDlDIDhBXCIsIFwiRTIgOUMgOEMgRUYgQjggOEZcIiwgXCI5MSA4Q1wiLCBcIkUyIDlDIDhCXCIsIFwiOTEgOTBcIiwgXCI5MiBBQVwiLCBcIjk5IDhGXCIsIFwiRTIgOTggOUQgRUYgQjggOEZcIiwgXCI5MSA4NlwiLCBcIjkxIDg3XCIsIFwiOTEgODhcIiwgXCI5MSA4OVwiLCBcIjk2IDk1XCIsIFwiOTYgOTBcIiwgXCJBNCA5OFwiLCBcIjk2IDk2XCIsIFwiRTIgOUMgOEQgRUYgQjggOEZcIiwgXCI5MiA4NVwiLCBcIjkxIDg0XCIsIFwiOTEgODVcIiwgXCI5MSA4MlwiLCBcIjkxIDgzXCIsIFwiOTEgODFcIiwgXCI5MSA4MFwiLCBcIjkxIEE0XCIsIFwiOTEgQTVcIiwgXCI5NyBBM1wiLCBcIjkxIEI2XCIsIFwiOTEgQTZcIiwgXCI5MSBBN1wiLCBcIjkxIEE4XCIsIFwiOTEgQTlcIiwgXCI5MSBCMVwiLCBcIjkxIEI0XCIsIFwiOTEgQjVcIiwgXCI5MSBCMlwiLCBcIjkxIEIzXCIsIFwiOTEgQUVcIiwgXCI5MSBCN1wiLCBcIjkyIDgyXCIsIFwiOTUgQjVcIiwgXCI4RSA4NVwiLCBcIjkxIEJDXCIsIFwiOTEgQjhcIiwgXCI5MSBCMFwiLCBcIjlBIEI2XCIsIFwiOEYgODNcIiwgXCI5MiA4M1wiLCBcIjkxIEFGXCIsIFwiOTEgQUJcIiwgXCI5MSBBQ1wiLCBcIjkxIEFEXCIsIFwiOTkgODdcIiwgXCI5MiA4MVwiLCBcIjk5IDg1XCIsIFwiOTkgODZcIiwgXCI5OSA4QlwiLCBcIjk5IDhFXCIsIFwiOTkgOERcIiwgXCI5MiA4N1wiLCBcIjkyIDg2XCIsIFwiOTIgOTFcIiwgXCI5MSBBOSBFMiA4MCA4RCBFMiA5RCBBNCBFRiBCOCA4RiBFMiA4MCA4RCBGMCA5RiA5MSBBOVwiLCBcIjkxIEE4IEUyIDgwIDhEIEUyIDlEIEE0IEVGIEI4IDhGIEUyIDgwIDhEIEYwIDlGIDkxIEE4XCIsIFwiOTIgOEZcIiwgXCI5MSBBOSBFMiA4MCA4RCBFMiA5RCBBNCBFRiBCOCA4RiBFMiA4MCA4RCBGMCA5RiA5MiA4QiBFMiA4MCA4RCBGMCA5RiA5MSBBOVwiLCBcIjkxIEE4IEUyIDgwIDhEIEUyIDlEIEE0IEVGIEI4IDhGIEUyIDgwIDhEIEYwIDlGIDkyIDhCIEUyIDgwIDhEIEYwIDlGIDkxIEE4XCIsIFwiOTEgQUFcIiwgXCI5MSBBOCBFMiA4MCA4RCBGMCA5RiA5MSBBOSBFMiA4MCA4RCBGMCA5RiA5MSBBN1wiLCBcIjkxIEE4IEUyIDgwIDhEIEYwIDlGIDkxIEE5IEUyIDgwIDhEIEYwIDlGIDkxIEE3IEUyIDgwIDhEIEYwIDlGIDkxIEE2XCIsIFwiOTEgQTggRTIgODAgOEQgRjAgOUYgOTEgQTkgRTIgODAgOEQgRjAgOUYgOTEgQTYgRTIgODAgOEQgRjAgOUYgOTEgQTZcIiwgXCI5MSBBOCBFMiA4MCA4RCBGMCA5RiA5MSBBOSBFMiA4MCA4RCBGMCA5RiA5MSBBNyBFMiA4MCA4RCBGMCA5RiA5MSBBN1wiLCBcIjkxIEE5IEUyIDgwIDhEIEYwIDlGIDkxIEE5IEUyIDgwIDhEIEYwIDlGIDkxIEE2XCIsIFwiOTEgQTkgRTIgODAgOEQgRjAgOUYgOTEgQTkgRTIgODAgOEQgRjAgOUYgOTEgQTdcIiwgXCI5MSBBOSBFMiA4MCA4RCBGMCA5RiA5MSBBOSBFMiA4MCA4RCBGMCA5RiA5MSBBNyBFMiA4MCA4RCBGMCA5RiA5MSBBNlwiLCBcIjkxIEE5IEUyIDgwIDhEIEYwIDlGIDkxIEE5IEUyIDgwIDhEIEYwIDlGIDkxIEE2IEUyIDgwIDhEIEYwIDlGIDkxIEE2XCIsIFwiOTEgQTkgRTIgODAgOEQgRjAgOUYgOTEgQTkgRTIgODAgOEQgRjAgOUYgOTEgQTcgRTIgODAgOEQgRjAgOUYgOTEgQTdcIiwgXCI5MSBBOCBFMiA4MCA4RCBGMCA5RiA5MSBBOCBFMiA4MCA4RCBGMCA5RiA5MSBBNlwiLCBcIjkxIEE4IEUyIDgwIDhEIEYwIDlGIDkxIEE4IEUyIDgwIDhEIEYwIDlGIDkxIEE3XCIsIFwiOTEgQTggRTIgODAgOEQgRjAgOUYgOTEgQTggRTIgODAgOEQgRjAgOUYgOTEgQTcgRTIgODAgOEQgRjAgOUYgOTEgQTZcIiwgXCI5MSBBOCBFMiA4MCA4RCBGMCA5RiA5MSBBOCBFMiA4MCA4RCBGMCA5RiA5MSBBNiBFMiA4MCA4RCBGMCA5RiA5MSBBNlwiLCBcIjkxIEE4IEUyIDgwIDhEIEYwIDlGIDkxIEE4IEUyIDgwIDhEIEYwIDlGIDkxIEE3IEUyIDgwIDhEIEYwIDlGIDkxIEE3XCIsIFwiOTEgOUFcIiwgXCI5MSA5NVwiLCBcIjkxIDk2XCIsIFwiOTEgOTRcIiwgXCI5MSA5N1wiLCBcIjkxIDk5XCIsIFwiOTEgOThcIiwgXCI5MiA4NFwiLCBcIjkyIDhCXCIsIFwiOTEgQTNcIiwgXCI5MSBBMFwiLCBcIjkxIEExXCIsIFwiOTEgQTJcIiwgXCI5MSA5RVwiLCBcIjkxIDlGXCIsIFwiOTEgOTJcIiwgXCI4RSBBOVwiLCBcIkUyIDlCIDkxXCIsIFwiOEUgOTNcIiwgXCI5MSA5MVwiLCBcIjhFIDkyXCIsIFwiOTEgOURcIiwgXCI5MSA5QlwiLCBcIjkxIDlDXCIsIFwiOTIgQkNcIiwgXCI5MSA5M1wiLCBcIjk1IEI2XCIsIFwiOTIgOERcIiwgXCI4QyA4MlwiLCBcIjlCIDkxXCIsIFwiOTAgQjZcIiwgXCI5MCBCMVwiLCBcIjkwIEFEXCIsIFwiOTAgQjlcIiwgXCI5MCBCMFwiLCBcIjkwIEJCXCIsIFwiOTAgQkNcIiwgXCI5MCBBOFwiLCBcIjkwIEFGXCIsIFwiQTYgODFcIiwgXCI5MCBBRVwiLCBcIjkwIEI3XCIsIFwiOTAgQkRcIiwgXCI5MCBCOFwiLCBcIjkwIDk5XCIsIFwiOTAgQjVcIiwgXCI5OSA4OFwiLCBcIjk5IDg5XCIsIFwiOTkgOEFcIiwgXCI5MCA5MlwiLCBcIjkwIDk0XCIsIFwiOTAgQTdcIiwgXCI5MCBBNlwiLCBcIjkwIEE0XCIsIFwiOTAgQTNcIiwgXCI5MCBBNVwiLCBcIjkwIEJBXCIsIFwiOTAgOTdcIiwgXCI5MCBCNFwiLCBcIkE2IDg0XCIsIFwiOTAgOURcIiwgXCI5MCA5QlwiLCBcIjkwIDhDXCIsIFwiOTAgOUVcIiwgXCI5MCA5Q1wiLCBcIjk1IEI3XCIsIFwiQTYgODJcIiwgXCJBNiA4MFwiLCBcIjkwIDhEXCIsIFwiOTAgQTJcIiwgXCI5MCBBMFwiLCBcIjkwIDlGXCIsIFwiOTAgQTFcIiwgXCI5MCBBQ1wiLCBcIjkwIEIzXCIsIFwiOTAgOEJcIiwgXCI5MCA4QVwiLCBcIjkwIDg2XCIsIFwiOTAgODVcIiwgXCI5MCA4M1wiLCBcIjkwIDgyXCIsIFwiOTAgODRcIiwgXCI5MCBBQVwiLCBcIjkwIEFCXCIsIFwiOTAgOThcIiwgXCI5MCA5MFwiLCBcIjkwIDhGXCIsIFwiOTAgOTFcIiwgXCI5MCA4RVwiLCBcIjkwIDk2XCIsIFwiOTAgODBcIiwgXCI5MCA4MVwiLCBcIjkwIDkzXCIsIFwiQTYgODNcIiwgXCI5NSA4QVwiLCBcIjkwIDk1XCIsIFwiOTAgQTlcIiwgXCI5MCA4OFwiLCBcIjkwIDg3XCIsIFwiOTAgQkZcIiwgXCI5MCBCRVwiLCBcIjkwIDg5XCIsIFwiOTAgQjJcIiwgXCI4QyBCNVwiLCBcIjhFIDg0XCIsIFwiOEMgQjJcIiwgXCI4QyBCM1wiLCBcIjhDIEI0XCIsIFwiOEMgQjFcIiwgXCI4QyBCRlwiLCBcIkUyIDk4IDk4XCIsIFwiOEQgODBcIiwgXCI4RSA4RFwiLCBcIjhFIDhCXCIsIFwiOEQgODNcIiwgXCI4RCA4MlwiLCBcIjhEIDgxXCIsIFwiOEMgQkVcIiwgXCI4QyBCQVwiLCBcIjhDIEJBXCIsIFwiOEMgQkJcIiwgXCI4QyBCOVwiLCBcIjhDIEI3XCIsIFwiOEMgQkNcIiwgXCI4QyBCOFwiLCBcIjkyIDkwXCIsIFwiOEQgODRcIiwgXCI4QyBCMFwiLCBcIjhFIDgzXCIsIFwiOTAgOUFcIiwgXCI5NSBCOFwiLCBcIjhDIDhFXCIsIFwiOEMgOERcIiwgXCI4QyA4RlwiLCBcIjhDIDk1XCIsIFwiOEMgOTZcIiwgXCI4QyA5N1wiLCBcIjhDIDk4XCIsIFwiOEMgOTFcIiwgXCI4QyA5MlwiLCBcIjhDIDkzXCIsIFwiOEMgOTRcIiwgXCI4QyA5QVwiLCBcIjhDIDlEXCIsIFwiOEMgOUJcIiwgXCI4QyA5Q1wiLCBcIjhDIDlFXCIsIFwiOEMgOTlcIiwgXCJFMiBBRCA5MCBFRiBCOCA4RlwiLCBcIjhDIDlGXCIsIFwiOTIgQUJcIiwgXCJFMiA5QyBBOFwiLCBcIkUyIDk4IDg0IEVGIEI4IDhGXCIsIFwiRTIgOTggODAgRUYgQjggOEZcIiwgXCI4QyBBNFwiLCBcIkUyIDlCIDg1IEVGIEI4IDhGXCIsIFwiOEMgQTVcIiwgXCI4QyBBNlwiLCBcIkUyIDk4IDgxIEVGIEI4IDhGXCIsIFwiOEMgQTdcIiwgXCJFMiA5QiA4OFwiLCBcIjhDIEE5XCIsIFwiRTIgOUEgQTEgRUYgQjggOEZcIiwgXCI5NCBBNVwiLCBcIjkyIEE1XCIsIFwiRTIgOUQgODQgRUYgQjggOEZcIiwgXCI4QyBBOFwiLCBcIkUyIDk4IDgzIEVGIEI4IDhGXCIsIFwiRTIgOUIgODQgRUYgQjggOEZcIiwgXCI4QyBBQ1wiLCBcIjkyIEE4XCIsIFwiOEMgQUFcIiwgXCI4QyBBQlwiLCBcIkUyIDk4IDgyIEVGIEI4IDhGXCIsIFwiRTIgOTggOTQgRUYgQjggOEZcIiwgXCI5MiBBN1wiLCBcIjkyIEE2XCIsIFwiOEMgOEFcIiwgXCI5QiA5MVwiLCBcIjlCIDkxXCIsIFwiOEQgOEZcIiwgXCI4RCA4RVwiLCBcIjhEIDkwXCIsIFwiOEQgOEFcIiwgXCI4RCA4QlwiLCBcIjhEIDhDXCIsIFwiOEQgODlcIiwgXCI4RCA4N1wiLCBcIjhEIDkzXCIsIFwiOEQgODhcIiwgXCI4RCA5MlwiLCBcIjhEIDkxXCIsIFwiOEQgOERcIiwgXCI4RCA4NVwiLCBcIjhEIDg2XCIsIFwiOEMgQjZcIiwgXCI4QyBCRFwiLCBcIjhEIEEwXCIsIFwiOEQgQUZcIiwgXCI4RCA5RVwiLCBcIkE3IDgwXCIsIFwiOEQgOTdcIiwgXCI4RCA5NlwiLCBcIjhEIEE0XCIsIFwiOEQgQjNcIiwgXCI4RCA5NFwiLCBcIjhEIDlGXCIsIFwiOEMgQURcIiwgXCI4RCA5NVwiLCBcIjhEIDlEXCIsIFwiOEMgQUVcIiwgXCI4QyBBRlwiLCBcIjhEIDlDXCIsIFwiOEQgQjJcIiwgXCI4RCBBNVwiLCBcIjhEIEEzXCIsIFwiOEQgQjFcIiwgXCI4RCA5QlwiLCBcIjhEIDk5XCIsIFwiOEQgOUFcIiwgXCI4RCA5OFwiLCBcIjhEIEEyXCIsIFwiOEQgQTFcIiwgXCI4RCBBN1wiLCBcIjhEIEE4XCIsIFwiOEQgQTZcIiwgXCI4RCBCMFwiLCBcIjhFIDgyXCIsIFwiOEQgQUVcIiwgXCI4RCBBQ1wiLCBcIjhEIEFEXCIsIFwiOEQgQUJcIiwgXCI4RCBCRlwiLCBcIjhEIEE5XCIsIFwiOEQgQUFcIiwgXCI4RCBCQVwiLCBcIjhEIEJCXCIsIFwiOEQgQjdcIiwgXCI4RCBCOFwiLCBcIjhEIEI5XCIsIFwiOEQgQkVcIiwgXCI4RCBCNlwiLCBcIjhEIEI1XCIsIFwiRTIgOTggOTUgRUYgQjggOEZcIiwgXCI4RCBCQ1wiLCBcIjhEIEI0XCIsIFwiOEQgQkRcIixcIjlCIDkxXCIsIFwiOUIgOTFcIiwgXCI5QiA5MVwiLCBcIkUyIDlBIEJEIEVGIEI4IDhGXCIsIFwiOEYgODBcIiwgXCI4RiA4OFwiLCBcIkUyIDlBIEJFIEVGIEI4IDhGXCIsIFwiOEUgQkVcIiwgXCI4RiA5MFwiLCBcIjhGIDg5XCIsIFwiOEUgQjFcIiwgXCJFMiA5QiBCMyBFRiBCOCA4RlwiLCBcIjhGIDhDXCIsIFwiOEYgOTNcIiwgXCI4RiBCOFwiLCBcIjhGIDkyXCIsIFwiOEYgOTFcIiwgXCI4RiA4RlwiLCBcIjhFIEJGXCIsIFwiRTIgOUIgQjdcIiwgXCI4RiA4MlwiLCBcIkUyIDlCIEI4XCIsIFwiOEYgQjlcIiwgXCI4RSBBM1wiLCBcIjlBIEEzXCIsIFwiOEYgOEFcIiwgXCI4RiA4NFwiLCBcIjlCIDgwXCIsIFwiRTIgOUIgQjlcIiwgXCI4RiA4QlwiLCBcIjlBIEI0XCIsIFwiOUEgQjVcIiwgXCI4RiA4N1wiLCBcIjk1IEI0XCIsIFwiOEYgODZcIiwgXCI4RSBCRFwiLCBcIjhGIDg1XCIsIFwiOEUgOTZcIiwgXCI4RSA5N1wiLCBcIjhGIEI1XCIsIFwiOEUgQUJcIiwgXCI4RSA5RlwiLCBcIjhFIEFEXCIsIFwiOEUgQThcIiwgXCI4RSBBQVwiLCBcIjhFIEE0XCIsIFwiOEUgQTdcIiwgXCI4RSBCQ1wiLCBcIjhFIEI5XCIsIFwiOEUgQjdcIiwgXCI4RSBCQVwiLCBcIjhFIEI4XCIsIFwiOEUgQkJcIiwgXCI4RSBBQ1wiLCBcIjhFIEFFXCIsIFwiOTEgQkVcIiwgXCI4RSBBRlwiLCBcIjhFIEIyXCIsIFwiOEUgQjBcIiwgXCI4RSBCM1wiLCBcIjlCIDkxXCIsIFwiOUIgOTFcIiwgXCI5QiA5MVwiLCBcIjlBIDk3XCIsIFwiOUEgOTVcIiwgXCI5QSA5OVwiLCBcIjlBIDhDXCIsIFwiOUEgOEVcIiwgXCI4RiA4RVwiLCBcIjlBIDkzXCIsIFwiOUEgOTFcIiwgXCI5QSA5MlwiLCBcIjlBIDkwXCIsIFwiOUEgOUFcIiwgXCI5QSA5QlwiLCBcIjlBIDlDXCIsXCI4RiA4RFwiLCBcIjlBIEIyXCIsIFwiOUEgQThcIiwgXCI5QSA5NFwiLCBcIjlBIDhEXCIsIFwiOUEgOThcIiwgXCI5QSA5NlwiLCBcIjlBIEExXCIsIFwiOUEgQTBcIiwgXCI5QSBBRlwiLCBcIjlBIDgzXCIsIFwiOUEgOEJcIiwgXCI5QSA5RFwiLCBcIjlBIDg0XCIsIFwiOUEgODVcIiwgXCI5QSA4OFwiLCBcIjlBIDlFXCIsIFwiOUEgODJcIiwgXCI5QSA4NlwiLCBcIjlBIDg3XCIsIFwiOUEgOEFcIiwgXCI5QSA4OVwiLCBcIjlBIDgxXCIsIFwiOUIgQTlcIiwgXCJFMiA5QyA4OCBFRiBCOCA4RlwiLCBcIjlCIEFCXCIsIFwiOUIgQUNcIiwgXCJFMiA5QiBCNSBFRiBCOCA4RlwiLCBcIjlCIEE1XCIsIFwiOUEgQTRcIiwgXCJFMiA5QiBCNFwiLCBcIjlCIEIzXCIsIFwiOUEgODBcIiwgXCI5QiBCMFwiLCBcIjkyIEJBXCIsIFwiRTIgOUEgOTMgRUYgQjggOEZcIiwgXCI5QSBBN1wiLCBcIkUyIDlCIEJEIEVGIEI4IDhGXCIsIFwiOUEgOEZcIiwgXCI5QSBBNlwiLCBcIjlBIEE1XCIsIFwiOEYgODFcIiwgXCI5QSBBMlwiLCBcIjhFIEExXCIsIFwiOEUgQTJcIiwgXCI4RSBBMFwiLCBcIjhGIDk3XCIsIFwiOEMgODFcIiwgXCI5NyBCQ1wiLCBcIjhGIEFEXCIsIFwiRTIgOUIgQjIgRUYgQjggOEZcIiwgXCI4RSA5MVwiLCBcIkUyIDlCIEIwXCIsIFwiOEYgOTRcIiwgXCI5NyBCQlwiLCBcIjhDIDhCXCIsIFwiOTcgQkVcIiwgXCI4RiA5NVwiLCBcIkUyIDlCIEJBIEVGIEI4IDhGXCIsIFwiOEYgOUVcIiwgXCI5QiBBM1wiLCBcIjlCIEE0XCIsIFwiOEMgODVcIiwgXCI4QyA4NFwiLCBcIjhGIDlDXCIsIFwiOEYgOTZcIiwgXCI4RiA5RFwiLCBcIjhDIDg3XCIsIFwiOEMgODZcIiwgXCI4RiA5OVwiLCBcIjhDIDgzXCIsIFwiOEMgODlcIiwgXCI4QyA4Q1wiLCBcIjhDIEEwXCIsIFwiOEUgODdcIiwgXCI4RSA4NlwiLCBcIjhDIDg4XCIsIFwiOEYgOThcIiwgXCI4RiBCMFwiLCBcIjhGIEFGXCIsIFwiOEYgOUZcIiwgXCI5NyBCRFwiLCBcIjhGIEEwXCIsIFwiOEYgQTFcIiwgXCI4RiA5QVwiLCBcIjhGIEEyXCIsIFwiOEYgQUNcIiwgXCI4RiBBM1wiLCBcIjhGIEE0XCIsIFwiOEYgQTVcIiwgXCI4RiBBNlwiLCBcIjhGIEE4XCIsIFwiOEYgQUFcIiwgXCI4RiBBQlwiLCBcIjhGIEE5XCIsIFwiOTIgOTJcIiwgXCI4RiA5QlwiLCBcIkUyIDlCIEFBIEVGIEI4IDhGXCIsIFwiOTUgOENcIiwgXCI5NSA4RFwiLCBcIjk1IDhCXCIsIFwiRTIgOUIgQTlcIiwgXCJFMiA4QyA5QSBFRiBCOCA4RlwiLCBcIjkzIEIxXCIsIFwiOTMgQjJcIiwgXCI5MiBCQlwiLCBcIkUyIDhDIEE4IEVGIEI4IDhGXCIsIFwiOTYgQTVcIiwgXCI5NiBBOFwiLCBcIjk2IEIxXCIsIFwiOTYgQjJcIiwgXCI5NSBCOVwiLCBcIjk3IDlDXCIsIFwiOTIgQkRcIiwgXCI5MiBCRVwiLCBcIjkyIEJGXCIsIFwiOTMgODBcIiwgXCI5MyBCQ1wiLCBcIjkzIEI3XCIsIFwiOTMgQjhcIiwgXCI5MyBCOVwiLCBcIjhFIEE1XCIsIFwiOTMgQkRcIiwgXCI4RSA5RVwiLCBcIjkzIDlFXCIsIFwiRTIgOTggOEUgRUYgQjggOEZcIiwgXCI5MyA5RlwiLCBcIjkzIEEwXCIsIFwiOTMgQkFcIiwgXCI5MyBCQlwiLCBcIjhFIDk5XCIsIFwiOEUgOUFcIiwgXCI4RSA5QlwiLCBcIkUyIDhGIEIxXCIsIFwiRTIgOEYgQjJcIiwgXCJFMiA4RiBCMFwiLCBcIjk1IEIwXCIsIFwiRTIgOEYgQjNcIiwgXCJFMiA4QyA5QiBFRiBCOCA4RlwiLCBcIjkzIEExXCIsIFwiOTQgOEJcIiwgXCI5NCA4Q1wiLCBcIjkyIEExXCIsIFwiOTQgQTZcIiwgXCI5NSBBRlwiLCBcIjk3IDkxXCIsIFwiOUIgQTJcIiwgXCI5MiBCOFwiLCBcIjkyIEI1XCIsIFwiOTIgQjRcIiwgXCI5MiBCNlwiLCBcIjkyIEI3XCIsIFwiOTIgQjBcIiwgXCI5MiBCM1wiLCBcIjkyIDhFXCIsIFwiRTIgOUEgOTZcIiwgXCI5NCBBN1wiLCBcIjk0IEE4XCIsIFwiRTIgOUEgOTJcIiwgXCI5QiBBMFwiLCBcIkUyIDlCIDhGXCIsIFwiOTQgQTlcIiwgXCJFMiA5QSA5OVwiLCBcIkUyIDlCIDkzXCIsIFwiOTQgQUJcIiwgXCI5MiBBM1wiLCBcIjk0IEFBXCIsIFwiOTcgQTFcIiwgXCJFMiA5QSA5NFwiLCBcIjlCIEExXCIsIFwiOUEgQUNcIiwgXCJFMiA5OCBBMCBFRiBCOCA4RlwiLCBcIkUyIDlBIEIwXCIsIFwiRTIgOUEgQjFcIiwgXCI4RiBCQVwiLCBcIjk0IEFFXCIsIFwiOTMgQkZcIiwgXCI5MiA4OFwiLCBcIkUyIDlBIDk3XCIsIFwiOTQgQURcIiwgXCI5NCBBQ1wiLCBcIjk1IEIzXCIsIFwiOTIgOEFcIiwgXCI5MiA4OVwiLCBcIjhDIEExXCIsIFwiOEYgQjdcIiwgXCI5NCA5NlwiLCBcIjlBIEJEXCIsIFwiOUEgQkZcIiwgXCI5QiA4MVwiLCBcIjk0IDkxXCIsIFwiOTcgOURcIiwgXCI5QiA4QlwiLCBcIjlCIDhDXCIsIFwiOUIgOEZcIiwgXCI5QSBBQVwiLCBcIjlCIDhFXCIsIFwiOTYgQkNcIiwgXCI5NyBCQVwiLCBcIkUyIDlCIEIxXCIsIFwiOTcgQkZcIiwgXCI5QiA4RFwiLCBcIjhFIDg4XCIsIFwiOEUgOEZcIiwgXCI4RSA4MFwiLCBcIjhFIDgxXCIsIFwiOEUgOEFcIiwgXCI4RSA4OVwiLCBcIjhFIDhFXCIsIFwiOEUgOTBcIiwgXCI4RSA4Q1wiLCBcIjhGIEFFXCIsIFwiRTIgOUMgODkgRUYgQjggOEZcIiwgXCI5MyBBOVwiLCBcIjkzIEE4XCIsIFwiOTMgQTdcIiwgXCI5MiA4Q1wiLCBcIjkzIEFFXCIsIFwiOTMgQUFcIiwgXCI5MyBBQlwiLCBcIjkzIEFDXCIsIFwiOTMgQURcIiwgXCI5MyBBNlwiLCBcIjkzIEFGXCIsIFwiOTMgQTVcIiwgXCI5MyBBNFwiLCBcIjkzIDlDXCIsIFwiOTMgODNcIiwgXCI5MyA5MVwiLCBcIjkzIDhBXCIsIFwiOTMgODhcIiwgXCI5MyA4OVwiLCBcIjkzIDg0XCIsIFwiOTMgODVcIiwgXCI5MyA4NlwiLCBcIjk3IDkzXCIsIFwiOTMgODdcIiwgXCI5NyA4M1wiLCBcIjk3IEIzXCIsIFwiOTcgODRcIiwgXCI5MyA4QlwiLCBcIjk3IDkyXCIsIFwiOTMgODFcIiwgXCI5MyA4MlwiLCBcIjk3IDgyXCIsIFwiOTcgOUVcIiwgXCI5MyBCMFwiLCBcIjkzIDkzXCIsIFwiOTMgOTVcIiwgXCI5MyA5N1wiLCBcIjkzIDk4XCIsIFwiOTMgOTlcIiwgXCI5MyA5NFwiLCBcIjkzIDkyXCIsIFwiOTMgOUFcIiwgXCI5MyA5NlwiLCBcIjk0IDk3XCIsIFwiOTMgOEVcIiwgXCI5NiA4N1wiLCBcIkUyIDlDIDgyIEVGIEI4IDhGXCIsIFwiOTMgOTBcIiwgXCI5MyA4RlwiLCBcIjkzIDhDXCIsIFwiOTMgOERcIiwgXCI5QSBBOVwiLCBcIjhGIEIzXCIsIFwiOEYgQjRcIiwgXCI5NCA5MFwiLCBcIjk0IDkyXCIsIFwiOTQgOTNcIiwgXCI5NCA4RlwiLCBcIjk2IDhBXCIsIFwiOTYgOEJcIiwgXCJFMiA5QyA5MiBFRiBCOCA4RlwiLCBcIjkzIDlEXCIsIFwiRTIgOUMgOEYgRUYgQjggOEZcIiwgXCI5NiA4RFwiLCBcIjk2IDhDXCIsIFwiOTQgOERcIiwgXCI5NCA4RVwiLCBcIjlCIDkxXCIsIFwiOUIgOTFcIiwgXCJFMiA5RCBBNCBFRiBCOCA4RlwiLCBcIjkyIDlCXCIsIFwiOTIgOUFcIiwgXCI5MiA5OVwiLCBcIjkyIDlDXCIsIFwiOTIgOTRcIiwgXCJFMiA5RCBBMyBFRiBCOCA4RlwiLCBcIjkyIDk1XCIsIFwiOTIgOUVcIiwgXCI5MiA5M1wiLCBcIjkyIDk3XCIsIFwiOTIgOTZcIiwgXCI5MiA5OFwiLCBcIjkyIDlEXCIsIFwiOTIgOUZcIiwgXCJFMiA5OCBBRSBFRiBCOCA4RlwiLCBcIkUyIDlDIDlEIEVGIEI4IDhGXCIsIFwiRTIgOTggQUEgRUYgQjggOEZcIiwgXCI5NSA4OVwiLCBcIkUyIDk4IEI4IEVGIEI4IDhGXCIsIFwiRTIgOUMgQTEgRUYgQjggOEZcIiwgXCI5NCBBRlwiLCBcIjk1IDhFXCIsIFwiRTIgOTggQUYgRUYgQjggOEZcIiwgXCJFMiA5OCBBNiBFRiBCOCA4RlwiLCBcIjlCIDkwXCIsIFwiRTIgOUIgOEVcIiwgXCJFMiA5OSA4OCBFRiBCOCA4RlwiLCBcIkUyIDk5IDg5IEVGIEI4IDhGXCIsIFwiRTIgOTkgOEEgRUYgQjggOEZcIiwgXCJFMiA5OSA4QiBFRiBCOCA4RlwiLCBcIkUyIDk5IDhDIEVGIEI4IDhGXCIsIFwiRTIgOTkgOEQgRUYgQjggOEZcIiwgXCJFMiA5OSA4RSBFRiBCOCA4RlwiLCBcIkUyIDk5IDhGIEVGIEI4IDhGXCIsIFwiRTIgOTkgOTAgRUYgQjggOEZcIiwgXCJFMiA5OSA5MSBFRiBCOCA4RlwiLCBcIkUyIDk5IDkyIEVGIEI4IDhGXCIsIFwiRTIgOTkgOTMgRUYgQjggOEZcIiwgXCI4NiA5NFwiLCBcIkUyIDlBIDlCXCIsIFwiODggQjNcIiwgXCI4OCBCOVwiLCBcIkUyIDk4IEEyIEVGIEI4IDhGXCIsIFwiRTIgOTggQTMgRUYgQjggOEZcIiwgXCI5MyBCNFwiLCBcIjkzIEIzXCIsIFwiODggQjZcIiwgXCI4OCA5QSBFRiBCOCA4RlwiLCBcIjg4IEI4XCIsIFwiODggQkFcIiwgXCI4OCBCNyBFRiBCOCA4RlwiLCBcIkUyIDlDIEI0IEVGIEI4IDhGXCIsIFwiODYgOUFcIiwgXCI4OSA5MVwiLCBcIjkyIEFFXCIsIFwiODkgOTBcIiwgXCJFMyA4QSA5OSBFRiBCOCA4RlwiLCBcIkUzIDhBIDk3IEVGIEI4IDhGXCIsIFwiODggQjRcIiwgXCI4OCBCNVwiLCBcIjg4IEIyXCIsIFwiODUgQjAgRUYgQjggOEZcIiwgXCI4NSBCMSBFRiBCOCA4RlwiLCBcIjg2IDhFXCIsIFwiODYgOTFcIiwgXCI4NSBCRSBFRiBCOCA4RlwiLCBcIjg2IDk4XCIsIFwiRTIgOUIgOTQgRUYgQjggOEZcIiwgXCI5MyA5QlwiLCBcIjlBIEFCXCIsIFwiRTIgOUQgOENcIiwgXCJFMiBBRCA5NSBFRiBCOCA4RlwiLCBcIjkyIEEyXCIsIFwiRTIgOTkgQTggRUYgQjggOEZcIiwgXCI5QSBCN1wiLCBcIjlBIEFGXCIsIFwiOUEgQjNcIiwgXCI5QSBCMVwiLCBcIjk0IDlFXCIsIFwiOTMgQjVcIiwgXCJFMiA5RCA5NyBFRiBCOCA4RlwiLCBcIkUyIDlEIDk1XCIsIFwiRTIgOUQgOTNcIiwgXCJFMiA5RCA5NFwiLCBcIkUyIDgwIEJDIEVGIEI4IDhGXCIsIFwiRTIgODEgODkgRUYgQjggOEZcIiwgXCI5MiBBRlwiLCBcIjk0IDg1XCIsIFwiOTQgODZcIiwgXCI5NCBCMVwiLCBcIkUyIDlBIDlDXCIsIFwiRTMgODAgQkQgRUYgQjggOEZcIiwgXCJFMiA5QSBBMCBFRiBCOCA4RlwiLCBcIjlBIEI4XCIsIFwiOTQgQjBcIiwgXCJFMiA5OSBCQiBFRiBCOCA4RlwiLCBcIjg4IEFGIEVGIEI4IDhGXCIsIFwiOTIgQjlcIiwgXCJFMiA5RCA4NyBFRiBCOCA4RlwiLCBcIkUyIDlDIEIzIEVGIEI4IDhGXCIsIFwiRTIgOUQgOEVcIiwgXCJFMiA5QyA4NVwiLCBcIjkyIEEwXCIsIFwiOEMgODBcIiwgXCJFMiA5RSBCRlwiLCBcIjhDIDkwXCIsIFwiRTIgOTMgODIgRUYgQjggOEZcIiwgXCI4RiBBN1wiLCBcIjg4IDgyIEVGIEI4IDhGXCIsIFwiOUIgODJcIiwgXCI5QiA4M1wiLCBcIjlCIDg0XCIsIFwiOUIgODVcIiwgXCJFMiA5OSBCRiBFRiBCOCA4RlwiLCBcIjlBIEFEXCIsIFwiOUEgQkVcIiwgXCI4NSBCRiBFRiBCOCA4RlwiLCBcIjlBIEIwXCIsIFwiOUEgQjlcIiwgXCI5QSBCQVwiLCBcIjlBIEJDXCIsIFwiOUEgQkJcIiwgXCI5QSBBRVwiLCBcIjhFIEE2XCIsIFwiOTMgQjZcIiwgXCI4OCA4MVwiLCBcIjg2IDk2XCIsIFwiODYgOTdcIiwgXCI4NiA5OVwiLCBcIjg2IDkyXCIsIFwiODYgOTVcIiwgXCI4NiA5M1wiLCBcIjMwIEVGIEI4IDhGIEUyIDgzIEEzXCIsIFwiMzEgRUYgQjggOEYgRTIgODMgQTNcIiwgXCIzMiBFRiBCOCA4RiBFMiA4MyBBM1wiLCBcIjMzIEVGIEI4IDhGIEUyIDgzIEEzXCIsIFwiMzQgRUYgQjggOEYgRTIgODMgQTNcIiwgXCIzNSBFRiBCOCA4RiBFMiA4MyBBM1wiLCBcIjM2IEVGIEI4IDhGIEUyIDgzIEEzXCIsIFwiMzcgRUYgQjggOEYgRTIgODMgQTNcIiwgXCIzOCBFRiBCOCA4RiBFMiA4MyBBM1wiLCBcIjM5IEVGIEI4IDhGIEUyIDgzIEEzXCIsIFwiOTQgOUZcIiwgXCI5NCBBMlwiLCBcIkUyIDk2IEI2IEVGIEI4IDhGXCIsIFwiRTIgOEYgQjhcIiwgXCJFMiA4RiBBRlwiLCBcIkUyIDhGIEI5XCIsIFwiRTIgOEYgQkFcIiwgXCJFMiA4RiBBRFwiLCBcIkUyIDhGIEFFXCIsIFwiRTIgOEYgQTlcIiwgXCJFMiA4RiBBQVwiLCBcIjk0IDgwXCIsIFwiOTQgODFcIiwgXCI5NCA4MlwiLCBcIkUyIDk3IDgwIEVGIEI4IDhGXCIsIFwiOTQgQkNcIiwgXCI5NCBCRFwiLCBcIkUyIDhGIEFCXCIsIFwiRTIgOEYgQUNcIiwgXCJFMiA5RSBBMSBFRiBCOCA4RlwiLCBcIkUyIEFDIDg1IEVGIEI4IDhGXCIsIFwiRTIgQUMgODYgRUYgQjggOEZcIiwgXCJFMiBBQyA4NyBFRiBCOCA4RlwiLCBcIkUyIDg2IDk3IEVGIEI4IDhGXCIsIFwiRTIgODYgOTggRUYgQjggOEZcIiwgXCJFMiA4NiA5OSBFRiBCOCA4RlwiLCBcIkUyIDg2IDk2IEVGIEI4IDhGXCIsIFwiRTIgODYgOTUgRUYgQjggOEZcIiwgXCJFMiA4NiA5NCBFRiBCOCA4RlwiLCBcIjk0IDg0XCIsIFwiRTIgODYgQUEgRUYgQjggOEZcIiwgXCJFMiA4NiBBOSBFRiBCOCA4RlwiLCBcIkUyIEE0IEI0IEVGIEI4IDhGXCIsIFwiRTIgQTQgQjUgRUYgQjggOEZcIiwgXCIyMyBFRiBCOCA4RiBFMiA4MyBBM1wiLCBcIjJBIEVGIEI4IDhGIEUyIDgzIEEzXCIsIFwiRTIgODQgQjkgRUYgQjggOEZcIiwgXCI5NCBBNFwiLCBcIjk0IEExXCIsIFwiOTQgQTBcIiwgXCI5NCBBM1wiLCBcIjhFIEI1XCIsIFwiOEUgQjZcIiwgXCJFMyA4MCBCMCBFRiBCOCA4RlwiLCBcIkUyIDlFIEIwXCIsIFwiRTIgOUMgOTQgRUYgQjggOEZcIiwgXCI5NCA4M1wiLCBcIkUyIDlFIDk1XCIsIFwiRTIgOUUgOTZcIiwgXCJFMiA5RSA5N1wiLCBcIkUyIDlDIDk2IEVGIEI4IDhGXCIsIFwiOTIgQjJcIiwgXCI5MiBCMVwiLCBcIkMyIEE5IEVGIEI4IDhGXCIsIFwiQzIgQUUgRUYgQjggOEZcIiwgXCJFMiA4NCBBMiBFRiBCOCA4RlwiLCBcIjk0IDlBXCIsIFwiOTQgOTlcIiwgXCI5NCA5QlwiLCBcIjk0IDlEXCIsIFwiOTQgOUNcIiwgXCJFMiA5OCA5MSBFRiBCOCA4RlwiLCBcIjk0IDk4XCIsIFwiRTIgOUEgQUEgRUYgQjggOEZcIiwgXCJFMiA5QSBBQiBFRiBCOCA4RlwiLCBcIjk0IEI0XCIsIFwiOTQgQjVcIiwgXCI5NCBCOFwiLCBcIjk0IEI5XCIsIFwiOTQgQjZcIiwgXCI5NCBCN1wiLCBcIjk0IEJBXCIsIFwiRTIgOTYgQUEgRUYgQjggOEZcIiwgXCJFMiA5NiBBQiBFRiBCOCA4RlwiLCBcIkUyIEFDIDlCIEVGIEI4IDhGXCIsIFwiRTIgQUMgOUMgRUYgQjggOEZcIiwgXCI5NCBCQlwiLCBcIkUyIDk3IEJDIEVGIEI4IDhGXCIsIFwiRTIgOTcgQkIgRUYgQjggOEZcIiwgXCJFMiA5NyBCRSBFRiBCOCA4RlwiLCBcIkUyIDk3IEJEIEVGIEI4IDhGXCIsIFwiOTQgQjJcIiwgXCI5NCBCM1wiLCBcIjk0IDg4XCIsIFwiOTQgODlcIiwgXCI5NCA4QVwiLCBcIjk0IDg3XCIsIFwiOTMgQTNcIiwgXCI5MyBBMlwiLCBcIjk0IDk0XCIsIFwiOTQgOTVcIiwgXCI4MyA4RlwiLCBcIjgwIDg0IEVGIEI4IDhGXCIsIFwiRTIgOTkgQTAgRUYgQjggOEZcIiwgXCJFMiA5OSBBMyBFRiBCOCA4RlwiLCBcIkUyIDk5IEE1IEVGIEI4IDhGXCIsIFwiRTIgOTkgQTYgRUYgQjggOEZcIiwgXCI4RSBCNFwiLCBcIjkxIDgxIEUyIDgwIDhEIEYwIDlGIDk3IEE4XCIsIFwiOTIgQURcIiwgXCI5NyBBRlwiLCBcIjkyIEFDXCIsIFwiOTUgOTBcIiwgXCI5NSA5MVwiLCBcIjk1IDkyXCIsIFwiOTUgOTNcIiwgXCI5NSA5NFwiLCBcIjk1IDk1XCIsIFwiOTUgOTZcIiwgXCI5NSA5N1wiLCBcIjk1IDk4XCIsIFwiOTUgOTlcIiwgXCI5NSA5QVwiLCBcIjk1IDlCXCIsIFwiOTUgOUNcIiwgXCI5NSA5RFwiLCBcIjk1IDlFXCIsIFwiOTUgOUZcIiwgXCI5NSBBMFwiLCBcIjk1IEExXCIsIFwiOTUgQTJcIiwgXCI5NSBBM1wiLCBcIjk1IEE0XCIsIFwiOTUgQTVcIiwgXCI5NSBBNlwiLCBcIjk1IEE3XCIsIFwiOUIgOTFcIiwgXCI4NyBBNiBGMCA5RiA4NyBBQlwiLCBcIjg3IEE2IEYwIDlGIDg3IEJEXCIsIFwiODcgQTYgRjAgOUYgODcgQjFcIiwgXCI4NyBBOSBGMCA5RiA4NyBCRlwiLCBcIjg3IEE2IEYwIDlGIDg3IEI4XCIsIFwiODcgQTYgRjAgOUYgODcgQTlcIiwgXCI4NyBBNiBGMCA5RiA4NyBCNFwiLCBcIjg3IEE2IEYwIDlGIDg3IEFFXCIsIFwiODcgQTYgRjAgOUYgODcgQjZcIiwgXCI4NyBBNiBGMCA5RiA4NyBBQ1wiLCBcIjg3IEE2IEYwIDlGIDg3IEI3XCIsIFwiODcgQTYgRjAgOUYgODcgQjJcIiwgXCI4NyBBNiBGMCA5RiA4NyBCQ1wiLCBcIjg3IEE2IEYwIDlGIDg3IEJBXCIsIFwiODcgQTYgRjAgOUYgODcgQjlcIiwgXCI4NyBBNiBGMCA5RiA4NyBCRlwiLCBcIjg3IEE3IEYwIDlGIDg3IEI4XCIsIFwiODcgQTcgRjAgOUYgODcgQURcIiwgXCI4NyBBNyBGMCA5RiA4NyBBOVwiLCBcIjg3IEE3IEYwIDlGIDg3IEE3XCIsIFwiODcgQTcgRjAgOUYgODcgQkVcIiwgXCI4NyBBNyBGMCA5RiA4NyBBQVwiLCBcIjg3IEE3IEYwIDlGIDg3IEJGXCIsIFwiODcgQTcgRjAgOUYgODcgQUZcIiwgXCI4NyBBNyBGMCA5RiA4NyBCMlwiLCBcIjg3IEE3IEYwIDlGIDg3IEI5XCIsIFwiODcgQTcgRjAgOUYgODcgQjRcIiwgXCI4NyBBNyBGMCA5RiA4NyBCNlwiLCBcIjg3IEE3IEYwIDlGIDg3IEE2XCIsIFwiODcgQTcgRjAgOUYgODcgQkNcIiwgXCI4NyBBNyBGMCA5RiA4NyBCN1wiLCBcIjg3IEFFIEYwIDlGIDg3IEI0XCIsIFwiODcgQkIgRjAgOUYgODcgQUNcIiwgXCI4NyBBNyBGMCA5RiA4NyBCM1wiLCBcIjg3IEE3IEYwIDlGIDg3IEFDXCIsIFwiODcgQTcgRjAgOUYgODcgQUJcIiwgXCI4NyBBNyBGMCA5RiA4NyBBRVwiLCBcIjg3IEE4IEYwIDlGIDg3IEJCXCIsIFwiODcgQjAgRjAgOUYgODcgQURcIiwgXCI4NyBBOCBGMCA5RiA4NyBCMlwiLCBcIjg3IEE4IEYwIDlGIDg3IEE2XCIsIFwiODcgQUUgRjAgOUYgODcgQThcIiwgXCI4NyBCMCBGMCA5RiA4NyBCRVwiLCBcIjg3IEE4IEYwIDlGIDg3IEFCXCIsIFwiODcgQjkgRjAgOUYgODcgQTlcIiwgXCI4NyBBOCBGMCA5RiA4NyBCMVwiLCBcIjg3IEE4IEYwIDlGIDg3IEIzXCIsIFwiODcgQTggRjAgOUYgODcgQkRcIiwgXCI4NyBBOCBGMCA5RiA4NyBBOFwiLCBcIjg3IEE4IEYwIDlGIDg3IEI0XCIsIFwiODcgQjAgRjAgOUYgODcgQjJcIiwgXCI4NyBBOCBGMCA5RiA4NyBBQ1wiLCBcIjg3IEE4IEYwIDlGIDg3IEE5XCIsIFwiODcgQTggRjAgOUYgODcgQjBcIiwgXCI4NyBBOCBGMCA5RiA4NyBCN1wiLCBcIjg3IEFEIEYwIDlGIDg3IEI3XCIsIFwiODcgQTggRjAgOUYgODcgQkFcIiwgXCI4NyBBOCBGMCA5RiA4NyBCQ1wiLCBcIjg3IEE4IEYwIDlGIDg3IEJFXCIsIFwiODcgQTggRjAgOUYgODcgQkZcIiwgXCI4NyBBOSBGMCA5RiA4NyBCMFwiLCBcIjg3IEE5IEYwIDlGIDg3IEFGXCIsIFwiODcgQTkgRjAgOUYgODcgQjJcIiwgXCI4NyBBOSBGMCA5RiA4NyBCNFwiLCBcIjg3IEFBIEYwIDlGIDg3IEE4XCIsIFwiODcgQUEgRjAgOUYgODcgQUNcIiwgXCI4NyBCOCBGMCA5RiA4NyBCQlwiLCBcIjg3IEFDIEYwIDlGIDg3IEI2XCIsIFwiODcgQUEgRjAgOUYgODcgQjdcIiwgXCI4NyBBQSBGMCA5RiA4NyBBQVwiLCBcIjg3IEFBIEYwIDlGIDg3IEI5XCIsIFwiODcgQUEgRjAgOUYgODcgQkFcIiwgXCI4NyBBQiBGMCA5RiA4NyBCMFwiLCBcIjg3IEFCIEYwIDlGIDg3IEI0XCIsIFwiODcgQUIgRjAgOUYgODcgQUZcIiwgXCI4NyBBQiBGMCA5RiA4NyBBRVwiLCBcIjg3IEFCIEYwIDlGIDg3IEI3XCIsIFwiODcgQUMgRjAgOUYgODcgQUJcIiwgXCI4NyBCNSBGMCA5RiA4NyBBQlwiLCBcIjg3IEI5IEYwIDlGIDg3IEFCXCIsIFwiODcgQUMgRjAgOUYgODcgQTZcIiwgXCI4NyBBQyBGMCA5RiA4NyBCMlwiLCBcIjg3IEFDIEYwIDlGIDg3IEFBXCIsIFwiODcgQTkgRjAgOUYgODcgQUFcIiwgXCI4NyBBQyBGMCA5RiA4NyBBRFwiLCBcIjg3IEFDIEYwIDlGIDg3IEFFXCIsIFwiODcgQUMgRjAgOUYgODcgQjdcIiwgXCI4NyBBQyBGMCA5RiA4NyBCMVwiLCBcIjg3IEFDIEYwIDlGIDg3IEE5XCIsIFwiODcgQUMgRjAgOUYgODcgQjVcIiwgXCI4NyBBQyBGMCA5RiA4NyBCQVwiLCBcIjg3IEFDIEYwIDlGIDg3IEI5XCIsIFwiODcgQUMgRjAgOUYgODcgQUNcIiwgXCI4NyBBQyBGMCA5RiA4NyBCM1wiLCBcIjg3IEFDIEYwIDlGIDg3IEJDXCIsIFwiODcgQUMgRjAgOUYgODcgQkVcIiwgXCI4NyBBRCBGMCA5RiA4NyBCOVwiLCBcIjg3IEFEIEYwIDlGIDg3IEIzXCIsIFwiODcgQUQgRjAgOUYgODcgQjBcIiwgXCI4NyBBRCBGMCA5RiA4NyBCQVwiLCBcIjg3IEFFIEYwIDlGIDg3IEI4XCIsIFwiODcgQUUgRjAgOUYgODcgQjNcIiwgXCI4NyBBRSBGMCA5RiA4NyBBOVwiLCBcIjg3IEFFIEYwIDlGIDg3IEI3XCIsIFwiODcgQUUgRjAgOUYgODcgQjZcIiwgXCI4NyBBRSBGMCA5RiA4NyBBQVwiLCBcIjg3IEFFIEYwIDlGIDg3IEIyXCIsIFwiODcgQUUgRjAgOUYgODcgQjFcIiwgXCI4NyBBRSBGMCA5RiA4NyBCOVwiLCBcIjg3IEE4IEYwIDlGIDg3IEFFXCIsIFwiODcgQUYgRjAgOUYgODcgQjJcIiwgXCI4NyBBRiBGMCA5RiA4NyBCNVwiLCBcIjg3IEFGIEYwIDlGIDg3IEFBXCIsIFwiODcgQUYgRjAgOUYgODcgQjRcIiwgXCI4NyBCMCBGMCA5RiA4NyBCRlwiLCBcIjg3IEIwIEYwIDlGIDg3IEFBXCIsIFwiODcgQjAgRjAgOUYgODcgQUVcIiwgXCI4NyBCRCBGMCA5RiA4NyBCMFwiLCBcIjg3IEIwIEYwIDlGIDg3IEJDXCIsIFwiODcgQjAgRjAgOUYgODcgQUNcIiwgXCI4NyBCMSBGMCA5RiA4NyBBNlwiLCBcIjg3IEIxIEYwIDlGIDg3IEJCXCIsIFwiODcgQjEgRjAgOUYgODcgQTdcIiwgXCI4NyBCMSBGMCA5RiA4NyBCOFwiLCBcIjg3IEIxIEYwIDlGIDg3IEI3XCIsIFwiODcgQjEgRjAgOUYgODcgQkVcIiwgXCI4NyBCMSBGMCA5RiA4NyBBRVwiLCBcIjg3IEIxIEYwIDlGIDg3IEI5XCIsIFwiODcgQjEgRjAgOUYgODcgQkFcIiwgXCI4NyBCMiBGMCA5RiA4NyBCNFwiLCBcIjg3IEIyIEYwIDlGIDg3IEIwXCIsIFwiODcgQjIgRjAgOUYgODcgQUNcIiwgXCI4NyBCMiBGMCA5RiA4NyBCQ1wiLCBcIjg3IEIyIEYwIDlGIDg3IEJFXCIsIFwiODcgQjIgRjAgOUYgODcgQkJcIiwgXCI4NyBCMiBGMCA5RiA4NyBCMVwiLCBcIjg3IEIyIEYwIDlGIDg3IEI5XCIsIFwiODcgQjIgRjAgOUYgODcgQURcIiwgXCI4NyBCMiBGMCA5RiA4NyBCNlwiLCBcIjg3IEIyIEYwIDlGIDg3IEI3XCIsIFwiODcgQjIgRjAgOUYgODcgQkFcIiwgXCI4NyBCRSBGMCA5RiA4NyBCOVwiLCBcIjg3IEIyIEYwIDlGIDg3IEJEXCIsIFwiODcgQUIgRjAgOUYgODcgQjJcIiwgXCI4NyBCMiBGMCA5RiA4NyBBOVwiLCBcIjg3IEIyIEYwIDlGIDg3IEE4XCIsIFwiODcgQjIgRjAgOUYgODcgQjNcIiwgXCI4NyBCMiBGMCA5RiA4NyBBQVwiLCBcIjg3IEIyIEYwIDlGIDg3IEI4XCIsIFwiODcgQjIgRjAgOUYgODcgQTZcIiwgXCI4NyBCMiBGMCA5RiA4NyBCRlwiLCBcIjg3IEIyIEYwIDlGIDg3IEIyXCIsIFwiODcgQjMgRjAgOUYgODcgQTZcIiwgXCI4NyBCMyBGMCA5RiA4NyBCN1wiLCBcIjg3IEIzIEYwIDlGIDg3IEI1XCIsIFwiODcgQjMgRjAgOUYgODcgQjFcIiwgXCI4NyBCMyBGMCA5RiA4NyBBOFwiLCBcIjg3IEIzIEYwIDlGIDg3IEJGXCIsIFwiODcgQjMgRjAgOUYgODcgQUVcIiwgXCI4NyBCMyBGMCA5RiA4NyBBQVwiLCBcIjg3IEIzIEYwIDlGIDg3IEFDXCIsIFwiODcgQjMgRjAgOUYgODcgQkFcIiwgXCI4NyBCMyBGMCA5RiA4NyBBQlwiLCBcIjg3IEIyIEYwIDlGIDg3IEI1XCIsIFwiODcgQjAgRjAgOUYgODcgQjVcIiwgXCI4NyBCMyBGMCA5RiA4NyBCNFwiLCBcIjg3IEI0IEYwIDlGIDg3IEIyXCIsIFwiODcgQjUgRjAgOUYgODcgQjBcIiwgXCI4NyBCNSBGMCA5RiA4NyBCQ1wiLCBcIjg3IEI1IEYwIDlGIDg3IEI4XCIsIFwiODcgQjUgRjAgOUYgODcgQTZcIiwgXCI4NyBCNSBGMCA5RiA4NyBBQ1wiLCBcIjg3IEI1IEYwIDlGIDg3IEJFXCIsIFwiODcgQjUgRjAgOUYgODcgQUFcIiwgXCI4NyBCNSBGMCA5RiA4NyBBRFwiLCBcIjg3IEI1IEYwIDlGIDg3IEIzXCIsIFwiODcgQjUgRjAgOUYgODcgQjFcIiwgXCI4NyBCNSBGMCA5RiA4NyBCOVwiLCBcIjg3IEI1IEYwIDlGIDg3IEI3XCIsIFwiODcgQjYgRjAgOUYgODcgQTZcIiwgXCI4NyBCNyBGMCA5RiA4NyBBQVwiLCBcIjg3IEI3IEYwIDlGIDg3IEI0XCIsIFwiODcgQjcgRjAgOUYgODcgQkFcIiwgXCI4NyBCNyBGMCA5RiA4NyBCQ1wiLCBcIjg3IEE3IEYwIDlGIDg3IEIxXCIsIFwiODcgQjggRjAgOUYgODcgQURcIiwgXCI4NyBCMCBGMCA5RiA4NyBCM1wiLCBcIjg3IEIxIEYwIDlGIDg3IEE4XCIsIFwiODcgQjUgRjAgOUYgODcgQjJcIiwgXCI4NyBCQiBGMCA5RiA4NyBBOFwiLCBcIjg3IEJDIEYwIDlGIDg3IEI4XCIsIFwiODcgQjggRjAgOUYgODcgQjJcIiwgXCI4NyBCOCBGMCA5RiA4NyBCOVwiLCBcIjg3IEI4IEYwIDlGIDg3IEE2XCIsIFwiODcgQjggRjAgOUYgODcgQjNcIiwgXCI4NyBCNyBGMCA5RiA4NyBCOFwiLCBcIjg3IEI4IEYwIDlGIDg3IEE4XCIsIFwiODcgQjggRjAgOUYgODcgQjFcIiwgXCI4NyBCOCBGMCA5RiA4NyBBQ1wiLCBcIjg3IEI4IEYwIDlGIDg3IEJEXCIsIFwiODcgQjggRjAgOUYgODcgQjBcIiwgXCI4NyBCOCBGMCA5RiA4NyBBRVwiLCBcIjg3IEI4IEYwIDlGIDg3IEE3XCIsIFwiODcgQjggRjAgOUYgODcgQjRcIiwgXCI4NyBCRiBGMCA5RiA4NyBBNlwiLCBcIjg3IEFDIEYwIDlGIDg3IEI4XCIsIFwiODcgQjAgRjAgOUYgODcgQjdcIiwgXCI4NyBCOCBGMCA5RiA4NyBCOFwiLCBcIjg3IEFBIEYwIDlGIDg3IEI4XCIsIFwiODcgQjEgRjAgOUYgODcgQjBcIiwgXCI4NyBCOCBGMCA5RiA4NyBBOVwiLCBcIjg3IEI4IEYwIDlGIDg3IEI3XCIsIFwiODcgQjggRjAgOUYgODcgQkZcIiwgXCI4NyBCOCBGMCA5RiA4NyBBQVwiLCBcIjg3IEE4IEYwIDlGIDg3IEFEXCIsIFwiODcgQjggRjAgOUYgODcgQkVcIiwgXCI4NyBCOSBGMCA5RiA4NyBCQ1wiLCBcIjg3IEI5IEYwIDlGIDg3IEFGXCIsIFwiODcgQjkgRjAgOUYgODcgQkZcIiwgXCI4NyBCOSBGMCA5RiA4NyBBRFwiLCBcIjg3IEI5IEYwIDlGIDg3IEIxXCIsIFwiODcgQjkgRjAgOUYgODcgQUNcIiwgXCI4NyBCOSBGMCA5RiA4NyBCMFwiLCBcIjg3IEI5IEYwIDlGIDg3IEI0XCIsIFwiODcgQjkgRjAgOUYgODcgQjlcIiwgXCI4NyBCOSBGMCA5RiA4NyBCM1wiLCBcIjg3IEI5IEYwIDlGIDg3IEI3XCIsIFwiODcgQjkgRjAgOUYgODcgQjJcIiwgXCI4NyBCOSBGMCA5RiA4NyBBOFwiLCBcIjg3IEI5IEYwIDlGIDg3IEJCXCIsIFwiODcgQkEgRjAgOUYgODcgQUNcIiwgXCI4NyBCQSBGMCA5RiA4NyBBNlwiLCBcIjg3IEE2IEYwIDlGIDg3IEFBXCIsIFwiODcgQUMgRjAgOUYgODcgQTdcIiwgXCI4NyBCQSBGMCA5RiA4NyBCOFwiLCBcIjg3IEJCIEYwIDlGIDg3IEFFXCIsIFwiODcgQkEgRjAgOUYgODcgQkVcIiwgXCI4NyBCQSBGMCA5RiA4NyBCRlwiLCBcIjg3IEJCIEYwIDlGIDg3IEJBXCIsIFwiODcgQkIgRjAgOUYgODcgQTZcIiwgXCI4NyBCQiBGMCA5RiA4NyBBQVwiLCBcIjg3IEJCIEYwIDlGIDg3IEIzXCIsIFwiODcgQkMgRjAgOUYgODcgQUJcIiwgXCI4NyBBQSBGMCA5RiA4NyBBRFwiLCBcIjg3IEJFIEYwIDlGIDg3IEFBXCIsIFwiODcgQkYgRjAgOUYgODcgQjJcIiwgXCI4NyBCRiBGMCA5RiA4NyBCQ1wiXVxuXHRuZXR3b3JrOlwiXG48c3ZnIHdpZHRoPScxNHB4JyBoZWlnaHQ9JzEwcHgnIHZpZXdCb3g9Jzg3IDUgMTQgMTAnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG4gICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuICAgIDxkZWZzPjwvZGVmcz5cbiAgICA8cGF0aCBkPSdNOTYuMTQ0NDIwOCwxMi40Mzg1MDQzIEM5NS42MjYzNzQsMTEuODQ1NDQ1NiA5NC44NTIzNjE2LDExLjQ2ODkxMTkgOTMuOTg3NTYzLDExLjQ2ODkxMTkgQzkzLjEzOTAwNzMsMTEuNDY4OTExOSA5Mi4zNzc4NTk0LDExLjgzMTQzNDEgOTEuODYwMTY1MiwxMi40MDUzMTc3IEw5NC4wMjI1MzkxLDE0LjUgTDk2LjE0NDQyMDgsMTIuNDM4NTA0MyBaIE05OC4zMjM0OTY0LDEwLjMyMTQ0MjUgQzk3LjI0NDc3OTQsOS4xOTE3NDU2MyA5NS43MDE0Mzg3LDguNDg0NDU1OTYgOTMuOTg3NTYzLDguNDg0NDU1OTYgQzkyLjI4ODI3MjMsOC40ODQ0NTU5NiA5MC43NTY2MjY0LDkuMTc5NzU4OTMgODkuNjc5MjY5OCwxMC4yOTI2OTM2IEw5MC43NjkyOTg3LDExLjM0ODYgQzkxLjU2NzIwNSwxMC41MDUzNzA4IDkyLjcxMzY0OCw5Ljk3NjY4Mzk0IDkzLjk4NzU2Myw5Ljk3NjY4Mzk0IEM5NS4yNzY4ODM2LDkuOTc2NjgzOTQgOTYuNDM1NjMwNSwxMC41MTgyMzUgOTcuMjM0NjIxNSwxMS4zNzkzMjkzIEw5OC4zMjM0OTY0LDEwLjMyMTQ0MjUgTDk4LjMyMzQ5NjQsMTAuMzIxNDQyNSBaIE0xMDAuNSw4LjIwNjg3OTMzIEM5OC44NjI5NTc4LDYuNTM5NDM2NzIgOTYuNTUwNTY5OSw1LjUgOTMuOTg3NTYzLDUuNSBDOTEuNDM3NTEwMyw1LjUgODkuMTM1NTQ5Niw2LjUyODk1NjA1IDg3LjUsOC4xODE2NDQzMSBMODguNTg5NTU3OSw5LjIzNzA5NDQxIEM4OS45NDYwNzk4LDcuODU0MzE2NTUgOTEuODYyODkyMSw2Ljk5MjIyNzk4IDkzLjk4NzU2Myw2Ljk5MjIyNzk4IEM5Ni4xMjYwMDI2LDYuOTkyMjI3OTggOTguMDUzODgwOSw3Ljg2NTUyNjA5IDk5LjQxMTg2OTgsOS4yNjQwNDI3MiBMMTAwLjUsOC4yMDY4NzkzMyBaJyBpZD0nV2ktRmknIHN0cm9rZT0nbm9uZScgZmlsbD0nIzAzMDMwMycgZmlsbC1ydWxlPSdldmVub2RkJz48L3BhdGg+XG48L3N2Zz5cIlxuXHRhY3Rpdml0eTogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzE2cHgnIGhlaWdodD0nMTZweCcgdmlld0JveD0nMCAwIDE2IDE2JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+U29jY2VyIEJhbGw8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+XG5cdFx0XHRcdFx0PGNpcmNsZSBpZD0ncGF0aC0xJyBjeD0nOCcgY3k9JzgnIHI9JzgnPjwvY2lyY2xlPlxuXHRcdFx0XHQ8L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNicgc2tldGNoOnR5cGU9J01TQXJ0Ym9hcmRHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE3OS4wMDAwMDAsIC02MzkuMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nU29jY2VyLUJhbGwnIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE3OS4wMDAwMDAsIDYzOS4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PG1hc2sgaWQ9J21hc2stMicgc2tldGNoOm5hbWU9J01hc2snIGZpbGw9J3doaXRlJz5cblx0XHRcdFx0XHRcdFx0XHQ8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTEnPjwvdXNlPlxuXHRcdFx0XHRcdFx0XHQ8L21hc2s+XG5cdFx0XHRcdFx0XHRcdDx1c2UgaWQ9J01hc2snIHN0cm9rZT0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgeGxpbms6aHJlZj0nI3BhdGgtMSc+PC91c2U+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J002LDEyLjEyMDMwNDYgTDEyLjg1NzMzODQsOCBMMTMuMzcyMzc2NSw4Ljg1NzE2NzMgTDYuNTE1MDM4MDcsMTIuOTc3NDcxOSBMNiwxMi4xMjAzMDQ2IEw2LDEyLjEyMDMwNDYgWicgaWQ9J1JlY3RhbmdsZS00NycgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xMS44NDk2NDgsOC43MjYwNTUxIEwxOS4xMDAxMTAzLDUuMzQ1MTA5MDEgTDE5LjUyMjcyODUsNi4yNTE0MTY4IEwxMi4yNzIyNjYyLDkuNjMyMzYyODkgTDExLjg0OTY0OCw4LjcyNjA1NTEgTDExLjg0OTY0OCw4LjcyNjA1NTEgWicgaWQ9J1JlY3RhbmdsZS00Ny1Db3B5LTMnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNiwzLjEyMDMwNDYgTDEyLjg1NzMzODQsLTEgTDEzLjM3MjM3NjUsLTAuMTQyODMyNjk5IEw2LjUxNTAzODA3LDMuOTc3NDcxOSBMNiwzLjEyMDMwNDYgTDYsMy4xMjAzMDQ2IFonIGlkPSdSZWN0YW5nbGUtNDctQ29weS0yJyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTS0xLDcuMTIwMzA0NiBMNS44NTczMzg0MSwzIEw2LjM3MjM3NjQ4LDMuODU3MTY3MyBMLTAuNDg0OTYxOTI1LDcuOTc3NDcxOSBMLTEsNy4xMjAzMDQ2IEwtMSw3LjEyMDMwNDYgWicgaWQ9J1JlY3RhbmdsZS00Ny1Db3B5LTQnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUmVjdGFuZ2xlLTUwJyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknIHg9JzQnIHk9JzYnIHdpZHRoPScxJyBoZWlnaHQ9JzUnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1JlY3RhbmdsZS01MScgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJyB4PScxMS41JyB5PSczJyB3aWR0aD0nMScgaGVpZ2h0PScxMic+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNSw0Ljg1NzE2NzMgTDExLjg1NzMzODQsOC45Nzc0NzE5IEwxMi4zNzIzNzY1LDguMTIwMzA0NiBMNS41MTUwMzgwNyw0IEw1LDQuODU3MTY3MycgaWQ9J1JlY3RhbmdsZS00Ny1Db3B5JyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUsMTIuODU3MTY3MyBMMTEuODU3MzM4NCwxNi45Nzc0NzE5IEwxMi4zNzIzNzY1LDE2LjEyMDMwNDYgTDUuNTE1MDM4MDcsMTIgTDUsMTIuODU3MTY3MycgaWQ9J1JlY3RhbmdsZS00Ny1Db3B5LTUnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMTEuOTA0ODk3Miw2LjE0NzY2MDY0IEwxMy44NzE0MjI3LDguMzMxNzA4NDkgTDEyLjQwMTk1OTYsMTAuODc2ODkzMyBMOS41MjcyNTU4OSwxMC4yNjU4NTYyIEw5LjIyMDA1NDQ1LDcuMzQzMDI5NjUgTDExLjkwNDg5NzIsNi4xNDc2NjA2NCcgaWQ9J1BvbHlnb24tMScgZmlsbD0nI0Q4RDhEOCcgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xMS45MDQ4OTcyLDYuMTQ3NjYwNjQgTDEzLjg3MTQyMjcsOC4zMzE3MDg0OSBMMTIuNDAxOTU5NiwxMC44NzY4OTMzIEw5LjUyNzI1NTg5LDEwLjI2NTg1NjIgTDkuMjIwMDU0NDUsNy4zNDMwMjk2NSBMMTEuOTA0ODk3Miw2LjE0NzY2MDY0JyBpZD0nUG9seWdvbi0xLUNvcHknIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNy40NTc3MTE4OSwzLjE5NTA0NzM5IEw3LjM1NTE0NDg0LDYuMTMyMTgzMzMgTDQuNTMwMDY3Niw2Ljk0MjI2MTIgTDIuODg2NjQwODksNC41MDU3ODA5IEw0LjY5NjAyNDU3LDIuMTg5ODc1NDEgTDcuNDU3NzExODksMy4xOTUwNDczOScgaWQ9J1BvbHlnb24tMS1Db3B5LTInIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNy40NTc3MTE4OSwxMS4xOTUwNDc0IEw3LjM1NTE0NDg0LDE0LjEzMjE4MzMgTDQuNTMwMDY3NiwxNC45NDIyNjEyIEwyLjg4NjY0MDg5LDEyLjUwNTc4MDkgTDQuNjk2MDI0NTcsMTAuMTg5ODc1NCBMNy40NTc3MTE4OSwxMS4xOTUwNDc0JyBpZD0nUG9seWdvbi0xLUNvcHktMycgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xNC41NDMxNzAxLDAuMDcyNTkzOTMxNCBMMTQuNDQwNjAzMSwzLjAwOTcyOTg4IEwxMS42MTU1MjU4LDMuODE5ODA3NzQgTDkuOTcyMDk5MTIsMS4zODMzMjc0NSBMMTEuNzgxNDgyOCwtMC45MzI1NzgwNSBMMTQuNTQzMTcwMSwwLjA3MjU5MzkzMTQnIGlkPSdQb2x5Z29uLTEtQ29weS00JyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdGFuaW1hbHM6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScxN3B4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzAgMCAxNyAxNycgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPkdyb3VwPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMTE3LjAwMDAwMCwgLTYzOS4wMDAwMDApJyBzdHJva2U9JyM0QTUzNjEnPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J2ljX0Zvb2QnIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDExOC4wMDAwMDAsIDY0MC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J0dyb3VwJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNS42ODM3NzUzNywxLjM4MTU2NjQ2IEM2LjIzOTI2MDY2LDEuMTM2MjQgNi44NTM3MjAwNSwxIDcuNSwxIEM4LjE0NjI3OTk1LDEgOC43NjA3MzkzNCwxLjEzNjI0IDkuMzE2MjI0NjMsMS4zODE1NjY0NiBDOS44MDg3OTI3NSwwLjU2MjM1OTAxOSAxMC44MjU1ODg4LDAgMTIsMCBDMTMuNjU2ODU0MiwwIDE1LDEuMTE5Mjg4MTMgMTUsMi41IEMxNSwzLjU1NzEzOTggMTQuMjEyNjI0Niw0LjQ2MTAyODQzIDEzLjA5OTkyMjYsNC44MjY2MjUxNCBDMTQuMjQ5NjUyOCw1LjY0MTg1NDIyIDE1LDYuOTgzMzAwNjIgMTUsOC41IEMxNSwxMC43MTY3MTQ0IDEzLjM5NzE4NzMsMTIuNTU5MDcxOSAxMS4yODcyNjcxLDEyLjkzMTM2NzMgQzEwLjQ4NjcyNDgsMTQuMTc1NzcwMyA5LjA4OTYxNjk2LDE1IDcuNSwxNSBDNS45MTAzODMwNCwxNSA0LjUxMzI3NTI0LDE0LjE3NTc3MDMgMy43MTI3MzI5MSwxMi45MzEzNjczIEMxLjYwMjgxMjY4LDEyLjU1OTA3MTkgMCwxMC43MTY3MTQ0IDAsOC41IEMwLDYuOTgzMzAwNjIgMC43NTAzNDcyNDQsNS42NDE4NTQyMiAxLjkwMDA3NzQxLDQuODI2NjI1MTQgQzAuNzg3Mzc1NDQ1LDQuNDYxMDI4NDMgMCwzLjU1NzEzOTggMCwyLjUgQzAsMS4xMTkyODgxMyAxLjM0MzE0NTc1LDAgMywwIEM0LjE3NDQxMTIyLDAgNS4xOTEyMDcyNSwwLjU2MjM1OTAxOSA1LjY4Mzc3NTM3LDEuMzgxNTY2NDYgWicgaWQ9J092YWwtOCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J001LjczODM0MjI4LDEyIEM1Ljg2MjkwOTc5LDEyIDYuMTQ2NDIzNTMsMTIgNi4xNDY0MjM1MywxMiBDNi4xNDY0MjM1MywxMiA2LjQzMjE1Njk2LDEyLjQ0MjYxMjMgNi41MjQ2NTgyLDEyLjQ5MTk3MzkgQzYuNjY0NTU2MDEsMTIuNTY2NjI3NyA3LDEyLjQ5MTk3MzkgNywxMi40OTE5NzM5IEw3LDEyIEw4LDEyIEw4LDEyLjQ5MTk3MzkgTDguNDk3OTkyMjgsMTIuNDkxOTczOSBMOC44NDMwMTc2OSwxMiBMOS4zOTE4NDU3LDEyIEM5LjM5MTg0NTcsMTIgOC45OTU5ODQ1NywxMi45ODM5NDc4IDguNDk3OTkyMjgsMTIuOTgzOTQ3OCBMNi42MDcwMjQwNywxMi45ODM5NDc4IEM2LjIxNDA0ODEzLDEyLjk4Mzk0NzggNS40NTk5NjA5NCwxMiA1LjczODM0MjI4LDEyIFonIGlkPSdSZWN0YW5nbGUtNDQtQ29weS0yJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PGNpcmNsZSBpZD0nT3ZhbC0xNCcgY3g9JzEwLjUnIGN5PSc3LjUnIHI9JzAuNSc+PC9jaXJjbGU+XG5cdFx0XHRcdFx0XHRcdFx0PGNpcmNsZSBpZD0nT3ZhbC0xNC1Db3B5JyBjeD0nNC41JyBjeT0nNy41JyByPScwLjUnPjwvY2lyY2xlPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xMi42OTk5OTY5LDUgQzEyLjY5OTk5NjksMy4wNjcwMDMzOCAxMS4xMzI5OTM2LDEuNSA5LjE5OTk5Njk1LDEuNScgaWQ9J092YWwtMTYnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNS41LDUgQzUuNSwzLjA2NzAwMzM4IDMuOTMyOTk2NjIsMS41IDIsMS41JyBpZD0nT3ZhbC0xNi1Db3B5JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzLjc1MDAwMCwgMy4yNTAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTMuNzUwMDAwLCAtMy4yNTAwMDApICc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdSZWN0YW5nbGUtNDQtQ29weScgeD0nNycgeT0nMTEnIHdpZHRoPScxJyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNiwxMCBMNi41LDEwIEw2LjQ5OTk5OTk5LDkuNSBMOC41MDAwMDAwNSw5LjUgTDguNTAwMDAwMDUsMTAgTDksMTAgTDksMTAuNSBMOC41LDEwLjUgTDguNSwxMSBMNi41LDExIEw2LjUsMTAuNSBMNiwxMC41IEw2LDEwIFonIGlkPSdQYXRoJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdGNoZXZyb24gOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdDxzdmcgd2lkdGg9JzEzcHgnIGhlaWdodD0nMjJweCcgdmlld0JveD0nMCAwIDEzIDIyJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNi4xICgyNjMxMykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0ICAgIDx0aXRsZT5CYWNrIENoZXZyb248L3RpdGxlPlxuXHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHQgICAgPGRlZnM+PC9kZWZzPlxuXHRcdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0XHQgICAgICAgIDxnIGlkPSdOYXZpZ2F0aW9uLUJhci9CYWNrJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtOC4wMDAwMDAsIC0zMS4wMDAwMDApJyBmaWxsPScjMDA3NkZGJz5cblx0XHQgICAgICAgICAgICA8cGF0aCBkPSdNOC41LDQyIEwxOSwzMS41IEwyMSwzMy41IEwxMi41LDQyIEwyMSw1MC41IEwxOSw1Mi41IEw4LjUsNDIgWicgaWQ9J0JhY2stQ2hldnJvbic+PC9wYXRoPlxuXHRcdCAgICAgICAgPC9nPlxuXHRcdCAgICA8L2c+XG5cdFx0PC9zdmc+XCJcblx0ZW1vamlzOiBbXCLwn5iAXCIsIFwi8J+YrFwiLCBcIvCfmIFcIiwgXCLwn5iCXCIsIFwi8J+Yg1wiLCBcIvCfmIRcIiwgXCLwn5iFXCIsIFwi8J+YhlwiLCBcIvCfmIdcIiwgXCLwn5iJXCIsIFwi8J+YilwiLCBcIvCfmYJcIiwgXCLwn5mDXCIsIFwi4pi677iPXCIsIFwi8J+Yi1wiLCBcIvCfmIxcIiwgXCLwn5iNXCIsIFwi8J+YmFwiLCBcIvCfmJdcIiwgXCLwn5iZXCIsIFwi8J+YmlwiLCBcIvCfmJxcIiwgXCLwn5idXCIsIFwi8J+Ym1wiLCBcIvCfpJFcIiwgXCLwn6STXCIsIFwi8J+YjlwiLCBcIvCfpJdcIiwgXCLwn5iPXCIsIFwi8J+YtlwiLCBcIvCfmJBcIiwgXCLwn5iRXCIsIFwi8J+YklwiLCBcIvCfmYRcIiwgXCLwn6SUXCIsIFwi8J+Ys1wiLCBcIvCfmJ5cIiwgXCLwn5ifXCIsIFwi8J+YoFwiLCBcIvCfmKFcIiwgXCLwn5iUXCIsIFwi8J+YlVwiLCBcIvCfmYFcIiwgXCLimLnvuI9cIiwgXCLwn5ijXCIsIFwi8J+YllwiLCBcIvCfmKtcIiwgXCLwn5ipXCIsIFwi8J+YpFwiLCBcIvCfmK5cIiwgXCLwn5ixXCIsIFwi8J+YqFwiLCBcIvCfmLBcIiwgXCLwn5ivXCIsIFwi8J+YplwiLCBcIvCfmKdcIiwgXCLwn5iiXCIsIFwi8J+YpVwiLCBcIvCfmKpcIiwgXCLwn5iTXCIsIFwi8J+YrVwiLCBcIvCfmLVcIiwgXCLwn5iyXCIsIFwi8J+kkFwiLCBcIvCfmLdcIiwgXCLwn6SSXCIsIFwi8J+klVwiLCBcIvCfmLRcIiwgXCLwn5KkXCIsIFwi8J+SqVwiLCBcIvCfmIhcIiwgXCLwn5G/XCIsIFwi8J+RuVwiLCBcIvCfkbpcIiwgXCLwn5KAXCIsIFwi8J+Ru1wiLCBcIvCfkb1cIiwgXCLwn6SWXCIsIFwi8J+YulwiLCBcIvCfmLhcIiwgXCLwn5i5XCIsIFwi8J+Yu1wiLCBcIvCfmLxcIiwgXCLwn5i9XCIsIFwi8J+ZgFwiLCBcIvCfmL9cIiwgXCLwn5i+XCIsIFwi8J+ZjFwiLCBcIvCfkY9cIiwgXCLwn5GLXCIsIFwi8J+RjVwiLCBcIvCfkY5cIiwgXCLwn5GKXCIsIFwi4pyKXCIsIFwi4pyM77iPXCIsIFwi8J+RjFwiLCBcIuKci1wiLCBcIvCfkZBcIiwgXCLwn5KqXCIsIFwi8J+Zj1wiLCBcIuKYne+4j1wiLCBcIvCfkYZcIiwgXCLwn5GHXCIsIFwi8J+RiFwiLCBcIvCfkYlcIiwgXCLwn5aVXCIsIFwi8J+WkFwiLCBcIvCfpJhcIiwgXCLwn5aWXCIsIFwi4pyN77iPXCIsIFwi8J+ShVwiLCBcIvCfkYRcIiwgXCLwn5GFXCIsIFwi8J+RglwiLCBcIvCfkYNcIiwgXCLwn5GBXCIsIFwi8J+RgFwiLCBcIvCfkaRcIiwgXCLwn5GlXCIsIFwi8J+Xo1wiLCBcIvCfkbZcIiwgXCLwn5GmXCIsIFwi8J+Rp1wiLCBcIvCfkahcIiwgXCLwn5GpXCIsIFwi8J+RsVwiLCBcIvCfkbRcIiwgXCLwn5G1XCIsIFwi8J+RslwiLCBcIvCfkbNcIiwgXCLwn5GuXCIsIFwi8J+Rt1wiLCBcIvCfkoJcIiwgXCLwn5W1XCIsIFwi8J+OhVwiLCBcIvCfkbxcIiwgXCLwn5G4XCIsIFwi8J+RsFwiLCBcIvCfmrZcIiwgXCLwn4+DXCIsIFwi8J+Sg1wiLCBcIvCfka9cIiwgXCLwn5GrXCIsIFwi8J+RrFwiLCBcIvCfka1cIiwgXCLwn5mHXCIsIFwi8J+SgVwiLCBcIvCfmYVcIiwgXCLwn5mGXCIsIFwi8J+Zi1wiLCBcIvCfmY5cIiwgXCLwn5mNXCIsIFwi8J+Sh1wiLCBcIvCfkoZcIiwgXCLwn5KRXCIsIFwi8J+RqeKAjeKdpO+4j+KAjfCfkalcIiwgXCLwn5Go4oCN4p2k77iP4oCN8J+RqFwiLCBcIvCfko9cIiwgXCLwn5Gp4oCN4p2k77iP4oCN8J+Si+KAjfCfkalcIiwgXCLwn5Go4oCN4p2k77iP4oCN8J+Si+KAjfCfkahcIiwgXCLwn5GqXCIsIFwi8J+RqOKAjfCfkanigI3wn5GnXCIsIFwi8J+RqOKAjfCfkanigI3wn5Gn4oCN8J+RplwiLCBcIvCfkajigI3wn5Gp4oCN8J+RpuKAjfCfkaZcIiwgXCLwn5Go4oCN8J+RqeKAjfCfkafigI3wn5GnXCIsIFwi8J+RqeKAjfCfkanigI3wn5GmXCIsIFwi8J+RqeKAjfCfkanigI3wn5GnXCIsIFwi8J+RqeKAjfCfkanigI3wn5Gn4oCN8J+RplwiLCBcIvCfkanigI3wn5Gp4oCN8J+RpuKAjfCfkaZcIiwgXCLwn5Gp4oCN8J+RqeKAjfCfkafigI3wn5GnXCIsIFwi8J+RqOKAjfCfkajigI3wn5GmXCIsIFwi8J+RqOKAjfCfkajigI3wn5GnXCIsIFwi8J+RqOKAjfCfkajigI3wn5Gn4oCN8J+RplwiLCBcIvCfkajigI3wn5Go4oCN8J+RpuKAjfCfkaZcIiwgXCLwn5Go4oCN8J+RqOKAjfCfkafigI3wn5GnXCIsIFwi8J+RmlwiLCBcIvCfkZVcIiwgXCLwn5GWXCIsIFwi8J+RlFwiLCBcIvCfkZdcIiwgXCLwn5GZXCIsIFwi8J+RmFwiLCBcIvCfkoRcIiwgXCLwn5KLXCIsIFwi8J+Ro1wiLCBcIvCfkaBcIiwgXCLwn5GhXCIsIFwi8J+RolwiLCBcIvCfkZ5cIiwgXCLwn5GfXCIsIFwi8J+RklwiLCBcIvCfjqlcIiwgXCLim5FcIiwgXCLwn46TXCIsIFwi8J+RkVwiLCBcIvCfjpJcIiwgXCLwn5GdXCIsIFwi8J+Rm1wiLCBcIvCfkZxcIiwgXCLwn5K8XCIsIFwi8J+Rk1wiLCBcIvCflbZcIiwgXCLwn5KNXCIsIFwi8J+MglwiLCBcIvCfm5FcIiwgXCLwn5C2XCIsIFwi8J+QsVwiLCBcIvCfkK1cIiwgXCLwn5C5XCIsIFwi8J+QsFwiLCBcIvCfkLtcIiwgXCLwn5C8XCIsIFwi8J+QqFwiLCBcIvCfkK9cIiwgXCLwn6aBXCIsIFwi8J+QrlwiLCBcIvCfkLdcIiwgXCLwn5C9XCIsIFwi8J+QuFwiLCBcIvCfkJlcIiwgXCLwn5C1XCIsIFwi8J+ZiFwiLCBcIvCfmYlcIiwgXCLwn5mKXCIsIFwi8J+QklwiLCBcIvCfkJRcIiwgXCLwn5CnXCIsIFwi8J+QplwiLCBcIvCfkKRcIiwgXCLwn5CjXCIsIFwi8J+QpVwiLCBcIvCfkLpcIiwgXCLwn5CXXCIsIFwi8J+QtFwiLCBcIvCfpoRcIiwgXCLwn5CdXCIsIFwi8J+Qm1wiLCBcIvCfkIxcIiwgXCLwn5CeXCIsIFwi8J+QnFwiLCBcIvCflbdcIiwgXCLwn6aCXCIsIFwi8J+mgFwiLCBcIvCfkI1cIiwgXCLwn5CiXCIsIFwi8J+QoFwiLCBcIvCfkJ9cIiwgXCLwn5ChXCIsIFwi8J+QrFwiLCBcIvCfkLNcIiwgXCLwn5CLXCIsIFwi8J+QilwiLCBcIvCfkIZcIiwgXCLwn5CFXCIsIFwi8J+Qg1wiLCBcIvCfkIJcIiwgXCLwn5CEXCIsIFwi8J+QqlwiLCBcIvCfkKtcIiwgXCLwn5CYXCIsIFwi8J+QkFwiLCBcIvCfkI9cIiwgXCLwn5CRXCIsIFwi8J+QjlwiLCBcIvCfkJZcIiwgXCLwn5CAXCIsIFwi8J+QgVwiLCBcIvCfkJNcIiwgXCLwn6aDXCIsIFwi8J+VilwiLCBcIvCfkJVcIiwgXCLwn5CpXCIsIFwi8J+QiFwiLCBcIvCfkIdcIiwgXCLwn5C/XCIsIFwi8J+QvlwiLCBcIvCfkIlcIiwgXCLwn5CyXCIsIFwi8J+MtVwiLCBcIvCfjoRcIiwgXCLwn4yyXCIsIFwi8J+Ms1wiLCBcIvCfjLRcIiwgXCLwn4yxXCIsIFwi8J+Mv1wiLCBcIuKYmFwiLCBcIvCfjYBcIiwgXCLwn46NXCIsIFwi8J+Oi1wiLCBcIvCfjYNcIiwgXCLwn42CXCIsIFwi8J+NgVwiLCBcIvCfjL5cIiwgXCLwn4y6XCIsIFwi8J+MulwiLCBcIvCfjLtcIiwgXCLwn4y5XCIsIFwi8J+Mt1wiLCBcIvCfjLxcIiwgXCLwn4y4XCIsIFwi8J+SkFwiLCBcIvCfjYRcIiwgXCLwn4ywXCIsIFwi8J+Og1wiLCBcIvCfkJpcIiwgXCLwn5W4XCIsIFwi8J+MjlwiLCBcIvCfjI1cIiwgXCLwn4yPXCIsIFwi8J+MlVwiLCBcIvCfjJZcIiwgXCLwn4yXXCIsIFwi8J+MmFwiLCBcIvCfjJFcIiwgXCLwn4ySXCIsIFwi8J+Mk1wiLCBcIvCfjJRcIiwgXCLwn4yaXCIsIFwi8J+MnVwiLCBcIvCfjJtcIiwgXCLwn4ycXCIsIFwi8J+MnlwiLCBcIvCfjJlcIiwgXCLirZDvuI9cIiwgXCLwn4yfXCIsIFwi8J+Sq1wiLCBcIuKcqFwiLCBcIuKYhO+4j1wiLCBcIuKYgO+4j1wiLCBcIvCfjKRcIiwgXCLim4XvuI9cIiwgXCLwn4ylXCIsIFwi8J+MplwiLCBcIuKYge+4j1wiLCBcIvCfjKdcIiwgXCLim4hcIiwgXCLwn4ypXCIsIFwi4pqh77iPXCIsIFwi8J+UpVwiLCBcIvCfkqVcIiwgXCLinYTvuI9cIiwgXCLwn4yoXCIsIFwi4piD77iPXCIsIFwi4puE77iPXCIsIFwi8J+MrFwiLCBcIvCfkqhcIiwgXCLwn4yqXCIsIFwi8J+Mq1wiLCBcIuKYgu+4j1wiLCBcIuKYlO+4j1wiLCBcIvCfkqdcIiwgXCLwn5KmXCIsIFwi8J+MilwiLCBcIvCfm5FcIiwgXCLwn5uRXCIsIFwi8J+Nj1wiLCBcIvCfjY5cIiwgXCLwn42QXCIsIFwi8J+NilwiLCBcIvCfjYtcIiwgXCLwn42MXCIsIFwi8J+NiVwiLCBcIvCfjYdcIiwgXCLwn42TXCIsIFwi8J+NiFwiLCBcIvCfjZJcIiwgXCLwn42RXCIsIFwi8J+NjVwiLCBcIvCfjYVcIiwgXCLwn42GXCIsIFwi8J+MtlwiLCBcIvCfjL1cIiwgXCLwn42gXCIsIFwi8J+Nr1wiLCBcIvCfjZ5cIiwgXCLwn6eAXCIsIFwi8J+Nl1wiLCBcIvCfjZZcIiwgXCLwn42kXCIsIFwi8J+Ns1wiLCBcIvCfjZRcIiwgXCLwn42fXCIsIFwi8J+MrVwiLCBcIvCfjZVcIiwgXCLwn42dXCIsIFwi8J+MrlwiLCBcIvCfjK9cIiwgXCLwn42cXCIsIFwi8J+NslwiLCBcIvCfjaVcIiwgXCLwn42jXCIsIFwi8J+NsVwiLCBcIvCfjZtcIiwgXCLwn42ZXCIsIFwi8J+NmlwiLCBcIvCfjZhcIiwgXCLwn42iXCIsIFwi8J+NoVwiLCBcIvCfjadcIiwgXCLwn42oXCIsIFwi8J+NplwiLCBcIvCfjbBcIiwgXCLwn46CXCIsIFwi8J+NrlwiLCBcIvCfjaxcIiwgXCLwn42tXCIsIFwi8J+Nq1wiLCBcIvCfjb9cIiwgXCLwn42pXCIsIFwi8J+NqlwiLCBcIvCfjbpcIiwgXCLwn427XCIsIFwi8J+Nt1wiLCBcIvCfjbhcIiwgXCLwn425XCIsIFwi8J+NvlwiLCBcIvCfjbZcIiwgXCLwn421XCIsIFwi4piV77iPXCIsIFwi8J+NvFwiLCBcIvCfjbRcIiwgXCLwn429XCIsIFwi8J+bkVwiLCBcIvCfm5FcIiwgXCLwn5uRXCIsIFwi4pq977iPXCIsIFwi8J+PgFwiLCBcIvCfj4hcIiwgXCLimr7vuI9cIiwgXCLwn46+XCIsIFwi8J+PkFwiLCBcIvCfj4lcIiwgXCLwn46xXCIsIFwi4puz77iPXCIsIFwi8J+PjFwiLCBcIvCfj5NcIiwgXCLwn4+4XCIsIFwi8J+PklwiLCBcIvCfj5FcIiwgXCLwn4+PXCIsIFwi8J+Ov1wiLCBcIuKbt1wiLCBcIvCfj4JcIiwgXCLim7hcIiwgXCLwn4+5XCIsIFwi8J+Oo1wiLCBcIvCfmqNcIiwgXCLwn4+KXCIsIFwi8J+PhFwiLCBcIvCfm4BcIiwgXCLim7lcIiwgXCLwn4+LXCIsIFwi8J+atFwiLCBcIvCfmrVcIiwgXCLwn4+HXCIsIFwi8J+VtFwiLCBcIvCfj4ZcIiwgXCLwn469XCIsIFwi8J+PhVwiLCBcIvCfjpZcIiwgXCLwn46XXCIsIFwi8J+PtVwiLCBcIvCfjqtcIiwgXCLwn46fXCIsIFwi8J+OrVwiLCBcIvCfjqhcIiwgXCLwn46qXCIsIFwi8J+OpFwiLCBcIvCfjqdcIiwgXCLwn468XCIsIFwi8J+OuVwiLCBcIvCfjrdcIiwgXCLwn466XCIsIFwi8J+OuFwiLCBcIvCfjrtcIiwgXCLwn46sXCIsIFwi8J+OrlwiLCBcIvCfkb5cIiwgXCLwn46vXCIsIFwi8J+OslwiLCBcIvCfjrBcIiwgXCLwn46zXCIsIFwi8J+bkVwiLCBcIvCfm5FcIiwgXCLwn5uRXCIsIFwi8J+al1wiLCBcIvCfmpVcIiwgXCLwn5qZXCIsIFwi8J+ajFwiLCBcIvCfmo5cIiwgXCLwn4+OXCIsIFwi8J+ak1wiLCBcIvCfmpFcIiwgXCLwn5qSXCIsIFwi8J+akFwiLCBcIvCfmppcIiwgXCLwn5qbXCIsIFwi8J+anFwiLCBcIvCfj41cIiwgXCLwn5qyXCIsIFwi8J+aqFwiLCBcIvCfmpRcIiwgXCLwn5qNXCIsIFwi8J+amFwiLCBcIvCfmpZcIiwgXCLwn5qhXCIsIFwi8J+aoFwiLCBcIvCfmq9cIiwgXCLwn5qDXCIsIFwi8J+ai1wiLCBcIvCfmp1cIiwgXCLwn5qEXCIsIFwi8J+ahVwiLCBcIvCfmohcIiwgXCLwn5qeXCIsIFwi8J+aglwiLCBcIvCfmoZcIiwgXCLwn5qHXCIsIFwi8J+ailwiLCBcIvCfmolcIiwgXCLwn5qBXCIsIFwi8J+bqVwiLCBcIuKciO+4j1wiLCBcIvCfm6tcIiwgXCLwn5usXCIsIFwi4pu177iPXCIsIFwi8J+bpVwiLCBcIvCfmqRcIiwgXCLim7RcIiwgXCLwn5uzXCIsIFwi8J+agFwiLCBcIvCfm7BcIiwgXCLwn5K6XCIsIFwi4pqT77iPXCIsIFwi8J+ap1wiLCBcIuKbve+4j1wiLCBcIvCfmo9cIiwgXCLwn5qmXCIsIFwi8J+apVwiLCBcIvCfj4FcIiwgXCLwn5qiXCIsIFwi8J+OoVwiLCBcIvCfjqJcIiwgXCLwn46gXCIsIFwi8J+Pl1wiLCBcIvCfjIFcIiwgXCLwn5e8XCIsIFwi8J+PrVwiLCBcIuKbsu+4j1wiLCBcIvCfjpFcIiwgXCLim7BcIiwgXCLwn4+UXCIsIFwi8J+Xu1wiLCBcIvCfjItcIiwgXCLwn5e+XCIsIFwi8J+PlVwiLCBcIuKbuu+4j1wiLCBcIvCfj55cIiwgXCLwn5ujXCIsIFwi8J+bpFwiLCBcIvCfjIVcIiwgXCLwn4yEXCIsIFwi8J+PnFwiLCBcIvCfj5ZcIiwgXCLwn4+dXCIsIFwi8J+Mh1wiLCBcIvCfjIZcIiwgXCLwn4+ZXCIsIFwi8J+Mg1wiLCBcIvCfjIlcIiwgXCLwn4yMXCIsIFwi8J+MoFwiLCBcIvCfjodcIiwgXCLwn46GXCIsIFwi8J+MiFwiLCBcIvCfj5hcIiwgXCLwn4+wXCIsIFwi8J+Pr1wiLCBcIvCfj59cIiwgXCLwn5e9XCIsIFwi8J+PoFwiLCBcIvCfj6FcIiwgXCLwn4+aXCIsIFwi8J+PolwiLCBcIvCfj6xcIiwgXCLwn4+jXCIsIFwi8J+PpFwiLCBcIvCfj6VcIiwgXCLwn4+mXCIsIFwi8J+PqFwiLCBcIvCfj6pcIiwgXCLwn4+rXCIsIFwi8J+PqVwiLCBcIvCfkpJcIiwgXCLwn4+bXCIsIFwi4puq77iPXCIsIFwi8J+VjFwiLCBcIvCflY1cIiwgXCLwn5WLXCIsIFwi4pupXCIsIFwi4oya77iPXCIsIFwi8J+TsVwiLCBcIvCfk7JcIiwgXCLwn5K7XCIsIFwi4oyo77iPXCIsIFwi8J+WpVwiLCBcIvCflqhcIiwgXCLwn5axXCIsIFwi8J+WslwiLCBcIvCflblcIiwgXCLwn5ecXCIsIFwi8J+SvVwiLCBcIvCfkr5cIiwgXCLwn5K/XCIsIFwi8J+TgFwiLCBcIvCfk7xcIiwgXCLwn5O3XCIsIFwi8J+TuFwiLCBcIvCfk7lcIiwgXCLwn46lXCIsIFwi8J+TvVwiLCBcIvCfjp5cIiwgXCLwn5OeXCIsIFwi4piO77iPXCIsIFwi8J+Tn1wiLCBcIvCfk6BcIiwgXCLwn5O6XCIsIFwi8J+Tu1wiLCBcIvCfjplcIiwgXCLwn46aXCIsIFwi8J+Om1wiLCBcIuKPsVwiLCBcIuKPslwiLCBcIuKPsFwiLCBcIvCflbBcIiwgXCLij7NcIiwgXCLijJvvuI9cIiwgXCLwn5OhXCIsIFwi8J+Ui1wiLCBcIvCflIxcIiwgXCLwn5KhXCIsIFwi8J+UplwiLCBcIvCfla9cIiwgXCLwn5eRXCIsIFwi8J+bolwiLCBcIvCfkrhcIiwgXCLwn5K1XCIsIFwi8J+StFwiLCBcIvCfkrZcIiwgXCLwn5K3XCIsIFwi8J+SsFwiLCBcIvCfkrNcIiwgXCLwn5KOXCIsIFwi4pqWXCIsIFwi8J+Up1wiLCBcIvCflKhcIiwgXCLimpJcIiwgXCLwn5ugXCIsIFwi4puPXCIsIFwi8J+UqVwiLCBcIuKamVwiLCBcIuKbk1wiLCBcIvCflKtcIiwgXCLwn5KjXCIsIFwi8J+UqlwiLCBcIvCfl6FcIiwgXCLimpRcIiwgXCLwn5uhXCIsIFwi8J+arFwiLCBcIuKYoO+4j1wiLCBcIuKasFwiLCBcIuKasVwiLCBcIvCfj7pcIiwgXCLwn5SuXCIsIFwi8J+Tv1wiLCBcIvCfkohcIiwgXCLimpdcIiwgXCLwn5StXCIsIFwi8J+UrFwiLCBcIvCflbNcIiwgXCLwn5KKXCIsIFwi8J+SiVwiLCBcIvCfjKFcIiwgXCLwn4+3XCIsIFwi8J+UllwiLCBcIvCfmr1cIiwgXCLwn5q/XCIsIFwi8J+bgVwiLCBcIvCflJFcIiwgXCLwn5edXCIsIFwi8J+bi1wiLCBcIvCfm4xcIiwgXCLwn5uPXCIsIFwi8J+aqlwiLCBcIvCfm45cIiwgXCLwn5a8XCIsIFwi8J+XulwiLCBcIuKbsVwiLCBcIvCfl79cIiwgXCLwn5uNXCIsIFwi8J+OiFwiLCBcIvCfjo9cIiwgXCLwn46AXCIsIFwi8J+OgVwiLCBcIvCfjopcIiwgXCLwn46JXCIsIFwi8J+OjlwiLCBcIvCfjpBcIiwgXCLwn46MXCIsIFwi8J+PrlwiLCBcIuKcie+4j1wiLCBcIvCfk6lcIiwgXCLwn5OoXCIsIFwi8J+Tp1wiLCBcIvCfkoxcIiwgXCLwn5OuXCIsIFwi8J+TqlwiLCBcIvCfk6tcIiwgXCLwn5OsXCIsIFwi8J+TrVwiLCBcIvCfk6ZcIiwgXCLwn5OvXCIsIFwi8J+TpVwiLCBcIvCfk6RcIiwgXCLwn5OcXCIsIFwi8J+Tg1wiLCBcIvCfk5FcIiwgXCLwn5OKXCIsIFwi8J+TiFwiLCBcIvCfk4lcIiwgXCLwn5OEXCIsIFwi8J+ThVwiLCBcIvCfk4ZcIiwgXCLwn5eTXCIsIFwi8J+Th1wiLCBcIvCfl4NcIiwgXCLwn5ezXCIsIFwi8J+XhFwiLCBcIvCfk4tcIiwgXCLwn5eSXCIsIFwi8J+TgVwiLCBcIvCfk4JcIiwgXCLwn5eCXCIsIFwi8J+XnlwiLCBcIvCfk7BcIiwgXCLwn5OTXCIsIFwi8J+TlVwiLCBcIvCfk5dcIiwgXCLwn5OYXCIsIFwi8J+TmVwiLCBcIvCfk5RcIiwgXCLwn5OSXCIsIFwi8J+TmlwiLCBcIvCfk5ZcIiwgXCLwn5SXXCIsIFwi8J+TjlwiLCBcIvCflodcIiwgXCLinILvuI9cIiwgXCLwn5OQXCIsIFwi8J+Tj1wiLCBcIvCfk4xcIiwgXCLwn5ONXCIsIFwi8J+aqVwiLCBcIvCfj7NcIiwgXCLwn4+0XCIsIFwi8J+UkFwiLCBcIvCflJJcIiwgXCLwn5STXCIsIFwi8J+Uj1wiLCBcIvCflopcIiwgXCLwn5aLXCIsIFwi4pyS77iPXCIsIFwi8J+TnVwiLCBcIuKcj++4j1wiLCBcIvCflo1cIiwgXCLwn5aMXCIsIFwi8J+UjVwiLCBcIvCflI5cIiwgXCLwn5uRXCIsIFwi8J+bkVwiLCBcIuKdpO+4j1wiLCBcIvCfkptcIiwgXCLwn5KaXCIsIFwi8J+SmVwiLCBcIvCfkpxcIiwgXCLwn5KUXCIsIFwi4p2j77iPXCIsIFwi8J+SlVwiLCBcIvCfkp5cIiwgXCLwn5KTXCIsIFwi8J+Sl1wiLCBcIvCfkpZcIiwgXCLwn5KYXCIsIFwi8J+SnVwiLCBcIvCfkp9cIiwgXCLimK7vuI9cIiwgXCLinJ3vuI9cIiwgXCLimKrvuI9cIiwgXCLwn5WJXCIsIFwi4pi477iPXCIsIFwi4pyh77iPXCIsIFwi8J+Ur1wiLCBcIvCflY5cIiwgXCLimK/vuI9cIiwgXCLimKbvuI9cIiwgXCLwn5uQXCIsIFwi4puOXCIsIFwi4pmI77iPXCIsIFwi4pmJ77iPXCIsIFwi4pmK77iPXCIsIFwi4pmL77iPXCIsIFwi4pmM77iPXCIsIFwi4pmN77iPXCIsIFwi4pmO77iPXCIsIFwi4pmP77iPXCIsIFwi4pmQ77iPXCIsIFwi4pmR77iPXCIsIFwi4pmS77iPXCIsIFwi4pmT77iPXCIsIFwi8J+GlFwiLCBcIuKam1wiLCBcIvCfiLNcIiwgXCLwn4i5XCIsIFwi4pii77iPXCIsIFwi4pij77iPXCIsIFwi8J+TtFwiLCBcIvCfk7NcIiwgXCLwn4i2XCIsIFwi8J+Imu+4j1wiLCBcIvCfiLhcIiwgXCLwn4i6XCIsIFwi8J+It++4j1wiLCBcIuKctO+4j1wiLCBcIvCfhppcIiwgXCLwn4mRXCIsIFwi8J+SrlwiLCBcIvCfiZBcIiwgXCLjipnvuI9cIiwgXCLjipfvuI9cIiwgXCLwn4i0XCIsIFwi8J+ItVwiLCBcIvCfiLJcIiwgXCLwn4Ww77iPXCIsIFwi8J+Fse+4j1wiLCBcIvCfho5cIiwgXCLwn4aRXCIsIFwi8J+Fvu+4j1wiLCBcIvCfhphcIiwgXCLim5TvuI9cIiwgXCLwn5ObXCIsIFwi8J+aq1wiLCBcIuKdjFwiLCBcIuKtle+4j1wiLCBcIvCfkqJcIiwgXCLimajvuI9cIiwgXCLwn5q3XCIsIFwi8J+ar1wiLCBcIvCfmrNcIiwgXCLwn5qxXCIsIFwi8J+UnlwiLCBcIvCfk7VcIiwgXCLinZfvuI9cIiwgXCLinZVcIiwgXCLinZNcIiwgXCLinZRcIiwgXCLigLzvuI9cIiwgXCLigYnvuI9cIiwgXCLwn5KvXCIsIFwi8J+UhVwiLCBcIvCflIZcIiwgXCLwn5SxXCIsIFwi4pqcXCIsIFwi44C977iPXCIsIFwi4pqg77iPXCIsIFwi8J+auFwiLCBcIvCflLBcIiwgXCLimbvvuI9cIiwgXCLwn4iv77iPXCIsIFwi8J+SuVwiLCBcIuKdh++4j1wiLCBcIuKcs++4j1wiLCBcIuKdjlwiLCBcIuKchVwiLCBcIvCfkqBcIiwgXCLwn4yAXCIsIFwi4p6/XCIsIFwi8J+MkFwiLCBcIuKTgu+4j1wiLCBcIvCfj6dcIiwgXCLwn4iC77iPXCIsIFwi8J+bglwiLCBcIvCfm4NcIiwgXCLwn5uEXCIsIFwi8J+bhVwiLCBcIuKZv++4j1wiLCBcIvCfmq1cIiwgXCLwn5q+XCIsIFwi8J+Fv++4j1wiLCBcIvCfmrBcIiwgXCLwn5q5XCIsIFwi8J+aulwiLCBcIvCfmrxcIiwgXCLwn5q7XCIsIFwi8J+arlwiLCBcIvCfjqZcIiwgXCLwn5O2XCIsIFwi8J+IgVwiLCBcIvCfhpZcIiwgXCLwn4aXXCIsIFwi8J+GmVwiLCBcIvCfhpJcIiwgXCLwn4aVXCIsIFwi8J+Gk1wiLCBcIjDvuI/ig6NcIiwgXCIx77iP4oOjXCIsIFwiMu+4j+KDo1wiLCBcIjPvuI/ig6NcIiwgXCI077iP4oOjXCIsIFwiNe+4j+KDo1wiLCBcIjbvuI/ig6NcIiwgXCI377iP4oOjXCIsIFwiOO+4j+KDo1wiLCBcIjnvuI/ig6NcIiwgXCLwn5SfXCIsIFwi8J+UolwiLCBcIuKWtu+4j1wiLCBcIuKPuFwiLCBcIuKPr1wiLCBcIuKPuVwiLCBcIuKPulwiLCBcIuKPrVwiLCBcIuKPrlwiLCBcIuKPqVwiLCBcIuKPqlwiLCBcIvCflIBcIiwgXCLwn5SBXCIsIFwi8J+UglwiLCBcIuKXgO+4j1wiLCBcIvCflLxcIiwgXCLwn5S9XCIsIFwi4o+rXCIsIFwi4o+sXCIsIFwi4p6h77iPXCIsIFwi4qyF77iPXCIsIFwi4qyG77iPXCIsIFwi4qyH77iPXCIsIFwi4oaX77iPXCIsIFwi4oaY77iPXCIsIFwi4oaZ77iPXCIsIFwi4oaW77iPXCIsIFwi4oaV77iPXCIsIFwi4oaU77iPXCIsIFwi8J+UhFwiLCBcIuKGqu+4j1wiLCBcIuKGqe+4j1wiLCBcIuKktO+4j1wiLCBcIuKkte+4j1wiLCBcIiPvuI/ig6NcIiwgXCIq77iP4oOjXCIsIFwi4oS577iPXCIsIFwi8J+UpFwiLCBcIvCflKFcIiwgXCLwn5SgXCIsIFwi8J+Uo1wiLCBcIvCfjrVcIiwgXCLwn462XCIsIFwi44Cw77iPXCIsIFwi4p6wXCIsIFwi4pyU77iPXCIsIFwi8J+Ug1wiLCBcIuKelVwiLCBcIuKellwiLCBcIuKel1wiLCBcIuKclu+4j1wiLCBcIvCfkrJcIiwgXCLwn5KxXCIsIFwiwqnvuI9cIiwgXCLCru+4j1wiLCBcIuKEou+4j1wiLCBcIvCflJpcIiwgXCLwn5SZXCIsIFwi8J+Um1wiLCBcIvCflJ1cIiwgXCLwn5ScXCIsIFwi4piR77iPXCIsIFwi8J+UmFwiLCBcIuKaqu+4j1wiLCBcIuKaq++4j1wiLCBcIvCflLRcIiwgXCLwn5S1XCIsIFwi8J+UuFwiLCBcIvCflLlcIiwgXCLwn5S2XCIsIFwi8J+Ut1wiLCBcIvCflLpcIiwgXCLilqrvuI9cIiwgXCLilqvvuI9cIiwgXCLirJvvuI9cIiwgXCLirJzvuI9cIiwgXCLwn5S7XCIsIFwi4pe877iPXCIsIFwi4pe777iPXCIsIFwi4pe+77iPXCIsIFwi4pe977iPXCIsIFwi8J+UslwiLCBcIvCflLNcIiwgXCLwn5SIXCIsIFwi8J+UiVwiLCBcIvCflIpcIiwgXCLwn5SHXCIsIFwi8J+To1wiLCBcIvCfk6JcIiwgXCLwn5SUXCIsIFwi8J+UlVwiLCBcIvCfg49cIiwgXCLwn4CE77iPXCIsIFwi4pmg77iPXCIsIFwi4pmj77iPXCIsIFwi4pml77iPXCIsIFwi4pmm77iPXCIsIFwi8J+OtFwiLCBcIvCfkYHigI3wn5eoXCIsIFwi8J+SrVwiLCBcIvCfl69cIiwgXCLwn5KsXCIsIFwi8J+VkFwiLCBcIvCflZFcIiwgXCLwn5WSXCIsIFwi8J+Vk1wiLCBcIvCflZRcIiwgXCLwn5WVXCIsIFwi8J+VllwiLCBcIvCflZdcIiwgXCLwn5WYXCIsIFwi8J+VmVwiLCBcIvCflZpcIiwgXCLwn5WbXCIsIFwi8J+VnFwiLCBcIvCflZ1cIiwgXCLwn5WeXCIsIFwi8J+Vn1wiLCBcIvCflaBcIiwgXCLwn5WhXCIsIFwi8J+VolwiLCBcIvCflaNcIiwgXCLwn5WkXCIsIFwi8J+VpVwiLCBcIvCflaZcIiwgXCLwn5WnXCIsIFwi8J+bkVwiLCBcIvCfh6bwn4erXCIsIFwi8J+HpvCfh71cIiwgXCLwn4em8J+HsVwiLCBcIvCfh6nwn4e/XCIsIFwi8J+HpvCfh7hcIiwgXCLwn4em8J+HqVwiLCBcIvCfh6bwn4e0XCIsIFwi8J+HpvCfh65cIiwgXCLwn4em8J+HtlwiLCBcIvCfh6bwn4esXCIsIFwi8J+HpvCfh7dcIiwgXCLwn4em8J+HslwiLCBcIvCfh6bwn4e8XCIsIFwi8J+HpvCfh7pcIiwgXCLwn4em8J+HuVwiLCBcIvCfh6bwn4e/XCIsIFwi8J+Hp/Cfh7hcIiwgXCLwn4en8J+HrVwiLCBcIvCfh6fwn4epXCIsIFwi8J+Hp/Cfh6dcIiwgXCLwn4en8J+HvlwiLCBcIvCfh6fwn4eqXCIsIFwi8J+Hp/Cfh79cIiwgXCLwn4en8J+Hr1wiLCBcIvCfh6fwn4eyXCIsIFwi8J+Hp/Cfh7lcIiwgXCLwn4en8J+HtFwiLCBcIvCfh6fwn4e2XCIsIFwi8J+Hp/Cfh6ZcIiwgXCLwn4en8J+HvFwiLCBcIvCfh6fwn4e3XCIsIFwi8J+HrvCfh7RcIiwgXCLwn4e78J+HrFwiLCBcIvCfh6fwn4ezXCIsIFwi8J+Hp/Cfh6xcIiwgXCLwn4en8J+Hq1wiLCBcIvCfh6fwn4euXCIsIFwi8J+HqPCfh7tcIiwgXCLwn4ew8J+HrVwiLCBcIvCfh6jwn4eyXCIsIFwi8J+HqPCfh6ZcIiwgXCLwn4eu8J+HqFwiLCBcIvCfh7Dwn4e+XCIsIFwi8J+HqPCfh6tcIiwgXCLwn4e58J+HqVwiLCBcIvCfh6jwn4exXCIsIFwi8J+HqPCfh7NcIiwgXCLwn4eo8J+HvVwiLCBcIvCfh6jwn4eoXCIsIFwi8J+HqPCfh7RcIiwgXCLwn4ew8J+HslwiLCBcIvCfh6jwn4esXCIsIFwi8J+HqPCfh6lcIiwgXCLwn4eo8J+HsFwiLCBcIvCfh6jwn4e3XCIsIFwi8J+HrfCfh7dcIiwgXCLwn4eo8J+HulwiLCBcIvCfh6jwn4e8XCIsIFwi8J+HqPCfh75cIiwgXCLwn4eo8J+Hv1wiLCBcIvCfh6nwn4ewXCIsIFwi8J+HqfCfh69cIiwgXCLwn4ep8J+HslwiLCBcIvCfh6nwn4e0XCIsIFwi8J+HqvCfh6hcIiwgXCLwn4eq8J+HrFwiLCBcIvCfh7jwn4e7XCIsIFwi8J+HrPCfh7ZcIiwgXCLwn4eq8J+Ht1wiLCBcIvCfh6rwn4eqXCIsIFwi8J+HqvCfh7lcIiwgXCLwn4eq8J+HulwiLCBcIvCfh6vwn4ewXCIsIFwi8J+Hq/Cfh7RcIiwgXCLwn4er8J+Hr1wiLCBcIvCfh6vwn4euXCIsIFwi8J+Hq/Cfh7dcIiwgXCLwn4es8J+Hq1wiLCBcIvCfh7Xwn4erXCIsIFwi8J+HufCfh6tcIiwgXCLwn4es8J+HplwiLCBcIvCfh6zwn4eyXCIsIFwi8J+HrPCfh6pcIiwgXCLwn4ep8J+HqlwiLCBcIvCfh6zwn4etXCIsIFwi8J+HrPCfh65cIiwgXCLwn4es8J+Ht1wiLCBcIvCfh6zwn4exXCIsIFwi8J+HrPCfh6lcIiwgXCLwn4es8J+HtVwiLCBcIvCfh6zwn4e6XCIsIFwi8J+HrPCfh7lcIiwgXCLwn4es8J+HrFwiLCBcIvCfh6zwn4ezXCIsIFwi8J+HrPCfh7xcIiwgXCLwn4es8J+HvlwiLCBcIvCfh63wn4e5XCIsIFwi8J+HrfCfh7NcIiwgXCLwn4et8J+HsFwiLCBcIvCfh63wn4e6XCIsIFwi8J+HrvCfh7hcIiwgXCLwn4eu8J+Hs1wiLCBcIvCfh67wn4epXCIsIFwi8J+HrvCfh7dcIiwgXCLwn4eu8J+HtlwiLCBcIvCfh67wn4eqXCIsIFwi8J+HrvCfh7JcIiwgXCLwn4eu8J+HsVwiLCBcIvCfh67wn4e5XCIsIFwi8J+HqPCfh65cIiwgXCLwn4ev8J+HslwiLCBcIvCfh6/wn4e1XCIsIFwi8J+Hr/Cfh6pcIiwgXCLwn4ev8J+HtFwiLCBcIvCfh7Dwn4e/XCIsIFwi8J+HsPCfh6pcIiwgXCLwn4ew8J+HrlwiLCBcIvCfh73wn4ewXCIsIFwi8J+HsPCfh7xcIiwgXCLwn4ew8J+HrFwiLCBcIvCfh7Hwn4emXCIsIFwi8J+HsfCfh7tcIiwgXCLwn4ex8J+Hp1wiLCBcIvCfh7Hwn4e4XCIsIFwi8J+HsfCfh7dcIiwgXCLwn4ex8J+HvlwiLCBcIvCfh7Hwn4euXCIsIFwi8J+HsfCfh7lcIiwgXCLwn4ex8J+HulwiLCBcIvCfh7Lwn4e0XCIsIFwi8J+HsvCfh7BcIiwgXCLwn4ey8J+HrFwiLCBcIvCfh7Lwn4e8XCIsIFwi8J+HsvCfh75cIiwgXCLwn4ey8J+Hu1wiLCBcIvCfh7Lwn4exXCIsIFwi8J+HsvCfh7lcIiwgXCLwn4ey8J+HrVwiLCBcIvCfh7Lwn4e2XCIsIFwi8J+HsvCfh7dcIiwgXCLwn4ey8J+HulwiLCBcIvCfh77wn4e5XCIsIFwi8J+HsvCfh71cIiwgXCLwn4er8J+HslwiLCBcIvCfh7Lwn4epXCIsIFwi8J+HsvCfh6hcIiwgXCLwn4ey8J+Hs1wiLCBcIvCfh7Lwn4eqXCIsIFwi8J+HsvCfh7hcIiwgXCLwn4ey8J+HplwiLCBcIvCfh7Lwn4e/XCIsIFwi8J+HsvCfh7JcIiwgXCLwn4ez8J+HplwiLCBcIvCfh7Pwn4e3XCIsIFwi8J+Hs/Cfh7VcIiwgXCLwn4ez8J+HsVwiLCBcIvCfh7Pwn4eoXCIsIFwi8J+Hs/Cfh79cIiwgXCLwn4ez8J+HrlwiLCBcIvCfh7Pwn4eqXCIsIFwi8J+Hs/Cfh6xcIiwgXCLwn4ez8J+HulwiLCBcIvCfh7Pwn4erXCIsIFwi8J+HsvCfh7VcIiwgXCLwn4ew8J+HtVwiLCBcIvCfh7Pwn4e0XCIsIFwi8J+HtPCfh7JcIiwgXCLwn4e18J+HsFwiLCBcIvCfh7Xwn4e8XCIsIFwi8J+HtfCfh7hcIiwgXCLwn4e18J+HplwiLCBcIvCfh7Xwn4esXCIsIFwi8J+HtfCfh75cIiwgXCLwn4e18J+HqlwiLCBcIvCfh7Xwn4etXCIsIFwi8J+HtfCfh7NcIiwgXCLwn4e18J+HsVwiLCBcIvCfh7Xwn4e5XCIsIFwi8J+HtfCfh7dcIiwgXCLwn4e28J+HplwiLCBcIvCfh7fwn4eqXCIsIFwi8J+Ht/Cfh7RcIiwgXCLwn4e38J+HulwiLCBcIvCfh7fwn4e8XCIsIFwi8J+Hp/Cfh7FcIiwgXCLwn4e48J+HrVwiLCBcIvCfh7Dwn4ezXCIsIFwi8J+HsfCfh6hcIiwgXCLwn4e18J+HslwiLCBcIvCfh7vwn4eoXCIsIFwi8J+HvPCfh7hcIiwgXCLwn4e48J+HslwiLCBcIvCfh7jwn4e5XCIsIFwi8J+HuPCfh6ZcIiwgXCLwn4e48J+Hs1wiLCBcIvCfh7fwn4e4XCIsIFwi8J+HuPCfh6hcIiwgXCLwn4e48J+HsVwiLCBcIvCfh7jwn4esXCIsIFwi8J+HuPCfh71cIiwgXCLwn4e48J+HsFwiLCBcIvCfh7jwn4euXCIsIFwi8J+HuPCfh6dcIiwgXCLwn4e48J+HtFwiLCBcIvCfh7/wn4emXCIsIFwi8J+HrPCfh7hcIiwgXCLwn4ew8J+Ht1wiLCBcIvCfh7jwn4e4XCIsIFwi8J+HqvCfh7hcIiwgXCLwn4ex8J+HsFwiLCBcIvCfh7jwn4epXCIsIFwi8J+HuPCfh7dcIiwgXCLwn4e48J+Hv1wiLCBcIvCfh7jwn4eqXCIsIFwi8J+HqPCfh61cIiwgXCLwn4e48J+HvlwiLCBcIvCfh7nwn4e8XCIsIFwi8J+HufCfh69cIiwgXCLwn4e58J+Hv1wiLCBcIvCfh7nwn4etXCIsIFwi8J+HufCfh7FcIiwgXCLwn4e58J+HrFwiLCBcIvCfh7nwn4ewXCIsIFwi8J+HufCfh7RcIiwgXCLwn4e58J+HuVwiLCBcIvCfh7nwn4ezXCIsIFwi8J+HufCfh7dcIiwgXCLwn4e58J+HslwiLCBcIvCfh7nwn4eoXCIsIFwi8J+HufCfh7tcIiwgXCLwn4e68J+HrFwiLCBcIvCfh7rwn4emXCIsIFwi8J+HpvCfh6pcIiwgXCLwn4es8J+Hp1wiLCBcIvCfh7rwn4e4XCIsIFwi8J+Hu/Cfh65cIiwgXCLwn4e68J+HvlwiLCBcIvCfh7rwn4e/XCIsIFwi8J+Hu/Cfh7pcIiwgXCLwn4e78J+HplwiLCBcIvCfh7vwn4eqXCIsIFwi8J+Hu/Cfh7NcIiwgXCLwn4e88J+Hq1wiLCBcIvCfh6rwn4etXCIsIFwi8J+HvvCfh6pcIiwgXCLwn4e/8J+HslwiLCBcIvCfh7/wn4e8XCJdXG5cdGVtb2ppIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHQ8c3ZnIHdpZHRoPScyMHB4JyBoZWlnaHQ9JzIwcHgnIHZpZXdCb3g9JzAgMCAyMCAyMCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHQ8dGl0bGU+RW1vamk8L3RpdGxlPlxuXHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkL0xpZ2h0L0xvd2VyJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNjAuMDAwMDAwLCAtMTgxLjAwMDAwMCknIGZpbGw9JyMwMzAzMDMnPlxuXHRcdFx0XHRcdDxnIGlkPSdCb3R0b20tUm93JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzLjAwMDAwMCwgMTcwLjAwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0PHBhdGggZD0nTTY2Ljc1LDMwLjUgQzcyLjEzNDc3NjMsMzAuNSA3Ni41LDI2LjEzNDc3NjMgNzYuNSwyMC43NSBDNzYuNSwxNS4zNjUyMjM3IDcyLjEzNDc3NjMsMTEgNjYuNzUsMTEgQzYxLjM2NTIyMzcsMTEgNTcsMTUuMzY1MjIzNyA1NywyMC43NSBDNTcsMjYuMTM0Nzc2MyA2MS4zNjUyMjM3LDMwLjUgNjYuNzUsMzAuNSBaIE02Ni43NSwyOS41IEM3MS41ODI0OTE2LDI5LjUgNzUuNSwyNS41ODI0OTE2IDc1LjUsMjAuNzUgQzc1LjUsMTUuOTE3NTA4NCA3MS41ODI0OTE2LDEyIDY2Ljc1LDEyIEM2MS45MTc1MDg0LDEyIDU4LDE1LjkxNzUwODQgNTgsMjAuNzUgQzU4LDI1LjU4MjQ5MTYgNjEuOTE3NTA4NCwyOS41IDY2Ljc1LDI5LjUgWiBNNjMuNzUsMTkgQzY0LjQ0MDM1NTksMTkgNjUsMTguNDQwMzU1OSA2NSwxNy43NSBDNjUsMTcuMDU5NjQ0MSA2NC40NDAzNTU5LDE2LjUgNjMuNzUsMTYuNSBDNjMuMDU5NjQ0MSwxNi41IDYyLjUsMTcuMDU5NjQ0MSA2Mi41LDE3Ljc1IEM2Mi41LDE4LjQ0MDM1NTkgNjMuMDU5NjQ0MSwxOSA2My43NSwxOSBaIE02OS43NSwxOSBDNzAuNDQwMzU1OSwxOSA3MSwxOC40NDAzNTU5IDcxLDE3Ljc1IEM3MSwxNy4wNTk2NDQxIDcwLjQ0MDM1NTksMTYuNSA2OS43NSwxNi41IEM2OS4wNTk2NDQxLDE2LjUgNjguNSwxNy4wNTk2NDQxIDY4LjUsMTcuNzUgQzY4LjUsMTguNDQwMzU1OSA2OS4wNTk2NDQxLDE5IDY5Ljc1LDE5IFogTTU5Ljg4NzYzMzQsMjIuMTY0MTQ0NCBDNTkuNjM5MDMxNiwyMS4zODMxMzQgNjAuMDY1OTE4LDIwLjk3ODUxNTYgNjAuODUzMDk1MSwyMS4yMzI5MzA0IEM2MC44NTMwOTUxLDIxLjIzMjkzMDQgNjMuMDkzNzUwMywyMi4yMTI1IDY2Ljc1MDAwMDEsMjIuMjEyNSBDNzAuNDA2MjQ5OSwyMi4yMTI1IDcyLjY0NjkwNDcsMjEuMjMyOTMwNCA3Mi42NDY5MDQ3LDIxLjIzMjkzMDQgQzczLjQyODcxNjIsMjAuOTY2MjE1MyA3My44ODEyNDYzLDIxLjQwNDQwOTcgNzMuNjA1ODQ3NywyMi4xODA3NDM3IEM3My42MDU4NDc3LDIyLjE4MDc0MzcgNzIuNiwyNy41NzUgNjYuNzUsMjcuNTc1IEM2MC45LDI3LjU3NSA1OS44ODc2MzM0LDIyLjE2NDE0NDQgNTkuODg3NjMzNCwyMi4xNjQxNDQ0IFogTTY2Ljc1LDIzLjE4NzUgQzY0LjA2ODc1LDIzLjE4NzUgNjEuODU0NDA1NSwyMi40NzM3ODIxIDYxLjg1NDQwNTUsMjIuNDczNzgyMSBDNjEuMzI3MzAxOSwyMi4zMjk0OCA2MS4xNzgxMjMzLDIyLjU3MjE2MTUgNjEuNTYzOTU1NSwyMi45NTcwNzUgQzYxLjU2Mzk1NTUsMjIuOTU3MDc1IDYyLjM2MjUsMjQuNjUgNjYuNzUsMjQuNjUgQzcxLjEzNzUsMjQuNjUgNzEuOTUwODUwMywyMi45NDM4MzA0IDcxLjk1MDg1MDMsMjIuOTQzODMwNCBDNzIuMzA5MzY1OSwyMi41Mzk5Mjc4IDcyLjE2OTA3OTMsMjIuMzM1OTg0NCA3MS42MzU0MjczLDIyLjQ3NjM0OSBDNzEuNjM1NDI3MywyMi40NzYzNDkgNjkuNDMxMjUsMjMuMTg3NSA2Ni43NSwyMy4xODc1IFonIGlkPSdFbW9qaSc+PC9wYXRoPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9nPlxuXHRcdDwvc3ZnPlwiXG5cdGRlbGV0ZToge1xuXHRcdG9uIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nMjRweCcgaGVpZ2h0PScxOHB4JyB2aWV3Qm94PScwIDAgMjQgMTgnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0XHQ8dGl0bGU+QmFjazwvdGl0bGU+XG5cdFx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkL0xpZ2h0L1VwcGVyJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMzM5LjAwMDAwMCwgLTEzMC4wMDAwMDApJyBmaWxsPScjMDMwMzAzJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J1RoaXJkLVJvdycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy4wMDAwMDAsIDExOC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMzUxLjY0MjY2MywyMC45Nzc2OTAzIEwzNTQuNDY2Nzk1LDE4LjE1MzU1ODUgQzM1NC43NjAxMDYsMTcuODYwMjQ3NiAzNTQuNzYzOTgzLDE3LjM4MTQ5NjIgMzU0LjQ3MTA5LDE3LjA4ODYwMyBDMzU0LjE3NjE1NSwxNi43OTM2Njc3IDM1My43MDE0LDE2Ljc5NzYzMjggMzUzLjQwNjEzNSwxNy4wOTI4OTgzIEwzNTAuNTgyMDAzLDE5LjkxNzAzMDEgTDM0Ny43NTc4NzEsMTcuMDkyODk4MyBDMzQ3LjQ2NDU2LDE2Ljc5OTU4NzQgMzQ2Ljk4NTgwOSwxNi43OTU3MDk3IDM0Ni42OTI5MTYsMTcuMDg4NjAzIEMzNDYuMzk3OTgsMTcuMzgzNTM4MiAzNDYuNDAxOTQ1LDE3Ljg1ODI5MyAzNDYuNjk3MjExLDE4LjE1MzU1ODUgTDM0OS41MjEzNDMsMjAuOTc3NjkwMyBMMzQ2LjY5NzIxMSwyMy44MDE4MjIgQzM0Ni40MDM5LDI0LjA5NTEzMjkgMzQ2LjQwMDAyMiwyNC41NzM4ODQzIDM0Ni42OTI5MTYsMjQuODY2Nzc3NiBDMzQ2Ljk4Nzg1MSwyNS4xNjE3MTI4IDM0Ny40NjI2MDYsMjUuMTU3NzQ3NyAzNDcuNzU3ODcxLDI0Ljg2MjQ4MjIgTDM1MC41ODIwMDMsMjIuMDM4MzUwNCBMMzUzLjQwNjEzNSwyNC44NjI0ODIyIEMzNTMuNjk5NDQ1LDI1LjE1NTc5MzEgMzU0LjE3ODE5NywyNS4xNTk2NzA4IDM1NC40NzEwOSwyNC44NjY3Nzc2IEMzNTQuNzY2MDI1LDI0LjU3MTg0MjMgMzU0Ljc2MjA2LDI0LjA5NzA4NzUgMzU0LjQ2Njc5NSwyMy44MDE4MjIgTDM1MS42NDI2NjMsMjAuOTc3NjkwMyBaIE0zMzcuMDU5MzQ1LDIyLjA1OTM0NDUgQzMzNi40NzQyODUsMjEuNDc0Mjg0NyAzMzYuNDgxMzUxLDIwLjUxODY0ODkgMzM3LjA1OTM0NSwxOS45NDA2NTU1IEwzNDMuNzg5OTE1LDEzLjIxMDA4NTMgQzM0NC4xODIwODQsMTIuODE3OTE2IDM0NC45NDg5MiwxMi41IDM0NS41MDc0ODQsMTIuNSBMMzU2LjAwMjA5OCwxMi41IEMzNTcuOTMzOTM2LDEyLjUgMzU5LjUsMTQuMDY4ODQ3NyAzNTkuNSwxNi4wMDE3OTgzIEwzNTkuNSwyNS45OTgyMDE3IEMzNTkuNSwyNy45MzIxOTE1IDM1Ny45MjMwODgsMjkuNSAzNTYuMDAyMDk4LDI5LjUgTDM0NS41MDc0ODQsMjkuNSBDMzQ0Ljk1MTA2NiwyOS41IDM0NC4xNzcxNjksMjkuMTc3MTY5MyAzNDMuNzg5OTE1LDI4Ljc4OTkxNDggTDMzNy4wNTkzNDUsMjIuMDU5MzQ0NSBaJyBpZD0nQmFjayc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L3N2Zz5cIlxuXHRcdG9mZiA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0PHN2ZyB3aWR0aD0nMjRweCcgaGVpZ2h0PScxOHB4JyB2aWV3Qm94PScwIDAgMjQgMTgnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0PHRpdGxlPkJhY2s8L3RpdGxlPlxuXHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkL0xpZ2h0L1VwcGVyJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMzM5LjAwMDAwMCwgLTEzMC4wMDAwMDApJyBmaWxsPScjMDMwMzAzJz5cblx0XHRcdFx0XHQ8ZyBpZD0nVGhpcmQtUm93JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzLjAwMDAwMCwgMTE4LjAwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0PHBhdGggZD0nTTMzNy4wNTkzNDUsMjIuMDU5MzQ0NSBDMzM2LjQ3NDI4NSwyMS40NzQyODQ3IDMzNi40ODEzNTEsMjAuNTE4NjQ4OSAzMzcuMDU5MzQ1LDE5Ljk0MDY1NTUgTDM0My43ODk5MTUsMTMuMjEwMDg1MyBDMzQ0LjE4MjA4NCwxMi44MTc5MTYgMzQ0Ljk0ODkyLDEyLjUgMzQ1LjUwNzQ4NCwxMi41IEwzNTYuMDAyMDk4LDEyLjUgQzM1Ny45MzM5MzYsMTIuNSAzNTkuNSwxNC4wNjg4NDc3IDM1OS41LDE2LjAwMTc5ODMgTDM1OS41LDI1Ljk5ODIwMTcgQzM1OS41LDI3LjkzMjE5MTUgMzU3LjkyMzA4OCwyOS41IDM1Ni4wMDIwOTgsMjkuNSBMMzQ1LjUwNzQ4NCwyOS41IEMzNDQuOTUxMDY2LDI5LjUgMzQ0LjE3NzE2OSwyOS4xNzcxNjkzIDM0My43ODk5MTUsMjguNzg5OTE0OCBMMzM3LjA1OTM0NSwyMi4wNTkzNDQ1IFogTTM1MS42NDI2NjMsMjAuOTc3NjkwMyBMMzU0LjQ2Njc5NSwxOC4xNTM1NTg1IEMzNTQuNzYwMTA2LDE3Ljg2MDI0NzYgMzU0Ljc2Mzk4MywxNy4zODE0OTYyIDM1NC40NzEwOSwxNy4wODg2MDMgQzM1NC4xNzYxNTUsMTYuNzkzNjY3NyAzNTMuNzAxNCwxNi43OTc2MzI4IDM1My40MDYxMzUsMTcuMDkyODk4MyBMMzUwLjU4MjAwMywxOS45MTcwMzAxIEwzNDcuNzU3ODcxLDE3LjA5Mjg5ODMgQzM0Ny40NjQ1NiwxNi43OTk1ODc0IDM0Ni45ODU4MDksMTYuNzk1NzA5NyAzNDYuNjkyOTE2LDE3LjA4ODYwMyBDMzQ2LjM5Nzk4LDE3LjM4MzUzODIgMzQ2LjQwMTk0NSwxNy44NTgyOTMgMzQ2LjY5NzIxMSwxOC4xNTM1NTg1IEwzNDkuNTIxMzQzLDIwLjk3NzY5MDMgTDM0Ni42OTcyMTEsMjMuODAxODIyIEMzNDYuNDAzOSwyNC4wOTUxMzI5IDM0Ni40MDAwMjIsMjQuNTczODg0MyAzNDYuNjkyOTE2LDI0Ljg2Njc3NzYgQzM0Ni45ODc4NTEsMjUuMTYxNzEyOCAzNDcuNDYyNjA2LDI1LjE1Nzc0NzcgMzQ3Ljc1Nzg3MSwyNC44NjI0ODIyIEwzNTAuNTgyMDAzLDIyLjAzODM1MDQgTDM1My40MDYxMzUsMjQuODYyNDgyMiBDMzUzLjY5OTQ0NSwyNS4xNTU3OTMxIDM1NC4xNzgxOTcsMjUuMTU5NjcwOCAzNTQuNDcxMDksMjQuODY2Nzc3NiBDMzU0Ljc2NjAyNSwyNC41NzE4NDIzIDM1NC43NjIwNiwyNC4wOTcwODc1IDM1NC40NjY3OTUsMjMuODAxODIyIEwzNTEuNjQyNjYzLDIwLjk3NzY5MDMgWiBNMzM4LjcwOTcyLDIxLjcwOTcxOTUgQzMzOC4zMTc3NTIsMjEuMzE3NzUyMiAzMzguMzE4OTY1LDIwLjY4MTAzNDkgMzM4LjcwOTcyLDIwLjI5MDI4MDUgTDM0NC42NDMyNDUsMTQuMzU2NzU0NyBDMzQ0Ljg0MDI3NiwxNC4xNTk3MjQ1IDM0NS4yMjU2MzksMTQgMzQ1LjQ5Mzc0MSwxNCBMMzU1Ljk5NzIzOSwxNCBDMzU3LjEwMzMzMywxNCAzNTcuOTk5OTk5LDE0Ljg5NzA2MDEgMzU3Ljk5OTk5OSwxNi4wMDU4NTg2IEwzNTcuOTk5OTk5LDI1Ljk5NDE0MTIgQzM1Ny45OTk5OTksMjcuMTAxOTQ2NCAzNTcuMTA2NDU3LDI3Ljk5OTk5OTkgMzU1Ljk5NzIzOSwyNy45OTk5OTk5IEwzNDUuNDkzNzQxLDI4IEMzNDUuMjIxMDU2LDI4IDM0NC44NDA2NDMsMjcuODQwNjQzMSAzNDQuNjQzMjQ2LDI3LjY0MzI0NTMgTDMzOC43MDk3MiwyMS43MDk3MTk1IFonIGlkPSdCYWNrJz48L3BhdGg+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L2c+XG5cdFx0PC9zdmc+XCJcblx0fVxuXHRmb29kIDogIFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScxN3B4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzAgMCAxNyAxNycgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPkZvb2Q8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0naU9TLTktS2V5Ym9hcmRzJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHQ8ZyBpZD0naVBob25lLTYtUG9ydHJhaXQtTGlnaHQtQ29weScgc2tldGNoOnR5cGU9J01TQXJ0Ym9hcmRHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE0OC4wMDAwMDAsIC02MzcuMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmRzJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgNDA4LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8ZyBpZD0nRm9vZCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTQ5LjUwMDAwMCwgMjI5LjUwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J001LjUsMTUuNSBMMSwxNS41IEwwLDUgTDYuNSw1IEw2LjI2MzYwOTMzLDcuNDgyMTAyMDInIGlkPSdEcmluaycgc3Ryb2tlPScjNEE1NDYxJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTYuMDEwNzc1NDUsMS45NjkzMDA5OCBMNi41MTU3MTM1Miw1LjIyMjcwNTM5IEw1LjcxOTA4MTg0LDUuNjc5NDc4MTIgTDUuMDM4OTAwOSwxLjk2OTMwMDk4IEw0Ljg1NTU3MjQ3LDEuOTY5MzAwOTggTDQuODU1NTcyNDcsMC45NjkzMDA5OCBMOC44NTU1NzI0NywwLjk2OTMwMDk4IEw4Ljg1NTU3MjQ3LDEuOTY5MzAwOTggTDYuMDEwNzc1NDUsMS45NjkzMDA5OCBaJyBpZD0nU3RyYXcnIGZpbGw9JyM0QTU0NjEnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDYuODU1NTcyLCAzLjMyNDM5MCkgcm90YXRlKDI0LjAwMDAwMCkgdHJhbnNsYXRlKC02Ljg1NTU3MiwgLTMuMzI0MzkwKSAnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nQm90dG9tLUJ1bicgc3Ryb2tlPScjNEE1NDYxJyB4PSczJyB5PScxNCcgd2lkdGg9JzEwLjUnIGhlaWdodD0nMS41JyByeD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xLjUsMTIuNTAyNDQwOCBDMS41LDExLjk0ODgwOCAxLjk0OTE2OTE2LDExLjUgMi40OTI2ODcyMywxMS41IEwxNC4wMDczMTI4LDExLjUgQzE0LjU1NTU1ODgsMTEuNSAxNSwxMS45NDY5NDk5IDE1LDEyLjUwMjQ0MDggTDE1LDEyLjk5NzU1OTIgQzE1LDEzLjU1MTE5MiAxNC41NTA4MzA4LDE0IDE0LjAwNzMxMjgsMTQgTDIuNDkyNjg3MjMsMTQgQzEuOTQ0NDQxMjEsMTQgMS41LDEzLjU1MzA1MDEgMS41LDEyLjk5NzU1OTIgTDEuNSwxMi41MDI0NDA4IFogTTMuOTMzMDAwMDMsMTEuODM5MjcyNyBDMy40MTc3MTgzNCwxMS42NTE4OTc2IDMuNDQ0ODM2OTcsMTEuNSAzLjk5NTU3NzUsMTEuNSBMMTMuMDA0NDIyNSwxMS41IEMxMy41NTQyNjQ4LDExLjUgMTMuNTg2NjA2MSwxMS42NTAzMjUxIDEzLjA2NywxMS44MzkyNzI3IEw4LjUsMTMuNSBMMy45MzMwMDAwMywxMS44MzkyNzI3IFonIGlkPScmcXVvdDtQYXR0eSZxdW90OycgZmlsbD0nIzRBNTQ2MSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00yLjUsMTAuNSBMMTMuNSwxMC41IEwxNSwxMS41IEwxLDExLjUgTDIuNSwxMC41IFonIGlkPSdDaGVlc2UnIGZpbGw9JyM0QTU0NjEnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNOC4yNSwxMC41IEMxMS40MjU2MzczLDEwLjUgMTQsMTAuMzI4NDI3MSAxNCw5LjUgQzE0LDguNjcxNTcyODggMTEuNDI1NjM3Myw4IDguMjUsOCBDNS4wNzQzNjI2OSw4IDIuNSw4LjY3MTU3Mjg4IDIuNSw5LjUgQzIuNSwxMC4zMjg0MjcxIDUuMDc0MzYyNjksMTAuNSA4LjI1LDEwLjUgWicgaWQ9J1RvcC1CdW4nIHN0cm9rZT0nIzRBNTQ2MScgc3Ryb2tlLXdpZHRoPScwLjc1Jz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdGZsYWdzOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMTFweCcgaGVpZ2h0PScxNXB4JyB2aWV3Qm94PScwIDAgMTEgMTUnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5GbGFnPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J2lPUy05LUtleWJvYXJkcycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02LVBvcnRyYWl0LUxpZ2h0LUNvcHknIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0yNzUuMDAwMDAwLCAtNjM5LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkcycgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDQwOC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J0ZsYWcnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDI3NS4wMDAwMDAsIDIzMS41MDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUG9sZScgZmlsbD0nIzRBNTQ2MScgeD0nMCcgeT0nMCcgd2lkdGg9JzEnIGhlaWdodD0nMTQnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMSwxIEMxLDEgMS4yNSwyIDMuNSwyIEM1Ljc1LDIgNiwwLjc0OTk5OTk5OCA4LDAuNzUgQzEwLDAuNzQ5OTk5OTk4IDEwLDEuNSAxMCwxLjUgTDEwLDcuNSBDMTAsNy41IDEwLDYuNSA4LDYuNSBDNiw2LjUgNC44MDYyMzkxMSw4IDMuNSw4IEMyLjE5Mzc2MDg5LDggMSw3IDEsNyBMMSwxIFonIHN0cm9rZT0nIzRBNTQ2MScgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRmcmVxdWVudDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzE3cHgnIGhlaWdodD0nMTZweCcgdmlld0JveD0nMCAwIDE3IDE2JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+UmVjZW50PC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J2lPUy05LUtleWJvYXJkcycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02LVBvcnRyYWl0LUxpZ2h0LUNvcHknIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC01NS4wMDAwMDAsIC02MzguMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmRzJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgNDA4LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8ZyBpZD0nUmVjZW50JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg1NS41MDAwMDAsIDIzMC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8Y2lyY2xlIGlkPSdCb2R5JyBzdHJva2U9JyM0QTU0NjEnIGN4PSc4JyBjeT0nOCcgcj0nOCc+PC9jaXJjbGU+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTcuNSw3LjUgTDcuNSw4LjUgTDguNSw4LjUgTDguNSwyIEw3LjUsMiBMNy41LDcuNSBMNCw3LjUgTDQsOC41IEw4LjUsOC41IEw4LjUsNy41IEw3LjUsNy41IFonIGlkPSdIYW5kcycgZmlsbD0nIzRBNTQ2MSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRrZXlib2FyZCA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPSczMi41cHgnIGhlaWdodD0nMjMuNXB4JyB2aWV3Qm94PScwIDAgNjUgNDcnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0ICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+XG5cdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHQgICAgPGRlZnM+PC9kZWZzPlxuXHRcdFx0ICAgIDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHRcdFx0ICAgICAgICA8ZyBpZD0naVBhZC1Qb3J0cmFpdCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE0MzYuMDAwMDAwLCAtMTk1Ni4wMDAwMDApJyBmaWxsPScjMDAwMDAwJz5cblx0XHRcdCAgICAgICAgICAgIDxnIGlkPSdLZXlib2FyZC1MaWdodCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDE0MjIuMDAwMDAwKSc+XG5cdFx0XHQgICAgICAgICAgICAgICAgPGcgaWQ9J0tleWJvYXJkLWRvd24nIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE0MTIuMDAwMDAwLCA1MDAuMDAwMDAwKSc+XG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J004Ny4wMDEzMzIsMzQgQzg4LjEwNTE2NTksMzQgODksMzQuODk5NzEyNyA4OSwzNS45OTMyODc0IEw4OSw2MS4wMDY3MTI2IEM4OSw2Mi4xMDc1NzQ4IDg4LjEwNTg3NTksNjMgODcuMDAxMzMyLDYzIEwyNS45OTg2NjgsNjMgQzI0Ljg5NDgzNDEsNjMgMjQsNjIuMTAwMjg3MyAyNCw2MS4wMDY3MTI2IEwyNCwzNS45OTMyODc0IEMyNCwzNC44OTI0MjUyIDI0Ljg5NDEyNDEsMzQgMjUuOTk4NjY4LDM0IEw4Ny4wMDEzMzIsMzQgWiBNMjYsMzYgTDI2LDYxIEw4Nyw2MSBMODcsMzYgTDI2LDM2IFogTTc5LDQwIEw4Myw0MCBMODMsNDQgTDc5LDQ0IEw3OSw0MCBaIE03Miw0MCBMNzYsNDAgTDc2LDQ0IEw3Miw0NCBMNzIsNDAgWiBNNjUsNDAgTDY5LDQwIEw2OSw0NCBMNjUsNDQgTDY1LDQwIFogTTU4LDQwIEw2Miw0MCBMNjIsNDQgTDU4LDQ0IEw1OCw0MCBaIE01MSw0MCBMNTUsNDAgTDU1LDQ0IEw1MSw0NCBMNTEsNDAgWiBNNDQsNDAgTDQ4LDQwIEw0OCw0NCBMNDQsNDQgTDQ0LDQwIFogTTM3LDQwIEw0MSw0MCBMNDEsNDQgTDM3LDQ0IEwzNyw0MCBaIE0zMCw0MCBMMzQsNDAgTDM0LDQ0IEwzMCw0NCBMMzAsNDAgWiBNNzksNDcgTDgzLDQ3IEw4Myw1MSBMNzksNTEgTDc5LDQ3IFogTTcyLDQ3IEw3Niw0NyBMNzYsNTEgTDcyLDUxIEw3Miw0NyBaIE02NSw0NyBMNjksNDcgTDY5LDUxIEw2NSw1MSBMNjUsNDcgWiBNNTgsNDcgTDYyLDQ3IEw2Miw1MSBMNTgsNTEgTDU4LDQ3IFogTTUxLDQ3IEw1NSw0NyBMNTUsNTEgTDUxLDUxIEw1MSw0NyBaIE00NCw0NyBMNDgsNDcgTDQ4LDUxIEw0NCw1MSBMNDQsNDcgWiBNMzcsNDcgTDQxLDQ3IEw0MSw1MSBMMzcsNTEgTDM3LDQ3IFogTTMwLDQ3IEwzNCw0NyBMMzQsNTEgTDMwLDUxIEwzMCw0NyBaIE03OSw1NCBMODMsNTQgTDgzLDU4IEw3OSw1OCBMNzksNTQgWiBNNzIsNTQgTDc2LDU0IEw3Niw1OCBMNzIsNTggTDcyLDU0IFogTTQ0LDU0IEw2OSw1NCBMNjksNTggTDQ0LDU4IEw0NCw1NCBaIE0zNyw1NCBMNDEsNTQgTDQxLDU4IEwzNyw1OCBMMzcsNTQgWiBNMzAsNTQgTDM0LDU0IEwzNCw1OCBMMzAsNTggTDMwLDU0IFogTTQ0LjMxNjM0OTgsNjkuOTc3MTA0NyBDNDMuMzY4NDIyNSw3MC41NDIwMzQyIDQzLjMzMzg3MjEsNzEuNTA5NjQ5NSA0NC4yMzc4MjE3LDcyLjEzNzM5MTIgTDU1LjM2MjE1MzksNzkuODYyNjA4OCBDNTYuMjY2NzExMyw4MC40OTA3NzI2IDU3LjczMzg5NjUsODAuNDkwMzUwNSA1OC42Mzc4NDYxLDc5Ljg2MjYwODggTDY5Ljc2MjE3ODMsNzIuMTM3MzkxMiBDNzAuNjY2NzM1Nyw3MS41MDkyMjc0IDcwLjY0ODAxMiw3MC41MjA1MjA0IDY5LjcxMTUxODcsNjkuOTIzNDE2NiBMNjkuOTgyNTczMSw3MC4wOTYyMzk2IEM2OS41MTgxMzMzLDY5LjgwMDExNSA2OC43NzgyNTU3LDY5LjgxMjY0OTMgNjguMzI2MTMwNyw3MC4xMjY5MzIzIEw1Ny44MTU0OTk5LDc3LjQzMzEyNjMgQzU3LjM2NTExMTcsNzcuNzQ2MjAyIDU2LjYyODE2NSw3Ny43MzgxNzg2IDU2LjE3NjIxMDMsNzcuNDE5OTQyNCBMNDUuODM4NjEzNyw3MC4xNDA4OTc3IEM0NS4zODM2NDcyLDY5LjgyMDU0MDcgNDQuNjM3NTAzOSw2OS43ODU3MDg4IDQ0LjE1NjYzOTMsNzAuMDcyMjg2MiBMNDQuMzE2MzQ5OCw2OS45NzcxMDQ3IFonIGlkPSdTaGFwZSc+PC9wYXRoPlxuXHRcdFx0ICAgICAgICAgICAgICAgIDwvZz5cblx0XHRcdCAgICAgICAgICAgIDwvZz5cblx0XHRcdCAgICAgICAgPC9nPlxuXHRcdFx0ICAgIDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdGtleVBvcFVwOlxuXHRcdGxpZ2h0OlxuXHRcdFx0XCJpcGhvbmUtNVwiIDogXCI8c3ZnIHdpZHRoPSc1NXB4JyBoZWlnaHQ9JzkycHgnIHZpZXdCb3g9JzUzIDMxNiA1NSA5MicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0XHQgICAgPGRlZnM+XG5cdFx0XHRcdFx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci0xJz5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEuNScgaW49J3NoYWRvd09mZnNldE91dGVyMScgcmVzdWx0PSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjQgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMScgcmVzdWx0PSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVNZXJnZT5cblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nU291cmNlR3JhcGhpYyc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0XHQgICAgICAgICAgICA8L2ZlTWVyZ2U+XG5cdFx0XHRcdFx0ICAgICAgICA8L2ZpbHRlcj5cblx0XHRcdFx0XHQgICAgICAgIDxwYXRoIGQ9J00xLjM0MTczMjMxLDQwLjkzOTE3MDEgQzAuNTE3NDY2MTI4LDQwLjIwNTg5IDAsMzkuMTM3NDI1MSAwLDM3Ljk0Nzc2MzUgTDAsNC4wMDM0NTU5OCBDMCwxLjc4OTE3MTM2IDEuNzk1MjgyNDgsMCA0LjAwOTg3NTY2LDAgTDQ0Ljk5MDEyNDMsMCBDNDcuMjEyNTYwOCwwIDQ5LDEuNzkyNDA4MyA0OSw0LjAwMzQ1NTk4IEw0OSwzNy45NDc3NjM1IEM0OSwzOC45MTI0MDUxIDQ4LjY1OTI3OTgsMzkuNzk2MzY1OSA0OC4wOTE2MDQxLDQwLjQ4Njg2NjUgQzQ4LjA0MTQyMzMsNDAuOTAzMjI4OSA0Ny43MTExODg4LDQxLjQwNzQ2NzIgNDcuMDgyNTkwOCw0MS45NTIyNSBDNDcuMDgyNTkwOCw0MS45NTIyNSAzOC41Mjk5MTQ1LDQ5LjA2NDMzNjIgMzguNTI5OTE0NSw1MS4xNTI2NDI0IEMzOC41Mjk5MTQ1LDYxLjY0OTc1NjEgMzguMTc3MDA5OSw4Mi4wMDI1NDA2IDM4LjE3NzAwOTksODIuMDAyNTQwNiBDMzguMTQxMjMwNCw4NC4yMDI0MzU0IDM2LjMyMTAyODQsODYgMzQuMTEyODQ5NSw4NiBMMTUuMzA1OTUzOSw4NiBDMTMuMTA3OTYsODYgMTEuMjc4MTg4NCw4NC4yMTAwNzg5IDExLjI0MTc5MzYsODIuMDAyMDk5MyBDMTEuMjQxNzkzNiw4Mi4wMDIwOTkzIDEwLjg4ODg4ODksNjEuNjQ3MDg1MiAxMC44ODg4ODg5LDUxLjE0ODYzNjEgQzEwLjg4ODg4ODksNDkuMDYxNjY1NCAyLjM0MTQzNjYyLDQyLjIzODY1NSAyLjM0MTQzNjYyLDQyLjIzODY1NSBDMS43NzgyNzMxMSw0MS43NjQxMzY1IDEuNDQ4ODEzNTQsNDEuMzIwNDIzNyAxLjM0MTczMjMxLDQwLjkzOTE3MDEgWicgaWQ9J3BhdGgtMic+PC9wYXRoPlxuXHRcdFx0XHRcdCAgICAgICAgPG1hc2sgaWQ9J21hc2stMycgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPSc0OScgaGVpZ2h0PSc4NicgZmlsbD0nd2hpdGUnPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdFx0ICAgICAgICA8L21hc2s+XG5cdFx0XHRcdFx0ICAgIDwvZGVmcz5cblx0XHRcdFx0XHQgICAgPGcgaWQ9J1BvcG92ZXInIGZpbHRlcj0ndXJsKCNmaWx0ZXItMSknIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDU2LjAwMDAwMCwgMzE4LjAwMDAwMCknPlxuXHRcdFx0XHRcdCAgICAgICAgPHVzZSBpZD0nUmVjdGFuZ2xlLTE0JyBzdHJva2U9JyNCMkI0QjknIG1hc2s9J3VybCgjbWFzay0zKScgZmlsbD0nI0ZDRkNGQycgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdFx0ICAgIDwvZz5cblx0XHRcdFx0XHQ8L3N2Zz5cIlxuXHRcdFx0XCJpcGhvbmUtNnNcIiA6IFwiPHN2ZyB3aWR0aD0nNjRweCcgaGVpZ2h0PScxMDdweCcgdmlld0JveD0nMjQgMzg3IDY0IDEwNycgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0XHQgICAgPGRlZnM+XG5cdFx0XHRcdFx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci0xJz5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEuNScgaW49J3NoYWRvd09mZnNldE91dGVyMScgcmVzdWx0PSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjQgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMScgcmVzdWx0PSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVNZXJnZT5cblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nU291cmNlR3JhcGhpYyc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0XHQgICAgICAgICAgICA8L2ZlTWVyZ2U+XG5cdFx0XHRcdFx0ICAgICAgICA8L2ZpbHRlcj5cblx0XHRcdFx0XHQgICAgICAgIDxwYXRoIGQ9J00xLjQ4NjQ3NjQ2LDQ4LjM3Nzk5NDcgQzAuNTgwMjY2NDksNDcuNjQ2NDI5NiAwLDQ2LjUyOTU4NyAwLDQ1LjI3ODE5NDggTDAsMy45OTAwOTc4NyBDMCwxLjc4MjU5MTIgMS43OTUwOTU3NywwIDQuMDA5NDU4NjIsMCBMNTMuOTkwNTQxNCwwIEM1Ni4yMDA1NzQ2LDAgNTgsMS43ODY0Mjc2NyA1OCwzLjk5MDA5Nzg3IEw1OCw0NS4yNzgxOTQ4IEM1OCw0Ni4xODMzMDA0IDU3LjY5ODIyNTgsNDcuMDE2OTczMyA1Ny4xODk1MDk3LDQ3LjY4NTYzMjUgQzU3LjAzOTY4NjUsNDguMDIxMjQ5NyA1Ni43MzYwMDk4LDQ4LjM5NzI4MzQgNTYuMjcxODM2Myw0OC43OTUwNjYxIEM1Ni4yNzE4MzYzLDQ4Ljc5NTA2NjEgNDUuNjA2ODM3Niw1Ny42MjIwNjkzIDQ1LjYwNjgzNzYsNjAuMDc0NjE0OSBDNDUuNjA2ODM3Niw3Mi40MDI2MjA1IDQ1LjE3Nzk2Nyw5Ni45OTIzMTY0IDQ1LjE3Nzk2Nyw5Ni45OTIzMTY0IEM0NS4xNDEzNzQ4LDk5LjIxMjIyMTQgNDMuMzE5MzA2NSwxMDEgNDEuMTA5MDAzNSwxMDEgTDE3LjM4NjcyMywxMDEgQzE1LjE4MTI3MjIsMTAxIDEzLjM1NDY4Myw5OS4yMDU1MDA5IDEzLjMxNzc1OTUsOTYuOTkxODc0MSBDMTMuMzE3NzU5NSw5Ni45OTE4NzQxIDEyLjg4ODg4ODksNzIuMzk5NDgzOCAxMi44ODg4ODg5LDYwLjA2OTkwOTkgQzEyLjg4ODg4ODksNTcuNjE4OTMyNiAyLjIyNjczNDM3LDQ5LjE0NjI5MzYgMi4yMjY3MzQzNyw0OS4xNDYyOTM2IEMxLjkwNTI0MDg3LDQ4Ljg3ODgzMjcgMS42NTkxMTY1NSw0OC42MjA3MzMgMS40ODY0NzY0Niw0OC4zNzc5OTQ3IFonIGlkPSdwYXRoLTInPjwvcGF0aD5cblx0XHRcdFx0XHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTMnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nNTgnIGhlaWdodD0nMTAxJyBmaWxsPSd3aGl0ZSc+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0XHQgICAgICAgIDwvbWFzaz5cblx0XHRcdFx0XHQgICAgPC9kZWZzPlxuXHRcdFx0XHRcdCAgICA8ZyBpZD0nUG9wb3ZlcicgZmlsdGVyPSd1cmwoI2ZpbHRlci0xKScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjcuMDAwMDAwLCAzODkuMDAwMDAwKSc+XG5cdFx0XHRcdFx0ICAgICAgICA8dXNlIGlkPSdSZWN0YW5nbGUtMTQnIHN0cm9rZT0nI0IyQjRCOScgbWFzaz0ndXJsKCNtYXNrLTMpJyBmaWxsPScjRkNGQ0ZDJyB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0XHQgICAgPC9nPlxuXHRcdFx0XHRcdDwvc3ZnPlwiXG5cdFx0XHRcImlwaG9uZS02cy1wbHVzXCIgOiBcIjxzdmcgd2lkdGg9JzcwcHgnIGhlaWdodD0nMTE5cHgnIHZpZXdCb3g9JzI4IDQ1MCA3MCAxMTknIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdFx0ICAgIDxkZWZzPlxuXHRcdFx0XHRcdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItMSc+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScxLjUnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC40IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnIHJlc3VsdD0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlTWVyZ2U+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J1NvdXJjZUdyYXBoaWMnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPC9mZU1lcmdlPlxuXHRcdFx0XHRcdCAgICAgICAgPC9maWx0ZXI+XG5cdFx0XHRcdFx0ICAgICAgICA8cGF0aCBkPSdNMS45NTcyOTM5NSw1NC4wNzI4MzA0IEMwLjc4NTkxMTEzMiw1My4zNzU3Njk5IDAsNTIuMDk4Nzc2IDAsNTAuNjM4OTAyMiBMMCwzLjk5NTI0NDE5IEMwLDEuNzg2NzE0MjggMS43OTI0MjIwMiwwIDQuMDAzNDg2NjMsMCBMNTkuOTk2NTEzNCwwIEM2Mi4yMDQ2MjM1LDAgNjQsMS43ODg3MzE3NSA2NCwzLjk5NTI0NDE5IEw2NCw1MC42Mzg5MDIyIEM2NCw1MS45MjMzNjg2IDYzLjM5MzcxMTYsNTMuMDY1MTU1NiA2Mi40NTEzOTEsNTMuNzk1NzU0IEM2Mi40NDI3NzUyLDUzLjgwMzI0MzMgNjIuNDM0MTAxOSw1My44MTA3NDA0IDYyLjQyNTM3MDksNTMuODE4MjQ1NCBDNjIuNDI1MzcwOSw1My44MTgyNDU0IDUwLjMyNDc4NjMsNjMuODk3NzQwMiA1MC4zMjQ3ODYzLDY2LjYxNzM5NDcgQzUwLjMyNDc4NjMsODAuMjg4MDU0NCA0OS44NDQzMDQ5LDEwOC4wMDIwMDcgNDkuODQ0MzA0OSwxMDguMDAyMDA3IEM0OS44MDc5NjY1LDExMC4yMTAyMzQgNDcuOTg3NDIzMiwxMTIgNDUuNzc4OTA4OSwxMTIgTDE4Ljc2ODA5OTcsMTEyIEMxNi41NTM0Mzk3LDExMiAxNC43Mzk0NDU2LDExMC4yMDk4NCAxNC43MDI3MDM3LDEwOC4wMDE1NjYgQzE0LjcwMjcwMzcsMTA4LjAwMTU2NiAxNC4yMjIyMjIyLDgwLjI4NDU3NjEgMTQuMjIyMjIyMiw2Ni42MTIxNzczIEMxNC4yMjIyMjIyLDYzLjg5NDI2MTkgMi4xNDA4MTQyMiw1NC4yMzIxMzM3IDIuMTQwODE0MjIsNTQuMjMyMTMzNyBDMi4wNzY2NDkxMyw1NC4xNzg2Mjk4IDIuMDE1NDgxMTEsNTQuMTI1NTEzNCAxLjk1NzI5Mzk1LDU0LjA3MjgzMDQgWicgaWQ9J3BhdGgtMic+PC9wYXRoPlxuXHRcdFx0XHRcdCAgICAgICAgPG1hc2sgaWQ9J21hc2stMycgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPSc2NCcgaGVpZ2h0PScxMTInIGZpbGw9J3doaXRlJz5cblx0XHRcdFx0XHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHRcdCAgICAgICAgPC9tYXNrPlxuXHRcdFx0XHRcdCAgICA8L2RlZnM+XG5cdFx0XHRcdFx0ICAgIDxnIGlkPSdQb3BvdmVyJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTEpJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzMS4wMDAwMDAsIDQ1Mi4wMDAwMDApJz5cblx0XHRcdFx0XHQgICAgICAgIDx1c2UgaWQ9J1JlY3RhbmdsZS0xNCcgc3Ryb2tlPScjQjJCNEI5JyBtYXNrPSd1cmwoI21hc2stMyknIGZpbGw9JyNGQ0ZDRkMnIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHRcdCAgICA8L2c+XG5cdFx0XHRcdFx0PC9zdmc+XCJcblx0XHRkYXJrOlxuXHRcdFx0XCJpcGhvbmUtNVwiIDogXCI8c3ZnIHdpZHRoPSc1NXB4JyBoZWlnaHQ9JzkycHgnIHZpZXdCb3g9JzUzIDMxNiA1NSA5MicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0XHQgICAgPGRlZnM+XG5cdFx0XHRcdFx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci0xJz5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEuNScgaW49J3NoYWRvd09mZnNldE91dGVyMScgcmVzdWx0PSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjQgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMScgcmVzdWx0PSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVNZXJnZT5cblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nU291cmNlR3JhcGhpYyc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0XHQgICAgICAgICAgICA8L2ZlTWVyZ2U+XG5cdFx0XHRcdFx0ICAgICAgICA8L2ZpbHRlcj5cblx0XHRcdFx0XHQgICAgICAgIDxwYXRoIGQ9J00xLjM0MTczMjMxLDQwLjkzOTE3MDEgQzAuNTE3NDY2MTI4LDQwLjIwNTg5IDAsMzkuMTM3NDI1MSAwLDM3Ljk0Nzc2MzUgTDAsNC4wMDM0NTU5OCBDMCwxLjc4OTE3MTM2IDEuNzk1MjgyNDgsMCA0LjAwOTg3NTY2LDAgTDQ0Ljk5MDEyNDMsMCBDNDcuMjEyNTYwOCwwIDQ5LDEuNzkyNDA4MyA0OSw0LjAwMzQ1NTk4IEw0OSwzNy45NDc3NjM1IEM0OSwzOC45MTI0MDUxIDQ4LjY1OTI3OTgsMzkuNzk2MzY1OSA0OC4wOTE2MDQxLDQwLjQ4Njg2NjUgQzQ4LjA0MTQyMzMsNDAuOTAzMjI4OSA0Ny43MTExODg4LDQxLjQwNzQ2NzIgNDcuMDgyNTkwOCw0MS45NTIyNSBDNDcuMDgyNTkwOCw0MS45NTIyNSAzOC41Mjk5MTQ1LDQ5LjA2NDMzNjIgMzguNTI5OTE0NSw1MS4xNTI2NDI0IEMzOC41Mjk5MTQ1LDYxLjY0OTc1NjEgMzguMTc3MDA5OSw4Mi4wMDI1NDA2IDM4LjE3NzAwOTksODIuMDAyNTQwNiBDMzguMTQxMjMwNCw4NC4yMDI0MzU0IDM2LjMyMTAyODQsODYgMzQuMTEyODQ5NSw4NiBMMTUuMzA1OTUzOSw4NiBDMTMuMTA3OTYsODYgMTEuMjc4MTg4NCw4NC4yMTAwNzg5IDExLjI0MTc5MzYsODIuMDAyMDk5MyBDMTEuMjQxNzkzNiw4Mi4wMDIwOTkzIDEwLjg4ODg4ODksNjEuNjQ3MDg1MiAxMC44ODg4ODg5LDUxLjE0ODYzNjEgQzEwLjg4ODg4ODksNDkuMDYxNjY1NCAyLjM0MTQzNjYyLDQyLjIzODY1NSAyLjM0MTQzNjYyLDQyLjIzODY1NSBDMS43NzgyNzMxMSw0MS43NjQxMzY1IDEuNDQ4ODEzNTQsNDEuMzIwNDIzNyAxLjM0MTczMjMxLDQwLjkzOTE3MDEgWicgaWQ9J3BhdGgtMic+PC9wYXRoPlxuXHRcdFx0XHRcdCAgICAgICAgPG1hc2sgaWQ9J21hc2stMycgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPSc0OScgaGVpZ2h0PSc4NicgZmlsbD0nd2hpdGUnPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdFx0ICAgICAgICA8L21hc2s+XG5cdFx0XHRcdFx0ICAgIDwvZGVmcz5cblx0XHRcdFx0XHQgICAgPGcgaWQ9J1BvcG92ZXInIGZpbHRlcj0ndXJsKCNmaWx0ZXItMSknIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDU2LjAwMDAwMCwgMzE4LjAwMDAwMCknPlxuXHRcdFx0XHRcdCAgICAgICAgPHVzZSBpZD0nUmVjdGFuZ2xlLTE0JyBzdHJva2U9JyM2MzYzNjMnIG1hc2s9J3VybCgjbWFzay0zKScgZmlsbD0nIzYzNjM2MycgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdFx0ICAgIDwvZz5cblx0XHRcdFx0XHQ8L3N2Zz5cIlxuXHRcdFx0XCJpcGhvbmUtNnNcIiA6IFwiPHN2ZyB3aWR0aD0nNjRweCcgaGVpZ2h0PScxMDdweCcgdmlld0JveD0nMjQgMzg3IDY0IDEwNycgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0XHQgICAgPGRlZnM+XG5cdFx0XHRcdFx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci0xJz5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEuNScgaW49J3NoYWRvd09mZnNldE91dGVyMScgcmVzdWx0PSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjQgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMScgcmVzdWx0PSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVNZXJnZT5cblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nU291cmNlR3JhcGhpYyc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0XHQgICAgICAgICAgICA8L2ZlTWVyZ2U+XG5cdFx0XHRcdFx0ICAgICAgICA8L2ZpbHRlcj5cblx0XHRcdFx0XHQgICAgICAgIDxwYXRoIGQ9J00xLjQ4NjQ3NjQ2LDQ4LjM3Nzk5NDcgQzAuNTgwMjY2NDksNDcuNjQ2NDI5NiAwLDQ2LjUyOTU4NyAwLDQ1LjI3ODE5NDggTDAsMy45OTAwOTc4NyBDMCwxLjc4MjU5MTIgMS43OTUwOTU3NywwIDQuMDA5NDU4NjIsMCBMNTMuOTkwNTQxNCwwIEM1Ni4yMDA1NzQ2LDAgNTgsMS43ODY0Mjc2NyA1OCwzLjk5MDA5Nzg3IEw1OCw0NS4yNzgxOTQ4IEM1OCw0Ni4xODMzMDA0IDU3LjY5ODIyNTgsNDcuMDE2OTczMyA1Ny4xODk1MDk3LDQ3LjY4NTYzMjUgQzU3LjAzOTY4NjUsNDguMDIxMjQ5NyA1Ni43MzYwMDk4LDQ4LjM5NzI4MzQgNTYuMjcxODM2Myw0OC43OTUwNjYxIEM1Ni4yNzE4MzYzLDQ4Ljc5NTA2NjEgNDUuNjA2ODM3Niw1Ny42MjIwNjkzIDQ1LjYwNjgzNzYsNjAuMDc0NjE0OSBDNDUuNjA2ODM3Niw3Mi40MDI2MjA1IDQ1LjE3Nzk2Nyw5Ni45OTIzMTY0IDQ1LjE3Nzk2Nyw5Ni45OTIzMTY0IEM0NS4xNDEzNzQ4LDk5LjIxMjIyMTQgNDMuMzE5MzA2NSwxMDEgNDEuMTA5MDAzNSwxMDEgTDE3LjM4NjcyMywxMDEgQzE1LjE4MTI3MjIsMTAxIDEzLjM1NDY4Myw5OS4yMDU1MDA5IDEzLjMxNzc1OTUsOTYuOTkxODc0MSBDMTMuMzE3NzU5NSw5Ni45OTE4NzQxIDEyLjg4ODg4ODksNzIuMzk5NDgzOCAxMi44ODg4ODg5LDYwLjA2OTkwOTkgQzEyLjg4ODg4ODksNTcuNjE4OTMyNiAyLjIyNjczNDM3LDQ5LjE0NjI5MzYgMi4yMjY3MzQzNyw0OS4xNDYyOTM2IEMxLjkwNTI0MDg3LDQ4Ljg3ODgzMjcgMS42NTkxMTY1NSw0OC42MjA3MzMgMS40ODY0NzY0Niw0OC4zNzc5OTQ3IFonIGlkPSdwYXRoLTInPjwvcGF0aD5cblx0XHRcdFx0XHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTMnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nNTgnIGhlaWdodD0nMTAxJyBmaWxsPSd3aGl0ZSc+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0XHQgICAgICAgIDwvbWFzaz5cblx0XHRcdFx0XHQgICAgPC9kZWZzPlxuXHRcdFx0XHRcdCAgICA8ZyBpZD0nUG9wb3ZlcicgZmlsdGVyPSd1cmwoI2ZpbHRlci0xKScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjcuMDAwMDAwLCAzODkuMDAwMDAwKSc+XG5cdFx0XHRcdFx0ICAgICAgICA8dXNlIGlkPSdSZWN0YW5nbGUtMTQnIHN0cm9rZT0nIyM2MzYzNjMnIG1hc2s9J3VybCgjbWFzay0zKScgZmlsbD0nIzYzNjM2MycgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdFx0ICAgIDwvZz5cblx0XHRcdFx0XHQ8L3N2Zz5cIlxuXHRcdFx0XCJpcGhvbmUtNnMtcGx1c1wiIDogXCI8c3ZnIHdpZHRoPSc3MHB4JyBoZWlnaHQ9JzExOXB4JyB2aWV3Qm94PScyOCA0NTAgNzAgMTE5JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHRcdCAgICA8ZGVmcz5cblx0XHRcdFx0XHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTEnPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzEnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMS41JyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJyByZXN1bHQ9J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuNCAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dCbHVyT3V0ZXIxJyByZXN1bHQ9J3NoYWRvd01hdHJpeE91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZU1lcmdlPlxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J3NoYWRvd01hdHJpeE91dGVyMSc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdTb3VyY2VHcmFwaGljJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDwvZmVNZXJnZT5cblx0XHRcdFx0XHQgICAgICAgIDwvZmlsdGVyPlxuXHRcdFx0XHRcdCAgICAgICAgPHBhdGggZD0nTTEuOTU3MjkzOTUsNTQuMDcyODMwNCBDMC43ODU5MTExMzIsNTMuMzc1NzY5OSAwLDUyLjA5ODc3NiAwLDUwLjYzODkwMjIgTDAsMy45OTUyNDQxOSBDMCwxLjc4NjcxNDI4IDEuNzkyNDIyMDIsMCA0LjAwMzQ4NjYzLDAgTDU5Ljk5NjUxMzQsMCBDNjIuMjA0NjIzNSwwIDY0LDEuNzg4NzMxNzUgNjQsMy45OTUyNDQxOSBMNjQsNTAuNjM4OTAyMiBDNjQsNTEuOTIzMzY4NiA2My4zOTM3MTE2LDUzLjA2NTE1NTYgNjIuNDUxMzkxLDUzLjc5NTc1NCBDNjIuNDQyNzc1Miw1My44MDMyNDMzIDYyLjQzNDEwMTksNTMuODEwNzQwNCA2Mi40MjUzNzA5LDUzLjgxODI0NTQgQzYyLjQyNTM3MDksNTMuODE4MjQ1NCA1MC4zMjQ3ODYzLDYzLjg5Nzc0MDIgNTAuMzI0Nzg2Myw2Ni42MTczOTQ3IEM1MC4zMjQ3ODYzLDgwLjI4ODA1NDQgNDkuODQ0MzA0OSwxMDguMDAyMDA3IDQ5Ljg0NDMwNDksMTA4LjAwMjAwNyBDNDkuODA3OTY2NSwxMTAuMjEwMjM0IDQ3Ljk4NzQyMzIsMTEyIDQ1Ljc3ODkwODksMTEyIEwxOC43NjgwOTk3LDExMiBDMTYuNTUzNDM5NywxMTIgMTQuNzM5NDQ1NiwxMTAuMjA5ODQgMTQuNzAyNzAzNywxMDguMDAxNTY2IEMxNC43MDI3MDM3LDEwOC4wMDE1NjYgMTQuMjIyMjIyMiw4MC4yODQ1NzYxIDE0LjIyMjIyMjIsNjYuNjEyMTc3MyBDMTQuMjIyMjIyMiw2My44OTQyNjE5IDIuMTQwODE0MjIsNTQuMjMyMTMzNyAyLjE0MDgxNDIyLDU0LjIzMjEzMzcgQzIuMDc2NjQ5MTMsNTQuMTc4NjI5OCAyLjAxNTQ4MTExLDU0LjEyNTUxMzQgMS45NTcyOTM5NSw1NC4wNzI4MzA0IFonIGlkPSdwYXRoLTInPjwvcGF0aD5cblx0XHRcdFx0XHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTMnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nNjQnIGhlaWdodD0nMTEyJyBmaWxsPSd3aGl0ZSc+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0XHQgICAgICAgIDwvbWFzaz5cblx0XHRcdFx0XHQgICAgPC9kZWZzPlxuXHRcdFx0XHRcdCAgICA8ZyBpZD0nUG9wb3ZlcicgZmlsdGVyPSd1cmwoI2ZpbHRlci0xKScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMzEuMDAwMDAwLCA0NTIuMDAwMDAwKSc+XG5cdFx0XHRcdFx0ICAgICAgICA8dXNlIGlkPSdSZWN0YW5nbGUtMTQnIHN0cm9rZT0nIzYzNjM2MycgbWFzaz0ndXJsKCNtYXNrLTMpJyBmaWxsPScjNjM2MzYzJyB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0XHQgICAgPC9nPlxuXHRcdFx0XHRcdDwvc3ZnPlwiXG5cblx0b2JqZWN0cyA6XG5cdFx0XCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nMTFweCcgaGVpZ2h0PScxNnB4JyB2aWV3Qm94PScwIDAgMTEgMTYnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5MaWdodGJ1bGI8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHQ8ZyBpZD0naVBob25lLTYnIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0yNDQuMDAwMDAwLCAtNjM5LjAwMDAwMCknIHN0cm9rZT0nIzRBNTM2MSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nTGlnaHRidWxiJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgyNDQuMDAwMDAwLCA2MzkuMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J004LDEwLjQwMDI5MDQgQzkuNzgwODM3OTUsOS40ODk5MzQ5MSAxMSw3LjYzNzM0MjczIDExLDUuNSBDMTEsMi40NjI0MzM4OCA4LjUzNzU2NjEyLDAgNS41LDAgQzIuNDYyNDMzODgsMCAwLDIuNDYyNDMzODggMCw1LjUgQzAsNy42MzczNDI3MyAxLjIxOTE2MjA1LDkuNDg5OTM0OTEgMywxMC40MDAyOTA0IEwzLDE0LjAwMjA4NjkgQzMsMTUuMTAxNzM5NCAzLjg5NzYxNjAyLDE2IDUuMDA0ODgxNSwxNiBMNS45OTUxMTg1LDE2IEM3LjEwNjEwMDIsMTYgOCwxNS4xMDU1MDM4IDgsMTQuMDAyMDg2OSBMOCwxMC40MDAyOTA0IFonIGlkPSdPdmFsLTE3JyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdSZWN0YW5nbGUtNTAnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIHg9JzMnIHk9JzEyJyB3aWR0aD0nNScgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdSZWN0YW5nbGUtNTEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIHg9JzQnIHk9JzEzLjUnIHdpZHRoPScxLjUnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNSw4LjUgQzUsOC41IDMuNDk5OTk5OTksNy41MDAwMDAwMSA0LDcgQzQuNTAwMDAwMDEsNi40OTk5OTk5OSA1LDcuNjY2NjY2NjcgNS41LDggQzUuNSw4IDYuNSw2LjUwMDAwMDAxIDcsNyBDNy41LDcuNDk5OTk5OTkgNiw4LjUgNiw4LjUgTDYsMTEgTDUsMTEgTDUsOC41IFonIGlkPSdSZWN0YW5nbGUtNTInIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPjwvcGF0aD5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdHNoaWZ0IDoge1xuXHRcdG9uIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nMjBweCcgaGVpZ2h0PScxOHB4JyB2aWV3Qm94PScwIDAgMjAgMTcnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0XHQ8dGl0bGU+U2hpZnQ8L3RpdGxlPlxuXHRcdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdLZXlib2FyZC9MaWdodC9VcHBlcicgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE0LjAwMDAwMCwgLTEzMC4wMDAwMDApJyBmaWxsPScjMDMwMzAzJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J1RoaXJkLVJvdycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy4wMDAwMDAsIDExOC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMjEuNzA1MjM4OCwxMy4yMDUyMzg4IEMyMS4zMTU3NDYyLDEyLjgxNTc0NjIgMjAuNjg1NzU1OSwxMi44MTQyNDQxIDIwLjI5NDc2MTIsMTMuMjA1MjM4OCBMMTEuOTE2MDc2NywyMS41ODM5MjMzIEMxMS4xMzM5OTkxLDIyLjM2NjAwMDkgMTEuMzk4MjYwNiwyMyAxMi40OTc5MTMxLDIzIEwxNi41LDIzIEwxNi41LDI4LjAwOTIyMiBDMTYuNSwyOC41NTY0MTM2IDE2Ljk0NjMxMTQsMjkgMTcuNDk3NTQ0NiwyOSBMMjQuNTAyNDU1NCwyOSBDMjUuMDUzMzg0LDI5IDI1LjUsMjguNTQ5MDI0OCAyNS41LDI4LjAwOTIyMiBMMjUuNSwyMyBMMjkuNTAyMDg2OSwyMyBDMzAuNjA1NTAzOCwyMyAzMC44NjY4MjQsMjIuMzY2ODI0IDMwLjA4MzkyMzMsMjEuNTgzOTIzMyBMMjEuNzA1MjM4OCwxMy4yMDUyMzg4IFonIGlkPSdTaGlmdCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L3N2Zz5cIlxuXHRcdG9mZiA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0PHN2ZyB3aWR0aD0nMjBweCcgaGVpZ2h0PScxOHB4JyB2aWV3Qm94PScwIDAgMjAgMTknIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0PHRpdGxlPlNoaWZ0PC90aXRsZT5cblx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdDxnIGlkPSdLZXlib2FyZC9MaWdodC9Mb3dlcicgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE0LjAwMDAwMCwgLTEyOS4wMDAwMDApJyBmaWxsPScjMDMwMzAzJz5cblx0XHRcdFx0XHQ8ZyBpZD0nVGhpcmQtUm93JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzLjAwMDAwMCwgMTE4LjAwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0PHBhdGggZD0nTTIxLjY3MTkwMDgsMTIuMjMyNTg5OCBDMjEuMzAxMDMyLDExLjgyNzk5MTYgMjAuNjk0Njg5MiwxMS44MzM0NzMxIDIwLjMyODgxOTUsMTIuMjMyNTg5OCBMMTEuNjk0NzAyMywyMS42NTEyOTgzIEMxMC43NTg3NDQxLDIyLjY3MjMwOCAxMS4xMjg1NTQxLDIzLjUgMTIuNTA5Nzc1MSwyMy41IEwxNS45OTk5OTk5LDIzLjUwMDAwMDIgTDE1Ljk5OTk5OTksMjguMDAxNDI0MSBDMTUuOTk5OTk5OSwyOC44MjkwNjQ4IDE2LjY3MTY1NTksMjkuNTAwMDAwMSAxNy40OTcxMDEsMjkuNTAwMDAwMSBMMjQuNTAyODk5MiwyOS41MDAwMDAxIEMyNS4zMjk3MjUzLDI5LjUwMDAwMDEgMjYuMDAwMDAwMywyOC44MzQ5NzAzIDI2LjAwMDAwMDMsMjguMDAxNDI0MSBMMjYuMDAwMDAwMywyMy41MDAwMDAxIEwyOS40OTAyMjUxLDIzLjUwMDAwMDIgQzMwLjg3NjMzNTcsMjMuNTAwMDAwMiAzMS4yNDM5NTIxLDIyLjY3NTE5MTYgMzAuMzA1NDE2MSwyMS42NTEyOTg1IEwyMS42NzE5MDA4LDEyLjIzMjU4OTggWiBNMjEuMzQxNzQ4LDE0LjM2NDUzMTYgQzIxLjE1MzAwNTYsMTQuMTYzMjA2NCAyMC44NDMzNTE1LDE0LjE2NzA5MTQgMjAuNjU4MjUxNCwxNC4zNjQ1MzE2IEwxMy41LDIxLjk5OTk5OTggTDE3LjUwMDAwMDEsMjEuOTk5OTk5OSBMMTcuNTAwMDAwMiwyNy41MDg5OTU2IEMxNy41MDAwMDAyLDI3Ljc4MDE3MDMgMTcuNzMyOTAyNywyOC4wMDAwMDA4IDE4LjAwMzQyMjksMjguMDAwMDAwOCBMMjMuOTk2NTc3LDI4LjAwMDAwMDggQzI0LjI3NDYwOTcsMjguMDAwMDAwOCAyNC40OTk5OTk3LDI3Ljc3MjEyMDMgMjQuNDk5OTk5NywyNy41MDg5OTU2IEwyNC40OTk5OTk3LDIxLjk5OTk5OTkgTDI4LjUsMjEuOTk5OTk5OSBMMjEuMzQxNzQ4LDE0LjM2NDUzMTYgWicgaWQ9J1NoaWZ0Jz48L3BhdGg+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L2c+XG5cdFx0PC9zdmc+XCJcblx0fVxuXHRtZXNzYWdlc19hcHA6XCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0PHN2ZyB3aWR0aD0nNjBweCcgaGVpZ2h0PSc2MHB4JyB2aWV3Qm94PScwIDAgNjAgNjAnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDM5LjEgKDMxNzIwKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0ICAgIDx0aXRsZT5NZXNzYWdlcyBDb3B5PC90aXRsZT5cblx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHQgICAgPGRlZnM+XG5cdCAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSc1MCUnIHkxPScwJScgeDI9JzUwJScgeTI9JzEwMCUnIGlkPSdsaW5lYXJHcmFkaWVudC0xJz5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nIzY2RkQ3Ricgb2Zmc2V0PScwJSc+PC9zdG9wPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjMDlCODI2JyBvZmZzZXQ9JzEwMCUnPjwvc3RvcD5cblx0ICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuXHQgICAgPC9kZWZzPlxuXHQgICAgPGcgaWQ9J2lPUy1LaXQnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHQgICAgICAgIDxnIGlkPSdIb21lLVNjcmVlbicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE0NTIuMDAwMDAwLCAtODUzLjAwMDAwMCknPlxuXHQgICAgICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS02cy1QbHVzJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxNDE3LjAwMDAwMCwgODEyLjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgPGcgaWQ9J01lc3NhZ2VzLUNvcHknIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDM1LjAwMDAwMCwgNDEuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J0JHJyBmaWxsPSd1cmwoI2xpbmVhckdyYWRpZW50LTEpJyB4PScwJyB5PScwJyB3aWR0aD0nNjAnIGhlaWdodD0nNjAnIHJ4PScxNCc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J00xOS40MjIzOTc2LDQ0LjMwODgwMDYgQzEzLjE2NjQyMjgsNDEuMTM0ODk0OSA5LDM1LjQ2NTU0MjEgOSwyOSBDOSwxOS4wNTg4NzQ1IDE4Ljg0OTczNTUsMTEgMzEsMTEgQzQzLjE1MDI2NDUsMTEgNTMsMTkuMDU4ODc0NSA1MywyOSBDNTMsMzguOTQxMTI1NSA0My4xNTAyNjQ1LDQ3IDMxLDQ3IEMyOC42OTk0NTg4LDQ3IDI2LjQ4MTM5MTQsNDYuNzExMDg5NyAyNC4zOTcwNDA5LDQ2LjE3NTE5NTMgQzIzLjk0NDI2NTMsNDYuODgzODE0MyAyMS45MDY1Mzc3LDQ5LjUgMTYuNSw0OS41IEMxNS42MTUwMTg3LDQ5LjUgMTcuMTgzNDc0OSw0OC41OTE1OTIxIDE4LDQ3LjUgQzE4Ljc4OTQyODYsNDYuNDQ0NjMyNiAxOS4yNTA1NjI1LDQ0Ljk0ODAzNjIgMTkuNDIyMzk3Niw0NC4zMDg4MDA2IFonIGlkPSdCdWJibGUnIGZpbGw9JyNGRkZGRkYnPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgIDwvZz5cblx0ICAgIDwvZz5cblx0PC9zdmc+XCJcblx0Y2FsZW5kYXJfYXBwOlwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdDxzdmcgd2lkdGg9JzYwcHgnIGhlaWdodD0nNjBweCcgdmlld0JveD0nMCAwIDYwIDYwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdCAgICA8dGl0bGU+Q2FsZW5kYXI8L3RpdGxlPlxuXHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdCAgICA8ZGVmcz48L2RlZnM+XG5cdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0ICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS1TRScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTkyLjAwMDAwMCwgLTI3LjAwMDAwMCknPlxuXHQgICAgICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS02cy1Db3B5JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMjcuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICA8ZyBpZD0nQ2FsZW5kYXInIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDkyLjAwMDAwMCwgMC4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nQkcnIGZpbGw9JyNGRkZGRkYnIHg9JzAnIHk9JzAnIHdpZHRoPSc2MCcgaGVpZ2h0PSc2MCcgcng9JzE0Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHRleHQgaWQ9JzI1JyBmb250LWZhbWlseT0nU0ZVSURpc3BsYXktVWx0cmFsaWdodCwgU0YgVUkgRGlzcGxheScgZm9udC1zaXplPSc0MCcgZm9udC13ZWlnaHQ9JzIwMCcgbGV0dGVyLXNwYWNpbmc9JzAuMzc5OTk5OTk1JyBmaWxsPScjMDAwMDAwJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHRzcGFuIHg9JzcuMTA4MjgxMjUnIHk9JzQ5Jz4yNTwvdHNwYW4+XG5cdCAgICAgICAgICAgICAgICAgICAgPC90ZXh0PlxuXHQgICAgICAgICAgICAgICAgICAgIDx0ZXh0IGlkPSdNb25kYXknIGZvbnQtZmFtaWx5PSdTRlVJRGlzcGxheS1NZWRpdW0sIFNGIFVJIERpc3BsYXknIGZvbnQtc2l6ZT0nMTEnIGZvbnQtd2VpZ2h0PSc0MDAnIGxldHRlci1zcGFjaW5nPScwLjM3OTk5OTk5NScgZmlsbD0nI0ZGM0IzMCc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx0c3BhbiB4PSc5LjAyOTkyMTg5JyB5PScxNSc+TW9uZGF5PC90c3Bhbj5cblx0ICAgICAgICAgICAgICAgICAgICA8L3RleHQ+XG5cdCAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICA8L2c+XG5cdCAgICA8L2c+XG5cdDwvc3ZnPlwiXG5cdHBob3Rvc19hcHA6XCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0PHN2ZyB3aWR0aD0nNjBweCcgaGVpZ2h0PSc2MHB4JyB2aWV3Qm94PScwIDAgNjAgNjAnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDM5LjEgKDMxNzIwKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0ICAgIDx0aXRsZT5QaG90b3M8L3RpdGxlPlxuXHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdCAgICA8ZGVmcz48L2RlZnM+XG5cdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0ICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS1TRScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE2OC4wMDAwMDAsIC0yNy4wMDAwMDApJz5cblx0ICAgICAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtNnMtQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDI3LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgPGcgaWQ9J1Bob3RvcycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTY4LjAwMDAwMCwgMC4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nQkcnIGZpbGw9JyNGRkZGRkYnIHg9JzAnIHk9JzAnIHdpZHRoPSc2MCcgaGVpZ2h0PSc2MCcgcng9JzE0Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J1BlZGFsJyBmaWxsPScjRjI2RTY0JyBzdHlsZT0nbWl4LWJsZW5kLW1vZGU6IG11bHRpcGx5OycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjAuMTQyMTM2LCAyMC4xNDIxMzYpIHJvdGF0ZSg0NS4wMDAwMDApIHRyYW5zbGF0ZSgtMjAuMTQyMTM2LCAtMjAuMTQyMTM2KSAnIHg9JzguMTQyMTM1NjInIHk9JzEyLjE0MjEzNTYnIHdpZHRoPScyNCcgaGVpZ2h0PScxNicgcng9JzgnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nUGVkYWwnIGZpbGw9JyNGMEUyMkEnIHN0eWxlPSdtaXgtYmxlbmQtbW9kZTogbXVsdGlwbHk7JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzOS4xNDIxMzYsIDE5LjE0MjEzNikgcm90YXRlKDEzNS4wMDAwMDApIHRyYW5zbGF0ZSgtMzkuMTQyMTM2LCAtMTkuMTQyMTM2KSAnIHg9JzI3LjE0MjEzNTYnIHk9JzExLjE0MjEzNTYnIHdpZHRoPScyNCcgaGVpZ2h0PScxNicgcng9JzgnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nUGVkYWwnIGZpbGw9JyNEMjg4QjEnIHN0eWxlPSdtaXgtYmxlbmQtbW9kZTogbXVsdGlwbHk7JyB4PSc0JyB5PScyMicgd2lkdGg9JzI0JyBoZWlnaHQ9JzE2JyByeD0nOCc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSdQZWRhbCcgZmlsbD0nI0ZCQUQzMScgc3R5bGU9J21peC1ibGVuZC1tb2RlOiBtdWx0aXBseTsnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMwLjAwMDAwMCwgMTYuMDAwMDAwKSByb3RhdGUoOTAuMDAwMDAwKSB0cmFuc2xhdGUoLTMwLjAwMDAwMCwgLTE2LjAwMDAwMCkgJyB4PScxOCcgeT0nOCcgd2lkdGg9JzI0JyBoZWlnaHQ9JzE2JyByeD0nOCc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSdQZWRhbCcgZmlsbD0nI0E1OEVDMicgc3R5bGU9J21peC1ibGVuZC1tb2RlOiBtdWx0aXBseTsnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDIwLjE0MjEzNiwgNDAuMTQyMTM2KSBzY2FsZSgxLCAtMSkgcm90YXRlKDQ1LjAwMDAwMCkgdHJhbnNsYXRlKC0yMC4xNDIxMzYsIC00MC4xNDIxMzYpICcgeD0nOC4xNDIxMzU2MicgeT0nMzIuMTQyMTM1Nicgd2lkdGg9JzI0JyBoZWlnaHQ9JzE2JyByeD0nOCc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSdQZWRhbCcgZmlsbD0nIzZDQzE5OScgc3R5bGU9J21peC1ibGVuZC1tb2RlOiBtdWx0aXBseTsnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDQwLjE0MjEzNiwgNDAuMTQyMTM2KSBzY2FsZSgxLCAtMSkgcm90YXRlKDEzNS4wMDAwMDApIHRyYW5zbGF0ZSgtNDAuMTQyMTM2LCAtNDAuMTQyMTM2KSAnIHg9JzI4LjE0MjEzNTYnIHk9JzMyLjE0MjEzNTYnIHdpZHRoPScyNCcgaGVpZ2h0PScxNicgcng9JzgnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nUGVkYWwnIGZpbGw9JyM3N0FFREQnIHN0eWxlPSdtaXgtYmxlbmQtbW9kZTogbXVsdGlwbHk7JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzMC4wMDAwMDAsIDQ0LjAwMDAwMCkgc2NhbGUoMSwgLTEpIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtMzAuMDAwMDAwLCAtNDQuMDAwMDAwKSAnIHg9JzE4JyB5PSczNicgd2lkdGg9JzI0JyBoZWlnaHQ9JzE2JyByeD0nOCc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSdQZWRhbCcgZmlsbD0nI0I1RDY1NScgc3R5bGU9J21peC1ibGVuZC1tb2RlOiBtdWx0aXBseTsnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDQ0LjAwMDAwMCwgMzAuMDAwMDAwKSByb3RhdGUoMTgwLjAwMDAwMCkgdHJhbnNsYXRlKC00NC4wMDAwMDAsIC0zMC4wMDAwMDApICcgeD0nMzInIHk9JzIyJyB3aWR0aD0nMjQnIGhlaWdodD0nMTYnIHJ4PSc4Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICA8L2c+XG5cdCAgICA8L2c+XG5cdDwvc3ZnPlwiXG5cdGNhbWVyYV9hcHA6XCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0PHN2ZyB3aWR0aD0nNjBweCcgaGVpZ2h0PSc2MHB4JyB2aWV3Qm94PScwIDAgNjAgNjAnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDM5LjEgKDMxNzIwKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0ICAgIDx0aXRsZT5DYW1lcmE8L3RpdGxlPlxuXHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdCAgICA8ZGVmcz5cblx0ICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9JzUwJScgeTE9JzAlJyB4Mj0nNTAlJyB5Mj0nMTAwJScgaWQ9J2xpbmVhckdyYWRpZW50LTEnPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjREJERERFJyBvZmZzZXQ9JzAlJz48L3N0b3A+XG5cdCAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9JyM4OThCOTEnIG9mZnNldD0nMTAwJSc+PC9zdG9wPlxuXHQgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG5cdCAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSc1MCUnIHkxPScwJScgeDI9JzUwJScgeTI9JzEwMCUnIGlkPSdsaW5lYXJHcmFkaWVudC0yJz5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nIzQ3NDc0Nycgb2Zmc2V0PScwJSc+PC9zdG9wPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjMkIyQjJCJyBvZmZzZXQ9JzEwMCUnPjwvc3RvcD5cblx0ICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuXHQgICAgICAgIDxwYXRoIGQ9J005LDIwIEw1MSwyMCBMNTEsNDIgTDksNDIgTDksMjAgWiBNOSw0Mi45OTc1NzIyIEM5LDQ0LjM3OTU4NzcgMTAuMTE5OTY1Myw0NS41IDExLjUwMTUxMjUsNDUuNSBMNDguNDk4NDg3NSw0NS41IEM0OS44NzY2MDE1LDQ1LjUgNTEsNDQuMzc5NjI0OSA1MSw0Mi45OTc1NzIyIEw1MSw0Mi41IEw5LDQyLjUgTDksNDIuOTk3NTcyMiBaIE05LDE5LjUgTDksMTkuMDAyNDI3OCBDOSwxNy42MjAzNzUxIDEwLjEyMzM5ODUsMTYuNSAxMS41MDE1MTI1LDE2LjUgTDE3LjUzMDQ0OTYsMTYuNSBDMTguNDU3MjAxMSwxNi40MTgwMTg2IDE5LjMyMTgyMDgsMTYuMjQxNjMxMyAxOS45MjA1MzIyLDE1Ljg5MDI1ODggQzIxLjgzMjY0MjUsMTQuNzY4MDc3MiAyMS45NjQxMTEzLDExLjUgMjQuOTk2MjA1LDExLjUgTDMwLjAyNjA4MywxMS41IEwzNS4wNTU5NjExLDExLjUgQzM4LjA4ODA1NDgsMTEuNSAzOC4yMTk1MjM2LDE0Ljc2ODA3NzIgNDAuMTMxNjMzOSwxNS44OTAyNTg4IEM0MC43MzAzNDUzLDE2LjI0MTYzMTMgNDEuNTk0OTY1LDE2LjQxODAxODYgNDIuNTIxNzE2NSwxNi41IEw0OC40OTg0ODc1LDE2LjUgQzQ5Ljg4MDAzNDcsMTYuNSA1MSwxNy42MjA0MTIzIDUxLDE5LjAwMjQyNzggTDUxLDE5LjUgTDksMTkuNSBMOSwxOS41IFogTTM5LjI1LDMxIEMzOS4yNSwyNS44OTEzNjYxIDM1LjEwODYzMzksMjEuNzUgMzAsMjEuNzUgQzI0Ljg5MTM2NjEsMjEuNzUgMjAuNzUsMjUuODkxMzY2MSAyMC43NSwzMSBDMjAuNzUsMzYuMTA4NjMzOSAyNC44OTEzNjYxLDQwLjI1IDMwLDQwLjI1IEMzNS4xMDg2MzM5LDQwLjI1IDM5LjI1LDM2LjEwODYzMzkgMzkuMjUsMzEgTDM5LjI1LDMxIFogTTIyLjI1LDMxIEMyMi4yNSwyNi43MTk3OTMyIDI1LjcxOTc5MzIsMjMuMjUgMzAsMjMuMjUgQzM0LjI4MDIwNjgsMjMuMjUgMzcuNzUsMjYuNzE5NzkzMiAzNy43NSwzMSBDMzcuNzUsMzUuMjgwMjA2OCAzNC4yODAyMDY4LDM4Ljc1IDMwLDM4Ljc1IEMyNS43MTk3OTMyLDM4Ljc1IDIyLjI1LDM1LjI4MDIwNjggMjIuMjUsMzEgTDIyLjI1LDMxIFonIGlkPSdwYXRoLTMnPjwvcGF0aD5cblx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci00Jz5cblx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDEgICAwIDAgMCAwIDEgICAwIDAgMCAwIDEgIDAgMCAwIDAuNSAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci01Jz5cblx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd0JsdXJJbm5lcjEnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzEnIGluPSdzaGFkb3dCbHVySW5uZXIxJyByZXN1bHQ9J3NoYWRvd09mZnNldElubmVyMSc+PC9mZU9mZnNldD5cblx0ICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSdzaGFkb3dPZmZzZXRJbm5lcjEnIGluMj0nU291cmNlQWxwaGEnIG9wZXJhdG9yPSdhcml0aG1ldGljJyBrMj0nLTEnIGszPScxJyByZXN1bHQ9J3NoYWRvd0lubmVySW5uZXIxJz48L2ZlQ29tcG9zaXRlPlxuXHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4zIDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0lubmVySW5uZXIxJyByZXN1bHQ9J3NoYWRvd01hdHJpeElubmVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScwLjUnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dCbHVySW5uZXIyJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nc2hhZG93Qmx1cklubmVyMicgcmVzdWx0PSdzaGFkb3dPZmZzZXRJbm5lcjInPjwvZmVPZmZzZXQ+XG5cdCAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0nc2hhZG93T2Zmc2V0SW5uZXIyJyBpbjI9J1NvdXJjZUFscGhhJyBvcGVyYXRvcj0nYXJpdGhtZXRpYycgazI9Jy0xJyBrMz0nMScgcmVzdWx0PSdzaGFkb3dJbm5lcklubmVyMic+PC9mZUNvbXBvc2l0ZT5cblx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMyAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dJbm5lcklubmVyMicgcmVzdWx0PSdzaGFkb3dNYXRyaXhJbm5lcjInPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMC41JyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93Qmx1cklubmVyMyc+PC9mZUdhdXNzaWFuQmx1cj5cblx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMCcgaW49J3NoYWRvd0JsdXJJbm5lcjMnIHJlc3VsdD0nc2hhZG93T2Zmc2V0SW5uZXIzJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49J3NoYWRvd09mZnNldElubmVyMycgaW4yPSdTb3VyY2VBbHBoYScgb3BlcmF0b3I9J2FyaXRobWV0aWMnIGsyPSctMScgazM9JzEnIHJlc3VsdD0nc2hhZG93SW5uZXJJbm5lcjMnPjwvZmVDb21wb3NpdGU+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjMgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93SW5uZXJJbm5lcjMnIHJlc3VsdD0nc2hhZG93TWF0cml4SW5uZXIzJz48L2ZlQ29sb3JNYXRyaXg+XG5cdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzAuNScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd0JsdXJJbm5lcjQnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nLTAnIGR5PScwJyBpbj0nc2hhZG93Qmx1cklubmVyNCcgcmVzdWx0PSdzaGFkb3dPZmZzZXRJbm5lcjQnPjwvZmVPZmZzZXQ+XG5cdCAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0nc2hhZG93T2Zmc2V0SW5uZXI0JyBpbjI9J1NvdXJjZUFscGhhJyBvcGVyYXRvcj0nYXJpdGhtZXRpYycgazI9Jy0xJyBrMz0nMScgcmVzdWx0PSdzaGFkb3dJbm5lcklubmVyNCc+PC9mZUNvbXBvc2l0ZT5cblx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMyAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dJbm5lcklubmVyNCcgcmVzdWx0PSdzaGFkb3dNYXRyaXhJbm5lcjQnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICAgICAgPGZlTWVyZ2U+XG5cdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J3NoYWRvd01hdHJpeElubmVyMSc+PC9mZU1lcmdlTm9kZT5cblx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nc2hhZG93TWF0cml4SW5uZXIyJz48L2ZlTWVyZ2VOb2RlPlxuXHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdzaGFkb3dNYXRyaXhJbm5lcjMnPjwvZmVNZXJnZU5vZGU+XG5cdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J3NoYWRvd01hdHJpeElubmVyNCc+PC9mZU1lcmdlTm9kZT5cblx0ICAgICAgICAgICAgPC9mZU1lcmdlPlxuXHQgICAgICAgIDwvZmlsdGVyPlxuXHQgICAgICAgIDxwYXRoIGQ9J00xMywxNS4yNSBDMTMsMTQuODM1Nzg2NCAxMy4zMzU1OTQ3LDE0LjUgMTMuNzUwODM3OCwxNC41IEwxNS43NDkxNjIyLDE0LjUgQzE2LjE2MzgzODUsMTQuNSAxNi41LDE0LjgzMjg5ODYgMTYuNSwxNS4yNSBMMTYuNSwxNiBMMTMsMTYgTDEzLDE1LjI1IEwxMywxNS4yNSBaJyBpZD0ncGF0aC02Jz48L3BhdGg+XG5cdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItNyc+XG5cdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzAnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAxICAgMCAwIDAgMCAxICAgMCAwIDAgMCAxICAwIDAgMCAwLjUgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdCAgICAgICAgPC9maWx0ZXI+XG5cdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItOCc+XG5cdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzEnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRJbm5lcjEnPjwvZmVPZmZzZXQ+XG5cdCAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0nc2hhZG93T2Zmc2V0SW5uZXIxJyBpbjI9J1NvdXJjZUFscGhhJyBvcGVyYXRvcj0nYXJpdGhtZXRpYycgazI9Jy0xJyBrMz0nMScgcmVzdWx0PSdzaGFkb3dJbm5lcklubmVyMSc+PC9mZUNvbXBvc2l0ZT5cblx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuNSAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dJbm5lcklubmVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHQgICAgICAgIDwvZmlsdGVyPlxuXHQgICAgICAgIDxjaXJjbGUgaWQ9J3BhdGgtOScgY3g9JzM5LjUnIGN5PScyMycgcj0nMSc+PC9jaXJjbGU+XG5cdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItMTAnPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScwJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC41IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHQgICAgICAgIDwvZmlsdGVyPlxuXHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTExJz5cblx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMC41JyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93Qmx1cklubmVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMCcgaW49J3NoYWRvd0JsdXJJbm5lcjEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0SW5uZXIxJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49J3NoYWRvd09mZnNldElubmVyMScgaW4yPSdTb3VyY2VBbHBoYScgb3BlcmF0b3I9J2FyaXRobWV0aWMnIGsyPSctMScgazM9JzEnIHJlc3VsdD0nc2hhZG93SW5uZXJJbm5lcjEnPjwvZmVDb21wb3NpdGU+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjMgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93SW5uZXJJbm5lcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgIDwvZGVmcz5cblx0ICAgIDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHQgICAgICAgIDxnIGlkPSdIb21lLVNjcmVlbi3igKItaVBob25lLVNFJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMjQ0LjAwMDAwMCwgLTI3LjAwMDAwMCknPlxuXHQgICAgICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS02cy1Db3B5JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMjcuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICA8ZyBpZD0nQ2FtZXJhJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgyNDQuMDAwMDAwLCAwLjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdpY29uJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTM5LjA4MTUsMCBDNDUuMTA1LDAgNDguMTE2LDAgNTEuMzU4NSwxLjAyNSBDNTQuODk4NSwyLjMxMzUgNTcuNjg2NSw1LjEwMTUgNTguOTc1LDguNjQxNSBDNjAsMTEuODgzNSA2MCwxNC44OTU1IDYwLDIwLjkxODUgTDYwLDM5LjA4MTUgQzYwLDQ1LjEwNSA2MCw0OC4xMTYgNTguOTc1LDUxLjM1ODUgQzU3LjY4NjUsNTQuODk4NSA1NC44OTg1LDU3LjY4NjUgNTEuMzU4NSw1OC45NzQ1IEM0OC4xMTYsNjAgNDUuMTA1LDYwIDM5LjA4MTUsNjAgTDIwLjkxODUsNjAgQzE0Ljg5NSw2MCAxMS44ODM1LDYwIDguNjQxNSw1OC45NzQ1IEM1LjEwMTUsNTcuNjg2NSAyLjMxMzUsNTQuODk4NSAxLjAyNSw1MS4zNTg1IEMwLDQ4LjExNiAwLDQ1LjEwNSAwLDM5LjA4MTUgTDAsMjAuOTE4NSBDMCwxNC44OTU1IDAsMTEuODgzNSAxLjAyNSw4LjY0MTUgQzIuMzEzNSw1LjEwMTUgNS4xMDE1LDIuMzEzNSA4LjY0MTUsMS4wMjUgQzExLjg4MzUsMCAxNC44OTUsMCAyMC45MTg1LDAgTDM5LjA4MTUsMCBaJyBpZD0nSWNvbicgZmlsbD0ndXJsKCNsaW5lYXJHcmFkaWVudC0xKSc+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nQ2FtZXJhJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMScgZmlsdGVyPSd1cmwoI2ZpbHRlci00KScgeGxpbms6aHJlZj0nI3BhdGgtMyc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J3VybCgjbGluZWFyR3JhZGllbnQtMiknIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtMyc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItNSknIHhsaW5rOmhyZWY9JyNwYXRoLTMnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdQYXRoJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMScgZmlsdGVyPSd1cmwoI2ZpbHRlci03KScgeGxpbms6aHJlZj0nI3BhdGgtNic+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J3VybCgjbGluZWFyR3JhZGllbnQtMiknIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtNic+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItOCknIHhsaW5rOmhyZWY9JyNwYXRoLTYnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdPdmFsLTE2Jz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMScgZmlsdGVyPSd1cmwoI2ZpbHRlci0xMCknIHhsaW5rOmhyZWY9JyNwYXRoLTknPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPScjRkZDMjA5JyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHhsaW5rOmhyZWY9JyNwYXRoLTknPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSdibGFjaycgZmlsbC1vcGFjaXR5PScxJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTExKScgeGxpbms6aHJlZj0nI3BhdGgtOSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICA8L2c+XG5cdCAgICA8L2c+XG5cdDwvc3ZnPlwiXG5cdHdlYXRoZXJfYXBwOlwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdDxzdmcgd2lkdGg9JzYwcHgnIGhlaWdodD0nNjBweCcgdmlld0JveD0nMCAwIDYwIDYwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdCAgICA8dGl0bGU+V2VhbHRoZXI8L3RpdGxlPlxuXHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdCAgICA8ZGVmcz5cblx0ICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9JzUwJScgeTE9JzAlJyB4Mj0nNTAlJyB5Mj0nMTAwJScgaWQ9J2xpbmVhckdyYWRpZW50LTEnPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjMUQ2MkYwJyBvZmZzZXQ9JzAlJz48L3N0b3A+XG5cdCAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9JyMxOUQ1RkQnIG9mZnNldD0nMTAwJSc+PC9zdG9wPlxuXHQgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG5cdCAgICA8L2RlZnM+XG5cdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0ICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS1TRScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE2LjAwMDAwMCwgLTExNS4wMDAwMDApJz5cblx0ICAgICAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtNnMtQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDI3LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgPGcgaWQ9J1dlYWx0aGVyJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxNi4wMDAwMDAsIDg4LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J00zOS4wODE1LDAgQzQ1LjEwNSwwIDQ4LjExNiwwIDUxLjM1ODUsMS4wMjUgQzU0Ljg5ODUsMi4zMTM1IDU3LjY4NjUsNS4xMDE1IDU4Ljk3NSw4LjY0MTUgQzYwLDExLjg4MzUgNjAsMTQuODk1NSA2MCwyMC45MTg1IEw2MCwzOS4wODE1IEM2MCw0NS4xMDUgNjAsNDguMTE2IDU4Ljk3NSw1MS4zNTg1IEM1Ny42ODY1LDU0Ljg5ODUgNTQuODk4NSw1Ny42ODY1IDUxLjM1ODUsNTguOTc0NSBDNDguMTE2LDYwIDQ1LjEwNSw2MCAzOS4wODE1LDYwIEwyMC45MTg1LDYwIEMxNC44OTUsNjAgMTEuODgzNSw2MCA4LjY0MTUsNTguOTc0NSBDNS4xMDE1LDU3LjY4NjUgMi4zMTM1LDU0Ljg5ODUgMS4wMjUsNTEuMzU4NSBDMCw0OC4xMTYgMCw0NS4xMDUgMCwzOS4wODE1IEwwLDIwLjkxODUgQzAsMTQuODk1NSAwLDExLjg4MzUgMS4wMjUsOC42NDE1IEMyLjMxMzUsNS4xMDE1IDUuMTAxNSwyLjMxMzUgOC42NDE1LDEuMDI1IEMxMS44ODM1LDAgMTQuODk1LDAgMjAuOTE4NSwwIEwzOS4wODE1LDAgWicgaWQ9J0JHJyBmaWxsPSd1cmwoI2xpbmVhckdyYWRpZW50LTEpJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0nU3VuJyBmaWxsPScjRkZEODAwJyBjeD0nMTkuNzUnIGN5PScyNC4yNScgcj0nMTEuMjUnPjwvY2lyY2xlPlxuXHQgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J000MS41LDQzLjk5NjY4NyBDNDYuNDkzMDYyNSw0My44NjQyMDM1IDUwLjUsMzkuNzc1MDM3IDUwLjUsMzQuNzUgQzUwLjUsMjkuNjQxMzY2MSA0Ni4zNTg2MzM5LDI1LjUgNDEuMjUsMjUuNSBDNDEuMDU3NDU0OSwyNS41IDQwLjg2NjI4MzgsMjUuNTA1ODgzIDQwLjY3NjY1NjcsMjUuNTE3NDc5MSBDMzkuMDA0MzM1MywyMS40MDE4ODg5IDM0Ljk2NjA1MzksMTguNSAzMC4yNSwxOC41IEMyNC4wMzY3OTY2LDE4LjUgMTksMjMuNTM2Nzk2NiAxOSwyOS43NSBDMTksMzAuMDM5MTkxNSAxOS4wMTA5MTE3LDMwLjMyNTgzNDQgMTkuMDMyMzQ2LDMwLjYwOTUzOTUgQzE1Ljg4NTYyNDQsMzEuMTgyODE1NyAxMy41LDMzLjkzNzgxMTYgMTMuNSwzNy4yNSBDMTMuNSw0MC44OTQyMjQyIDE2LjM4NzkwMDIsNDMuODYzOTQzMSAyMCw0My45OTU0NTYyIEwyMCw0NCBMNDEuNSw0NCBMNDEuNSw0My45OTY2ODcgTDQxLjUsNDMuOTk2Njg3IFonIGlkPSdDbG91ZCcgZmlsbD0nI0ZGRkZGRicgb3BhY2l0eT0nMC45MDA1MzYzODEnPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgIDwvZz5cblx0ICAgIDwvZz5cblx0PC9zdmc+XCJcblx0Y2xvY2tfYXBwOlwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdDxzdmcgd2lkdGg9JzYwcHgnIGhlaWdodD0nNjBweCcgdmlld0JveD0nMCAwIDYwIDYwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdCAgICA8dGl0bGU+Q2xvY2s8L3RpdGxlPlxuXHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdCAgICA8ZGVmcz5cblx0ICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9JzUwJScgeTE9JzAlJyB4Mj0nNTAlJyB5Mj0nMTAwJScgaWQ9J2xpbmVhckdyYWRpZW50LTEnPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjRjFGMUYxJyBvZmZzZXQ9JzAlJz48L3N0b3A+XG5cdCAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9JyNFRUVFRUUnIG9mZnNldD0nMTAwJSc+PC9zdG9wPlxuXHQgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG5cdCAgICA8L2RlZnM+XG5cdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0ICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS1TRScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTkyLjAwMDAwMCwgLTExNS4wMDAwMDApJz5cblx0ICAgICAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtNnMtQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDI3LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgPGcgaWQ9J0Nsb2NrJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg5Mi4wMDAwMDAsIDg4LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J00zOS4wODE1LDAgQzQ1LjEwNSwwIDQ4LjExNiwwIDUxLjM1ODUsMS4wMjUgQzU0Ljg5ODUsMi4zMTM1IDU3LjY4NjUsNS4xMDE1IDU4Ljk3NSw4LjY0MTUgQzYwLDExLjg4MzUgNjAsMTQuODk1NSA2MCwyMC45MTg1IEw2MCwzOS4wODE1IEM2MCw0NS4xMDUgNjAsNDguMTE2IDU4Ljk3NSw1MS4zNTg1IEM1Ny42ODY1LDU0Ljg5ODUgNTQuODk4NSw1Ny42ODY1IDUxLjM1ODUsNTguOTc0NSBDNDguMTE2LDYwIDQ1LjEwNSw2MCAzOS4wODE1LDYwIEwyMC45MTg1LDYwIEMxNC44OTUsNjAgMTEuODgzNSw2MCA4LjY0MTUsNTguOTc0NSBDNS4xMDE1LDU3LjY4NjUgMi4zMTM1LDU0Ljg5ODUgMS4wMjUsNTEuMzU4NSBDMCw0OC4xMTYgMCw0NS4xMDUgMCwzOS4wODE1IEwwLDIwLjkxODUgQzAsMTQuODk1NSAwLDExLjg4MzUgMS4wMjUsOC42NDE1IEMyLjMxMzUsNS4xMDE1IDUuMTAxNSwyLjMxMzUgOC42NDE1LDEuMDI1IEMxMS44ODM1LDAgMTQuODk1LDAgMjAuOTE4NSwwIEwzOS4wODE1LDAgWicgaWQ9J0ljb24nIGZpbGw9JyMxRTFFMUYnPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSdPdmFsLTEyJyBmaWxsPSd1cmwoI2xpbmVhckdyYWRpZW50LTEpJyBjeD0nMzAnIGN5PSczMCcgcj0nMjYnPjwvY2lyY2xlPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdEaWdpdHMnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDguMDAwMDAwLCA3LjAwMDAwMCknIGZpbGw9JyM2MTYxNjEnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNMzIuNDY4LDggTDMyLjQ2OCwzLjc0NiBMMzIuMDc4LDMuNzQ2IEMzMi4wNDk5OTk5LDMuOTA2MDAwOCAzMS45OTgwMDA0LDQuMDM3OTk5NDggMzEuOTIyLDQuMTQyIEMzMS44NDU5OTk2LDQuMjQ2MDAwNTIgMzEuNzUzMDAwNSw0LjMyNzk5OTcgMzEuNjQzLDQuMzg4IEMzMS41MzI5OTk0LDQuNDQ4MDAwMyAzMS40MTAwMDA3LDQuNDg4OTk5ODkgMzEuMjc0LDQuNTExIEMzMS4xMzc5OTkzLDQuNTMzMDAwMTEgMzAuOTk4MDAwNyw0LjU0NCAzMC44NTQsNC41NDQgTDMwLjg1NCw0Ljk1MiBMMzEuOTU4LDQuOTUyIEwzMS45NTgsOCBMMzIuNDY4LDggWicgaWQ9JzEnPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTM4LjA5NiwxMi43NTIgTDM4LjYwNiwxMi43NTIgQzM4LjYwMiwxMi42MjM5OTk0IDM4LjYxNDk5OTksMTIuNDk3MDAwNiAzOC42NDUsMTIuMzcxIEMzOC42NzUwMDAyLDEyLjI0NDk5OTQgMzguNzIzOTk5NywxMi4xMzIwMDA1IDM4Ljc5MiwxMi4wMzIgQzM4Ljg2MDAwMDMsMTEuOTMxOTk5NSAzOC45NDY5OTk1LDExLjg1MTAwMDMgMzkuMDUzLDExLjc4OSBDMzkuMTU5MDAwNSwxMS43MjY5OTk3IDM5LjI4NTk5OTMsMTEuNjk2IDM5LjQzNCwxMS42OTYgQzM5LjU0NjAwMDYsMTEuNjk2IDM5LjY1MTk5OTUsMTEuNzEzOTk5OCAzOS43NTIsMTEuNzUgQzM5Ljg1MjAwMDUsMTEuNzg2MDAwMiAzOS45Mzg5OTk2LDExLjgzNzk5OTcgNDAuMDEzLDExLjkwNiBDNDAuMDg3MDAwNCwxMS45NzQwMDAzIDQwLjE0NTk5OTgsMTIuMDU0OTk5NSA0MC4xOSwxMi4xNDkgQzQwLjIzNDAwMDIsMTIuMjQzMDAwNSA0MC4yNTYsMTIuMzQ3OTk5NCA0MC4yNTYsMTIuNDY0IEM0MC4yNTYsMTIuNjEyMDAwNyA0MC4yMzMwMDAyLDEyLjc0MTk5OTQgNDAuMTg3LDEyLjg1NCBDNDAuMTQwOTk5OCwxMi45NjYwMDA2IDQwLjA3MzAwMDUsMTMuMDY5OTk5NSAzOS45ODMsMTMuMTY2IEMzOS44OTI5OTk2LDEzLjI2MjAwMDUgMzkuNzgwMDAwNywxMy4zNTY5OTk1IDM5LjY0NCwxMy40NTEgQzM5LjUwNzk5OTMsMTMuNTQ1MDAwNSAzOS4zNTAwMDA5LDEzLjY0Nzk5OTQgMzkuMTcsMTMuNzYgQzM5LjAyMTk5OTMsMTMuODQ4MDAwNCAzOC44ODAwMDA3LDEzLjk0MTk5OTUgMzguNzQ0LDE0LjA0MiBDMzguNjA3OTk5MywxNC4xNDIwMDA1IDM4LjQ4NjAwMDUsMTQuMjU3OTk5MyAzOC4zNzgsMTQuMzkgQzM4LjI2OTk5OTUsMTQuNTIyMDAwNyAzOC4xODEwMDA0LDE0LjY3Njk5OTEgMzguMTExLDE0Ljg1NSBDMzguMDQwOTk5NywxNS4wMzMwMDA5IDM3Ljk5NjAwMDEsMTUuMjQ3OTk4NyAzNy45NzYsMTUuNSBMNDAuNzU0LDE1LjUgTDQwLjc1NCwxNS4wNSBMMzguNTcsMTUuMDUgQzM4LjU5NDAwMDEsMTQuOTE3OTk5MyAzOC42NDQ5OTk2LDE0LjgwMTAwMDUgMzguNzIzLDE0LjY5OSBDMzguODAxMDAwNCwxNC41OTY5OTk1IDM4Ljg5NDk5OTUsMTQuNTAyMDAwNCAzOS4wMDUsMTQuNDE0IEMzOS4xMTUwMDA2LDE0LjMyNTk5OTYgMzkuMjM1OTk5MywxNC4yNDMwMDA0IDM5LjM2OCwxNC4xNjUgQzM5LjUwMDAwMDcsMTQuMDg2OTk5NiAzOS42MzE5OTkzLDE0LjAwODAwMDQgMzkuNzY0LDEzLjkyOCBDMzkuODk2MDAwNywxMy44NDM5OTk2IDQwLjAyMzk5OTQsMTMuNzU2MDAwNSA0MC4xNDgsMTMuNjY0IEM0MC4yNzIwMDA2LDEzLjU3MTk5OTUgNDAuMzgxOTk5NSwxMy40NjkwMDA2IDQwLjQ3OCwxMy4zNTUgQzQwLjU3NDAwMDUsMTMuMjQwOTk5NCA0MC42NTA5OTk3LDEzLjExMjAwMDcgNDAuNzA5LDEyLjk2OCBDNDAuNzY3MDAwMywxMi44MjM5OTkzIDQwLjc5NiwxMi42NTgwMDA5IDQwLjc5NiwxMi40NyBDNDAuNzk2LDEyLjI2OTk5OSA0MC43NjEwMDA0LDEyLjA5NDAwMDggNDAuNjkxLDExLjk0MiBDNDAuNjIwOTk5NywxMS43ODk5OTkyIDQwLjUyNjAwMDYsMTEuNjYzMDAwNSA0MC40MDYsMTEuNTYxIEM0MC4yODU5OTk0LDExLjQ1ODk5OTUgNDAuMTQ1MDAwOCwxMS4zODEwMDAzIDM5Ljk4MywxMS4zMjcgQzM5LjgyMDk5OTIsMTEuMjcyOTk5NyAzOS42NDgwMDA5LDExLjI0NiAzOS40NjQsMTEuMjQ2IEMzOS4yMzk5OTg5LDExLjI0NiAzOS4wNDAwMDA5LDExLjI4Mzk5OTYgMzguODY0LDExLjM2IEMzOC42ODc5OTkxLDExLjQzNjAwMDQgMzguNTQxMDAwNiwxMS41NDA5OTkzIDM4LjQyMywxMS42NzUgQzM4LjMwNDk5OTQsMTEuODA5MDAwNyAzOC4yMTgwMDAzLDExLjk2Nzk5OTEgMzguMTYyLDEyLjE1MiBDMzguMTA1OTk5NywxMi4zMzYwMDA5IDM4LjA4Mzk5OTksMTIuNTM1OTk4OSAzOC4wOTYsMTIuNzUyIEwzOC4wOTYsMTIuNzUyIFonIGlkPScyJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J000Mi4xNCwyMi41NyBMNDIuMTQsMjMuMDAyIEM0Mi4yMzYwMDA1LDIyLjk4OTk5OTkgNDIuMzM3OTk5NSwyMi45ODQgNDIuNDQ2LDIyLjk4NCBDNDIuNTc0MDAwNiwyMi45ODQgNDIuNjkyOTk5NSwyMy4wMDA5OTk4IDQyLjgwMywyMy4wMzUgQzQyLjkxMzAwMDYsMjMuMDY5MDAwMiA0My4wMDc5OTk2LDIzLjEyMDk5OTcgNDMuMDg4LDIzLjE5MSBDNDMuMTY4MDAwNCwyMy4yNjEwMDA0IDQzLjIzMTk5OTgsMjMuMzQ2OTk5NSA0My4yOCwyMy40NDkgQzQzLjMyODAwMDIsMjMuNTUxMDAwNSA0My4zNTIsMjMuNjY3OTk5MyA0My4zNTIsMjMuOCBDNDMuMzUyLDIzLjkyODAwMDYgNDMuMzI3MDAwMywyNC4wNDI5OTk1IDQzLjI3NywyNC4xNDUgQzQzLjIyNjk5OTgsMjQuMjQ3MDAwNSA0My4xNjAwMDA0LDI0LjMzMjk5OTcgNDMuMDc2LDI0LjQwMyBDNDIuOTkxOTk5NiwyNC40NzMwMDA0IDQyLjg5NDAwMDYsMjQuNTI2OTk5OCA0Mi43ODIsMjQuNTY1IEM0Mi42Njk5OTk0LDI0LjYwMzAwMDIgNDIuNTUyMDAwNiwyNC42MjIgNDIuNDI4LDI0LjYyMiBDNDIuMTM1OTk4NSwyNC42MjIgNDEuOTE0MDAwOCwyNC41MzUwMDA5IDQxLjc2MiwyNC4zNjEgQzQxLjYwOTk5OTIsMjQuMTg2OTk5MSA0MS41MywyMy45NjIwMDE0IDQxLjUyMiwyMy42ODYgTDQxLjAxMiwyMy42ODYgQzQxLjAwOCwyMy45MDYwMDExIDQxLjAzODk5OTcsMjQuMTAxOTk5MSA0MS4xMDUsMjQuMjc0IEM0MS4xNzEwMDAzLDI0LjQ0NjAwMDkgNDEuMjY1OTk5NCwyNC41OTA5OTk0IDQxLjM5LDI0LjcwOSBDNDEuNTE0MDAwNiwyNC44MjcwMDA2IDQxLjY2Mzk5OTEsMjQuOTE1OTk5NyA0MS44NCwyNC45NzYgQzQyLjAxNjAwMDksMjUuMDM2MDAwMyA0Mi4yMTE5OTg5LDI1LjA2NiA0Mi40MjgsMjUuMDY2IEM0Mi42MjgwMDEsMjUuMDY2IDQyLjgxNjk5OTEsMjUuMDM5MDAwMyA0Mi45OTUsMjQuOTg1IEM0My4xNzMwMDA5LDI0LjkzMDk5OTcgNDMuMzI3OTk5MywyNC44NTAwMDA1IDQzLjQ2LDI0Ljc0MiBDNDMuNTkyMDAwNywyNC42MzM5OTk1IDQzLjY5Njk5OTYsMjQuNDk5MDAwOCA0My43NzUsMjQuMzM3IEM0My44NTMwMDA0LDI0LjE3NDk5OTIgNDMuODkyLDIzLjk4ODAwMTEgNDMuODkyLDIzLjc3NiBDNDMuODkyLDIzLjUxOTk5ODcgNDMuODI5MDAwNiwyMy4yOTgwMDA5IDQzLjcwMywyMy4xMSBDNDMuNTc2OTk5NCwyMi45MjE5OTkxIDQzLjM4NDAwMTMsMjIuODAwMDAwMyA0My4xMjQsMjIuNzQ0IEw0My4xMjQsMjIuNzMyIEM0My4yOTIwMDA4LDIyLjY1NTk5OTYgNDMuNDMxOTk5NCwyMi41NDQwMDA3IDQzLjU0NCwyMi4zOTYgQzQzLjY1NjAwMDYsMjIuMjQ3OTk5MyA0My43MTIsMjIuMDc4MDAxIDQzLjcxMiwyMS44ODYgQzQzLjcxMiwyMS42ODk5OTkgNDMuNjc5MDAwMywyMS41MjAwMDA3IDQzLjYxMywyMS4zNzYgQzQzLjU0Njk5OTcsMjEuMjMxOTk5MyA0My40NTYwMDA2LDIxLjExNDAwMDUgNDMuMzQsMjEuMDIyIEM0My4yMjM5OTk0LDIwLjkyOTk5OTUgNDMuMDg3MDAwOCwyMC44NjEwMDAyIDQyLjkyOSwyMC44MTUgQzQyLjc3MDk5OTIsMjAuNzY4OTk5OCA0Mi42MDAwMDA5LDIwLjc0NiA0Mi40MTYsMjAuNzQ2IEM0Mi4yMDM5OTg5LDIwLjc0NiA0Mi4wMTcwMDA4LDIwLjc3OTk5OTcgNDEuODU1LDIwLjg0OCBDNDEuNjkyOTk5MiwyMC45MTYwMDAzIDQxLjU1ODAwMDUsMjEuMDA5OTk5NCA0MS40NSwyMS4xMyBDNDEuMzQxOTk5NSwyMS4yNTAwMDA2IDQxLjI1OTAwMDMsMjEuMzkzOTk5MiA0MS4yMDEsMjEuNTYyIEM0MS4xNDI5OTk3LDIxLjczMDAwMDggNDEuMTEsMjEuOTE1OTk5IDQxLjEwMiwyMi4xMiBMNDEuNjEyLDIyLjEyIEM0MS42MTIsMjEuOTk1OTk5NCA0MS42Mjc5OTk4LDIxLjg3ODAwMDYgNDEuNjYsMjEuNzY2IEM0MS42OTIwMDAyLDIxLjY1Mzk5OTQgNDEuNzQwOTk5NywyMS41NTYwMDA0IDQxLjgwNywyMS40NzIgQzQxLjg3MzAwMDMsMjEuMzg3OTk5NiA0MS45NTY5OTk1LDIxLjMyMTAwMDMgNDIuMDU5LDIxLjI3MSBDNDIuMTYxMDAwNSwyMS4yMjA5OTk4IDQyLjI3OTk5OTMsMjEuMTk2IDQyLjQxNiwyMS4xOTYgQzQyLjYzMjAwMTEsMjEuMTk2IDQyLjgxMTk5OTMsMjEuMjUyOTk5NCA0Mi45NTYsMjEuMzY3IEM0My4xMDAwMDA3LDIxLjQ4MTAwMDYgNDMuMTcyLDIxLjY1MTk5ODkgNDMuMTcyLDIxLjg4IEM0My4xNzIsMjEuOTkyMDAwNiA0My4xNTAwMDAyLDIyLjA5MTk5OTYgNDMuMTA2LDIyLjE4IEM0My4wNjE5OTk4LDIyLjI2ODAwMDQgNDMuMDAzMDAwNCwyMi4zNDA5OTk3IDQyLjkyOSwyMi4zOTkgQzQyLjg1NDk5OTYsMjIuNDU3MDAwMyA0Mi43NjkwMDA1LDIyLjUwMDk5OTkgNDIuNjcxLDIyLjUzMSBDNDIuNTcyOTk5NSwyMi41NjEwMDAyIDQyLjQ3MDAwMDUsMjIuNTc2IDQyLjM2MiwyMi41NzYgTDQyLjI1NCwyMi41NzYgTDQyLjE5NCwyMi41NzYgQzQyLjE3Nzk5OTksMjIuNTc2IDQyLjE2MDAwMDEsMjIuNTc0IDQyLjE0LDIyLjU3IEw0Mi4xNCwyMi41NyBaJyBpZD0nMyc+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNNDAuMzY2LDM0LjA1NCBMMzguOTM4LDM0LjA1NCBMNDAuMzU0LDMxLjk3MiBMNDAuMzY2LDMxLjk3MiBMNDAuMzY2LDM0LjA1NCBaIE00MC44NDYsMzQuMDU0IEw0MC44NDYsMzEuMjQ2IEw0MC40MzgsMzEuMjQ2IEwzOC41LDM0LjAxMiBMMzguNSwzNC41MDQgTDQwLjM2NiwzNC41MDQgTDQwLjM2NiwzNS41IEw0MC44NDYsMzUuNSBMNDAuODQ2LDM0LjUwNCBMNDEuNDIyLDM0LjUwNCBMNDEuNDIyLDM0LjA1NCBMNDAuODQ2LDM0LjA1NCBaJyBpZD0nNCc+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNMzMuNjUyLDM4Ljc2OCBMMzMuNjUyLDM4LjMxOCBMMzEuNTUyLDM4LjMxOCBMMzEuMTU2LDQwLjUyNiBMMzEuNTk0LDQwLjU1IEMzMS42OTQwMDA1LDQwLjQyOTk5OTQgMzEuODA4OTk5Myw0MC4zMzMwMDA0IDMxLjkzOSw0MC4yNTkgQzMyLjA2OTAwMDYsNDAuMTg0OTk5NiAzMi4yMTc5OTkyLDQwLjE0OCAzMi4zODYsNDAuMTQ4IEMzMi41MzAwMDA3LDQwLjE0OCAzMi42NjA5OTk0LDQwLjE3MTk5OTggMzIuNzc5LDQwLjIyIEMzMi44OTcwMDA2LDQwLjI2ODAwMDIgMzIuOTk3OTk5Niw0MC4zMzQ5OTk2IDMzLjA4Miw0MC40MjEgQzMzLjE2NjAwMDQsNDAuNTA3MDAwNCAzMy4yMzA5OTk4LDQwLjYwODk5OTQgMzMuMjc3LDQwLjcyNyBDMzMuMzIzMDAwMiw0MC44NDUwMDA2IDMzLjM0Niw0MC45NzM5OTkzIDMzLjM0Niw0MS4xMTQgQzMzLjM0Niw0MS4yODIwMDA4IDMzLjMyMjAwMDIsNDEuNDI4OTk5NCAzMy4yNzQsNDEuNTU1IEMzMy4yMjU5OTk4LDQxLjY4MTAwMDYgMzMuMTYxMDAwNCw0MS43ODU5OTk2IDMzLjA3OSw0MS44NyBDMzIuOTk2OTk5Niw0MS45NTQwMDA0IDMyLjkwMTAwMDUsNDIuMDE2OTk5OCAzMi43OTEsNDIuMDU5IEMzMi42ODA5OTk0LDQyLjEwMTAwMDIgMzIuNTY2MDAwNiw0Mi4xMjIgMzIuNDQ2LDQyLjEyMiBDMzIuMzE3OTk5NCw0Mi4xMjIgMzIuMjAxMDAwNSw0Mi4xMDMwMDAyIDMyLjA5NSw0Mi4wNjUgQzMxLjk4ODk5OTUsNDIuMDI2OTk5OCAzMS44OTcwMDA0LDQxLjk3MzAwMDQgMzEuODE5LDQxLjkwMyBDMzEuNzQwOTk5Niw0MS44MzI5OTk3IDMxLjY3OTAwMDIsNDEuNzUxMDAwNSAzMS42MzMsNDEuNjU3IEMzMS41ODY5OTk4LDQxLjU2Mjk5OTUgMzEuNTYsNDEuNDYyMDAwNSAzMS41NTIsNDEuMzU0IEwzMS4wNDIsNDEuMzU0IEMzMS4wNDYsNDEuNTQ2MDAxIDMxLjA4Mzk5OTYsNDEuNzE3OTk5MiAzMS4xNTYsNDEuODcgQzMxLjIyODAwMDQsNDIuMDIyMDAwOCAzMS4zMjU5OTk0LDQyLjE0ODk5OTUgMzEuNDUsNDIuMjUxIEMzMS41NzQwMDA2LDQyLjM1MzAwMDUgMzEuNzE2OTk5Miw0Mi40MzA5OTk3IDMxLjg3OSw0Mi40ODUgQzMyLjA0MTAwMDgsNDIuNTM5MDAwMyAzMi4yMTM5OTkxLDQyLjU2NiAzMi4zOTgsNDIuNTY2IEMzMi42NDYwMDEyLDQyLjU2NiAzMi44NjI5OTkxLDQyLjUyNzAwMDQgMzMuMDQ5LDQyLjQ0OSBDMzMuMjM1MDAwOSw0Mi4zNzA5OTk2IDMzLjM4OTk5OTQsNDIuMjY2MDAwNyAzMy41MTQsNDIuMTM0IEMzMy42MzgwMDA2LDQyLjAwMTk5OTMgMzMuNzMwOTk5Nyw0MS44NTEwMDA5IDMzLjc5Myw0MS42ODEgQzMzLjg1NTAwMDMsNDEuNTEwOTk5MiAzMy44ODYsNDEuMzM2MDAwOSAzMy44ODYsNDEuMTU2IEMzMy44ODYsNDAuOTExOTk4OCAzMy44NTAwMDA0LDQwLjY5OTAwMDkgMzMuNzc4LDQwLjUxNyBDMzMuNzA1OTk5Niw0MC4zMzQ5OTkxIDMzLjYwODAwMDYsNDAuMTgzMDAwNiAzMy40ODQsNDAuMDYxIEMzMy4zNTk5OTk0LDM5LjkzODk5OTQgMzMuMjE0MDAwOCwzOS44NDgwMDAzIDMzLjA0NiwzOS43ODggQzMyLjg3Nzk5OTIsMzkuNzI3OTk5NyAzMi43MDAwMDA5LDM5LjY5OCAzMi41MTIsMzkuNjk4IEMzMi4zNjc5OTkzLDM5LjY5OCAzMi4yMjMwMDA3LDM5LjcyMjk5OTggMzIuMDc3LDM5Ljc3MyBDMzEuOTMwOTk5MywzOS44MjMwMDAzIDMxLjgxMjAwMDUsMzkuODk5OTk5NSAzMS43Miw0MC4wMDQgTDMxLjcwOCwzOS45OTIgTDMxLjkzNiwzOC43NjggTDMzLjY1MiwzOC43NjggWicgaWQ9JzUnPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTIyLjgxNiw0Mi4zMzIgTDIzLjMyNiw0Mi4zMzIgQzIzLjI5Mzk5OTgsNDEuOTc5OTk4MiAyMy4xNzQwMDEsNDEuNzExMDAwOSAyMi45NjYsNDEuNTI1IEMyMi43NTc5OTksNDEuMzM4OTk5MSAyMi40NzgwMDE4LDQxLjI0NiAyMi4xMjYsNDEuMjQ2IEMyMS44MjE5OTg1LDQxLjI0NiAyMS41NzAwMDEsNDEuMzA5OTk5NCAyMS4zNyw0MS40MzggQzIxLjE2OTk5OSw0MS41NjYwMDA2IDIxLjAxMDAwMDYsNDEuNzM1OTk4OSAyMC44OSw0MS45NDggQzIwLjc2OTk5OTQsNDIuMTYwMDAxMSAyMC42ODUwMDAyLDQyLjQwMjk5ODYgMjAuNjM1LDQyLjY3NyBDMjAuNTg0OTk5Nyw0Mi45NTEwMDE0IDIwLjU2LDQzLjIzMzk5ODUgMjAuNTYsNDMuNTI2IEMyMC41Niw0My43NTAwMDExIDIwLjU3Njk5OTgsNDMuOTgxOTk4OCAyMC42MTEsNDQuMjIyIEMyMC42NDUwMDAyLDQ0LjQ2MjAwMTIgMjAuNzEzOTk5NSw0NC42ODE5OTkgMjAuODE4LDQ0Ljg4MiBDMjAuOTIyMDAwNSw0NS4wODIwMDEgMjEuMDY5OTk5LDQ1LjI0NTk5OTQgMjEuMjYyLDQ1LjM3NCBDMjEuNDU0MDAxLDQ1LjUwMjAwMDYgMjEuNzA3OTk4NCw0NS41NjYgMjIuMDI0LDQ1LjU2NiBDMjIuMjkyMDAxMyw0NS41NjYgMjIuNTE2OTk5MSw0NS41MjEwMDA1IDIyLjY5OSw0NS40MzEgQzIyLjg4MTAwMDksNDUuMzQwOTk5NiAyMy4wMjY5OTk0LDQ1LjIyNzAwMDcgMjMuMTM3LDQ1LjA4OSBDMjMuMjQ3MDAwNSw0NC45NTA5OTkzIDIzLjMyNTk5OTgsNDQuNzk4MDAwOCAyMy4zNzQsNDQuNjMgQzIzLjQyMjAwMDIsNDQuNDYxOTk5MiAyMy40NDYsNDQuMzAwMDAwOCAyMy40NDYsNDQuMTQ0IEMyMy40NDYsNDMuOTQ3OTk5IDIzLjQxNjAwMDMsNDMuNzY2MDAwOCAyMy4zNTYsNDMuNTk4IEMyMy4yOTU5OTk3LDQzLjQyOTk5OTIgMjMuMjExMDAwNSw0My4yODQwMDA2IDIzLjEwMSw0My4xNiBDMjIuOTkwOTk5NCw0My4wMzU5OTk0IDIyLjg1NTAwMDgsNDIuOTM5MDAwNCAyMi42OTMsNDIuODY5IEMyMi41MzA5OTkyLDQyLjc5ODk5OTcgMjIuMzQ4MDAxLDQyLjc2NCAyMi4xNDQsNDIuNzY0IEMyMS45MTE5OTg4LDQyLjc2NCAyMS43MDcwMDA5LDQyLjgwNzk5OTYgMjEuNTI5LDQyLjg5NiBDMjEuMzUwOTk5MSw0Mi45ODQwMDA0IDIxLjIwMjAwMDYsNDMuMTI1OTk5IDIxLjA4Miw0My4zMjIgTDIxLjA3LDQzLjMxIEMyMS4wNzQsNDMuMTQ1OTk5MiAyMS4wODk5OTk5LDQyLjk3MDAwMDkgMjEuMTE4LDQyLjc4MiBDMjEuMTQ2MDAwMSw0Mi41OTM5OTkxIDIxLjE5Njk5OTYsNDIuNDE5MDAwOCAyMS4yNzEsNDIuMjU3IEMyMS4zNDUwMDA0LDQyLjA5NDk5OTIgMjEuNDQ3OTk5Myw0MS45NjEwMDA1IDIxLjU4LDQxLjg1NSBDMjEuNzEyMDAwNyw0MS43NDg5OTk1IDIxLjg4NTk5ODksNDEuNjk2IDIyLjEwMiw0MS42OTYgQzIyLjMwNjAwMSw0MS42OTYgMjIuNDY5OTk5NCw0MS43NTM5OTk0IDIyLjU5NCw0MS44NyBDMjIuNzE4MDAwNiw0MS45ODYwMDA2IDIyLjc5MTk5OTksNDIuMTM5OTk5IDIyLjgxNiw0Mi4zMzIgTDIyLjgxNiw0Mi4zMzIgWiBNMjIuMDQ4LDQzLjIxNCBDMjIuMTkyMDAwNyw0My4yMTQgMjIuMzE3OTk5NSw0My4yMzk5OTk3IDIyLjQyNiw0My4yOTIgQzIyLjUzNDAwMDUsNDMuMzQ0MDAwMyAyMi42MjM5OTk2LDQzLjQxMjk5OTYgMjIuNjk2LDQzLjQ5OSBDMjIuNzY4MDAwNCw0My41ODUwMDA0IDIyLjgyMDk5OTgsNDMuNjg2OTk5NCAyMi44NTUsNDMuODA1IEMyMi44ODkwMDAyLDQzLjkyMzAwMDYgMjIuOTA2LDQ0LjA0Nzk5OTMgMjIuOTA2LDQ0LjE4IEMyMi45MDYsNDQuMzA0MDAwNiAyMi44ODcwMDAyLDQ0LjQyMjk5OTQgMjIuODQ5LDQ0LjUzNyBDMjIuODEwOTk5OCw0NC42NTEwMDA2IDIyLjc1NjAwMDQsNDQuNzUxOTk5NiAyMi42ODQsNDQuODQgQzIyLjYxMTk5OTYsNDQuOTI4MDAwNCAyMi41MjMwMDA1LDQ0Ljk5Njk5OTggMjIuNDE3LDQ1LjA0NyBDMjIuMzEwOTk5NSw0NS4wOTcwMDAzIDIyLjE4ODAwMDcsNDUuMTIyIDIyLjA0OCw0NS4xMjIgQzIxLjkwNzk5OTMsNDUuMTIyIDIxLjc4MzAwMDUsNDUuMDk3MDAwMyAyMS42NzMsNDUuMDQ3IEMyMS41NjI5OTk0LDQ0Ljk5Njk5OTggMjEuNDcxMDAwNCw0NC45MzAwMDA0IDIxLjM5Nyw0NC44NDYgQzIxLjMyMjk5OTYsNDQuNzYxOTk5NiAyMS4yNjYwMDAyLDQ0LjY2MjAwMDYgMjEuMjI2LDQ0LjU0NiBDMjEuMTg1OTk5OCw0NC40Mjk5OTk0IDIxLjE2Niw0NC4zMDYwMDA3IDIxLjE2Niw0NC4xNzQgQzIxLjE2Niw0NC4wNDE5OTkzIDIxLjE4NDk5OTgsNDMuOTE3MDAwNiAyMS4yMjMsNDMuNzk5IEMyMS4yNjEwMDAyLDQzLjY4MDk5OTQgMjEuMzE3OTk5Niw0My41NzkwMDA0IDIxLjM5NCw0My40OTMgQzIxLjQ3MDAwMDQsNDMuNDA2OTk5NiAyMS41NjE5OTk1LDQzLjMzOTAwMDMgMjEuNjcsNDMuMjg5IEMyMS43NzgwMDA1LDQzLjIzODk5OTggMjEuOTAzOTk5Myw0My4yMTQgMjIuMDQ4LDQzLjIxNCBMMjIuMDQ4LDQzLjIxNCBaJyBpZD0nNic+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNMTIuODg2LDM4Ljc1NiBMMTIuODg2LDM4LjMxOCBMMTAuMTMyLDM4LjMxOCBMMTAuMTMyLDM4Ljc5OCBMMTIuMzY0LDM4Ljc5OCBDMTIuMTM5OTk4OSwzOS4wMzQwMDEyIDExLjkzMTAwMSwzOS4yOTE5OTg2IDExLjczNywzOS41NzIgQzExLjU0Mjk5OSwzOS44NTIwMDE0IDExLjM3MjAwMDcsNDAuMTQ4OTk4NCAxMS4yMjQsNDAuNDYzIEMxMS4wNzU5OTkzLDQwLjc3NzAwMTYgMTAuOTU1MDAwNSw0MS4xMDQ5OTgzIDEwLjg2MSw0MS40NDcgQzEwLjc2Njk5OTUsNDEuNzg5MDAxNyAxMC43MDgwMDAxLDQyLjEzOTk5ODIgMTAuNjg0LDQyLjUgTDExLjI1NCw0Mi41IEMxMS4yNzQwMDAxLDQyLjE2Nzk5ODMgMTEuMzI5OTk5NSw0MS44MjYwMDE4IDExLjQyMiw0MS40NzQgQzExLjUxNDAwMDUsNDEuMTIxOTk4MiAxMS42MzI5OTkzLDQwLjc4MDAwMTcgMTEuNzc5LDQwLjQ0OCBDMTEuOTI1MDAwNyw0MC4xMTU5OTgzIDEyLjA5MTk5OTEsMzkuODA0MDAxNSAxMi4yOCwzOS41MTIgQzEyLjQ2ODAwMDksMzkuMjE5OTk4NSAxMi42Njk5OTg5LDM4Ljk2ODAwMTEgMTIuODg2LDM4Ljc1NiBMMTIuODg2LDM4Ljc1NiBaJyBpZD0nNyc+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNMy4yNjIsMzIuMzUgQzMuMjYyLDMyLjI0MTk5OTUgMy4yODE5OTk4LDMyLjE0ODAwMDQgMy4zMjIsMzIuMDY4IEMzLjM2MjAwMDIsMzEuOTg3OTk5NiAzLjQxNDk5OTY3LDMxLjkyMDAwMDMgMy40ODEsMzEuODY0IEMzLjU0NzAwMDMzLDMxLjgwNzk5OTcgMy42MjU5OTk1NCwzMS43NjYwMDAxIDMuNzE4LDMxLjczOCBDMy44MTAwMDA0NiwzMS43MDk5OTk5IDMuOTA1OTk5NSwzMS42OTYgNC4wMDYsMzEuNjk2IEM0LjIxNDAwMTA0LDMxLjY5NiA0LjM4NDk5OTMzLDMxLjc1MDk5OTUgNC41MTksMzEuODYxIEM0LjY1MzAwMDY3LDMxLjk3MTAwMDYgNC43MiwzMi4xMzM5OTg5IDQuNzIsMzIuMzUgQzQuNzIsMzIuNTY2MDAxMSA0LjY1NDAwMDY2LDMyLjczMzk5OTQgNC41MjIsMzIuODU0IEM0LjM4OTk5OTM0LDMyLjk3NDAwMDYgNC4yMjIwMDEwMiwzMy4wMzQgNC4wMTgsMzMuMDM0IEMzLjkxMzk5OTQ4LDMzLjAzNCAzLjgxNjAwMDQ2LDMzLjAyMDAwMDEgMy43MjQsMzIuOTkyIEMzLjYzMTk5OTU0LDMyLjk2Mzk5OTkgMy41NTIwMDAzNCwzMi45MjIwMDAzIDMuNDg0LDMyLjg2NiBDMy40MTU5OTk2NiwzMi44MDk5OTk3IDMuMzYyMDAwMiwzMi43MzkwMDA0IDMuMzIyLDMyLjY1MyBDMy4yODE5OTk4LDMyLjU2Njk5OTYgMy4yNjIsMzIuNDY2MDAwNiAzLjI2MiwzMi4zNSBMMy4yNjIsMzIuMzUgWiBNMi43MjIsMzIuMzMyIEMyLjcyMiwzMi41MjQwMDEgMi43NzU5OTk0NiwzMi43MDA5OTkyIDIuODg0LDMyLjg2MyBDMi45OTIwMDA1NCwzMy4wMjUwMDA4IDMuMTM1OTk5MSwzMy4xNDE5OTk2IDMuMzE2LDMzLjIxNCBDMy4wNzU5OTg4LDMzLjI5ODAwMDQgMi44OTIwMDA2NCwzMy40MzI5OTkxIDIuNzY0LDMzLjYxOSBDMi42MzU5OTkzNiwzMy44MDUwMDA5IDIuNTcyLDM0LjAyMzk5ODcgMi41NzIsMzQuMjc2IEMyLjU3MiwzNC40OTIwMDExIDIuNjA4OTk5NjMsMzQuNjgwOTk5MiAyLjY4MywzNC44NDMgQzIuNzU3MDAwMzcsMzUuMDA1MDAwOCAyLjg1ODk5OTM1LDM1LjEzOTk5OTUgMi45ODksMzUuMjQ4IEMzLjExOTAwMDY1LDM1LjM1NjAwMDUgMy4yNzE5OTkxMiwzNS40MzU5OTk3IDMuNDQ4LDM1LjQ4OCBDMy42MjQwMDA4OCwzNS41NDAwMDAzIDMuODEzOTk4OTgsMzUuNTY2IDQuMDE4LDM1LjU2NiBDNC4yMTQwMDA5OCwzNS41NjYgNC4zOTc5OTkxNCwzNS41MzgwMDAzIDQuNTcsMzUuNDgyIEM0Ljc0MjAwMDg2LDM1LjQyNTk5OTcgNC44OTA5OTkzNywzNS4zNDMwMDA2IDUuMDE3LDM1LjIzMyBDNS4xNDMwMDA2MywzNS4xMjI5OTk1IDUuMjQyOTk5NjMsMzQuOTg4MDAwOCA1LjMxNywzNC44MjggQzUuMzkxMDAwMzcsMzQuNjY3OTk5MiA1LjQyOCwzNC40ODQwMDEgNS40MjgsMzQuMjc2IEM1LjQyOCwzNC4wMTE5OTg3IDUuMzY2MDAwNjIsMzMuNzg5MDAwOSA1LjI0MiwzMy42MDcgQzUuMTE3OTk5MzgsMzMuNDI0OTk5MSA0LjkyODAwMTI4LDMzLjI5NDAwMDQgNC42NzIsMzMuMjE0IEM0Ljg1MjAwMDksMzMuMTMzOTk5NiA0Ljk5NDk5OTQ3LDMzLjAxNTAwMDggNS4xMDEsMzIuODU3IEM1LjIwNzAwMDUzLDMyLjY5ODk5OTIgNS4yNiwzMi41MjQwMDEgNS4yNiwzMi4zMzIgQzUuMjYsMzIuMTk1OTk5MyA1LjIzNjAwMDI0LDMyLjA2MzAwMDcgNS4xODgsMzEuOTMzIEM1LjEzOTk5OTc2LDMxLjgwMjk5OTQgNS4wNjUwMDA1MSwzMS42ODcwMDA1IDQuOTYzLDMxLjU4NSBDNC44NjA5OTk0OSwzMS40ODI5OTk1IDQuNzI4MDAwODIsMzEuNDAxMDAwMyA0LjU2NCwzMS4zMzkgQzQuMzk5OTk5MTgsMzEuMjc2OTk5NyA0LjIwMjAwMTE2LDMxLjI0NiAzLjk3LDMxLjI0NiBDMy44MDU5OTkxOCwzMS4yNDYgMy42NDkwMDA3NSwzMS4yNjk5OTk4IDMuNDk5LDMxLjMxOCBDMy4zNDg5OTkyNSwzMS4zNjYwMDAyIDMuMjE2MDAwNTgsMzEuNDM1OTk5NSAzLjEsMzEuNTI4IEMyLjk4Mzk5OTQyLDMxLjYyMDAwMDUgMi44OTIwMDAzNCwzMS43MzI5OTkzIDIuODI0LDMxLjg2NyBDMi43NTU5OTk2NiwzMi4wMDEwMDA3IDIuNzIyLDMyLjE1NTk5OTEgMi43MjIsMzIuMzMyIEwyLjcyMiwzMi4zMzIgWiBNMy4xMTIsMzQuMyBDMy4xMTIsMzQuMTc1OTk5NCAzLjEzNDk5OTc3LDM0LjA2NDAwMDUgMy4xODEsMzMuOTY0IEMzLjIyNzAwMDIzLDMzLjg2Mzk5OTUgMy4yOTA5OTk1OSwzMy43NzgwMDA0IDMuMzczLDMzLjcwNiBDMy40NTUwMDA0MSwzMy42MzM5OTk2IDMuNTUwOTk5NDUsMzMuNTc5MDAwMiAzLjY2MSwzMy41NDEgQzMuNzcxMDAwNTUsMzMuNTAyOTk5OCAzLjg4Nzk5OTM4LDMzLjQ4NCA0LjAxMiwzMy40ODQgQzQuMTMyMDAwNiwzMy40ODQgNC4yNDQ5OTk0NywzMy41MDQ5OTk4IDQuMzUxLDMzLjU0NyBDNC40NTcwMDA1MywzMy41ODkwMDAyIDQuNTQ5OTk5NiwzMy42NDU5OTk2IDQuNjMsMzMuNzE4IEM0LjcxMDAwMDQsMzMuNzkwMDAwNCA0Ljc3Mjk5OTc3LDMzLjg3NDk5OTUgNC44MTksMzMuOTczIEM0Ljg2NTAwMDIzLDM0LjA3MTAwMDUgNC44ODgsMzQuMTc3OTk5NCA0Ljg4OCwzNC4yOTQgQzQuODg4LDM0LjQxNDAwMDYgNC44NjcwMDAyMSwzNC41MjM5OTk1IDQuODI1LDM0LjYyNCBDNC43ODI5OTk3OSwzNC43MjQwMDA1IDQuNzIzMDAwMzksMzQuODEwOTk5NiA0LjY0NSwzNC44ODUgQzQuNTY2OTk5NjEsMzQuOTU5MDAwNCA0LjQ3NTAwMDUzLDM1LjAxNjk5OTggNC4zNjksMzUuMDU5IEM0LjI2Mjk5OTQ3LDM1LjEwMTAwMDIgNC4xNDYwMDA2NCwzNS4xMjIgNC4wMTgsMzUuMTIyIEMzLjc1Mzk5ODY4LDM1LjEyMiAzLjUzNzAwMDg1LDM1LjA0OTAwMDcgMy4zNjcsMzQuOTAzIEMzLjE5Njk5OTE1LDM0Ljc1Njk5OTMgMy4xMTIsMzQuNTU2MDAxMyAzLjExMiwzNC4zIEwzLjExMiwzNC4zIFonIGlkPSc4Jz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J00xLjEzNiwyMy45NzQgTDAuNjI2LDIzLjk3NCBDMC42NTgwMDAxNiwyNC4zNDIwMDE4IDAuNzkxOTk4ODIsMjQuNjE1OTk5MSAxLjAyOCwyNC43OTYgQzEuMjY0MDAxMTgsMjQuOTc2MDAwOSAxLjU1OTk5ODIyLDI1LjA2NiAxLjkxNiwyNS4wNjYgQzIuNDMyMDAyNTgsMjUuMDY2IDIuODA2OTk4ODMsMjQuODY5MDAyIDMuMDQxLDI0LjQ3NSBDMy4yNzUwMDExNywyNC4wODA5OTggMy4zOTIsMjMuNTE2MDAzNyAzLjM5MiwyMi43OCBDMy4zOTIsMjIuMzc1OTk4IDMuMzUzMDAwMzksMjIuMDQzMDAxMyAzLjI3NSwyMS43ODEgQzMuMTk2OTk5NjEsMjEuNTE4OTk4NyAzLjA5MjAwMDY2LDIxLjMxMjAwMDggMi45NiwyMS4xNiBDMi44Mjc5OTkzNCwyMS4wMDc5OTkyIDIuNjc0MDAwODgsMjAuOTAxMDAwMyAyLjQ5OCwyMC44MzkgQzIuMzIxOTk5MTIsMjAuNzc2OTk5NyAyLjEzNDAwMSwyMC43NDYgMS45MzQsMjAuNzQ2IEMxLjcyOTk5ODk4LDIwLjc0NiAxLjU0MjAwMDg2LDIwLjc3OTk5OTcgMS4zNywyMC44NDggQzEuMTk3OTk5MTQsMjAuOTE2MDAwMyAxLjA1MDAwMDYyLDIxLjAxMDk5OTQgMC45MjYsMjEuMTMzIEMwLjgwMTk5OTM4LDIxLjI1NTAwMDYgMC43MDYwMDAzNCwyMS40MDA5OTkyIDAuNjM4LDIxLjU3MSBDMC41Njk5OTk2NiwyMS43NDEwMDA5IDAuNTM2LDIxLjkyNzk5OSAwLjUzNiwyMi4xMzIgQzAuNTM2LDIyLjM0MDAwMSAwLjU2NDk5OTcxLDIyLjUzMTk5OTEgMC42MjMsMjIuNzA4IEMwLjY4MTAwMDI5LDIyLjg4NDAwMDkgMC43NjY5OTk0MywyMy4wMzM5OTk0IDAuODgxLDIzLjE1OCBDMC45OTUwMDA1NywyMy4yODIwMDA2IDEuMTM1OTk5MTYsMjMuMzc4OTk5NyAxLjMwNCwyMy40NDkgQzEuNDcyMDAwODQsMjMuNTE5MDAwNCAxLjY2Mzk5ODkyLDIzLjU1NCAxLjg4LDIzLjU1NCBDMi4wODgwMDEwNCwyMy41NTQgMi4yNzk5OTkxMiwyMy41MDEwMDA1IDIuNDU2LDIzLjM5NSBDMi42MzIwMDA4OCwyMy4yODg5OTk1IDIuNzY3OTk5NTIsMjMuMTQ2MDAwOSAyLjg2NCwyMi45NjYgTDIuODc2LDIyLjk3OCBDMi44NTk5OTk5MiwyMy41MzQwMDI4IDIuNzc0MDAwNzgsMjMuOTQ2OTk4NyAyLjYxOCwyNC4yMTcgQzIuNDYxOTk5MjIsMjQuNDg3MDAxNCAyLjIyODAwMTU2LDI0LjYyMiAxLjkxNiwyNC42MjIgQzEuNzExOTk4OTgsMjQuNjIyIDEuNTM2MDAwNzQsMjQuNTY2MDAwNiAxLjM4OCwyNC40NTQgQzEuMjM5OTk5MjYsMjQuMzQxOTk5NCAxLjE1NjAwMDEsMjQuMTgyMDAxIDEuMTM2LDIzLjk3NCBMMS4xMzYsMjMuOTc0IFogTTIuNzg2LDIyLjE2OCBDMi43ODYsMjIuMjkyMDAwNiAyLjc2NjAwMDIsMjIuNDEwOTk5NCAyLjcyNiwyMi41MjUgQzIuNjg1OTk5OCwyMi42MzkwMDA2IDIuNjI4MDAwMzgsMjIuNzM4OTk5NiAyLjU1MiwyMi44MjUgQzIuNDc1OTk5NjIsMjIuOTExMDAwNCAyLjM4NDAwMDU0LDIyLjk3ODk5OTggMi4yNzYsMjMuMDI5IEMyLjE2Nzk5OTQ2LDIzLjA3OTAwMDMgMi4wNDgwMDA2NiwyMy4xMDQgMS45MTYsMjMuMTA0IEMxLjc5MTk5OTM4LDIzLjEwNCAxLjY3OTAwMDUxLDIzLjA3OTAwMDMgMS41NzcsMjMuMDI5IEMxLjQ3NDk5OTQ5LDIyLjk3ODk5OTggMS4zODcwMDAzNywyMi45MTIwMDA0IDEuMzEzLDIyLjgyOCBDMS4yMzg5OTk2MywyMi43NDM5OTk2IDEuMTgxMDAwMjEsMjIuNjQ4MDAwNSAxLjEzOSwyMi41NCBDMS4wOTY5OTk3OSwyMi40MzE5OTk1IDEuMDc2LDIyLjMyMDAwMDYgMS4wNzYsMjIuMjA0IEMxLjA3NiwyMi4wNzE5OTkzIDEuMDkwOTk5ODUsMjEuOTQ2MDAwNiAxLjEyMSwyMS44MjYgQzEuMTUxMDAwMTUsMjEuNzA1OTk5NCAxLjE5ODk5OTY3LDIxLjU5OTAwMDUgMS4yNjUsMjEuNTA1IEMxLjMzMTAwMDMzLDIxLjQxMDk5OTUgMS40MTY5OTk0NywyMS4zMzYwMDAzIDEuNTIzLDIxLjI4IEMxLjYyOTAwMDUzLDIxLjIyMzk5OTcgMS43NTc5OTkyNCwyMS4xOTYgMS45MSwyMS4xOTYgQzIuMDU0MDAwNzIsMjEuMTk2IDIuMTc5OTk5NDYsMjEuMjIxOTk5NyAyLjI4OCwyMS4yNzQgQzIuMzk2MDAwNTQsMjEuMzI2MDAwMyAyLjQ4Njk5OTYzLDIxLjM5Njk5OTYgMi41NjEsMjEuNDg3IEMyLjYzNTAwMDM3LDIxLjU3NzAwMDUgMi42OTA5OTk4MSwyMS42Nzk5OTk0IDIuNzI5LDIxLjc5NiBDMi43NjcwMDAxOSwyMS45MTIwMDA2IDIuNzg2LDIyLjAzNTk5OTMgMi43ODYsMjIuMTY4IEwyLjc4NiwyMi4xNjggWicgaWQ9JzknPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTIuOCwxNS41IEwyLjgsMTEuMjQ2IEwyLjQxLDExLjI0NiBDMi4zODE5OTk4NiwxMS40MDYwMDA4IDIuMzMwMDAwMzgsMTEuNTM3OTk5NSAyLjI1NCwxMS42NDIgQzIuMTc3OTk5NjIsMTEuNzQ2MDAwNSAyLjA4NTAwMDU1LDExLjgyNzk5OTcgMS45NzUsMTEuODg4IEMxLjg2NDk5OTQ1LDExLjk0ODAwMDMgMS43NDIwMDA2OCwxMS45ODg5OTk5IDEuNjA2LDEyLjAxMSBDMS40Njk5OTkzMiwxMi4wMzMwMDAxIDEuMzMwMDAwNzIsMTIuMDQ0IDEuMTg2LDEyLjA0NCBMMS4xODYsMTIuNDUyIEwyLjI5LDEyLjQ1MiBMMi4yOSwxNS41IEwyLjgsMTUuNSBaIE00Ljc5MiwxMy40MDYgQzQuNzkyLDEzLjMwMTk5OTUgNC43OTI5OTk5OSwxMy4xODcwMDA2IDQuNzk1LDEzLjA2MSBDNC43OTcwMDAwMSwxMi45MzQ5OTk0IDQuODA2OTk5OTEsMTIuODA5MDAwNiA0LjgyNSwxMi42ODMgQzQuODQzMDAwMDksMTIuNTU2OTk5NCA0Ljg2ODk5OTgzLDEyLjQzNDAwMDYgNC45MDMsMTIuMzE0IEM0LjkzNzAwMDE3LDEyLjE5Mzk5OTQgNC45ODY5OTk2NywxMi4wODkwMDA1IDUuMDUzLDExLjk5OSBDNS4xMTkwMDAzMywxMS45MDg5OTk2IDUuMjAxOTk5NSwxMS44MzYwMDAzIDUuMzAyLDExLjc4IEM1LjQwMjAwMDUsMTEuNzIzOTk5NyA1LjUyMzk5OTI4LDExLjY5NiA1LjY2OCwxMS42OTYgQzUuODEyMDAwNzIsMTEuNjk2IDUuOTMzOTk5NSwxMS43MjM5OTk3IDYuMDM0LDExLjc4IEM2LjEzNDAwMDUsMTEuODM2MDAwMyA2LjIxNjk5OTY3LDExLjkwODk5OTYgNi4yODMsMTEuOTk5IEM2LjM0OTAwMDMzLDEyLjA4OTAwMDUgNi4zOTg5OTk4MywxMi4xOTM5OTk0IDYuNDMzLDEyLjMxNCBDNi40NjcwMDAxNywxMi40MzQwMDA2IDYuNDkyOTk5OTEsMTIuNTU2OTk5NCA2LjUxMSwxMi42ODMgQzYuNTI5MDAwMDksMTIuODA5MDAwNiA2LjUzODk5OTk5LDEyLjkzNDk5OTQgNi41NDEsMTMuMDYxIEM2LjU0MzAwMDAxLDEzLjE4NzAwMDYgNi41NDQsMTMuMzAxOTk5NSA2LjU0NCwxMy40MDYgQzYuNTQ0LDEzLjU2NjAwMDggNi41MzkwMDAwNSwxMy43NDQ5OTkgNi41MjksMTMuOTQzIEM2LjUxODk5OTk1LDE0LjE0MTAwMSA2LjQ4NzAwMDI3LDE0LjMyNjk5OTEgNi40MzMsMTQuNTAxIEM2LjM3ODk5OTczLDE0LjY3NTAwMDkgNi4yOTIwMDA2LDE0LjgyMTk5OTQgNi4xNzIsMTQuOTQyIEM2LjA1MTk5OTQsMTUuMDYyMDAwNiA1Ljg4NDAwMTA4LDE1LjEyMiA1LjY2OCwxNS4xMjIgQzUuNDUxOTk4OTIsMTUuMTIyIDUuMjg0MDAwNiwxNS4wNjIwMDA2IDUuMTY0LDE0Ljk0MiBDNS4wNDM5OTk0LDE0LjgyMTk5OTQgNC45NTcwMDAyNywxNC42NzUwMDA5IDQuOTAzLDE0LjUwMSBDNC44NDg5OTk3MywxNC4zMjY5OTkxIDQuODE3MDAwMDUsMTQuMTQxMDAxIDQuODA3LDEzLjk0MyBDNC43OTY5OTk5NSwxMy43NDQ5OTkgNC43OTIsMTMuNTY2MDAwOCA0Ljc5MiwxMy40MDYgTDQuNzkyLDEzLjQwNiBaIE00LjI1MiwxMy40MTIgQzQuMjUyLDEzLjU2ODAwMDggNC4yNTU5OTk5NiwxMy43Mjk5OTkyIDQuMjY0LDEzLjg5OCBDNC4yNzIwMDAwNCwxNC4wNjYwMDA4IDQuMjkxOTk5ODQsMTQuMjI5OTk5MiA0LjMyNCwxNC4zOSBDNC4zNTYwMDAxNiwxNC41NTAwMDA4IDQuNDAxOTk5NywxNC43MDA5OTkzIDQuNDYyLDE0Ljg0MyBDNC41MjIwMDAzLDE0Ljk4NTAwMDcgNC42MDM5OTk0OCwxNS4xMDk5OTk1IDQuNzA4LDE1LjIxOCBDNC44MTIwMDA1MiwxNS4zMjYwMDA1IDQuOTQyOTk5MjEsMTUuNDEwOTk5NyA1LjEwMSwxNS40NzMgQzUuMjU5MDAwNzksMTUuNTM1MDAwMyA1LjQ0Nzk5ODksMTUuNTY2IDUuNjY4LDE1LjU2NiBDNS44OTIwMDExMiwxNS41NjYgNi4wODE5OTkyMiwxNS41MzUwMDAzIDYuMjM4LDE1LjQ3MyBDNi4zOTQwMDA3OCwxNS40MTA5OTk3IDYuNTIzOTk5NDgsMTUuMzI2MDAwNSA2LjYyOCwxNS4yMTggQzYuNzMyMDAwNTIsMTUuMTA5OTk5NSA2LjgxMzk5OTcsMTQuOTg1MDAwNyA2Ljg3NCwxNC44NDMgQzYuOTM0MDAwMywxNC43MDA5OTkzIDYuOTc5OTk5ODQsMTQuNTUwMDAwOCA3LjAxMiwxNC4zOSBDNy4wNDQwMDAxNiwxNC4yMjk5OTkyIDcuMDYzOTk5OTYsMTQuMDY2MDAwOCA3LjA3MiwxMy44OTggQzcuMDgwMDAwMDQsMTMuNzI5OTk5MiA3LjA4NCwxMy41NjgwMDA4IDcuMDg0LDEzLjQxMiBDNy4wODQsMTMuMjU1OTk5MiA3LjA4MDAwMDA0LDEzLjA5NDAwMDggNy4wNzIsMTIuOTI2IEM3LjA2Mzk5OTk2LDEyLjc1Nzk5OTIgNy4wNDQwMDAxNiwxMi41OTQwMDA4IDcuMDEyLDEyLjQzNCBDNi45Nzk5OTk4NCwxMi4yNzM5OTkyIDYuOTM0MDAwMywxMi4xMjIwMDA3IDYuODc0LDExLjk3OCBDNi44MTM5OTk3LDExLjgzMzk5OTMgNi43MzIwMDA1MiwxMS43MDgwMDA1IDYuNjI4LDExLjYgQzYuNTIzOTk5NDgsMTEuNDkxOTk5NSA2LjM5MzAwMDc5LDExLjQwNjAwMDMgNi4yMzUsMTEuMzQyIEM2LjA3Njk5OTIxLDExLjI3Nzk5OTcgNS44ODgwMDExLDExLjI0NiA1LjY2OCwxMS4yNDYgQzUuNDQ3OTk4OSwxMS4yNDYgNS4yNTkwMDA3OSwxMS4yNzc5OTk3IDUuMTAxLDExLjM0MiBDNC45NDI5OTkyMSwxMS40MDYwMDAzIDQuODEyMDAwNTIsMTEuNDkxOTk5NSA0LjcwOCwxMS42IEM0LjYwMzk5OTQ4LDExLjcwODAwMDUgNC41MjIwMDAzLDExLjgzMzk5OTMgNC40NjIsMTEuOTc4IEM0LjQwMTk5OTcsMTIuMTIyMDAwNyA0LjM1NjAwMDE2LDEyLjI3Mzk5OTIgNC4zMjQsMTIuNDM0IEM0LjI5MTk5OTg0LDEyLjU5NDAwMDggNC4yNzIwMDAwNCwxMi43NTc5OTkyIDQuMjY0LDEyLjkyNiBDNC4yNTU5OTk5NiwxMy4wOTQwMDA4IDQuMjUyLDEzLjI1NTk5OTIgNC4yNTIsMTMuNDEyIEw0LjI1MiwxMy40MTIgWicgaWQ9JzEwJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J00xMC44LDggTDEwLjgsMy43NDYgTDEwLjQxLDMuNzQ2IEMxMC4zODE5OTk5LDMuOTA2MDAwOCAxMC4zMzAwMDA0LDQuMDM3OTk5NDggMTAuMjU0LDQuMTQyIEMxMC4xNzc5OTk2LDQuMjQ2MDAwNTIgMTAuMDg1MDAwNSw0LjMyNzk5OTcgOS45NzUsNC4zODggQzkuODY0OTk5NDUsNC40NDgwMDAzIDkuNzQyMDAwNjgsNC40ODg5OTk4OSA5LjYwNiw0LjUxMSBDOS40Njk5OTkzMiw0LjUzMzAwMDExIDkuMzMwMDAwNzIsNC41NDQgOS4xODYsNC41NDQgTDkuMTg2LDQuOTUyIEwxMC4yOSw0Ljk1MiBMMTAuMjksOCBMMTAuOCw4IFogTTE0LjEzNiw4IEwxNC4xMzYsMy43NDYgTDEzLjc0NiwzLjc0NiBDMTMuNzE3OTk5OSwzLjkwNjAwMDggMTMuNjY2MDAwNCw0LjAzNzk5OTQ4IDEzLjU5LDQuMTQyIEMxMy41MTM5OTk2LDQuMjQ2MDAwNTIgMTMuNDIxMDAwNSw0LjMyNzk5OTcgMTMuMzExLDQuMzg4IEMxMy4yMDA5OTk0LDQuNDQ4MDAwMyAxMy4wNzgwMDA3LDQuNDg4OTk5ODkgMTIuOTQyLDQuNTExIEMxMi44MDU5OTkzLDQuNTMzMDAwMTEgMTIuNjY2MDAwNyw0LjU0NCAxMi41MjIsNC41NDQgTDEyLjUyMiw0Ljk1MiBMMTMuNjI2LDQuOTUyIEwxMy42MjYsOCBMMTQuMTM2LDggWicgaWQ9JzExJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J00yMC44LDUgTDIwLjgsMC43NDYgTDIwLjQxLDAuNzQ2IEMyMC4zODE5OTk5LDAuOTA2MDAwOCAyMC4zMzAwMDA0LDEuMDM3OTk5NDggMjAuMjU0LDEuMTQyIEMyMC4xNzc5OTk2LDEuMjQ2MDAwNTIgMjAuMDg1MDAwNSwxLjMyNzk5OTcgMTkuOTc1LDEuMzg4IEMxOS44NjQ5OTk0LDEuNDQ4MDAwMyAxOS43NDIwMDA3LDEuNDg4OTk5ODkgMTkuNjA2LDEuNTExIEMxOS40Njk5OTkzLDEuNTMzMDAwMTEgMTkuMzMwMDAwNywxLjU0NCAxOS4xODYsMS41NDQgTDE5LjE4NiwxLjk1MiBMMjAuMjksMS45NTIgTDIwLjI5LDUgTDIwLjgsNSBaIE0yMi4yNjQsMi4yNTIgTDIyLjc3NCwyLjI1MiBDMjIuNzcsMi4xMjM5OTkzNiAyMi43ODI5OTk4LDEuOTk3MDAwNjMgMjIuODEzLDEuODcxIEMyMi44NDMwMDAxLDEuNzQ0OTk5MzcgMjIuODkxOTk5NywxLjYzMjAwMDUgMjIuOTYsMS41MzIgQzIzLjAyODAwMDMsMS40MzE5OTk1IDIzLjExNDk5OTUsMS4zNTEwMDAzMSAyMy4yMjEsMS4yODkgQzIzLjMyNzAwMDUsMS4yMjY5OTk2OSAyMy40NTM5OTkzLDEuMTk2IDIzLjYwMiwxLjE5NiBDMjMuNzE0MDAwNiwxLjE5NiAyMy44MTk5OTk1LDEuMjEzOTk5ODIgMjMuOTIsMS4yNSBDMjQuMDIwMDAwNSwxLjI4NjAwMDE4IDI0LjEwNjk5OTYsMS4zMzc5OTk2NiAyNC4xODEsMS40MDYgQzI0LjI1NTAwMDQsMS40NzQwMDAzNCAyNC4zMTM5OTk4LDEuNTU0OTk5NTMgMjQuMzU4LDEuNjQ5IEMyNC40MDIwMDAyLDEuNzQzMDAwNDcgMjQuNDI0LDEuODQ3OTk5NDIgMjQuNDI0LDEuOTY0IEMyNC40MjQsMi4xMTIwMDA3NCAyNC40MDEwMDAyLDIuMjQxOTk5NDQgMjQuMzU1LDIuMzU0IEMyNC4zMDg5OTk4LDIuNDY2MDAwNTYgMjQuMjQxMDAwNCwyLjU2OTk5OTUyIDI0LjE1MSwyLjY2NiBDMjQuMDYwOTk5NSwyLjc2MjAwMDQ4IDIzLjk0ODAwMDcsMi44NTY5OTk1MyAyMy44MTIsMi45NTEgQzIzLjY3NTk5OTMsMy4wNDUwMDA0NyAyMy41MTgwMDA5LDMuMTQ3OTk5NDQgMjMuMzM4LDMuMjYgQzIzLjE4OTk5OTMsMy4zNDgwMDA0NCAyMy4wNDgwMDA3LDMuNDQxOTk5NSAyMi45MTIsMy41NDIgQzIyLjc3NTk5OTMsMy42NDIwMDA1IDIyLjY1NDAwMDUsMy43NTc5OTkzNCAyMi41NDYsMy44OSBDMjIuNDM3OTk5NSw0LjAyMjAwMDY2IDIyLjM0OTAwMDMsNC4xNzY5OTkxMSAyMi4yNzksNC4zNTUgQzIyLjIwODk5OTYsNC41MzMwMDA4OSAyMi4xNjQwMDAxLDQuNzQ3OTk4NzQgMjIuMTQ0LDUgTDI0LjkyMiw1IEwyNC45MjIsNC41NSBMMjIuNzM4LDQuNTUgQzIyLjc2MjAwMDEsNC40MTc5OTkzNCAyMi44MTI5OTk2LDQuMzAxMDAwNTEgMjIuODkxLDQuMTk5IEMyMi45NjkwMDA0LDQuMDk2OTk5NDkgMjMuMDYyOTk5NCw0LjAwMjAwMDQ0IDIzLjE3MywzLjkxNCBDMjMuMjgzMDAwNSwzLjgyNTk5OTU2IDIzLjQwMzk5OTMsMy43NDMwMDAzOSAyMy41MzYsMy42NjUgQzIzLjY2ODAwMDcsMy41ODY5OTk2MSAyMy43OTk5OTkzLDMuNTA4MDAwNCAyMy45MzIsMy40MjggQzI0LjA2NDAwMDcsMy4zNDM5OTk1OCAyNC4xOTE5OTk0LDMuMjU2MDAwNDYgMjQuMzE2LDMuMTY0IEMyNC40NDAwMDA2LDMuMDcxOTk5NTQgMjQuNTQ5OTk5NSwyLjk2OTAwMDU3IDI0LjY0NiwyLjg1NSBDMjQuNzQyMDAwNSwyLjc0MDk5OTQzIDI0LjgxODk5OTcsMi42MTIwMDA3MiAyNC44NzcsMi40NjggQzI0LjkzNTAwMDMsMi4zMjM5OTkyOCAyNC45NjQsMi4xNTgwMDA5NCAyNC45NjQsMS45NyBDMjQuOTY0LDEuNzY5OTk5IDI0LjkyOTAwMDMsMS41OTQwMDA3NiAyNC44NTksMS40NDIgQzI0Ljc4ODk5OTYsMS4yODk5OTkyNCAyNC42OTQwMDA2LDEuMTYzMDAwNTEgMjQuNTc0LDEuMDYxIEMyNC40NTM5OTk0LDAuOTU4OTk5NDkgMjQuMzEzMDAwOCwwLjg4MTAwMDI3IDI0LjE1MSwwLjgyNyBDMjMuOTg4OTk5MiwwLjc3Mjk5OTczIDIzLjgxNjAwMDksMC43NDYgMjMuNjMyLDAuNzQ2IEMyMy40MDc5OTg5LDAuNzQ2IDIzLjIwODAwMDksMC43ODM5OTk2MiAyMy4wMzIsMC44NiBDMjIuODU1OTk5MSwwLjkzNjAwMDM4IDIyLjcwOTAwMDYsMS4wNDA5OTkzMyAyMi41OTEsMS4xNzUgQzIyLjQ3Mjk5OTQsMS4zMDkwMDA2NyAyMi4zODYwMDAzLDEuNDY3OTk5MDggMjIuMzMsMS42NTIgQzIyLjI3Mzk5OTcsMS44MzYwMDA5MiAyMi4yNTE5OTk5LDIuMDM1OTk4OTIgMjIuMjY0LDIuMjUyIEwyMi4yNjQsMi4yNTIgWicgaWQ9JzEyJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSdIb3VyJyBmaWxsPScjMkEyOTI5JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgyNS4zMTkyOTcsIDIzLjYxMTkxNykgcm90YXRlKC0zOC4wMDAwMDApIHRyYW5zbGF0ZSgtMjUuMzE5Mjk3LCAtMjMuNjExOTE3KSAnIHBvaW50cz0nMjQuODE5Mjk3MiAxNS42MTE5MTY4IDI1LjgxOTI5NzIgMTUuNjExOTE2OCAyNS44MTkyOTcyIDMxLjYxMTkxNjggMjQuODE5Mjk3MiAzMS42MTE5MTY4Jz48L3BvbHlnb24+XG5cdCAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9J01pbnV0ZScgZmlsbD0nIzJBMjkyOScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTkuMzI5OTQ5LCAzNS43MzAwMjgpIHJvdGF0ZSg2Mi4wMDAwMDApIHRyYW5zbGF0ZSgtMTkuMzI5OTQ5LCAtMzUuNzMwMDI4KSAnIHBvaW50cz0nMTkuMDQ5NDMyMSAyNC4yOTg2OTkxIDE5LjkxODQzNjMgMjQuMjk4Njk5MSAxOS43ODc0NDA0IDQ3LjI5ODY5OTEgMTguOTE4NDM2MyA0Ny4yOTg2OTkxJz48L3BvbHlnb24+XG5cdCAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9J1NlY29uZCcgZmlsbD0nI0RENDUyNCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMzkuNjQ0NjIxLCAzMi4xMjk0ODApIHJvdGF0ZSgtNzYuMDAwMDAwKSB0cmFuc2xhdGUoLTM5LjY0NDYyMSwgLTMyLjEyOTQ4MCkgJyBwb2ludHM9JzM4Ljk1MjM1NjUgMTguMjQ4MjMxNSAzOS45MjIxMTM4IDE4LjI0ODIzMTUgMzkuOTUyMzU2NSA0Ni4yNDgyMzE1IDM4Ljk4MjU5OTIgNDYuMjQ4MjMxNSc+PC9wb2x5Z29uPlxuXHQgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9J092YWwtMTMnIGZpbGw9JyMyQTI5MjknIGN4PSczMCcgY3k9JzMwJyByPScxLjI1Jz48L2NpcmNsZT5cblx0ICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSdPdmFsLTE0JyBmaWxsPScjREQ0NTI0JyBjeD0nMzAnIGN5PSczMCcgcj0nMC43NSc+PC9jaXJjbGU+XG5cdCAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICA8L2c+XG5cdCAgICA8L2c+XG5cdDwvc3ZnPlwiXG5cdG1hcHNfYXBwOlwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdDxzdmcgd2lkdGg9JzYwcHgnIGhlaWdodD0nNjBweCcgdmlld0JveD0nMCAwIDYwIDYwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdCAgICA8dGl0bGU+TWFwczwvdGl0bGU+XG5cdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0ICAgIDxkZWZzPlxuXHQgICAgICAgIDxwYXRoIGQ9J00zOS4wODE1LDAgQzQ1LjEwNSwwIDQ4LjExNiwwIDUxLjM1ODUsMS4wMjUgQzU0Ljg5ODUsMi4zMTM1IDU3LjY4NjUsNS4xMDE1IDU4Ljk3NSw4LjY0MTUgQzYwLDExLjg4MzUgNjAsMTQuODk1NSA2MCwyMC45MTg1IEw2MCwzOS4wODE1IEM2MCw0NS4xMDUgNjAsNDguMTE2IDU4Ljk3NSw1MS4zNTg1IEM1Ny42ODY1LDU0Ljg5ODUgNTQuODk4NSw1Ny42ODY1IDUxLjM1ODUsNTguOTc0NSBDNDguMTE2LDYwIDQ1LjEwNSw2MCAzOS4wODE1LDYwIEwyMC45MTg1LDYwIEMxNC44OTUsNjAgMTEuODgzNSw2MCA4LjY0MTUsNTguOTc0NSBDNS4xMDE1LDU3LjY4NjUgMi4zMTM1LDU0Ljg5ODUgMS4wMjUsNTEuMzU4NSBDMCw0OC4xMTYgMCw0NS4xMDUgMCwzOS4wODE1IEwwLDIwLjkxODUgQzAsMTQuODk1NSAwLDExLjg4MzUgMS4wMjUsOC42NDE1IEMyLjMxMzUsNS4xMDE1IDUuMTAxNSwyLjMxMzUgOC42NDE1LDEuMDI1IEMxMS44ODM1LDAgMTQuODk1LDAgMjAuOTE4NSwwIEwzOS4wODE1LDAgWicgaWQ9J3BhdGgtMSc+PC9wYXRoPlxuXHQgICAgICAgIDxwYXRoIGQ9J00tNC41LDMwIEMtNC41LDMwIC00LjQ3NDYyNjI1LDMwLjQ5Njc4MDcgLTQuNDI1MTE2OTUsMzAuNDkxMjQwMSBDLTMuNDQyMjkwNTUsMzAuMzgxMjUwNiA5LjEwNDQ1Njk2LDI4LjQ5NDY5MjMgMTcuNTA3NTY4NCwzNC41MDkyNzczIEMyMy4yNjgzMTA1LDM4LjYzMjU2ODQgMjYuNDIwNzgsNDMuNzQ5MDA4NyAzMSw0OC4xODQ4MTQ1IEMzNi43OTE5OTIyLDUzLjc5NTQxMDIgNDQuMzMxNDA0Miw1NS42NjgwNjY0IDUwLjQwNTgxNDQsNTYuMjUwMjkzIEM1Ni40ODAyMjQ2LDU2LjgzMjUxOTUgNjUsNTYgNjUsNTYgTDY1LDY2IEM2NSw2NiA1My41NDg5NjMzLDY1LjM3NjkzODUgNDcuODIzNDg2Myw2NC42Nzg0NjY4IEM0Mi4wOTgwMDkzLDYzLjk3OTk5NTEgMzMuMjQ3MDcwMyw2Mi4wMjYxMjMgMjcuMzkyMzM0LDU3LjkyNzAwMiBDMTcuOTkwOTY2OCw1MC4xNzI4NTE2IDE5LjI3Nzg3NCw0Ny44MTkzNzYzIDEyLjI5MTc0OCw0My4yMjQ2MDk0IEM1LjI0MDcyMjY2LDM4LjU4NzE1ODIgLTQuNSw0MC41IC00LjUsNDAuNSBMLTQuNSwzMCBaJyBpZD0ncGF0aC0zJz48L3BhdGg+XG5cdCAgICAgICAgPG1hc2sgaWQ9J21hc2stNCcgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9Jy0wLjUnIHk9Jy0wLjUnIHdpZHRoPSc3MC41JyBoZWlnaHQ9JzM3Jz5cblx0ICAgICAgICAgICAgPHJlY3QgeD0nLTUnIHk9JzI5LjUnIHdpZHRoPSc3MC41JyBoZWlnaHQ9JzM3JyBmaWxsPSd3aGl0ZSc+PC9yZWN0PlxuXHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTMnIGZpbGw9J2JsYWNrJz48L3VzZT5cblx0ICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgPHBvbHlnb24gaWQ9J3BhdGgtNScgcG9pbnRzPSc1MC41IDYwIDQxLjUgNjAgNDEuNSAxOC44NDI5NzUyIDAgMTguODQyOTc1MiAwIDkuOTE3MzU1MzcgNDEuNSA5LjkxNzM1NTM3IDQxLjUgMCA1MC41IDAgNTAuNSA5LjkxNzM1NTM3IDYwIDkuOTE3MzU1MzcgNjAgMTguODQyOTc1MiA1MC41IDE4Ljg0Mjk3NTIgNTAuNSAzNi42OTQyMTQ5IDYwIDM2LjY5NDIxNDkgNjAgNDUuNjE5ODM0NyA1MC41IDQ1LjYxOTgzNDcnPjwvcG9seWdvbj5cblx0ICAgICAgICA8bWFzayBpZD0nbWFzay02JyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nLTAuNScgeT0nLTAuNScgd2lkdGg9JzYxJyBoZWlnaHQ9JzYxJz5cblx0ICAgICAgICAgICAgPHJlY3QgeD0nLTAuNScgeT0nLTAuNScgd2lkdGg9JzYxJyBoZWlnaHQ9JzYxJyBmaWxsPSd3aGl0ZSc+PC9yZWN0PlxuXHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTUnIGZpbGw9J2JsYWNrJz48L3VzZT5cblx0ICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgPHBhdGggZD0nTTAuNSw3LjUgQzAuODE0OTYxNTQ4LDEzLjg0NTkwNTEgNS4wMzY3OTY1NiwxOS41IDEyLjc1LDE5LjUgQzIwLjQ2MzIwMzQsMTkuNSAyNC42MzE0NzU1LDEzLjg0MzkzODEgMjUsNy41IEMyNS4xMjM1MzUyLDUuMzczNDEzMDkgMjQuMzY3NDMxNiwyLjU2NTU1MTc2IDIzLjUwNjgxMzEsMS4yNzEwMTQyIEMyMi40NTQ5NTY1LDIuMDI1OTkyODUgMjAuNDM3MzU2MiwyLjUgMTguNzUsMi41IEMxNi4xNTk2NjMxLDIuNSAxMy40NjkzODQ4LDEuODgyOTIxMDYgMTIuNzUsMC4zNDcxMzM3OTkgQzEyLjAzMDYxNTIsMS44ODI5MjEwNiA5LjM0MDMzNjg5LDIuNSA2Ljc1LDIuNSBDNS4wNjI2NDM4MywyLjUgMy4wNDUwNDM0NiwyLjAyNTk5Mjg1IDEuOTkzMTg2ODYsMS4yNzEwMTQyIEMxLjEzMjkzNDU3LDIuNzY0MTYwMTYgMC4zOTIwODk4NDQsNS4zMjU4MDU2NiAwLjUsNy41IFonIGlkPSdwYXRoLTcnPjwvcGF0aD5cblx0ICAgICAgICA8bWFzayBpZD0nbWFzay04JyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nMCcgeT0nMCcgd2lkdGg9JzI0LjUyMzc3ODcnIGhlaWdodD0nMTkuMTUyODY2MicgZmlsbD0nd2hpdGUnPlxuXHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTcnPjwvdXNlPlxuXHQgICAgICAgIDwvbWFzaz5cblx0ICAgICAgICA8bWFzayBpZD0nbWFzay0xMCcgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPScyNC41MjM3Nzg3JyBoZWlnaHQ9JzE5LjE1Mjg2NjInIGZpbGw9J3doaXRlJz5cblx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC03Jz48L3VzZT5cblx0ICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgPHJlY3QgaWQ9J3BhdGgtMTEnIHg9JzAnIHk9JzAuNScgd2lkdGg9JzI1JyBoZWlnaHQ9JzUnPjwvcmVjdD5cblx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci0xMic+XG5cdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzEnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAxICAgMCAwIDAgMCAxICAgMCAwIDAgMCAxICAwIDAgMCAxIDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHQgICAgICAgIDwvZmlsdGVyPlxuXHQgICAgICAgIDxwYXRoIGQ9J00wLjUsNy41IEMwLjgxNDk2MTU0OCwxMy44NDU5MDUxIDUuMDM2Nzk2NTYsMTkuNSAxMi43NSwxOS41IEMyMC40NjMyMDM0LDE5LjUgMjQuNjMxNDc1NSwxMy44NDM5MzgxIDI1LDcuNSBDMjUuMTIzNTM1Miw1LjM3MzQxMzA5IDI0LjM2NzQzMTYsMi41NjU1NTE3NiAyMy41MDY4MTMxLDEuMjcxMDE0MiBDMjIuNDU0OTU2NSwyLjAyNTk5Mjg1IDIwLjQzNzM1NjIsMi41IDE4Ljc1LDIuNSBDMTYuMTU5NjYzMSwyLjUgMTMuNDY5Mzg0OCwxLjg4MjkyMTA2IDEyLjc1LDAuMzQ3MTMzNzk5IEMxMi4wMzA2MTUyLDEuODgyOTIxMDYgOS4zNDAzMzY4OSwyLjUgNi43NSwyLjUgQzUuMDYyNjQzODMsMi41IDMuMDQ1MDQzNDYsMi4wMjU5OTI4NSAxLjk5MzE4Njg2LDEuMjcxMDE0MiBDMS4xMzI5MzQ1NywyLjc2NDE2MDE2IDAuMzkyMDg5ODQ0LDUuMzI1ODA1NjYgMC41LDcuNSBaJyBpZD0ncGF0aC0xMyc+PC9wYXRoPlxuXHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTE0JyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nMCcgeT0nMCcgd2lkdGg9JzI0LjUyMzc3ODcnIGhlaWdodD0nMTkuMTUyODY2MicgZmlsbD0nd2hpdGUnPlxuXHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTEzJz48L3VzZT5cblx0ICAgICAgICA8L21hc2s+XG5cdCAgICA8L2RlZnM+XG5cdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0ICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS1TRScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE2OC4wMDAwMDAsIC0xMTUuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgIDxnIGlkPSdIb21lLVNjcmVlbi3igKItaVBob25lLTZzLUNvcHknIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCAyNy4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgIDxnIGlkPSdNYXBzJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxNjguMDAwMDAwLCA4OC4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgICAgICA8bWFzayBpZD0nbWFzay0yJyBmaWxsPSd3aGl0ZSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9tYXNrPlxuXHQgICAgICAgICAgICAgICAgICAgIDx1c2UgaWQ9J0JHJyBmaWxsPScjRTREREM5JyB4bGluazpocmVmPScjcGF0aC0xJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nQmxvY2snIGZpbGw9JyM3NkM2M0InIG1hc2s9J3VybCgjbWFzay0yKScgeD0nMCcgeT0nMCcgd2lkdGg9JzQyJyBoZWlnaHQ9JzEwJz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J0Jsb2NrJyBmaWxsPScjRkJDNkQxJyBtYXNrPSd1cmwoI21hc2stMiknIHg9JzQ1JyB5PScwLjUnIHdpZHRoPScxNScgaGVpZ2h0PScxMCc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdIaWdod2F5JyBtYXNrPSd1cmwoI21hc2stMiknPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9JyNGRkRFMDInIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtMyc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2Ugc3Ryb2tlPScjRkVCMzEyJyBtYXNrPSd1cmwoI21hc2stNCknIHN0cm9rZS13aWR0aD0nMScgeGxpbms6aHJlZj0nI3BhdGgtMyc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdNYXAnIG1hc2s9J3VybCgjbWFzay0yKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nI0ZGRkZGRicgZmlsbC1ydWxlPSdldmVub2RkJyB4bGluazpocmVmPScjcGF0aC01Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBzdHJva2Utb3BhY2l0eT0nMC4xJyBzdHJva2U9JyMwMDAwMDAnIG1hc2s9J3VybCgjbWFzay02KScgc3Ryb2tlLXdpZHRoPScxJyB4bGluazpocmVmPScjcGF0aC01Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTQzLjY1NjU5MTQsMzUuNSBMNDMuNDQ4OTc5NiwzNS41IEw0My40NDg5Nzk2LDE3IEwtMSwxNyBMLTEsMTIgTDQ4LjUsMTIgTDQ4LjUsMTQuNSBMNDguNSwxNC41IEw0OC41LDM1LjUgTDQ4LjI5MjM4ODIsMzUuNSBDNDcuNTg2ODk5LDM1LjE3ODk5NiA0Ni44MDE4MTEsMzUgNDUuOTc0NDg5OCwzNSBDNDUuMTQ3MTY4NSwzNSA0NC4zNjIwODA2LDM1LjE3ODk5NiA0My42NTY1OTE0LDM1LjUgTDQzLjY1NjU5MTQsMzUuNSBaJyBpZD0nUm91dGUnIGZpbGw9JyM0MDlCRkYnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdJbmRpY2F0b3InIG1hc2s9J3VybCgjbWFzay0yKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDQwLjUwMDAwMCwgMzUuNTAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSdDaXJjbGUnIGZpbGw9JyMwMDdBRkYnIGN4PSc1LjUnIGN5PSc1LjUnIHI9JzUuNSc+PC9jaXJjbGU+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0nQXJyb3cnIGZpbGw9JyNGRkZGRkYnIHBvaW50cz0nNy43NSA4Ljc1IDUuNSAxLjY1MzgwNTkyIDMuMjUgOC43NSA1LjUgNi42NTM4MDU5Mic+PC9wb2x5Z29uPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPScyODAnIG1hc2s9J3VybCgjbWFzay0yKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDguMDAwMDAwLCAyMi41MDAwMDApJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXNrIGlkPSdtYXNrLTknIGZpbGw9J3doaXRlJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTcnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXNrPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J092YWwtMjAnIHN0cm9rZT0nI0ZGRkZGRicgbWFzaz0ndXJsKCNtYXNrLTgpJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9JyMwMDdBRkYnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBtYXNrPSd1cmwoI21hc2stMTApJyB4bGluazpocmVmPScjcGF0aC03Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdUb3AnIHN0cm9rZT0nbm9uZScgZmlsbD0nbm9uZScgbWFzaz0ndXJsKCNtYXNrLTkpJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItMTIpJyB4bGluazpocmVmPScjcGF0aC0xMSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPScjREUxRDI2JyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHhsaW5rOmhyZWY9JyNwYXRoLTExJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdTaGllbGQnIHN0cm9rZT0nbm9uZScgZmlsbD0nbm9uZScgbWFzaz0ndXJsKCNtYXNrLTkpJyBzdHJva2Utd2lkdGg9JzEuNSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBzdHJva2U9JyNGRkZGRkYnIG1hc2s9J3VybCgjbWFzay0xNCknIHhsaW5rOmhyZWY9JyNwYXRoLTEzJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J001LjY0LDkuMzc4IEw2LjQwNSw5LjM3OCBDNi4zOTg5OTk5Nyw5LjE4NTk5OTA0IDYuNDE4NDk5NzgsOC45OTU1MDA5NSA2LjQ2MzUsOC44MDY1IEM2LjUwODUwMDIzLDguNjE3NDk5MDYgNi41ODE5OTk0OSw4LjQ0ODAwMDc1IDYuNjg0LDguMjk4IEM2Ljc4NjAwMDUxLDguMTQ3OTk5MjUgNi45MTY0OTkyMSw4LjAyNjUwMDQ3IDcuMDc1NSw3LjkzMzUgQzcuMjM0NTAwOCw3Ljg0MDQ5OTU0IDcuNDI0OTk4ODksNy43OTQgNy42NDcsNy43OTQgQzcuODE1MDAwODQsNy43OTQgNy45NzM5OTkyNSw3LjgyMDk5OTczIDguMTI0LDcuODc1IEM4LjI3NDAwMDc1LDcuOTI5MDAwMjcgOC40MDQ0OTk0NSw4LjAwNjk5OTQ5IDguNTE1NSw4LjEwOSBDOC42MjY1MDA1Niw4LjIxMTAwMDUxIDguNzE0OTk5NjcsOC4zMzI0OTkzIDguNzgxLDguNDczNSBDOC44NDcwMDAzMyw4LjYxNDUwMDcxIDguODgsOC43NzE5OTkxMyA4Ljg4LDguOTQ2IEM4Ljg4LDkuMTY4MDAxMTEgOC44NDU1MDAzNSw5LjM2Mjk5OTE2IDguNzc2NSw5LjUzMSBDOC43MDc0OTk2Niw5LjY5OTAwMDg0IDguNjA1NTAwNjgsOS44NTQ5OTkyOCA4LjQ3MDUsOS45OTkgQzguMzM1NDk5MzMsMTAuMTQzMDAwNyA4LjE2NjAwMTAyLDEwLjI4NTQ5OTMgNy45NjIsMTAuNDI2NSBDNy43NTc5OTg5OCwxMC41Njc1MDA3IDcuNTIxMDAxMzUsMTAuNzIxOTk5MiA3LjI1MSwxMC44OSBDNy4wMjg5OTg4OSwxMS4wMjIwMDA3IDYuODE2MDAxMDIsMTEuMTYyOTk5MyA2LjYxMiwxMS4zMTMgQzYuNDA3OTk4OTgsMTEuNDYzMDAwOCA2LjIyNTAwMDgxLDExLjYzNjk5OSA2LjA2MywxMS44MzUgQzUuOTAwOTk5MTksMTIuMDMzMDAxIDUuNzY3NTAwNTMsMTIuMjY1NDk4NyA1LjY2MjUsMTIuNTMyNSBDNS41NTc0OTk0OCwxMi43OTk1MDEzIDUuNDkwMDAwMTUsMTMuMTIxOTk4MSA1LjQ2LDEzLjUgTDkuNjI3LDEzLjUgTDkuNjI3LDEyLjgyNSBMNi4zNTEsMTIuODI1IEM2LjM4NzAwMDE4LDEyLjYyNjk5OSA2LjQ2MzQ5OTQyLDEyLjQ1MTUwMDggNi41ODA1LDEyLjI5ODUgQzYuNjk3NTAwNTksMTIuMTQ1NDk5MiA2LjgzODQ5OTE4LDEyLjAwMzAwMDcgNy4wMDM1LDExLjg3MSBDNy4xNjg1MDA4MywxMS43Mzg5OTkzIDcuMzQ5OTk5MDEsMTEuNjE0NTAwNiA3LjU0OCwxMS40OTc1IEM3Ljc0NjAwMDk5LDExLjM4MDQ5OTQgNy45NDM5OTkwMSwxMS4yNjIwMDA2IDguMTQyLDExLjE0MiBDOC4zNDAwMDA5OSwxMS4wMTU5OTk0IDguNTMxOTk5MDcsMTAuODg0MDAwNyA4LjcxOCwxMC43NDYgQzguOTA0MDAwOTMsMTAuNjA3OTk5MyA5LjA2ODk5OTI4LDEwLjQ1MzUwMDkgOS4yMTMsMTAuMjgyNSBDOS4zNTcwMDA3MiwxMC4xMTE0OTkxIDkuNDcyNDk5NTcsOS45MTgwMDEwOCA5LjU1OTUsOS43MDIgQzkuNjQ2NTAwNDQsOS40ODU5OTg5MiA5LjY5LDkuMjM3MDAxNDEgOS42OSw4Ljk1NSBDOS42OSw4LjY1NDk5ODUgOS42Mzc1MDA1Myw4LjM5MTAwMTE0IDkuNTMyNSw4LjE2MyBDOS40Mjc0OTk0OCw3LjkzNDk5ODg2IDkuMjg1MDAwOSw3Ljc0NDUwMDc3IDkuMTA1LDcuNTkxNSBDOC45MjQ5OTkxLDcuNDM4NDk5MjQgOC43MTM1MDEyMiw3LjMyMTUwMDQxIDguNDcwNSw3LjI0MDUgQzguMjI3NDk4NzksNy4xNTk0OTk2IDcuOTY4MDAxMzgsNy4xMTkgNy42OTIsNy4xMTkgQzcuMzU1OTk4MzIsNy4xMTkgNy4wNTYwMDEzMiw3LjE3NTk5OTQzIDYuNzkyLDcuMjkgQzYuNTI3OTk4NjgsNy40MDQwMDA1NyA2LjMwNzUwMDg5LDcuNTYxNDk5IDYuMTMwNSw3Ljc2MjUgQzUuOTUzNDk5MTIsNy45NjM1MDEwMSA1LjgyMzAwMDQyLDguMjAxOTk4NjIgNS43MzksOC40NzggQzUuNjU0OTk5NTgsOC43NTQwMDEzOCA1LjYyMTk5OTkxLDkuMDUzOTk4MzggNS42NCw5LjM3OCBMNS42NCw5LjM3OCBaIE0xMS42NDMsOC43NzUgQzExLjY0Myw4LjYxMjk5OTE5IDExLjY3Mjk5OTcsOC40NzIwMDA2IDExLjczMyw4LjM1MiBDMTEuNzkzMDAwMyw4LjIzMTk5OTQgMTEuODcyNDk5NSw4LjEzMDAwMDQyIDExLjk3MTUsOC4wNDYgQzEyLjA3MDUwMDUsNy45NjE5OTk1OCAxMi4xODg5OTkzLDcuODk5MDAwMjEgMTIuMzI3LDcuODU3IEMxMi40NjUwMDA3LDcuODE0OTk5NzkgMTIuNjA4OTk5Myw3Ljc5NCAxMi43NTksNy43OTQgQzEzLjA3MTAwMTYsNy43OTQgMTMuMzI3NDk5LDcuODc2NDk5MTggMTMuNTI4NSw4LjA0MTUgQzEzLjcyOTUwMSw4LjIwNjUwMDgzIDEzLjgzLDguNDUwOTk4MzggMTMuODMsOC43NzUgQzEzLjgzLDkuMDk5MDAxNjIgMTMuNzMxMDAxLDkuMzUwOTk5MSAxMy41MzMsOS41MzEgQzEzLjMzNDk5OSw5LjcxMTAwMDkgMTMuMDgzMDAxNSw5LjgwMSAxMi43NzcsOS44MDEgQzEyLjYyMDk5OTIsOS44MDEgMTIuNDc0MDAwNyw5Ljc4MDAwMDIxIDEyLjMzNiw5LjczOCBDMTIuMTk3OTk5Myw5LjY5NTk5OTc5IDEyLjA3ODAwMDUsOS42MzMwMDA0MiAxMS45NzYsOS41NDkgQzExLjg3Mzk5OTUsOS40NjQ5OTk1OCAxMS43OTMwMDAzLDkuMzU4NTAwNjUgMTEuNzMzLDkuMjI5NSBDMTEuNjcyOTk5Nyw5LjEwMDQ5OTM2IDExLjY0Myw4Ljk0OTAwMDg3IDExLjY0Myw4Ljc3NSBMMTEuNjQzLDguNzc1IFogTTEwLjgzMyw4Ljc0OCBDMTAuODMzLDkuMDM2MDAxNDQgMTAuOTEzOTk5Miw5LjMwMTQ5ODc5IDExLjA3Niw5LjU0NDUgQzExLjIzODAwMDgsOS43ODc1MDEyMiAxMS40NTM5OTg3LDkuOTYyOTk5NDYgMTEuNzI0LDEwLjA3MSBDMTEuMzYzOTk4MiwxMC4xOTcwMDA2IDExLjA4ODAwMSwxMC4zOTk0OTg2IDEwLjg5NiwxMC42Nzg1IEMxMC43MDM5OTksMTAuOTU3NTAxNCAxMC42MDgsMTEuMjg1OTk4MSAxMC42MDgsMTEuNjY0IEMxMC42MDgsMTEuOTg4MDAxNiAxMC42NjM0OTk0LDEyLjI3MTQ5ODggMTAuNzc0NSwxMi41MTQ1IEMxMC44ODU1MDA2LDEyLjc1NzUwMTIgMTEuMDM4NDk5LDEyLjk1OTk5OTIgMTEuMjMzNSwxMy4xMjIgQzExLjQyODUwMSwxMy4yODQwMDA4IDExLjY1Nzk5ODcsMTMuNDAzOTk5NiAxMS45MjIsMTMuNDgyIEMxMi4xODYwMDEzLDEzLjU2MDAwMDQgMTIuNDcwOTk4NSwxMy41OTkgMTIuNzc3LDEzLjU5OSBDMTMuMDcxMDAxNSwxMy41OTkgMTMuMzQ2OTk4NywxMy41NTcwMDA0IDEzLjYwNSwxMy40NzMgQzEzLjg2MzAwMTMsMTMuMzg4OTk5NiAxNC4wODY0OTkxLDEzLjI2NDUwMDggMTQuMjc1NSwxMy4wOTk1IEMxNC40NjQ1MDA5LDEyLjkzNDQ5OTIgMTQuNjE0NDk5NCwxMi43MzIwMDEyIDE0LjcyNTUsMTIuNDkyIEMxNC44MzY1MDA2LDEyLjI1MTk5ODggMTQuODkyLDExLjk3NjAwMTYgMTQuODkyLDExLjY2NCBDMTQuODkyLDExLjI2Nzk5OCAxNC43OTkwMDA5LDEwLjkzMzUwMTQgMTQuNjEzLDEwLjY2MDUgQzE0LjQyNjk5OTEsMTAuMzg3NDk4NiAxNC4xNDIwMDE5LDEwLjE5MTAwMDYgMTMuNzU4LDEwLjA3MSBDMTQuMDI4MDAxNCw5Ljk1MDk5OTQgMTQuMjQyNDk5Miw5Ljc3MjUwMTE5IDE0LjQwMTUsOS41MzU1IEMxNC41NjA1MDA4LDkuMjk4NDk4ODIgMTQuNjQsOS4wMzYwMDE0NCAxNC42NCw4Ljc0OCBDMTQuNjQsOC41NDM5OTg5OCAxNC42MDQwMDA0LDguMzQ0NTAwOTggMTQuNTMyLDguMTQ5NSBDMTQuNDU5OTk5Niw3Ljk1NDQ5OTAzIDE0LjM0NzUwMDgsNy43ODA1MDA3NyAxNC4xOTQ1LDcuNjI3NSBDMTQuMDQxNDk5Miw3LjQ3NDQ5OTI0IDEzLjg0MjAwMTIsNy4zNTE1MDA0NyAxMy41OTYsNy4yNTg1IEMxMy4zNDk5OTg4LDcuMTY1NDk5NTQgMTMuMDUzMDAxNyw3LjExOSAxMi43MDUsNy4xMTkgQzEyLjQ1ODk5ODgsNy4xMTkgMTIuMjIzNTAxMSw3LjE1NDk5OTY0IDExLjk5ODUsNy4yMjcgQzExLjc3MzQ5ODksNy4yOTkwMDAzNiAxMS41NzQwMDA5LDcuNDAzOTk5MzEgMTEuNCw3LjU0MiBDMTEuMjI1OTk5MSw3LjY4MDAwMDY5IDExLjA4ODAwMDUsNy44NDk0OTkgMTAuOTg2LDguMDUwNSBDMTAuODgzOTk5NSw4LjI1MTUwMTAxIDEwLjgzMyw4LjQ4Mzk5ODY4IDEwLjgzMyw4Ljc0OCBMMTAuODMzLDguNzQ4IFogTTExLjQxOCwxMS43IEMxMS40MTgsMTEuNTEzOTk5MSAxMS40NTI0OTk3LDExLjM0NjAwMDggMTEuNTIxNSwxMS4xOTYgQzExLjU5MDUwMDMsMTEuMDQ1OTk5MyAxMS42ODY0OTk0LDEwLjkxNzAwMDUgMTEuODA5NSwxMC44MDkgQzExLjkzMjUwMDYsMTAuNzAwOTk5NSAxMi4wNzY0OTkyLDEwLjYxODUwMDMgMTIuMjQxNSwxMC41NjE1IEMxMi40MDY1MDA4LDEwLjUwNDQ5OTcgMTIuNTgxOTk5MSwxMC40NzYgMTIuNzY4LDEwLjQ3NiBDMTIuOTQ4MDAwOSwxMC40NzYgMTMuMTE3NDk5MiwxMC41MDc0OTk3IDEzLjI3NjUsMTAuNTcwNSBDMTMuNDM1NTAwOCwxMC42MzM1MDAzIDEzLjU3NDk5OTQsMTAuNzE4OTk5NSAxMy42OTUsMTAuODI3IEMxMy44MTUwMDA2LDEwLjkzNTAwMDUgMTMuOTA5NDk5NywxMS4wNjI0OTkzIDEzLjk3ODUsMTEuMjA5NSBDMTQuMDQ3NTAwMywxMS4zNTY1MDA3IDE0LjA4MiwxMS41MTY5OTkxIDE0LjA4MiwxMS42OTEgQzE0LjA4MiwxMS44NzEwMDA5IDE0LjA1MDUwMDMsMTIuMDM1OTk5MyAxMy45ODc1LDEyLjE4NiBDMTMuOTI0NDk5NywxMi4zMzYwMDA4IDEzLjgzNDUwMDYsMTIuNDY2NDk5NCAxMy43MTc1LDEyLjU3NzUgQzEzLjYwMDQ5OTQsMTIuNjg4NTAwNiAxMy40NjI1MDA4LDEyLjc3NTQ5OTcgMTMuMzAzNSwxMi44Mzg1IEMxMy4xNDQ0OTkyLDEyLjkwMTUwMDMgMTIuOTY5MDAxLDEyLjkzMyAxMi43NzcsMTIuOTMzIEMxMi4zODA5OTgsMTIuOTMzIDEyLjA1NTUwMTMsMTIuODIzNTAxMSAxMS44MDA1LDEyLjYwNDUgQzExLjU0NTQ5ODcsMTIuMzg1NDk4OSAxMS40MTgsMTIuMDg0MDAxOSAxMS40MTgsMTEuNyBMMTEuNDE4LDExLjcgWiBNMTYuNDQsMTAuMzU5IEMxNi40NCwxMC4yMDI5OTkyIDE2LjQ0MTUsMTAuMDMwNTAwOSAxNi40NDQ1LDkuODQxNSBDMTYuNDQ3NSw5LjY1MjQ5OTA2IDE2LjQ2MjQ5OTksOS40NjM1MDA5NSAxNi40ODk1LDkuMjc0NSBDMTYuNTE2NTAwMSw5LjA4NTQ5OTA2IDE2LjU1NTQ5OTcsOC45MDEwMDA5IDE2LjYwNjUsOC43MjEgQzE2LjY1NzUwMDMsOC41NDA5OTkxIDE2LjczMjQ5OTUsOC4zODM1MDA2OCAxNi44MzE1LDguMjQ4NSBDMTYuOTMwNTAwNSw4LjExMzQ5OTMzIDE3LjA1NDk5OTMsOC4wMDQwMDA0MiAxNy4yMDUsNy45MiBDMTcuMzU1MDAwOCw3LjgzNTk5OTU4IDE3LjUzNzk5ODksNy43OTQgMTcuNzU0LDcuNzk0IEMxNy45NzAwMDExLDcuNzk0IDE4LjE1Mjk5OTMsNy44MzU5OTk1OCAxOC4zMDMsNy45MiBDMTguNDUzMDAwOCw4LjAwNDAwMDQyIDE4LjU3NzQ5OTUsOC4xMTM0OTkzMyAxOC42NzY1LDguMjQ4NSBDMTguNzc1NTAwNSw4LjM4MzUwMDY4IDE4Ljg1MDQ5OTcsOC41NDA5OTkxIDE4LjkwMTUsOC43MjEgQzE4Ljk1MjUwMDMsOC45MDEwMDA5IDE4Ljk5MTQ5OTksOS4wODU0OTkwNiAxOS4wMTg1LDkuMjc0NSBDMTkuMDQ1NTAwMSw5LjQ2MzUwMDk1IDE5LjA2MDUsOS42NTI0OTkwNiAxOS4wNjM1LDkuODQxNSBDMTkuMDY2NSwxMC4wMzA1MDA5IDE5LjA2OCwxMC4yMDI5OTkyIDE5LjA2OCwxMC4zNTkgQzE5LjA2OCwxMC41OTkwMDEyIDE5LjA2MDUwMDEsMTAuODY3NDk4NSAxOS4wNDU1LDExLjE2NDUgQzE5LjAzMDQ5OTksMTEuNDYxNTAxNSAxOC45ODI1MDA0LDExLjc0MDQ5ODcgMTguOTAxNSwxMi4wMDE1IEMxOC44MjA0OTk2LDEyLjI2MjUwMTMgMTguNjkwMDAwOSwxMi40ODI5OTkxIDE4LjUxLDEyLjY2MyBDMTguMzI5OTk5MSwxMi44NDMwMDA5IDE4LjA3ODAwMTYsMTIuOTMzIDE3Ljc1NCwxMi45MzMgQzE3LjQyOTk5ODQsMTIuOTMzIDE3LjE3ODAwMDksMTIuODQzMDAwOSAxNi45OTgsMTIuNjYzIEMxNi44MTc5OTkxLDEyLjQ4Mjk5OTEgMTYuNjg3NTAwNCwxMi4yNjI1MDEzIDE2LjYwNjUsMTIuMDAxNSBDMTYuNTI1NDk5NiwxMS43NDA0OTg3IDE2LjQ3NzUwMDEsMTEuNDYxNTAxNSAxNi40NjI1LDExLjE2NDUgQzE2LjQ0NzQ5OTksMTAuODY3NDk4NSAxNi40NCwxMC41OTkwMDEyIDE2LjQ0LDEwLjM1OSBMMTYuNDQsMTAuMzU5IFogTTE1LjYzLDEwLjM2OCBDMTUuNjMsMTAuNjAyMDAxMiAxNS42MzU5OTk5LDEwLjg0NDk5ODcgMTUuNjQ4LDExLjA5NyBDMTUuNjYwMDAwMSwxMS4zNDkwMDEzIDE1LjY4OTk5OTgsMTEuNTk0OTk4OCAxNS43MzgsMTEuODM1IEMxNS43ODYwMDAyLDEyLjA3NTAwMTIgMTUuODU0OTk5NiwxMi4zMDE0OTg5IDE1Ljk0NSwxMi41MTQ1IEMxNi4wMzUwMDA1LDEyLjcyNzUwMTEgMTYuMTU3OTk5MiwxMi45MTQ5OTkyIDE2LjMxNCwxMy4wNzcgQzE2LjQ3MDAwMDgsMTMuMjM5MDAwOCAxNi42NjY0OTg4LDEzLjM2NjQ5OTUgMTYuOTAzNSwxMy40NTk1IEMxNy4xNDA1MDEyLDEzLjU1MjUwMDUgMTcuNDIzOTk4NCwxMy41OTkgMTcuNzU0LDEzLjU5OSBDMTguMDkwMDAxNywxMy41OTkgMTguMzc0OTk4OCwxMy41NTI1MDA1IDE4LjYwOSwxMy40NTk1IEMxOC44NDMwMDEyLDEzLjM2NjQ5OTUgMTkuMDM3OTk5MiwxMy4yMzkwMDA4IDE5LjE5NCwxMy4wNzcgQzE5LjM1MDAwMDgsMTIuOTE0OTk5MiAxOS40NzI5OTk2LDEyLjcyNzUwMTEgMTkuNTYzLDEyLjUxNDUgQzE5LjY1MzAwMDUsMTIuMzAxNDk4OSAxOS43MjE5OTk4LDEyLjA3NTAwMTIgMTkuNzcsMTEuODM1IEMxOS44MTgwMDAyLDExLjU5NDk5ODggMTkuODQ3OTk5OSwxMS4zNDkwMDEzIDE5Ljg2LDExLjA5NyBDMTkuODcyMDAwMSwxMC44NDQ5OTg3IDE5Ljg3OCwxMC42MDIwMDEyIDE5Ljg3OCwxMC4zNjggQzE5Ljg3OCwxMC4xMzM5OTg4IDE5Ljg3MjAwMDEsOS44OTEwMDEyNiAxOS44Niw5LjYzOSBDMTkuODQ3OTk5OSw5LjM4Njk5ODc0IDE5LjgxODAwMDIsOS4xNDEwMDEyIDE5Ljc3LDguOTAxIEMxOS43MjE5OTk4LDguNjYwOTk4OCAxOS42NTMwMDA1LDguNDMzMDAxMDggMTkuNTYzLDguMjE3IEMxOS40NzI5OTk2LDguMDAwOTk4OTIgMTkuMzUwMDAwOCw3LjgxMjAwMDgxIDE5LjE5NCw3LjY1IEMxOS4wMzc5OTkyLDcuNDg3OTk5MTkgMTguODQxNTAxMiw3LjM1OTAwMDQ4IDE4LjYwNDUsNy4yNjMgQzE4LjM2NzQ5ODgsNy4xNjY5OTk1MiAxOC4wODQwMDE3LDcuMTE5IDE3Ljc1NCw3LjExOSBDMTcuNDIzOTk4NCw3LjExOSAxNy4xNDA1MDEyLDcuMTY2OTk5NTIgMTYuOTAzNSw3LjI2MyBDMTYuNjY2NDk4OCw3LjM1OTAwMDQ4IDE2LjQ3MDAwMDgsNy40ODc5OTkxOSAxNi4zMTQsNy42NSBDMTYuMTU3OTk5Miw3LjgxMjAwMDgxIDE2LjAzNTAwMDUsOC4wMDA5OTg5MiAxNS45NDUsOC4yMTcgQzE1Ljg1NDk5OTYsOC40MzMwMDEwOCAxNS43ODYwMDAyLDguNjYwOTk4OCAxNS43MzgsOC45MDEgQzE1LjY4OTk5OTgsOS4xNDEwMDEyIDE1LjY2MDAwMDEsOS4zODY5OTg3NCAxNS42NDgsOS42MzkgQzE1LjYzNTk5OTksOS44OTEwMDEyNiAxNS42MywxMC4xMzM5OTg4IDE1LjYzLDEwLjM2OCBMMTUuNjMsMTAuMzY4IFonIGlkPScyODAnIHN0cm9rZT0nbm9uZScgZmlsbD0nI0ZGRkZGRicgZmlsbC1ydWxlPSdldmVub2RkJyBtYXNrPSd1cmwoI21hc2stOSknPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgIDwvZz5cblx0ICAgIDwvZz5cblx0PC9zdmc+XCJcblx0bmV3c19hcHA6XCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0PHN2ZyB3aWR0aD0nNjBweCcgaGVpZ2h0PSc2MHB4JyB2aWV3Qm94PScwIDAgNjAgNjAnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDM5LjEgKDMxNzIwKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0ICAgIDx0aXRsZT5OZXdzPC90aXRsZT5cblx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHQgICAgPGRlZnM+XG5cdCAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSc1MCUnIHkxPScwJScgeDI9JzUwJScgeTI9JzEwMCUnIGlkPSdsaW5lYXJHcmFkaWVudC0xJz5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nI0ZDNTM2Mycgb2Zmc2V0PScwJSc+PC9zdG9wPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjRkMzMzU5JyBvZmZzZXQ9JzEwMCUnPjwvc3RvcD5cblx0ICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuXHQgICAgICAgIDxwYXRoIGQ9J00xMC4xMzY2MjQsNDcuMzgyMzg1MyBDMTEsNDcuMzgyMzg1MyAxMSw0Ni41IDExLDQ2LjUgTDExLDEyLjAwNTI2MTcgQzExLDExLjQ1MDA3MSAxMS40NTMyMzAzLDExIDExLjk5Njg3NTQsMTEgTDQ4LjAwMzEyNDYsMTEgQzQ4LjU1MzY4MzcsMTEgNDksMTEuNDQxMzAzMiA0OSwxMi4wMDg4NDk4IEw0OSw0Ni45OTExNTAyIEM0OSw0Ny41NDgzMjI2IDQ4LjU0MzkyNSw0OC4wMDI5MDM0IDQ3Ljk5NjQwNzYsNDguMDA2Mjc4MiBDNDcuOTk2NDA3Niw0OC4wMDYyNzgyIDE4LjYwODQ4MzEsNDguMTk5NzU0NCAxMS4wMDAwMDAxLDQ4IEMxMC4xMTc0MTEzLDQ3Ljk3NjgyODQgOS40MTY2MjU5OCw0Ny42Njg0NTcgOS4wNTc1NTYxNSw0Ny4zODIzODUzIEM4LjY5ODQ4NjMzLDQ3LjA5NjMxMzUgOC4zNjMwOTgxNSw0Ni43MTE2NDYyIDguMzYzMDk4MTQsNDYuNjYwNzA1NiBDOC4zNjMwOTgxNCw0Ni40NTc0NzIgOS4yNzMyNDc5Niw0Ny4zODIzODUzIDEwLjEzNjYyNCw0Ny4zODIzODUzIFonIGlkPSdwYXRoLTInPjwvcGF0aD5cblx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci00Jz5cblx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PSctMScgZHk9JzAnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMjUgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHQgICAgICAgIDwvZmlsdGVyPlxuXHQgICAgPC9kZWZzPlxuXHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdCAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtU0UnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0yNDQuMDAwMDAwLCAtMTE1LjAwMDAwMCknPlxuXHQgICAgICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS02cy1Db3B5JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMjcuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICA8ZyBpZD0nTmV3cycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjQ0LjAwMDAwMCwgODguMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J0JHJyBmaWxsPSd1cmwoI2xpbmVhckdyYWRpZW50LTEpJyB4PScwJyB5PScwJyB3aWR0aD0nNjAnIGhlaWdodD0nNjAnIHJ4PScxNCc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J004LDQ1LjkxNjUyNjIgTDgsMTYuOTk1Mzc2NCBDOCwxNi40NDU2NDUyIDguNDU1MjYyODgsMTYgOC45OTU0NTcwMywxNiBMMzIuMDA0NTQzLDE2IEMzMi41NTQzMTg3LDE2IDMzLDE2LjQ1MjM2MjEgMzMsMTYuOTkyNzg2NCBMMzMsNDcuMDA3MjEzNiBDMzMsNDcuNTU1NTE0NCAzMi41NDQ3MzcxLDQ4IDMyLjAwNDU0Myw0OCBMMTAuOTkwNzUyMiw0OCBDOS4zMzkwMDUzOCw0OCA4LDQ2LjY1Njk0NzUgOCw0NS45MTY1MjYyIEw4LDQ1LjkxNjUyNjIgWicgaWQ9J0ZvbGQnIGZpbGw9JyNGRkZGRkYnPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgICAgICA8bWFzayBpZD0nbWFzay0zJyBmaWxsPSd3aGl0ZSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9tYXNrPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdNYXNrJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSdibGFjaycgZmlsbC1vcGFjaXR5PScxJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTQpJyB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPScjRkZGRkZGJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nbGluZXMnIGZpbGw9JyNCREJEQkQnIG1hc2s9J3VybCgjbWFzay0zKScgeD0nMTcnIHk9JzM1JyB3aWR0aD0nMzMnIGhlaWdodD0nMicgcng9JzEnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nbGluZXMnIGZpbGw9JyNCREJEQkQnIG1hc2s9J3VybCgjbWFzay0zKScgeD0nMTcnIHk9JzM5JyB3aWR0aD0nMzMnIGhlaWdodD0nMicgcng9JzEnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nbGluZXMnIGZpbGw9JyNCREJEQkQnIG1hc2s9J3VybCgjbWFzay0zKScgeD0nMTcnIHk9JzQzJyB3aWR0aD0nMzMnIGhlaWdodD0nMicgcng9JzEnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNMTYsMjAuMTIxMzIwMyBMMTYsMTYuOTk3NjU2NyBDMTYsMTYuNDQ2NjY2MSAxNi40NDEwNTM1LDE2IDE2Ljk5NzY1NjcsMTYgTDIwLjEyMTMyMDMsMTYgTDIwLDE2LjEyMTMyMDMgTDMxLDI3LjEyMTMyMDMgTDMxLDMwLjAwMTE0MzYgQzMxLDMwLjU1Mjc5NjggMzAuNTU1MDY2MSwzMSAzMC4wMDExNDM2LDMxIEwyNy4xMjEzMjAzLDMxIEwxNi4xMjEzMjAzLDIwIEwxNiwyMC4xMjEzMjAzIEwxNiwyMC4xMjEzMjAzIFogTTE2LDI5Ljk5OTc4MDkgQzE2LDMwLjU1MjE4NjcgMTYuNDUxMzI5NCwzMSAxNy4wMDAyMTkxLDMxIEwyMS44Nzg0NjA2LDMxIEMyMi40MzA4NjYzLDMxIDIyLjU2NTI0MjcsMzAuNjg2NTYzMSAyMi4xNjg0NDg0LDMwLjI4OTc2ODggTDE2LjcxMDIzMTIsMjQuODMxNTUxNiBDMTYuMzE3OTgxNCwyNC40MzkzMDE3IDE2LDI0LjU3MjY0OTcgMTYsMjUuMTIxNTM5NCBMMTYsMjkuOTk5NzgwOSBaIE0yOS45OTk3ODA5LDE2IEMzMC41NTIxODY3LDE2IDMxLDE2LjQ1MTMyOTQgMzEsMTcuMDAwMjE5MSBMMzEsMjEuODc4NDYwNiBDMzEsMjIuNDMwODY2MyAzMC42ODczODU1LDIyLjU2NjA2NTIgMzAuMjk1Njk4OSwyMi4xNzQzNzg1IEwyOS41OTEzOTc3LDIxLjQ3MDA3NzQgTDI0LjgyNTIzOSwxNi43MDM5MTg2IEMyNC40MzY0NzU0LDE2LjMxNTE1NTEgMjQuNTcyNjQ5NywxNiAyNS4xMjE1Mzk0LDE2IEwyOS45OTk3ODA5LDE2IFonIGlkPSdMb2dvJyBmaWxsPScjRkQ0QzYxJyBtYXNrPSd1cmwoI21hc2stMyknPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgIDwvZz5cblx0ICAgIDwvZz5cblx0PC9zdmc+XCJcblx0d2FsbGV0X2FwcDpcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHQ8c3ZnIHdpZHRoPSc2MHB4JyBoZWlnaHQ9JzYwcHgnIHZpZXdCb3g9JzAgMCA2MCA2MCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMzkuMSAoMzE3MjApIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHQgICAgPHRpdGxlPldhbGxldDwvdGl0bGU+XG5cdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0ICAgIDxkZWZzPlxuXHQgICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0nNTAlJyB5MT0nMCUnIHgyPSc1MCUnIHkyPScxMDAlJyBpZD0nbGluZWFyR3JhZGllbnQtMSc+XG5cdCAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9JyMxRTFFMUYnIG9mZnNldD0nMCUnPjwvc3RvcD5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nIzFFMUUxRicgb2Zmc2V0PScxMDAlJz48L3N0b3A+XG5cdCAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cblx0ICAgICAgICA8cmVjdCBpZD0ncGF0aC0yJyB4PSc5JyB5PScxNScgd2lkdGg9JzQyJyBoZWlnaHQ9JzEzJyByeD0nMic+PC9yZWN0PlxuXHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTMnPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScwJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScwLjUnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMSAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdCAgICAgICAgPC9maWx0ZXI+XG5cdCAgICAgICAgPHJlY3QgaWQ9J3BhdGgtNCcgeD0nOScgeT0nMTgnIHdpZHRoPSc0MicgaGVpZ2h0PScxMycgcng9JzInPjwvcmVjdD5cblx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci01Jz5cblx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMCcgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMC41JyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJyByZXN1bHQ9J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjEgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHQgICAgICAgIDwvZmlsdGVyPlxuXHQgICAgICAgIDxyZWN0IGlkPSdwYXRoLTYnIHg9JzknIHk9JzIxJyB3aWR0aD0nNDInIGhlaWdodD0nMTMnIHJ4PScyJz48L3JlY3Q+XG5cdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItNyc+XG5cdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzAnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzAuNScgaW49J3NoYWRvd09mZnNldE91dGVyMScgcmVzdWx0PSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4xIDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgICAgICA8cmVjdCBpZD0ncGF0aC04JyB4PSc5JyB5PScyNScgd2lkdGg9JzQyJyBoZWlnaHQ9JzEzJyByeD0nMic+PC9yZWN0PlxuXHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTknPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScwJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScwLjUnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMSAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdCAgICAgICAgPC9maWx0ZXI+XG5cdCAgICAgICAgPHBhdGggZD0nTTcsMjggTDcsNDIgTDUzLDQyIEw1MywyOCBMMzguOTA2NTA3MywyOCBDMzcuNzk4MzMzOSwyOCAzNi4zMDU3NTU4LDI4LjY3MjIyMjkgMzUuNTUwMTIzNywyOS40Nzg0ODgyIEMzNS41NTAxMjM3LDI5LjQ3ODQ4ODIgMzIuNDE4OTU3OSwzMy4zMDc2OTIzIDMwLDMzLjMwNzY5MjMgQzI3LjU4MTA0MjEsMzMuMzA3NjkyMyAyNC40NDk4NzYzLDI5LjQ3ODQ4ODIgMjQuNDQ5ODc2MywyOS40Nzg0ODgyIEMyMy43MDQzNzAyLDI4LjY2MTk0MTcgMjIuMjExNDc4MSwyOCAyMS4wOTM0OTI3LDI4IEw3LDI4IFonIGlkPSdwYXRoLTEwJz48L3BhdGg+XG5cdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItMTEnPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PSctMScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMScgaW49J3NoYWRvd09mZnNldE91dGVyMScgcmVzdWx0PSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4xIDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgIDwvZGVmcz5cblx0ICAgIDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHQgICAgICAgIDxnIGlkPSdIb21lLVNjcmVlbi3igKItaVBob25lLVNFJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMTYuMDAwMDAwLCAtMjAzLjAwMDAwMCknPlxuXHQgICAgICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS02cy1Db3B5JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMjcuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICA8ZyBpZD0nV2FsbGV0JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxNi4wMDAwMDAsIDE3Ni4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nQkcnIGZpbGw9J3VybCgjbGluZWFyR3JhZGllbnQtMSknIHg9JzAnIHk9JzAnIHdpZHRoPSc2MCcgaGVpZ2h0PSc2MCcgcng9JzE0Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J3dhbGxldCcgZmlsbD0nI0Q5RDZDQycgeD0nNycgeT0nMTInIHdpZHRoPSc0NicgaGVpZ2h0PSczNCcgcng9JzQnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nY2FyZHMnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItMyknIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9JyMzQjk5QzknIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdjYXJkcyc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMScgZmlsdGVyPSd1cmwoI2ZpbHRlci01KScgeGxpbms6aHJlZj0nI3BhdGgtNCc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nI0ZGQjAwMycgZmlsbC1ydWxlPSdldmVub2RkJyB4bGluazpocmVmPScjcGF0aC00Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J2NhcmRzJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSdibGFjaycgZmlsbC1vcGFjaXR5PScxJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTcpJyB4bGluazpocmVmPScjcGF0aC02Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPScjNTBCRTNEJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHhsaW5rOmhyZWY9JyNwYXRoLTYnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nY2FyZHMnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItOSknIHhsaW5rOmhyZWY9JyNwYXRoLTgnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9JyNGMTZDNUUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtOCc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdDb21iaW5lZC1TaGFwZSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMScgZmlsdGVyPSd1cmwoI2ZpbHRlci0xMSknIHhsaW5rOmhyZWY9JyNwYXRoLTEwJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPScjRDlENkNDJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHhsaW5rOmhyZWY9JyNwYXRoLTEwJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICA8L2c+XG5cdCAgICA8L2c+XG5cdDwvc3ZnPlwiXG5cdG5vdGVzX2FwcDpcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHQ8c3ZnIHdpZHRoPSc2MHB4JyBoZWlnaHQ9JzYwcHgnIHZpZXdCb3g9JzAgMCA2MCA2MCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMzkuMSAoMzE3MjApIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHQgICAgPHRpdGxlPk5vdGVzPC90aXRsZT5cblx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHQgICAgPGRlZnM+XG5cdCAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSc1MCUnIHkxPScwJScgeDI9JzUwJScgeTI9JzEwMCUnIGlkPSdsaW5lYXJHcmFkaWVudC0xJz5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nI0Y4RjhGOCcgb2Zmc2V0PScwJSc+PC9zdG9wPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjRURFREVEJyBvZmZzZXQ9JzEwMCUnPjwvc3RvcD5cblx0ICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuXHQgICAgICAgIDxwYXRoIGQ9J00zOS4wODE1LDAgQzQ1LjEwNSwwIDQ4LjExNiwwIDUxLjM1ODUsMS4wMjUgQzU0Ljg5ODUsMi4zMTM1IDU3LjY4NjUsNS4xMDE1IDU4Ljk3NSw4LjY0MTUgQzYwLDExLjg4MzUgNjAsMTQuODk1NSA2MCwyMC45MTg1IEw2MCwzOS4wODE1IEM2MCw0NS4xMDUgNjAsNDguMTE2IDU4Ljk3NSw1MS4zNTg1IEM1Ny42ODY1LDU0Ljg5ODUgNTQuODk4NSw1Ny42ODY1IDUxLjM1ODUsNTguOTc0NSBDNDguMTE2LDYwIDQ1LjEwNSw2MCAzOS4wODE1LDYwIEwyMC45MTg1LDYwIEMxNC44OTUsNjAgMTEuODgzNSw2MCA4LjY0MTUsNTguOTc0NSBDNS4xMDE1LDU3LjY4NjUgMi4zMTM1LDU0Ljg5ODUgMS4wMjUsNTEuMzU4NSBDMCw0OC4xMTYgMCw0NS4xMDUgMCwzOS4wODE1IEwwLDIwLjkxODUgQzAsMTQuODk1NSAwLDExLjg4MzUgMS4wMjUsOC42NDE1IEMyLjMxMzUsNS4xMDE1IDUuMTAxNSwyLjMxMzUgOC42NDE1LDEuMDI1IEMxMS44ODM1LDAgMTQuODk1LDAgMjAuOTE4NSwwIEwzOS4wODE1LDAgWicgaWQ9J3BhdGgtMic+PC9wYXRoPlxuXHQgICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0nNTAlJyB5MT0nMCUnIHgyPSc1MCUnIHkyPScxMDAlJyBpZD0nbGluZWFyR3JhZGllbnQtNCc+XG5cdCAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9JyNGRkRGNjMnIG9mZnNldD0nMCUnPjwvc3RvcD5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nI0ZGQ0QwMicgb2Zmc2V0PScxMDAlJz48L3N0b3A+XG5cdCAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cblx0ICAgICAgICA8cmVjdCBpZD0ncGF0aC01JyB4PScwJyB5PSctMScgd2lkdGg9JzYwJyBoZWlnaHQ9JzIwJz48L3JlY3Q+XG5cdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItNic+XG5cdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzAuNScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMC41JyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJyByZXN1bHQ9J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjMgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHQgICAgICAgIDwvZmlsdGVyPlxuXHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTcnPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PSctMC41JyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0SW5uZXIxJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49J3NoYWRvd09mZnNldElubmVyMScgaW4yPSdTb3VyY2VBbHBoYScgb3BlcmF0b3I9J2FyaXRobWV0aWMnIGsyPSctMScgazM9JzEnIHJlc3VsdD0nc2hhZG93SW5uZXJJbm5lcjEnPjwvZmVDb21wb3NpdGU+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjIgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93SW5uZXJJbm5lcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgIDwvZGVmcz5cblx0ICAgIDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHQgICAgICAgIDxnIGlkPSdIb21lLVNjcmVlbi3igKItaVBob25lLVNFJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtOTIuMDAwMDAwLCAtMjAzLjAwMDAwMCknPlxuXHQgICAgICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS02cy1Db3B5JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMjcuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICA8ZyBpZD0nTm90ZXMnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDkyLjAwMDAwMCwgMTc2LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgICAgIDxtYXNrIGlkPSdtYXNrLTMnIGZpbGw9J3doaXRlJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgICAgICAgICAgICAgPHVzZSBpZD0nQkcnIGZpbGw9J3VybCgjbGluZWFyR3JhZGllbnQtMSknIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdoZWFkZXInIG1hc2s9J3VybCgjbWFzay0zKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMScgZmlsdGVyPSd1cmwoI2ZpbHRlci02KScgeGxpbms6aHJlZj0nI3BhdGgtNSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0ndXJsKCNsaW5lYXJHcmFkaWVudC00KScgZmlsbC1ydWxlPSdldmVub2RkJyB4bGluazpocmVmPScjcGF0aC01Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSdibGFjaycgZmlsbC1vcGFjaXR5PScxJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTcpJyB4bGluazpocmVmPScjcGF0aC01Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9J2xpbmUnIGZpbGw9JyNCN0I3QjcnIG1hc2s9J3VybCgjbWFzay0zKScgcG9pbnRzPSc1OS43NSAzMC41IDYwIDMwLjUgNjAgMzAgNTkuNzUgMzAgLTAuMjUgMzAgLTAuNSAzMCAtMC41IDMwLjUgLTAuMjUgMzAuNSc+PC9wb2x5Z29uPlxuXHQgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSdsaW5lJyBmaWxsPScjQjdCN0I3JyBtYXNrPSd1cmwoI21hc2stMyknIHBvaW50cz0nNTkuNzUgNDEuNSA2MCA0MS41IDYwIDQxIDU5Ljc1IDQxIC0wLjI1IDQxIC0wLjUgNDEgLTAuNSA0MS41IC0wLjI1IDQxLjUnPjwvcG9seWdvbj5cblx0ICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0nbGluZScgZmlsbD0nI0I3QjdCNycgbWFzaz0ndXJsKCNtYXNrLTMpJyBwb2ludHM9JzU5Ljc1IDUzIDYwIDUzIDYwIDUyLjUgNTkuNzUgNTIuNSAtMC4yNSA1Mi41IC0wLjUgNTIuNSAtMC41IDUzIC0wLjI1IDUzJz48L3BvbHlnb24+XG5cdCAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTU4LjUsMjIgTDU5LjUsMjIgTDU5LjUsMjMgTDU4LjUsMjMgTDU4LjUsMjIgTDU4LjUsMjIgWiBNNTYuNSwyMiBMNTcuNSwyMiBMNTcuNSwyMyBMNTYuNSwyMyBMNTYuNSwyMiBMNTYuNSwyMiBaIE01NC41LDIyIEw1NS41LDIyIEw1NS41LDIzIEw1NC41LDIzIEw1NC41LDIyIEw1NC41LDIyIFogTTUyLjUsMjIgTDUzLjUsMjIgTDUzLjUsMjMgTDUyLjUsMjMgTDUyLjUsMjIgTDUyLjUsMjIgWiBNNTAuNSwyMiBMNTEuNSwyMiBMNTEuNSwyMyBMNTAuNSwyMyBMNTAuNSwyMiBMNTAuNSwyMiBaIE00OC41LDIyIEw0OS41LDIyIEw0OS41LDIzIEw0OC41LDIzIEw0OC41LDIyIEw0OC41LDIyIFogTTQ2LjUsMjIgTDQ3LjUsMjIgTDQ3LjUsMjMgTDQ2LjUsMjMgTDQ2LjUsMjIgTDQ2LjUsMjIgWiBNNDQuNSwyMiBMNDUuNSwyMiBMNDUuNSwyMyBMNDQuNSwyMyBMNDQuNSwyMiBMNDQuNSwyMiBaIE00Mi41LDIyIEw0My41LDIyIEw0My41LDIzIEw0Mi41LDIzIEw0Mi41LDIyIEw0Mi41LDIyIFogTTQwLjUsMjIgTDQxLjUsMjIgTDQxLjUsMjMgTDQwLjUsMjMgTDQwLjUsMjIgTDQwLjUsMjIgWiBNMzguNSwyMiBMMzkuNSwyMiBMMzkuNSwyMyBMMzguNSwyMyBMMzguNSwyMiBMMzguNSwyMiBaIE0zNi41LDIyIEwzNy41LDIyIEwzNy41LDIzIEwzNi41LDIzIEwzNi41LDIyIEwzNi41LDIyIFogTTM0LjUsMjIgTDM1LjUsMjIgTDM1LjUsMjMgTDM0LjUsMjMgTDM0LjUsMjIgTDM0LjUsMjIgWiBNMzIuNSwyMiBMMzMuNSwyMiBMMzMuNSwyMyBMMzIuNSwyMyBMMzIuNSwyMiBMMzIuNSwyMiBaIE0zMC41LDIyIEwzMS41LDIyIEwzMS41LDIzIEwzMC41LDIzIEwzMC41LDIyIEwzMC41LDIyIFogTTI4LjUsMjIgTDI5LjUsMjIgTDI5LjUsMjMgTDI4LjUsMjMgTDI4LjUsMjIgTDI4LjUsMjIgWiBNMjYuNSwyMiBMMjcuNSwyMiBMMjcuNSwyMyBMMjYuNSwyMyBMMjYuNSwyMiBMMjYuNSwyMiBaIE0yNC41LDIyIEwyNS41LDIyIEwyNS41LDIzIEwyNC41LDIzIEwyNC41LDIyIEwyNC41LDIyIFogTTIyLjUsMjIgTDIzLjUsMjIgTDIzLjUsMjMgTDIyLjUsMjMgTDIyLjUsMjIgTDIyLjUsMjIgWiBNMjAuNSwyMiBMMjEuNSwyMiBMMjEuNSwyMyBMMjAuNSwyMyBMMjAuNSwyMiBMMjAuNSwyMiBaIE0xOC41LDIyIEwxOS41LDIyIEwxOS41LDIzIEwxOC41LDIzIEwxOC41LDIyIEwxOC41LDIyIFogTTE2LjUsMjIgTDE3LjUsMjIgTDE3LjUsMjMgTDE2LjUsMjMgTDE2LjUsMjIgTDE2LjUsMjIgWiBNMTQuNSwyMiBMMTUuNSwyMiBMMTUuNSwyMyBMMTQuNSwyMyBMMTQuNSwyMiBMMTQuNSwyMiBaIE0xMi41LDIyIEwxMy41LDIyIEwxMy41LDIzIEwxMi41LDIzIEwxMi41LDIyIEwxMi41LDIyIFogTTEwLjUsMjIgTDExLjUsMjIgTDExLjUsMjMgTDEwLjUsMjMgTDEwLjUsMjIgTDEwLjUsMjIgWiBNOC41LDIyIEw5LjUsMjIgTDkuNSwyMyBMOC41LDIzIEw4LjUsMjIgTDguNSwyMiBaIE02LjUsMjIgTDcuNSwyMiBMNy41LDIzIEw2LjUsMjMgTDYuNSwyMiBMNi41LDIyIFogTTQuNSwyMiBMNS41LDIyIEw1LjUsMjMgTDQuNSwyMyBMNC41LDIyIEw0LjUsMjIgWiBNMi41LDIyIEwzLjUsMjIgTDMuNSwyMyBMMi41LDIzIEwyLjUsMjIgTDIuNSwyMiBaIE0wLjUsMjIgTDEuNSwyMiBMMS41LDIzIEwwLjUsMjMgTDAuNSwyMiBMMC41LDIyIFonIGlkPSdSZWN0YW5nbGUtMzcnIGZpbGw9JyNBQUFBQUEnIG1hc2s9J3VybCgjbWFzay0zKSc+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgPC9nPlxuXHQgICAgPC9nPlxuXHQ8L3N2Zz5cIlxuXHRyZW1pbmRlcnNfYXBwOlwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdDxzdmcgd2lkdGg9JzYwcHgnIGhlaWdodD0nNjBweCcgdmlld0JveD0nMCAwIDYwIDYwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdCAgICA8dGl0bGU+bWluPC90aXRsZT5cblx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHQgICAgPGRlZnM+XG5cdCAgICAgICAgPHJlY3QgaWQ9J3BhdGgtMScgeD0nMCcgeT0nMCcgd2lkdGg9JzYwJyBoZWlnaHQ9JzYwJyByeD0nMTQnPjwvcmVjdD5cblx0ICAgICAgICA8Y2lyY2xlIGlkPSdwYXRoLTMnIGN4PScxMCcgY3k9JzEyJyByPSc0Jz48L2NpcmNsZT5cblx0ICAgICAgICA8bWFzayBpZD0nbWFzay00JyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nMCcgeT0nMCcgd2lkdGg9JzgnIGhlaWdodD0nOCcgZmlsbD0nd2hpdGUnPlxuXHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTMnPjwvdXNlPlxuXHQgICAgICAgIDwvbWFzaz5cblx0ICAgICAgICA8bWFzayBpZD0nbWFzay01JyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nLTAuNScgeT0nLTAuNScgd2lkdGg9JzknIGhlaWdodD0nOSc+XG5cdCAgICAgICAgICAgIDxyZWN0IHg9JzUuNScgeT0nNy41JyB3aWR0aD0nOScgaGVpZ2h0PSc5JyBmaWxsPSd3aGl0ZSc+PC9yZWN0PlxuXHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTMnIGZpbGw9J2JsYWNrJz48L3VzZT5cblx0ICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgPGNpcmNsZSBpZD0ncGF0aC02JyBjeD0nMTAnIGN5PScyMycgcj0nNCc+PC9jaXJjbGU+XG5cdCAgICAgICAgPG1hc2sgaWQ9J21hc2stNycgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9J3doaXRlJz5cblx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC02Jz48L3VzZT5cblx0ICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgPG1hc2sgaWQ9J21hc2stOCcgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9Jy0wLjUnIHk9Jy0wLjUnIHdpZHRoPSc5JyBoZWlnaHQ9JzknPlxuXHQgICAgICAgICAgICA8cmVjdCB4PSc1LjUnIHk9JzE4LjUnIHdpZHRoPSc5JyBoZWlnaHQ9JzknIGZpbGw9J3doaXRlJz48L3JlY3Q+XG5cdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtNicgZmlsbD0nYmxhY2snPjwvdXNlPlxuXHQgICAgICAgIDwvbWFzaz5cblx0ICAgICAgICA8Y2lyY2xlIGlkPSdwYXRoLTknIGN4PScxMCcgY3k9JzM1JyByPSc0Jz48L2NpcmNsZT5cblx0ICAgICAgICA8bWFzayBpZD0nbWFzay0xMCcgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9J3doaXRlJz5cblx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC05Jz48L3VzZT5cblx0ICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgPG1hc2sgaWQ9J21hc2stMTEnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PSctMC41JyB5PSctMC41JyB3aWR0aD0nOScgaGVpZ2h0PSc5Jz5cblx0ICAgICAgICAgICAgPHJlY3QgeD0nNS41JyB5PSczMC41JyB3aWR0aD0nOScgaGVpZ2h0PSc5JyBmaWxsPSd3aGl0ZSc+PC9yZWN0PlxuXHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTknIGZpbGw9J2JsYWNrJz48L3VzZT5cblx0ICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgPGNpcmNsZSBpZD0ncGF0aC0xMicgY3g9JzEwJyBjeT0nNDYnIHI9JzQnPjwvY2lyY2xlPlxuXHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTEzJyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nMCcgeT0nMCcgd2lkdGg9JzgnIGhlaWdodD0nOCcgZmlsbD0nd2hpdGUnPlxuXHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTEyJz48L3VzZT5cblx0ICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgPG1hc2sgaWQ9J21hc2stMTQnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PSctMC41JyB5PSctMC41JyB3aWR0aD0nOScgaGVpZ2h0PSc5Jz5cblx0ICAgICAgICAgICAgPHJlY3QgeD0nNS41JyB5PSc0MS41JyB3aWR0aD0nOScgaGVpZ2h0PSc5JyBmaWxsPSd3aGl0ZSc+PC9yZWN0PlxuXHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTEyJyBmaWxsPSdibGFjayc+PC91c2U+XG5cdCAgICAgICAgPC9tYXNrPlxuXHQgICAgPC9kZWZzPlxuXHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdCAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtU0UnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNjguMDAwMDAwLCAtMjAzLjAwMDAwMCknPlxuXHQgICAgICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS02cy1Db3B5JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMjcuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICA8ZyBpZD0nbWluJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxNjguMDAwMDAwLCAxNzYuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgPG1hc2sgaWQ9J21hc2stMicgZmlsbD0nd2hpdGUnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTEnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvbWFzaz5cblx0ICAgICAgICAgICAgICAgICAgICA8dXNlIGlkPSdCRycgZmlsbD0nI0ZGRkZGRicgeGxpbms6aHJlZj0nI3BhdGgtMSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J2NpcmNsZScgbWFzaz0ndXJsKCNtYXNrLTIpJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBzdHJva2U9JyNGRkZGRkYnIG1hc2s9J3VybCgjbWFzay00KScgZmlsbD0nI0ZGOTUwMCcgZmlsbC1ydWxlPSdldmVub2RkJyB4bGluazpocmVmPScjcGF0aC0zJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBzdHJva2U9JyNGRjk1MDAnIG1hc2s9J3VybCgjbWFzay01KScgeGxpbms6aHJlZj0nI3BhdGgtMyc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdjaXJjbGUnIG1hc2s9J3VybCgjbWFzay0yKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2Ugc3Ryb2tlPScjRkZGRkZGJyBtYXNrPSd1cmwoI21hc2stNyknIGZpbGw9JyMxQkFERjgnIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtNic+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2Ugc3Ryb2tlPScjMUJBREY4JyBtYXNrPSd1cmwoI21hc2stOCknIHhsaW5rOmhyZWY9JyNwYXRoLTYnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nY2lyY2xlJyBtYXNrPSd1cmwoI21hc2stMiknPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHN0cm9rZT0nI0ZGRkZGRicgbWFzaz0ndXJsKCNtYXNrLTEwKScgZmlsbD0nIzYzREEzOCcgZmlsbC1ydWxlPSdldmVub2RkJyB4bGluazpocmVmPScjcGF0aC05Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBzdHJva2U9JyM2M0RBMzgnIG1hc2s9J3VybCgjbWFzay0xMSknIHhsaW5rOmhyZWY9JyNwYXRoLTknPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nY2lyY2xlJyBtYXNrPSd1cmwoI21hc2stMiknPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHN0cm9rZT0nI0ZGRkZGRicgbWFzaz0ndXJsKCNtYXNrLTEzKScgZmlsbD0nI0NDNzNFMScgZmlsbC1ydWxlPSdldmVub2RkJyB4bGluazpocmVmPScjcGF0aC0xMic+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2Ugc3Ryb2tlPScjQ0M3M0UxJyBtYXNrPSd1cmwoI21hc2stMTQpJyB4bGluazpocmVmPScjcGF0aC0xMic+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSdsaW5lJyBmaWxsPScjQUVBRUFFJyBtYXNrPSd1cmwoI21hc2stMiknIHg9JzE5JyB5PScxNy41JyB3aWR0aD0nNDEnIGhlaWdodD0nMC41Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J2xpbmUnIGZpbGw9JyNBRUFFQUUnIG1hc2s9J3VybCgjbWFzay0yKScgeD0nMTknIHk9JzYnIHdpZHRoPSc0MScgaGVpZ2h0PScwLjUnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nbGluZScgZmlsbD0nI0FFQUVBRScgbWFzaz0ndXJsKCNtYXNrLTIpJyB4PScxOScgeT0nMjknIHdpZHRoPSc0MScgaGVpZ2h0PScwLjUnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nbGluZScgZmlsbD0nI0FFQUVBRScgbWFzaz0ndXJsKCNtYXNrLTIpJyB4PScxOScgeT0nNDAnIHdpZHRoPSc0MScgaGVpZ2h0PScwLjUnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nbGluZScgZmlsbD0nI0FFQUVBRScgbWFzaz0ndXJsKCNtYXNrLTIpJyB4PScxOScgeT0nNTEuNScgd2lkdGg9JzQxJyBoZWlnaHQ9JzAuNSc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgPC9nPlxuXHQgICAgPC9nPlxuXHQ8L3N2Zz5cIlxuXHRzdG9ja3NfYXBwOlwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdDxzdmcgd2lkdGg9JzYwcHgnIGhlaWdodD0nNjBweCcgdmlld0JveD0nMCAwIDYwIDYwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdCAgICA8dGl0bGU+U3RvY2tzPC90aXRsZT5cblx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHQgICAgPGRlZnM+XG5cdCAgICAgICAgPHBhdGggZD0nTTM5LjA4MTUsMCBDNDUuMTA1LDAgNDguMTE2LDAgNTEuMzU4NSwxLjAyNSBDNTQuODk4NSwyLjMxMzUgNTcuNjg2NSw1LjEwMTUgNTguOTc1LDguNjQxNSBDNjAsMTEuODgzNSA2MCwxNC44OTU1IDYwLDIwLjkxODUgTDYwLDM5LjA4MTUgQzYwLDQ1LjEwNSA2MCw0OC4xMTYgNTguOTc1LDUxLjM1ODUgQzU3LjY4NjUsNTQuODk4NSA1NC44OTg1LDU3LjY4NjUgNTEuMzU4NSw1OC45NzQ1IEM0OC4xMTYsNjAgNDUuMTA1LDYwIDM5LjA4MTUsNjAgTDIwLjkxODUsNjAgQzE0Ljg5NSw2MCAxMS44ODM1LDYwIDguNjQxNSw1OC45NzQ1IEM1LjEwMTUsNTcuNjg2NSAyLjMxMzUsNTQuODk4NSAxLjAyNSw1MS4zNTg1IEMwLDQ4LjExNiAwLDQ1LjEwNSAwLDM5LjA4MTUgTDAsMjAuOTE4NSBDMCwxNC44OTU1IDAsMTEuODgzNSAxLjAyNSw4LjY0MTUgQzIuMzEzNSw1LjEwMTUgNS4xMDE1LDIuMzEzNSA4LjY0MTUsMS4wMjUgQzExLjg4MzUsMCAxNC44OTUsMCAyMC45MTg1LDAgTDM5LjA4MTUsMCBaJyBpZD0ncGF0aC0xJz48L3BhdGg+XG5cdCAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSc1MCUnIHkxPScwJScgeDI9JzUwJScgeTI9JzEwMCUnIGlkPSdsaW5lYXJHcmFkaWVudC0zJz5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nIzQ1NDU0NScgb2Zmc2V0PScwJSc+PC9zdG9wPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjMTExMTEyJyBvZmZzZXQ9JzEwMCUnPjwvc3RvcD5cblx0ICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuXHQgICAgICAgIDxwYXRoIGQ9J000MS41LDE2LjAxMTIxMDggTDQxLjUsLTEuNSBMNDEsLTEuNSBMNDEsMTYuMDExMjEwOCBDNDEuMDgyMzQwNSwxNi4wMDM3OTA3IDQxLjE2NTcyNzYsMTYgNDEuMjUsMTYgQzQxLjMzNDI3MjQsMTYgNDEuNDE3NjU5NSwxNi4wMDM3OTA3IDQxLjUsMTYuMDExMjEwOCBaIE00MS41LDIxLjQ4ODc4OTIgTDQxLjUsNjMgTDQxLDYzIEw0MSwyMS40ODg3ODkyIEM0MS4wODIzNDA1LDIxLjQ5NjIwOTMgNDEuMTY1NzI3NiwyMS41IDQxLjI1LDIxLjUgQzQxLjMzNDI3MjQsMjEuNSA0MS40MTc2NTk1LDIxLjQ5NjIwOTMgNDEuNSwyMS40ODg3ODkyIFogTTQxLjI1LDIxIEM0Mi40OTI2NDA3LDIxIDQzLjUsMTkuOTkyNjQwNyA0My41LDE4Ljc1IEM0My41LDE3LjUwNzM1OTMgNDIuNDkyNjQwNywxNi41IDQxLjI1LDE2LjUgQzQwLjAwNzM1OTMsMTYuNSAzOSwxNy41MDczNTkzIDM5LDE4Ljc1IEMzOSwxOS45OTI2NDA3IDQwLjAwNzM1OTMsMjEgNDEuMjUsMjEgWicgaWQ9J3BhdGgtNCc+PC9wYXRoPlxuXHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTUnPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC41IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHQgICAgICAgIDwvZmlsdGVyPlxuXHQgICAgPC9kZWZzPlxuXHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdCAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtU0UnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0yNDQuMDAwMDAwLCAtMjAzLjAwMDAwMCknPlxuXHQgICAgICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS02cy1Db3B5JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMjcuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICA8ZyBpZD0nU3RvY2tzJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgyNDQuMDAwMDAwLCAxNzYuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgPG1hc2sgaWQ9J21hc2stMicgZmlsbD0nd2hpdGUnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTEnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvbWFzaz5cblx0ICAgICAgICAgICAgICAgICAgICA8dXNlIGlkPSdCRycgZmlsbD0nIzE0MTQxNicgeGxpbms6aHJlZj0nI3BhdGgtMSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTS0wLjQ4NDg2MzI4MSwzNC4wNTM3MTA5IEMtMC40ODQ4NjMyODEsMzQuMDUzNzEwOSAxLjI3MjM5MjExLDM0LjA2NDQ2ODYgMy4xMTkzODQ3NywzNC42MzIwODAxIEM0LjcwNzk0NDk1LDM1LjEyMDI3MSA2LjMwMDk4MTc2LDM2LjI1MjM3ODYgNy4yMzM4ODY3MiwzNi4xOTQ1ODAxIEM5LjI1MTQ2NDg0LDM2LjA2OTU4MDEgMTEuMzM0NDcyNywzNS4zNzU5NzY2IDExLjMzNDQ3MjcsMzUuMzc1OTc2NiBMMTUuMTIwODQ5NiwzMC40NDUwNjg0IEwxOC43Mjc1MzkxLDMzLjUyNjM2NzIgTDIyLjQ5NDE0MDYsMjQuNjI0NTExNyBMMjYuMTE5NjI4OSwzNC4zMzY5MTQxIEwzMC4yNSwzNi44NjU5NjY4IEwzMy45NDY3NzczLDMwLjIwODQ5NjEgTDM3LjUzODU3NDIsMjkuMjc2MTIzIEw0MS40MzE2NDA2LDE4LjEzMjMyNDIgTDQ1LjE0NzQ2MDksMjcuMjAzMzY5MSBMNDguOTQzODQ3NywyNC42NjU1MjczIEw1Mi43NzM0Mzc1LDMxLjk5MzY1MjMgTDU2LjM0MjI4NTIsMjMuODE3MzgyOCBMNjAuMzQ1NzAzMSwxOS42NTYyNSBMNjAuMzQ1NzAzMSw2MC40NzkxMTY2IEwtMC4zMDQ5ODkzMjUsNjAuNDc5MTE2NiBMLTAuNDg0ODYzMjgxLDM0LjA1MzcxMDkgWicgaWQ9J2dyYXBoJyBzdHJva2U9JyNGRkZGRkYnIHN0cm9rZS13aWR0aD0nMC43NScgZmlsbD0ndXJsKCNsaW5lYXJHcmFkaWVudC0zKScgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J21hcmsnIG1hc2s9J3VybCgjbWFzay0yKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMScgZmlsdGVyPSd1cmwoI2ZpbHRlci01KScgeGxpbms6aHJlZj0nI3BhdGgtNCc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nIzAxQTZGMScgZmlsbC1ydWxlPSdldmVub2RkJyB4bGluazpocmVmPScjcGF0aC00Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J1NwYXJrLWxpbmUnIG1hc2s9J3VybCgjbWFzay0yKScgZmlsbD0nIzc3Nzc3OCc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDcuMDAwMDAwLCAtMS41MDAwMDApJyBpZD0nbWFyayc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCB4PScwJyB5PScwJyB3aWR0aD0nMC41JyBoZWlnaHQ9JzY0LjUnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IHg9JzExLjUnIHk9JzAnIHdpZHRoPScwLjUnIGhlaWdodD0nNjQuNSc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgeD0nMjMnIHk9JzAnIHdpZHRoPScwLjUnIGhlaWdodD0nNjQuNSc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgeD0nNDUuNScgeT0nMCcgd2lkdGg9JzAuNScgaGVpZ2h0PSc2NC41Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICA8L2c+XG5cdCAgICA8L2c+XG5cdDwvc3ZnPlwiXG59XG5cbiMgRGV2aWNlIGZyYW1lc1xuZXhwb3J0cy5mcmFtZXMgPSAge1xuXG4jIEZ1bGxzY3JlZW5cblx0XCJmdWxsc2NyZWVuXCIgOiB7IGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LCB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXHRzY2FsZToxLCBtb2JpbGU6ZmFsc2UsIHBsYXRmb3JtOlwid2ViXCJ9XG5cblx0IyBpUGhvbmVzXG5cdCMjIDVTXG5cdFwiYXBwbGUtaXBob25lLTVzLXNwYWNlLWdyYXlcIjogeyBoZWlnaHQ6IDExMzYsIHdpZHRoOiA2NDAsXHRzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBob25lLTVzLXNpbHZlclwiOiB7IGhlaWdodDogMTEzNiwgd2lkdGg6IDY0MCxcdHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGhvbmUtNXMtZ29sZFwiOiB7IGhlaWdodDogMTEzNiwgd2lkdGg6IDY0MCxcdHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblxuXHQjIyA1Y1xuXHRcImFwcGxlLWlwaG9uZS01Yy1ncmVlblwiOiB7IGhlaWdodDogMTEzNiwgd2lkdGg6IDY0MCxzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBob25lLTVjLWJsdWVcIjogeyBoZWlnaHQ6IDExMzYsIHdpZHRoOiA2NDAsXHRzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBob25lLTVjLXJlZFwiOiB7IGhlaWdodDogMTEzNiwgd2lkdGg6IDY0MCxcdHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGhvbmUtNWMtd2hpdGVcIjogeyBoZWlnaHQ6IDExMzYsIHdpZHRoOiA2NDAsc2NhbGU6IDIsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXHRcImFwcGxlLWlwaG9uZS01Yy15ZWxsb3dcIjogeyBoZWlnaHQ6IDExMzYsIHdpZHRoOiA2NDAsc2NhbGU6IDIsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXHRcImFwcGxlLWlwaG9uZS01Yy1waW5rXCI6IHsgaGVpZ2h0OiAxMTM2LCB3aWR0aDogNjQwLFx0c2NhbGU6IDIsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXG5cdCMjIDZzXG5cdFwiYXBwbGUtaXBob25lLTZzLXNwYWNlLWdyYXlcIiA6IHsgaGVpZ2h0OiAxMzM0LCB3aWR0aDogNzUwLFx0c2NhbGU6IDIsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXHRcImFwcGxlLWlwaG9uZS02cy1zaWx2ZXJcIjogeyBoZWlnaHQ6IDEzMzQsIHdpZHRoOiA3NTAsXHRzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBob25lLTZzLWdvbGRcIjogeyBoZWlnaHQ6IDEzMzQsIHdpZHRoOiA3NTAsXHRzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBob25lLTZzLXJvc2UtZ29sZFwiOiB7IGhlaWdodDogMTMzNCwgd2lkdGg6IDc1MCxcdHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblxuXHQjIyA2cyBwbHVzXG5cdFwiYXBwbGUtaXBob25lLTZzLXBsdXMtZ29sZFwiOiB7IGhlaWdodDogMjIwOCwgd2lkdGg6IDEyNDIsIHNjYWxlOiAzLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1zaWx2ZXJcIjogeyBoZWlnaHQ6IDIyMDgsIHdpZHRoOiAxMjQyLFx0c2NhbGU6IDMsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXHRcImFwcGxlLWlwaG9uZS02cy1wbHVzLXNwYWNlLWdyYXlcIjogeyBoZWlnaHQ6IDIyMDgsIHdpZHRoOiAxMjQyLFx0c2NhbGU6IDMsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXHRcImFwcGxlLWlwaG9uZS02cy1wbHVzXCI6IHsgaGVpZ2h0OiAyMjA4LCB3aWR0aDogMTI0MixcdHNjYWxlOiAzLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1yb3NlLWdvbGRcIjogeyBoZWlnaHQ6IDIyMDgsIHdpZHRoOiAxMjQyLFx0c2NhbGU6IDMsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXG5cdCMgaVBhZHNcblxuXHQjIyBBaXJcblx0XCJhcHBsZS1pcGFkLWFpci0yLWdvbGRcIjogeyBoZWlnaHQ6IDIwNDgsIHdpZHRoOiAxNTM2LFx0c2NhbGU6IDIsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXHRcImFwcGxlLWlwYWQtYWlyLTItc2lsdmVyXCI6IHsgaGVpZ2h0OiAyMDQ4LCB3aWR0aDogMTUzNixcdHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGFkLWFpci0yLXNwYWNlLWdyYXlcIjogeyBoZWlnaHQ6IDIwNDgsIHdpZHRoOiAxNTM2LFx0c2NhbGU6IDIsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXG5cdCMjIE1pbmlcblx0XCJhcHBsZS1pcGFkLW1pbmktNC1nb2xkXCI6IHsgaGVpZ2h0OiAyMDQ4LCB3aWR0aDogMTUzNixcdHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGFkLW1pbmktNC1zcGFjZS1ncmF5XCI6IHsgaGVpZ2h0OiAyMDQ4LCB3aWR0aDogMTUzNixcdHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGFkLW1pbmktNC1zaWx2ZXJcIjp7IGhlaWdodDogMjA0OCwgd2lkdGg6IDE1MzYsIHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblxuXHQjIyBQcm9cblx0XCJhcHBsZS1pcGFkLXByby1nb2xkXCI6IHsgaGVpZ2h0OiAyNzMyLCB3aWR0aDogMjA0OCwgc2NhbGU6IDIsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXHRcImFwcGxlLWlwYWQtcHJvLXNpbHZlclwiOiB7IGhlaWdodDogMjczMiwgd2lkdGg6IDIwNDgsIHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGFkLXByby1zcGFjZS1ncmF5XCIgOiB7IGhlaWdodDogMjczMiwgd2lkdGg6IDIwNDgsIHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cbn1cbmV4cG9ydHMuZnJhbWVyRnJhbWVzID1cblx0NjQwOjJcblx0NzUwOjJcblx0NzY4OjJcblx0MTA4MDozXG5cdDEyNDI6M1xuXHQxNDQwOjRcblx0MTUzNjoyXG5cbiMgRGV2aWNlIGZyYW1lc1xuZXhwb3J0cy5yZWFsRGV2aWNlcyA9XG5cdDMyMDpcblx0XHQ0ODA6XG5cdFx0XHRuYW1lOlwiaXBob25lXCJcblx0XHRcdGRpc3BsYXlfbmFtZTpcImlQaG9uZVwiXG5cdFx0XHR3aWR0aDozMjBcblx0XHRcdGhlaWdodDo0ODBcblx0XHRcdHNjYWxlOjFcblx0NDgwOlxuXHRcdDg1NDpcblx0XHRcdG5hbWU6XCJBbmRyb2lkIE9uZVwiXG5cdFx0XHR3aWR0aDo0ODBcblx0XHRcdGhlaWdodDo4NTRcblx0XHRcdHNjYWxlOjEuNVxuXG5cdDY0MDpcblx0XHQ5NjA6XG5cdFx0XHRuYW1lOlwiaXBob25lLTVcIlxuXHRcdFx0ZGlzcGxheV9uYW1lOlwiaVBob25lIDRcIlxuXHRcdFx0d2lkdGg6NjQwXG5cdFx0XHRoZWlnaHQ6OTYwXG5cdFx0XHRzY2FsZToyXG5cdFx0MTEzNjpcblx0XHRcdG5hbWU6XCJpcGhvbmUtNVwiXG5cdFx0XHRkaXNwbGF5X25hbWU6XCJpUGhvbmUgNVwiXG5cdFx0XHR3aWR0aDo2NDBcblx0XHRcdGhlaWdodDoxMTM2XG5cdFx0XHRzY2FsZToyXG5cdDcyMDpcblx0XHQxMjgwOlxuXHRcdFx0bmFtZTpcIlhIRFBJXCJcblx0XHRcdHdpZHRoOjcyMFxuXHRcdFx0aGVpZ2h0OjEyODBcblx0XHRcdHNjYWxlOjJcblx0NzUwOlxuXHRcdDExMTg6XG5cdFx0XHRuYW1lOlwiaXBob25lLTZzXCJcblx0XHRcdGRpc3BsYXlfbmFtZTpcImlQaG9uZSA2c1wiXG5cdFx0XHR3aWR0aDo3NTBcblx0XHRcdGhlaWdodDoxMTE4XG5cdFx0XHRzY2FsZToyXG5cdFx0MTMzNDpcblx0XHRcdG5hbWU6XCJpcGhvbmUtNnNcIlxuXHRcdFx0ZGlzcGxheV9uYW1lOlwiaVBob25lIDZzXCJcblx0XHRcdHdpZHRoOjc1MFxuXHRcdFx0aGVpZ2h0OjEzMzRcblx0XHRcdHNjYWxlOjJcblx0NzY4OlxuXHRcdDEwMjQ6XG5cdFx0XHRuYW1lOlwiaXBhZFwiXG5cdFx0XHRkaXNwbGF5X25hbWU6XCJpUGFkXCJcblx0XHRcdHdpZHRoOjc2OFxuXHRcdFx0aGVpZ2h0OjEwMjRcblx0XHRcdHNjYWxlOjFcblx0XHQxMjgwOlxuXHRcdFx0bmFtZTpcIk5leHVzIDRcIlxuXHRcdFx0d2lkdGg6NzY4XG5cdFx0XHRoZWlnaHQ6MTI4MFxuXHRcdFx0c2NhbGU6MlxuXHQ4MDA6XG5cdFx0MTI4MDpcblx0XHRcdG5hbWU6XCJOZXh1cyA3XCJcblx0XHRcdHdpZHRoOjgwMFxuXHRcdFx0aGVpZ2h0OjEyODBcblx0XHRcdHNjYWxlOjFcblx0MTA4MDpcblx0XHQxOTIwOlxuXHRcdFx0bmFtZTpcIlhYSERQSVwiXG5cdFx0XHR3aWR0aDoxMDgwXG5cdFx0XHRoZWlnaHQ6MTkyMFxuXHRcdFx0c2NhbGU6M1xuXHQxMjAwOlxuXHRcdDE5MjA6XG5cdFx0XHRuYW1lOlwiTmV4dXMgN1wiXG5cdFx0XHR3aWR0aDoxMjAwXG5cdFx0XHRoZWlnaHQ6MTkyMFxuXHRcdFx0c2NhbGU6MlxuXHQxMjQyOlxuXHRcdDIyMDg6XG5cdFx0XHRuYW1lOlwiaXBob25lLTZzLXBsdXNcIlxuXHRcdFx0ZGlzcGxheV9uYW1lOlwiaVBob25lIDYgUGx1c1wiXG5cdFx0XHR3aWR0aDoxMjQyXG5cdFx0XHRoZWlnaHQ6MjIwOFxuXHRcdFx0c2NhbGU6M1xuXHQxMzM0OlxuXHRcdDc1MDpcblx0XHRcdG5hbWU6XCJpcGhvbmUtNnNcIlxuXHRcdFx0ZGlzcGxheV9uYW1lOlwiaVBob25lIDZzXCJcblx0XHRcdHdpZHRoOjc1MFxuXHRcdFx0aGVpZ2h0OjEzMzRcblx0XHRcdHNjYWxlOjJcblx0MTQ0MDpcblx0XHQyNTYwOlxuXHRcdFx0bmFtZTpcIlhYWEhEUElcIlxuXHRcdFx0d2lkdGg6MTQ0MFxuXHRcdFx0aGVpZ2h0OjI1NjBcblx0XHRcdHNjYWxlOjRcblx0MTQ0MTpcblx0XHQyNTYxOlxuXHRcdFx0bmFtZTpcIk5leHVzIDZcIlxuXHRcdFx0d2lkdGg6MTQ0MFxuXHRcdFx0aGVpZ2h0OjI1NjBcblx0XHRcdHNjYWxlOjRcblx0MTUzNjpcblx0XHQyMDQ4OlxuXHRcdFx0bmFtZTpcImlwYWRcIlxuXHRcdFx0ZGlzcGxheV9uYW1lOlwiaVBhZFwiXG5cdFx0XHR3aWR0aDoxNTM2XG5cdFx0XHRoZWlnaHQ6MjA0OFxuXHRcdFx0c2NhbGU6MlxuXHQxNjAwOlxuXHRcdDIwNTY6XG5cdFx0XHRuYW1lOlwiTmV4dXMgMTBcIlxuXHRcdFx0d2lkdGg6MTYwMFxuXHRcdFx0aGVpZ2h0OjIwNTZcblx0XHRcdHNjYWxlOjJcblx0MjIwODpcblx0XHQxMjQyOlxuXHRcdFx0bmFtZTpcImlwaG9uZS02cy1wbHVzXCJcblx0XHRcdGRpc3BsYXlfbmFtZTpcImlQaG9uZSA2IFBsdXNcIlxuXHRcdFx0d2lkdGg6MTI0MlxuXHRcdFx0aGVpZ2h0OjIyMDhcblx0XHRcdHNjYWxlOjNcblx0MjA0ODpcblx0XHQxNTM2OlxuXHRcdFx0bmFtZTpcIk5leHVzIDlcIlxuXHRcdFx0d2lkdGg6MjA0OFxuXHRcdFx0aGVpZ2h0OjE1MzZcblx0XHRcdHNjYWxlOjJcblx0XHQyNzMyOlxuXHRcdFx0bmFtZTpcImlwYWQtcHJvXCJcblx0XHRcdGRpc3BsYXlfbmFtZTpcImlQYWQgUHJvXCJcblx0XHRcdHdpZHRoOjIwNDhcblx0XHRcdGhlaWdodDoyNzMyXG5cdFx0XHRzY2FsZToyXG5cdDI1NjA6XG5cdFx0MTYwMDpcblx0XHRcdG5hbWU6XCJOZXh1cyAxMFwiXG5cdFx0XHR3aWR0aDoyNTYwXG5cdFx0XHRoZWlnaHQ6MTYwMFxuXHRcdFx0c2NhbGU6MlxuXHQyNzMyOlxuXHRcdDIwNDg6XG5cdFx0XHRuYW1lOlwiaXBhZC1wcm9cIlxuXHRcdFx0ZGlzcGxheV9uYW1lOlwiaVBhZCBQcm9cIlxuXHRcdFx0d2lkdGg6MjczMlxuXHRcdFx0aGVpZ2h0OjIwNDhcblx0XHRcdHNjYWxlOjJcbiIsIiMgVXRpbHNcblxuaW9zID0gcmVxdWlyZSAnaW9zLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcblx0YW5pbWF0aW9uczoge1xuXHRcdHRhcmdldDp1bmRlZmluZWRcblx0XHRjb25zdHJhaW50czogdW5kZWZpbmVkXG5cdFx0Y3VydmUgOiBcImVhc2UtaW4tb3V0XCJcblx0XHRjdXJ2ZU9wdGlvbnM6IHVuZGVmaW5lZFxuXHRcdHRpbWU6MVxuXHRcdGRlbGF5OjBcblx0XHRyZXBlYXQ6dW5kZWZpbmVkXG5cdFx0Y29sb3JNb2RlbDp1bmRlZmluZWRcblx0XHRzdGFnZ2VyOnVuZGVmaW5lZFxuXHRcdGZhZGVPdXQ6ZmFsc2Vcblx0XHRmYWRlSW46ZmFsc2Vcblx0fVxufVxuXG5sYXlvdXQgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0ge31cblx0dGFyZ2V0TGF5ZXJzID0gW11cblx0Ymx1ZXByaW50ID0gW11cblx0aWYgYXJyYXlcblx0XHRmb3IgaSBpbiBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzLmFuaW1hdGlvbnMpXG5cdFx0XHRpZiBhcnJheVtpXVxuXHRcdFx0XHRzZXR1cFtpXSA9IGFycmF5W2ldXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHNldHVwW2ldID0gZXhwb3J0cy5kZWZhdWx0cy5hbmltYXRpb25zW2ldXG5cblx0aWYgc2V0dXAudGFyZ2V0XG5cdFx0aWYgc2V0dXAudGFyZ2V0Lmxlbmd0aFxuXHRcdFx0dGFyZ2V0TGF5ZXJzID0gc2V0dXAudGFyZ2V0XG5cdFx0ZWxzZVxuXHRcdFx0dGFyZ2V0TGF5ZXJzLnB1c2ggc2V0dXAudGFyZ2V0XG5cdGVsc2Vcblx0XHR0YXJnZXRMYXllcnMgPSBGcmFtZXIuQ3VycmVudENvbnRleHQubGF5ZXJzXG5cblx0aWYgc2V0dXAudGFyZ2V0XG5cdFx0aWYgc2V0dXAuY29uc3RyYWludHNcblx0XHRcdGZvciBuZXdDb25zdHJhaW50IGluIE9iamVjdC5rZXlzKHNldHVwLmNvbnN0cmFpbnRzKVxuXHRcdFx0XHRzZXR1cC50YXJnZXQuY29uc3RyYWludHNbbmV3Q29uc3RyYWludF0gPSBzZXR1cC5jb25zdHJhaW50c1tuZXdDb25zdHJhaW50XVxuXG5cblx0I1RyYW5zbGF0ZSBuZXcgY29uc3RyYWludHNcblx0Zm9yIGxheWVyLCBpbmRleCBpbiB0YXJnZXRMYXllcnNcblx0XHRsYXllci5jYWxjdWxhdGVkUG9zaXRpb24gPSB7fVxuXHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzXG5cblx0XHRcdHByb3BzID0ge31cblx0XHRcdGxheWVyLnN1cGVyRnJhbWUgPSB7fVxuXG5cdFx0XHRpZiBsYXllci5zdXBlckxheWVyXG5cdFx0XHRcdGxheWVyLnN1cGVyRnJhbWUuaGVpZ2h0ID0gbGF5ZXIuc3VwZXJMYXllci5oZWlnaHRcblx0XHRcdFx0bGF5ZXIuc3VwZXJGcmFtZS53aWR0aCA9IGxheWVyLnN1cGVyTGF5ZXIud2lkdGhcblx0XHRcdGVsc2Vcblx0XHRcdFx0bGF5ZXIuc3VwZXJGcmFtZS5oZWlnaHQgPSBpb3MuZGV2aWNlLmhlaWdodFxuXHRcdFx0XHRsYXllci5zdXBlckZyYW1lLndpZHRoID0gaW9zLmRldmljZS53aWR0aFxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nICE9IHVuZGVmaW5lZCAmJiBsYXllci5jb25zdHJhaW50cy50cmFpbGluZyAhPSB1bmRlZmluZWRcblx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoID0ge31cblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudG9wICE9IHVuZGVmaW5lZCAmJiBsYXllci5jb25zdHJhaW50cy5ib3R0b20gIT0gdW5kZWZpbmVkXG5cdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLmF1dG9IZWlnaHQgPSB7fVxuXG5cdFx0XHQjIFNpemUgY29uc3RyYWludHNcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLndpZHRoICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy53aWR0aCA9IGlvcy51dGlscy5weChsYXllci5jb25zdHJhaW50cy53aWR0aClcblx0XHRcdGVsc2Vcblx0XHRcdFx0cHJvcHMud2lkdGggPSBsYXllci53aWR0aFxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5oZWlnaHQgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdHByb3BzLmhlaWdodCA9IGlvcy51dGlscy5weChsYXllci5jb25zdHJhaW50cy5oZWlnaHQpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHByb3BzLmhlaWdodCA9IGxheWVyLmhlaWdodFxuXG5cdFx0XHQjIFBvc2l0aW9uaW5nIGNvbnN0cmFpbnRzXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nICE9IHVuZGVmaW5lZFxuXHRcdFx0XHQjSWYgaXQncyBhIG51bWJlcmBcblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZyA9PSBwYXJzZUludChsYXllci5jb25zdHJhaW50cy5sZWFkaW5nLCAxMClcblx0XHRcdFx0XHRwcm9wcy54ID0gaW9zLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmcpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHQjSWYgaXQncyBhIGxheWVyXG5cdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZy5sZW5ndGggPT0gdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZy5jYWxjdWxhdGVkUG9zaXRpb24ueCArIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmcuY2FsY3VsYXRlZFBvc2l0aW9uLndpZHRoXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSByZWxhdGlvbnNoaXBcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCArIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdbMF0uY2FsY3VsYXRlZFBvc2l0aW9uLndpZHRoICsgaW9zLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdbMV0pXG5cblx0XHRcdCMgT3Bwb3NpbmcgY29uc3RyYWludHMgaGFuZGxlclxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5hdXRvV2lkdGguc3RhcnRYID0gcHJvcHMueFxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50cmFpbGluZyAhPSB1bmRlZmluZWRcblx0XHRcdFx0I0lmIGl0J3MgYSBudW1iZXJcblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcgPT0gcGFyc2VJbnQobGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcsIDEwKVxuXHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5zdXBlckZyYW1lLndpZHRoIC0gaW9zLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nKSAtIHByb3BzLndpZHRoXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHQjSWYgaXQncyBhIGxheWVyXG5cdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcubGVuZ3RoID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0cHJvcHMueCA9IGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nLmNhbGN1bGF0ZWRQb3NpdGlvbi54IC0gcHJvcHMud2lkdGhcblx0XHRcdFx0XHQjSWYgaXQncyBhIHJlbGF0aW9uc2hpcFxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy50cmFpbGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCAtIGlvcy51dGlscy5weChsYXllci5jb25zdHJhaW50cy50cmFpbGluZ1sxXSkgLSBwcm9wcy53aWR0aFxuXG5cdFx0XHQjIE9wcG9zaW5nIGNvbnN0cmFpbnRzIGhhbmRsZXJcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aCAhPSB1bmRlZmluZWRcblx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLmNhbGN1bGF0ZWRQb3NpdGlvblggPSBwcm9wcy54XG5cblx0XHRcdFx0IyNwZXJmb3JtIGF1dG9zaXplXG5cdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy5hdXRvV2lkdGguc3RhcnRYXG5cdFx0XHRcdHByb3BzLndpZHRoID0gbGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLmNhbGN1bGF0ZWRQb3NpdGlvblggLSBsYXllci5jb25zdHJhaW50cy5hdXRvV2lkdGguc3RhcnRYICsgcHJvcHMud2lkdGhcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudG9wICE9IHVuZGVmaW5lZFxuXHRcdFx0XHQjSWYgaXQncyBhIG51bWJlclxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50b3AgPT0gcGFyc2VJbnQobGF5ZXIuY29uc3RyYWludHMudG9wLCAxMClcblx0XHRcdFx0XHRwcm9wcy55ID0gaW9zLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLnRvcClcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdCNJZiBpdCdzIGEgbGF5ZXJcblx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50b3AubGVuZ3RoID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLnRvcC5jYWxjdWxhdGVkUG9zaXRpb24ueSArIGxheWVyLmNvbnN0cmFpbnRzLnRvcC5jYWxjdWxhdGVkUG9zaXRpb24uaGVpZ2h0XG5cdFx0XHRcdFx0I0lmIGl0J3MgYSByZWxhdGlvbnNoaXBcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMudG9wWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi55ICsgbGF5ZXIuY29uc3RyYWludHMudG9wWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi5oZWlnaHQgKyBpb3MudXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMudG9wWzFdKVxuXG5cdFx0XHQjIE9wcG9zaW5nIGNvbnN0cmFpbnRzIGhhbmRsZXJcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmF1dG9IZWlnaHQgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLmF1dG9IZWlnaHQuc3RhcnRZID0gcHJvcHMueVxuXG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbSAhPSB1bmRlZmluZWRcblx0XHRcdFx0I0lmIGl0J3MgYSBudW1iZXJcblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYm90dG9tID09IHBhcnNlSW50KGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbSwgMTApXG5cdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLnN1cGVyRnJhbWUuaGVpZ2h0IC0gaW9zLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbSkgLSBwcm9wcy5oZWlnaHRcblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSBsYXllclxuXHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbS5sZW5ndGggPT0gdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMuYm90dG9tLmNhbGN1bGF0ZWRQb3NpdGlvbi55IC0gcHJvcHMuaGVpZ2h0XG5cdFx0XHRcdFx0I0lmIGl0J3MgYSByZWxhdGlvbnNoaXBcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMuYm90dG9tWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi55IC0gIGlvcy51dGlscy5weChsYXllci5jb25zdHJhaW50cy5ib3R0b21bMV0pIC0gcHJvcHMuaGVpZ2h0XG5cblx0XHRcdCMgT3Bwb3NpbmcgY29uc3RyYWludHMgaGFuZGxlclxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYXV0b0hlaWdodCAhPSB1bmRlZmluZWRcblx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYXV0b0hlaWdodC5jYWxjdWxhdGVkUG9zaXRpb25ZID0gcHJvcHMueVxuXHRcdFx0XHQjIyBwZXJmb3JtIGF1dG9zaXplXG5cdFx0XHRcdHByb3BzLmhlaWdodCA9IGxheWVyLmNvbnN0cmFpbnRzLmF1dG9IZWlnaHQuY2FsY3VsYXRlZFBvc2l0aW9uWSAtIGxheWVyLmNvbnN0cmFpbnRzLmF1dG9IZWlnaHQuc3RhcnRZICsgcHJvcHMuaGVpZ2h0XG5cdFx0XHRcdHByb3BzLnkgPSBsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0LnN0YXJ0WVxuXG5cblx0XHRcdCMgQWxpZ25tZW50IGNvbnN0cmFpbnRzXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hbGlnbiAhPSB1bmRlZmluZWRcblx0XHRcdFx0I1NldCB0aGUgY2VudGVyaW5nIGZyYW1lXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmFsaWduID09IFwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0cHJvcHMueCA9IGxheWVyLnN1cGVyRnJhbWUud2lkdGggLyAyIC0gcHJvcHMud2lkdGggLyAyXG5cblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYWxpZ24gPT0gXCJ2ZXJ0aWNhbFwiXG5cdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLnN1cGVyRnJhbWUuaGVpZ2h0IC8gMiAtIHByb3BzLmhlaWdodCAvIDJcblxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hbGlnbiA9PSBcImNlbnRlclwiXG5cdFx0XHRcdFx0cHJvcHMueCA9IGxheWVyLnN1cGVyRnJhbWUud2lkdGggLyAyIC0gcHJvcHMud2lkdGggLyAyXG5cdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLnN1cGVyRnJhbWUuaGVpZ2h0IC8gMiAtIHByb3BzLmhlaWdodCAvIDJcblxuXG5cdFx0XHQjIENlbnRlcmluZyBjb25zdHJhaW50c1xuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuaG9yaXpvbnRhbENlbnRlciAhPSB1bmRlZmluZWRcblx0XHRcdFx0cHJvcHMueCA9IGxheWVyLmNvbnN0cmFpbnRzLmhvcml6b250YWxDZW50ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLnggKyAobGF5ZXIuY29uc3RyYWludHMuaG9yaXpvbnRhbENlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24ud2lkdGggLSBwcm9wcy53aWR0aCkgLyAyXG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnZlcnRpY2FsQ2VudGVyICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMudmVydGljYWxDZW50ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLnkgKyAobGF5ZXIuY29uc3RyYWludHMudmVydGljYWxDZW50ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLmhlaWdodCAtIHByb3BzLmhlaWdodCkgLyAyXG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmNlbnRlciAhPSB1bmRlZmluZWRcblx0XHRcdFx0cHJvcHMueCA9IGxheWVyLmNvbnN0cmFpbnRzLmNlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24ueCArIChsYXllci5jb25zdHJhaW50cy5jZW50ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLndpZHRoIC0gcHJvcHMud2lkdGgpIC8gMlxuXHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMuY2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi55ICsgKGxheWVyLmNvbnN0cmFpbnRzLmNlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24uaGVpZ2h0IC0gcHJvcHMuaGVpZ2h0KSAvIDJcblxuXHRcdFx0IyBBbGlnbmluZyBjb25zdHJhaW50c1xuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ0VkZ2VzICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ0VkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi54XG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nRWRnZXMgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy50cmFpbGluZ0VkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi54IC0gcHJvcHMud2lkdGggKyBsYXllci5jb25zdHJhaW50cy50cmFpbGluZ0VkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi53aWR0aFxuXG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcEVkZ2VzICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMudG9wRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnlcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYm90dG9tRWRnZXMgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdHByb3BzLnkgPSBsYXllci5jb25zdHJhaW50cy5ib3R0b21FZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueSAtIHByb3BzLmhlaWdodCArIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbUVkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi5oZWlnaHRcblxuXG5cdFx0XHRsYXllci5jYWxjdWxhdGVkUG9zaXRpb24gPSBwcm9wc1xuXHRcdGVsc2Vcblx0XHRcdGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbiA9IGxheWVyLnByb3BzXG5cblx0XHRibHVlcHJpbnQucHVzaCBsYXllclxuXG5cblx0cmV0dXJuIGJsdWVwcmludFxuXG5leHBvcnRzLnNldCA9IChhcnJheSkgLT5cblx0c2V0dXAgPSB7fVxuXHRwcm9wcyA9IHt9XG5cdGlmIGFycmF5XG5cdFx0Zm9yIGkgaW4gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cy5hbmltYXRpb25zKVxuXHRcdFx0aWYgYXJyYXlbaV1cblx0XHRcdFx0c2V0dXBbaV0gPSBhcnJheVtpXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzZXR1cFtpXSA9IGV4cG9ydHMuZGVmYXVsdHMuYW5pbWF0aW9uc1tpXVxuXG5cdGJsdWVwcmludCA9IGxheW91dChhcnJheSlcblxuXHRmb3IgbGF5ZXIsIGluZGV4IGluIGJsdWVwcmludFxuXHRcdGZvciBrZXkgaW4gT2JqZWN0LmtleXMobGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uKVxuXHRcdFx0bGF5ZXJba2V5XSA9IGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbltrZXldXG5cbmV4cG9ydHMuYW5pbWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSB7fVxuXHRwcm9wcyA9IHt9XG5cdGlmIGFycmF5XG5cdFx0Zm9yIGkgaW4gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cy5hbmltYXRpb25zKVxuXHRcdFx0aWYgYXJyYXlbaV1cblx0XHRcdFx0c2V0dXBbaV0gPSBhcnJheVtpXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzZXR1cFtpXSA9IGV4cG9ydHMuZGVmYXVsdHMuYW5pbWF0aW9uc1tpXVxuXG5cdGJsdWVwcmludCA9IGxheW91dChhcnJheSlcblxuXHRmb3IgbGF5ZXIsIGluZGV4IGluIGJsdWVwcmludFxuXHRcdCNUaW1pbmdcblx0XHRkZWxheSA9IHNldHVwLmRlbGF5XG5cdFx0aWYgc2V0dXAuc3RhZ2dlclxuXHRcdFx0c3RhZyA9IHNldHVwLnN0YWdnZXJcblx0XHRcdGRlbGF5ID0gKChpbmRleCkgKiBzdGFnKSArIGRlbGF5XG5cblx0XHRpZiBzZXR1cC5mYWRlT3V0XG5cdFx0XHRpZiBsYXllciA9PSBzZXR1cC5mYWRlT3V0XG5cdFx0XHRcdGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbi5vcGFjaXR5ID0gMFxuXG5cdFx0aWYgc2V0dXAuZmFkZUluXG5cdFx0XHRsYXllci5jYWxjdWxhdGVkUG9zaXRpb24ub3BhY2l0eSA9IDFcblxuXHRcdGxheWVyLmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6bGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uXG5cdFx0XHR0aW1lOnNldHVwLnRpbWVcblx0XHRcdGRlbGF5OmRlbGF5XG5cdFx0XHRjdXJ2ZTpzZXR1cC5jdXJ2ZVxuXHRcdFx0cmVwZWF0OnNldHVwLnJlcGVhdFxuXHRcdFx0Y29sb3JNb2RlbDpzZXR1cC5jb2xvck1vZGVsXG5cdFx0XHRjdXJ2ZU9wdGlvbnM6c2V0dXAuY3VydmVPcHRpb25zXG5cblx0XHRsYXllci5jYWxjdWxhdGVkUG9zaXRpb24gPSBwcm9wc1xuIiwiaW9zID0gcmVxdWlyZSAnaW9zLWtpdCdcblxuXG5leHBvcnRzLmRlZmF1bHRzID1cbiAgc3R5bGU6XCJsaWdodFwiXG4gIHNoaWZ0OnRydWVcbiAgb3V0cHV0OnVuZGVmaW5lZFxuICByZXR1cm5UZXh0OlwicmV0dXJuXCJcbiAgc3RhdGU6XCJsZXR0ZXJzXCJcbiAgaGlkZGVuOmZhbHNlXG4gIHJldHVybkNvbG9yOlwiYmx1ZVwiXG4gIHN1cGVyTGF5ZXI6dW5kZWZpbmVkXG5cblxuI1Jlc3BvbnNhYmlsZSBmb3Iga2V5Ym9hcmQgZGltZW5zaW9uc1xuZGV2aWNlID1cbiAgXCJpcGhvbmUtNVwiOlxuICAgIHBvcFVwQ2hhcjo0MFxuICAgIHBvcFVwVG9wOjRcbiAgICBoZWlnaHQ6MjE1XG4gICAgbGluZUhlaWdodDozNlxuICAgIGxldHRlcktleTpcbiAgICAgIGtleVRvcDo2XG4gICAgICBoZWlnaHQ6MzlcbiAgICAgIHdpZHRoOjI2LjVcbiAgICAgIGJvcmRlclJhZGl1czo1XG4gICAgICBmb250U2l6ZToyMi41XG4gICAgc3BlY2lhbEtleVdpZHRoOjM4LjVcbiAgICBzcGVjaWFsS2V5SGVpZ2h0OjM4LjVcbiAgICBzcGFjZTo1XG4gICAgcm93MTpcbiAgICAgIGxlYWRpbmc6MFxuICAgICAgdG9wOjBcbiAgICByb3cyOlxuICAgICAgbGVhZGluZzoxOVxuICAgICAgdG9wOjE2XG4gICAgcm93MzpcbiAgICAgIHRvcDoxNlxuICAgICAgbGVhZGluZzo1MVxuICAgIGFyZWE6XG4gICAgICB0b3A6MTFcbiAgICAgIGxlYWRpbmc6M1xuICAgICAgdHJhaWxpbmc6M1xuICAgICAgYm90dG9tOjRcbiAgICByZXR1cm5XaWR0aDo3NVxuICAgIHBvcFVwT2Zmc2V0OlxuICAgICAgeDo0XG4gICAgICB5OjMwXG4gIFwiaXBob25lLTZzXCI6XG4gICAgcG9wVXBDaGFyOjQwXG4gICAgcG9wVXBUb3A6NlxuICAgIGhlaWdodDoyMThcbiAgICBsaW5lSGVpZ2h0OjQwXG4gICAgbGV0dGVyS2V5OlxuICAgICAga2V5VG9wOjEwXG4gICAgICBoZWlnaHQ6NDJcbiAgICAgIHdpZHRoOjMxLjVcbiAgICAgIGJvcmRlclJhZGl1czo1XG4gICAgICBmb250U2l6ZToyM1xuICAgICAgdG9wOjEwXG4gICAgc3BlY2lhbEtleVdpZHRoOjQyXG4gICAgc3BlY2lhbEtleUhlaWdodDo0MlxuICAgIHNwYWNlOjZcbiAgICByb3cxOlxuICAgICAgbGVhZGluZzowXG4gICAgICB0b3A6MFxuICAgIHJvdzI6XG4gICAgICBsZWFkaW5nOjIyXG4gICAgICB0b3A6MTJcbiAgICByb3czOlxuICAgICAgdG9wOjEyXG4gICAgICBsZWFkaW5nOjU5XG4gICAgYXJlYTpcbiAgICAgIHRvcDoxMlxuICAgICAgbGVhZGluZzozXG4gICAgICB0cmFpbGluZzozXG4gICAgICBib3R0b206NFxuICAgIHJldHVybldpZHRoOjg3XG4gICAgcG9wVXBPZmZzZXQ6XG4gICAgICB4OjVcbiAgICAgIHk6MzJcbiAgXCJpcGhvbmUtNnMtcGx1c1wiOlxuICAgIHBvcFVwQ2hhcjozOFxuICAgIHBvcFVwVG9wOjZcbiAgICBoZWlnaHQ6MjI2XG4gICAgbGluZUhlaWdodDo0MlxuICAgIGxldHRlcktleTpcbiAgICAgIGtleVRvcDoxMlxuICAgICAgaGVpZ2h0OjQ1XG4gICAgICB3aWR0aDozNlxuICAgICAgYm9yZGVyUmFkaXVzOjVcbiAgICAgIGZvbnRTaXplOjI0XG4gICAgICB0b3A6MTBcbiAgICBzcGVjaWFsS2V5V2lkdGg6NDVcbiAgICBzcGVjaWFsS2V5SGVpZ2h0OjQ1XG4gICAgc3BhY2U6NVxuICAgIHJvdzE6XG4gICAgICBsZWFkaW5nOjBcbiAgICAgIHRvcDowXG4gICAgcm93MjpcbiAgICAgIGxlYWRpbmc6MjBcbiAgICAgIHRvcDoxMVxuICAgIHJvdzM6XG4gICAgICB0b3A6MTFcbiAgICAgIGxlYWRpbmc6NjNcbiAgICBhcmVhOlxuICAgICAgdG9wOjhcbiAgICAgIGxlYWRpbmc6NFxuICAgICAgdHJhaWxpbmc6NFxuICAgICAgYm90dG9tOjVcbiAgICByZXR1cm5XaWR0aDo5N1xuICAgIHBvcFVwT2Zmc2V0OlxuICAgICAgeDoxMFxuICAgICAgeTozOFxuICBcImlwYWRcIjpcbiAgICBoZWlnaHQ6MzEzXG4gICAgbGluZUhlaWdodDo1NVxuICAgIGxldHRlcktleTpcbiAgICAgIGhlaWdodDo1NVxuICAgICAgd2lkdGg6NTZcbiAgICAgIGJvcmRlclJhZGl1czo1XG4gICAgICBmb250U2l6ZToyM1xuICAgIHNwZWNpYWxLZXlXaWR0aDo1NlxuICAgIHNwZWNpYWxLZXlIZWlnaHQ6NTVcbiAgICBzcGFjZToxMlxuICAgIHJldHVybldpZHRoOjEwNlxuICAgIHJvdzE6XG4gICAgICBsZWFkaW5nOjBcbiAgICAgIHRvcDowXG4gICAgcm93MjpcbiAgICAgIGxlYWRpbmc6MzBcbiAgICAgIHRvcDo5XG4gICAgcm93MzpcbiAgICAgIGxlYWRpbmc6NjhcbiAgICAgIHRvcDo5XG4gICAgYXJlYTpcbiAgICAgIHRvcDo1NVxuICAgICAgbGVhZGluZzo2XG4gICAgICB0cmFpbGluZzo2XG4gICAgICBib3R0b206OFxuXG4gIFwiaXBhZC1wcm9cIjpcbiAgICBoZWlnaHQ6Mzc4XG4gICAgbGluZUhlaWdodDo2MVxuICAgIGxldHRlcktleTpcbiAgICAgIGhlaWdodDo2MVxuICAgICAgd2lkdGg6NjNcbiAgICAgIGJvcmRlclJhZGl1czo1XG4gICAgICBmb250U2l6ZToyM1xuICAgIHNwYWNlOjdcbiAgICByZXR1cm5XaWR0aDoxMjBcbiAgICBzcGVjaWFsS2V5SGVpZ2h0OjYxXG4gICAgc3BlY2lhbEtleVdpZHRoOjkzXG4gICAgcm93MTpcbiAgICAgIGxlYWRpbmc6MTExXG4gICAgICB0b3A6NTNcbiAgICByb3cyOlxuICAgICAgbGVhZGluZzoxMjZcbiAgICAgIHRvcDo3XG4gICAgcm93MzpcbiAgICAgIGxlYWRpbmc6MTYxXG4gICAgICB0b3A6N1xuICAgIGFyZWE6XG4gICAgICB0b3A6NTZcbiAgICAgIGxlYWRpbmc6NFxuICAgICAgdHJhaWxpbmc6NFxuICAgICAgYm90dG9tOjRcblxuXG5cbiMgTWFwIG9mIGtleSBjb2Rlc1xuIyBDb2RlcyBmb3IgYWxsIGtleXNcbmNvZGVNYXAgPSB7IDg6J2RlbGV0ZScsIDk6J3RhYicsIDEzOidyZXR1cm4nLCAxNjonc2hpZnQnLCAyMDonY2FwcycsIDMyOidzcGFjZScsIDI3OlwiZGlzbWlzc1wiLCAzMzpcIiFcIiwgMzQ6XCJcXFwiXCIsIDM1OlwiI1wiLCAzNjpcIiRcIiwgMzc6XCIlXCIsIDM4OlwiJlwiLCAzOTpcIlxcJ1wiLCA0MDpcIihcIiwgNDE6XCIpXCIsIDQyOlwiKlwiLCA0MzpcIitcIiwgNDQ6XCIsXCIsIDQ1OlwiLVwiLCA0NzpcIi9cIiwgNDY6XCIuXCIsIDQ4OlwiMFwiLCA0OTpcIiFcIiwgNTA6XCJAXCIsIDUxOlwiI1wiLCA1MjpcIiRcIiwgNTM6XCIlXCIsIDU0OlwiXlwiLCA1NTpcIiZcIiwgNTY6XCIqXCIsIDU3OlwiKFwiLCA0ODpcIilcIiwgNTk6XCJfXCIsIDYwOlwiPFwiLCA2MTpcIj1cIiwgNjI6XCI+XCIsIDYzOlwiP1wiLCA2NDpcIkBcIiwgNjU6XCJBXCIsIDY2OlwiQlwiLCA2NzpcIkNcIiwgNjg6XCJEXCIsIDY5OlwiRVwiLCA3MDpcIkZcIiwgNzE6XCJHXCIsIDcyOlwiSFwiLCA3MzpcIklcIiwgNzQ6XCJKXCIsIDc1OlwiS1wiLCA3NjpcIkxcIiwgNzc6XCJNXCIsIDc4OlwiTlwiLCA3OTpcIk9cIiwgODA6XCJQXCIsIDgxOlwiUVwiLCA4MjpcIlJcIiwgODM6XCJTXCIsIDg0OlwiVFwiLCA4NTpcIlVcIiwgODY6XCJWXCIsIDg3OlwiV1wiLCA4ODpcIlhcIiwgODk6XCJZXCIsIDkwOlwiWlwiLCA5MTonY21kJywgMjE5OlwiW1wiLCA5MjpcIlxcXFxcIiwgMjIxOlwiXVwiLCA5NDpcIl5cIiwgOTU6XCJfXCIsIDk2OlwiYFwiLCA5NzpcImFcIiwgOTg6XCJiXCIsIDk5OlwiY1wiLCAxMDA6XCJkXCIsIDEwMTpcImVcIiwgMTAyOlwiZlwiLCAxMDM6XCJnXCIsIDEwNDpcImhcIiwgMTA1OlwiaVwiLCAxMDY6XCJqXCIsIDEwNzpcImtcIiwgMTA4OlwibFwiLCAxMDk6XCJtXCIsIDExMDpcIm5cIiwgMTExOlwib1wiLCAxMTI6XCJwXCIsIDExMzpcInFcIiwgMTE0OlwiclwiLCAxMTU6XCJzXCIsIDExNjpcInRcIiwgMTE3OlwidVwiLCAxMTg6XCJ2XCIsIDExOTpcIndcIiwgMTIwOlwieFwiLCAxMjE6XCJ5XCIsIDEyMjpcInpcIiwgMTIzOlwie1wiLCAxMjQ6XCJ8XCIsIDEyNTpcIn1cIiwgMTI2OlwiflwiLCAxODY6XCI6XCIsIDE4NzpcIitcIiwgMTg4OlwiPFwiLCAxOTA6XCI+XCIsIDE5MTpcIj9cIiwgMTg5OlwiX1wiLCAxOTI6XCJ+XCIsIDIxOTpcIntcIiwgMjIwOlwiXFx8XCIsIDIyMTpcIn1cIiwgMjIyOlwiJnJkcXVvO1wifVxuYXJyYXlPZkNvZGVzID0gT2JqZWN0LmtleXMoY29kZU1hcClcbmxldHRlcnMgPSBbXCJxXCIsIFwid1wiLCBcImVcIiwgXCJyXCIsIFwidFwiLCBcInlcIiwgXCJ1XCIsIFwiaVwiLCBcIm9cIiwgXCJwXCIsIFwiYVwiLCBcInNcIiwgXCJkXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwialwiLCBcImtcIiwgXCJsXCIsIFwielwiLCBcInhcIiwgXCJjXCIsIFwidlwiLCAgXCJiXCIsIFwiblwiLCBcIm1cIl1cbm51bWJlcnMgPSBbXCIxXCIsIFwiMlwiLCBcIjNcIiwgXCI0XCIsIFwiNVwiLCBcIjZcIiwgXCI3XCIsIFwiOFwiLCBcIjlcIiwgXCIwXCIsIFwiLVwiLCBcIi9cIiwgXCI6XCIsIFwiO1wiLCBcIihcIiwgXCIpXCIsIFwiJFwiLCBcIiZcIiwgXCJAXCIsIFwiXFxcIlwiLCBcIi5cIiwgXCIsXCIsIFwiP1wiLCBcIiFcIiwgXCLigLJcIl1cbnN5bWJvbHMgPSBbXCJbXCIsIFwiXVwiLCBcIntcIiwgXCJ9XCIsIFwiI1wiLCBcIiVcIiwgXCJeXCIsIFwiKlwiLCBcIitcIiwgXCI9XCIsIFwiX1wiLCBcIlxcXFxcIiwgXCJ8XCIsIFwiflwiLCBcIjxcIiwgXCI+XCIsIFwi4oKsXCIsIFwiwqNcIiwgXCLCpVwiLCBcIuKAolwiXVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAob2JqKSAtPlxuICBzZXR1cCA9IGlvcy51dGlscy5zZXR1cENvbXBvbmVudChvYmosIGV4cG9ydHMuZGVmYXVsdHMpXG4gICNSZXNwb25zYWJpbGUgZm9yIGNvbG9yc1xuICBzdHlsZSA9XG4gICAgbGlnaHQ6XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6XCIjRDFENURBXCJcbiAgICAgIGNvbG9yOlwiIzAwMFwiXG4gICAgICBzcGVjaWFsS2V5Qkc6XCIjQUNCM0JEXCJcbiAgICAgIGtleUJHOlwiI0Y3RjdGN1wiXG4gICAgICBzaGFkb3dZOiBpb3MucHgoMSlcbiAgICAgIHNoYWRvd0NvbG9yOlwiIzg5OEI4RlwiXG4gICAgICByZXR1cm5CRzppb3MuY29sb3Ioc2V0dXAucmV0dXJuQ29sb3IpXG4gICAgZGFyazpcbiAgICAgIGJhY2tncm91bmRDb2xvcjpcInJnYmEoMCwwLDAsLjcpXCJcbiAgICAgIGNvbG9yOlwiI0ZGRlwiXG4gICAgICBzcGVjaWFsS2V5Qkc6XCJyZ2JhKDY3LDY3LDY3LC44KVwiXG4gICAgICBrZXlCRzpcInJnYmEoMTA1LDEwNSwxMDUsLjgpXCJcbiAgICAgIHNoYWRvd1k6IGlvcy5weCgxKVxuICAgICAgc2hhZG93Q29sb3I6XCJyZ2JhKDAsMCwwLC40KVwiXG4gICAgICByZXR1cm5CRzppb3MuY29sb3Ioc2V0dXAucmV0dXJuQ29sb3IpXG5cbiAgc3BlY3MgPSBkZXZpY2VbaW9zLmRldmljZS5uYW1lXVxuICBjb2xvcnMgPSBzdHlsZVtzZXR1cC5zdHlsZV1cblxuICBkZXZpY2VcbiAgYm9hcmQgPSBuZXcgaW9zLlZpZXdcbiAgICBuYW1lOlwiS2V5Ym9hcmRcIlxuICAgIHN1cGVyTGF5ZXI6c2V0dXAuc3VwZXJMYXllclxuICAgIGJhY2tncm91bmRDb2xvcjpzdHlsZVtzZXR1cC5zdHlsZV0uYmFja2dyb3VuZENvbG9yXG4gICAgeTppb3MuZGV2aWNlLmhlaWdodFxuICAgIGNvbnN0cmFpbnRzOlxuICAgICAgbGVhZGluZzowXG4gICAgICB0cmFpbGluZzowXG4gICAgICBib3R0b206LTEgKiBzcGVjcy5oZWlnaHRcbiAgICAgIGhlaWdodDpzcGVjcy5oZWlnaHRcbiAgaW9zLnV0aWxzLmJnQmx1cihib2FyZClcbiAgYm9hcmQub3V0cHV0ID0gKG9iaikgLT5cbiAgICBpZiBib2FyZC50YXJnZXRcbiAgICAgIGlmIGJvYXJkLnRhcmdldC50eXBlID09ICdmaWVsZCdcbiAgICAgICAgYm9hcmQudGFyZ2V0LmFjdGl2ZSA9IGZhbHNlXG5cbiAgICBib2FyZC50YXJnZXQgPSBvYmpcbiAgICBpZiBib2FyZC50YXJnZXRcbiAgICAgIGlmIGJvYXJkLnRhcmdldC50eXBlID09ICdmaWVsZCdcbiAgICAgICAgYm9hcmQudGFyZ2V0LmFjdGl2ZSA9IHRydWVcbiAgYm9hcmQuaGlkZGVuID0gc2V0dXAuaGlkZGVuXG5cbiAgaWYgYm9hcmQuaGlkZGVuID09IGZhbHNlXG4gICAgYm9hcmQuY29uc3RyYWludHMuYm90dG9tID0gMFxuICAgIGlvcy5sYXlvdXQuc2V0KGJvYXJkKVxuXG4gIGJvYXJkLmNhbGwgPSAoKSAtPlxuICAgIGJvYXJkLnkgPSBpb3MuZGV2aWNlLmhlaWdodFxuICAgIGJvYXJkLmNvbnN0cmFpbnRzLmJvdHRvbSA9IDBcbiAgICBpZiBib2FyZC5oaWRkZW5cbiAgICAgIGJvYXJkLmhpZGRlbiA9IGZhbHNlXG4gICAgICBpb3MubGF5b3V0LmFuaW1hdGVcbiAgICAgICAgdGFyZ2V0OmJvYXJkXG4gICAgICAgIHRpbWU6LjVcbiAgICAgICAgY3VydmU6J2Vhc2UtaW4tb3V0J1xuXG4gICAgYm9hcmQuYnJpbmdUb0Zyb250KClcbiAgYm9hcmQuZGlzbWlzcyA9ICgpIC0+XG4gICAgYm9hcmQuY29uc3RyYWludHMuYm90dG9tID0gLTEgKiBpb3MucHQoYm9hcmQuaGVpZ2h0KVxuICAgIGJvYXJkLmhpZGRlbiA9IHRydWVcbiAgICBib2FyZC50YXJnZXQuYWN0aXZlID0gZmFsc2VcbiAgICBpb3MubGF5b3V0LmFuaW1hdGVcbiAgICAgIHRhcmdldDpib2FyZFxuICAgICAgdGltZTouNVxuICAgICAgY3VydmU6J2Vhc2UtaW4tb3V0J1xuXG4gIGJvYXJkLmRlbGV0ZSA9ICgpIC0+XG4gICAgbGF5ZXIgPSBcIlwiXG4gICAgaWYgYm9hcmQudGFyZ2V0XG4gICAgICBpZiBib2FyZC50YXJnZXQudHlwZSA9PSAnZmllbGQnXG4gICAgICAgIGxheWVyID0gYm9hcmQudGFyZ2V0LnRleHRcbiAgICAgIGVsc2VcbiAgICAgICAgbGF5ZXIgPSBib2FyZC50YXJnZXRcblxuICAgICAgaXNTcGFjZSA9IGxheWVyLmh0bWxbbGF5ZXIuaHRtbC5sZW5ndGggLSA1Li5sYXllci5odG1sLmxlbmd0aCAtIDEgXVxuXG4gICAgICBpZiBpc1NwYWNlICE9ICduYnNwOydcbiAgICAgICAgdGV4dCA9IGxheWVyLmh0bWwuc2xpY2UoMCwgLTEpXG4gICAgICAgIGxheWVyLmh0bWwgPSB0ZXh0XG4gICAgICBlbHNlXG4gICAgICAgIHRleHQgPSBsYXllci5odG1sLnNsaWNlKDAsIC02KVxuICAgICAgICBsYXllci5odG1sID0gdGV4dFxuXG4gIGJvYXJkLmNhcHNMb2NrID0gKCkgLT5cbiAgICBib2FyZC5pc0NhcHNMb2NrID0gdHJ1ZVxuICAgIGJvYXJkLmlzQ2FwaXRhbCA9IHRydWVcbiAgICBib2FyZC5rZXlzLnNoaWZ0Lmljb24udG9nZ2xlKCdvZmYnKVxuICAgIGhhbmRsZUtleUNvbG9yKGJvYXJkLmtleXMuc2hpZnQpXG4gICAgaWYgaW9zLmRldmljZS5uYW1lID09ICdpcGFkLXBybydcbiAgICAgIGJvYXJkLmtleXMuc2hpZnRhbHQuaWNvbi50b2dnbGUoJ29mZicpXG4gICAgICBoYW5kbGVLZXlDb2xvcihib2FyZC5rZXlzLnNoaWZ0YWx0KVxuXG4gIGJvYXJkLm91dHB1dChzZXR1cC5vdXRwdXQpXG4gIGJvYXJkLmtleXNBcnJheSA9IFtdXG4gIGJvYXJkLmtleXMgPSB7fVxuICBib2FyZC5pc0NhcGl0YWwgPSBzZXR1cC5zaGlmdFxuICBib2FyZC5hcmVhID0gbmV3IGlvcy5WaWV3XG4gICAgbmFtZTpcIi5hcmVhXCJcbiAgICBzdXBlckxheWVyOmJvYXJkXG4gICAgY29uc3RyYWludHM6IHNwZWNzLmFyZWFcbiAgICBiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cbiAgS2V5ID0gKG9iaikgLT5cbiAgICBrZXkgPSBuZXcgaW9zLlZpZXdcbiAgICAgIG5hbWU6XCIua2V5cy5cIiArIG9iai5uYW1lXG4gICAgICBjb25zdHJhaW50czpvYmouY29uc3RyYWludHNcbiAgICAgIHN1cGVyTGF5ZXI6Ym9hcmQuYXJlYVxuICAgICAgYm9yZGVyUmFkaXVzOmlvcy5weChzcGVjcy5sZXR0ZXJLZXkuYm9yZGVyUmFkaXVzKVxuICAgICAgc2hhZG93WTpjb2xvcnMuc2hhZG93WVxuICAgICAgc2hhZG93Q29sb3I6Y29sb3JzLnNoYWRvd0NvbG9yXG4gICAga2V5LnN0eWxlLmZvbnRGYW1pbHkgPSBcIi1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWZcIlxuXG4gICAgI0Rpc2FibGVzIFpvb21cbiAgICBrZXkub24gRXZlbnRzLlRvdWNoU3RhcnQsIChldmVudCkgLT5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICByZXR1cm4ga2V5XG5cbiAgTGV0dGVyID0gKG9iaikgLT5cbiAgICBrZXkgPSBuZXcgS2V5IG9ialxuICAgIGtleS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnMua2V5QkdcbiAgICBrZXkuaHRtbCA9IG9iai5sZXR0ZXJcbiAgICBrZXkuY29sb3IgPSBjb2xvcnMuY29sb3JcbiAgICBrZXkuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIlxuICAgIGtleS5zdHlsZS5saW5lSGVpZ2h0ID0gaW9zLnB4KHNwZWNzLmxpbmVIZWlnaHQpICsgXCJweFwiXG4gICAga2V5LnN0eWxlLmZvbnRTaXplID0gaW9zLnB4KHNwZWNzLmxldHRlcktleS5mb250U2l6ZSkgKyBcInB4XCJcbiAgICBrZXkudmFsdWUgPSBvYmoubGV0dGVyXG5cblxuICAgIGlmIGtleS52YWx1ZSA9PSBcInNwYWNlXCIgdGhlbiBrZXkudmFsdWUgPSBcIiZuYnNwO1wiXG4gICAgaWYgaW9zLmlzUGFkKClcbiAgICAgIGtleS5kb3duID0gLT5cbiAgICAgICAga2V5LmJhY2tncm91bmRDb2xvciA9IGNvbG9ycy5zcGVjaWFsS2V5QkdcbiAgICAgICAgaWYgYm9hcmQudGFyZ2V0IHRoZW4gaW9zLnV0aWxzLndyaXRlKGJvYXJkLnRhcmdldCwga2V5LnZhbHVlKVxuICAgICAga2V5LnVwID0gLT5cbiAgICAgICAga2V5LmJhY2tncm91bmRDb2xvciA9IGNvbG9ycy5rZXlCR1xuICAgICAgICBpZiBib2FyZC5pc0NhcGl0YWwgJiYgYm9hcmQuaXNDYXBzTG9jayAhPSB0cnVlXG4gICAgICAgICAgYm9hcmQuaXNDYXBpdGFsID0gZmFsc2VcbiAgICAgICAgICBjYXBpdGFsaXplS2V5cygpXG4gICAgICAgICAgYm9hcmQua2V5cy5zaGlmdC51cCgpXG4gICAgICAgICAgaWYgaW9zLmlzUGFkKCkgdGhlbiBib2FyZC5rZXlzLnNoaWZ0YWx0LnVwKClcbiAgICAgIGtleS5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cbiAgICAgICAga2V5LmRvd24oKVxuICAgICAga2V5Lm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cbiAgICAgICAga2V5LnVwKClcbiAgICBlbHNlXG4gICAgICBpZiBrZXkudmFsdWUgIT0gJyZuYnNwOydcbiAgICAgICAga2V5LmRvd24gPSAtPlxuICAgICAgICAgIGJvYXJkLnBvcFVwLnZpc2libGUgPSB0cnVlXG4gICAgICAgICAgYm9hcmQuYnJpbmdUb0Zyb250KClcbiAgICAgICAgICBib2FyZC5wb3BVcC5icmluZ1RvRnJvbnQoKVxuICAgICAgICAgIGJvYXJkLnBvcFVwLm1pZFggPSBrZXkubWlkWFxuICAgICAgICAgIGJvYXJkLnBvcFVwLm1heFkgPSBrZXkubWF4WVxuICAgICAgICAgIGJvYXJkLnBvcFVwLnRleHQuaHRtbCA9IGtleS52YWx1ZVxuXG4gICAgICAgICAgaWYgYm9hcmQudGFyZ2V0IHRoZW4gaW9zLnV0aWxzLndyaXRlKGJvYXJkLnRhcmdldCwga2V5LnZhbHVlKVxuXG5cbiAgICAgICAga2V5LnVwID0gLT5cbiAgICAgICAgICBib2FyZC5wb3BVcC52aXNpYmxlID0gZmFsc2VcbiAgICAgICAgICBpZiBib2FyZC5pc0NhcGl0YWwgJiYgYm9hcmQuY2Fwc0xvY2sgIT0gdHJ1ZVxuICAgICAgICAgICAgYm9hcmQuaXNDYXBpdGFsID0gZmFsc2VcbiAgICAgICAgICAgIGNhcGl0YWxpemVLZXlzKClcbiAgICAgICAgICAgIGJvYXJkLmtleXMuc2hpZnQudXAoKVxuXG4gICAgICAgIGtleS5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT4ga2V5LmRvd24oKVxuICAgICAgICBrZXkub24gRXZlbnRzLlRvdWNoRW5kLCAtPiBrZXkudXAoKVxuICAgICAgZWxzZVxuXG4gICAgICAgIGtleS5kb3duID0gLT5cbiAgICAgICAgICBrZXkuYmFja2dyb3VuZENvbG9yID0gY29sb3JzLnNwZWNpYWxLZXlCR1xuICAgICAgICAgIGlmIGJvYXJkLnRhcmdldCB0aGVuIGlvcy51dGlscy53cml0ZShib2FyZC50YXJnZXQsIGtleS52YWx1ZSlcbiAgICAgICAga2V5LnVwID0gLT5cbiAgICAgICAgICBrZXkuYmFja2dyb3VuZENvbG9yID0gY29sb3JzLmtleUJHXG4gICAgICAgIGtleS5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cbiAgICAgICAgICBrZXkuZG93bigpXG4gICAgICAgIGtleS5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG4gICAgICAgICAga2V5LnVwKClcblxuICAgIHJldHVybiBrZXlcblxuICBTcGVjaWFsS2V5ID0gKG9iaikgLT5cbiAgICBrZXkgPSBuZXcgS2V5IG9ialxuICAgIGtleS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnMuc3BlY2lhbEtleUJHXG4gICAga2V5LmNvbG9yID0gY29sb3JzLmNvbG9yXG4gICAga2V5LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCJcbiAgICBpZiBpb3MuZGV2aWNlLm5hbWUgPT0gJ2lwYWQtcHJvJ1xuICAgICAga2V5LnN0eWxlLmZvbnRTaXplID0gaW9zLnB4KDE4KSArIFwicHhcIlxuICAgIGVsc2VcbiAgICAgIGtleS5zdHlsZS5mb250U2l6ZSA9IGlvcy5weCgxNikgKyBcInB4XCJcbiAgICByZXR1cm4ga2V5XG5cbiAgSWNvbiA9IChvYmopIC0+XG4gICAgaWNvbiA9IG5ldyBpb3MuVmlld1xuICAgICAgbmFtZTonaWNvbidcbiAgICAgIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcbiAgICAgIHN1cGVyTGF5ZXI6b2JqLnN1cGVyTGF5ZXJcbiAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICBhbGlnbjonY2VudGVyJ1xuXG4gICAgaWNvbi5wcm9wcyA9IChoZWlnaHQ6b2JqLmljb24uaGVpZ2h0LCB3aWR0aDpvYmouaWNvbi53aWR0aCwgaHRtbDogb2JqLmljb24uc3ZnKVxuXG4gICAgaW9zLnV0aWxzLmNoYW5nZUZpbGwoaWNvbiwgY29sb3JzLmNvbG9yKVxuICAgIHJldHVybiBpY29uXG5cbiAgSWNvbldpdGhTdGF0ZSA9IChvYmopIC0+XG4gICAgaWNvbiA9IG5ldyBpb3MuVmlld1xuICAgICAgbmFtZTonaWNvbidcbiAgICAgIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcbiAgICAgIHN1cGVyTGF5ZXI6b2JqLnN1cGVyTGF5ZXJcbiAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICBhbGlnbjonY2VudGVyJ1xuXG4gICAgaWNvbi50b2dnbGUgPSAoc3RhdGUpIC0+XG4gICAgICBpZiBzdGF0ZSA9PSB1bmRlZmluZWRcbiAgICAgICAgaWYgaWNvbi5zdGF0ZSA9PSAnb24nIHRoZW4gc3RhdGUgPSAnb2ZmJ1xuICAgICAgICBlbHNlIHN0YXRlID0gJ29uJ1xuXG4gICAgICBpZiBzdGF0ZSA9PSBcIm9uXCJcbiAgICAgICAgaWYgaW9zLmRldmljZS5uYW1lICE9ICdpcGFkLXBybydcbiAgICAgICAgICBpY29uLmh0bWwgPSBvYmoub24uc3ZnXG4gICAgICAgICAgaWNvbi53aWR0aCA9IG9iai5vbi53aWR0aFxuICAgICAgICAgIGljb24uaGVpZ2h0ID0gb2JqLm9uLmhlaWdodFxuICAgICAgICBpY29uLnN0YXRlID0gJ29uJ1xuICAgICAgZWxzZVxuICAgICAgICBpZiBpb3MuZGV2aWNlLm5hbWUgIT0gJ2lwYWQtcHJvJ1xuICAgICAgICAgIGljb24uaHRtbCA9IG9iai5vZmYuc3ZnXG4gICAgICAgICAgaWNvbi53aWR0aCA9IG9iai5vbi53aWR0aFxuICAgICAgICAgIGljb24uaGVpZ2h0ID0gb2JqLm9uLmhlaWdodFxuICAgICAgICBpY29uLnN0YXRlID0gJ29mZidcbiAgICAgIGlvcy51dGlscy5jaGFuZ2VGaWxsKGljb24sIGNvbG9ycy5jb2xvcilcbiAgICBpZiBvYmouc3RhdGVcbiAgICAgIGljb24udG9nZ2xlKCdvbicpXG4gICAgZWxzZVxuICAgICAgaWNvbi50b2dnbGUoJ29mZicpXG5cblxuICAgIHJldHVybiBpY29uXG5cbiAgY2FwaXRhbGl6ZUtleXMgPSAtPlxuICAgIGZvciBrZXkgaW4gYm9hcmQua2V5c0FycmF5XG4gICAgICBpZiBib2FyZC5pc0NhcGl0YWxcbiAgICAgICAgaWYga2V5Lmh0bWwubGVuZ3RoID09IDEgJiYga2V5Lmh0bWwubWF0Y2goL1thLXpdL2kpXG4gICAgICAgICAga2V5Lmh0bWwgPSBrZXkuaHRtbC50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAga2V5LnZhbHVlID0ga2V5Lmh0bWxcbiAgICAgICAgaWYga2V5LmFsdFxuICAgICAgICAgIGtleS5hbHQuZGVzdHJveSgpXG4gICAgICAgICAga2V5LmFsdCA9IHVuZGVmaW5lZFxuICAgICAgICBpZiBrZXkuaGVpZ2h0ID4gaW9zLnB4KDQ2KVxuICAgICAgICAgIGtleS5zdHlsZS5saW5lSGVpZ2h0ID0gaW9zLnB4KHNwZWNzLmxldHRlcktleS5oZWlnaHQpICsgJ3B4J1xuICAgICAgICAgIGtleS5zdHlsZS5mb250U2l6ZSA9IGlvcy5weCgyMykgKyAncHgnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBpZiBpb3MuZGV2aWNlLm5hbWUgPT0gJ2lwYWQtcHJvJ1xuICAgICAgICAgICAga2V5LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoNDYpICsgJ3B4J1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGtleS5zdHlsZS5saW5lSGVpZ2h0ID0gaW9zLnB4KHNwZWNzLmxpbmVIZWlnaHQpICsgJ3B4J1xuICAgICAgICAgIGtleS5zdHlsZS5mb250U2l6ZSA9IGlvcy5weCgyMCkgKyAncHgnXG4gICAgICAgIGtleS52YWx1ZSA9IGtleS5odG1sXG4gICAgICBlbHNlXG4gICAgICAgIGlmIGtleS5odG1sLmxlbmd0aCA9PSAxICYmIGtleS5odG1sLm1hdGNoKC9bYS16XS9pKVxuICAgICAgICAgIGtleS5odG1sID0ga2V5Lmh0bWwudG9Mb3dlckNhc2UoKVxuICAgICAgICAgIGtleS52YWx1ZSA9IGtleS5odG1sXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBpZiBrZXkuYWx0ID09IHVuZGVmaW5lZFxuICAgICAgICAgICAga2V5LmFsdCA9IG5ldyBpb3MuVGV4dFxuICAgICAgICAgICAgICB0ZXh0OlwiXCJcbiAgICAgICAgICAgICAgc3VwZXJMYXllcjprZXlcbiAgICAgICAgICAgICAgY29sb3I6Y29sb3JzLmNvbG9yXG4gICAgICAgICAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICAgICAgICAgIGFsaWduOlwiaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAgICAgYm90dG9tOjRcbiAgICAgICAgICAgICAgZm9udFNpemU6c3BlY3MubGV0dGVyS2V5LmZvbnRTaXplXG4gICAgICAgICAgICBpZiBib2FyZC50b3BSb3dcbiAgICAgICAgICAgICAgaWYgYm9hcmQudG9wUm93LmluZGV4T2Yoa2V5KSAhPSAtMVxuICAgICAgICAgICAgICAgIGtleS5zdHlsZS5saW5lSGVpZ2h0ID0gaW9zLnB4KDIzKSArICdweCdcbiAgICAgICAgICAgICAgICBrZXkuc3R5bGUuZm9udFNpemUgPSBpb3MucHgoMTYpICsgJ3B4J1xuICAgICAgICAgICAgICAgIGtleS5hbHQuc3R5bGUuZm9udFNpemUgPSBpb3MucHgoMTYpICsgJ3B4J1xuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAga2V5LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoMzYpICsgJ3B4J1xuICAgICAgICAgICAgICAgIGtleS5zdHlsZS5mb250U2l6ZSA9IGlvcy5weCgyMCkgKyAncHgnXG4gICAgICAgICAgICAgICAga2V5LmFsdC5zdHlsZS5mb250U2l6ZSA9IGlvcy5weCgyMCkgKyAncHgnXG4gICAgICAgICAgICAgICAga2V5LmFsdC5jb25zdHJhaW50cy5ib3R0b20gPSA4XG4gICAgICAgICAgICBzd2l0Y2gga2V5LnZhbHVlXG4gICAgICAgICAgICAgIHdoZW4gXCImbHQ7XCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIi5cIlxuICAgICAgICAgICAgICB3aGVuIFwiJmd0O1wiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCIsXCJcbiAgICAgICAgICAgICAgd2hlbiBcIjxcIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiLlwiXG4gICAgICAgICAgICAgIHdoZW4gXCI+XCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIixcIlxuICAgICAgICAgICAgICB3aGVuIFwiP1wiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCIuXCJcbiAgICAgICAgICAgICAgd2hlbiBcIntcIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiW1wiXG4gICAgICAgICAgICAgIHdoZW4gXCJ9XCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIn1cIlxuICAgICAgICAgICAgICB3aGVuIFwiXFx8XCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIlxcXFxcIlxuICAgICAgICAgICAgICB3aGVuIFwiflwiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCJgXCJcbiAgICAgICAgICAgICAgd2hlbiBcIiFcIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiLlwiXG4gICAgICAgICAgICAgIHdoZW4gXCJAXCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIjJcIlxuICAgICAgICAgICAgICB3aGVuIFwiI1wiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCIzXCJcbiAgICAgICAgICAgICAgd2hlbiBcIiRcIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiNFwiXG4gICAgICAgICAgICAgIHdoZW4gXCIlXCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIjVcIlxuICAgICAgICAgICAgICB3aGVuIFwiXlwiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCI2XCJcbiAgICAgICAgICAgICAgd2hlbiBcIiZhbXA7XCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIjdcIlxuICAgICAgICAgICAgICB3aGVuIFwiJlwiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCI3XCJcbiAgICAgICAgICAgICAgd2hlbiBcIipcIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiOFwiXG4gICAgICAgICAgICAgIHdoZW4gXCIoXCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIjlcIlxuICAgICAgICAgICAgICB3aGVuIFwiKVwiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCIwXCJcbiAgICAgICAgICAgICAgd2hlbiBcIl9cIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiLVwiXG4gICAgICAgICAgICAgIHdoZW4gXCIrXCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIj1cIlxuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCImcHJpbWU7XCJcbiAgICAgICAgICAgIGlvcy5sYXlvdXQuc2V0KGtleS5hbHQpXG4gICAgICAgICAgICBpZiBpb3MuZGV2aWNlLm5hbWUgPT0gJ2lwYWQtcHJvJyAmJiBrZXkudmFsdWUgPT0gJyEnIHRoZW4ga2V5LmFsdC5odG1sID0gJzEnXG4gICAgICAgICAgICBpZiBpb3MuZGV2aWNlLm5hbWUgPT0gJ2lwYWQtcHJvJyAmJiBrZXkudmFsdWUgPT0gJz8nIHRoZW4ga2V5LmFsdC5odG1sID0gJy8nXG4gICAgICAgICAgICBpZiBpb3MuZGV2aWNlLm5hbWUgPT0gJ2lwYWQtcHJvJyAmJiBrZXkudmFsdWUgPT0gJzonIHRoZW4ga2V5LmFsdC5odG1sID0gJzsnXG4gICAgICAgICAgICBpZiBpb3MuZGV2aWNlLm5hbWUgPT0gJ2lwYWQtcHJvJyAmJiBrZXkudmFsdWUgPT0gJyZyZHF1bzsnIHRoZW4ga2V5LmFsdC5odG1sID0gJyZwcmltZTsnXG4gICAgICAgICAgICBrZXkudmFsdWUgPSBrZXkuYWx0Lmh0bWxcblxuICBoYW5kbGVLZXlDb2xvciA9IChrZXkpIC0+XG4gICAgaWYgaW9zLmlzUGhvbmVcbiAgICAgIGlmIGtleS5pY29uLnN0YXRlID09ICdvbicgdGhlbiBrZXkuYmFja2dyb3VuZENvbG9yID0gY29sb3JzLmtleUJHXG4gICAgICBlbHNlIGtleS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnMuc3BlY2lhbEtleUJHXG5cbiAgU3BhY2UgPSAob2JqKSAtPlxuICAgIGtleSA9IG5ldyBMZXR0ZXIgb2JqXG4gICAga2V5Lmh0bWwgPSAnc3BhY2UnXG4gICAga2V5LmJhY2tncm91bmRDb2xvciA9IGNvbG9ycy5rZXlCR1xuICAgIGtleS5zdHlsZS5saW5lSGVpZ2h0ID0gaW9zLnB4KHNwZWNzLnNwZWNpYWxLZXlIZWlnaHQpICsgXCJweFwiXG4gICAga2V5LnN0eWxlLmZvbnRTaXplID0gaW9zLnB4KDE2KSArICdweCdcbiAgICByZXR1cm4ga2V5XG5cbiAgU2hpZnQgPSAob2JqKSAtPlxuICAgIGtleSA9IG5ldyBTcGVjaWFsS2V5IG9ialxuICAgIGtleS5pY29uID0gbmV3IEljb25XaXRoU3RhdGVcbiAgICAgIHN1cGVyTGF5ZXI6a2V5XG4gICAgICBzdGF0ZTpvYmouc2hpZnRcbiAgICAgIG9uOmlvcy51dGlscy5zdmcoaW9zLmFzc2V0cy5zaGlmdC5vbilcbiAgICAgIG9mZjppb3MudXRpbHMuc3ZnKGlvcy5hc3NldHMuc2hpZnQub2ZmKVxuICAgIGhhbmRsZUtleUNvbG9yKGtleSlcblxuICAgIGtleS5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG4gICAgICBALmljb24udG9nZ2xlKClcbiAgICAgIGhhbmRsZUtleUNvbG9yKGtleSlcbiAgICAgIGlmIEAuaWNvbi5zdGF0ZSA9PSAnb24nXG4gICAgICAgIGJvYXJkLmlzQ2FwaXRhbCA9IHRydWVcbiAgICAgIGVsc2VcbiAgICAgICAgYm9hcmQuaXNDYXBpdGFsID0gZmFsc2VcbiAgICAgIGNhcGl0YWxpemVLZXlzKClcblxuICAgIGtleS5kb3duID0gLT5cbiAgICAgIGtleS5pY29uLnRvZ2dsZSgnb24nKVxuICAgICAgaGFuZGxlS2V5Q29sb3Ioa2V5KVxuICAgICAgYm9hcmQuaXNDYXBpdGFsID0gdHJ1ZVxuICAgICAgY2FwaXRhbGl6ZUtleXMoKVxuXG4gICAga2V5LnVwID0gLT5cbiAgICAgIGtleS5pY29uLnRvZ2dsZSgnb2ZmJylcbiAgICAgIGhhbmRsZUtleUNvbG9yKGtleSlcbiAgICAgIGJvYXJkLmlzQ2FwaXRhbCA9IGZhbHNlXG4gICAgICBjYXBpdGFsaXplS2V5cygpXG5cbiAgICBpb3MubGF5b3V0LnNldChrZXkuaWNvbilcblxuICAgIGlmIGlvcy5pc1BhZCgpXG4gICAgICBrZXkub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuICAgICAgICBpZiBALmljb24uc3RhdGUgPT0gJ29uJ1xuICAgICAgICAgIGJvYXJkLmtleXMuc2hpZnQuaWNvbi50b2dnbGUoJ29uJylcbiAgICAgICAgICBib2FyZC5rZXlzLnNoaWZ0YWx0Lmljb24udG9nZ2xlKCdvbicpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBib2FyZC5rZXlzLnNoaWZ0Lmljb24udG9nZ2xlKCdvZmYnKVxuICAgICAgICAgIGJvYXJkLmtleXMuc2hpZnRhbHQuaWNvbi50b2dnbGUoJ29mZicpXG4gICAgICAgIGhhbmRsZUtleUNvbG9yKGJvYXJkLmtleXMuc2hpZnQpXG4gICAgICAgIGhhbmRsZUtleUNvbG9yKGJvYXJkLmtleXMuc2hpZnRhbHQpXG4gICAgcmV0dXJuIGtleVxuXG4gIERlbGV0ZSA9IChvYmopIC0+XG4gICAga2V5ID0gbmV3IFNwZWNpYWxLZXkgb2JqXG4gICAga2V5Lmljb24gPSBuZXcgSWNvbldpdGhTdGF0ZVxuICAgICAgc3VwZXJMYXllcjprZXlcbiAgICAgIG9uOmlvcy51dGlscy5zdmcoaW9zLmFzc2V0cy5kZWxldGUub24pXG4gICAgICBvZmY6aW9zLnV0aWxzLnN2Zyhpb3MuYXNzZXRzLmRlbGV0ZS5vZmYpXG5cbiAgICBrZXkuZmlyZSA9IC0+IGJvYXJkLmRlbGV0ZSgpXG5cbiAgICBrZXkuZG93biA9IC0+XG4gICAgICBrZXkuaWNvbi50b2dnbGUoJ29uJylcbiAgICAgIGhhbmRsZUtleUNvbG9yKGtleSlcbiAgICAgIGtleS5maXJlKClcblxuICAgIGtleS51cCA9IC0+XG4gICAgICBrZXkuaWNvbi50b2dnbGUoJ29mZicpXG4gICAgICBoYW5kbGVLZXlDb2xvcihrZXkpXG5cbiAgICBrZXkub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+IGtleS5kb3duKClcbiAgICBrZXkub24gRXZlbnRzLlRvdWNoRW5kLCAtPiBrZXkudXAoKVxuXG5cbiAgICByZXR1cm4ga2V5XG5cbiAgTnVtYmVycyAgPSAob2JqKSAtPlxuICAgIGtleSA9IG5ldyBTcGVjaWFsS2V5IG9ialxuICAgIGlmIGlvcy5pc1Bob25lKClcbiAgICAgIGtleS5odG1sID0gJzEyMydcbiAgICBlbHNlXG4gICAgICBrZXkuaHRtbCA9Jy4/MTIzJ1xuICAgIGtleS5zdHlsZS5saW5lSGVpZ2h0ID0gaW9zLnB4KHNwZWNzLnNwZWNpYWxLZXlIZWlnaHQpICsgXCJweFwiXG4gICAgcmV0dXJuIGtleVxuXG4gIEVtb2ppID0gKG9iaikgLT5cbiAgICBrZXkgPSBuZXcgU3BlY2lhbEtleSBvYmpcbiAgICBrZXkuaWNvbiA9IG5ldyBJY29uXG4gICAgICBzdXBlckxheWVyOmtleVxuICAgICAgaWNvbjppb3MudXRpbHMuc3ZnKGlvcy5hc3NldHMuZW1vamkpXG4gICAgcmV0dXJuIGtleVxuXG4gIFJldHVybiA9IChvYmopIC0+XG4gICAga2V5ID0gbmV3IFNwZWNpYWxLZXkgb2JqXG4gICAga2V5LmJhY2tncm91bmRDb2xvciA9IGNvbG9ycy5yZXR1cm5CR1xuICAgIGtleS5odG1sID0gc2V0dXAucmV0dXJuVGV4dFxuICAgIGtleS5zdHlsZS5saW5lSGVpZ2h0ID0gaW9zLnB4KHNwZWNzLnNwZWNpYWxLZXlIZWlnaHQpICsgXCJweFwiXG4gICAga2V5LmNvbG9yID0gaW9zLnV0aWxzLmF1dG9Db2xvcihjb2xvcnMucmV0dXJuQkcpXG4gICAga2V5LmRvd24gPSAtPlxuICAgICAgbm90aGluZ0hhcHBlbnMgPSB0cnVlXG5cbiAgICBrZXkudXAgPSAtPlxuICAgICAgYm9hcmQuZGlzbWlzcygpXG4gICAgICBpZiBib2FyZC50YXJnZXRcbiAgICAgICAgaWYgYm9hcmQudGFyZ2V0LnBhcmVudFxuICAgICAgICAgIGJvYXJkLnRhcmdldC5wYXJlbnQuYWN0aXZlID0gZmFsc2VcbiAgICBrZXkub24gRXZlbnRzLlRvdWNoRW5kLCAtPiBrZXkuZG93bigpXG4gICAga2V5Lm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAtPiBrZXkudXAoKVxuICAgIHJldHVybiBrZXlcblxuICBEaXNtaXNzID0gKG9iaikgLT5cbiAgICBrZXkgPSBuZXcgU3BlY2lhbEtleSBvYmpcbiAgICBrZXkuaWNvbiA9IG5ldyBJY29uXG4gICAgICBzdXBlckxheWVyOmtleVxuICAgICAgaWNvbjppb3MudXRpbHMuc3ZnKGlvcy5hc3NldHMua2V5Ym9hcmQpXG4gICAga2V5Lmljb24uc2NhbGUgPSAuOFxuICAgIGtleS5pY29uLmNvbnN0cmFpbnRzID1cbiAgICAgIGJvdHRvbToxMlxuICAgICAgdHJhaWxpbmc6MTJcbiAgICBpb3MubGF5b3V0LnNldChrZXkuaWNvbilcblxuICAgIGtleS5kb3duID0gLT4gYm9hcmQuZGlzbWlzcygpXG4gICAga2V5LnVwID0gLT4gbm90aGluZ0hhcHBlbnMgPSBmYWxzZVxuICAgIGtleS5vbiBFdmVudHMuVG91Y2hFbmQsIC0+IGtleS5kb3duKClcbiAgICByZXR1cm4ga2V5XG5cbiAgVGFiID0gKG9iaikgLT5cbiAgICBrZXkgPSBuZXcgU3BlY2lhbEtleSBvYmpcbiAgICBrZXkuaHRtbCA9ICd0YWInXG4gICAga2V5LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoNzApICsgJ3B4J1xuICAgIGtleS5zdHlsZS50ZXh0QWxpZ24gPSAnbGVmdCdcbiAgICBrZXkuc3R5bGUucGFkZGluZ0xlZnQgPSBpb3MucHgoMTIpICsgJ3B4J1xuICAgIHJldHVybiBrZXlcblxuICBib2FyZC5zd2l0Y2hMZXR0ZXJzID0gLT5cbiAgICByb3cxQnJlYWsgPSAxMFxuICAgIHJvdzJCcmVhayA9IDE5XG4gICAgaWYgaW9zLmlzUGFkKClcbiAgICAgIGxldHRlcnMucHVzaCAnISdcbiAgICAgIGxldHRlcnMucHVzaCAnPydcbiAgICBpZiBpb3MuZGV2aWNlLm5hbWUgPT0gXCJpcGFkLXByb1wiXG4gICAgICBsZXR0ZXJzID0gW1wicVwiLCBcIndcIiwgXCJlXCIsIFwiclwiLCBcInRcIiwgXCJ5XCIsIFwidVwiLCBcImlcIiwgXCJvXCIsIFwicFwiLCBcIntcIiwgXCJ9XCIsIFwiXFx8XCIsIFwiYVwiLCBcInNcIiwgXCJkXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwialwiLCBcImtcIiwgXCJsXCIsIFwiOlwiLCBcIiZyZHF1bztcIiwgXCJ6XCIsIFwieFwiLCBcImNcIiwgXCJ2XCIsICBcImJcIiwgXCJuXCIsIFwibVwiLCBcIjxcIiwgXCI+XCIsIFwiP1wiXVxuICAgICAgdG9wTGV0dGVycyA9IFtcIn5cIiwgXCIhXCIsIFwiQFwiLCBcIiNcIiwgXCIkXCIsIFwiJVwiLCBcIl5cIiwgXCImXCIsIFwiKlwiLCBcIihcIiwgXCIpXCIsIFwiX1wiLCBcIitcIl1cbiAgICAgIHJvdzFCcmVhayA9IDEzXG4gICAgICByb3cyQnJlYWsgPSAyNFxuICAgIGZvciBsLCBpIGluIGxldHRlcnNcbiAgICAgIGtleSA9IG5ldyBMZXR0ZXJcbiAgICAgICAgbmFtZTpsXG4gICAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICAgIGhlaWdodDpzcGVjcy5sZXR0ZXJLZXkuaGVpZ2h0XG4gICAgICAgICAgd2lkdGg6c3BlY3MubGV0dGVyS2V5LndpZHRoXG4gICAgICAgIGxldHRlcjpsXG4gICAgICBpZiBsID09ICd3JyB8fCBsID09ICdyJyB8fCBsID09ICd5JyB8fCBsID09ICdpJyB8fCBsID09ICdwJ1xuICAgICAgICBrZXkuY29uc3RyYWludHMud2lkdGggPSBrZXkuY29uc3RyYWludHMud2lkdGggKyAxXG4gICAgICBib2FyZC5rZXlzW2xdID0ga2V5XG4gICAgICBib2FyZC5rZXlzQXJyYXkucHVzaCBrZXlcbiAgICAgIGlmIGkgPT0gMFxuICAgICAgICBrZXkuY29uc3RyYWludHMubGVhZGluZyA9IHNwZWNzLnJvdzEubGVhZGluZ1xuICAgICAgICBrZXkuY29uc3RyYWludHMudG9wID0gc3BlY3Mucm93MS50b3BcbiAgICAgIGlmIGkgPiAwICYmIGkgPCByb3cxQnJlYWtcbiAgICAgICAga2V5LmNvbnN0cmFpbnRzLmxlYWRpbmcgPSBbYm9hcmQua2V5c0FycmF5W2kgLSAxXSwgc3BlY3Muc3BhY2VdXG4gICAgICAgIGtleS5jb25zdHJhaW50cy50b3AgPSBzcGVjcy5yb3cxLnRvcFxuICAgICAgaWYgaSA9PSByb3cxQnJlYWtcbiAgICAgICAga2V5LmNvbnN0cmFpbnRzLmxlYWRpbmcgPSBzcGVjcy5yb3cyLmxlYWRpbmdcbiAgICAgICAga2V5LmNvbnN0cmFpbnRzLnRvcCA9IFtib2FyZC5rZXlzQXJyYXlbMF0sIHNwZWNzLnJvdzIudG9wXVxuICAgICAgaWYgaSA+IHJvdzFCcmVhayAmJiBpIDwgcm93MkJyZWFrXG4gICAgICAgIGtleS5jb25zdHJhaW50cy5sZWFkaW5nID0gW2JvYXJkLmtleXNBcnJheVtpIC0gMV0sIHNwZWNzLnNwYWNlXVxuICAgICAgICBrZXkuY29uc3RyYWludHMudG9wID0gW2JvYXJkLmtleXNBcnJheVswXSwgc3BlY3Mucm93Mi50b3BdXG4gICAgICBpZiBpID09IHJvdzJCcmVha1xuICAgICAgICBrZXkuY29uc3RyYWludHMubGVhZGluZyA9IHNwZWNzLnJvdzMubGVhZGluZ1xuICAgICAgICBrZXkuY29uc3RyYWludHMudG9wID0gW2JvYXJkLmtleXNBcnJheVtyb3cxQnJlYWtdLCBzcGVjcy5yb3czLnRvcF1cbiAgICAgIGlmIGkgPiByb3cyQnJlYWtcbiAgICAgICAga2V5LmNvbnN0cmFpbnRzLmxlYWRpbmcgPSBbYm9hcmQua2V5c0FycmF5W2kgLSAxXSwgc3BlY3Muc3BhY2VdXG4gICAgICAgIGtleS5jb25zdHJhaW50cy50b3AgPSBbYm9hcmQua2V5c0FycmF5W3JvdzFCcmVha10sIHNwZWNzLnJvdzMudG9wXVxuICAgICAgaW9zLmxheW91dC5zZXQoa2V5KVxuXG4gICAgYm9hcmQua2V5cy5zaGlmdCA9IG5ldyBTaGlmdFxuICAgICAgbmFtZTpcInNoaWZ0XCJcbiAgICAgIHNoaWZ0OnNldHVwLnNoaWZ0XG4gICAgICBjb25zdHJhaW50czpcbiAgICAgICAgaGVpZ2h0OnNwZWNzLnNwZWNpYWxLZXlIZWlnaHRcbiAgICAgICAgd2lkdGg6c3BlY3Muc3BlY2lhbEtleVdpZHRoXG4gICAgICAgIGJvdHRvbUVkZ2VzOmJvYXJkLmtleXMuelxuXG4gICAgYm9hcmQua2V5cy5kZWxldGUgPSBuZXcgRGVsZXRlXG4gICAgICBuYW1lOlwiZGVsZXRlXCJcbiAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICBoZWlnaHQ6c3BlY3Muc3BlY2lhbEtleUhlaWdodFxuICAgICAgICB3aWR0aDpzcGVjcy5zcGVjaWFsS2V5V2lkdGhcbiAgICAgICAgYm90dG9tRWRnZXM6Ym9hcmQua2V5cy56XG4gICAgICAgIHRyYWlsaW5nOjBcblxuICAgIGJvYXJkLmtleXMubnVtYmVycyA9IG5ldyBOdW1iZXJzXG4gICAgICBuYW1lOlwibnVtYmVyc1wiXG4gICAgICBjb25zdHJhaW50czpcbiAgICAgICAgaGVpZ2h0OnNwZWNzLnNwZWNpYWxLZXlIZWlnaHRcbiAgICAgICAgd2lkdGg6c3BlY3Muc3BlY2lhbEtleVdpZHRoXG4gICAgICAgIGJvdHRvbTowXG4gICAgICAgIGxlYWRpbmc6MFxuXG4gICAgYm9hcmQua2V5cy5lbW9qaSA9IG5ldyBFbW9qaVxuICAgICAgbmFtZTpcImVtb2ppXCJcbiAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICBoZWlnaHQ6c3BlY3Muc3BlY2lhbEtleUhlaWdodFxuICAgICAgICB3aWR0aDpzcGVjcy5zcGVjaWFsS2V5V2lkdGhcbiAgICAgICAgbGVhZGluZzpbYm9hcmQua2V5cy5udW1iZXJzLCBzcGVjcy5zcGFjZV1cbiAgICAgICAgYm90dG9tOjBcblxuICAgIGJvYXJkLmtleXMucmV0dXJuID0gbmV3IFJldHVyblxuICAgICAgbmFtZTpcInJldHVyblwiXG4gICAgICBjb25zdHJhaW50czpcbiAgICAgICAgYm90dG9tOjBcbiAgICAgICAgdHJhaWxpbmc6MFxuICAgICAgICB3aWR0aDpzcGVjcy5yZXR1cm5XaWR0aFxuICAgICAgICBoZWlnaHQ6c3BlY3Muc3BlY2lhbEtleUhlaWdodFxuXG4gICAgYm9hcmQua2V5cy5zcGFjZSA9IG5ldyBTcGFjZVxuICAgICAgbmFtZTpcInNwYWNlXCJcbiAgICAgIGxldHRlcjpcInNwYWNlXCJcbiAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICBsZWFkaW5nOltib2FyZC5rZXlzLmVtb2ppLCBzcGVjcy5zcGFjZV1cbiAgICAgICAgdHJhaWxpbmc6W2JvYXJkLmtleXMucmV0dXJuLCBzcGVjcy5zcGFjZV1cbiAgICAgICAgYm90dG9tOjBcbiAgICAgICAgaGVpZ2h0OnNwZWNzLnNwZWNpYWxLZXlIZWlnaHRcblxuXG4gICAgaWYgaW9zLmlzUGFkKClcbiAgICAgIGJvYXJkLmtleXMucmV0dXJuLmNvbnN0cmFpbnRzLmJvdHRvbSA9IHVuZGVmaW5lZFxuICAgICAgYm9hcmQua2V5cy5yZXR1cm4uY29uc3RyYWludHMuYm90dG9tRWRnZXMgPSBib2FyZC5rZXlzQXJyYXlbcm93MUJyZWFrXVxuICAgICAgYm9hcmQua2V5cy5kZWxldGUuY29uc3RyYWludHMudG9wID0gMFxuICAgICAgYm9hcmQua2V5cy5kZWxldGUuY29uc3RyYWludHMuYm90dG9tRWRnZXMgPSB1bmRlZmluZWRcbiAgICAgIGJvYXJkLmtleXMuZGVsZXRlLmNvbnN0cmFpbnRzLndpZHRoID0gNjFcblxuICAgICAgYm9hcmQua2V5cy5zaGlmdGFsdCA9IG5ldyBTaGlmdFxuICAgICAgICBuYW1lOlwic2hpZnRhbHRcIlxuICAgICAgICBzaGlmdDpzZXR1cC5zaGlmdFxuICAgICAgICBjb25zdHJhaW50czpcbiAgICAgICAgICBoZWlnaHQ6c3BlY3Muc3BlY2lhbEtleUhlaWdodFxuICAgICAgICAgIHdpZHRoOjc2XG4gICAgICAgICAgYm90dG9tRWRnZXM6Ym9hcmQua2V5cy56XG4gICAgICAgICAgdHJhaWxpbmc6MFxuXG4gICAgICBib2FyZC5rZXlzLmRpc21pc3MgPSBuZXcgRGlzbWlzc1xuICAgICAgICBuYW1lOlwiZGlzbWlzc1wiXG4gICAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICAgIGhlaWdodDpzcGVjcy5zcGVjaWFsS2V5SGVpZ2h0XG4gICAgICAgICAgd2lkdGg6c3BlY3Muc3BlY2lhbEtleVdpZHRoXG4gICAgICAgICAgYm90dG9tOjBcbiAgICAgICAgICB0cmFpbGluZzowXG5cbiAgICAgIGJvYXJkLmtleXMubnVtYmVyc2FsdCA9IG5ldyBOdW1iZXJzXG4gICAgICAgIG5hbWU6XCJudW1iZXJzYWx0XCJcbiAgICAgICAgY29uc3RyYWludHM6XG4gICAgICAgICAgaGVpZ2h0OnNwZWNzLnNwZWNpYWxLZXlIZWlnaHRcbiAgICAgICAgICB3aWR0aDo5M1xuICAgICAgICAgIGJvdHRvbTowXG4gICAgICAgICAgdHJhaWxpbmc6W2JvYXJkLmtleXMuZGlzbWlzcywgc3BlY3Muc3BhY2VdXG5cbiAgICAgIGJvYXJkLmtleXMuc3BhY2UuaHRtbCA9IFwiXCJcbiAgICAgIGJvYXJkLmtleXMuc3BhY2UuY29uc3RyYWludHMudHJhaWxpbmcgPSBbYm9hcmQua2V5cy5udW1iZXJzYWx0LCBzcGVjcy5zcGFjZV1cblxuICAgICAgaW9zLmxheW91dC5zZXQoKVxuICAgIGJvYXJkLnRvcFJvdyA9IFtdXG4gICAgaWYgaW9zLmRldmljZS5uYW1lID09ICdpcGFkLXBybydcbiAgICAgIGZvciBsLGkgaW4gdG9wTGV0dGVyc1xuICAgICAgICAgIHRvcEtleSA9IG5ldyBMZXR0ZXJcbiAgICAgICAgICAgIGxldHRlcjpsXG4gICAgICAgICAgICBuYW1lOmxcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICAgICAgICBoZWlnaHQ6NDZcbiAgICAgICAgICAgICAgd2lkdGg6NjNcbiAgICAgICAgICAgICAgdG9wOjBcbiAgICAgICAgICBpZiBpID09IDBcbiAgICAgICAgICAgIHRvcEtleS5jb25zdHJhaW50cy5sZWFkaW5nID0gMFxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRvcEtleS5jb25zdHJhaW50cy5sZWFkaW5nID0gW2JvYXJkLnRvcFJvd1tpIC0gMV0sIHNwZWNzLnNwYWNlXVxuICAgICAgICAgIHRvcEtleS5zdHlsZS5saW5lSGVpZ2h0ID0gaW9zLnB4KDQ2KSArICdweCdcbiAgICAgICAgICBpb3MubGF5b3V0LnNldCh0b3BLZXkpXG4gICAgICAgICAgYm9hcmQudG9wUm93LnB1c2ggdG9wS2V5XG4gICAgICAgICAgYm9hcmQua2V5c0FycmF5LnB1c2ggdG9wS2V5XG4gICAgICAgICAgYm9hcmQua2V5c1tsXSA9IHRvcEtleVxuXG4gICAgICBib2FyZC5rZXlzLmRlbGV0ZS5pY29uLmRlc3Ryb3koKVxuICAgICAgYm9hcmQua2V5cy5kZWxldGUuaHRtbCA9ICdkZWxldGUnXG4gICAgICBib2FyZC5rZXlzLmRlbGV0ZS5zdHlsZS5saW5lSGVpZ2h0ID0gaW9zLnB4KDUzKSArICdweCdcbiAgICAgIGJvYXJkLmtleXMuZGVsZXRlLnN0eWxlLnRleHRBbGlnbiA9ICdyaWdodCdcbiAgICAgIGJvYXJkLmtleXMuZGVsZXRlLnN0eWxlLnBhZGRpbmdSaWdodCA9IGlvcy5weCgxMikgKyAncHgnXG4gICAgICBib2FyZC5rZXlzLmRlbGV0ZS5jb25zdHJhaW50cyA9XG4gICAgICAgIHRvcDowXG4gICAgICAgIHRyYWlsaW5nOjBcbiAgICAgICAgaGVpZ2h0OjQ2XG4gICAgICAgIHdpZHRoOjEwNlxuXG4gICAgICBib2FyZC5rZXlzLnNoaWZ0Lmljb24uZGVzdHJveSgpXG4gICAgICBib2FyZC5rZXlzLnNoaWZ0Lmh0bWwgPSAnc2hpZnQnXG4gICAgICBib2FyZC5rZXlzLnNoaWZ0LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoNzApICsgJ3B4J1xuICAgICAgYm9hcmQua2V5cy5zaGlmdC5zdHlsZS50ZXh0QWxpZ24gPSAnbGVmdCdcbiAgICAgIGJvYXJkLmtleXMuc2hpZnQuc3R5bGUucGFkZGluZ0xlZnQgPSBpb3MucHgoMTIpICsgJ3B4J1xuICAgICAgYm9hcmQua2V5cy5zaGlmdC5jb25zdHJhaW50cy53aWR0aCA9IDE1NFxuXG4gICAgICBib2FyZC5rZXlzLnNoaWZ0YWx0Lmljb24uZGVzdHJveSgpXG4gICAgICBib2FyZC5rZXlzLnNoaWZ0YWx0Lmh0bWwgPSAnc2hpZnQnXG4gICAgICBib2FyZC5rZXlzLnNoaWZ0YWx0LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoNzApICsgJ3B4J1xuICAgICAgYm9hcmQua2V5cy5zaGlmdGFsdC5zdHlsZS50ZXh0QWxpZ24gPSAncmlnaHQnXG4gICAgICBib2FyZC5rZXlzLnNoaWZ0YWx0LnN0eWxlLnBhZGRpbmdSaWdodCA9IGlvcy5weCgxMikgKyAncHgnXG4gICAgICBib2FyZC5rZXlzLnNoaWZ0YWx0LmNvbnN0cmFpbnRzLndpZHRoID0gMTU1XG5cbiAgICAgIGJvYXJkLmtleXMuZW1vamkuaWNvbi5jb25zdHJhaW50cyA9IHtsZWFkaW5nOjE1LCBib3R0b206MTF9XG4gICAgICBib2FyZC5rZXlzLmVtb2ppLmNvbnN0cmFpbnRzID1cbiAgICAgICAgd2lkdGg6MTQ0XG4gICAgICAgIGhlaWdodDo2MVxuICAgICAgICBsZWFkaW5nOjBcbiAgICAgICAgYm90dG9tOjBcbiAgICAgIGlvcy5sYXlvdXQuc2V0KClcblxuICAgICAgYm9hcmQua2V5cy5udW1iZXJzYWx0LmNvbnN0cmFpbnRzLndpZHRoID0gOTNcbiAgICAgIGJvYXJkLmtleXMuZGlzbWlzcy5jb25zdHJhaW50cy53aWR0aCA9IDkzXG5cbiAgICAgIGJvYXJkLmtleXMuY29tID0gbmV3IExldHRlclxuICAgICAgICBuYW1lOicuY29tJ1xuICAgICAgICBsZXR0ZXI6Jy5jb20nXG4gICAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICAgIGhlaWdodDpzcGVjcy5sZXR0ZXJLZXkuaGVpZ2h0XG4gICAgICAgICAgd2lkdGg6c3BlY3MubGV0dGVyS2V5LndpZHRoXG4gICAgICAgICAgYm90dG9tOjBcbiAgICAgICAgICB0cmFpbGluZzpbYm9hcmQua2V5cy5udW1iZXJzYWx0LCBzcGVjcy5zcGFjZV1cblxuICAgICAgYm9hcmQua2V5cy5jb20uc3R5bGUuZm9udFNpemUgPSBpb3MucHgoMTYpICsgJ3B4J1xuXG4gICAgICBib2FyZC5rZXlzLm51bWJlcnMuY29uc3RyYWludHMgPVxuICAgICAgICB3aWR0aDoxNDNcbiAgICAgICAgaGVpZ2h0OjYxXG4gICAgICAgIGxlYWRpbmc6W2JvYXJkLmtleXMuZW1vamksIHNwZWNzLnNwYWNlXVxuICAgICAgYm9hcmQua2V5cy5udW1iZXJzLnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoNzApICsgJ3B4J1xuICAgICAgYm9hcmQua2V5cy5udW1iZXJzLnN0eWxlLnRleHRBbGlnbiA9ICdsZWZ0J1xuICAgICAgYm9hcmQua2V5cy5udW1iZXJzLnN0eWxlLnBhZGRpbmdMZWZ0ID0gaW9zLnB4KDEyKSArICdweCdcblxuXG4gICAgICBib2FyZC5rZXlzLnJldHVybi5zdHlsZS5saW5lSGVpZ2h0ID0gaW9zLnB4KDcwKSArICdweCdcbiAgICAgIGJvYXJkLmtleXMucmV0dXJuLnN0eWxlLnRleHRBbGlnbiA9ICdyaWdodCdcbiAgICAgIGJvYXJkLmtleXMucmV0dXJuLnN0eWxlLnBhZGRpbmdSaWdodCA9IGlvcy5weCgxMikgKyAncHgnXG5cblxuICAgICAgYm9hcmQua2V5cy5zcGFjZS5jb25zdHJhaW50cy5sZWFkaW5nID0gW2JvYXJkLmtleXMubnVtYmVycywgc3BlY3Muc3BhY2VdXG4gICAgICBib2FyZC5rZXlzLnNwYWNlLmNvbnN0cmFpbnRzLnRyYWlsaW5nID0gW2JvYXJkLmtleXMuY29tLCBzcGVjcy5zcGFjZV1cblxuXG4gICAgICBib2FyZC5rZXlzLmNhcHMgPSBuZXcgU2hpZnRcbiAgICAgICAgbmFtZTonY2FwcydcbiAgICAgICAgY2FwczogdHJ1ZVxuICAgICAgICBjb25zdHJhaW50czpcbiAgICAgICAgICBoZWlnaHQ6c3BlY3Muc3BlY2lhbEtleUhlaWdodFxuICAgICAgICAgIHdpZHRoOjExOVxuICAgICAgICAgIGJvdHRvbUVkZ2VzOmJvYXJkLmtleXNBcnJheVtyb3cxQnJlYWtdXG4gICAgICBib2FyZC5rZXlzLmNhcHMuaWNvbi5kZXN0cm95KClcbiAgICAgIGJvYXJkLmtleXMuY2Fwcy5odG1sID0gJ2NhcHMgbG9jaydcbiAgICAgIGJvYXJkLmtleXMuY2Fwcy5zdHlsZS5saW5lSGVpZ2h0ID0gaW9zLnB4KDcwKSArICdweCdcbiAgICAgIGJvYXJkLmtleXMuY2Fwcy5zdHlsZS50ZXh0QWxpZ24gPSAnbGVmdCdcbiAgICAgIGJvYXJkLmtleXMuY2Fwcy5zdHlsZS5wYWRkaW5nTGVmdCA9IGlvcy5weCgxMikgKyAncHgnXG5cblxuXG4gICAgICBib2FyZC5rZXlzLmNhcHMuZG93biA9IC0+XG4gICAgICAgIGlmIGJvYXJkLmlzQ2Fwc0xvY2tcbiAgICAgICAgICBib2FyZC5pc0NhcHNMb2NrID0gZmFsc2VcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGJvYXJkLmNhcHNMb2NrKClcbiAgICAgIGJvYXJkLmtleXMuY2Fwcy5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG4gICAgICAgIGJvYXJkLmtleXMuY2Fwcy5kb3duKClcbiAgICAgIGJvYXJkLmtleXMuY2Fwcy51cCA9IC0+XG4gICAgICAgIG5vdGhpbmdIYXBwZW5zID0gdHJ1ZVxuXG4gICAgICBib2FyZC5rZXlzLnRhYiA9IG5ldyBUYWJcbiAgICAgICAgbmFtZTondGFiJ1xuICAgICAgICBjb25zdHJhaW50czpcbiAgICAgICAgICBoZWlnaHQ6c3BlY3Muc3BlY2lhbEtleUhlaWdodFxuICAgICAgICAgIHdpZHRoOjEwNlxuICAgICAgICAgIGJvdHRvbUVkZ2VzOmJvYXJkLmtleXNBcnJheVswXVxuXG4gICAgICBpb3MubGF5b3V0LnNldCgpXG4gIGlmIGlvcy5pc1Bob25lKClcbiAgICBwb3BVcCA9IGlvcy51dGlscy5zdmcoaW9zLmFzc2V0cy5rZXlQb3BVcFtzZXR1cC5zdHlsZV1baW9zLmRldmljZS5uYW1lXSlcbiAgICBib2FyZC5wb3BVcCA9IG5ldyBMYXllclxuICAgICAgaGVpZ2h0OnBvcFVwLmhlaWdodFxuICAgICAgd2lkdGg6cG9wVXAud2lkdGhcbiAgICAgIGJhY2tncm91bmRDb2xvcjondHJhbnNwYXJlbnQnXG4gICAgICBuYW1lOicucG9wVXAnXG4gICAgICBzdXBlckxheWVyOmJvYXJkLmFyZWFcbiAgICAgIHZpc2libGU6ZmFsc2VcblxuICAgIGJvYXJkLnBvcFVwLnN2ZyA9IG5ldyBMYXllclxuICAgICAgaHRtbDpwb3BVcC5zdmdcbiAgICAgIGhlaWdodDpwb3BVcC5oZWlnaHRcbiAgICAgIHdpZHRoOnBvcFVwLndpZHRoXG4gICAgICBzdXBlckxheWVyOmJvYXJkLnBvcFVwXG4gICAgICBuYW1lOicuc3ZnJ1xuICAgICAgYmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCdcblxuICAgIGJvYXJkLnBvcFVwLnRleHQgPSBuZXcgaW9zLlRleHRcbiAgICAgIHRleHQ6J0EnXG4gICAgICBzdXBlckxheWVyOmJvYXJkLnBvcFVwXG4gICAgICBmb250U2l6ZTpzcGVjcy5wb3BVcENoYXJcbiAgICAgIGZvbnRXZWlnaHQ6MzAwXG4gICAgICBjb2xvcjpjb2xvcnMuY29sb3JcbiAgICAgIHRleHRBbGlnbjonY2VudGVyJ1xuICAgICAgY29uc3RyYWludHM6XG4gICAgICAgIGFsaWduOidob3Jpem9udGFsJ1xuICAgICAgICB0b3A6c3BlY3MucG9wVXBUb3BcbiAgICAgICAgd2lkdGg6aW9zLnB0KHBvcFVwLndpZHRoKVxuXG4gICAgYm9hcmQucG9wVXAuY2VudGVyKClcbiAgICBzd2l0Y2ggaW9zLmRldmljZS5uYW1lXG4gICAgICB3aGVuICdpcGhvbmUtNnMtcGx1cydcbiAgICAgICAgYm9hcmQucG9wVXAud2lkdGggPSBib2FyZC5wb3BVcC53aWR0aCAtIDE4XG4gICAgICAgIGJvYXJkLnBvcFVwLmhlaWdodCA9IGJvYXJkLnBvcFVwLmhlaWdodCAtIDI0XG4gICAgICAgIGJvYXJkLnBvcFVwLnN2Zy54ID0gaW9zLnB4KC0zKVxuICAgICAgICBib2FyZC5wb3BVcC5zdmcueSA9IGlvcy5weCgtMylcbiAgICAgIHdoZW4gJ2lwaG9uZS02cydcbiAgICAgICAgYm9hcmQucG9wVXAud2lkdGggPSBib2FyZC5wb3BVcC53aWR0aCAtIDEyXG4gICAgICAgIGJvYXJkLnBvcFVwLmhlaWdodCA9IGJvYXJkLnBvcFVwLmhlaWdodCAtIDEyXG4gICAgICAgIGJvYXJkLnBvcFVwLnN2Zy54ID0gaW9zLnB4KC0zKVxuICAgICAgICBib2FyZC5wb3BVcC5zdmcueSA9IGlvcy5weCgtMilcbiAgICAgIHdoZW4gJ2lwaG9uZS01J1xuICAgICAgICBib2FyZC5wb3BVcC53aWR0aCA9IGJvYXJkLnBvcFVwLndpZHRoIC0gMTJcbiAgICAgICAgYm9hcmQucG9wVXAuaGVpZ2h0ID0gYm9hcmQucG9wVXAuaGVpZ2h0IC0gMTJcbiAgICAgICAgYm9hcmQucG9wVXAuc3ZnLnggPSBpb3MucHgoLTMpXG4gICAgICAgIGJvYXJkLnBvcFVwLnN2Zy55ID0gaW9zLnB4KC0yKVxuXG4gICAgY2FwaXRhbGl6ZUtleXMoKVxuICBib2FyZC5zd2l0Y2ggPSAoc3RhdGUpIC0+XG4gICAgc3dpdGNoIHN0YXRlXG4gICAgICB3aGVuIFwibGV0dGVyc1wiXG4gICAgICAgIGJvYXJkLnN3aXRjaExldHRlcnMoKVxuXG4gIGJvYXJkLnN3aXRjaChcImxldHRlcnNcIilcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICdrZXlkb3duJywgKGUpIC0+XG4gICAgaWYgYXJyYXlPZkNvZGVzLmluZGV4T2YoZS5rZXlDb2RlLnRvU3RyaW5nKCkpICE9IC0xXG4gICAgICBrZXkgPSBib2FyZC5rZXlzW2NvZGVNYXBbZS5rZXlDb2RlXS50b0xvd2VyQ2FzZSgpXVxuICAgICAgaWYga2V5IHRoZW4ga2V5LmRvd24oKVxuICAgICAgaWYgaW9zLmlzUGFkKClcbiAgICAgICAgaWYga2V5ID09IGJvYXJkLmtleXMuc2hpZnQgfHwga2V5ID09IGJvYXJkLmtleXMuc2hpZnRhbHRcbiAgICAgICAgICBib2FyZC5rZXlzLnNoaWZ0LmRvd24oKVxuICAgICAgICAgIGJvYXJkLmtleXMuc2hpZnRhbHQuaWNvbi50b2dnbGUoJ29uJylcbiAgICAgICAgICBoYW5kbGVLZXlDb2xvcihib2FyZC5rZXlzLnNoaWZ0YWx0KVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICdrZXl1cCcsIChlKSAtPlxuICAgIGlmIGFycmF5T2ZDb2Rlcy5pbmRleE9mKGUua2V5Q29kZS50b1N0cmluZygpKSAhPSAtMVxuICAgICAga2V5ID0gYm9hcmQua2V5c1tjb2RlTWFwW2Uua2V5Q29kZV0udG9Mb3dlckNhc2UoKV1cbiAgICAgIGlmIGtleSB0aGVuIGtleS51cCgpXG4gICAgICBpZiBpb3MuaXNQYWQoKVxuICAgICAgICBpZiBrZXkgPT0gYm9hcmQua2V5cy5zaGlmdCB8fCBrZXkgPT0gYm9hcmQua2V5cy5zaGlmdGFsdFxuICAgICAgICAgIGJvYXJkLmtleXMuc2hpZnQudXAoKVxuICAgICAgICAgIGJvYXJkLmtleXMuc2hpZnRhbHQuaWNvbi50b2dnbGUoJ29mZicpXG4gICAgICAgICAgaGFuZGxlS2V5Q29sb3IoYm9hcmQua2V5cy5zaGlmdGFsdClcbiAgY2FwaXRhbGl6ZUtleXMoKVxuICByZXR1cm4gYm9hcmRcbiIsImlvcyA9IHJlcXVpcmUgJ2lvcy1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPVxuXHRuYW1lOidmaWVsZCdcblx0YWN0aXZlOmZhbHNlXG5cdGtleWJvYXJkOnRydWVcblx0cGxhY2Vob2xkZXI6XCJFbnRlciB0ZXh0XCJcblx0cGxhY2Vob2xkZXJDb2xvcjpcIiM5OTlcIlxuXHRzdXBlckxheWVyOnVuZGVmaW5lZFxuXHRiYWNrZ3JvdW5kQ29sb3I6XCJ3aGl0ZVwiXG5cdGJvcmRlckNvbG9yOlwiI0NDQ0NDQ1wiXG5cdGJvcmRlclJhZGl1czppb3MucHgoNSlcblx0Ym9yZGVyV2lkdGg6aW9zLnB4KDEpXG5cdGhlaWdodDppb3MucHgoMzApXG5cdHdpZHRoOmlvcy5weCg5Nylcblx0Zm9udFNpemU6MTdcblx0Y29sb3I6J2JsYWNrJ1xuXHR0ZXh0Q29uc3RyYWludHM6XG5cdFx0bGVhZGluZzo0XG5cdFx0YWxpZ246XCJ2ZXJ0aWNhbFwiXG5cdGNvbnN0cmFpbnRzOlxuXHRcdGhlaWdodDozMFxuXHRcdHdpZHRoOjk3XG5cdFx0YWxpZ246XCJjZW50ZXJcIlxuXG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSBpb3MudXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cblx0ZmllbGQgPSBuZXcgaW9zLlZpZXdcblx0XHRuYW1lOnNldHVwLm5hbWVcblx0XHRjb25zdHJhaW50czpzZXR1cC5jb25zdHJhaW50c1xuXHRcdGJhY2tncm91bmRDb2xvcjpzZXR1cC5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRib3JkZXJDb2xvcjpzZXR1cC5ib3JkZXJDb2xvclxuXHRcdGJvcmRlclJhZGl1czpzZXR1cC5ib3JkZXJSYWRpdXNcblx0XHRib3JkZXJXaWR0aDpzZXR1cC5ib3JkZXJXaWR0aFxuXHRcdGhlaWdodDpzZXR1cC5oZWlnaHRcblx0XHR3aWR0aDpzZXR1cC53aWR0aFxuXHRcdGNsaXA6dHJ1ZVxuXHRcdHN1cGVyTGF5ZXI6c2V0dXAuc3VwZXJMYXllclxuXG5cdGZpZWxkLnRleHQgPSBuZXcgaW9zLlRleHRcblx0XHRzdXBlckxheWVyOmZpZWxkXG5cdFx0bmFtZTpcIi50ZXh0XCJcblx0XHRjb25zdHJhaW50czpzZXR1cC50ZXh0Q29uc3RyYWludHNcblx0XHR0ZXh0OicnXG5cdFx0Zm9udFNpemU6MTdcblx0XHRjb2xvcjpzZXR1cC5jb2xvclxuXG5cdGZpZWxkLnRleHQucGxhY2Vob2xkZXIgPSBuZXcgaW9zLlRleHRcblx0XHRzdXBlckxheWVyOmZpZWxkXG5cdFx0bmFtZTpcIi5wbGFjZWhvbGRlclwiXG5cdFx0Y29uc3RyYWludHM6c2V0dXAudGV4dENvbnN0cmFpbnRzXG5cdFx0dGV4dDpzZXR1cC5wbGFjZWhvbGRlclxuXHRcdGZvbnRTaXplOjE3XG5cdFx0Y29sb3I6c2V0dXAucGxhY2Vob2xkZXJDb2xvclxuXG5cdGZpZWxkLmFjdGl2ZSA9IHNldHVwLmFjdGl2ZVxuXHRmaWVsZC50eXBlID0gJ2ZpZWxkJ1xuXG5cdGZpZWxkLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblxuXHRcdGlmIGZpZWxkLmFjdGl2ZSAhPSB0cnVlXG5cdFx0XHRmaWVsZC5hY3RpdmUgPSB0cnVlXG5cblx0XHRcdGlmIHNldHVwLmtleWJvYXJkID09IHRydWUgJiYgZmllbGQua2V5Ym9hcmQgPT0gdW5kZWZpbmVkXG5cdFx0XHRcdGZpZWxkLmtleWJvYXJkID0gbmV3IGlvcy5LZXlib2FyZFxuXHRcdFx0XHRcdG91dHB1dDpmaWVsZC50ZXh0XG5cdFx0XHRcdFx0aGlkZGVuOnRydWVcblxuXHRcdFx0aWYgdHlwZW9mIHNldHVwLmtleWJvYXJkID09ICdvYmplY3QnXG5cdFx0XHRcdGZpZWxkLmlucHV0KHNldHVwLmtleWJvYXJkKVxuXHRcdFx0XHRmaWVsZC5rZXlib2FyZCA9IHNldHVwLmtleWJvYXJkXG5cblx0XHRcdGZpZWxkLmtleWJvYXJkLmNhbGwoKVxuXHRcdFx0ZmllbGQudGV4dC5jdXJzb3IgPSBuZXcgaW9zLlZpZXdcblx0XHRcdFx0c3VwZXJMYXllcjpmaWVsZFxuXHRcdFx0XHRuYW1lOlwiY3Vyc29yXCJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOmlvcy5jb2xvcihcImJsdWVcIilcblx0XHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdFx0d2lkdGg6MlxuXHRcdFx0XHRcdGhlaWdodDpzZXR1cC5mb250U2l6ZSArIDZcblx0XHRcdFx0XHRsZWFkaW5nOjRcblx0XHRcdFx0XHRhbGlnbjpcInZlcnRpY2FsXCJcblxuXHRcdFx0aWYgZmllbGQudGV4dC5odG1sICE9IHNldHVwLnBsYWNlaG9sZGVyXG5cdFx0XHRcdGZpZWxkLnRleHQuY3Vyc29yLmNvbnN0cmFpbnRzLmxlYWRpbmcgPSBmaWVsZC50ZXh0XG5cdFx0XHRcdGlvcy5sYXlvdXQuc2V0KGZpZWxkLnRleHQuY3Vyc29yKVxuXHRcdFx0ZmllbGQubGlzdGVuaW5nVG9GaWVsZCA9IFV0aWxzLmludGVydmFsIC4xLCAtPlxuXHRcdFx0XHRpZiBmaWVsZC5hY3RpdmUgPT0gZmFsc2Vcblx0XHRcdFx0XHRjbGVhckludGVydmFsKGZpZWxkLmludGVydmFsKVxuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoZmllbGQubGlzdGVuaW5nVG9GaWVsZClcblx0XHRcdFx0XHRmaWVsZC50ZXh0LmN1cnNvci5kZXN0cm95KClcblxuXG5cdFx0XHRmaWVsZC5pbnRlcnZhbCA9IFV0aWxzLmludGVydmFsIC42LCAtPlxuXHRcdFx0XHRpZiBmaWVsZC5hY3RpdmVcblx0XHRcdFx0XHRpZiBmaWVsZC50ZXh0LmN1cnNvci5vcGFjaXR5XG5cdFx0XHRcdFx0XHRmaWVsZC50ZXh0LmN1cnNvci5hbmltYXRlXG5cdFx0XHRcdFx0XHRcdHByb3BlcnRpZXM6KG9wYWNpdHk6MClcblx0XHRcdFx0XHRcdFx0dGltZTouNVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGZpZWxkLnRleHQuY3Vyc29yLmFuaW1hdGVcblx0XHRcdFx0XHRcdFx0cHJvcGVydGllczoob3BhY2l0eToxKVxuXHRcdFx0XHRcdFx0XHR0aW1lOi41XG5cblxuXHRcdFx0ZmllbGQudGV4dC5vbiBcImNoYW5nZTpodG1sXCIsIC0+XG5cdFx0XHRcdEAuY3Vyc29yLmNvbnN0cmFpbnRzLmxlYWRpbmcgPSBAXG5cdFx0XHRcdGlmIEAuaHRtbCA9PSAnJ1xuXHRcdFx0XHRcdEAucGxhY2Vob2xkZXIudmlzaWJsZSA9IHRydWVcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEAucGxhY2Vob2xkZXIudmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRcdGlmIEAuaHRtbC5pbmRleE9mKEAucGxhY2Vob2xkZXIpICE9IC0xXG5cdFx0XHRcdFx0QC5odG1sID0gQC5odG1sLnJlcGxhY2UoQC5wbGFjZWhvbGRlciwgJycpXG5cblx0XHRcdFx0aW9zLmxheW91dC5zZXQoQC5jdXJzb3IpXG5cblx0ZmllbGQuaW5wdXQgPSAoa2V5Ym9hcmQpIC0+XG5cdFx0a2V5Ym9hcmQub3V0cHV0KGZpZWxkKVxuXG5cdHJldHVybiBmaWVsZFxuIiwiaW9zID0gcmVxdWlyZSAnaW9zLWtpdCdcblxuZ2VuQ1NTID0gKGNzc0FycmF5KSAtPlxuICBjc3NPYmogPSB7fVxuICBmb3IgcHJvcCxpIGluIGNzc0FycmF5XG4gICAgY29sb25JbmRleCA9IHByb3AuaW5kZXhPZihcIjpcIilcbiAgICBrZXkgPSBwcm9wLnNsaWNlKDAsIGNvbG9uSW5kZXgpXG4gICAgdmFsdWUgPSBwcm9wLnNsaWNlKGNvbG9uSW5kZXggKyAyLCBwcm9wLmxlbmd0aCAtIDEpXG4gICAgY3NzT2JqW2tleV0gPSB2YWx1ZVxuICByZXR1cm4gY3NzT2JqXG5cbmV4cG9ydHMuY29udmVydCA9IChvYmopIC0+XG5cbiAgZ2V0RGVzaWduZWREZXZpY2UgPSAodykgLT5cbiAgICBkZXZpY2UgPSB7fVxuICAgIHN3aXRjaCB3XG4gICAgICB3aGVuIDMyMCwgNDgwLCA2NDAsIDk2MCwgMTI4MFxuICAgICAgICBkZXZpY2Uuc2NhbGUgPSAyXG4gICAgICAgIGRldmljZS5oZWlnaHQgPSA1NjhcbiAgICAgICAgZGV2aWNlLndpZHRoID0gMzIwXG4gICAgICAgIGRldmljZS5uYW1lID0gJ2lwaG9uZS01J1xuICAgICAgd2hlbiAzNzUsIDU2Mi41LCA3NTAsIDExMjUsIDE1MDBcbiAgICAgICAgZGV2aWNlLnNjYWxlID0gMlxuICAgICAgICBkZXZpY2UuaGVpZ2h0ID0gNjY3XG4gICAgICAgIGRldmljZS53aWR0aCA9IDM3NVxuICAgICAgICBkZXZpY2UubmFtZSA9ICdpcGhvbmUtNnMnXG4gICAgICB3aGVuIDQxNCwgNjIxLCA4MjgsIDEyNDIsIDE2NTZcbiAgICAgICAgZGV2aWNlLnNjYWxlID0gM1xuICAgICAgICBkZXZpY2UuaGVpZ2h0ID0gNzM2XG4gICAgICAgIGRldmljZS53aWR0aCA9IDQxNFxuICAgICAgICBkZXZpY2UubmFtZSA9ICdpcGhvbmUtNnMtcGx1cydcbiAgICAgIHdoZW4gNzY4LCAxMTUyLCAxNTM2LCAyMzA0LCAzMDcyXG4gICAgICAgIGRldmljZS5zY2FsZSA9IDJcbiAgICAgICAgZGV2aWNlLmhlaWdodCA9IDEwMjRcbiAgICAgICAgZGV2aWNlLndpZHRoID0gNzY4XG4gICAgICAgIGRldmljZS5uYW1lID0gJ2lwYWQnXG4gICAgICB3aGVuIDEwMjQsIDE1MzYsIDIwNDgsIDMwNzIsIDQwOTZcbiAgICAgICAgZGV2aWNlLnNjYWxlID0gMlxuICAgICAgICBkZXZpY2UuaGVpZ2h0ID0gMTM2NlxuICAgICAgICBkZXZpY2Uud2lkdGggPSAxMDI0XG4gICAgICAgIGRldmljZS5uYW1lID0gJ2lwYWQtcHJvJ1xuICAgIHN3aXRjaCB3XG4gICAgICB3aGVuIDMyMCwgMzc1LCA0MTQsIDc2OCwgMTAyNFxuICAgICAgICBkZXZpY2UuaVNjYWxlID0gMVxuICAgICAgd2hlbiA0ODAsIDU2Mi41LCA2MjEsIDExNTIsIDE1MzZcbiAgICAgICAgZGV2aWNlLmlTY2FsZSA9IDEuNVxuICAgICAgd2hlbiA2NDAsIDc1MCwgODI4LCAxNTM2LCAyMDQ4XG4gICAgICAgIGRldmljZS5pU2NhbGUgPSAyXG4gICAgICB3aGVuIDk2MCwgMTEyNSwgMTI0MiwgMjMwNCwgMzA3MlxuICAgICAgICBkZXZpY2UuaVNjYWxlID0gM1xuICAgICAgd2hlbiAxMjgwLCAxNTAwLCAxNjU2LCAzMDcyLCA0MDk2XG4gICAgICAgIGRldmljZS5pU2NhbGUgPSA0XG4gICAgZGV2aWNlLm9iaiA9ICdkZXZpY2UnXG4gICAgcmV0dXJuIGRldmljZVxuXG4gICMgR3JhYiBrZXlzXG4gIGxheWVyS2V5cyA9IE9iamVjdC5rZXlzKG9iailcblxuICAjIEFkZCBsYXllcnMgaW4gb2JqIHRvIGFycmF5IHVzaW5nIGtleXNcbiAgbGF5ZXJzID0gW11cbiAgYXJ0Ym9hcmRzID0gW11cbiAgbmV3TGF5ZXJzID0ge31cbiAgbmV3QXJ0Ym9hcmRzID0gW11cblxuICBmb3Iga2V5IGluIGxheWVyS2V5c1xuICAgIGlmIG9ialtrZXldLl9pbmZvLmtpbmQgPT0gJ2FydGJvYXJkJ1xuICAgICAgYXJ0Ym9hcmRzLnB1c2ggb2JqW2tleV1cblxuICBmb3IgYiBpbiBhcnRib2FyZHNcblxuICAgIGRldmljZSA9IGdldERlc2lnbmVkRGV2aWNlKGIud2lkdGgpXG5cbiAgICBBcnRib2FyZCA9IChhcnRib2FyZCkgLT5cbiAgICAgIGJvYXJkID0gbmV3IGlvcy5WaWV3XG4gICAgICAgIG5hbWU6YXJ0Ym9hcmQubmFtZVxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6Yi5iYWNrZ3JvdW5kQ29sb3JcbiAgICAgICAgY29uc3RyYWludHM6IHt0b3A6MCwgYm90dG9tOjAsIGxlYWRpbmc6MCwgdHJhaWxpbmc6MH1cbiAgICAgIHJldHVybiBib2FyZFxuXG4gICAgI0dldCBTdGF0ZW1lbnRzXG4gICAgZ2V0U3RyaW5nID0gKGwpIC0+IHJldHVybiBsLl9pbmZvLm1ldGFkYXRhLnN0cmluZ1xuICAgIGdldENTUyA9IChsKSAtPiByZXR1cm4gZ2VuQ1NTKGwuX2luZm8ubWV0YWRhdGEuY3NzKVxuICAgIGdldENvbG9yU3RyaW5nID0gKGwpIC0+IHJldHVybiAnLScgKyBnZXRDU1MobCkuY29sb3IgKyAnICcgKyBnZXRTdHJpbmcobClcbiAgICBnZXRJbWFnZSA9IChsKSAtPiByZXR1cm4gbC5pbWFnZVxuICAgIGdldExheWVyID0gKGwpIC0+IHJldHVybiBsLmNvcHkoKVxuXG5cbiAgICBmb3VuZCA9IChvLHQpIC0+IGlmIG8uaW5kZXhPZih0KSAhPSAtMSB0aGVuIHJldHVybiB0cnVlXG5cbiAgICBnZW5Db25zdHJhaW50cyA9IChsKSAtPlxuICAgICAgY29uc3RyYWludHMgPSB7fVxuICAgICAgcyA9IGRldmljZS5pU2NhbGVcbiAgICAgIGNYID0gZGV2aWNlLndpZHRoLzJcbiAgICAgIGNZID0gZGV2aWNlLmhlaWdodC8yXG4gICAgICB0WSA9IGRldmljZS5oZWlnaHQvNCAqIDNcbiAgICAgIGJZID0gZGV2aWNlLmhlaWdodC80ICogM1xuICAgICAgbFggPSBkZXZpY2Uud2lkdGgvNCAqIDNcbiAgICAgIHRYID0gZGV2aWNlLndpZHRoLzQgKiAzXG5cbiAgICAgIHIgPSAobikgLT4gcmV0dXJuIE1hdGgucm91bmQobilcbiAgICAgIGYgPSAobikgLT4gcmV0dXJuIE1hdGguZmxvb3IobilcblxuICAgICAgaWYgY1ggPT0gbC5taWRYL3MgfHwgcihjWCkgPT0gcihsLm1pZFgvcykgIHx8IGYoY1gpID09IGYobC5taWRYL3MpXG4gICAgICAgIGNvbnN0cmFpbnRzLmFsaWduID0gJ2hvcml6b250YWwnXG5cbiAgICAgIGlmIGNZID09IGwubWlkWS9zIHx8IHIoY1kpID09IHIobC5taWRZL3MpIHx8IGYoY1kpID09IGYobC5taWRZL3MpXG4gICAgICAgIGlmIGNvbnN0cmFpbnRzLmFsaWduID09ICdob3Jpem9udGFsJ1xuICAgICAgICAgIGNvbnN0cmFpbnRzLmFsaWduID0gJ2NlbnRlcidcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNvbnN0cmFpbnRzLmFsaWduID0gJ3ZlcnRpY2FsJ1xuXG4gICAgICBpZiBsLngvcyA8IGxYXG4gICAgICAgIGNvbnN0cmFpbnRzLmxlYWRpbmcgPSByKGwueC9zKVxuICAgICAgaWYgbC54L3MgPiB0WFxuICAgICAgICBjb25zdHJhaW50cy50cmFpbGluZyA9IHIobC5wYXJlbnQud2lkdGgvcyAtIGwubWF4WC9zKVxuXG4gICAgICBpZiBsLnkvcyA8IHRZXG4gICAgICAgIGNvbnN0cmFpbnRzLnRvcCA9IHIobC55L3MpXG4gICAgICBpZiBsLnkvcyA+IGJZXG4gICAgICAgIGNvbnN0cmFpbnRzLmJvdHRvbSA9IHIobC5wYXJlbnQuaGVpZ2h0L3MgLSBsLm1heFkvcylcblxuICAgICAgaWYgbC53aWR0aC9zID09IGRldmljZS53aWR0aFxuICAgICAgICBjb25zdHJhaW50cy5sZWFkaW5nID0gMFxuICAgICAgICBjb25zdHJhaW50cy50cmFpbGluZyA9IDBcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc3RyYWludHMud2lkdGggPSBsLndpZHRoL3NcblxuICAgICAgaWYgbC5oZWlnaHQvcyA9PSBkZXZpY2UuaGVpZ2h0XG4gICAgICAgIGNvbnN0cmFpbnRzLnRvcCA9IDBcbiAgICAgICAgY29uc3RyYWludHMuYm90dG9tID0gMFxuICAgICAgZWxzZVxuICAgICAgICBjb25zdHJhaW50cy5oZWlnaHQgPSBsLmhlaWdodC9zXG5cbiAgICAgIHJldHVybiBjb25zdHJhaW50c1xuXG4gICAgZ2VuTGF5ZXIgPSAobCwgcGFyZW50KSAtPlxuICAgICAgcHJvcHMgPVxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50J1xuICAgICAgICBuYW1lOmwubmFtZVxuICAgICAgICBpbWFnZTpsLmltYWdlXG4gICAgICAgIHN1cGVyTGF5ZXI6IHBhcmVudFxuICAgICAgICBjb25zdHJhaW50czogZ2VuQ29uc3RyYWludHMobClcblxuICAgICAgcmV0dXJuIG5ldyBpb3MuVmlldyBwcm9wc1xuXG4gICAgZ2VuQWxlcnQgPSAobCwgblApIC0+XG4gICAgICBwcm9wcyA9XG4gICAgICAgIGFjdGlvbnM6W11cbiAgICAgICAgc3VwZXJMYXllcjpuUFxuICAgICAgZm9yIGMgaW4gbC5jaGlsZHJlblxuICAgICAgICBuID0gYy5uYW1lXG4gICAgICAgIGlmIGZvdW5kKG4sICd0aXRsZScpIHRoZW4gcHJvcHMudGl0bGUgPSBnZXRTdHJpbmcoYylcbiAgICAgICAgaWYgZm91bmQobiwgJ21lc3NhZ2UnKSB0aGVuIHByb3BzLm1lc3NhZ2UgPSBnZXRTdHJpbmcoYylcbiAgICAgICAgaWYgZm91bmQobiwgJ2FjdGlvbicpIHRoZW4gcHJvcHMuYWN0aW9ucy51bnNoaWZ0IGdldENvbG9yU3RyaW5nKGMpXG4gICAgICAgIGMuZGVzdHJveSgpXG4gICAgICByZXR1cm4gbmV3IGlvcy5BbGVydCBwcm9wc1xuXG4gICAgZ2VuQmFubmVyID0gKGwsIG5QKSAtPlxuICAgICAgcHJvcHMgPSB7c3VwZXJMYXllcjpuUH1cbiAgICAgIGZvciBjIGluIGwuY2hpbGRyZW5cbiAgICAgICAgbiA9IGMubmFtZVxuICAgICAgICBpZiBmb3VuZChuLCAnYXBwJykgdGhlbiBwcm9wcy5hcHAgPSBnZXRTdHJpbmcoYylcbiAgICAgICAgaWYgZm91bmQobiwgJ3RpdGxlJykgdGhlbiBwcm9wcy50aXRsZSA9IGdldFN0cmluZyhjKVxuICAgICAgICBpZiBmb3VuZChuLCAnbWVzc2FnZScpIHRoZW4gcHJvcHMubWVzc2FnZSA9IGdldFN0cmluZyhjKVxuICAgICAgICBpZiBmb3VuZChuLCAndGltZScpIHRoZW4gcHJvcHMudGltZSA9IGdldFN0cmluZyhjKVxuICAgICAgICBpZiBmb3VuZChuLCAnaWNvbicpIHRoZW4gcHJvcHMuaWNvbiA9IGdldExheWVyKGMpXG4gICAgICAgIGMuZGVzdHJveSgpXG4gICAgICByZXR1cm4gbmV3IGlvcy5CYW5uZXIgcHJvcHNcblxuICAgIGdlbkJ1dHRvbiA9IChsLCBuUCkgLT5cbiAgICAgIHByb3BzID1cbiAgICAgICAgc3VwZXJMYXllcjpuUFxuICAgICAgICBjb25zdHJhaW50czpnZW5Db25zdHJhaW50cyhsKVxuXG4gICAgICBmb3IgYyBpbiBsLmNoaWxkcmVuXG4gICAgICAgIG4gPSBjLm5hbWVcbiAgICAgICAgaWYgZm91bmQobiwgJ3NtYWxsJykgdGhlbiBwcm9wcy50eXBlID0gJ3NtYWxsJ1xuICAgICAgICBpZiBmb3VuZChuLCAnYmlnJykgdGhlbiBwcm9wcy50eXBlID0gJ2JpZydcbiAgICAgICAgaWYgZm91bmQobiwgJ2RhcmsnKSB0aGVuIHByb3BzLnN0eWxlID0gJ2RhcmsnXG4gICAgICAgIGlmIGZvdW5kKG4sICdsYWJlbCcpXG4gICAgICAgICAgcHJvcHMudGV4dCA9IGdldFN0cmluZyhjKVxuICAgICAgICAgIHByb3BzLmNvbG9yID0gZ2V0Q1NTKGMpLmNvbG9yXG4gICAgICAgICAgcHJvcHMuZm9udFNpemUgPSBnZXRDU1MoYylbJ2ZvbnQtc2l6ZSddLnJlcGxhY2UoJ3B4JywgJycpXG4gICAgICAgIGMuZGVzdHJveSgpXG4gICAgICByZXR1cm4gbmV3IGlvcy5CdXR0b24gcHJvcHNcblxuICAgIGdlbkZpZWxkID0gKGwsIG5QKSAtPlxuICAgICAgcHJvcHMgPVxuICAgICAgICBzdXBlckxheWVyOm5QXG4gICAgICAgIGNvbnN0cmFpbnRzOmdlbkNvbnN0cmFpbnRzKGwpXG4gICAgICBmb3IgYyBpbiBsLmNoaWxkcmVuXG4gICAgICAgIG4gPSBjLm5hbWVcblxuICAgICAgICBpZiBmb3VuZChuLCAncGxhY2Vob2xkZXInKVxuICAgICAgICAgIHByb3BzLnBsYWNlaG9sZGVyID0gZ2V0U3RyaW5nKGMpXG4gICAgICAgIGMuZGVzdHJveSgpXG4gICAgICByZXR1cm4gbmV3IGlvcy5GaWVsZCBwcm9wc1xuXG4gICAgZ2VuS2V5Ym9hcmQgPSAobCwgblApIC0+XG4gICAgICBwcm9wcyA9XG4gICAgICAgIHN1cGVyTGF5ZXI6blBcblxuICAgICAgZm9yIGMgaW4gbC5jaGlsZHJlblxuICAgICAgICBuID0gYy5uYW1lXG5cbiAgICAgICAgaWYgZm91bmQobiwgJ3JldHVybicpIHRoZW4gcHJvcHMucmV0dXJuVGV4dCA9IGdldFN0cmluZyhjKVxuICAgICAgICBpZiBmb3VuZChuLCAnZGFyaycpIHRoZW4gcHJvcHMuc3R5bGUgPSAnZGFyaydcbiAgICAgICAgYy5kZXN0cm95KClcbiAgICAgIHJldHVybiBuZXcgaW9zLktleWJvYXJkIHByb3BzXG5cbiAgICBnZW5OYXZCYXIgPSAobCwgblApIC0+XG4gICAgICBwcm9wcyA9XG4gICAgICAgIHN1cGVyTGF5ZXI6blBcbiAgICAgIGZvciBjIGluIGwuY2hpbGRyZW5cbiAgICAgICAgbiA9IGMubmFtZVxuICAgICAgICBpZiBmb3VuZChuLCAndGl0bGUnKVxuICAgICAgICAgIHByb3BzLnRpdGxlID0gZ2V0U3RyaW5nKGMpXG4gICAgICAgICAgcHJvcHMudGl0bGVDb2xvciA9IGdldENTUyhjKS5jb2xvclxuICAgICAgICBpZiBmb3VuZChuLCAncmlnaHQnKVxuICAgICAgICAgIHByb3BzLnJpZ2h0ID0gZ2V0U3RyaW5nKGMpXG4gICAgICAgICAgcHJvcHMuY29sb3IgPSBnZXRDU1MoYykuY29sb3JcbiAgICAgICAgaWYgZm91bmQobiwgJ2xlZnQnKSB0aGVuIHByb3BzLmxlZnQgPSBnZXRTdHJpbmcoYylcbiAgICAgICAgYy5kZXN0cm95KClcbiAgICAgIHJldHVybiBuZXcgaW9zLk5hdkJhciBwcm9wc1xuXG4gICAgZ2VuU2hlZXQgPSAobCwgblApIC0+XG4gICAgICBwcm9wcyA9XG4gICAgICAgIGFjdGlvbnM6W11cbiAgICAgICAgc3VwZXJMYXllcjogblBcblxuICAgICAgZm9yIGMsIGkgaW4gbC5jaGlsZHJlblxuICAgICAgICBuID0gYy5uYW1lXG4gICAgICAgIGlmIGZvdW5kKG4sICdhY3Rpb24nKSB0aGVuIHByb3BzLmFjdGlvbnMucHVzaCBnZXRDb2xvclN0cmluZyhjKVxuICAgICAgICBpZiBmb3VuZChuLCAnZXhpdCcpIHRoZW4gcHJvcHMuZXhpdCA9IGdldFN0cmluZyhjKVxuICAgICAgICBjLmRlc3Ryb3koKVxuXG4gICAgICByZXR1cm4gbmV3IGlvcy5TaGVldCBwcm9wc1xuXG4gICAgZ2VuU3RhdHVzQmFyID0gKGwsIG5QKSAtPlxuICAgICAgcHJvcHMgPVxuICAgICAgICBzdXBlckxheWVyOiBuUFxuXG4gICAgICBmb3IgYyBpbiBsLmNoaWxkcmVuXG4gICAgICAgIG4gPSBjLm5hbWVcbiAgICAgICAgaWYgZm91bmQobiwgJ2NhcnJpZXInKSB0aGVuIHByb3BzLmNhcnJpZXIgPSBnZXRTdHJpbmcoYylcbiAgICAgICAgaWYgZm91bmQobiwgJ2JhdHRlcnknKSB0aGVuIHByb3BzLmJhdHRlcnkgPSBnZXRTdHJpbmcoYykucmVwbGFjZSgnJScsICcnKVxuICAgICAgICBpZiBmb3VuZChuLCAnbmV0d29yaycpIHRoZW4gcHJvcHMubmV0d29yayA9IGdldFN0cmluZyhjKVxuICAgICAgICBpZiBmb3VuZChuLCAnZGFyaycpIHRoZW4gcHJvcHMuc3R5bGUgPSAnbGlnaHQnXG4gICAgICAgIGMuZGVzdHJveSgpXG4gICAgICByZXR1cm4gbmV3IGlvcy5TdGF0dXNCYXIgcHJvcHNcblxuICAgIGdlblRhYkJhciA9IChsLCBuUCkgLT5cbiAgICAgIHByb3BzID1cbiAgICAgICAgdGFiczogW11cbiAgICAgICAgc3VwZXJMYXllcjpuUFxuXG4gICAgICBmb3IgYyBpbiBsLmNoaWxkcmVuXG4gICAgICAgIG4gPSBjLm5hbWVcbiAgICAgICAgdHByb3BzID0ge31cbiAgICAgICAgZm9yIHQgaW4gYy5jaGlsZHJlblxuICAgICAgICAgIHRuID0gdC5uYW1lXG5cbiAgICAgICAgICBpZiBuID09ICd0YWJfYWN0aXZlJyAmJiB0bi5pbmRleE9mKCdsYWJlbCcpICE9IC0xXG4gICAgICAgICAgICBwcm9wcy5hY3RpdmVDb2xvciA9IGdldENTUyh0KS5jb2xvclxuICAgICAgICAgIGlmIG4gIT0gJ3RhYl9hY3RpdmUnICYmIHRuLmluZGV4T2YoJ2xhYmVsJykgIT0gLTFcbiAgICAgICAgICAgIHByb3BzLmluYWN0aXZlQ29sb3IgPSBnZXRDU1ModCkuY29sb3JcblxuICAgICAgICAgIGlmIGZvdW5kKHRuLCAnYWN0aXZlJykgJiYgdG4uaW5kZXhPZignaW5hY3RpdmUnKSA9PSAtMSB0aGVuIHRwcm9wcy5hY3RpdmUgPSBnZXRMYXllcih0KVxuICAgICAgICAgIGlmIGZvdW5kKHRuLCAnaW5hY3RpdmUnKSB0aGVuIHRwcm9wcy5pbmFjdGl2ZSA9IGdldExheWVyKHQpXG4gICAgICAgICAgaWYgZm91bmQodG4sICdsYWJlbCcpIHRoZW4gdHByb3BzLmxhYmVsID0gZ2V0U3RyaW5nKHQpXG5cbiAgICAgICAgICB0LmRlc3Ryb3koKVxuICAgICAgICBwcm9wcy50YWJzLnVuc2hpZnQgbmV3IGlvcy5UYWIgdHByb3BzXG5cblxuICAgICAgICBjLmRlc3Ryb3koKVxuXG4gICAgICByZXR1cm4gbmV3IGlvcy5UYWJCYXIgcHJvcHNcblxuICAgIGdlblRleHQgPSAobCwgblApIC0+XG4gICAgICBwcm9wcyA9XG4gICAgICAgIHN1cGVyTGF5ZXI6blBcbiAgICAgICAgdGV4dDpnZXRTdHJpbmcobClcbiAgICAgICAgY29uc3RyYWludHM6Z2VuQ29uc3RyYWludHMobClcbiAgICAgIGNzcyA9IGdldENTUyhsKVxuICAgICAga2V5cyA9IE9iamVjdC5rZXlzKGdldENTUyhsKSlcbiAgICAgIGZvciBrIGluIGtleXNcbiAgICAgICAgaWYgZm91bmQoaywgJ2ZvbnQtZmFtaWx5JykgdGhlbiBwcm9wcy5mb250RmFtaWx5ID0gY3NzW2tdXG4gICAgICAgIGlmIGZvdW5kKGssICdvcGFjaXR5JykgdGhlbiBwcm9wcy5vcGFjaXR5ID0gTnVtYmVyKGNzc1trXSlcbiAgICAgICAgaWYgZm91bmQoaywgJ2NvbG9yJykgdGhlbiBwcm9wcy5jb2xvciA9IGNzc1trXVxuICAgICAgICBpZiBmb3VuZChrLCAnZm9udC1zaXplJykgdGhlbiBwcm9wcy5mb250U2l6ZSA9IGNzc1trXS5yZXBsYWNlKCdweCcsICcnKVxuICAgICAgICBpZiBmb3VuZChrLCAnbGV0dGVyLXNwYWNpbmcnKSB0aGVuIHByb3BzLmxldHRlclNwYWNpbmcgPSBjc3Nba11cbiAgICAgICAgaWYgZm91bmQoaywgJ2xpbmUtaGVpZ2h0JykgdGhlbiBwcm9wcy5saW5lSGVpZ2h0ID0gY3NzW2tdLnJlcGxhY2UoJ3B4JywgJycpXG4gICAgICByZXR1cm4gbmV3IGlvcy5UZXh0IHByb3BzXG5cbiAgICBjaGlsZHJlbiA9IChwLCBuUCkgLT5cblxuICAgICAgZm9yIGMgaW4gcC5jaGlsZHJlblxuICAgICAgICBuID0gYy5uYW1lXG4gICAgICAgIG5ld0xheWVyID0gMFxuICAgICAgICBpZiBjLm5hbWVbMF0gPT0gJ18nXG4gICAgICAgICAgaWYgZm91bmQobiwgJ19BbGVydCcpIHRoZW4gIG5ld0xheWVyID0gZ2VuQWxlcnQoYywgblApXG4gICAgICAgICAgaWYgZm91bmQobiwnX0Jhbm5lcicpIHRoZW4gbmV3TGF5ZXIgPSBnZW5CYW5uZXIoYywgblApXG4gICAgICAgICAgaWYgZm91bmQobiwgJ19CdXR0b24nKSB0aGVuIG5ld0xheWVyID0gZ2VuQnV0dG9uKGMsIG5QKVxuICAgICAgICAgIGlmIGZvdW5kKG4sICdfRmllbGQnKSB0aGVuIG5ld0xheWVyID0gZ2VuRmllbGQoYywgblApXG4gICAgICAgICAgaWYgZm91bmQobiwgJ19LZXlib2FyZCcpIHRoZW4gbmV3TGF5ZXIgPSBnZW5LZXlib2FyZChjLCBuUClcbiAgICAgICAgICBpZiBmb3VuZChuLCdfTmF2QmFyJykgdGhlbiBuZXdMYXllciA9IGdlbk5hdkJhcihjLCBuUClcbiAgICAgICAgICBpZiBmb3VuZChuLCAnX1NoZWV0JykgdGhlbiBuZXdMYXllciA9IGdlblNoZWV0KGMsIG5QKVxuICAgICAgICAgIGlmIGZvdW5kKG4sICdfVGFiQmFyJykgdGhlbiBuZXdMYXllciA9IGdlblRhYkJhcihjLCBuUClcbiAgICAgICAgICBpZiBmb3VuZChuLCAnX1N0YXR1c0JhcicpIHRoZW4gbmV3TGF5ZXIgPSBuZXcgZ2VuU3RhdHVzQmFyKGMsIG5QKVxuICAgICAgICAgIGlmIGZvdW5kKG4sICdfVGV4dCcpIHRoZW4gbmV3TGF5ZXIgPSBnZW5UZXh0KGMsIG5QKVxuICAgICAgICAgIGlmIG5ld0xheWVyID09IHVuZGVmaW5lZCB0aGVuIG5ld0xheWVyID0gZ2VuTGF5ZXIoYywgblApXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBuZXdMYXllciA9IGdlbkxheWVyKGMsIG5QKVxuXG4gICAgICAgIG5ld0xheWVyc1tuXSA9IG5ld0xheWVyXG5cbiAgICAgICAgaWYgYy5jaGlsZHJlblxuICAgICAgICAgIGNoaWxkcmVuKGMsIG5ld0xheWVyKVxuXG4gICAgICAgIGMuZGVzdHJveSgpXG5cbiAgICBpb3MubFtiLm5hbWVdID0gbmV3IEFydGJvYXJkIGJcblxuICAgIGNoaWxkcmVuKGIsIGlvcy5sW2IubmFtZV0pXG5cbiAgICBiLmRlc3Ryb3koKVxuXG4gICAgbmV3QXJ0Ym9hcmRzLnB1c2ggaW9zLmxbYi5uYW1lXVxuICAgIG5ld0xheWVyc1tiLm5hbWVdID0gaW9zLmxbYi5uYW1lXVxuXG4gIHJldHVybiBuZXdMYXllcnNcbiIsImlvcyA9IHJlcXVpcmUgJ2lvcy1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPVxuXHRcdHRleHQ6XCJCdXR0b25cIlxuXHRcdHR5cGU6XCJ0ZXh0XCJcblx0XHRzdHlsZTpcImxpZ2h0XCJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ3aGl0ZVwiXG5cdFx0Y29sb3I6XCIjMDA3QUZGXCJcblx0XHRmb250U2l6ZToxN1xuXHRcdGZvbnRXZWlnaHQ6XCJyZWd1bGFyXCJcblx0XHRuYW1lOlwiYnV0dG9uXCJcblx0XHRibHVyOnRydWVcblx0XHRzdXBlckxheWVyOnVuZGVmaW5lZFxuXHRcdGNvbnN0cmFpbnRzOnVuZGVmaW5lZFxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gaW9zLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuXG5cdGJ1dHRvbiA9IG5ldyBpb3MuVmlld1xuXHRcdG5hbWU6c2V0dXAubmFtZVxuXHRcdGNvbnN0cmFpbnRzOnNldHVwLmNvbnN0cmFpbnRzXG5cdFx0c3VwZXJMYXllcjpzZXR1cC5zdXBlckxheWVyXG5cdGJ1dHRvbi50eXBlID0gc2V0dXAudHlwZVxuXG5cdGNvbG9yID0gXCJcIlxuXG5cdHN3aXRjaCBzZXR1cC50eXBlXG5cdFx0d2hlbiBcImJpZ1wiXG5cdFx0XHRzZXR1cC5mb250U2l6ZSA9IDIwXG5cdFx0XHRzZXR1cC5mb250V2VpZ2h0ID0gXCJtZWRpdW1cIlxuXG5cdFx0XHRidXR0b24uYm9yZGVyUmFkaXVzID0gaW9zLnV0aWxzLnB4KDEyLjUpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3IgPSBcIlwiXG5cblx0XHRcdGlmIGJ1dHRvbi5jb25zdHJhaW50cyA9PSB1bmRlZmluZWQgdGhlbiBidXR0b24uY29uc3RyYWludHMgPSB7fVxuXHRcdFx0YnV0dG9uLmNvbnN0cmFpbnRzLmxlYWRpbmcgPSAxMFxuXHRcdFx0YnV0dG9uLmNvbnN0cmFpbnRzLnRyYWlsaW5nID0gMTBcblx0XHRcdGJ1dHRvbi5jb25zdHJhaW50cy5oZWlnaHQgPSA1N1xuXG5cdFx0XHRzd2l0Y2ggc2V0dXAuc3R5bGVcblx0XHRcdFx0d2hlbiBcImxpZ2h0XCJcblx0XHRcdFx0XHRjb2xvciA9IGlvcy51dGlscy5jb2xvcihcImJsdWVcIilcblx0XHRcdFx0XHRpZiBzZXR1cC5ibHVyXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgLjkpXCJcblx0XHRcdFx0XHRcdGlvcy51dGlscy5iZ0JsdXIoYnV0dG9uKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIlxuXG5cdFx0XHRcdHdoZW4gXCJkYXJrXCJcblx0XHRcdFx0XHRjb2xvciA9IFwiI0ZGRlwiXG5cdFx0XHRcdFx0aWYgc2V0dXAuYmx1clxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDQzLCA0MywgNDMsIC45KVwiXG5cdFx0XHRcdFx0XHRpb3MudXRpbHMuYmdCbHVyKGJ1dHRvbilcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3IgPSBcIiMyODI4MjhcIlxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0aWYgc2V0dXAuYmx1clxuXHRcdFx0XHRcdFx0Y29sb3IgPSBzZXR1cC5jb2xvclxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKHNldHVwLmJhY2tncm91bmRDb2xvcilcblx0XHRcdFx0XHRcdHJnYlN0cmluZyA9IGJhY2tncm91bmRDb2xvci50b1JnYlN0cmluZygpXG5cdFx0XHRcdFx0XHRyZ2JhU3RyaW5nID0gcmdiU3RyaW5nLnJlcGxhY2UoXCIpXCIsIFwiLCAuOSlcIilcblx0XHRcdFx0XHRcdHJnYmFTdHJpbmcgID0gcmdiYVN0cmluZy5yZXBsYWNlKFwicmdiXCIsIFwicmdiYVwiKVxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yID0gcmdiYVN0cmluZ1xuXHRcdFx0XHRcdFx0aW9zLnV0aWxzLmJnQmx1cihidXR0b24pXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0Y29sb3IgPSBzZXR1cC5jb2xvclxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKHNldHVwLmJhY2tncm91bmRDb2xvcilcblxuXHRcdFx0YnV0dG9uLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvclxuXG5cdFx0XHRidXR0b24ub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG5cdFx0XHRcdG5ld0NvbG9yID0gXCJcIlxuXHRcdFx0XHRpZiBzZXR1cC5zdHlsZSA9PSBcImRhcmtcIlxuXHRcdFx0XHRcdG5ld0NvbG9yID0gYnV0dG9uLmJhY2tncm91bmRDb2xvci5saWdodGVuKDEwKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0bmV3Q29sb3IgPSBidXR0b24uYmFja2dyb3VuZENvbG9yLmRhcmtlbigxMClcblx0XHRcdFx0YnV0dG9uLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOihiYWNrZ3JvdW5kQ29sb3I6bmV3Q29sb3IpXG5cdFx0XHRcdFx0dGltZTouNVxuXG5cdFx0XHRidXR0b24ub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuXHRcdFx0XHRidXR0b24uYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6KGJhY2tncm91bmRDb2xvcjpiYWNrZ3JvdW5kQ29sb3IpXG5cdFx0XHRcdFx0dGltZTouNVxuXG5cdFx0d2hlbiBcInNtYWxsXCJcblx0XHRcdHNldHVwLmZvbnRTaXplID0gMTRcblx0XHRcdHNldHVwLnRvcCA9IDRcblx0XHRcdGJ1dHRvbi5ib3JkZXJSYWRpdXMgPSBpb3MudXRpbHMucHgoMi41KVxuXHRcdFx0c2V0dXAuZm9udFdlaWdodCA9IDUwMFxuXHRcdFx0c2V0dXAudGV4dCA9IHNldHVwLnRleHQudG9VcHBlckNhc2UoKVxuXHRcdFx0Y29sb3IgPSBzZXR1cC5jb2xvclxuXHRcdFx0YnV0dG9uLmJvcmRlckNvbG9yID0gc2V0dXAuY29sb3JcblxuXHRcdFx0YnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0YnV0dG9uLmJvcmRlcldpZHRoID0gaW9zLnV0aWxzLnB4KDEpXG5cblx0XHRlbHNlXG5cdFx0XHRidXR0b24uYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRidXR0b24ub3JpZ0NvbG9yID0gaW9zLnV0aWxzLnNwZWNpYWxDaGFyKGJ1dHRvbilcblxuXHRcdFx0Y29sb3IgPSBzZXR1cC5jb2xvclxuXHRcdFx0YnV0dG9uLmxhYmVsT3JpZ0NvbG9yID0gY29sb3JcblxuXG5cdFx0XHRidXR0b24ub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG5cdFx0XHRcdEAubGFiZWxPcmlnQ29sb3IgPSBidXR0b24ubGFiZWwuY29sb3Jcblx0XHRcdFx0bmV3Q29sb3IgPSBidXR0b24uc3ViTGF5ZXJzWzBdLmNvbG9yLmxpZ2h0ZW4oMzApXG5cdFx0XHRcdGJ1dHRvbi5zdWJMYXllcnNbMF0uYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6KGNvbG9yOm5ld0NvbG9yKVxuXHRcdFx0XHRcdHRpbWU6LjVcblxuXHRcdFx0YnV0dG9uLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblx0XHRcdFx0QC5zdWJMYXllcnNbMF0uYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6KGNvbG9yOmlvcy51dGlscy5jb2xvcihALmxhYmVsT3JpZ0NvbG9yKSlcblx0XHRcdFx0XHR0aW1lOi41XG5cblx0YnV0dG9uLmxhYmVsID0gbmV3IGlvcy5UZXh0XG5cdFx0bmFtZTpcIi5sYWJlbFwiXG5cdFx0dGV4dDpzZXR1cC50ZXh0XG5cdFx0Y29sb3I6Y29sb3Jcblx0XHRsaW5lSGVpZ2h0OjE2XG5cdFx0c3VwZXJMYXllcjpidXR0b25cblx0XHRmb250U2l6ZTpzZXR1cC5mb250U2l6ZVxuXHRcdGZvbnRXZWlnaHQ6c2V0dXAuZm9udFdlaWdodFxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0YWxpZ246XCJjZW50ZXJcIlxuXG5cdHN3aXRjaCBzZXR1cC50eXBlXG5cdFx0d2hlbiBcInNtYWxsXCJcblx0XHRcdGJ1dHRvbi5wcm9wcyA9ICh3aWR0aDpidXR0b24ubGFiZWwud2lkdGggKyBpb3MudXRpbHMucHgoMjApLCBoZWlnaHQ6IGJ1dHRvbi5sYWJlbC5oZWlnaHQgKyBpb3MudXRpbHMucHgoMTApKVxuXG5cdFx0XHRidXR0b24ub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG5cdFx0XHRcdGJ1dHRvbi5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczooYmFja2dyb3VuZENvbG9yOmNvbG9yKVxuXHRcdFx0XHRcdHRpbWU6LjVcblx0XHRcdFx0YnV0dG9uLmxhYmVsLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOihjb2xvcjpcIiNGRkZcIilcblx0XHRcdFx0XHR0aW1lOi41XG5cdFx0XHRidXR0b24ub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuXHRcdFx0XHRidXR0b24uYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6KGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIpXG5cdFx0XHRcdFx0dGltZTouNVxuXHRcdFx0XHRidXR0b24ubGFiZWwuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6KGNvbG9yOmNvbG9yKVxuXHRcdFx0XHRcdHRpbWU6LjVcblx0XHRlbHNlXG5cdFx0XHRidXR0b24ucHJvcHMgPSAod2lkdGg6YnV0dG9uLmxhYmVsLndpZHRoLCBoZWlnaHQ6YnV0dG9uLmxhYmVsLmhlaWdodClcblxuXG5cdGlvcy5sYXlvdXQuc2V0XG5cdFx0dGFyZ2V0OmJ1dHRvblxuXG5cdGlvcy5sYXlvdXQuc2V0XG5cdFx0dGFyZ2V0OmJ1dHRvbi5sYWJlbFxuXHRyZXR1cm4gYnV0dG9uXG4iLCIjIEJhbm5lclxuaW9zID0gcmVxdWlyZSAnaW9zLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9XG5cdHRpdGxlOiBcIlRpdGxlXCJcblx0bWVzc2FnZTpcIk1lc3NhZ2VcIlxuXHRhY3Rpb246XCJBY3Rpb25cIlxuXHR0aW1lOlwibm93XCJcblx0YXBwOlwiYXBwXCJcblx0aWNvbjp1bmRlZmluZWRcblx0ZHVyYXRpb246N1xuXHRhbmltYXRlZDp0cnVlXG5cdHJlcGx5OnRydWVcblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKG9iaikgLT5cblx0c2V0dXAgPSBpb3MudXRpbHMuc2V0dXBDb21wb25lbnQob2JqLCBleHBvcnRzLmRlZmF1bHRzKVxuXG5cdCNzZXQgc3BlY3MgZm9yIGVhY2ggZGV2aWNlXG5cdHNwZWNzID1cblx0XHRsZWFkaW5nSWNvbjogMTVcblx0XHR0b3BJY29uOiA4XG5cdFx0dG9wVGl0bGU6IDZcblx0XHR3aWR0aDowXG5cblx0c3dpdGNoIGlvcy5kZXZpY2UubmFtZVxuXHRcdHdoZW4gXCJpcGhvbmUtNVwiXG5cdFx0XHRzcGVjcy53aWR0aCA9IDMwNFxuXHRcdHdoZW4gXCJpcGhvbmUtNnNcIlxuXHRcdFx0c3BlY3Mud2lkdGggPSAzNTlcblx0XHR3aGVuIFwiaXBob25lLTZzLXBsdXNcIlxuXHRcdFx0c3BlY3MubGVhZGluZ0ljb24gPSAxNVxuXHRcdFx0c3BlY3MudG9wSWNvbiA9IDEyXG5cdFx0XHRzcGVjcy50b3BUaXRsZSA9IDEwXG5cdFx0XHRzcGVjcy53aWR0aCA9IDM5OFxuXHRcdHdoZW4gXCJpcGFkXCJcblx0XHRcdHNwZWNzLmxlYWRpbmdJY29uID0gOFxuXHRcdFx0c3BlY3MudG9wSWNvbiA9IDhcblx0XHRcdHNwZWNzLnRvcFRpdGxlID0gMTFcblx0XHRcdHNwZWNzLndpZHRoID0gMzk4XG5cdFx0d2hlbiBcImlwYWQtcHJvXCJcblx0XHRcdHNwZWNzLmxlYWRpbmdJY29uID0gOFxuXHRcdFx0c3BlY3MudG9wSWNvbiA9IDhcblx0XHRcdHNwZWNzLnRvcFRpdGxlID0gOVxuXHRcdFx0c3BlY3Mud2lkdGggPSA1NTZcblxuXG5cdGJhbm5lciA9IG5ldyBpb3MuVmlld1xuXHRcdGJhY2tncm91bmRDb2xvcjpcInJnYmEoMjU1LDI1NSwyNTUsLjYpXCJcblx0XHRuYW1lOlwiYmFubmVyXCJcblx0XHRib3JkZXJSYWRpdXM6aW9zLnB4KDEyKVxuXHRcdHNoYWRvd0NvbG9yOlwicmdiYSgwLDAsMCwuMylcIlxuXHRcdHNoYWRvd1k6aW9zLnB4KDIpXG5cdFx0c2hhZG93Qmx1cjppb3MucHgoMTApXG5cdFx0Y2xpcDp0cnVlXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRhbGlnbjonaG9yaXpvbnRhbCdcblx0XHRcdHdpZHRoOnNwZWNzLndpZHRoXG5cdFx0XHR0b3A6OFxuXHRcdFx0aGVpZ2h0OjkzXG5cblx0YmFubmVyLmhlYWRlciA9IG5ldyBpb3MuVmlld1xuXHRcdGJhY2tncm91bmRDb2xvcjpcInJnYmEoMjU1LDI1NSwyNTUsIC4zKVwiXG5cdFx0bmFtZTpcIi5oZWFkZXJcIlxuXHRcdHN1cGVyTGF5ZXI6YmFubmVyXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRoZWlnaHQ6MzZcblx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0dHJhaWxpbmc6MFxuXG5cdGlmIHNldHVwLmljb24gPT0gdW5kZWZpbmVkXG5cblx0XHRiYW5uZXIuaWNvbiA9IG5ldyBpb3MuVmlld1xuXHRcdFx0c3VwZXJMYXllcjpiYW5uZXIuaGVhZGVyXG5cdFx0YmFubmVyLmljb24uc3R5bGVbXCJiYWNrZ3JvdW5kXCJdID0gXCJsaW5lYXItZ3JhZGllbnQoLTE4MGRlZywgIzY3RkY4MSAwJSwgIzAxQjQxRiAxMDAlKVwiXG5cblx0ZWxzZVxuXG5cdFx0YmFubmVyLmhlYWRlci5hZGRTdWJMYXllcihzZXR1cC5pY29uKVxuXHRcdGJhbm5lci5pY29uID0gc2V0dXAuaWNvblxuXG5cblx0YmFubmVyLmljb24uYm9yZGVyUmFkaXVzID0gaW9zLnV0aWxzLnB4KDQuNSlcblx0YmFubmVyLmljb24ubmFtZSA9IFwiLmljb25cIlxuXHRiYW5uZXIuaWNvbi5jb25zdHJhaW50cyA9XG5cdFx0aGVpZ2h0OjIwXG5cdFx0d2lkdGg6MjBcblx0XHRsZWFkaW5nOnNwZWNzLmxlYWRpbmdJY29uXG5cdFx0YWxpZ246XCJ2ZXJ0aWNhbFwiXG5cblx0aW9zLmxheW91dC5zZXQoYmFubmVyLmljb24pXG5cblx0YmFubmVyLmFwcCA9IG5ldyBpb3MuVGV4dFxuXHRcdHRleHQ6c2V0dXAuYXBwLnRvVXBwZXJDYXNlKClcblx0XHRjb2xvcjpcInJnYmEoMCwwLDAsLjUpXCJcblx0XHRmb250U2l6ZToxM1xuXHRcdGxldHRlclNwYWNpbmc6LjVcblx0XHRzdXBlckxheWVyOmJhbm5lci5oZWFkZXJcblx0XHRjb25zdHJhaW50czpcblx0XHRcdGxlYWRpbmc6W2Jhbm5lci5pY29uLCA2XVxuXHRcdFx0YWxpZ246XCJ2ZXJ0aWNhbFwiXG5cblx0YmFubmVyLnRpdGxlID0gbmV3IGlvcy5UZXh0XG5cdFx0dGV4dDpzZXR1cC50aXRsZVxuXHRcdGNvbG9yOlwiYmxhY2tcIlxuXHRcdGZvbnRXZWlnaHQ6XCJzZW1pYm9sZFwiXG5cdFx0Zm9udFNpemU6MTVcblx0XHRzdXBlckxheWVyOmJhbm5lclxuXHRcdG5hbWU6XCIudGl0bGVcIlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0dG9wOjQ1XG5cdFx0XHRsZWFkaW5nOjE1XG5cblx0YmFubmVyLm1lc3NhZ2UgPSBuZXcgaW9zLlRleHRcblx0XHR0ZXh0OnNldHVwLm1lc3NhZ2Vcblx0XHRjb2xvcjpcImJsYWNrXCJcblx0XHRmb250U2l6ZToxNVxuXHRcdGZvbnRXZWlnaHQ6XCJsaWdodFwiXG5cdFx0c3VwZXJMYXllcjpiYW5uZXJcblx0XHRuYW1lOlwiLm1lc3NhZ2VcIlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0bGVhZGluZ0VkZ2VzOmJhbm5lci50aXRsZVxuXHRcdFx0dG9wOltiYW5uZXIudGl0bGUsIDZdXG5cblx0YmFubmVyLnRpbWUgPSBuZXcgaW9zLlRleHRcblx0XHR0ZXh0OnNldHVwLnRpbWVcblx0XHRjb2xvcjpcInJnYmEoMCwwLDAsLjUpXCJcblx0XHRmb250U2l6ZToxM1xuXHRcdHN1cGVyTGF5ZXI6YmFubmVyLmhlYWRlclxuXHRcdG5hbWU6XCIudGltZVwiXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHR0cmFpbGluZzoxNlxuXHRcdFx0YWxpZ246XCJ2ZXJ0aWNhbFwiXG5cblx0aWYgaW9zLmRldmljZS5uYW1lID09IFwiaXBhZFwiIHx8IGlvcy5kZXZpY2UubmFtZSA9PSBcImlwYWQtcHJvXCJcblx0XHRiYW5uZXIudGltZS5jb25zdHJhaW50cyA9XG5cdFx0XHRib3R0b21FZGdlczogYmFubmVyLnRpdGxlXG5cdFx0XHR0cmFpbGluZzogc3BlY3MubGVhZGluZ0ljb25cblxuXG5cdGlvcy51dGlscy5iZ0JsdXIoYmFubmVyKVxuXG5cdCMjIEJhbm5lciBEcmFnIHNldHRpbmdzXG5cdGJhbm5lci5kcmFnZ2FibGUgPSB0cnVlXG5cdGJhbm5lci5kcmFnZ2FibGUuaG9yaXpvbnRhbCA9IGZhbHNlXG5cdGJhbm5lci5kcmFnZ2FibGUuY29uc3RyYWludHMgPVxuXHRcdHk6aW9zLnB4KDgpXG5cdFx0eDppb3MucHgoOClcblxuXHRiYW5uZXIuZHJhZ2dhYmxlLmJvdW5jZU9wdGlvbnMgPVxuXHQgICAgZnJpY3Rpb246IDI1XG5cdCAgICB0ZW5zaW9uOiAyNTBcblxuXHRiYW5uZXIub24gRXZlbnRzLkRyYWdFbmQsIC0+XG5cdFx0aWYgYmFubmVyLm1heFkgPCBpb3MudXRpbHMucHgoNjgpXG5cdFx0XHRiYW5uZXIuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOihtYXhZOjApXG5cdFx0XHRcdHRpbWU6LjE1XG5cdFx0XHRcdGN1cnZlOlwiZWFzZS1pbi1vdXRcIlxuXHRcdFx0VXRpbHMuZGVsYXkgLjI1LCAtPlxuXHRcdFx0XHRiYW5uZXIuZGVzdHJveSgpXG5cblx0IyBBbmltYXRlLWluXG5cdGlmIHNldHVwLmFuaW1hdGVkID09IHRydWVcblx0XHRiYW5uZXIueSA9IDAgLSBiYW5uZXIuaGVpZ2h0XG5cdFx0aW9zLmxheW91dC5hbmltYXRlXG5cdFx0XHR0YXJnZXQ6YmFubmVyXG5cdFx0XHR0aW1lOi4yNVxuXHRcdFx0Y3VydmU6J2Vhc2UtaW4tb3V0J1xuXHQjIEFuaW1hdGUtb3V0XG5cdGlmIHNldHVwLmR1cmF0aW9uXG5cdFx0VXRpbHMuZGVsYXkgc2V0dXAuZHVyYXRpb24sIC0+XG5cdFx0XHRiYW5uZXIuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOihtYXhZOjApXG5cdFx0XHRcdHRpbWU6LjI1XG5cdFx0XHRcdGN1cnZlOlwiZWFzZS1pbi1vdXRcIlxuXHRcdFV0aWxzLmRlbGF5IHNldHVwLmR1cmF0aW9uICsgLjI1LCAtPlxuXHRcdFx0YmFubmVyLmRlc3Ryb3koKVxuXG5cdHJldHVybiBiYW5uZXJcbiIsIiMgQWxlcnRcbmlvcyA9IHJlcXVpcmUgJ2lvcy1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPVxuXHR0aXRsZTogXCJUaXRsZVwiXG5cdG1lc3NhZ2U6XCJcIlxuXHRhY3Rpb25zOltcIk9LXCJdXG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChvYmopIC0+XG5cdHNldHVwID0gaW9zLnV0aWxzLnNldHVwQ29tcG9uZW50KG9iaiwgZXhwb3J0cy5kZWZhdWx0cylcblxuXHRhbGVydCA9IG5ldyBpb3MuVmlld1xuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOlwiYWxlcnRcIlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0bGVhZGluZzowXG5cdFx0XHR0cmFpbGluZzowXG5cdFx0XHR0b3A6MFxuXHRcdFx0Ym90dG9tOjBcblxuXHRhbGVydC5vdmVybGF5ID0gbmV3IGlvcy5WaWV3XG5cdFx0YmFja2dyb3VuZENvbG9yOlwicmdiYSgwLDAsMCwuMylcIlxuXHRcdHN1cGVyTGF5ZXI6YWxlcnRcblx0XHRuYW1lOlwiLm92ZXJsYXlcIlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0bGVhZGluZzowXG5cdFx0XHR0cmFpbGluZzowXG5cdFx0XHR0b3A6MFxuXHRcdFx0Ym90dG9tOjBcblxuXHRhbGVydC5tb2RhbCA9IG5ldyBpb3MuVmlld1xuXHRcdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0XHRzdXBlckxheWVyOmFsZXJ0XG5cdFx0Ym9yZGVyUmFkaXVzOmlvcy51dGlscy5weCgxMClcblx0XHRuYW1lOlwiLm1vZGFsXCJcblx0XHRjb25zdHJhaW50czpcblx0XHRcdGFsaWduOlwiY2VudGVyXCJcblx0XHRcdHdpZHRoOjI4MFxuXHRcdFx0aGVpZ2h0OjQwMFxuXG5cdGFsZXJ0LnRpdGxlID0gbmV3IGlvcy5UZXh0XG5cdFx0c3VwZXJMYXllcjphbGVydC5tb2RhbFxuXHRcdHRleHQ6c2V0dXAudGl0bGVcblx0XHRmb250V2VpZ2h0Olwic2VtaWJvbGRcIlxuXHRcdG5hbWU6XCIudGl0bGVcIlxuXHRcdHRleHRBbGlnbjpcImNlbnRlclwiXG5cdFx0bGluZUhlaWdodDoyMFxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0dG9wOjIwXG5cdFx0XHR3aWR0aDoyMjBcblx0XHRcdGFsaWduOlwiaG9yaXpvbnRhbFwiXG5cblx0YWxlcnQubWVzc2FnZSA9IG5ldyBpb3MuVGV4dFxuXHRcdHN1cGVyTGF5ZXI6YWxlcnQubW9kYWxcblx0XHR0ZXh0OnNldHVwLm1lc3NhZ2Vcblx0XHRmb250U2l6ZToxM1xuXHRcdG5hbWU6XCIubWVzc2FnZVwiXG5cdFx0dGV4dEFsaWduOlwiY2VudGVyXCJcblx0XHRsaW5lSGVpZ2h0OjE2XG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHR0b3A6IFthbGVydC50aXRsZSwgMTBdXG5cdFx0XHRhbGlnbjpcImhvcml6b250YWxcIlxuXHRcdFx0d2lkdGg6IDIyMFxuXG5cdGlmIHNldHVwLm1lc3NhZ2UubGVuZ3RoID09IDBcblx0XHRhbGVydC5tZXNzYWdlLmhlaWdodCA9IC0yNFxuXG5cblx0YWxlcnQuaG9yaURpdmlkZXIgPSBuZXcgaW9zLlZpZXdcblx0XHRzdXBlckxheWVyOmFsZXJ0Lm1vZGFsXG5cdFx0YmFja2dyb3VuZENvbG9yOlwiI0UyRThFQlwiXG5cdFx0bmFtZTpcIi5ob3JpRGl2aWRlclwiXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRsZWFkaW5nOjBcblx0XHRcdHRyYWlsaW5nOjBcblx0XHRcdGhlaWdodDoxXG5cdFx0XHRib3R0b206NDRcblxuXHRjbGVhbk5hbWUgPSAobikgLT5cblx0XHRpZiBuWzBdID09IFwiLVwiXG5cdFx0XHRyZXR1cm4gbi5zbGljZSg5KVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBuXG5cdCNUaXRsZSArIE1lc3NhZ2UgKyAxIHNldCBvZiBhY3Rpb25zXG5cdGFsZXJ0Lm1vZGFsLmNvbnN0cmFpbnRzW1wiaGVpZ2h0XCJdID0gMjAgKyBpb3MudXRpbHMucHQoYWxlcnQudGl0bGUuaGVpZ2h0KSArIDEwICsgaW9zLnV0aWxzLnB0KGFsZXJ0Lm1lc3NhZ2UuaGVpZ2h0KSArIDI0ICsgNDRcblxuXHRhY3Rpb25zID0gW11cblx0c3dpdGNoIHNldHVwLmFjdGlvbnMubGVuZ3RoXG5cdFx0d2hlbiAxXG5cblx0XHRcdGFjdExhYmVsID0gaW9zLnV0aWxzLmNhcGl0YWxpemUoc2V0dXAuYWN0aW9uc1swXSlcblxuXHRcdFx0YWN0aW9uID0gbmV3IGlvcy5WaWV3XG5cdFx0XHRcdHN1cGVyTGF5ZXI6YWxlcnQubW9kYWxcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwid2hpdGVcIlxuXHRcdFx0XHRuYW1lOmNsZWFuTmFtZShzZXR1cC5hY3Rpb25zWzBdKVxuXHRcdFx0XHRib3JkZXJSYWRpdXM6aW9zLnV0aWxzLnB4KDEwKVxuXHRcdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0XHRsZWFkaW5nOjBcblx0XHRcdFx0XHR0cmFpbGluZzowXG5cdFx0XHRcdFx0Ym90dG9tOjBcblx0XHRcdFx0XHRoZWlnaHQ6NDRcblxuXHRcdFx0YWN0aW9uLmxhYmVsID0gbmV3IGlvcy5UZXh0XG5cdFx0XHRcdGNvbG9yOmlvcy51dGlscy5jb2xvcihcImJsdWVcIilcblx0XHRcdFx0c3VwZXJMYXllcjphY3Rpb25cblx0XHRcdFx0dGV4dDphY3RMYWJlbFxuXHRcdFx0XHRuYW1lOlwibGFiZWxcIlxuXHRcdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0XHRhbGlnbjpcImhvcml6b250YWxcIlxuXHRcdFx0XHRcdGJvdHRvbToxNlxuXG5cdFx0XHRhY3Rpb25zLnB1c2ggYWN0aW9uXG5cblx0XHR3aGVuIDJcblxuXHRcdFx0YWN0TGFiZWwgPSBpb3MudXRpbHMuY2FwaXRhbGl6ZShzZXR1cC5hY3Rpb25zWzBdKVxuXG5cdFx0XHRhY3Rpb24gPSBuZXcgaW9zLlZpZXdcblx0XHRcdFx0c3VwZXJMYXllcjphbGVydC5tb2RhbFxuXHRcdFx0XHRuYW1lOmNsZWFuTmFtZShzZXR1cC5hY3Rpb25zWzBdKVxuXHRcdFx0XHRib3JkZXJSYWRpdXM6aW9zLnV0aWxzLnB4KDEwKVxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ3aGl0ZVwiXG5cdFx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0XHRcdHRyYWlsaW5nOmlvcy51dGlscy5wdChhbGVydC5tb2RhbC53aWR0aC8yKVxuXHRcdFx0XHRcdGJvdHRvbTowXG5cdFx0XHRcdFx0aGVpZ2h0OjQ0XG5cblx0XHRcdGFjdGlvbi5sYWJlbCA9IG5ldyBpb3MuVGV4dFxuXHRcdFx0XHRjb2xvcjppb3MudXRpbHMuY29sb3IoXCJibHVlXCIpXG5cdFx0XHRcdHN1cGVyTGF5ZXI6YWN0aW9uXG5cdFx0XHRcdHRleHQ6YWN0TGFiZWxcblx0XHRcdFx0bmFtZTpcImxhYmVsXCJcblx0XHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdFx0YWxpZ246XCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRib3R0b206MTZcblxuXHRcdFx0YWN0aW9ucy5wdXNoIGFjdGlvblxuXG5cdFx0XHRhbGVydC52ZXJ0RGl2aWRlciA9IG5ldyBpb3MuVmlld1xuXHRcdFx0XHRzdXBlckxheWVyOmFsZXJ0Lm1vZGFsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcIiNFMkU4RUJcIlxuXHRcdFx0XHRuYW1lOlwiLnZlcnREaXZpZGVyXCJcblx0XHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdFx0d2lkdGg6MVxuXHRcdFx0XHRcdGJvdHRvbTowXG5cdFx0XHRcdFx0aGVpZ2h0OjQ0XG5cdFx0XHRcdFx0YWxpZ246XCJob3Jpem9udGFsXCJcblxuXHRcdFx0YWN0TGFiZWwyID0gaW9zLnV0aWxzLmNhcGl0YWxpemUoc2V0dXAuYWN0aW9uc1sxXSlcblxuXHRcdFx0YWN0aW9uMiA9IG5ldyBpb3MuVmlld1xuXHRcdFx0XHRzdXBlckxheWVyOmFsZXJ0Lm1vZGFsXG5cdFx0XHRcdG5hbWU6Y2xlYW5OYW1lKHNldHVwLmFjdGlvbnNbMV0pXG5cdFx0XHRcdGJvcmRlclJhZGl1czppb3MudXRpbHMucHgoMTApXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0XHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdFx0bGVhZGluZzppb3MudXRpbHMucHQoYWxlcnQubW9kYWwud2lkdGgvMilcblx0XHRcdFx0XHR0cmFpbGluZzowXG5cdFx0XHRcdFx0Ym90dG9tOjBcblx0XHRcdFx0XHRoZWlnaHQ6NDRcblxuXHRcdFx0YWN0aW9uMi5sYWJlbCA9IG5ldyBpb3MuVGV4dFxuXHRcdFx0XHRjb2xvcjppb3MudXRpbHMuY29sb3IoXCJibHVlXCIpXG5cdFx0XHRcdHN1cGVyTGF5ZXI6YWN0aW9uMlxuXHRcdFx0XHR0ZXh0OmFjdExhYmVsMlxuXHRcdFx0XHRuYW1lOlwibGFiZWxcIlxuXHRcdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0XHRhbGlnbjpcImhvcml6b250YWxcIlxuXHRcdFx0XHRcdGJvdHRvbToxNlxuXG5cdFx0XHRhY3Rpb25zLnB1c2ggYWN0aW9uMlxuXG5cdFx0ZWxzZVxuXHRcdFx0Zm9yIGFjdCwgaW5kZXggaW4gc2V0dXAuYWN0aW9uc1xuXG5cdFx0XHRcdGFjdExhYmVsID0gaW9zLnV0aWxzLmNhcGl0YWxpemUoYWN0KVxuXG5cdFx0XHRcdGFjdGlvbiA9IG5ldyBpb3MuVmlld1xuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6YWxlcnQubW9kYWxcblx0XHRcdFx0XHRuYW1lOmNsZWFuTmFtZShhY3QpXG5cdFx0XHRcdFx0Ym9yZGVyUmFkaXVzOmlvcy51dGlscy5weCgxMClcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ3aGl0ZVwiXG5cdFx0XHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdFx0XHRsZWFkaW5nOjBcblx0XHRcdFx0XHRcdHRyYWlsaW5nOjBcblx0XHRcdFx0XHRcdGJvdHRvbTowICsgKChzZXR1cC5hY3Rpb25zLmxlbmd0aCAtIGluZGV4IC0gMSkgKiA0NClcblx0XHRcdFx0XHRcdGhlaWdodDo0NFxuXG5cdFx0XHRcdGFjdGlvbkRpdmlkZXIgPSBuZXcgaW9zLlZpZXdcblx0XHRcdFx0XHRzdXBlckxheWVyOmFsZXJ0Lm1vZGFsXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwiI0UyRThFQlwiXG5cdFx0XHRcdFx0bmFtZTpcImFjdGlvbiBkaXZpZGVyXCJcblx0XHRcdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0XHRcdFx0dHJhaWxpbmc6MFxuXHRcdFx0XHRcdFx0aGVpZ2h0OjFcblx0XHRcdFx0XHRcdGJvdHRvbTowICsgKChzZXR1cC5hY3Rpb25zLmxlbmd0aCAtIGluZGV4KSAqIDQ0KVxuXG5cdFx0XHRcdGFjdGlvbi5sYWJlbCA9IG5ldyBpb3MuVGV4dFxuXHRcdFx0XHRcdHN0eWxlOlwiYWxlcnRBY3Rpb25cIlxuXHRcdFx0XHRcdGNvbG9yOmlvcy51dGlscy5jb2xvcihcImJsdWVcIilcblx0XHRcdFx0XHRzdXBlckxheWVyOmFjdGlvblxuXHRcdFx0XHRcdHRleHQ6YWN0TGFiZWxcblx0XHRcdFx0XHRuYW1lOlwibGFiZWxcIlxuXHRcdFx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHRcdFx0YWxpZ246XCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRcdGJvdHRvbToxNFxuXG5cblx0XHRcdFx0YWN0aW9ucy5wdXNoIGFjdGlvblxuXHRcdFx0XHRhbGVydC5tb2RhbC5jb25zdHJhaW50c1tcImhlaWdodFwiXSA9IGFsZXJ0Lm1vZGFsLmNvbnN0cmFpbnRzW1wiaGVpZ2h0XCJdICsgNDIgLSAxMlxuXG5cdGFsZXJ0LmFjdGlvbnMgPSB7fVxuXHRmb3IgYWN0LGluZGV4IGluIGFjdGlvbnNcblxuXHRcdCNIYW5kbGUgc3BlY2lhbCBjaGFyYWN0ZXJzXG5cdFx0YWN0LnR5cGUgPSBcImJ1dHRvblwiXG5cdFx0aW9zLnV0aWxzLnNwZWNpYWxDaGFyKGFjdClcblxuXHRcdGlmIHNldHVwLmFjdGlvbnNbaW5kZXhdLmluZGV4T2YoXCItclwiKSA9PSAwXG5cdFx0XHRhY3Qub3JpZ0NvbG9yID0gaW9zLnV0aWxzLmNvbG9yKFwicmVkXCIpXG5cdFx0ZWxzZVxuXHRcdFx0YWN0Lm9yaWdDb2xvciA9IGlvcy51dGlscy5jb2xvcihcImJsdWVcIilcblx0XHRpb3MubGF5b3V0LnNldChhY3QubGFiZWwpXG5cdFx0I0FkZCBUb3VjaCBFdmVudHNcblx0XHRhY3Qub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG5cdFx0XHRALmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIlxuXHRcdFx0QC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6KGJhY2tncm91bmRDb2xvcjphY3QuYmFja2dyb3VuZENvbG9yLmRhcmtlbig1KSlcblx0XHRcdFx0dGltZTouMjVcblx0XHRcdEAubGFiZWwuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOihjb2xvcjpALm9yaWdDb2xvci5saWdodGVuKDEwKSlcblx0XHRcdFx0dGltZTouMjVcblxuXHRcdGFjdC5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG5cdFx0XHRALmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczooYmFja2dyb3VuZENvbG9yOlwid2hpdGVcIilcblx0XHRcdFx0dGltZTouMjVcblx0XHRcdEAubGFiZWwuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOihjb2xvcjpALm9yaWdDb2xvcilcblx0XHRcdFx0dGltZTouMjVcblx0XHRcdGFsZXJ0LmRlc3Ryb3koKVxuXG5cdFx0IyBFeHBvcnQgYWN0aW9uc1xuXHRcdGFsZXJ0LmFjdGlvbnNbYWN0Lm5hbWVdID0gYWN0XG5cblx0aW9zLmxheW91dC5zZXQoYWN0aW9uc1thY3Rpb25zLmxlbmd0aCAtIDFdKVxuXHRyZXR1cm4gYWxlcnRcbiIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby5cbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cblxuaW9zID0gcmVxdWlyZSBcImlvcy1raXRcIlxuXG5ib3ROYW1lPVwiXCJcbmJvdEltYWdlPVwiXCJcbiNzdHlsZXNcbm1lc3NhZ2VDbGFzcz1cblx0XCJwYWRkaW5nXCI6IFwiMTVweCA0MHB4XCJcbnF1ZXN0aW9uPVxuXHRcImJvcmRlclwiOiBcIjJweCBzb2xpZCAjRTJFMkUyXCIsXG5cdFwicGFkZGluZ1wiOiBcIjE1cHggNDBweFwiLFxuXHRcImJvcmRlci1yYWRpdXNcIjpcIjM0cHhcIixcblx0XCJmbG9hdFwiOlwibGVmdFwiXG5cbmFuc3dlcj1cblx0XCJiYWNrZ3JvdW5kXCI6IFwiIzAwODRGRlwiLFxuXHRcImNvbG9yXCI6XCIjZmZmXCIsXG5cdFwiYm9yZGVyLXJhZGl1c1wiOlwiMzRweFwiLFxuXHRcInBhZGRpbmdcIjogXCIxNXB4IDQwcHhcIixcblx0XCJmbG9hdFwiOlwibGVmdFwiXG5cblxuI2ludGVyZmFjZVxuZXhwb3J0cy5jcmVhdGVNZXNzZW5nZXIgPShib3ROYW1lLGltYWdlLGxpa2VzLGJvdENhdGVnb3J5LHVzZXIpIC0+XG5cdGJvdEltYWdlPWltYWdlXG5cdHVzZXI9dXNlclxuXHRrZXlib2FyZCA9IG5ldyBpb3MuS2V5Ym9hcmRcblx0XHRoaWRkZW46dHJ1ZVxuXG5cdHN0YXR1c0JhciA9IG5ldyBpb3MuU3RhdHVzQmFyXG5cdCAgICBjYXJyaWVyOlwiVmVyaXpvblwiXG5cdCAgICBuZXR3b3JrOlwiM0dcIlxuXHQgICAgYmF0dGVyeTo3MFxuXHQgICAgc3R5bGU6XCJkYXJrXCJcblxuXHRuYXYgPSBuZXcgaW9zLk5hdkJhclxuXHRcdHJpZ2h0OlwiQmxvY2tcIlxuXHRcdGxlZnQ6XCI8IEhvbWVcIlxuXHRcdHRpdGxlOmJvdE5hbWVcblx0XHRibHVyOmZhbHNlXG5cblx0Y3VzdG9tVGFiQmFyPW5ldyBMYXllclxuXHRcdHdpZHRoOlNjcmVlbi53aWR0aFxuXHRcdGhlaWdodDo2MFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0eTpBbGlnbi5ib3R0b21cblx0XHRzaGFkb3dZOiAtMVxuXHRcdHNoYWRvd1NwcmVhZDogMlxuXHRcdHNoYWRvd0NvbG9yOiBcInJnYmEoMTIzLDEyMywxMjMsMC4yKVwiXG5cdGN1c3RvbVRhYkJhci5vbiBcImNoYW5nZTp5XCIsIC0+XG5cdFx0c2Nyb2xsLmhlaWdodD1jdXN0b21UYWJCYXIueVxuXG5cdHdpbmRvd1tcInRleHRGaWVsZFwiXSA9IG5ldyBpb3MuRmllbGRcblx0XHR3aWR0aDpTY3JlZW4ud2lkdGhcblx0XHRrZXlib2FyZDprZXlib2FyZFxuXHRcdHBsYWNlaG9sZGVyOlwiVHlwZSBhIG1lc3NhZ2VcIlxuXHRcdGJvcmRlcldpZHRoOjBcblx0XHRjb25zdHJhaW50czpcblx0XHRcdHRvcDowXG5cdFx0XHRsZWFkaW5nOjBcblxuXHR0ZXh0RmllbGQucGFyZW50PWN1c3RvbVRhYkJhclxuXG5cdHdpbmRvd1tcInNjcm9sbFwiXSA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0bmFtZTpcInNjcm9sbFwiXG5cdFx0aGVpZ2h0OlNjcmVlbi5oZWlnaHQtNjBcblx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdGRpcmVjdGlvbkxvY2sgOnRydWVcblx0XHRjb250ZW50SW5zZXQ6XG5cdFx0XHR0b3A6IG5hdi5oZWlnaHRcblx0XHRcdGJvdHRvbTo0MFxuXHRzY3JvbGwuY29udGVudC5iYWNrZ3JvdW5kQ29sb3I9XCJudWxsXCJcblx0c2Nyb2xsLmNvbnRlbnQuaGVpZ2h0PTBcblx0c2Nyb2xsLnNlbmRUb0JhY2soKVxuXG5cdGJvdEhlYWRlcj1uZXcgTGF5ZXJcblx0XHRzdXBlckxheWVyOnNjcm9sbC5jb250ZW50XG5cdFx0d2lkdGg6U2NyZWVuLndpZHRoXG5cdFx0YmFja2dyb3VuZENvbG9yOlwiI2ZmZlwiXG5cdFx0c2hhZG93WTogLTFcblx0XHRzaGFkb3dTcHJlYWQ6IDJcblx0XHRzaGFkb3dDb2xvcjogXCJyZ2JhKDEyMywxMjMsMTIzLDAuMilcIlxuXHR1c2VyUGljQmlnPW5ldyBhdmF0YXJcblx0XHRwYXJlbnQ6Ym90SGVhZGVyXG5cdFx0bmFtZTpcImF2YXRhclwiXG5cdFx0aW1hZ2U6Ym90SW1hZ2Vcblx0XHRzaXplOjEyMFxuXHRcdG1pZFk6Ym90SGVhZGVyLm1pZFlcblx0XHR4OjUwXG5cdGJvdFRpdGxlPW5ldyBpb3MuVGV4dFxuXHRcdGZvbnRTaXplOjIxXG5cdFx0Zm9udFdlaWdodDozMDBcblx0XHR0ZXh0OmJvdE5hbWVcblx0XHRzdXBlckxheWVyOmJvdEhlYWRlclxuXHRcdHk6dXNlclBpY0JpZy55XG5cdFx0eDp1c2VyUGljQmlnLm1heFgrNTBcblx0bGlrZXM9bmV3IGlvcy5UZXh0XG5cdFx0Zm9udFNpemU6MTRcblx0XHR0ZXh0Omxpa2VzXG5cdFx0c3VwZXJMYXllcjpib3RIZWFkZXJcblx0XHR5OnVzZXJQaWNCaWcueSs1MFxuXHRcdHg6dXNlclBpY0JpZy5tYXhYKzUwXG5cdGNhdGVnb3J5PW5ldyBpb3MuVGV4dFxuXHRcdGZvbnRTaXplOjE0XG5cdFx0dGV4dDpib3RDYXRlZ29yeVxuXHRcdHN1cGVyTGF5ZXI6Ym90SGVhZGVyXG5cdFx0eTp1c2VyUGljQmlnLnkrOTBcblx0XHR4OnVzZXJQaWNCaWcubWF4WCs1MFxuXHRcdGNvbG9yOlwiIzkyOTI5MlwiXG5cblxuXHRiYWNrZ3JvdW5kQSA9IG5ldyBCYWNrZ3JvdW5kTGF5ZXJcblxuXHQjZnVuY3Rpb25zXG5cdHRleHRGaWVsZC5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG5cblx0XHR0ZXh0RmllbGQua2V5Ym9hcmQua2V5cy5yZXR1cm4ub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG5cblx0XHRcdGlmIHRleHRGaWVsZC50ZXh0Lmh0bWwubGVuZ3RoPjBcblx0XHRcdFx0bXNnPW5ldyBNZXNzYWdlXG5cdFx0XHRcdFx0dHlwZTpcInVzZXJNc2dcIlxuXHRcdFx0XHRcdHRleHQ6dGV4dEZpZWxkLnRleHQuaHRtbFxuXHRcdFx0XHR1c2VySW5wdXQodGV4dEZpZWxkLnRleHQuaHRtbClcblx0XHRcdFx0dGV4dEZpZWxkLnRleHQuaHRtbD1cIlwiXG5cblx0XHR0ZXh0RmllbGQua2V5Ym9hcmQub24gXCJjaGFuZ2U6eVwiLCAtPlxuXHRcdFx0aWYgdGV4dEZpZWxkLmtleWJvYXJkLm1heFk+U2NyZWVuLmhlaWdodFxuXHRcdFx0XHRcdFx0XHRjdXN0b21UYWJCYXIubWF4WT10ZXh0RmllbGQua2V5Ym9hcmQueVxuXHRcdFx0aWYgdGV4dEZpZWxkLmtleWJvYXJkLnk9PVNjcmVlbi5oZWlnaHRcblx0XHRcdFx0dGV4dEZpZWxkLmtleWJvYXJkLmFyZWEudmlzaWJsZT10cnVlXG5cblx0RXZlbnRzLndyYXAod2luZG93KS5hZGRFdmVudExpc3RlbmVyIFwia2V5ZG93blwiLCAoZXZlbnQpIC0+XG5cdFx0aWYgZXZlbnQua2V5Q29kZSBpcyAxM1xuXHRcdFx0XHRpZiB0ZXh0RmllbGQudGV4dC5odG1sLmxlbmd0aD4wXG5cdFx0XHRcdFx0bXNnPW5ldyBNZXNzYWdlXG5cdFx0XHRcdFx0XHR0eXBlOlwidXNlck1zZ1wiXG5cdFx0XHRcdFx0XHR0ZXh0OnRleHRGaWVsZC50ZXh0Lmh0bWxcblx0XHRcdFx0XHR1c2VySW5wdXQodGV4dEZpZWxkLnRleHQuaHRtbClcblx0XHRcdFx0XHR0ZXh0RmllbGQudGV4dC5odG1sPVwiXCJcblxuXG5tZXNzYWdlcz1bXVxuY2xhc3MgYXZhdGFyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRzKS0+XG5cdFx0c3VwZXIgb3B0c1xuXHRcdEB3aWR0aD1vcHRzLnNpemVcblx0XHRAaGVpZ2h0PW9wdHMuc2l6ZVxuXHRcdEBib3JkZXJSYWRpdXM9b3B0cy5zaXplXG5idWlsZENob2ljZXM9KGFycmF5LCBwYXJlbnRMYXllciktPlxuXHRmb3IgY2hvaWNlLGkgaW4gYXJyYXlcblx0XHRjaG9pY2VMYXllcj0gbmV3IGlvcy5UZXh0XG5cdFx0XHRmb250U2l6ZToxNlxuXHRcdFx0bmFtZTpcImNob2ljZVwiXG5cdFx0XHRmb250V2VpZ2h0OjUwMFxuXHRcdFx0Y29sb3I6XCIjMDA4NEZGXCJcblx0XHRcdHRleHQ6Y2hvaWNlWzBdXG5cdFx0XHRsaW5lSGVpZ2h0OjMyXG5cdFx0XHR5OnBhcmVudExheWVyLmhlaWdodFxuXHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdHdpZHRoOnBhcmVudExheWVyLndpZHRoLzJcblx0XHRcdHN1cGVyTGF5ZXI6cGFyZW50TGF5ZXJcblx0XHRkbyhjaG9pY2VMYXllciktPlxuXHRcdFx0Y2hvaWNlTGF5ZXIuYWN0aW9uPWNob2ljZVsxXVxuXHRcdFx0Y2hvaWNlTGF5ZXIub25DbGljayAtPlxuXHRcdFx0XHRyZXNwb25zZT1uZXcgTWVzc2FnZVxuXHRcdFx0XHRcdHR5cGU6XCJ1c2VyTXNnXCJcblx0XHRcdFx0XHR0ZXh0OmNob2ljZUxheWVyLmh0bWxcblxuXHRcdFx0XHRjaG9pY2VGdW5jKHRoaXMuYWN0aW9uKVxuXHRcdGlmIGk+MFxuXHRcdFx0Y2hvaWNlTGF5ZXIuc3R5bGU9XG5cdFx0XHRcdFx0XCJ0ZXh0LWFsaWduXCI6XCJjZW50ZXJcIlxuXHRcdFx0XHRcdFwiYm9yZGVyLXRvcFwiOlwiMnB4IHNvbGlkICNlMmUyZTJcIlxuXHRcdGNob2ljZUxheWVyLnN0eWxlPVxuXHRcdFx0XHRcdFwidGV4dC1hbGlnblwiOlwiY2VudGVyXCJcblx0XHRwYXJlbnRMYXllci5oZWlnaHQrPWNob2ljZUxheWVyLmhlaWdodFxuY2xhc3MgTWVzc2FnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdHMpLT5cblx0XHRjYXJkV2lkdGg9U2NyZWVuLndpZHRoLTMwMFxuXHRcdGNoaWxkYXJyYXk9c2Nyb2xsLmNvbnRlbnQuY2hpbGRyZW5cblx0XHRpZiBjaGlsZGFycmF5WzBdXG5cdFx0XHRwb3NZPWNoaWxkYXJyYXlbY2hpbGRhcnJheS5sZW5ndGgtMV0ubWF4WSsxMFxuXHRcdGVsc2Vcblx0XHRcdHBvc1k9MFxuXHRcdGlmIG9wdHMudHlwZT09XCJidWJibGVzXCJcblxuXHRcdFx0YnViYmxlcz1uZXcgTGF5ZXJcblx0XHRcdFx0eTotODRcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwibnVsbFwiXG5cdFx0XHRcdGhlaWdodDo2NFxuXHRcdFx0XHRzdXBlckxheWVyOmN1c3RvbVRhYkJhclxuXHRcdFx0YnViYmxlWD0wXG5cdFx0XHRmb3IgY2hvaWNlLGkgaW4gb3B0cy5jaG9pY2VzXG5cdFx0XHRcdGJ1YmJsZT0gbmV3IGlvcy5UZXh0XG5cdFx0XHRcdFx0Zm9udFNpemU6MTdcblx0XHRcdFx0XHR0ZXh0OmNob2ljZVswXVxuXHRcdFx0XHRcdGFjdGlvbjpjaG9pY2VbMV1cblx0XHRcdFx0XHRzdXBlckxheWVyOmJ1YmJsZXNcblx0XHRcdFx0ZG8oYnViYmxlKS0+XG5cdFx0XHRcdFx0YnViYmxlLmFjdGlvbj1jaG9pY2VbMV1cblx0XHRcdFx0XHRidWJibGUud2lkdGgrPTgwXG5cdFx0XHRcdFx0YnViYmxlLmhlaWdodCs9MzBcblx0XHRcdFx0XHRidWJibGUueD1idWJibGVYXG5cdFx0XHRcdFx0YnViYmxlWD1idWJibGUubWF4WCsxMFxuXHRcdFx0XHRcdGJ1YmJsZS5zdHlsZT1hbnN3ZXJcblx0XHRcdFx0XHRidWJibGUub25DbGljayAtPlxuXHRcdFx0XHRcdFx0cmVzcG9uc2U9bmV3IE1lc3NhZ2Vcblx0XHRcdFx0XHRcdFx0dHlwZTpcInVzZXJNc2dcIlxuXHRcdFx0XHRcdFx0XHR0ZXh0OmJ1YmJsZS5odG1sXG5cdFx0XHRcdFx0XHRidWJibGVzLmRlc3Ryb3koKVxuXHRcdFx0XHRcdFx0Y2hvaWNlRnVuYyh0aGlzLmFjdGlvbilcblxuXG5cdFx0XHRidWJibGVzLndpZHRoPWJ1YmJsZVhcblx0XHRcdGJ1YmJsZXMuY29uc3RyYWludHMgPVxuXHRcdFx0XHRob3Jpem9udGFsQ2VudGVyOmN1c3RvbVRhYkJhclxuXHRcdFx0aW9zLmxheW91dC5zZXQoKVxuXHRcdGVsc2UgaWYgb3B0cy50eXBlPT1cInVzZXJNc2dcIiBvciBvcHRzLnR5cGU9PVwiYm90TXNnXCJcblx0XHRcdGlmIG9wdHMudGV4dC5sZW5ndGg+MzBcblx0XHRcdFx0bWVzc2FnZT0gbmV3IGlvcy5UZXh0XG5cdFx0XHRcdFx0Zm9udFNpemU6MTdcblx0XHRcdFx0XHR0ZXh0Om9wdHMudGV4dFxuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6c2Nyb2xsLmNvbnRlbnRcblx0XHRcdFx0XHR5OnBvc1lcblxuXHRcdFx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHRcdFx0d2lkdGg6MzAwXG5cdFx0XHRlbHNlXG5cdFx0XHRcdG1lc3NhZ2U9IG5ldyBpb3MuVGV4dFxuXHRcdFx0XHRcdGZvbnRTaXplOjE3XG5cdFx0XHRcdFx0dGV4dDpvcHRzLnRleHRcblx0XHRcdFx0XHRzdXBlckxheWVyOnNjcm9sbC5jb250ZW50XG5cdFx0XHRcdFx0eTpwb3NZXG5cdFx0XHRcdG1lc3NhZ2Uud2lkdGg9bWVzc2FnZS5fZWxlbWVudC5jaGlsZHJlblswXS5vZmZzZXRXaWR0aCs4MFxuXHRcdFx0XHRtZXNzYWdlLl9lbGVtZW50LnN0eWxlLndpZHRoID0gbnVsbFxuXHRcdFx0bWVzc2FnZS5zdHlsZT1tZXNzYWdlQ2xhc3Ncblx0XHRcdG1lc3NhZ2UuaGVpZ2h0PW1lc3NhZ2UuX2VsZW1lbnQuY2hpbGRyZW5bMF0ub2Zmc2V0SGVpZ2h0KzMwXG5cdFx0XHRpZiBvcHRzLmNob2ljZXNcblx0XHRcdFx0bWVzc2FnZS5oZWlnaHQrPTMwXG5cdFx0XHRcdGlmIG1lc3NhZ2Uud2lkdGg8Y2FyZFdpZHRoXG5cdFx0XHRcdFx0bWVzc2FnZS53aWR0aD1jYXJkV2lkdGhcblx0XHRcdFx0YnVpbGRDaG9pY2VzKG9wdHMuY2hvaWNlcyxtZXNzYWdlKVxuXHRcdFx0XHRtZXNzYWdlLmNoaWxkcmVuWzBdLnN0eWxlPVxuXHRcdFx0XHRcdFwiYm9yZGVyLXRvcFwiOlwiMnB4IHNvbGlkICNlMmUyZTJcIlxuXG5cdFx0ZWxzZSBpZiBvcHRzLnR5cGU9PVwiY2FyZHNcIlxuXHRcdFx0bWVzc2FnZT1uZXcgTGF5ZXJcblx0XHRcdFx0d2lkdGg6U2NyZWVuLndpZHRoLTkwXG5cdFx0XHRcdHN1cGVyTGF5ZXI6c2Nyb2xsLmNvbnRlbnRcblx0XHRcdFx0eTpwb3NZXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcIm51bGxcIlxuXHRcdFx0bWVzc2FnZUhvbGRlcj1uZXcgTGF5ZXJcblx0XHRcdFx0eDoyXG5cdFx0XHRcdHk6MlxuXHRcdFx0XHR3aWR0aDptZXNzYWdlLndpZHRoXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcIm51bGxcIlxuXHRcdFx0XHRzdXBlckxheWVyOm1lc3NhZ2VcblxuXHRcdFx0aWYgb3B0cy5jYXJkcy5sZW5ndGg+MVxuXHRcdFx0XHRjYXJkc1BhZ2VyPW5ldyBQYWdlQ29tcG9uZW50XG5cdFx0XHRcdFx0c3VwZXJMYXllcjptZXNzYWdlSG9sZGVyXG5cdFx0XHRcdFx0d2lkdGg6Y2FyZFdpZHRoXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwibnVsbFwiXG5cdFx0XHRcdFx0c2Nyb2xsVmVydGljYWw6ZmFsc2Vcblx0XHRcdFx0XHRkaXJlY3Rpb25Mb2NrIDp0cnVlXG5cdFx0XHRcdFx0Y2xpcDpmYWxzZVxuXHRcdFx0XHRwYXJlbnRPYmplY3Q9Y2FyZHNQYWdlci5jb250ZW50XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHBhcmVudE9iamVjdD1tZXNzYWdlSG9sZGVyXG5cdFx0XHRmb3IgY2FyZCxpIGluIG9wdHMuY2FyZHNcblxuXHRcdFx0XHRjYXJkTGF5ZXI9bmV3IExheWVyXG5cdFx0XHRcdFx0d2lkdGg6Y2FyZFdpZHRoXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwiI2ZmZlwiXG5cdFx0XHRcdFx0c3VwZXJMYXllcjpwYXJlbnRPYmplY3Rcblx0XHRcdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0XHRcdGJvcmRlckNvbG9yOiBcIiNFMkUyRTJcIlxuXHRcdFx0XHRcdGJvcmRlclJhZGl1czozNFxuXHRcdFx0XHRcdGNsaXA6dHJ1ZVxuXHRcdFx0XHRcdHg6KGNhcmRXaWR0aCsyMCkqaVxuXHRcdFx0XHRcdGhlaWdodDowXG5cblx0XHRcdFx0aWYgY2FyZC5pbWFnZVxuXHRcdFx0XHRcdGNvdmVyPW5ldyBMYXllclxuXHRcdFx0XHRcdFx0d2lkdGg6Y2FyZExheWVyLndpZHRoXG5cdFx0XHRcdFx0XHRoZWlnaHQ6MzAwXG5cdFx0XHRcdFx0XHRuYW1lOlwiY292ZXJcIlxuXHRcdFx0XHRcdFx0aW1hZ2U6Y2FyZC5pbWFnZVxuXHRcdFx0XHRcdFx0c3VwZXJMYXllcjpjYXJkTGF5ZXJcblx0XHRcdFx0XHRjYXJkTGF5ZXIuaGVpZ2h0PWNvdmVyLmhlaWdodFxuXHRcdFx0XHRcdGNvdmVyLnN0eWxlPVxuXHRcdFx0XHRcdFx0XCJib3JkZXItYm90dG9tXCI6XCIycHggc29saWQgI2UyZTJlMlwiXG5cdFx0XHRcdGNhcmRUZXh0SG9sZGVyPW5ldyBMYXllclxuXHRcdFx0XHRcdFx0c3VwZXJMYXllcjpjYXJkTGF5ZXJcblx0XHRcdFx0XHRcdHdpZHRoOmNhcmRXaWR0aFxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwiI2ZmZlwiXG5cdFx0XHRcdFx0XHR5OmNhcmRMYXllci5oZWlnaHRcblx0XHRcdFx0XHRcdGhlaWdodDowXG5cdFx0XHRcdGlmIGNhcmQudGl0bGUgb3IgY2FyZC50ZXh0IG9yIGNhcmQubGlua1xuXG5cdFx0XHRcdFx0Y2FyZFRleHRIb2xkZXIuc3R5bGU9XG5cdFx0XHRcdFx0XHRcImJvcmRlci1ib3R0b21cIjpcIjJweCBzb2xpZCAjZTJlMmUyXCJcblxuXHRcdFx0XHRpZiBjYXJkLnRpdGxlXG5cdFx0XHRcdFx0dGl0bGVMYXllcj0gbmV3IGlvcy5UZXh0XG5cdFx0XHRcdFx0XHRmb250U2l6ZToxNVxuXHRcdFx0XHRcdFx0Zm9udFdlaWdodDo1MDBcblx0XHRcdFx0XHRcdHRleHQ6Y2FyZC50aXRsZVxuXHRcdFx0XHRcdFx0eDoyMFxuXHRcdFx0XHRcdFx0bGluZUhlaWdodDozMFxuXHRcdFx0XHRcdFx0eTpjYXJkVGV4dEhvbGRlci5oZWlnaHRcblx0XHRcdFx0XHRcdG5hbWU6XCJ0aXRsZVwiXG5cdFx0XHRcdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0XHRcdFx0d2lkdGg6KGNhcmRMYXllci53aWR0aC00MCkvMlxuXHRcdFx0XHRcdFx0c3VwZXJMYXllcjpjYXJkVGV4dEhvbGRlclxuXHRcdFx0XHRcdGNhcmRUZXh0SG9sZGVyLmhlaWdodCs9dGl0bGVMYXllci5oZWlnaHRcblx0XHRcdFx0aWYgY2FyZC50ZXh0XG5cdFx0XHRcdFx0dGV4dD0gbmV3IGlvcy5UZXh0XG5cdFx0XHRcdFx0XHRmb250U2l6ZToxM1xuXHRcdFx0XHRcdFx0eDoyMFxuXHRcdFx0XHRcdFx0Y29sb3I6XCIjNjY2NjY2XCJcblx0XHRcdFx0XHRcdHRleHQ6Y2FyZC50ZXh0XG5cdFx0XHRcdFx0XHR5OmNhcmRUZXh0SG9sZGVyLmhlaWdodFxuXHRcdFx0XHRcdFx0bmFtZTpcInRleHRcIlxuXHRcdFx0XHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdFx0XHRcdHdpZHRoOihjYXJkTGF5ZXIud2lkdGgtNDApLzJcblx0XHRcdFx0XHRcdHN1cGVyTGF5ZXI6Y2FyZFRleHRIb2xkZXJcblx0XHRcdFx0XHRjYXJkVGV4dEhvbGRlci5oZWlnaHQrPXRleHQuaGVpZ2h0XG5cdFx0XHRcdGlmIGNhcmQubGlua1xuXHRcdFx0XHRcdGxpbms9IG5ldyBpb3MuVGV4dFxuXHRcdFx0XHRcdFx0Zm9udFNpemU6MTNcblx0XHRcdFx0XHRcdGNvbG9yOlwiIzY2NjY2NlwiXG5cdFx0XHRcdFx0XHR4OjIwXG5cdFx0XHRcdFx0XHRsaW5lSGVpZ2h0OjMwXG5cdFx0XHRcdFx0XHR0ZXh0OmNhcmQubGlua1xuXHRcdFx0XHRcdFx0eTpjYXJkVGV4dEhvbGRlci5oZWlnaHRcblx0XHRcdFx0XHRcdG5hbWU6XCJsaW5rXCJcblx0XHRcdFx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHRcdFx0XHR3aWR0aDooY2FyZExheWVyLndpZHRoLTQwKS8yXG5cdFx0XHRcdFx0XHRzdXBlckxheWVyOmNhcmRUZXh0SG9sZGVyXG5cdFx0XHRcdFx0Y2FyZFRleHRIb2xkZXIuaGVpZ2h0Kz1saW5rLmhlaWdodFxuXHRcdFx0XHRjYXJkVGV4dEhvbGRlci5oZWlnaHQrPTIwXG5cdFx0XHRcdGNhcmRMYXllci5oZWlnaHQrPWNhcmRUZXh0SG9sZGVyLmhlaWdodFxuXHRcdFx0XHRidWlsZENob2ljZXMoY2FyZC5jaG9pY2VzLGNhcmRMYXllcilcblx0XHRcdFx0bWVzc2FnZS5oZWlnaHQ9Y2FyZExheWVyLmhlaWdodFxuXHRcdFx0XHRtZXNzYWdlSG9sZGVyLmhlaWdodD1jYXJkTGF5ZXIuaGVpZ2h0XG5cdFx0XHRcdGlmIGNhcmRzUGFnZXJcblx0XHRcdFx0XHRjYXJkc1BhZ2VyLmhlaWdodD1jYXJkTGF5ZXIuaGVpZ2h0XG5cdFx0XHRcdFx0bWVzc2FnZUhvbGRlci5oZWlnaHQ9Y2FyZExheWVyLmhlaWdodFxuXG5cblxuXG5cdFx0aWYgb3B0cy50eXBlPT1cInVzZXJNc2dcIlxuXHRcdFx0bWVzc2FnZS5zdHlsZT1hbnN3ZXJcblx0XHRcdG1lc3NhZ2UueD1TY3JlZW4ud2lkdGhcblx0XHRcdG1lc3NhZ2Uub3BhY2l0eT0wXG5cdFx0XHRtZXNzYWdlLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRtYXhYOlNjcmVlbi53aWR0aC0yMFxuXHRcdFx0XHRcdG9wYWNpdHk6MVxuXHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuXHRcdGVsc2UgaWYgb3B0cy50eXBlPT1cImJvdE1zZ1wiXG5cdFx0XHRtZXNzYWdlLnN0eWxlPXF1ZXN0aW9uXG5cblx0XHRpZiBvcHRzLnR5cGU9PVwiYm90TXNnXCIgb3Igb3B0cy50eXBlPT1cImNhcmRzXCJcblx0XHRcdG1lc3NhZ2Uub3BhY2l0eT0wXG5cdFx0XHRtZXNzYWdlLm1heFg9MFxuXHRcdFx0bWVzc2FnZS5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0eDo5MFxuXHRcdFx0XHRcdG9wYWNpdHk6MVxuXHRcdFx0XHR0aW1lOiAwLjJcblx0XHRcdFx0ZGVsYXk6MC4zXG5cdFx0XHRcdGN1cnZlOiBcImVhc2UtaW4tb3V0XCJcblx0XHRcdHVzZXJQaWM9bmV3IGF2YXRhclxuXHRcdFx0XHRwYXJlbnQ6bWVzc2FnZVxuXHRcdFx0XHRuYW1lOlwiYXZhdGFyXCJcblx0XHRcdFx0aW1hZ2U6Ym90SW1hZ2Vcblx0XHRcdFx0c2l6ZTo2MFxuXHRcdFx0dXNlclBpYy54LT03MFxuXHRcdFx0dXNlclBpYy55PUFsaWduLmJvdHRvbVxuXHRcdFx0dXNlclBpYy5zZW5kVG9CYWNrKClcblx0XHRtZXNzYWdlcy5wdXNoKG1lc3NhZ2UpXG5cdFx0Zm9yIG1zZyxpIGluIG1lc3NhZ2VzXG5cdFx0XHRpZiBtZXNzYWdlc1tpKzFdXG5cdFx0XHRcdGlmIG1zZy5jaGlsZHJlblswXSBhbmQgbWVzc2FnZXNbaSsxXS5jaGlsZHJlblswXVxuXHRcdFx0XHRcdG1zZy5jaGlsZHJlbldpdGhOYW1lKFwiYXZhdGFyXCIpWzBdLm9wYWNpdHk9MFxuXHRcdHNjcm9sbC51cGRhdGVDb250ZW50KClcblx0XHRtZXNzYWdlc1Nob3duPXNjcm9sbC5jb250ZW50LmNoaWxkcmVuXG5cblx0XHRpZiAobWVzc2FnZXNTaG93blttZXNzYWdlc1Nob3duLmxlbmd0aC0xXS5zY3JlZW5GcmFtZS55KzIwMCk+c2Nyb2xsLmhlaWdodFxuXG5cdFx0XHRzY3JvbGwuc2Nyb2xsVG9Qb2ludCggeTogc2Nyb2xsLmNvbnRlbnQuaGVpZ2h0KzIwMCwgdHJ1ZSwgY3VydmU6IFwiZWFzZVwiKVxuXHRleHBvcnRzLk1lc3NhZ2U9TWVzc2FnZVxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFrQkFBO0FES0EsSUFBQSwrRkFBQTtFQUFBOzs7QUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFNBQVI7O0FBRU4sT0FBQSxHQUFROztBQUNSLFFBQUEsR0FBUzs7QUFFVCxZQUFBLEdBQ0M7RUFBQSxTQUFBLEVBQVcsV0FBWDs7O0FBQ0QsUUFBQSxHQUNDO0VBQUEsUUFBQSxFQUFVLG1CQUFWO0VBQ0EsU0FBQSxFQUFXLFdBRFg7RUFFQSxlQUFBLEVBQWdCLE1BRmhCO0VBR0EsT0FBQSxFQUFRLE1BSFI7OztBQUtELE1BQUEsR0FDQztFQUFBLFlBQUEsRUFBYyxTQUFkO0VBQ0EsT0FBQSxFQUFRLE1BRFI7RUFFQSxlQUFBLEVBQWdCLE1BRmhCO0VBR0EsU0FBQSxFQUFXLFdBSFg7RUFJQSxPQUFBLEVBQVEsTUFKUjs7O0FBUUQsT0FBTyxDQUFDLGVBQVIsR0FBeUIsU0FBQyxPQUFELEVBQVMsS0FBVCxFQUFlLEtBQWYsRUFBcUIsV0FBckIsRUFBaUMsSUFBakM7QUFDeEIsTUFBQTtFQUFBLFFBQUEsR0FBUztFQUNULElBQUEsR0FBSztFQUNMLFFBQUEsR0FBZSxJQUFBLEdBQUcsQ0FBQyxRQUFKLENBQ2Q7SUFBQSxNQUFBLEVBQU8sSUFBUDtHQURjO0VBR2YsU0FBQSxHQUFnQixJQUFBLEdBQUcsQ0FBQyxTQUFKLENBQ1o7SUFBQSxPQUFBLEVBQVEsU0FBUjtJQUNBLE9BQUEsRUFBUSxJQURSO0lBRUEsT0FBQSxFQUFRLEVBRlI7SUFHQSxLQUFBLEVBQU0sTUFITjtHQURZO0VBTWhCLEdBQUEsR0FBVSxJQUFBLEdB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SixFQUFrbUosSUFBbG1KLEVBQXdtSixJQUF4bUosRUFBOG1KLElBQTltSixFQUFvbkosSUFBcG5KLEVBQTBuSixJQUExbkosRUFBZ29KLElBQWhvSixFQUFzb0osSUFBdG9KLEVBQTRvSixJQUE1b0osRUFBa3BKLElBQWxwSixFQUF3cEosSUFBeHBKLEVBQThwSixJQUE5cEosRUFBb3FKLElBQXBxSixFQUEwcUosSUFBMXFKLEVBQWdySixJQUFockosRUFBc3JKLElBQXRySixFQUE0ckosSUFBNXJKLEVBQWtzSixJQUFsc0osRUFBd3NKLElBQXhzSixFQUE4c0osSUFBOXNKLEVBQW90SixJQUFwdEosRUFBMHRKLElBQTF0SixFQUFndUosSUFBaHVKLEVBQXN1SixJQUF0dUosRUFBNHVKLElBQTV1SixFQUFrdkosSUFBbHZKLEVBQXd2SixJQUF4dkosRUFBOHZKLElBQTl2SixFQUFvd0osSUFBcHdKLEVBQTB3SixJQUExd0osRUFBZ3hKLElBQWh4SixFQUFzeEosSUFBdHhKLEVBQTR4SixJQUE1eEosRUFBa3lKLElBQWx5SixFQUF3eUosSUFBeHlKLEVBQTh5SixJQUE5eUosRUFBb3pKLElBQXB6SixFQUEwekosSUFBMXpKLEVBQWcwSixJQUFoMEosRUFBczBKLElBQXQwSixFQUE0MEosSUFBNTBKLEVBQWsxSixJQUFsMUosRUFBdzFKLEdBQXgxSixFQUE2MUosSUFBNzFKLEVBQW0ySixJQUFuMkosRUFBeTJKLElBQXoySixFQUErMkosSUFBLzJKLEVBQXEzSixJQUFyM0osRUFBMjNKLElBQTMzSixFQUFpNEosSUFBajRKLEVBQXU0SixJQUF2NEosRUFBNjRKLElBQTc0SixFQUFtNUosSUFBbjVKLEVBQXk1SixJQUF6NUosRUFBKzVKLElBQS81SixFQUFxNkosSUFBcjZKLEVBQTI2SixHQUEzNkosRUFBZzdKLElBQWg3SixFQUFzN0osSUFBdDdKLEVBQTQ3SixJQUE1N0osRUFBazhKLElBQWw4SixFQUF3OEosSUFBeDhKLEVBQTg4SixJQUE5OEosRUFBbzlKLElBQXA5SixFQUEwOUosS0FBMTlKLEVB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
