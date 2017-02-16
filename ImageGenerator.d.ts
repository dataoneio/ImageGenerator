import ImageProperties from "./ImageProperties";
import WatermarkProperties from "./WatermarkProperties";
/**
 * ImageGenerator
 * @constructor(quote, ImageProperties?)
 * @methods addQuote, addWatermark, generateImageSync, imageStyle, hasWaterMark
 * @static watermarkPosition.BOTTOMRIGHT,watermarkPosition.BOTTOMLEFT,watermarkPosition.TOPRIGHT,watermarkPosition.TOPLEFT
 */
declare class ImageGenerator {
    static watermarkPosition: {
        BOTTOMRIGHT: string;
        BOTTOMLEFT: string;
        TOPRIGHT: string;
        TOPLEFT: string;
    };
    private quote;
    private defaultWaterMarkProperties;
    private waterMarkProperties;
    private watermarkURL;
    private ImageProperties;
    private defaultImageProperties;
    constructor(quote?: string, options?: ImageProperties);
    addWatermark(watermarkProperties: WatermarkProperties): void;
    addQuote(quote: string): void;
    imageStyle(imageProps: ImageProperties): void;
    generateImageSync(outputFileName: string): void;
    hasWaterMark(): boolean;
    private generateImageSrc(path);
}
export default ImageGenerator;
