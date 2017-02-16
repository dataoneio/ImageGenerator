"use strict";
var addPx = require("add-px-to-style");
var hyphenate = require("hyphenate-style-name");
function toCss(obj) {
    var keys = Object.keys(obj);
    if (!keys.length)
        return '';
    var i, len = keys.length;
    var result = '';
    for (i = 0; i < len; i++) {
        var key = keys[i];
        var val = obj[key];
        result += hyphenate(key) + ':' + addPx(key, val) + ';';
    }
    return result;
}
exports.toCss = toCss;
//# sourceMappingURL=ObjectToCSS.js.map