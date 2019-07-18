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
        ContactsScreen.getAddContactScreen().click();
    });
    it('[Test, Description("Add contact with all parameters"), Priority="P2"]', () => {
        // To be able to use the site in the webview webdriver.io first needs
        // change the context to native
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
    });
    it('[Test, Description("Add contact with same number"), Priority="P0"]', () => {
        // To be able to use the site in the webview webdriver.io first needs
        // change the context to native
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
    afterEach(() => {
        // Do test teardown here
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
    });
});
