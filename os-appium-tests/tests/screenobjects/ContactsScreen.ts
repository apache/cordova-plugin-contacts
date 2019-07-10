import * as AndroidUtils from '../helpers/AndroidUtils';
import * as IOSUtils from '../helpers/IOSUtils';
import * as Context  from "../helpers/Context";

// SETUP BUTTONS

export function SetupContactAllParameters (): WebdriverIO.Element {
    return Context.getElemBySelector('#Name1');
}


// SCREEN ELEMENTS

export function getTitle (): WebdriverIO.Element {
    return Context.getElemBySelector('#b1-Title'); 
}

export function getAddContactScreen (): WebdriverIO.Element {
    return Context.getElemBySelector('#addContactScreen');
}

export function getAddContactButton (): WebdriverIO.Element {
    return Context.getElemBySelector('#addContactButton');
}

export function getFeedbackMessage (): WebdriverIO.Element {
    return Context.getElemBySelector('.feedback-message-text');
}

export function getFindContactScreen (): WebdriverIO.Element {
    return Context.getElemBySelector('#findContactScreen');
}

export function getSwitchMultipleContacts (): WebdriverIO.Element {
    return Context.getElemBySelector('#findContactScreen');
}

export function getFindContactButton (): WebdriverIO.Element {
    return Context.getElemBySelector('#findContactButton');
}



    //********PICK CONTACT SCREEN********/

export function getPickContactScreen (): WebdriverIO.Element {
    return $('#pickContactScreen');
}

export function getPickContactButton (): WebdriverIO.Element {
    return $('#pickContactButton');
}
    
