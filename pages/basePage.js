class BasePage {
    constructor(page) {
      this.page = page;
      this.header = page.locator('//h1[@class="main-content"]');
      this.welcomeMessage = page.locator('//h1[@class="welcome-message"]');
      this.apiDocLink = page.locator('//a[@href="https://documenter.getpostman.com/view/4012288/TzK2bEa8"]');
      this.email = page.locator('//input[@id="email"]');
      this.password = page.locator('//input[@id="password"]');
      this.submitButton = page.locator('//button[@id="submit"]');
      this.signupMessage = page.locator('/html/body/div[3]/p[2]');
      this.signupButton = page.locator('//button[@id="signup"]');
      this.errorMessage = page.locator('#error');
    }

    async navigateTo() {
      await this.page.goto("https://thinking-tester-contact-list.herokuapp.com/");
    }

    async enterEmail(email){
      await this.email.fill(email);
    }
    
    async enterPassword(password){
      await this.password.fill(password);
    }

    async clickSubmit(){
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
};

module.exports = BasePage;