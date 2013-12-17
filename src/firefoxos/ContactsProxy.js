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


var Contact = require('./Contact');
var ContactField = require('./ContactField');
var ContactAddress = require('./ContactAddress');
var ContactName = require('./ContactName');

// XXX: a hack to check if id is "empty". Cordova inserts a
// string "this string is supposed to be a unique identifier that will 
// never show up on a device" if id is empty
function hasId(id) {
    if (!id || id.indexOf(' ') >= 0) {
        return false;
    }
    return true;
}

mozContact.prototype.updateFromCordova = function(contact) {

    function exportContactFieldArray(contactFieldArray, key) {
        if (!key) {
            key = 'value';
        }                 
        var arr = [];
        for (var i=0; i < contactFieldArray.length; i++) {
            arr.push(contactFieldArray[i][key]);
        };                                       
        return arr;
    }              

    function exportAddress(addresses) {
        // TODO: check moz address format
        var arr = [];
        
        for (var i=0; i < addresses.length; i++) {
            var addr = {};
            for (var key in addresses[i]) {
                addr[key] = addresses[i][key];    
            } 
            arr.push(addr);
        }                                 
        return arr;
    } 

    function exportContactField(data) {
        var contactFields = [];
        for (var i=0; i < data.length; i++) {
            var item = data[i];
            if (item.value) {
                var itemData = {value: item.value};
                if (item.type) {
                    itemData.type = [item.type];
                }
                if (item.pref) {
                    itemData.pref = item.pref;
                }
                contactFields.push(itemData);
            }
        }
        return contactFields;
    }
    // adding simple fields [contactField, eventualMozContactField]
    var nameFields = [['givenName'], ['familyName'],  
                      ['honorificPrefix'], ['honorificSuffix'],
                      ['middleName', 'additionalName']];
    var baseArrayFields = [['displayName', 'name'], ['nickname']];
    var baseStringFields = [];
    var j = 0; while(field = nameFields[j++]) {
      if (contact.name[field[0]]) {
        this[field[1] || field[0]] = contact.name[field[0]].split(' ');
        // console.log(field[0], contact.name[field[0]], this[field[1] || field[0]]);
      }
    }
    j = 0; while(field = baseArrayFields[j++]) {
      if (contact[field[0]]) {
        this[field[1] || field[0]] = contact[field[0]].split(' ');
      }
    }
    j = 0; while(field = baseStringFields[j++]) {
      if (contact[field[0]]) {
        this[field[1] || field[0]] = contact[field[0]];
      }
    }
    if (contact.birthday) {
      this.bday = new Date(contact.birthday);
    }
    if (contact.emails) {
        var emails = exportContactField(contact.emails)
        this.email = emails;
    }
    if (contact.categories) {
        this.category = exportContactFieldArray(contact.categories);
    }
    if (contact.addresses) {
        this.adr = exportAddress(contact.addresses);
    }
    if (contact.phoneNumbers) {
        this.tel = exportContactField(contact.phoneNumbers);
    }
    if (contact.organizations) {
        this.org = exportContactFieldArray(contact.organizations, 'name');
        this.jobTitle = exportContactFieldArray(contact.organizations, 'title');
    }
    if (contact.note) {
        this.note = [contact.note];
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
}

function createMozillaFromCordova(successCB, errorCB, contact) {

    var mozC;
    // get contact if exists
    if (contact.id) {
      var search = navigator.mozContacts.find({
        filterBy: ['id'], filterValue: contact.id, filterOp: 'equals'});
      search.onsuccess = function() {
        mozC = search.result[0];
        mozC.updateFromCordova(contact);
        successCB(mozC);
      };
      search.onerror = errorCB;
      return;
    }

    var mozC = new mozContact();
    if ('init' in mozC) {
      // 1.2 and below compatibility
      mozC.init();
    }
    mozC.updateFromCordova(contact);

    //console.log('cordova2moz ', contact.id, contact.birthday, Date.parse(mozC.bday), mozC.bday.toDateString());
    successCB(mozC);
}

function createCordovaFromMozilla(moz) {
    function exportContactField(data) {
        var contactFields = [];
        for (var i=0; i < data.length; i++) {
            var item = data[i];
            var itemData = new ContactField(item.type, item.value, item.pref);
            contactFields.push(itemData);
        }
        return contactFields;
    }

    var contact = new Contact();

    if (moz.id) {
        contact.id = moz.id;
    }
    var nameFields = [['givenName'], ['familyName'], 
                       ['honorificPrefix'], ['honorificSuffix'],
                       ['additionalName', 'middleName']];
    var baseArrayFields = [['name', 'displayName'], 'nickname', ['note']];
    var baseStringFields = [];
    var name = new ContactName();
    var j = 0; while(field = nameFields[j++]) {
        if (moz[field[0]]) {
            name[field[1] || field[0]] = moz[field[0]].join(' ');
        }
    }
    contact.name = name;
    j = 0; while(field = baseArrayFields[j++]) {
        if (moz[field[0]]) {
            contact[field[1] || field[0]] = moz[field[0]].join(' ');
        }
    }
    j = 0; while(field = baseStringFields[j++]) {
        if (moz[field[0]]) {
            contact[field[1] || field[0]] = moz[field[0]];
        }
    }
    // emails
    if (moz.email) {
        contact.emails = exportContactField(moz.email);
    }
    // categories
    // addresses
    if (moz.tel) {
        contact.phoneNumbers = exportContactField(moz.tel);
    }
    // birthday
    if (moz.bday) {
      contact.birthday = Date.parse(moz.bday);
    }
    // organizations
    return contact;
}


function _inspect(obj) {
  for (var k in obj) {
    console.log(k, obj[k]);
  }
}

function saveContacts(successCB, errorCB, contacts) {
    // a closure which is holding the right moz contact
    function makeSaveSuccessCB(moz) {
        return function(result) {
            // create contact from FXOS contact (might be different than
            // the original one due to differences in API)
            var contact = createCordovaFromMozilla(moz);
            // call callback
            successCB(contact);
        }
    }
    var i=0;
    var contact;
    while(contact = contacts[i++]){
        var moz = createMozillaFromCordova(function(moz) {
          // console.log('before save ', moz.id, moz);
          var request = navigator.mozContacts.save(moz);
          // success and/or fail will be called every time a contact is saved
          request.onsuccess = makeSaveSuccessCB(moz);
          request.onerror = function(e) { console.log(e.target); errorCB(e); }                
        }, function() {}, contact);
    }
}   


function remove(successCB, errorCB, ids) {
    var i=0;
    var id;
    for (var i=0; i < ids.length; i++){
        // throw an error if no id provided
        if (!hasId(ids[i])) {
          errorCB(0);
        }
        var moz = new mozContact();
        moz.id = ids[i];
        var request = navigator.mozContacts.remove(moz);
        request.onsuccess = successCB;
        request.onerror = errorCB;
    }
}


var mozContactSearchFields = [['name', 'displayName'], ['givenName'], 
    ['familyName'], ['email'], ['tel'], ['jobTitle'], ['note'], 
    ['tel', 'phoneNumbers'], ['email', 'emails']]; 
// nickname and additionalName are forbidden in  1.3 and below
// name is forbidden in 1.2 and below

// finds if a value is inside array array and returns FFOS if different
function getMozSearchField(arr, value) {
    if (arr.indexOf([value]) >= 0) {
        return value;
    }
    for (var i=0; i < arr.length; i++) {
        if (arr[i].length > 1) {
            if (arr[i][1] === value) {
                return arr[i][0];
            }
        }
    }
    return false;
}


function search(successCB, errorCB, params) {
    var options = params[1] || {}; 
    if (!options.filter) {
        return getAll(successCB, errorCB, params);
    }
    var filterBy = [];
    // filter and translate fields
    for (var i=0; i < params[0].length; i++) {
        var searchField = params[0][i];
        var mozField = getMozSearchField(mozContactSearchFields, searchField);
        if (searchField === 'name') {
            // Cordova uses name for search by all name fields.
            filterBy.push('givenName');
            filterBy.push('familyName');
            continue;
        } 
        if (searchField === 'displayName' && 'init' in new mozContact()) {
            // ``init`` in ``mozContact`` indicates FFOS version 1.2 or below
            console.log('FFOS ContactProxy: Unable to search by displayName on FFOS 1.2');
            continue;
        } 
        if (mozField) {
            filterBy.push(mozField);
        } else {
            console.log('FXOS ContactProxy: inallowed field passed to search filtered out: ' + searchField);
        }
    }

    var mozOptions = {filterBy: filterBy, filterOp: 'startsWith'};
    if (!options.multiple) {
        mozOptions.filterLimit = 1;
    }
    mozOptions.filterValue = options.filter;
    var request = navigator.mozContacts.find(mozOptions);
    request.onsuccess = function() {
        var contacts = [];
        var mozContacts = request.result;
        var moz = mozContacts[0];
        for (var i=0; i < mozContacts.length; i++) {
            contacts.push(createCordovaFromMozilla(mozContacts[i]));
        }
        successCB(contacts);
    };
    request.onerror = errorCB;
}


/* navigator.mozContacts.find has issues - using getAll 
 * https://bugzilla.mozilla.org/show_bug.cgi?id=941008
 */
function getAll(successCB, errorCB, params) {
    // [contactField, eventualMozContactField]
    var getall = navigator.mozContacts.getAll({});
    var contacts = [];

    getall.onsuccess = function() {
        if (getall.result) {
            contacts.push(createCordovaFromMozilla(getall.result));
            getall.continue();
        } else {
            successCB(contacts);
        }
    };
    getall.onerror = errorCB;
}

module.exports = {
    save: saveContacts,
    remove: remove,
    search: search
};    
    
require("cordova/firefoxos/commandProxy").add("Contacts", module.exports); 
