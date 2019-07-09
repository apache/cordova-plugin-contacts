const { join } = require('path'); // added by Ines & Sandra
const { config } = require('./wdio.shared.conf');
// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // The defaults you need to have in your config
        platformName: 'Android',
        deviceName: 'Android',
        app: join(process.cwd(), 'apps/Contacts_Sample_App.apk'), // Path to your native app
        // appPackage: 'com.outsystems.android', // Path to your app package
        // appActivity: 'com.outsystems.android.SplashScreenActivity', // Path to your activity
        chromedriver: join(process.cwd(), 'chromedriver/chromedriver.exe'),
        noReset: true
    },
];

exports.config = config;
