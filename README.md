# ImageGenerator
Generate PNG Images for a Quote provided.

A Typescript- Node Module for Generating PNG Image.

### Installation ###


```
npm install imagegenerator

```

### Usage ###

* Generate Image with a Quote

```
import ImageGenerator from 'ImageGenerator'

let image = new ImageGenerator()
image.addQuote("When you want something, all the universe conspires in helping you to achieve it.")
image.imageStyle({backgroundImage: "background.jpg",color: 'rgba(0,0,0,0.8)',fontFamily:'Open Sans', fontSize: 30, padding: 30})
image.addWatermark({imageurl:"watermark.png", position:ImageGenerator.watermarkPosition.BOTTOMRIGHT})
image.generateImageSync('quote.png')

```

* Example Output

![alt tag](https://raw.githubusercontent.com/dataoneio/ImageGenerator/master/example/quote.png)

### Constructor ###

```
new ImageGenerator()
new ImageGenerator("quote")
new ImageGenerator("quote",{ImageProperties})

```

### Methods ###
 
* Adding a Quote to Image 

```
image.addQuote("<Your Quote Here>");
```


* Generate Image Synchronously
 
```
image.generateImageSync('<OutputFilePath>.png')
```


* Adding a Watermark to Image 


```

//Properties of Watermark
 watermark: WatermarkProperties = {
    imageurl: string, // Path  to Image URL/HTML
    position: ImageGenerator.watermarkPosition.BOTTOMRIGHT | ImageGenerator.watermarkPosition.BOTTOMLEFT | ImageGenerator.watermarkPosition.TOPRIGHT | ImageGenerator.watermarkPosition.TOPLEFT
}


//Object as Argument
image.addWatermark({ 
    imageurl: <Path to Image URL/Local Path>,
    position: ImageGenerator.watermarkPosition.BOTTOMRIGHT | ImageGenerator.watermarkPosition.BOTTOMLEFT | ImageGenerator.watermarkPosition.TOPRIGHT | ImageGenerator.watermarkPosition.TOPLEFT
 });


```
* Styles to Image


```

//Properties of Styles
 imgProps: ImageProperties = {
   backgroundColor?: string;  // Background of the Image - Color
    backgroundImage?: string;  //Background of the Image - Image as Background
    color?: string;  // Font Color
    fontFamily?: string;  // Font Family
    fontSize?: number;  //Font Size
    height?: number;  //Height of the Image
    width?: number;  //Width of the Image
    padding?: number;   //Padding around Text
    textAlign?: string; //Text Align
    wordWrap?: string;   //Word Wrapping
    verticalAlign?: string;  // Vertical Aligning
    backgroundSize?: string;  //Background Sizing 
    fontStyle?: string;   //Italic / Oblique / None
    textDecoration?: string; // Underline/Strikethrough 
}


//Object as Argument
image.imageStyle({ 
    backgroundColor: "#fff", 
    backgroundImage: "", 
    color: "#000", 
    fontFamily: "sans-serif", 
    fontSize: 25, 
    height: 500, 
    width: 500, 
    backgroundSize: "cover", 
    padding: 10, 
    textAlign: 'center', 
    wordWrap: 'break-word', 
    verticalAlign: 'middle', 
    fontStyle: 'none', 
    textDecoration: 'none' 
 });


```

