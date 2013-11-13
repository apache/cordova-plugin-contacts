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
    // a closure which is holding the object to be returned to sucessCB
    function makeSuccess(contact, moz) {
        return function(result) {
            // TODO modify contact so it will contain the link to moz
            // call callback
            successCB(contact);
        }
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
        // building name
        var nameArray = [];
        var fields = ['honorificPrefix', 'familyName', 'givenName', 'middleName', 'nickname'];
        var j = 0, field; while(field = fields[j++]) {
            if (contact.name[field]) {
                nameArray.push(contact.name[field]);
            }
        }
        translatedContact.name = nameArray.join(' ');
        // adding simple fields [contactField, eventualMozContactField]
        var simpleFields = [['honorificPrefix'], ['givenName'], ['familyName'], 
            ['honorificSuffix'], ['nickname'], ['birthday', 'bday'], ['note']];
        j = 0; while(field = simpleFields[j++]) {
          if (contact.name[field[0]]) {
            translatedContact[field[1] || field[0]] = contact.name[field[0]];
          }
        }
        if (contact.emails) {
            translatedContact.email = exportContactFieldArray(contact.emails);
        }
        if (contact.categories) {
            translatedContact.category = exportContactFieldArray(contact.categories);
        }
        if (contact.addresses) {
            translatedContact.adr = exportAddress(contact.addresses);
        }
        if (contact.phoneNumbers) {
            translatedContact.tel = exportContactFieldArray(contact.phoneNumbers);
        }
        if (contact.organizations) {
            translatedContact.org = exportContactFieldArray(contact.organizations, 'name');
            translatedContact.jobTitle = exportContactFieldArray(contact.organizations, 'title');
        }
        /* 
            // photo: Blob
            // url: Array with metadata (?)
            // impp: exportIM(contact.ims), TODO: find the moz impp definition
            // anniversary
            // sex
            // genderIdentity
            // key
        }
        */
        // TODO: find a way to link existing mozContact and Contact by ID
        var moz = new mozContact(translatedContact);
        request = navigator.mozContacts.save(moz);
        request.onsuccess = makeSuccess(contact, moz);
        request.onerror = error;                
    }
}   

module.exports = {
    save: saveContacts,
    remove: function(){},
    search: function(){},
};    
    
require("cordova/firefoxos/commandProxy").add("Contacts", module.exports); 
