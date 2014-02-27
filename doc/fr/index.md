<!---
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
-->

# org.apache.cordova.contacts

Donne accès à la base de données de contacts de dispositif.

**Avertissement**: collecte et utilisation des données de contact soulève des questions importantes de la vie privée. La politique de confidentialité de votre application doit examiner comment l'application utilise les données de contact et si elles sont partagées avec d'autres parties. Les information de contact sont considérés comme sensibles parce qu'elles révèlent les gens avec lesquels une personne communique. Par conséquent, en plus de la politique de confidentialité de l'application, vous devez envisager fortement fournissant un avis juste-à-temps, avant que l'application accède ou utilise des données de contact, si le système d'exploitation de périphérique ne fait donc pas déjà. Cet avis doit fournir les mêmes renseignements mentionnés précédemment, ainsi qu'obtenir l'autorisation de l'utilisateur (par exemple, en présentant des choix **OK** et **Non merci**). Notez que certains marchés app peuvent exiger l'application de fournir un avis juste-à-temps et obtenir la permission de l'utilisateur avant d'accéder à des données de contact. Une expérience utilisateur claire et facile à comprendre qui entourent l'utilisation de données permettent d'éviter la confusion des utilisateurs de contact et une utilisation jugée abusive des données de contact. Pour plus d'informations, consultez le Guide de la vie privée.

## Installation

    cordova plugin add org.apache.cordova.contacts
    

### Firefox OS Quirks

Créez **www/manifest.webapp** comme décrit dans [Les Docs manifeste][1]. Ajouter permisions pertinentes. Il est également nécessaire de changer le type d'application Web de « privilégiés » - [Docs manifeste][2]. **Avertissement**: toutes les applications privilégiées appliquer [Contenu politique de sécurité][3] qui interdit à un script inline. Initialiser votre application d'une autre manière.

 [1]: https://developer.mozilla.org/en-US/Apps/Developing/Manifest
 [2]: https://developer.mozilla.org/en-US/Apps/Developing/Manifest#type
 [3]: https://developer.mozilla.org/en-US/Apps/CSP

    "type": "privileged",
    "permissions": {
        "contacts": {
            "access": "readwrite",
            "description": "Describe why there is a need for such permission"
        }
    }
    

## Navigator.contacts

### Méthodes

*   navigator.contacts.create
*   navigator.contacts.find

### Objets

*   Contact
*   ContactName
*   ContactField
*   ContactAddress
*   ContactOrganization
*   ContactFindOptions
*   ContactError

## Navigator.contacts.Create

La `navigator.contacts.create` méthode est synchrone et retourne un nouveau `Contact` objet.

Cette méthode ne conserve pas l'objet Contact dans la base de données des contacts de l'appareil, pour lesquels il faut appeler la méthode `Contact.save`.

### Plates-formes prises en charge

*   Android
*   BlackBerry 10
*   Firefox OS
*   iOS
*   Windows Phone 7 et 8

### Exemple

    var myContact = navigator.contacts.create({"displayName": "Test User"});
    

## navigator.contacts.find

La `navigator.contacts.find` méthode s'exécute de façon asynchrone, l'interrogation de la base de données de contacts de dispositif et retourne un tableau de `Contact` objets. Les objets retournés sont passés à la fonction de callback `contactSuccess` spécifiée par le paramètre **contactSuccess** .

Le paramètre **contactFields** spécifie les champs à utiliser comme un qualificateur de recherche, et seulement ces résultats sont passés à la fonction de callback **contactSuccess**. Un paramètre de longueur nulle **contactFields** n'est pas valide et provoque une erreur `ContactError.INVALID_ARGUMENT_ERROR`. Une valeur de **contactFields** de `"*"` retourne les champs de tout contact.

La chaîne **contactFindOptions.filter** peut être utilisée comme un filtre de recherche lorsque vous interrogez la base de données de contacts. Si fourni, une valeur insensible à la casse et partiellement correspondante est appliquée à chaque champ spécifié dans le paramètre **contactFields**. S'il y a une correspondance pour *n'importe lequel* des champs spécifiés, le contact est retourné.

### Paramètres

