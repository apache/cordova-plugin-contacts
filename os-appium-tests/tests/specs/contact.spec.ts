/*
After each test scenario (or each suite of tests), the test should have a teardown where all contacts created are deleted
However, this one doesn't have teardown, because the plugin can't delete contacts and, with appium, we can't access the native contacts and delete them
*/

// Import constants and classes needed
import 'jasmine';
import {DEFAULT_TIMEOUT, DEFAULT_TIMEOUT_INTERVAL} from '../constants';
import * as Context from '../helpers/Context';
import NativeAlert from '../helpers/NativeAlert';
import * as ContactsScreen from '../screenobjects/ContactSscreen';

describe('[TestSuite, Description("Add Contact and find it")]', () => {

    // One contact created - it's used for all tests
    beforeAll(() => {

        // Switch the context to WEBVIEW
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        // Enter Add Contact Scren
        ContactsScreen.getAddContactScreen().click();
        ContactsScreen.getTitle().waitForDisplayed(DEFAULT_TIMEOUT);

        // Setup of the test
        ContactsScreen.SetupContactAllParameters().click();

        // Test: click to create the contact
        ContactsScreen.getAddContactButton().click();

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        if (NativeAlert.isShown(true, browser)) {
            NativeAlert.waitForIsShown(true, browser);
            NativeAlert.pressButton('ALLOW', browser);
            NativeAlert.waitForIsShown(false, browser);
            }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

    });

    it('[Test, Description("Add contact with all parameters"), Priority="P0"]', () => {

        // The expected result is for the contact to be created (message text = true)
        expect(ContactsScreen.getFeedbackMessage().getText()).toEqual('Success: True');

        // discover a way to validate the number in the contacts
    });

    it('[Test, Description("Add contact with same number"), Priority="P2"]', () => {

        // Setup of the test
        ContactsScreen.SetupContactDifferentPhone().click();

        // Test: click to create the contact
        ContactsScreen.getAddContactButton().click();

        // The expected result is for the contact to be created (message text = true)
        expect(ContactsScreen.getFeedbackMessage().getText()).toEqual('Success: True');
    });

    it('[Test, Description("Find Contact by First Name"), Priority="P0"]', () => {

        // Go to Find Contact screen
        ContactsScreen.getFindContactBottomMenu().click();
        ContactsScreen.getTitle().waitForDisplayed(DEFAULT_TIMEOUT);

        // Setup of the test
        ContactsScreen.SetupFindFirstName().click();

        // Test: click to find the contact
        ContactsScreen.getFindContactButton().click();

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        if (NativeAlert.isShown(true, browser)) {
            NativeAlert.waitForIsShown(true, browser);
            NativeAlert.pressButton('ALLOW', browser);
            NativeAlert.waitForIsShown(false, browser);
            }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        // Wait for the list to be displayed and click in the first result
        ContactsScreen.getFindContactResultList().waitForDisplayed(DEFAULT_TIMEOUT);
        ContactsScreen.getFindContactResultList().click();

        // Validate all the information in the contact
        ContactsScreen.getValidateFirstName().waitForDisplayed(DEFAULT_TIMEOUT);
        expect(ContactsScreen.getValidateFirstName().getText()).toEqual('Test app - Name1');
        expect(ContactsScreen.getValidateLastName().getText()).toEqual('Last1');
        expect(ContactsScreen.getValidatePhoneNumber().getText()).toEqual('+351000000000');
        expect(ContactsScreen.getValidateEmail().getText()).toEqual('email1@outsystems.com');
    });

    // Teardown after all tests
    afterAll(() => {
        // Switch context to NATIVE and close the application
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        browser.closeApp();
    });

});
