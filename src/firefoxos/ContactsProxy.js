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
    // success and/or fail will be called every time a contact is saved

    // a closure which is holding the object to be returned to sucessCB
    function makeSuccess(contact, moz) {
        return function(result) {
            // TODO modify contact so it will contain the link to moz
            contact.id = moz.id;
            // call callback
            successCB(contact);
        }
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
        // prepare mozContact object
        var moz = new mozContact();
        if (contact.id) {
            moz.id = contact.id;
        }
        // building name
        var nameArray = [];
        var fields = ['honorificPrefix', 'familyName', 'givenName', 'middleName', 'nickname'];
        var j = 0, field; while(field = fields[j++]) {
            if (contact.name[field]) {
                nameArray.push(contact.name[field]);
            }
        }
        moz.name = nameArray.join(' ');
        // adding simple fields [contactField, eventualMozContactField]
        var simpleFields = [['honorificPrefix'], ['givenName'], ['familyName'], 
            ['honorificSuffix'], ['nickname'], ['birthday', 'bday'], ['note']];
        j = 0; while(field = simpleFields[j++]) {
          if (contact.name[field[0]]) {
            moz[field[1] || field[0]] = contact.name[field[0]];
          }
        }
        if (contact.emails) {
            moz.email = exportContactFieldArray(contact.emails);
        }
        if (contact.categories) {
            moz.category = exportContactFieldArray(contact.categories);
        }
        if (contact.addresses) {
            moz.adr = exportAddress(contact.addresses);
        }
        if (contact.phoneNumbers) {
            moz.tel = exportContactFieldArray(contact.phoneNumbers);
        }
        if (contact.organizations) {
            moz.org = exportContactFieldArray(contact.organizations, 'name');
            moz.jobTitle = exportContactFieldArray(contact.organizations, 'title');
        }
        /*  Find out how to translate these parameters
            // photo: Blob
            // url: Array with metadata (?)
            // impp: exportIM(contact.ims), TODO: find the moz impp definition
            // anniversary
            // sex
            // genderIdentity
            // key
        */
        var request = navigator.mozContacts.save(moz);
        request.onsuccess = makeSuccess(contact, moz);
        request.onerror = errorCB;                
    }
}   

function remove(successCB, errorCB, ids) {
    var i=0;
    var id;
    while(id = ids[i++]){
        var moz = new mozContact();
        moz.id = id;
        var request = navigator.mozContacts.remove(moz);
        request.onsuccess = successCB;
        request.onerror = errorCB;
    }
}

module.exports = {
    save: saveContacts,
    remove: remove,
    search: function(){},
};    
    
require("cordova/firefoxos/commandProxy").add("Contacts", module.exports); 
