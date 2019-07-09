import 'jasmine';
import * as ContactsScreen from '../screenobjects/contacts.screen';
import * as Context from '../helpers/Context';
import NativeAlert from '../helpers/NativeAlert' //it only works without "* as"
import '../constants';

describe('[TestSuite, Description("Add Contact")]', () => {
    beforeEach(() => {
        //do test setup here, for instance:
        //browser.reset();
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
        ContactsScreen.getAddContactScreen().click();
    });

    it('[Test, Description("Add contact with all parameters"), Priority="P0"]', () => {
        // To be able to use the site in the webview webdriver.io first needs
        // change the context to native
    
        ContactsScreen.getTitle().waitForDisplayed(DEFAULT_TIMEOUT)

        ContactsScreen.SetupContactAllParameters().click();
        // WE NEED TO FIND THE RIGHT OUTPUT TO SEE IF SETUP HAPPENED
        ContactsScreen.getAddContactButton().click();
       
        
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        if(NativeAlert.isShown(true, browser)) {
            NativeAlert.waitForIsShown(true, browser);    
            NativeAlert.pressButton('ALLOW', browser);
            NativeAlert.waitForIsShown(false, browser);
            }
            
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        expect(ContactsScreen.getFeedbackMessage().getText()).toEqual('Success: True');
    });

    afterEach(() => {
        //Do test teardown here
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
    });

});
