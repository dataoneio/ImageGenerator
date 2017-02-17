import ImageGenerator from 'ImageGenerator'

let image = new ImageGenerator()
image.addQuote("When you want something, all the universe conspires in helping you to achieve it.<br /> -Mark Twain ")
image.imageStyle({backgroundImage: "background.jpg",color: 'rgba(0,0,0,0.8)',fontFamily:'Open Sans', fontSize: 30, padding: 30})
image.addWatermark({imageurl:"watermark.png", position:ImageGenerator.watermarkPosition.BOTTOMRIGHT})
image.generateImageSync('quote.png')