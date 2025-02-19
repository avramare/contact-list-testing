const { test, expect } = require('@playwright/test');
const AddUserPage  = require("../pages/addUserPage");

test.describe('User Sign Up Functionality', () => {
    let addUserPage;

    test.beforeEach(async ({ page }) => {
        addUserPage = new AddUserPage(page);
        await addUserPage.navigateToAddUserPage();
    });

    test('successful user registration with valid data', async ({page}) => {
        const uniqueEmail = `test${Date.now()}@example.com`;
        await addUserPage.fillSignUpForm(
            'Lord',
            'Voldemort',
            uniqueEmail,
            'TomRiddel123!'
        );
        
        // Verify redirect to contacts page after successful registration
        await expect(page).toHaveURL("https://thinking-tester-contact-list.herokuapp.com/contactList");
    });

    test('validate all form fields are required', async () => {
        await addUserPage.clickSubmit();
        await expect(addUserPage.errorMessage).toBeVisible();
        await expect(addUserPage.errorMessage).toContainText('User validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required');
    });

    test('validate email format requirement', async () => {
        await addUserPage.fillSignUpForm(
            'Lord',
            'Voldemort',
            'invalidemail',
            'Password123!'
        );
        
        await expect(addUserPage.errorMessage).toBeVisible();
        await expect(addUserPage.errorMessage).toContainText('User validation failed: email: Email is invalid');
    });

    test('validate password minimum requirements', async () => {
        await addUserPage.fillSignUpForm(
            'Lord',
            'Voldemort',
            'test@example.com',
            'weak'
        );
        
        await expect(addUserPage.errorMessage).toBeVisible();
        await expect(addUserPage.errorMessage).toContainText('User validation failed: password: Path `password` (`weak`) is shorter than the minimum allowed length (7).');
    });

    test('prevent duplicate email registration', async () => {
        const email = 'duplicate@example.com';
        
        // First registration
        await addUserPage.fillSignUpForm(
            'Lord',
            'Voldemort',
            email,
            'Password123!'
        );
        
        // Navigate back to registration page
        await addUserPage.navigateToAddUserPage();
        
        // Attempt second registration with same email
        await addUserPage.fillSignUpForm(
            'Lord',
            'Voldemort',
            email,
            'Password123!'
        );
        
        await expect(addUserPage.errorMessage).toBeVisible();
        await expect(addUserPage.errorMessage).toContainText('Email address is already in use');
    });
});