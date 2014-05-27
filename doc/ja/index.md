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

Provides access to the device contacts database.

**警告**: 連絡先データの収集と利用を重要なプライバシーの問題を発生させます。 アプリのプライバシー ポリシー アプリが連絡先データを使用する方法と、他の当事者では共有されているかどうかを話し合う必要があります。 人誰と通信する人々 を明らかにするために、連絡先情報が機密と見なされます。 したがって、アプリのプライバシー ポリシーに加えて、強くする必要がありますデバイスのオペレーティング システムが既にしない場合アプリにアクセスまたは連絡先のデータを使用する前に - 時間のお知らせを提供します。 その通知は、上記の (例えば、 **[ok]**を**おかげで**選択肢を提示する) によってユーザーのアクセス許可を取得するだけでなく、同じ情報を提供する必要があります。 いくつかのアプリのマーケットプ レース - 時間の通知を提供して、連絡先データにアクセスする前にユーザーの許可を取得するアプリをする必要がありますに注意してください。 連絡先データは、ユーザーの混乱を避けるのに役立ちますの使用および連絡先データの知覚の誤用を囲む明確でわかりやすいユーザー エクスペリエンス。 詳細については、プライバシーに関するガイドを参照してください。

## インストール

    cordova plugin add org.apache.cordova.contacts
    

### Firefox OS Quirks

Create **www/manifest.webapp** as described in [Manifest Docs][1]. Add relevant permisions. There is also a need to change the webapp type to "privileged" - [Manifest Docs][2]. **WARNING**: All privileged apps enforce [Content Security Policy][3] which forbids inline script. Initialize your application in another way.

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
    

## navigator.contacts

### メソッド

*   navigator.contacts.create
*   navigator.contacts.find

### オブジェクト

*   お問い合わせ
*   得意先コード
*   ContactField
*   ContactAddress
*   ContactOrganization
*   ContactFindOptions
*   ContactError

## navigator.contacts.create

The `navigator.contacts.create` method is synchronous, and returns a new `Contact` object.

このメソッドを呼び出す必要があるデバイスの連絡先データベースに連絡先オブジェクトを保持しない、 `Contact.save` メソッド。

### サポートされているプラットフォーム

*   アンドロイド
*   ブラックベリー 10
*   Firefox OS
*   iOS
*   Windows Phone 7 と 8
*   Windows 8 ( Note: Windows 8 Contacts are readonly via the Cordova API Contacts are not queryable/searchable, you should inform the user to pick a contact as a call to contacts.find will open the 'People' app where the user must choose a contact. 戻される連絡先は読み取り専用、アプリケーションを変更することはできません。 )

### 例

    var myContact = navigator.contacts.create({"displayName": "Test User"});
    

## navigator.contacts.find

The `navigator.contacts.find` method executes asynchronously, querying the device contacts database and returning an array of `Contact` objects. 結果として得られるオブジェクトに渡される、 `contactSuccess` 、 **contactSuccess**パラメーターで指定されたコールバック関数。

**連絡先**パラメーター検索の修飾子として使用するフィールドを指定してだけこれらの結果は**contactSuccess**コールバック関数に渡されます。 **連絡先**のゼロ長さのパラメーターが無効である結果 `ContactError.INVALID_ARGUMENT_ERROR` 。 **連絡先**値 `"*"` すべての連絡先フィールドを返します。

**ContactFindOptions.filter**文字列の連絡先データベースを照会するときに検索フィルターとして使用できます。 指定した場合、大文字と小文字、部分的な値の一致する**連絡先**パラメーターで指定されたフィールドごとに適用されます。 一致する*任意*指定のフィールドがある場合は、連絡先が返されます。

### パラメーター

*   **連絡先**: 連絡先検索修飾子として使用するフィールド。結果として `Contact` オブジェクトのみ機能のこれらのフィールドの値。*(DOMString[])*[必須]

*   **contactSuccess**: Success callback function invoked with the array of Contact objects returned from the database. [Required]

