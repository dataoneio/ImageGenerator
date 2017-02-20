"use strict";
var ImageGenerator_1 = require("./../ImageGenerator");
var image = new ImageGenerator_1["default"]();
image.addQuote("When you want something, all the universe conspires in helping you to achieve it.");
image.imageStyle({ backgroundImage: "background.jpg", color: 'rgba(0,0,0,0.8)', fontFamily: 'Open Sans', fontSize: 30, padding: 30, fontWeight: 800 });
image.addWatermark({ imageurl: "watermark.png", position: ImageGenerator_1["default"].watermarkPosition.BOTTOMRIGHT });
image.generateImageSync('quote.png');
