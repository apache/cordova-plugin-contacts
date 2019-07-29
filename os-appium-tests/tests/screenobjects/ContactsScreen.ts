import * as AndroidUtils from '../helpers/AndroidUtils';
import * as Context from '../helpers/Context';
import * as IOSUtils from '../helpers/IOSUtils';

// SETUP BUTTONS - ADD CONTACT

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

// SETUP BUTTONS - FIND CONTACT

export function SetupFindFirstName(): WebdriverIO.Element {
    return Context.getElemBySelector('#testapp_name1');
}

export function SetupFindLastName(): WebdriverIO.Element {
    return Context.getElemBySelector('#last1');
}

export function SetupFindCountryDigit(): WebdriverIO.Element {
    return Context.getElemBySelector('#phonenumber');
}

export function SetupFindEmail(): WebdriverIO.Element {
    return Context.getElemBySelector('#email3_outsystems_com');
}

export function SetupFindNumber1(): WebdriverIO.Element {
    return Context.getElemBySelector('#number1');
}

export function SetupFindContactCreatedOnPhone(): WebdriverIO.Element {
    return Context.getElemBySelector('#testapp_name3');
}

export function SetupFindIncompleteFirstName(): WebdriverIO.Element {
    return Context.getElemBySelector('#name2');
}

export function SetupFindIncompleteEmail(): WebdriverIO.Element {
    return Context.getElemBySelector('#email3');
}

export function SetupNonExistentContact(): WebdriverIO.Element {
    return Context.getElemBySelector('#nonexistentcontact');
}

export function getSwitchMultipleContacts(): WebdriverIO.Element {
    return Context.getElemBySelector('#switchMultipleContacts');
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

export function getFindContactButton(): WebdriverIO.Element {
    return Context.getElemBySelector('#findContactButton');
}

export function getFindContactResultList(): WebdriverIO.Element {
    return Context.getElemBySelector('#l1-0-ListItem1');
}

export function getPickContactScreen(): WebdriverIO.Element {
    return Context.getElemBySelector('#pickContactScreen');
}

export function getPickContactButton(): WebdriverIO.Element {
    return Context.getElemBySelector('#pickContactButton');
}

// CONTACTS VALIDATION

export function getValidateFirstName(): WebdriverIO.Element {
    return Context.getElemBySelector('#firstname');
}

export function getValidateLastName(): WebdriverIO.Element {
    return Context.getElemBySelector('#lastName');
}

export function getValidateDisplayedName(): WebdriverIO.Element {
    return Context.getElemBySelector('#displayName');
}

export function getValidatePhoneNumber(): WebdriverIO.Element {
    return Context.getElemBySelector('#l1-0-phoneNumber');
}

export function getValidatePhoneNumber2(): WebdriverIO.Element {
    return Context.getElemBySelector('#l1-1-phoneNumber');
}

export function getValidateEmail(): WebdriverIO.Element {
    return Context.getElemBySelector('#l2-0-Email');
}

export function getValidateEmail2(): WebdriverIO.Element {
    return Context.getElemBySelector('#l2-1-Email');
}

export function getValidateCompanyName(): WebdriverIO.Element {
    return Context.getElemBySelector('#l5-0-companyName');
}

export function getValidateCompanyDepartment(): WebdriverIO.Element {
    return Context.getElemBySelector('#l5-0-companyDepartment');
}

export function getValidateJobTitle(): WebdriverIO.Element {
    return Context.getElemBySelector('#l5-0-jobTitle');
}

export function getValidateAddress(): WebdriverIO.Element {
    return Context.getElemBySelector('#l3-0-address');
}

export function getValidateBirthday(): WebdriverIO.Element {
    return Context.getElemBySelector('#birthday');
}

export function getValidateNotes(): WebdriverIO.Element {
    return Context.getElemBySelector('#note');
}

// BOTTOM BAR

export function getAddContactBottomMenu(): WebdriverIO.Element {
    return Context.getElemBySelector('#b4-AddContactBottomBar');
}

export function getFindContactBottomMenu(): WebdriverIO.Element {
    return Context.getElemBySelector('#b4-FindContactBottomBar');
}

export function getPickContactBottomMenu(): WebdriverIO.Element {
    return Context.getElemBySelector('#b4-PickContactBottomBar');
}
