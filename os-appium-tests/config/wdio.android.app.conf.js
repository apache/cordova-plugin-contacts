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
        appPackage: 'com.outsystems.android', // Path to your app package
        appActivity: 'com.outsystems.android.SplashScreenActivity', // Path to your activity
        noReset: true
    },
];

exports.config = config;
