"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const constants_1 = require("../constants");
const Context = require("../helpers/Context");
const NativeAlert_1 = require("../helpers/NativeAlert");
const ContactsScreen = require("../screenobjects/ContactSscreen");
describe('[TestSuite, Description("Add Contact")]', () => {
    beforeEach(() => {
        // do test setup here, for instance:
        browser.reset();
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
    });
    xit('[Test, Description("Add contact with all parameters"), Priority="P0"]', () => {
        // To be able to use the site in the webview webdriver.io first needs
        // change the context to native
        ContactsScreen.getAddContactScreen().click();
        ContactsScreen.getTitle().waitForDisplayed(constants_1.DEFAULT_TIMEOUT);
        ContactsScreen.SetupContactAllParameters().click();
        // WE NEED TO FIND THE RIGHT OUTPUT TO SEE IF SETUP HAPPENED
        ContactsScreen.getAddContactButton().click();
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        if (NativeAlert_1.default.isShown(true, browser)) {
            NativeAlert_1.default.waitForIsShown(true, browser);
            NativeAlert_1.default.pressButton('ALLOW', browser);
            NativeAlert_1.default.waitForIsShown(false, browser);
        }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
        expect(ContactsScreen.getFeedbackMessage().getText()).toEqual('Success: True');
        // discover a way to validate the number in the contacts
    });
    xit('[Test, Description("Add contact with same number"), Priority="P2"]', () => {
        // To be able to use the site in the webview webdriver.io first needs
        // change the context to native
        ContactsScreen.getAddContactScreen().click();
        ContactsScreen.getTitle().waitForDisplayed(constants_1.DEFAULT_TIMEOUT);
        ContactsScreen.SetupContactAllParameters().click();
        // WE NEED TO FIND THE RIGHT OUTPUT TO SEE IF SETUP HAPPENED
        ContactsScreen.getAddContactButton().click();
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        if (NativeAlert_1.default.isShown(true, browser)) {
            NativeAlert_1.default.waitForIsShown(true, browser);
            NativeAlert_1.default.pressButton('ALLOW', browser);
            NativeAlert_1.default.waitForIsShown(false, browser);
        }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
        expect(ContactsScreen.getFeedbackMessage().getText()).toEqual('Success: True');
        ContactsScreen.SetupContactDifferentPhone().click();
        ContactsScreen.getAddContactButton().click();
        expect(ContactsScreen.getFeedbackMessage().getText()).toEqual('Success: True');
    });
    xit('[Test, Description("Add contact with same number"), Priority="P0"]', () => {
        // To be able to use the site in the webview webdriver.io first needs
        // change the context to native
        ContactsScreen.getAddContactScreen().click();
        ContactsScreen.getTitle().waitForDisplayed(constants_1.DEFAULT_TIMEOUT);
        ContactsScreen.SetupContactAllParameters().click();
        // WE NEED TO FIND THE RIGHT OUTPUT TO SEE IF SETUP HAPPENED
        ContactsScreen.getAddContactButton().click();
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        if (NativeAlert_1.default.isShown(true, browser)) {
            NativeAlert_1.default.waitForIsShown(true, browser);
            NativeAlert_1.default.pressButton('ALLOW', browser);
            NativeAlert_1.default.waitForIsShown(false, browser);
        }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
        expect(ContactsScreen.getFeedbackMessage().getText()).toEqual('Success: True');
        ContactsScreen.getFindContactBottomMenu().click();
        ContactsScreen.getTitle().waitForDisplayed(constants_1.DEFAULT_TIMEOUT);
        ContactsScreen.SetupFindFirstName().click();
        ContactsScreen.getFindContactButton().click();
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        if (NativeAlert_1.default.isShown(true, browser)) {
            NativeAlert_1.default.waitForIsShown(true, browser);
            NativeAlert_1.default.pressButton('ALLOW', browser);
            NativeAlert_1.default.waitForIsShown(false, browser);
        }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
        ContactsScreen.getFindContactResultList().waitForDisplayed(constants_1.DEFAULT_TIMEOUT);
        ContactsScreen.getFindContactResultList().click();
        ContactsScreen.getValidateFirstName().waitForDisplayed(constants_1.DEFAULT_TIMEOUT);
        expect(ContactsScreen.getValidateFirstName().getText()).toEqual('Test app - Name1');
        expect(ContactsScreen.getValidateLastName().getText()).toEqual('Last1');
        expect(ContactsScreen.getValidatePhoneNumber().getText()).toEqual('+351000000000');
        expect(ContactsScreen.getValidateEmail().getText()).toEqual('email1@outsystems.com');
    });
    it('[Test, Description("Add contact with same number"), Priority="P0"]', () => {
        browser.closeApp();
        browser.sendKeyEvent('207', '');
    });
    afterEach(() => {
        // Do test teardown here
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        browser.closeApp();
        browser.sendKeyEvent('207', '');
    });
});
