# Rabotest
Short assignment at Rabobank


# Setup
* Run npm install
* Run bower install
* Run gulp

#Testing
in two different processes, after the app is running.

Run

    webdriver-manager start
    
and 
    
    protractor tests/e2e/protractor-conf.js
    
in that order.

Reports are visible on the following folder

    test/e2e/reports