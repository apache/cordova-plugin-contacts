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

// somehow call this function by this:
// exec(success, fail, "Contacts", "save", [dupContact]);
// Cordova contact definition: 
// http://cordova.apache.org/docs/en/2.5.0/cordova_contacts_contacts.md.html#Contact
// FxOS contact definition:
// https://developer.mozilla.org/en-US/docs/Web/API/mozContact
function saveContact(contacts, success, fail) {
    // success and fail will be called every time a contact is saved
    for (var contact in contacts) {
        var moz = new mozContact(),
            request;
            
            function exportContactFieldArray(contactFieldArray, key) {
                if (!key) {
                    key = 'value';
                }                 
                
                var arr = [];
                
                for (var i in contactFieldArray) {
                    arr.push(contactFieldArray[i][key]);
                };                                       
                
                return arr;
            }              
            
            function exportAddress (addresses) {
                // TODO: check moz address format
                var arr = [];
                
                for (var i in addresses) {
                    var addr = {};
                
                    for (var key in addresses[i]) {
                        addr[key] = addresses[i][key];    
                    } 
                    
                    arr.push(addr);
                    
                }                                 
                
                return arr;
            } 
            
            // prepare mozContact object
            // TODO: find a way to link existing mozContact and Contact 
            // (by ID?)
            moz.init({
                name: [contact.name.familyName, 
                       contact.name.givenName, 
                       contact.name.middleName, 
                       contact.name.nickname],
                honorificPrefix: [contact.name.honorificPrefix],
                givenName: [contact.name.givenName],
                familyName: [contact.name.familyName],
                honorificSuffix: [contact.name.honorificSuffix], 
                nickname: [contact.nickname],
                email: exportContactFieldArray(contact.emails),
                // photo: Blob
                // url: Array with metadata (?)
                category: exportContactFieldArray(contact.categories),
                adr: exportAddress(contact.addresses),
                tel: exportContactFieldArray(contact.phoneNumbers),
                org: exportContactFieldArray(contact.organizations, 'name'),
                jobTitle: exportContactFieldArray(contact.organizations, 'title'),
                bday: contact.birthday,
                note: contact.note,
                // impp: exportIM(contact.ims), TODO: find the moz impp definition
                // anniversary
                // sex
                // genderIdentity
                // key
            });
            
            request = navigator.mozContacts.save(moz);
            request.onsuccess = success;
            request.onerror = fail;                
    }
}   

module.exports = {
    saveContact: saveContact,
    cleanup: function(){}
};    
    
require("cordova/firefoxos/commandProxy").add("Contacts", module.exports); 