*   **contactFields** : champs du Contact à utiliser comme un qualificateur de recherche. L'objet `Contact` retourné dispose seulement des valeurs pour ces champs. *(DOMString[])* [Obligatoire]

*   **contactSuccess**: fonction de rappel de succès avec le tableau d'objets Contact appelée retournée par la base de données. [Obligatoire]

*   **contactError** : fonction de callback d'erreur, appelée lorsqu'une erreur se produit. [Facultatif]

*   **contactFindOptions**: recherche d'options pour filtrer navigator.contacts. [Facultatif] Clés incluent :
    
    *   **filtre**: la chaîne de recherche utilisée pour trouver navigator.contacts. *(DOMString)* (Par défaut :`""`)
    
    *   **multiples**: détermine si l'opération find retourne plusieurs navigator.contacts. *(Booléen)* (Par défaut :`false`)

### Plates-formes prises en charge

*   Android
*   BlackBerry 10
*   Firefox OS
*   iOS
*   Windows Phone 7 et 8
*   Windows 8

### Exemple

    function onSuccess(contacts) {
        alert('Found ' + navigator.contacts.length + ' navigator.contacts.');
    };
    
    function onError(contactError) {
        alert('onError!');
    };
    
    // find all contacts with 'Bob' in any name field
    var options      = new ContactFindOptions();
    options.filter   = "Bob";
    options.multiple = true;
    var fields       = ["displayName", "name"];
    navigator.contacts.find(fields, onSuccess, onError, options);
    

## Contact

L'objet `Contact` représente un contact de l'utilisateur. Des contacts peuvent être créés, stockés ou supprimés de la base de données de contacts de l'appareil. Contacts peuvent également être récupérées (individuellement ou en vrac) de la base de données en appelant le `navigator.contacts.find` méthode.

**NOTE**: tous les champs de contact susmentionnés ne sont pris en charge sur chaque plate-forme de périphérique. S'il vous plaît vérifier la section *bizarreries* de chaque plate-forme pour plus de détails.

### Propriétés

*   **id** : un identifiant globalement unique. *(DOMString)*

*   **displayName**: le nom de ce Contact, approprié pour l'affichage à l'utilisateur final. *(DOMString)*

*   **name** : un objet contenant tous les composants du nom de la personne. *(ContactName)*

*   **nickname** : un nom occasionnel se référant au contact. *(DOMString)*

*   **phoneNumbers** : un tableau des numéros de téléphone du contact. *(ContactField[])*

*   **emails** : un tableau des adresses email du contact. *(ContactField[])*

*   **addresses** : un tableau contenant toutes les adresses du contact. *(ContactAddress[])*

*   **ims** : un tableau contenant les adresses de messagerie instantanée du contact. *(ContactField[])*

*   **organizations** : un tableau contenant les organismes liés au contact. *(ContactOrganization[])*

*   **birthday** : la date d'anniversaire du contact. *(Date)*

*   **note** : une remarque à propos du contact. *(DOMString)*

*   **photos** : un tableau de photos du contact. *(ContactField[])*

*   **categories** : un tableau de toutes les catégories définies par l'utilisateur attribuées au contact. *(ContactField[])*

*   **urls** : un tableau d'adresses Web attribuées au contact. *(ContactField[])*

### Méthodes

*   **clone** : retourne un nouvel objet `Contact`, copie récursive de l'objet cloné, sa propriété `id` vaudra cependant `null`.

*   **remove** : supprime le contact de la base de données de contacts de l'appareil, sinon exécute une fonction callback d'erreur en lui passant un objet `ContactError`.

*   **save** : enregistre un nouveau contact dans la base de données de contacts de l'appareil, ou met à jour un contact existant si un contact avec le même **id** existe déjà.

### Plates-formes prises en charge

*   Amazon Fire OS
*   Android
*   BlackBerry 10
*   Firefox OS
*   iOS
*   Windows Phone 7 et 8
*   Windows 8

### Enregistrez l'exemple

    function onSuccess(contact) {
        alert("Save Success");
    };
    
    function onError(contactError) {
        alert("Error = " + contactError.code);
    };
    
    // create a new contact object
    var contact = navigator.contacts.create();
    contact.displayName = "Plumber";
    contact.nickname = "Plumber";            // specify both to support all devices
    
    // populate some fields
    var name = new ContactName();
    name.givenName = "Jane";
    name.familyName = "Doe";
    contact.name = name;
    
    // save to device
    contact.save(onSuccess,onError);
    