*   **contactError**: エラー コールバック関数は、エラーが発生したときに呼び出されます。[オプション]

*   **contactFindOptions**: Search options to filter navigator.contacts. [Optional] Keys include:

*   **フィルター**: navigator.contacts の検索に使用する検索文字列。*（，）*(既定値します。`""`)

*   **multiple**: Determines if the find operation returns multiple navigator.contacts. *(Boolean)* (Default: `false`)

### サポートされているプラットフォーム

*   アンドロイド
*   ブラックベリー 10
*   Firefox OS
*   iOS
*   Windows Phone 7 と 8
*   Windows 8 ( read-only support, search requires user interaction, contactFields are ignored, only contactFindOptions.multiple is used to enable the user to select 1 or many contacts. )

### 例

    function onSuccess(contacts) {
        alert('Found ' + contacts.length + ' contacts.');
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
    

## お問い合わせ

`Contact`オブジェクトは、ユーザーの連絡先を表します。 連絡先の作成、格納、またはデバイスの連絡先データベースから削除することができます。 Contacts can also be retrieved (individually or in bulk) from the database by invoking the `navigator.contacts.find` method.

**注**: すべて上記の連絡先フィールドのすべてのデバイス プラットフォームでサポートされます。詳細については各プラットフォームの*互換*セクションを確認してください。

### プロパティ

*   **id**： グローバルに一意の識別子。*（，）*

*   **displayName**: エンド ・ ユーザーへの表示に適した、この連絡先の名前。*（，）*

*   **名前**： 人の名前のすべてのコンポーネントを格納するオブジェクト。*(ContactName)*

*   **ニックネーム**: 連絡先のアドレスに使用するカジュアルな名前。*（，）*

*   **電話番号**: 連絡先の電話番号の配列。*(ContactField[])*

*   **メール**： 連絡先の電子メール アドレスの配列。*(ContactField[])*

*   **アドレス**: 連絡先のアドレスの配列。*(ContactAddress[])*

*   **ims**： 連絡先の IM アドレスの配列。*(ContactField[])*

*   **組織**: 連絡先の組織の配列。*(ContactOrganization[])*

*   **誕生日**: 連絡先の誕生日。*（日）*

*   **注**: 連絡先についてのメモ。*（，）*

*   **写真**: 連絡先の写真の配列。*(ContactField[])*

*   **カテゴリ**: 取引先担当者に関連付けられているすべてのユーザー定義カテゴリの配列。*(ContactField[])*

*   **url**: 取引先担当者に関連付けられている web ページの配列。*(ContactField[])*

### メソッド

*   **クローン**： 新しいを返します `Contact` と呼び出し元のオブジェクトのディープ コピーであるオブジェクトの `id` プロパティに設定`null`.

*   **削除**: デバイスの連絡先データベースから連絡先を削除します、それ以外の場合のためのエラー コールバックを実行する、 `ContactError` オブジェクト。

*   **保存**: デバイスの連絡先データベースに新しい連絡先を保存または同じ**id**を持つ連絡先が既に存在する場合、既存の連絡先を更新します。

### サポートされているプラットフォーム

*   アマゾン火 OS
*   アンドロイド
*   ブラックベリー 10
*   Firefox OS
*   iOS
*   Windows Phone 7 と 8

### Save Example

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
    

### Clone Example

        // clone the contact object
        var clone = contact.clone();
        clone.name.givenName = "John";
        console.log("Original contact name = " + contact.name.givenName);
        console.log("Cloned contact name = " + clone.name.givenName);
    

### Remove Example

    function onSuccess() {
        alert("Removal Success");
    };
    
    function onError(contactError) {
        alert("Error = " + contactError.code);
    };
    
    // remove the contact from the device
    contact.remove(onSuccess,onError);
    

### アンドロイド 2.X 癖

*   **カテゴリ**: 返す 2.X の Android デバイスでサポートされていません`null`.

### ブラックベリー 10 癖

*   **id**: Assigned by the device when saving the contact.

### FirefoxOS Quirks

*   **categories**: Partially supported. Fields **pref** and **type** are returning `null`

*   **ims**: Not supported

*   **photos**: Not supported

### iOS の癖

*   **displayName**: 返す iOS でサポートされていない `null` がない限り、ない `ContactName` 指定すると、その場合は複合名、**ニックネーム**を返しますまたは `""` 、それぞれ。

*   **誕生日**: JavaScript として入力する必要があります `Date` オブジェクト、同じ方法が返されます。

*   **写真**： アプリケーションの一時ディレクトリに格納されているイメージへのファイルの URL を返します。一時ディレクトリの内容は、アプリケーションの終了時に削除されます。

*   **カテゴリ**: このプロパティは現在サポートされていません、返す`null`.

### Windows Phone 7 と 8 癖

*   **displayName**: 表示名パラメーターの表示名と異なるために提供値を取得、連絡先を検索するとき、連絡先を作成するとき。

*   **url**: 連絡先を検索するときに 1 つだけが利用できるが、ユーザーによる入力し 1 つ以上の web アドレスを保存する連絡先を作成するとき。

*   **電話番号**:*県*オプションはサポートされていません。 *型*は、*検索*操作ではサポートされていません。 1 つだけ `phoneNumber` は各*タイプ*の許可.

*   **メール**：*県*オプションはサポートされていません。家庭や個人的なメールと同じエントリを参照します。各*タイプ*の 1 つだけのエントリが許可されて.

*   **アドレス**: 仕事とホーム/パーソナル*タイプ*のみをサポートしています。家庭や個人*型*参照して同じアドレス エントリ。各*タイプ*の 1 つだけのエントリが許可されて.

*   **組織**： 1 つだけが許可され、*県*、*タイプ*、および*部門*の属性をサポートしていません。

*   **注**: サポートされていないを返す`null`.

*   **ims**: サポートされていないを返す`null`.

*   **誕生日**: サポートされていないを返す`null`.

*   **カテゴリ**: サポートされていないを返す`null`.

## ContactAddress

`ContactAddress`オブジェクトの連絡先の 1 つのアドレスのプロパティが格納されます。 A `Contact` オブジェクトで 1 つ以上のアドレスを含めることができます、 `ContactAddress[]` 配列。

### プロパティ

*   **県**: に設定されている `true` 場合は、この `ContactAddress` ユーザーの推奨値が含まれています。*(ブール値)*

*   **タイプ**: たとえばフィールドこれは*ホーム*の種類を示す文字列。*（，）*

*   **書式設定**: 表示用にフォーマットの完全なアドレス。*（，）*

*   **番地**： 完全な住所。*（，）*

*   **局所性**: 都市または場所。*（，）*

*   **地域**: 状態または地域。*（，）*

*   **郵便番号**： 郵便番号または郵便番号。*（，）*

*   **国**: 国の名前。*（，）*

### サポートされているプラットフォーム

*   アマゾン火 OS
*   アンドロイド
*   ブラックベリー 10
*   Firefox OS
*   iOS
*   Windows Phone 7 と 8
*   Windows 8

### 例

    // display the address information for all contacts
    
    function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
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
    

### アンドロイド 2.X 癖

*   **県**: サポートされていない返す `false` 2.X の Android デバイスで。

### ブラックベリー 10 癖

*   **県**： 戻る、BlackBerry デバイスでサポートされていません`false`.

*   **種類**: 部分的にサポートされます。連絡先ごとの 1 つだけ各*仕事*と*家庭*の種類のアドレスを格納できます。

*   **フォーマット**： 部分的にサポートされます。すべての BlackBerry アドレス フィールドの連結を返します。

*   **番地**： サポートされています。ブラックベリーの**住所 1** **住所 2**の連結アドレス フィールドを返します。

*   **局所性**： サポートされています。ブラックベリー**市**アドレス フィールドに格納されます。

*   **地域**: サポートされています。ブラックベリー **stateProvince**アドレス フィールドに格納されます。

*   **郵便番号**： サポートされています。ブラックベリー **zipPostal**アドレス フィールドに格納されます。

*   **国**: サポートされています。

### FirefoxOS Quirks

*   **formatted**: Currently not supported

### iOS の癖

*   **県**: 戻る iOS デバイスでサポートされていません`false`.

*   **フォーマット**: 現在サポートされていません。

### Windows 8 Quirks

*   **pref**: Not supported

## ContactError

`ContactError`オブジェクトを介してユーザーに返されます、 `contactError` コールバック関数でエラーが発生したとき。

### プロパティ

*   **コード**: 次のいずれかの定義済みのエラー コード。

### 定数

*   `ContactError.UNKNOWN_ERROR` (code 0)
*   `ContactError.INVALID_ARGUMENT_ERROR` (code 1)
*   `ContactError.TIMEOUT_ERROR` (code 2)
*   `ContactError.PENDING_OPERATION_ERROR` (code 3)
*   `ContactError.IO_ERROR` (code 4)
*   `ContactError.NOT_SUPPORTED_ERROR` (code 5)
*   `ContactError.PERMISSION_DENIED_ERROR` (code 20)

## ContactField

`ContactField`オブジェクトは連絡先フィールドを総称を表す再利用可能なコンポーネントです。 各 `ContactField` オブジェクトが含まれています、 `value` 、 `type` 、および `pref` プロパティ。 A `Contact` オブジェクトのいくつかのプロパティに格納されます `ContactField[]` 携帯電話番号、メール アドレスなどの配列。

ほとんどの場合、事前に決められた値がない、 `ContactField` オブジェクトの**type**属性。 たとえば、電話番号が*ホーム*、*仕事*、*モバイル*、 *iPhone*、または特定のデバイス プラットフォームの連絡先データベースでサポートされている他の値の**型**の値を指定できます。 ただし、ため、 `Contact` **写真**] フィールドに、**種類**フィールド、返されるイメージの形式を示します: **url** **値**属性**値**を base64 でエンコードされたイメージの文字列が含まれる場合に写真イメージまたは*base64*に URL が含まれる場合。 

