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
function saveContacts(successCB, errorCB, contacts) {
    // success and fail will be called every time a contact is saved
    function success(result) {
        // TODO: this will need to amend the result
        console.log('SUCCESS from moz');
        successCB(result);
    }
    function error(e) {
        console.log('BOO from moz');
        errorCB(e);
    }
        
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
    var i=0;
    var contact;

    while(contact = contacts[i++]){
        var request;
        // prepare mozContact object
        var translatedContact = {};
        var nameArray = [];
        var j = 0;
        var field;
        var fields = ['honorificPrefix', 'familyName', 'givenName', 'middleName', 'nickname'];
        while(field = fields[j++]) {
            if (contact.name[field]) {
                nameArray.push(contact.name[field]);
            }
        }
        translatedContact.name = nameArray.join(' ');
        if (contact.name.honorificPrefix) {
            translatedContact.honorificPrefix = contact.name.honorificPrefix;
        }
        translatedContact.familyName = contact.name.familyName;
        /*
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
        }
        */
        // TODO: find a way to link existing mozContact and Contact by ID
        var moz = new mozContact(translatedContact);
        // XXX: moz.name is undefined
        
        request = navigator.mozContacts.save(moz);
        request.onsuccess = success;
        request.onerror = error;                
    }
}   

module.exports = {
    save: saveContacts,
    remove: function(){},
    search: function(){},
};    
    
require("cordova/firefoxos/commandProxy").add("Contacts", module.exports); 
