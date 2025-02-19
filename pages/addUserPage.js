class AddUserPage {
    constructor(page) {
      this.page = page;
      this.heading = page.locator('//h1[@class="main-content"]');
      this.welcomeMessage = page.locator('//p[@class="main-content"]');

      this.firstName = page.locator('#firstName');
      this.lastName = page.locator('#lastName');
      this.email = page.locator('#email');
      this.password = page.locator('#password');
      this.submitButton = page.locator('#submit');
      this.cancelButton = page.locator('#cancel');
      this.errorMessage = page.locator("#error");
    }

    async navigateToAddUserPage() {
      await this.page.goto(
        "https://thinking-tester-contact-list.herokuapp.com/addUser"
      );
    }

    async enterFirstName(firstName){
      await this.firstName.fill(firstName);
    }
    
    async enterLastName(lastName){
      await this.lastName.fill(lastName);
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

    async clickCancel(){
      await this.cancelButton.click();
    }

    async fillSignUpForm(firstName, lastName, email, password) {
      await this.firstName.fill(firstName);
      await this.lastName.fill(lastName);
      await this.email.fill(email);
      await this.password.fill(password);
      await this.submitButton.click();
    }
}

module.exports = AddUserPage;