### プロパティ

*   **type**: A string that indicates what type of field this is, *home* for example. *(DOMString)*

*   **value**: The value of the field, such as a phone number or email address. *(DOMString)*

*   **pref**: Set to `true` if this `ContactField` contains the user's preferred value. *(boolean)*

### サポートされているプラットフォーム

*   アマゾン火 OS
*   アンドロイド
*   ブラックベリー 10
*   Firefox OS
*   iOS
*   Windows Phone 7 と 8
*   Windows 8

### 例

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
    

### Android の癖

*   **pref**: Not supported, returning `false`.

### ブラックベリー 10 癖

*   **type**: Partially supported. Used for phone numbers.

*   **value**: Supported.

*   **pref**: Not supported, returning `false`.

### iOS の癖

*   **pref**: Not supported, returning `false`.

### Windows8 Quirks

*   **pref**: Not supported, returning `false`.

## 得意先コード

についての異なる種類情報にはが含まれています、 `Contact` オブジェクトの名前。

### プロパティ

*   **formatted**: The complete name of the contact. *(DOMString)*

*   **familyName**: The contact's family name. *(DOMString)*

*   **givenName**: 連絡先の名前。*（，）*

*   **ミドル ネーム**: 連絡先のミドル ネーム。*（，）*

*   **honorificPrefix**: 連絡先のプレフィックス (例*氏*または*博士*) *(，)*

