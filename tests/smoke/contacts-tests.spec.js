const { test } = require('../fixtures/base-fixtures');
const { expect } = require('@playwright/test');
const { generateContact } = require('../utils/test-data');

test.describe('Contacts Smoke Tests @smoke', () => {
    test('should create a new contact', async ({ authenticatedPage: page }) => {
        const contactData = generateContact();
        
        await page.click('#add-contact');
        await page.fill('#firstName', contactData.firstName);
        await page.fill('#lastName', contactData.lastName);
        await page.click('#submit');
        
        await page.waitForURL('**/contactList');
        
        // Verify using table cell content
        const contactRow = page.locator('table tr', {
            has: page.getByText(contactData.firstName)
        });
        await expect(contactRow).toBeVisible();
        await expect(contactRow).toContainText(contactData.firstName);
        await expect(contactRow).toContainText(contactData.lastName);
    });

    test('should view contact details', async ({ authenticatedPage: page }) => {
        const contactData = generateContact();
        
        // Create contact
        await page.click('#add-contact');
        await page.fill('#firstName', contactData.firstName);
        await page.fill('#lastName', contactData.lastName);
        await page.fill('#email', contactData.email);
        // await page.fill('#phone', contactData.phone);
        await page.click('#submit');
        
        // Wait for redirect and table refresh
        await page.waitForURL('**/contactList');
        
        // Wait for the contact table to be visible
        await page.waitForSelector('table');
        
        // Click the contact name specifically
        const contactRow = page.getByRole('cell', { 
            name: contactData.firstName 
        });

        await contactRow.click();
        
        // Wait for contact details to be visible
        await page.waitForURL('**/contactDetails');        
       
        
    });
});