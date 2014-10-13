var exec = require('cordova/exec');

/**
 * Android API.
 */
module.exports = {
    newContactUI : function(successCallback, options) {
        /*
         *    Create a contact using the android UI create new contact
         */
        exec(successCallback, null, "Contacts","newContact", [options]);
    },
    addToExistingContactUI: function(successCallback, options) {
        /*
         *    Add a telephone number to existing contact using android UI 
         */
        exec(successCallback, null, "Contacts","addToExistingContact", [options]);
    }
};