*   **honorificSuffix**: 連絡先のサフィックス (*弁護士*の例)。*（，）*

### サポートされているプラットフォーム

*   アマゾン火 OS
*   アンドロイド 2.X
*   ブラックベリー 10
*   Firefox の OS
*   iOS
*   Windows Phone 7 と 8
*   Windows 8

### 例

    function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
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
    

### Android の癖

*   **フォーマット**： 部分的にサポートされると読み取り専用です。 連結を返します `honorificPrefix` 、 `givenName` 、 `middleName` 、 `familyName` と`honorificSuffix`.

### ブラックベリー 10 癖

*   **フォーマット**： 部分的にサポートされます。ブラックベリー **firstName**と**lastName**フィールドの連結を返します。

*   **familyName**: サポートされています。ブラックベリー **[氏名]**フィールドに格納されます。

*   **givenName**: サポートされています。ブラックベリーの**firstName**フィールドに格納されます。

*   **ミドル ネーム**: サポートされていないを返す`null`.

*   **honorificPrefix**: サポートされていないを返す`null`.

*   **honorificSuffix**: サポートされていないを返す`null`.

### FirefoxOS の癖

*   **フォーマット**： 部分的にサポートされており、読み取り専用です。 連結を返します `honorificPrefix` 、 `givenName` 、 `middleName` 、 `familyName` と`honorificSuffix`.

