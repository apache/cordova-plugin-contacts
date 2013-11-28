cordova-plugin-contacts
--------------------------------
To install this plugin, follow the [Command-line Interface Guide](http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html#The%20Command-line%20Interface).

If you are not using the Cordova Command-line Interface, follow [Using Plugman to Manage Plugins](http://cordova.apache.org/docs/en/edge/plugin_ref_plugman.md.html).

## Using Contacts in Firefox OS

Edit manifest.webapp and add permissions field as described in [Manifest Docs](https://developer.mozilla.org/en-US/Apps/Developing/Manifest#permissions).
There is also a need to change the webapp type to "privileged"  - [Manifest Docs](https://developer.mozilla.org/en-US/Apps/Developing/Manifest#type).
All privileged apps enforce [Content Security Policy](https://developer.mozilla.org/en-US/Apps/CSP) which forbids inline script. Initialize your application in another way.