### Exemple de clone

        // clone the contact object
        var clone = contact.clone();
        clone.name.givenName = "John";
        console.log("Original contact name = " + contact.name.givenName);
        console.log("Cloned contact name = " + clone.name.givenName);
    

### Supprimer l'exemple

    function onSuccess() {
        alert("Removal Success");
    };
    
    function onError(contactError) {
        alert("Error = " + contactError.code);
    };
    
        // remove the contact from the device
        contact.remove(onSuccess,onError);
    

### Notes au sujet d'Android 2.X

*   **categories** : non pris en charge sur les périphériques Android 2.X, valeur `null`.

### BlackBerry 10 Quirks

*   **id** : supporté, attribué par l'appareil lors de l'enregistrement du contact.

*   **displayName** : supporté, stocké dans le champ BlackBerry **user1**.

*   **nickname** : pas pris en charge, valeur `null`.

*   **phoneNumbers** : partiellement pris en charge. Les numéros de téléphone sont enregistrés dans les champs BlackBerry **homePhone1** et **homePhone2** si le *type* est 'home', **workPhone1** et **workPhone2** si le *type* est 'work', **mobilePhone** si le *type* est 'mobile', **faxPhone** si le *type* est 'fax', **pagerPhone** si le *type* est 'pager' et **otherPhone** si le *type* n'est aucun de ceux listés.

*   **emails** : partiellement pris en charge. Les trois premières adresses sont stockées respectivement dans les champs BlackBerry **email1**, **email2**et **email3**.

*   **addresses** : partiellement pris en charge. La première et la deuxième adresse sont stockées respectivement dans les champs BlackBerry **homeAddress** et **workAddress**.

*   **ims** : pas supporté, valeur `null`.

*   **organizations** : partiellement pris en charge. Les propriétés **name** et **title** du premier organisme sont stockées respectivement dans les champs BlackBerry **company** et **title**.

*   **photos** : partiellement pris en charge. Seule une miniature est supportée. Pour définir la photo d'un contact, passez soit une image encodée en base64, soit une URL pointant vers l'image souhaitée. L'image sera réduite avant d'être enregistrée dans la base de données de contacts BlackBerry. La photo du contact sera ensuite retournée en tant qu'image encodée en base64.

*   **categories** : partiellement pris en charge. Seules les catégories *Business* et *Personal* sont supportées.

*   **urls** : partiellement pris en charge. La première URL est stockée dans le champ BlackBerry **webpage**.

### Bizarreries de FirefoxOS

*   **catégories**: partiellement pris en charge. Champs **pref** et **type** sont de retour`null`

*   **IMS**: non pris en charge

*   **photos**: ne pas pris en charge

### iOS Quirks

*   **displayName** : pas pris en charge, valeur `null` à moins qu'il n'y ait aucun `ContactName` spécifié, auquel cas, renvoie le nom composite : **nickname** ou `""`.

*   **birthday** : doit être un object `Date` JavaScript, il sera aussi retourné en tant que tel.

*   **photos** : renvoie une URL de fichier de l'image stockée dans le répertoire temporaire de l'application. Le contenu de ce dernier est supprimé lorsque l'application est fermée.

*   **categories** : cette propriété n'est actuellement pas supportée, valeur `null`.

### Windows Phone 7 et 8 Quirks

*   **displayName** : lorsqu'un contact est créé, la valeur fournie pour le paramètre de nom d'affichage est différente de celle récupérée lors de la récupération ultérieure du contact.

*   **URL**: lorsque vous créez un contact, les utilisateurs peuvent entrer et enregistrer plus d'une adresse web, mais seulement un est disponible lors de la recherche du contact.

*   **phoneNumbers** : l'option *pref* n'est pas prise en charge. Le *type* n'est pas supporté lors d'un appel à *find*. Seul `phoneNumber` est autorisé pour chaque *type*.

*   **emails** : l'option *pref* n'est pas prise en charge. Maison et personnel font référence à la même entrée d'email. Une seule entrée est autorisée pour chaque *type*.

