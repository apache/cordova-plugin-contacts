import * as AndroidUtils from '../helpers/AndroidUtils';
import * as Context from '../helpers/Context';
import * as IOSUtils from '../helpers/IOSUtils';

export function getNativeElementX(): WebdriverIO.Element {
    if (browser.isAndroid) {
        return AndroidUtils.getElemByPartialId('viewIdX');
    } else {
        return IOSUtils.getElemByXPath('//UIAApplication[1]/UIAWindow[1]/UIAStaticText[2]');
    }
}

export function getNativeElementWithTextY(): WebdriverIO.Element {
    if (browser.isAndroid) {
        return AndroidUtils.getElemByText('Y');
    } else {
        return IOSUtils.getElemByValue('Y');
    }
}

export function getWebViewElementX(): WebdriverIO.Element {
    return Context.getElemBySelector('#x');
}
