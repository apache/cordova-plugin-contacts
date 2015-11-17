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

var Contact = require('./Contact');
var ContactAddress = require('./ContactAddress');
var ContactError = require('./ContactError');
var ContactField = require('./ContactField');
var ContactName = require('./ContactName');

function remove(successCB, errorCB, id) {
    var saved = _getContacts();

    for (var i = 0; i < saved.length; i++) {
        if (saved[i].id == id[0]) {
            saved.splice(i, 1);
            _saveContacts(saved);

            if (successCB) return successCB(id[0]);
        }
    }

    if (errorCB) return errorCB(ContactError.UNKNOWN_ERROR);
}

function save(successCB, errorCB, contact) {
    var saved = _getContacts();

    for (var i = 0; i < contact.length; i++) {
        var doesExist = false;

        // check if contact already exits, if it does update it
        for (var j = 0; j < saved.length; j++) {
            if (saved[j].id == contact[i].id) {
                saved[j] = contact[i];
                doesExist = true;
                break;
            }
        }

        // contact does not exist
        if (!doesExist) {
            contact[i].id = 'cid' + sessionStorage.contactId;
            saved.push(contact[i]);
            sessionStorage.contactId = Number(sessionStorage.contactId) + 1;
        }

    }

    _saveContacts(saved);
    if (successCB) successCB(contact[0]);
}

function search(successCB, errorCB, params) {
    var saved = _getContacts();

    // if no filter is given, return all contacts
    if (saved.length !== 0 && !params[1].filter) {
        return successCB(_getContacts());
    }

    // return error callback for zero-length contactFields parameter
    if (params[0].length === 0) {
        return errorCB(ContactError.INVALID_ARGUMENT_ERROR);
    }

    // if contactFields value is '*', add all fieldType's to check against filter
    if (params[0][0] == '*') {
        params[0] = [];
        for (var prop in navigator.contacts.fieldType) {
            params[0].push(prop);
        }
    }

    var contacts = [];

    for (var i = 0; i < saved.length; i++) {
        var contact = saved[i];

        for (var j = 0; j < params[0].length; j++) {
            if (params[0][j] == 'name') {
                var fullName = contact[params[0][j]].givenName +
                               contact[params[0][j]].middleName +
                               contact[params[0][j]].familyName;

                if (fullName.toLowerCase().indexOf(params[1].filter.toLowerCase()) != -1) {
                    contacts.push(contact);
                    break;
                }
            } else {
                if (contact[params[0][j]] && contact[params[0][j]].toLowerCase().indexOf(params[1].filter.toLowerCase()) != -1) {
                    contacts.push(contact);
                    break;
                }
            }
        }
    }

    successCB(contacts);
}

function _getContacts() {
    return JSON.parse(sessionStorage['cordova-browser.cordova-plugin-contacts'] || '[]');
}

function _saveContacts(contactsObject) {
    sessionStorage['cordova-browser.cordova-plugin-contacts'] = JSON.stringify(contactsObject);
}

sessionStorage.contactId = 0;

// initialize contacts
_saveContacts(_getContacts());

module.exports = {
    remove: remove,
    save: save,
    search: search
};

require('cordova/exec/proxy').add('Contacts', module.exports);
