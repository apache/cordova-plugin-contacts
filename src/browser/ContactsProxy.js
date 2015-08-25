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
var ContactField = require('./ContactField');
var ContactAddress = require('./ContactAddress');
var ContactName = require('./ContactName');

function remove(successCB, errorCB, ids) {
    var saved = JSON.parse(sessionStorage['cordova-browser.cordova-plugin-contacts']);

    for (i = 0; i < saved.length; i++) {
        if (saved[i].id == ids[0]) {
            saved.splice(i, 1);
        }
    }

    sessionStorage['cordova-browser.cordova-plugin-contacts'] = JSON.stringify(saved);
    if (successCB) successCB();
}

function saveContacts(successCB, errorCB, contacts) {
    var saved = JSON.parse(sessionStorage['cordova-browser.cordova-plugin-contacts']);

    for (i = 0; i < contacts.length; i++) {
        contacts[i].id = 'cid' + sessionStorage.contactId;
        saved.push(contacts[i]);
        sessionStorage.contactId = Number(sessionStorage.contactId) + 1;
    }

    sessionStorage['cordova-browser.cordova-plugin-contacts'] = JSON.stringify(saved);
    if (successCB) successCB(contacts);
}

function search(successCB, errorCB, params) {
    var saved = JSON.parse(sessionStorage['cordova-browser.cordova-plugin-contacts']);

    if (saved.length !== 0 && !params[1].filter) {
        return getAllContacts(successCB);
    }

    var contacts = [];

    for (i = 0; i < saved.length; i++) {
        var contact = saved[i];

        for (j = 0; j < params[0].length; j++) {
            if (params[0][j] == 'name') {
                var fullName = contact[params[0][j]].givenName + ' ' + contact[params[0][j]].familyName;

                if (fullName.indexOf(params[1].filter) != -1) {
                    contacts.push(contact);
                    break;
                }
            } else {
                if (contact[params[0][j]].indexOf(params[1].filter) != -1) {
                    contacts.push(contact);
                    break;
                }
            }
        }
    }

    successCB(contacts);
}

function getAllContacts(successCB) {
    var contacts = [];
    var saved = JSON.parse(sessionStorage['cordova-browser.cordova-plugin-contacts']);

    for (i = 0; i < saved.length; i++) {
        contacts.push(saved[i]);
    }

    successCB(contacts);
}

sessionStorage.contactId = 0;
sessionStorage['cordova-browser.cordova-plugin-contacts'] = JSON.stringify([]);

module.exports = {
    remove: remove,
    save: saveContacts,
    search: search
};

require('cordova/exec/proxy').add('Contacts', module.exports);
