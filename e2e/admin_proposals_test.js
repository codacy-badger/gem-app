/// <reference path="./steps.d.ts" />

Feature("Admin/Users");

const proposalPage = require("./pages/admin/users");

BeforeSuite(I => {
  I.wipeout("./fixtures/johndoe.js");
});

Before(I => {
  I.amOnPage("/");
  I.login("johndoe", "secret");
  I.waitForText("Welcome");
});

Scenario("I can create a new proposal", I => {
  I.amOnPage("/admin/proposals");
  I.click(proposalPage.createButton);
  
  I.waitForVisible(proposalPage.editDialog);
  within(proposalPage.editDialog, function () {
    proposalPage.submitDialog("proposal title", "content");
  })
  I.waitForInvisible(proposalPage.editDialog);

  within(proposalPage.usersTable, function () {
    I.see("proposal title");
  });
});
