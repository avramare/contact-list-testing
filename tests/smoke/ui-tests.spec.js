const { test, expect } = require("@playwright/test");
const BasePage = require("../../pages/basePage");
const AddContactPage = require("../../pages/addContactPage");
const AddUserPage = require("../../pages/addUserPage");

test.describe("Contacts Smoke testss @smoke", () => {
  let basePage;
  let addContactPage;
  let addUserPage;

  test.beforeEach(async ({ page }) => {
    addContactPage = new AddContactPage(page);
    addUserPage = new AddUserPage(page);
    basePage = new BasePage(page);
    await basePage.navigateTo();
  });

  test("should register a new user successfully", async ({ page }) => {
    
    const uniqueEmail = `test${Date.now()}@example.com`;
    await addUserPage.navigateToAddUserPage();
    await addUserPage.fillSignUpForm(
      "Tester",
      "Testerovic",
      uniqueEmail,
      "Testing247!"
    );

    await expect(page).toHaveURL(/.*\/contactList/);

  });

  test('should login and logout successfully', async ({ page }) => {
    
    await basePage.fillLoginForm('mavram@atlantbh.com', 'Marko123!');
    await expect(page).toHaveURL(/.*\/contactList/);

    await page.click('#logout');
    await expect(page).toHaveURL("/");

  });

  test('should create new contact', async ({ page }) => {
    
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

    await basePage.fillLoginForm('mavram@atlantbh.com', 'Marko123!');
    await expect(page).toHaveURL(/.*\/contactList/);

    await addContactPage.navigateToAddContactPage();
    await addContactPage.fillContactForm(contactData);
    await addContactPage.clickSubmit();
  });
});
