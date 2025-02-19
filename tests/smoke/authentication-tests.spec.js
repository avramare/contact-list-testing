const { test, expect } = require('@playwright/test');
const { generateUser } = require('../utils/test-data');

test.describe('Authentication Smoke Tests @smoke', () => {
  test('should register a new user successfully', async ({ page }) => {
    const userData = generateUser();
    
    await page.goto('/addUser');
    await page.fill('#firstName', userData.firstName);
    await page.fill('#lastName', userData.lastName);
    await page.fill('#email', userData.email);
    await page.fill('#password', userData.password);
    await page.click('#submit');
    
    await expect(page).toHaveURL(/.*\/contactList/);
    await expect(page.locator('#logout')).toBeVisible();
  });

  test('should login and logout successfully', async ({ page }) => {
    const userData = generateUser();
    
    // Register
    await page.goto('/addUser');
    await page.fill('#firstName', userData.firstName);
    await page.fill('#lastName', userData.lastName);
    await page.fill('#email', userData.email);
    await page.fill('#password', userData.password);
    await page.click('#submit');
    
    // Logout
    await page.click('#logout');
    await expect(page).toHaveURL("https://thinking-tester-contact-list.herokuapp.com/");
    
    // Login
    await page.fill('#email', userData.email);
    await page.fill('#password', userData.password);
    await page.click('#submit');
    
    await expect(page).toHaveURL(/.*\/contactList/);
  });
});