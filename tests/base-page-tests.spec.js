const { test, expect } = require('@playwright/test');
const BasePage = require('../pages/basePage');

test.describe('Base Page Functionality', () => {
    let basePage;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        await basePage.navigateTo();
    });

    test('successful login with valid credentials', async () => {
        await basePage.fillLoginForm('mavram@atlantbh.com', 'Marko123!')
        
        // Verify redirect to contact list page
        await expect(basePage.page).toHaveURL(/.*\/contactList/);
    });

    test('unsuccessful login with invalid credentials', async () => {
        await basePage.fillLoginForm('avram@atlantbh.com', 'WrongPassword123!');
        
        await expect(basePage.errorMessage).toBeVisible();
        await expect(basePage.errorMessage).toContainText('Incorrect username or password');
        await expect(basePage.page).not.toHaveURL(/contactList/);
    });

    test('validate empty form submission', async () => {
        await basePage.clickSubmit();
        
        await expect(basePage.errorMessage).toBeVisible();
        await expect(basePage.errorMessage).toContainText('Incorrect username or password');
        // 🐞! Error message shoud request input values, email and password are required.
        // await expect(basePage.errorMessage).toContainText('Email and Password are required');
    });

    test('validate email-only submission', async () => {
        await basePage.enterEmail('mavram@atlantbh.com');
        await basePage.clickSubmit();
        
        await expect(basePage.errorMessage).toBeVisible();
        await expect(basePage.errorMessage).toContainText('Incorrect username or password');
        // 🐞! Error message shoud request password input, password is required.
        // await expect(basePage.errorMessage).toContainText('Password is required');
    });

    test('validate password-only submission', async () => {
        await basePage.enterPassword('Password123!');
        await basePage.clickSubmit();
        
        await expect(basePage.errorMessage).toBeVisible();
        await expect(basePage.errorMessage).toContainText('Incorrect username or password');
        // 🐞! Error message shoud request email input, email is required. 
        // await expect(basePage.errorMessage).toContainText('Email is required');
    });

    test('signup button navigation', async () => {
        await basePage.clickSignUp();
        
        await expect(basePage.page).toHaveURL(/.*\/addUser/);
    });

    test("api documentation link has correct target", async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.navigateTo();
        await basePage.clickApiRedirect();
        await expect(page).toHaveURL("https://documenter.getpostman.com/view/4012288/TzK2bEa8");
    });
})    