import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import { dirname, parse } from 'path'
import { Buffer } from 'buffer'

let svg2png = require('svg2png');
let mkdirp = require('mkdirp');

import ImageProperties from "./ImageProperties"
import WatermarkProperties from "./WatermarkProperties"
import {toCss} from "./ObjectToCSS"


/**
 * ImageGenerator
 * @constructor(quote, ImageProperties?)
 * @methods addQuote, addWatermark, generateImageSync, imageStyle, hasWaterMark
 * @static watermarkPosition.BOTTOMRIGHT,watermarkPosition.BOTTOMLEFT,watermarkPosition.TOPRIGHT,watermarkPosition.TOPLEFT
 */
class ImageGenerator {

    public static watermarkPosition = {
        BOTTOMRIGHT: "bottomright",
        BOTTOMLEFT: "bottomleft",
        TOPRIGHT: "topright",
        TOPLEFT: "topleft"
    }

    private quote: string;
    private defaultWaterMarkProperties: WatermarkProperties = {
        imageurl: "",
        position: ImageGenerator.watermarkPosition.BOTTOMRIGHT
    };
    private waterMarkProperties: WatermarkProperties = {};
    private watermarkURL: string;
    private ImageProperties: ImageProperties = {};
    private defaultImageProperties: ImageProperties = {
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
        display: 'table-cell',
        verticalAlign: 'middle',
        boxSizing: 'border-box',
        fontStyle: 'none',
        textDecoration: 'none'
    }

    constructor(quote?: string, options?: ImageProperties) {

        if (quote) {
            this.quote = quote;
        }

        if (options === undefined) {
            options = this.defaultImageProperties;
        }

        Object.keys(this.defaultImageProperties).forEach((key) => {
            if (options[key]) {
                this.ImageProperties[key] = options[key];
            } else {
                this.ImageProperties[key] = this.defaultImageProperties[key];
            }
        });



        if (options.backgroundImage) {

            this.ImageProperties.backgroundImage = `url(${this.generateImageSrc(options.backgroundImage)})`;
        } else {
            this.ImageProperties.backgroundImage = this.defaultImageProperties.backgroundImage;
        }


    }

    public addWatermark(watermarkProperties: WatermarkProperties) {
        if (watermarkProperties.imageurl === "") {
            throw new Error("No Image Provided for Watermark");
        }
        this.waterMarkProperties = watermarkProperties;
        if (watermarkProperties.imageurl) {
            this.waterMarkProperties.imageurl = watermarkProperties.imageurl;
        } else {
            this.waterMarkProperties.imageurl = this.defaultWaterMarkProperties.imageurl;
        }
    }

    public addQuote(quote: string) {
        if (this.quote) {
            this.quote = "";
        }
        this.quote = quote;
    }

    public imageStyle(imageProps: ImageProperties) {
        if (!imageProps) {
            throw new Error("undefined ImageProperties");
        }
        Object.keys(this.defaultImageProperties).forEach((key) => {
            if(imageProps[key])
            this.ImageProperties[key] = imageProps[key]
        });
    }

    public generateImageSync(outputFileName: string) {

        let tempWaterProps = {}
        switch (this.waterMarkProperties.position) {
            case ImageGenerator.watermarkPosition.BOTTOMLEFT:
                tempWaterProps = {
                    left: "15px",
                    bottom: "15px"
                }
                break;
            case ImageGenerator.watermarkPosition.BOTTOMRIGHT:
                tempWaterProps = {
                    right: "15px",
                    bottom: "15px"
                }
                break;
            case ImageGenerator.watermarkPosition.TOPLEFT:
                tempWaterProps = {
                    top: "15px",
                    left: "15px"
                }
                break;
            case ImageGenerator.watermarkPosition.TOPRIGHT:
                tempWaterProps = {
                    top: "15px",
                    right: "15px"
                }
                break;
        }
        let waterMarkDisplay = "block"
        if (!this.hasWaterMark) {
            waterMarkDisplay = "none"
        }
        if (this.quote === undefined || this.quote === null) {
            this.quote = ""
        }

        let svgTemplate = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	        xml:space="preserve">
        <style type="text/css">
            p{
                ${toCss(this.ImageProperties)}
            }

            #waterMark{
               height: 100px;
                opacity: 0.7;
                background-size: contain;
                z-index: 5;
                position: absolute;
                border: none;
                display:${waterMarkDisplay};
                ${toCss(tempWaterProps)}

            }
        </style>
        <foreignObject height="${this.ImageProperties.height}" width="${this.ImageProperties.width}">
            <p xmlns="http://www.w3.org/1999/xhtml">${this.quote}</p>
            <img xmlns="http://www.w3.org/1999/xhtml" src="${this.generateImageSrc(this.waterMarkProperties.imageurl)}" id="waterMark"/>
        </foreignObject>
        </svg>
        `;
        mkdirp.sync(dirname(outputFileName));
        writeFileSync(outputFileName, svg2png.sync(svgTemplate, { width: this.ImageProperties.width, height: this.ImageProperties.height }));
    }


    public hasWaterMark(): boolean {

      if(this.waterMarkProperties.imageurl === "" || this.waterMarkProperties.imageurl === undefined)
        return false
      else
        return true;
    }


    private generateImageSrc(path:string): string{
      let src='';
      if(path){
        if(existsSync(path))
          src= "data:image;base64," + readFileSync(path).toString('base64');
        else
          src = path;
      }
      return src;
    }
}

export default ImageGenerator;
