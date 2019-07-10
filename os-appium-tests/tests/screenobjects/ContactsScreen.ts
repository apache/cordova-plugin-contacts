import * as AndroidUtils from '../helpers/AndroidUtils';
import * as Context from '../helpers/Context';
import * as IOSUtils from '../helpers/IOSUtils';

// SETUP BUTTONS

export function SetupContactAllParameters(): WebdriverIO.Element {
    return Context.getElemBySelector('#Name1');
}

export function SetupContactDifferentPhone(): WebdriverIO.Element {
    return Context.getElemBySelector('#Name1_changephone');
}

export function SetupContactDifferentEmail(): WebdriverIO.Element {
    return Context.getElemBySelector('#Name1_changeemail');
}

export function SetupContactDifferentPhoneEmail(): WebdriverIO.Element {
    return Context.getElemBySelector('#Name1_changephoneandemail');
}

export function SetupContactNoPhone(): WebdriverIO.Element {
    return Context.getElemBySelector('#Name2_nophone');
}

export function SetupContactOnlyPhone(): WebdriverIO.Element {
    return Context.getElemBySelector('#onlyphone');
}

export function SetupContactStrangeFormat(): WebdriverIO.Element {
    return Context.getElemBySelector('#strangeformat');
}

// SCREEN ELEMENTS

export function getTitle(): WebdriverIO.Element {
    return Context.getElemBySelector('#b1-Title');
}

export function getAddContactScreen(): WebdriverIO.Element {
    return Context.getElemBySelector('#addContactScreen');
}

export function getAddContactButton(): WebdriverIO.Element {
    return Context.getElemBySelector('#addContactButton');
}

export function getFeedbackMessage(): WebdriverIO.Element {
    return Context.getElemBySelector('.feedback-message-text');
}

export function getFindContactScreen(): WebdriverIO.Element {
    return Context.getElemBySelector('#findContactScreen');
}

export function getSwitchMultipleContacts(): WebdriverIO.Element {
    return Context.getElemBySelector('#findContactScreen');
}

export function getFindContactButton(): WebdriverIO.Element {
    return Context.getElemBySelector('#findContactButton');
}

    // ********PICK CONTACT SCREEN********/

export function getPickContactScreen(): WebdriverIO.Element {
    return $('#pickContactScreen');
}

export function getPickContactButton(): WebdriverIO.Element {
    return $('#pickContactButton');
}