### iOS の癖

*   **フォーマット**： 部分的にサポートされます。IOS 複合名を返しますが、読み取り専用です。

### Windows 8 の癖

*   **フォーマット**： これは、プロパティの名前し、同じです `displayName` と`nickname`

*   **familyName**: サポートされていません。

*   **givenName**: サポートされていません。

*   **ミドル ネーム**: サポートされていません。

*   **honorificPrefix**: サポートされていません。

*   **honorificSuffix**: サポートされていません。

## ContactOrganization

`ContactOrganization`オブジェクトは、連絡先の組織のプロパティを格納します。A `Contact` 1 つまたは複数のオブジェクトに格納されます `ContactOrganization` 配列内のオブジェクト。

### プロパティ

*   **県**: に設定されている `true` 場合は、この `ContactOrganization` ユーザーの推奨値が含まれています。*(ブール値)*

*   **タイプ**: たとえばフィールドこれは*ホーム*の種類を示す文字列。_(DOMString)

*   **名前**: 組織の名前。*（，）*

*   **部門**: 契約に勤めている部門。*（，）*

*   **タイトル**: 組織の連絡先のタイトル。*（，）*

### サポートされているプラットフォーム

*   アンドロイド
*   ブラックベリー 10
*   Firefox の OS
*   iOS
*   Windows Phone 7 と 8

### 例

    function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
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
    

### アンドロイド 2.X 癖

*   **県**: 返す 2.X の Android デバイスでサポートされていません`false`.

### ブラックベリー 10 癖

*   **県**： 戻る、BlackBerry デバイスでサポートされていません`false`.

*   **タイプ**： 戻る、BlackBerry デバイスでサポートされていません`null`.

*   **名前**： 部分的にサポートされます。最初の組織名は、**会社**のブラックベリーのフィールドに格納されます。

*   **部門**: サポートされていないを返す`null`.

*   **タイトル**: 部分的にサポートされます。組織の最初のタイトルはブラックベリー**氏名**フィールドに格納されます。

### Firefox OS 癖

*   **県**: サポートされていません。

*   **タイプ**: サポートされていません。

*   **部門**: サポートされていません。

*   フィールドの**名前**と**組織**、**氏名**に格納された**タイトル**.

### iOS の癖

*   **県**: 戻る iOS デバイスでサポートされていません`false`.

*   **タイプ**： 戻る iOS デバイスでサポートされていません`null`.

*   **名前**： 部分的にサポートされます。最初の組織名は、iOS **kABPersonOrganizationProperty**フィールドに格納されます。

*   **部門**: 部分的にサポートされます。最初の部署名は iOS **kABPersonDepartmentProperty**フィールドに格納されます。

*   **タイトル**: 部分的にサポートされます。最初のタイトルは、iOS **kABPersonJobTitleProperty**フィールドに格納されます。