*   **addresses** : prend en charge seulement les *type*s travail et maison/personnel. Les *type*s maison et personnel font référence à la même entrée d'adresse. Une seule entrée est autorisée pour chaque *type*.

*   **organizations** : une seule entrée autorisée, les attributs *pref*, *type* et *department* ne sont pas supportés.

*   **note** : pas pris en charge, valeur `null`.

*   **IMS**: ne pas pris en charge, retour`null`.

*   **birthdays** : pas pris en charge, valeur `null`.

*   **categories** : pas pris en charge, valeur `null`.

## ContactAddress

L'objet `ContactAddress` stocke les propriétés d'une seule adresse d'un contact. Un objet `Contact` peut inclure plusieurs adresses dans un tableau `ContactAddress[]`.

### Propriétés

*   **pref** : la valeur `true` si `ContactAddress` contient la valeur de préférence de l'utilisateur. *(booléen)*

*   **type** : une chaîne qui indique le type de champ, *maison* par exemple. *(DOMString)*

*   **formatted** : l'adresse complète formattée pour l'affichage. *(DOMString)*

*   **streetAddress** : l'adresse complète. *(DOMString)*

*   **locality** : la ville ou la localité. *(DOMString)*

*   **region** : l'État ou la région. *(DOMString)*

*   **postalCode** : le code zip ou code postal. *(DOMString)*

*   **country** : le nom du pays. *(DOMString)*

### Plates-formes prises en charge

*   Amazon Fire OS
*   Android
*   BlackBerry 10
*   Firefox OS
*   iOS
*   Windows Phone 7 et 8
*   Windows 8

### Exemple

    // display the address information for all contacts
    
    function onSuccess(contacts) {
        for (var i = 0; i < navigator.contacts.length; i++) {
            for (var j = 0; j < contacts[i].addresses.length; j++) {
                alert("Pref: "         + contacts[i].addresses[j].pref          + "\n" +
                    "Type: "           + contacts[i].addresses[j].type          + "\n" +
                    "Formatted: "      + contacts[i].addresses[j].formatted     + "\n" +
                    "Street Address: " + contacts[i].addresses[j].streetAddress + "\n" +
                    "Locality: "       + contacts[i].addresses[j].locality      + "\n" +
                    "Region: "         + contacts[i].addresses[j].region        + "\n" +
                    "Postal Code: "    + contacts[i].addresses[j].postalCode    + "\n" +
                    "Country: "        + contacts[i].addresses[j].country);
            }
        }
    };
    
    function onError(contactError) {
        alert('onError!');
    };
    
    // find all contacts
    var options = new ContactFindOptions();
    options.filter = "";
    var filter = ["displayName", "addresses"];
    navigator.contacts.find(filter, onSuccess, onError, options);
    

### Android 2.X Quirks

*   **pref** : non pris en charge, retourne `false` sur les appareils Android 2.X.

### BlackBerry 10 Quirks

*   **pref** : non pris en charge sur les appareils BlackBerry, retourne `false`.

*   **type** : partiellement pris en charge. Seulement un des types d'adresse *Work* et *Home* peut être stocké par contact.

*   **formatted** : partiellement pris en charge. Retourne la concaténation de tous les champs d'adresse BlackBerry.

*   **streetAddress** : pris en charge. Retourne la concaténation des champs d'adresse BlackBerry **address1** et **address2**.

*   **locality** : prise en charge. Stockée dans le champ d'adresse BlackBerry **city** .

*   **region** : pris en charge. Stockée dans le champ d'adresse BlackBerry **stateProvince** .

*   **postalCode** : prise en charge. Stockée dans le champ d'adresse BlackBerry **zipPostal** .

*   **country** : prise en charge.

### Bizarreries de FirefoxOS

*   **au format**: actuellement ne pas pris en charge

### iOS Quirks

*   **pref** : non pris en charge sur les appareils iOS, retourne `false`.

*   **formatted** : actuellement non pris en charge.

## ContactError

L'objet `ContactError` est retourné à l'utilisateur via la fonction de callback `contactError` lorsqu'une erreur survient.

### Propriétés

*   **code** : l'un des codes d'erreur prédéfinis énumérés ci-dessous.

### Constantes

