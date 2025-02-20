class ContactListPage {
  constructor(page) {
    this.page = page;
    this.header = page.locator(".main-content");
    this.footer = page.locator("footer");
    this.welcomeMessage = page.locator(".welcome-message");
    this.addContactButton = page.locator("#add-contact");
    this.logoutButton = page.locator("#logout");
    this.contacts = page.locator(".contactTable");
  }

  async clickAddContact() {
    await this.addContactButton.click();
  }

  async clickLogOut() {
    await this.logoutButton.click();
  }
}

module.exports = ContactListPage;
