# OutSystems Appium Tests Framework

References:
https://github.com/webdriverio/appium-boilerplate

https://github.com/igniteram/appium-webdriverio-typescript

https://medium.com/the-web-tub/testing-cordova-apps-with-appium-2b3b236e026b

# Setup
1. Have Appium installed
1. Run npm install to get the required dependencies

# Run Tests locally

To run the tests:
1. Start Appium server
    * either by using the command line or launching the server with the appium desktop application
    * have a device connected or emulator available
2. Run the command `npm run android`

After the tests run, you can then generate a report with allure:

`npm run report`

The generated report will be located in the **_allure-report_** folder


# AWS Device Farm

To run the tests in the device farm follow the steps: 
1. create a run in aws
1. upload your application (either _.ipa_ or _.apk_). Hit Next.
1. upload the test bundle
    * run the command `npm run bundleAws` and upload the generated `awsTests.zip` file.  
    * Hit Next.
1. use the contents of the [/awsAndroid.yml](awsConfiguration.yml) file for the script configuration
