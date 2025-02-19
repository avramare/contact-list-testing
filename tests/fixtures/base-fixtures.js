const { test: baseTest } = require('@playwright/test');
const { generateUser } = require('../utils/test-data');

exports.test = baseTest.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/');
    const userData = generateUser();
    
    // Register
    await page.goto('/addUser');
    await page.fill('#firstName', userData.firstName);
    await page.fill('#lastName', userData.lastName);
    await page.fill('#email', userData.email);
    await page.fill('#password', userData.password);
    await page.click('#submit');
    
    // Verify logged in
    await page.waitForURL('**/contactList');
    
    await use(page);
    
    // Cleanup - logout
    await page.click('#logout');
  }
});