class ContactListPage {
  constructor(page) {
    this.page = page;
    this.header = page.locator('//h1[@class="main-content"]');
    this.footer = page.locator("//html/body/footer");
    this.welcomeMessage = page.locator("//html/body/div/p[1]");
    this.addContactButton = page.locator('//*[@id="add-contact"]');
    this.logoutButton = page.locator('//*[@id="logout"]');
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
