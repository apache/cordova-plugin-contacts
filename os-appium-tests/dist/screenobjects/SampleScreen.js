"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AndroidUtils = require("../helpers/AndroidUtils");
const IOSUtils = require("../helpers/IOSUtils");
const Context = require("../helpers/Context");
function getNativeElementX() {
    if (browser.isAndroid) {
        return AndroidUtils.getElemByPartialId('viewIdX');
    }
    else {
        return IOSUtils.getElemByXPath('//UIAApplication[1]/UIAWindow[1]/UIAStaticText[2]');
    }
}
exports.getNativeElementX = getNativeElementX;
function getNativeElementWithTextY() {
    if (browser.isAndroid) {
        return AndroidUtils.getElemByText('Y');
    }
    else {
        return IOSUtils.getElemByValue('Y');
    }
}
exports.getNativeElementWithTextY = getNativeElementWithTextY;
function getWebViewElementX() {
    return Context.getElemBySelector("#x");
}
exports.getWebViewElementX = getWebViewElementX;
