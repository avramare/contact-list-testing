class BasePage {
  constructor(page) {
    this.page = page;
    this.header = page.locator(".main-content");
    this.welcomeMessage = page.locator(".welcome-message");
    this.apiDocLink = page.locator('a[href*="documenter.getpostman.com"]');
    this.email = page.locator("#email");
    this.password = page.locator("#password");
    this.submitButton = page.locator("#submit");
    this.signupMessage = page.locator(".signup-message");
    this.signupButton = page.locator("#signup");
    this.errorMessage = page.locator("#error");
  }

  async navigateTo() {
    await this.page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  }

  async enterEmail(email) {
    await this.email.fill(email);
  }

  async enterPassword(password) {
    await this.password.fill(password);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async clickSignUp() {
    await this.signupButton.click();
  }

  async clickApiRedirect() {
    await this.apiDocLink.click();
  }

  async fillLoginForm(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }
}

module.exports = BasePage;
