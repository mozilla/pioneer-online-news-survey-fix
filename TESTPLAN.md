# Test plan

## Overview

We discovered two issues with the pioneer online news study:
- The survey doorhanger was shown once a day up to three times, even if the 
  user had already clicked through to the survey. This should stop showing 
  once the user clicks to view the survey.
- The study addon does not correctly uninstall itself if the user opts out of
  pioneer or when the study ends.

This addon is a second addon that will be shipped to users participating in 
the study and will be loaded alongside the original one. 

We needed a second 
addon because SHIELD currently does not have a way to update XPIs that have 
already been shipped out.

## Installation

Please install the Firefox Pioneer addon and the Pioneer Online News Study 
addon to test this addon.

## Test Conditions

### Before each test

Before running each test please make sure you create a new clean profile. The 
easiest way is to go to `about:profiles`. More information can be found here:
https://developer.mozilla.org/en-US/Firefox/Multiple_profiles

### Tests to perform

We should run through all the tests listed in the test plan for the online
news study:
https://github.com/mozilla/pioneer-study-online-news/blob/master/TESTPLAN.md

In addition we should perform the following tests:

#### Test that the survey doorhanger is not reshown after clicking through

Before beginning this test you will probably want to set 
`extensions.pioneer-online-news.showDoorhangerInterval` to something smaller
so that the survey doorhanger is reshown quicker than 24 hours.

You will also need to update the 
`extensions.pioneer-online-news.updateTimerInterval` setting to less than
the setting above.

The survey doorhanger should be shown a maximum of three times, unless you
click on the **"Take the survey"** button, in which case it should not be 
shown again.

We should test that this works as expected when the button is clicked, and 
also when the button is not clicked.

#### Test that the addon is correctly uninstalled after opting out

After installing all three addons, simply uninstall the Firefox Pioneer
addon and restart the browser. All three addons should now be uninstalled.

#### Test that the addon is correctly uninstalled after expiry

After installing all three addons there should be a pref 
`extensions.pioneer-online-news.expirationDate` that was created. If you
change the value of this pref to `1` and restart, the study addon and
this sideloaded patch addon should be uninstalled. 
