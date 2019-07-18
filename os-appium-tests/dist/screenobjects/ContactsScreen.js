"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context = require("../helpers/Context");
// SETUP BUTTONS
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
function getSwitchMultipleContacts() {
    return Context.getElemBySelector('#findContactScreen');
}
exports.getSwitchMultipleContacts = getSwitchMultipleContacts;
function getFindContactButton() {
    return Context.getElemBySelector('#findContactButton');
}
exports.getFindContactButton = getFindContactButton;
// ********PICK CONTACT SCREEN********/
function getPickContactScreen() {
    return $('#pickContactScreen');
}
exports.getPickContactScreen = getPickContactScreen;
function getPickContactButton() {
    return $('#pickContactButton');
}
exports.getPickContactButton = getPickContactButton;
