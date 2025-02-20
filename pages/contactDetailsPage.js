const ContactListPage = require('./contactListPage');

class ContactDetailsPage extends ContactListPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.actions = {
            editButton: page.locator('#edit-contact'),
            deleteButton: page.locator('#delete'),
            returnButton: page.locator('#return')
        };
        this.details = {
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
            country: page.locator('#country')
        }
    }

    async navigateToContactDetailsPage(){
        await this.page.goto(
            "https://thinking-tester-contact-list.herokuapp.com/contactDetails"
          );
    }

    async editContact() {
        await this.actions.editButton.click();
    }

    async deleteContact() {
        await this.actions.deleteButton.click();
    }

    async returnToContactList() {
        await this.actions.returnButton.click();
    }
}

module.exports = ContactDetailsPage