const { config } = require('./wdio.shared.conf');
config.capabilities = [
    {
        // Read the reset strategies very well, they differ per platform, see
        // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
        noReset: true
    },
];
