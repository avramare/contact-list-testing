const ContactListPage = require('./contactListPage');

class AddContactPage extends ContactListPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.elements = {
            firstName: page.locator('#firstName'),
            lastName: page.locator('#lastName'),
            dateOfBirth: page.locator('#birthdate'),
            email: page.locator('#email'),
            phone: page.locator('#phone'),
            street1: page.locator('#street1'),
            street2: page.locator('#street2'),
            city: page.locator('#city'),
            stateOrProvince: page.locator('#stateProvince'),
            postalCode: page.locator('#postalCode'),
            country: page.locator('#country'),
            submitButton: page.locator('#submit'),
            cancelButton: page.locator('#cancel'),
            errorMessage: page.locator('#error')
        };
    }

    async navigateToAddContactPage() {
        await this.page.goto(
          "https://thinking-tester-contact-list.herokuapp.com/addContact"
        );
      }

    async clickSubmit() {
        await this.elements.submitButton.click();
    }

    async clickCancel() {
        await this.elements.cancelButton.click();
    }

    async fillField(field, value) {
        if (value) {
            await this.elements[field].fill(value);
        }
    }

    async fillContactForm(contactData) {
        const fields = [
            'firstName', 'lastName', 'dateOfBirth', 'email', 'phone',
            'street1', 'street2', 'city', 'stateOrProvince', 'postalCode', 'country'
        ];

        for (const field of fields) {
            await this.fillField(field, contactData[field]);
        }
    }    
    
}

module.exports = AddContactPage;

