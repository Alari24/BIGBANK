# BIGBANK
This project is my homework solution.

It has been written following the requirements given in the task.
All data and messages are in separate files meaning when things change in for example error messaging then this change needs to be done in only one location and not in each test.

If this would be a real work scenario with access to more documentation then obviously tests can be expanded to include tests which check if certain values can be wrong or if using wrong calculations gives error. They can also be expanded and at the same
time be compacted to use arrays so that one test runs multiple times with different values which eliminates test duplication

This project uses Node.js and Cypress. I have included the modules in the repository but it is still possible that the install commands need to be ran still.

# Instructions

## Cypress online documentation

* Writing first tests: https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test
* Documentation on Cypress commands: https://docs.cypress.io/api/table-of-contents
 
Install cypress via NPM
```
npm install cypress --save-dev
```

To run the tests in headed mode, use the following command:
```
npm run cy:open
```
Once a window opens select E2E testing and Firefox for browser setting

The tests written have been done using Firefox browser which means if the tests are ran using other browser then issues might arise on how elements are located.

I have also included mochawesome for reporting. This can be installed with the following command:
```
npm install --save-dev mochawesome
```

To run tests in headless mode which also generates a mochawesome report, use the following command:
```
npm run cy:run
```

# Description of ways of working

With access to documentation and endpoints I would firstly read through documentation and get acquainted with the solution. With knowledge how it should work I play around with the modal manually to see if any immediate issues arise like
misaligned buttons or weird glitches. If the preliminary checkup comes back positive then I would test edge cases and success flows trying to break the modal. If all this succeeds with no errors present I would continue on writing firstly UI tests first
as it is a client facing solution then UI takes more importance. Having access to endpoint that carry out the monthly payment calculations then that needs coverage as well.

General approach to all testing is first success flows and then edge cases trying to catch desired behaviour and/or errors

For current homework solution I have created UI automation tests that cover flows which:
1. Check if all elements in the modal window are present in both ET and RU languages
2. Check if changing the duration or desired amount changes the monthly payment value (*This flow also checks if the amount changes is reflected in the base page view as well*)
3. Check if minimum and maximum values are honored in the modal
4. Check if user is allowed to enter letters into input fields

This gives a simple overview that the modal is behaving the way it should.

Solution includes an earlier report for mochawesome.

I have also included an unrunnable API tests example file (APItest folder) what that might look like if I had more documentation information and access to the calculator endpoint. This example is built up using karate framework and descriptions
are given in the file itself on what they do.

Additionally I have included a gitlab pipeline file interpretation on how a gitlab pipeline could look like using imaginary paths for extra credit.

No odd behaviours were found in the modal
