"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context = require("../helpers/Context");
// SETUP BUTTONS - ADD CONTACT
function SetupContactAllParameters() {
    return Context.getElemBySelector('#Name1');
}
exports.SetupContactAllParameters = SetupContactAllParameters;
function SetupContactDifferentPhone() {
    return Context.getElemBySelector('#Name1_changephone');
}
exports.SetupContactDifferentPhone = SetupContactDifferentPhone;
function SetupContactDifferentEmail() {
    return Context.getElemBySelector('#Name1_changeemail');
}
exports.SetupContactDifferentEmail = SetupContactDifferentEmail;
function SetupContactDifferentPhoneEmail() {
    return Context.getElemBySelector('#Name1_changephoneandemail');
}
exports.SetupContactDifferentPhoneEmail = SetupContactDifferentPhoneEmail;
function SetupContactNoPhone() {
    return Context.getElemBySelector('#Name2_nophone');
}
exports.SetupContactNoPhone = SetupContactNoPhone;
function SetupContactOnlyPhone() {
    return Context.getElemBySelector('#onlyphone');
}
exports.SetupContactOnlyPhone = SetupContactOnlyPhone;
function SetupContactStrangeFormat() {
    return Context.getElemBySelector('#strangeformat');
}
exports.SetupContactStrangeFormat = SetupContactStrangeFormat;
// SETUP BUTTONS - FIND CONTACT
function SetupFindFirstName() {
    return Context.getElemBySelector('#testapp_name1');
}
exports.SetupFindFirstName = SetupFindFirstName;
function SetupFindLastName() {
    return Context.getElemBySelector('#last1');
}
exports.SetupFindLastName = SetupFindLastName;
function SetupFindCountryDigit() {
    return Context.getElemBySelector('#phonenumber');
}
exports.SetupFindCountryDigit = SetupFindCountryDigit;
function SetupFindEmail() {
    return Context.getElemBySelector('#email3_outsystems_com');
}
exports.SetupFindEmail = SetupFindEmail;
function SetupFindNumber1() {
    return Context.getElemBySelector('#number1');
}
exports.SetupFindNumber1 = SetupFindNumber1;
function SetupFindContactCreatedOnPhone() {
    return Context.getElemBySelector('#testapp_name3');
}
exports.SetupFindContactCreatedOnPhone = SetupFindContactCreatedOnPhone;
function SetupFindIncompleteFirstName() {
    return Context.getElemBySelector('#name2');
}
exports.SetupFindIncompleteFirstName = SetupFindIncompleteFirstName;
function SetupFindIncompleteEmail() {
    return Context.getElemBySelector('#email3');
}
exports.SetupFindIncompleteEmail = SetupFindIncompleteEmail;
function SetupNonExistentContact() {
    return Context.getElemBySelector('#nonexistentcontact');
}
exports.SetupNonExistentContact = SetupNonExistentContact;
function getSwitchMultipleContacts() {
    return Context.getElemBySelector('#switchMultipleContacts');
}
exports.getSwitchMultipleContacts = getSwitchMultipleContacts;
// SCREEN ELEMENTS
function getTitle() {
    return Context.getElemBySelector('#b1-Title');
}
exports.getTitle = getTitle;
function getAddContactScreen() {
    return Context.getElemBySelector('#addContactScreen');
}
exports.getAddContactScreen = getAddContactScreen;
function getAddContactButton() {
    return Context.getElemBySelector('#addContactButton');
}
exports.getAddContactButton = getAddContactButton;
function getFeedbackMessage() {
    return Context.getElemBySelector('.feedback-message-text');
}
exports.getFeedbackMessage = getFeedbackMessage;
function getFindContactScreen() {
    return Context.getElemBySelector('#findContactScreen');
}
exports.getFindContactScreen = getFindContactScreen;
function getFindContactButton() {
    return Context.getElemBySelector('#findContactButton');
}
exports.getFindContactButton = getFindContactButton;
function getFindContactResultList() {
    return Context.getElemBySelector('#l1-0-ListItem1');
}
exports.getFindContactResultList = getFindContactResultList;
function getPickContactScreen() {
    return Context.getElemBySelector('#pickContactScreen');
}
exports.getPickContactScreen = getPickContactScreen;
function getPickContactButton() {
    return Context.getElemBySelector('#pickContactButton');
}
exports.getPickContactButton = getPickContactButton;
// Contacts Validation
function getValidateFirstName() {
    return Context.getElemBySelector('#firstname');
}
exports.getValidateFirstName = getValidateFirstName;
function getValidateLastName() {
    return Context.getElemBySelector('#lastName');
}
exports.getValidateLastName = getValidateLastName;
function getValidateDisplayedName() {
    return Context.getElemBySelector('#displayName');
}
exports.getValidateDisplayedName = getValidateDisplayedName;
function getValidatePhoneNumber() {
    return Context.getElemBySelector('#l1-0-phoneNumber');
}
exports.getValidatePhoneNumber = getValidatePhoneNumber;
function getValidateEmail() {
    return Context.getElemBySelector('#l2-0-Email');
}
exports.getValidateEmail = getValidateEmail;
function getValidateCompanyName() {
    return Context.getElemBySelector('#l5-0-companyName');
}
exports.getValidateCompanyName = getValidateCompanyName;
function getValidateCompanyDepartment() {
    return Context.getElemBySelector('#l5-0-companyDepartment');
}
exports.getValidateCompanyDepartment = getValidateCompanyDepartment;
function getValidateJobTitle() {
    return Context.getElemBySelector('#l5-0-jobTitle');
}
exports.getValidateJobTitle = getValidateJobTitle;
function getValidateAddress() {
    return Context.getElemBySelector('#l3-0-address');
}
exports.getValidateAddress = getValidateAddress;
function getValidateBirthday() {
    return Context.getElemBySelector('#birthday');
}
exports.getValidateBirthday = getValidateBirthday;
function getValidateNotes() {
    return Context.getElemBySelector('#note');
}
exports.getValidateNotes = getValidateNotes;
// Bottom Bar
function getAddContactBottomMenu() {
    return Context.getElemBySelector('#b4-AddContactBottomBar');
}
exports.getAddContactBottomMenu = getAddContactBottomMenu;
function getFindContactBottomMenu() {
    return Context.getElemBySelector('#b4-FindContactBottomBar');
}
exports.getFindContactBottomMenu = getFindContactBottomMenu;
function getPickContactBottomMenu() {
    return Context.getElemBySelector('#b4-PickContactBottomBar');
}
exports.getPickContactBottomMenu = getPickContactBottomMenu;
