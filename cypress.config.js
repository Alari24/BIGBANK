const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://laenutaotlus.bigbank.ee/?amount=5000&period=60&productName=SMALL_LOAN&loanPurpose=DAILY_SETTLEMENTS",
    setupNodeEvents(on, config) {
        // implement node event listeners here
    },
  },
  screenshotOnRunFailure: true,
  video: true,
  reporter: 'mochawesome',
});