*   `ContactError.UNKNOWN_ERROR`
*   `ContactError.INVALID_ARGUMENT_ERROR`
*   `ContactError.TIMEOUT_ERROR`
*   `ContactError.PENDING_OPERATION_ERROR`
*   `ContactError.IO_ERROR`
*   `ContactError.NOT_SUPPORTED_ERROR`
*   `ContactError.PERMISSION_DENIED_ERROR`

## ContactField

L'objet `ContactField` est un composant réutilisable que représente un champ de contact générique. Chaque objet `ContactField` contient une propriété `value` , `type` , et `pref`. Un objet `Contact` stocke plusieurs propriétés dans les tableaux `ContactField[]`, tels que les numéros de téléphone et adresses e-mail.

Dans la plupart des cas, il n'y a pas de valeurs prédéterminées pour un attribut **type** de l'objet `ContactField`. Par exemple, un numéro de téléphone peut spécifier des valeurs pour **type** comme *home*, *work*, *mobile*, *iPhone*, ou toute autre valeur qui est prise en charge par la base de contacts de la plate-forme d'un appareil particulier. Toutefois, pour le champ **photos** de `Contact` , le champ **type** indique le format de l'image retournée : **url** lorsque l'attribut **value** contient une URL vers la photo ou *base64* lorsque la **valeur** contient une chaîne d'image codée en base64. 

### Propriétés

*   **type** : une chaîne qui indique le type de champ, *home* par exemple. *(DOMString)*

*   **value** : la valeur du champ, comme un téléphone numéro ou adresse e-mail. *(DOMString)*

*   **pref** : la valeur `true` si `ContactField` contient la valeur de préférence de l'utilisateur. *(booléen)*

### Plates-formes prises en charge

*   Amazon Fire OS
*   Android
*   BlackBerry 10
*   Firefox OS
*   iOS
*   Windows Phone 7 et 8
*   Windows 8

### Exemple

        // create a new contact
        var contact = navigator.contacts.create();
    
        // store contact phone numbers in ContactField[]
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', '212-555-1234', false);
        phoneNumbers[1] = new ContactField('mobile', '917-555-5432', true); // preferred number
        phoneNumbers[2] = new ContactField('home', '203-555-7890', false);
        contact.phoneNumbers = phoneNumbers;
    
        // save the contact
        contact.save();
    

### Quirks Android

*   **pref** : nonpas pris en charge, retourne `false`.

### BlackBerry 10 Quirks

*   **type** : partiellement pris en charge. Utilisé pour les numéros de téléphone.

*   **valeur** : pris en charge.

*   **pref**: ne pas pris en charge, retour`false`.

### iOS Quirks

*   **pref**: ne pas pris en charge, retour`false`.

## ContactName

Contient différents types d'informations sur le nom d'un objet `Contact`.

### Propriétés

*   **mise en forme** : le nom complet du contact. *(DOMString)*

*   **familyName** : nom de famille du contact. *(DOMString)*

*   **givenName** : prénom du contact. *(DOMString)*

*   **middleName** : deuxième prénom du contact. *(DOMString)*

*   **honorificPrefix** : préfixe du contact (exemple *M.* ou *Mme*) *(DOMString)*

*   **honorificSuffix** : suffixe du contact (exemple *Esq.*). *(DOMString)*

### Plates-formes prises en charge

*   Amazon Fire OS
*   Android 2.X
*   BlackBerry 10
*   Firefox OS
*   iOS
*   Windows Phone 7 et 8
*   Windows 8

### Exemple

    function onSuccess(contacts) {
        for (var i = 0; i < navigator.contacts.length; i++) {
            alert("Formatted: "  + contacts[i].name.formatted       + "\n" +
                "Family Name: "  + contacts[i].name.familyName      + "\n" +
                "Given Name: "   + contacts[i].name.givenName       + "\n" +
                "Middle Name: "  + contacts[i].name.middleName      + "\n" +
                "Suffix: "       + contacts[i].name.honorificSuffix + "\n" +
                "Prefix: "       + contacts[i].name.honorificSuffix);
        }
    };
    
    function onError(contactError) {
        alert('onError!');
    };
    
    var options = new ContactFindOptions();
    options.filter = "";
    filter = ["displayName", "name"];
    navigator.contacts.find(filter, onSuccess, onError, options);
    

