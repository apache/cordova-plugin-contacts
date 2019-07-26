import 'jasmine';
import {DEFAULT_TIMEOUT, DEFAULT_TIMEOUT_INTERVAL} from '../constants';
import * as Context from '../helpers/Context';
import NativeAlert from '../helpers/NativeAlert';
import * as ContactsScreen from '../screenobjects/ContactSscreen';

describe('[TestSuite, Description("Add Contact")]', () => {
    beforeEach(() => {
        // do test setup here, for instance:
        browser.reset();
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
    });

    it('[Test, Description("Add contact with all parameters"), Priority="P0"]', () => {
        // To be able to use the site in the webview webdriver.io first needs
        // change the context to native

        ContactsScreen.getAddContactScreen().click();
        ContactsScreen.getTitle().waitForDisplayed(DEFAULT_TIMEOUT);

        ContactsScreen.SetupContactAllParameters().click();
        // WE NEED TO FIND THE RIGHT OUTPUT TO SEE IF SETUP HAPPENED
        ContactsScreen.getAddContactButton().click();

        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        if (NativeAlert.isShown(true, browser)) {
            NativeAlert.waitForIsShown(true, browser);
            NativeAlert.pressButton('ALLOW', browser);
            NativeAlert.waitForIsShown(false, browser);
            }

        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        expect(ContactsScreen.getFeedbackMessage().getText()).toEqual('Success: True');

        // discover a way to validate the number in the contacts
    });

    it('[Test, Description("Add contact with same number"), Priority="P2"]', () => {
        // To be able to use the site in the webview webdriver.io first needs
        // change the context to native

        ContactsScreen.getAddContactScreen().click();
        ContactsScreen.getTitle().waitForDisplayed(DEFAULT_TIMEOUT);

        ContactsScreen.SetupContactAllParameters().click();
        // WE NEED TO FIND THE RIGHT OUTPUT TO SEE IF SETUP HAPPENED
        ContactsScreen.getAddContactButton().click();

        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        if (NativeAlert.isShown(true, browser)) {
            NativeAlert.waitForIsShown(true, browser);
            NativeAlert.pressButton('ALLOW', browser);
            NativeAlert.waitForIsShown(false, browser);
            }

        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        expect(ContactsScreen.getFeedbackMessage().getText()).toEqual('Success: True');

        ContactsScreen.SetupContactDifferentPhone().click();
        ContactsScreen.getAddContactButton().click();

        expect(ContactsScreen.getFeedbackMessage().getText()).toEqual('Success: True');
    });

    it('[Test, Description("Add contact with same number"), Priority="P0"]', () => {
        // To be able to use the site in the webview webdriver.io first needs
        // change the context to native

        ContactsScreen.getAddContactScreen().click();
        ContactsScreen.getTitle().waitForDisplayed(DEFAULT_TIMEOUT);

        ContactsScreen.SetupContactAllParameters().click();
        // WE NEED TO FIND THE RIGHT OUTPUT TO SEE IF SETUP HAPPENED
        ContactsScreen.getAddContactButton().click();

        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        if (NativeAlert.isShown(true, browser)) {
            NativeAlert.waitForIsShown(true, browser);
            NativeAlert.pressButton('ALLOW', browser);
            NativeAlert.waitForIsShown(false, browser);
            }

        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
        expect(ContactsScreen.getFeedbackMessage().getText()).toEqual('Success: True');

        ContactsScreen.getFindContactBottomMenu().click();
        ContactsScreen.getTitle().waitForDisplayed(DEFAULT_TIMEOUT);

        ContactsScreen.SetupFindFirstName().click();
        ContactsScreen.getFindContactButton().click();

        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        if (NativeAlert.isShown(true, browser)) {
            NativeAlert.waitForIsShown(true, browser);
            NativeAlert.pressButton('ALLOW', browser);
            NativeAlert.waitForIsShown(false, browser);
            }

        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
        ContactsScreen.getFindContactResultList().waitForDisplayed(DEFAULT_TIMEOUT);
        ContactsScreen.getFindContactResultList().click();

        ContactsScreen.getValidateFirstName().waitForDisplayed(DEFAULT_TIMEOUT);
        expect(ContactsScreen.getValidateFirstName().getText()).toEqual('Test app - Name1');
        expect(ContactsScreen.getValidateLastName().getText()).toEqual('Last1');
        expect(ContactsScreen.getValidatePhoneNumber().getText()).toEqual('+351000000000');
        expect(ContactsScreen.getValidateEmail().getText()).toEqual('email1@outsystems.com');
    });

    afterEach(() => {
        // Do test teardown here
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
    });

});
