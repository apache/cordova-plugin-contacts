// cordova.define("org.apache.cordova.contacts.ContactProxy", function (require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var cordova = require('cordova');

module.exports = {
    search:function(win,fail,args){
        var fields = args[0];
        var options = args[1];

        var filter = options.filter;
        var multiple = options.multiple;

        var picker = new Windows.ApplicationModel.Contacts.ContactPicker();
        picker.selectionMode = Windows.ApplicationModel.Contacts.ContactSelectionMode.contacts;
        picker.pickSingleContactAsync().done(function (res) {

            var contact = {
                id:"",
                name: { formatted: res.name },  // ContactName
                displayName: res.name,          // DOMString
                nickname: res.name,             // DOMString
                phoneNumbers: res.phoneNumbers, // ContactField[]
                addresses: res.locations,       // ContactAddress[]
                emails: [],                     // ContactField
                ims: res.instantMessages,       // ContactField[]
                organizations: [],              // ContactOrganization[]
                birthday: null,                 // Date
                note: "",                       // DOMString
                photos: [],                     // ContactField[]
                categories: [],                 // ContactField[]
                urls: []                        // ContactField[]
            };

            if (contact.phoneNumbers && contact.phoneNumbers.length) {
                contact.phoneNumbers[0].pref = true; // cordova contact field needs a 'prefered' property on  a contact
            }

            if (contact.addresses && contact.addresses.length) {
                contact.addresses[0].pref = true;
                // convert addresses/locations to Cordova.ContactAddresses
                // pref: Set to true if this ContactAddress contains the user's preferred value. (boolean)
                // type: A string indicating what type of field this is, home for example. (DOMString)
                // formatted: The full address formatted for display. (DOMString)
                // streetAddress: The full street address. (DOMString)
                // locality: The city or locality. (DOMString)
                // region: The state or region. (DOMString)
                // postalCode: The zip code or postal code. (DOMString)
                // country: The country name. (DOMString)
            }
            // Maybe, seems the types are compatible -jm
            // convert ims to ContactField
            //if (contact.ims && contact.ims.length) {
            //    // MS ContactInstantMessageField has : displayText, launchUri, service, userName, category, type
            //    for (var n = 0; n < contact.ims.length; n++) {
            //        contact.ims[n] = new ContactField(contact.ims[n].type,contact.ims[n].value, false);
            //        }
            //    }
            //}
            win([contact]);
        });
    },

    save:function(win,fail,args){
        console.error && console.error("Windows 8 does not support creating/saving contacts");
        fail && setTimeout(function(){
            fail(new Error("Contact create/save not supported on Windows8"));
        },0);
    }


}

require("cordova/windows8/commandProxy").add("Contacts",module.exports);

