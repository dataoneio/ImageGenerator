"use strict";
var fs_1 = require("fs");
var path_1 = require("path");
var svg2png = require('svg2png');
var mkdirp = require('mkdirp');
var ObjectToCSS_1 = require("./ObjectToCSS");
/**
 * ImageGenerator
 * @constructor(quote, ImageProperties?)
 * @methods addQuote, addWatermark, generateImageSync, imageStyle, hasWaterMark
 * @static watermarkPosition.BOTTOMRIGHT,watermarkPosition.BOTTOMLEFT,watermarkPosition.TOPRIGHT,watermarkPosition.TOPLEFT
 */
var ImageGenerator = (function () {
    function ImageGenerator(quote, options) {
        var _this = this;
        this.defaultWaterMarkProperties = {
            imageurl: "",
            position: ImageGenerator.watermarkPosition.BOTTOMRIGHT
        };
        this.waterMarkProperties = {};
        this.ImageProperties = {};
        this.defaultImageProperties = {
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
        };
        if (quote) {
            this.quote = quote;
        }
        if (options === undefined) {
            options = this.defaultImageProperties;
        }
        Object.keys(this.defaultImageProperties).forEach(function (key) {
            if (options[key]) {
                _this.ImageProperties[key] = options[key];
            }
            else {
                _this.ImageProperties[key] = _this.defaultImageProperties[key];
            }
        });
        if (options.backgroundImage) {
            this.ImageProperties.backgroundImage = "url(" + this.generateImageSrc(options.backgroundImage) + ")";
        }
        else {
            this.ImageProperties.backgroundImage = this.defaultImageProperties.backgroundImage;
        }
        if (options.fontFamily) {
            this.ImageProperties.fontFamily = "'" + this.generateImageSrc(options.fontFamily) + "'";
        }
        else {
            this.ImageProperties.fontFamily = this.defaultImageProperties.fontFamily;
        }
    }
    ImageGenerator.prototype.addWatermark = function (watermarkProperties) {
        if (watermarkProperties.imageurl === "") {
            throw new Error("No Image Provided for Watermark");
        }
        this.waterMarkProperties = watermarkProperties;
        if (watermarkProperties.imageurl) {
            this.waterMarkProperties.imageurl = watermarkProperties.imageurl;
        }
        else {
            this.waterMarkProperties.imageurl = this.defaultWaterMarkProperties.imageurl;
        }
    };
    ImageGenerator.prototype.addQuote = function (quote) {
        if (this.quote) {
            this.quote = "";
        }
        this.quote = quote;
    };
    ImageGenerator.prototype.imageStyle = function (imageProps) {
        var _this = this;
        if (!imageProps) {
            throw new Error("undefined ImageProperties");
        }
        Object.keys(this.defaultImageProperties).forEach(function (key) {
            if (imageProps[key])
                _this.ImageProperties[key] = imageProps[key];
        });
        if (imageProps.backgroundImage) {
            this.ImageProperties.backgroundImage = "url(" + this.generateImageSrc(imageProps.backgroundImage) + ")";
        }
        else {
            this.ImageProperties.backgroundImage = this.defaultImageProperties.backgroundImage;
        }
        if (imageProps.fontFamily) {
            this.ImageProperties.fontFamily = "'" + imageProps.fontFamily + "'";
        }
        else {
            this.ImageProperties.fontFamily = this.defaultImageProperties.fontFamily;
        }
    };
    ImageGenerator.prototype.generateImageSync = function (outputFileName) {
        var tempWaterProps = {};
        switch (this.waterMarkProperties.position) {
            case ImageGenerator.watermarkPosition.BOTTOMLEFT:
                tempWaterProps = {
                    left: "15px",
                    bottom: "15px"
                };
                break;
            case ImageGenerator.watermarkPosition.BOTTOMRIGHT:
                tempWaterProps = {
                    right: "15px",
                    bottom: "15px"
                };
                break;
            case ImageGenerator.watermarkPosition.TOPLEFT:
                tempWaterProps = {
                    top: "15px",
                    left: "15px"
                };
                break;
            case ImageGenerator.watermarkPosition.TOPRIGHT:
                tempWaterProps = {
                    top: "15px",
                    right: "15px"
                };
                break;
        }
        var waterMarkDisplay = "block";
        if (!this.hasWaterMark) {
            waterMarkDisplay = "none";
        }
        if (this.quote === undefined || this.quote === null) {
            this.quote = "";
        }
        var svgTemplate = "\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t        xml:space=\"preserve\">\n        <style type=\"text/css\">\n            p{\n\n                text-rendering: optimizeLegibility !important;\n                -webkit-font-smoothing: antialiased !important;\n                -moz-osx-font-smoothing: grayscale;\n                " + ObjectToCSS_1.toCss(this.ImageProperties) + "\n            }\n\n            #waterMark{\n               height: 100px;\n                opacity: 0.7;\n                background-size: contain;\n                z-index: 5;\n                position: absolute;\n                border: none;\n                display:" + waterMarkDisplay + ";\n                " + ObjectToCSS_1.toCss(tempWaterProps) + "\n\n            }\n        </style>\n        <foreignObject height=\"" + this.ImageProperties.height + "\" width=\"" + this.ImageProperties.width + "\">\n            <p xmlns=\"http://www.w3.org/1999/xhtml\">" + this.quote + "</p>\n            <img xmlns=\"http://www.w3.org/1999/xhtml\" src=\"" + this.generateImageSrc(this.waterMarkProperties.imageurl) + "\" id=\"waterMark\"/>\n        </foreignObject>\n        </svg>\n        ";
        mkdirp.sync(path_1.dirname(outputFileName));
        fs_1.writeFileSync(outputFileName, svg2png.sync(svgTemplate, { width: this.ImageProperties.width, height: this.ImageProperties.height }));
    };
    ImageGenerator.prototype.hasWaterMark = function () {
        if (this.waterMarkProperties.imageurl === "" || this.waterMarkProperties.imageurl === undefined)
            return false;
        else
            return true;
    };
    ImageGenerator.prototype.generateImageSrc = function (path) {
        var src = '';
        if (path) {
            if (fs_1.existsSync(path))
                src = "data:image;base64," + fs_1.readFileSync(path).toString('base64');
            else
                src = path;
        }
        return src;
    };
    return ImageGenerator;
}());
ImageGenerator.watermarkPosition = {
    BOTTOMRIGHT: "bottomright",
    BOTTOMLEFT: "bottomleft",
    TOPRIGHT: "topright",
    TOPLEFT: "topleft"
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageGenerator;
//# sourceMappingURL=ImageGenerator.js.map