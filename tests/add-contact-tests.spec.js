const { test, expect } = require('@playwright/test');
const BasePage = require('../pages/basePage');
const AddContactPage = require('../pages/addContactPage');

test.describe('Add Contact Form Functionality', () => {
    let addContactPage;
    let basePage;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        await basePage.navigateTo();
        await basePage.fillLoginForm('mavram@atlantbh.com', 'Marko123!');
        await expect(page).toHaveURL(/.*\/contactList/);
        
        addContactPage = new AddContactPage(page);
        await addContactPage.navigateToAddContactPage();
    });

    test('successfully add contact with required fields and verify in table', async () => {
        const contactData = {
            firstName: 'Dwight',
            lastName: 'Schrute'
        };

        await addContactPage.fillContactForm(contactData);
        await addContactPage.clickSubmit();

        await expect(addContactPage.page).toHaveURL(/.*\/contactList/);
        
        // Verify contact appears in the table
        const contactsTable = addContactPage.contacts;
        await expect(contactsTable).toBeVisible();
        
        // Verify contact details in table
        await expect(contactsTable).toContainText(contactData.firstName);
        await expect(contactsTable).toContainText(contactData.lastName);        
    });

    test('successfully add contact with all fields', async () => {
        const contactData = {
            firstName: 'Michael',
            lastName: 'Scott',
            dateOfBirth: '1990-01-01',
            email: 'michael.scott@dmifflin.com',
            phone: '1234567890',
            street1: '123 Main St',
            street2: 'Apt 4B',
            city: 'Scranton',
            stateOrProvince: 'PA',
            postalCode: '10001',
            country: 'United States'
        };

        await addContactPage.fillContactForm(contactData);
        await addContactPage.clickSubmit();

        await expect(addContactPage.page).toHaveURL(/.*\/contactList/);
    });

    test('validate required fields', async () => {
        await addContactPage.clickSubmit();
        
        await expect(addContactPage.elements.errorMessage).toBeVisible();
        await expect(addContactPage.elements.errorMessage).toContainText('Contact validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required.');
    });
    
    test('validate email format', async () => {
        const contactData = {
            firstName: 'Andy',
            lastName: 'Bernard',
            email: 'invalid.email',
            phone: '1234567890'
        };

        await addContactPage.fillContactForm(contactData);
        await addContactPage.clickSubmit();

        await expect(addContactPage.elements.errorMessage).toBeVisible();
        await expect(addContactPage.elements.errorMessage).toContainText('Contact validation failed: email: Email is invalid');
    });

    test('validate phone number format', async () => {
        const contactData = {
            firstName: 'Pamela',
            lastName: 'Beasly',
            email: 'pbeasly@example.com',
            phone: 'invalid'
        };

        await addContactPage.fillContactForm(contactData);
        await addContactPage.clickSubmit();

        await expect(addContactPage.elements.errorMessage).toBeVisible();
        await expect(addContactPage.elements.errorMessage).toContainText('Contact validation failed: phone: Phone number is invalid');
    });

    test('validate date format', async () => {
        const contactData = {
            firstName: 'Jim',
            lastName: 'Halpert',
            dateOfBirth: 'invalid-date',
            email: 'jhalpert@example.com',
            phone: '1234567890'
        };

        await addContactPage.fillContactForm(contactData);
        await addContactPage.clickSubmit();

        await expect(addContactPage.elements.errorMessage).toBeVisible();
        await expect(addContactPage.elements.errorMessage).toContainText('Contact validation failed: birthdate: Birthdate is invalid');
    });

    test('cancel button returns to contact list', async () => {
        await addContactPage.clickCancel();
        await expect(addContactPage.page).toHaveURL(/.*\/contactList/);
    });

    test('form retains data after failed submission', async () => {
        const contactData = {
            firstName: 'Andy',
            lastName: 'Bernard',
            email: 'invalid.email',
            phone: '1234567890'
        };

        await addContactPage.fillContactForm(contactData);
        await addContactPage.clickSubmit();

        // Verify field values are retained
        await expect(addContactPage.elements.firstName).toHaveValue(contactData.firstName);
        await expect(addContactPage.elements.lastName).toHaveValue(contactData.lastName);
        await expect(addContactPage.elements.email).toHaveValue(contactData.email);
        await expect(addContactPage.elements.phone).toHaveValue(contactData.phone);
    });

    test('handle special characters in text fields', async () => {
        const contactData = {
            firstName: 'María-José',
            lastName: "O'Connor",
            email: 'maria.jose@example.com',
            phone: '1234567890',
            street1: '742 Evergreen Terrace #4',
            city: 'São Paulo'
        };

        await addContactPage.fillContactForm(contactData);
        await addContactPage.clickSubmit();

        await expect(addContactPage.page).toHaveURL(/.*\/contactList/);
    });

    test('validate maximum field lengths', async () => {
        const longString = 'a'.repeat(21);
        const contactData = {
            firstName: longString,
            lastName: longString,
            email: 'test@example.com',
            phone: '1234567890'
        };

        await addContactPage.fillContactForm(contactData);
        await addContactPage.clickSubmit();

        await expect(addContactPage.elements.errorMessage).toBeVisible();
        await expect(addContactPage.elements.errorMessage).toContainText('Contact validation failed: firstName: Path `firstName` (`aaaaaaaaaaaaaaaaaaaaa`) is longer than the maximum allowed length (20)., lastName: Path `lastName` (`aaaaaaaaaaaaaaaaaaaaa`) is longer than the maximum allowed length (20).');
    });

    test('handle international phone numbers', async () => {
        const contactData = {
            firstName: 'Kevin',
            lastName: 'Malone',
            email: 'kmalone@example.com',
            phone: '+49 30 12345678'
        };

        await addContactPage.fillContactForm(contactData);
        await addContactPage.clickSubmit();

        await expect(addContactPage.page).toHaveURL(/.*\/contactList/);
        //🐞! International phone numbers are invalid
    });
})   