### Quirks Android

*   **formatted** : partiellement pris en charge et en lecture seule. Retourne la concaténation de `honorificPrefix` , `givenName` , `middleName` , `familyName` , et `honorificSuffix`.

### BlackBerry 10 Quirks

*   **formatted** : partiellement pris en charge. Retourne la concaténation de champs **firstName** et **lastName** de BlackBerry.

*   **familyName** : prise en charge. Stockée dans le champ **lastName** BlackBerry.

*   **givenName** : prise en charge. Stockée dans le champ **firstName** BlackBerry.

*   **middleName** : non pris en charge, retourne `null`.

*   **honorificPrefix** : non pris en charge, retourne `null`.

*   **honorificSuffix** : non pris en charge, retourne `null`.

### Bizarreries de FirefoxOS

*   **au format**: partiellement pris en charge et en lecture seule. Retourne la concaténation de `honorificPrefix` , `givenName` , `middleName` , `familyName` , et`honorificSuffix`.

### iOS Quirks

*   **formatted** : partiellement pris en charge. Retourne le nom composé iOS, mais est en lecture seule.

## ContactOrganization

L'objet `ContactOrganization` stocke des propriétés de l'entreprise d'un contact. Un objet `Contact` contient un ou plusieurs objets `ContactOrganization` dans un tableau.

### Propriétés

*   **pref** : fixé à `true` si `ContactOrganization` contient la valeur préférée de l'utilisateur. *(booléen)*

*   **type** : une chaîne qui indique le type de champ, *home* par exemple. _(DOMString)

*   **name** : le nom de l'organisation. *(DOMString)*

*   **department** : le département pour lequel travaille le contact. *(DOMString)*

*   **title** : titre du contact au sein de l'organisation. *(DOMString)*

### Plates-formes prises en charge

*   Android
*   BlackBerry 10
*   Firefox OS
*   iOS
*   Windows Phone 7 et 8
*   Windows 8

### Exemple

    function onSuccess(contacts) {
        for (var i = 0; i < navigator.contacts.length; i++) {
            for (var j = 0; j < contacts[i].organizations.length; j++) {
                alert("Pref: "      + contacts[i].organizations[j].pref       + "\n" +
                    "Type: "        + contacts[i].organizations[j].type       + "\n" +
                    "Name: "        + contacts[i].organizations[j].name       + "\n" +
                    "Department: "  + contacts[i].organizations[j].department + "\n" +
                    "Title: "       + contacts[i].organizations[j].title);
            }
        }
    };
    
    function onError(contactError) {
        alert('onError!');
    };
    
    var options = new ContactFindOptions();
    options.filter = "";
    filter = ["displayName", "organizations"];
    navigator.contacts.find(filter, onSuccess, onError, options);
    

### Android 2.X Quirks

*   **pref** : non pris en charge par des appareils Android 2.X, retourne `false`.

### BlackBerry 10 Quirks

*   **pref** : non pris en charge par les appareils BlackBerry, retourne `false`.

*   **type**: non pris en charge par les appareils BlackBerry, retourne `null`.

*   **name** : partiellement pris en charge. Le premier nom de l'entreprise est stocké dans le champ **company** de BlackBerry.

*   **department** : non pris en charge, retourne `null`.

*   **title** : partiellement pris en charge. Le premier titre de l'entreprise est stocké dans le champ de **jobTitle** BlackBerry.

### Firefox OS Quirks

*   **pref**: non pris en charge

*   **type**: non pris en charge

*   **Département**: non pris en charge

*   Les champs **nom** et **titre** stocké dans **org** et **jobTitle**.

### iOS Quirks

*   **pref**: non pris en charge sur les appareils iOS, retour`false`.

*   **type** : non pris en charge sur les appareils iOS, retourne `null`.

*   **name** : partiellement pris en charge. Le premier nom de l'entreprise est stocké dans le champ de **kABPersonOrganizationProperty** iOS.

*   **department** : partiellement pris en charge. Le premier nom de département est stocké dans le champ de **kABPersonDepartmentProperty** iOS.

*   **title** : partiellement pris en charge. Le premier titre est stocké dans le champ **kABPersonJobTitleProperty** iOS.