import * as conf from "../configuration/conf"
const { expect, test } = require('@playwright/test');

export class SignUpPage {
    constructor(page) {
        this.page = page;
        this.acceptCookiesButton = page.getByTestId('uc-accept-all-button');

        this.emailField = page.locator('//input[@type="email"]');
        this.passwordField = page.locator('//input[@type="password"]');
        this.termsCheckbox = page.locator('//input[@name="acceptTos"]/..//*[name()="svg"]');
        this.firstNameField = page.locator('//input[@name="firstname"]');
        this.lastNameField = page.locator('//input[@name="lastname"]');
        this.phoneNumberField = page.locator('//input[@name="phoneNumber"]');
        this.companyNameField = page.locator('//input[@name="organizationName"]');
        this.countryDropdown = page.locator('//input[@name="country"]');
        this.channelDropdown = page.locator('//input[@name="hdyhau"]');

        this.submitButton = page.locator('//button[@type="submit"]');

        this.signupSuccessContainer = page.getByTestId('signup-success');
    }

    async goto() {
        await test.step('Open signup page', async () => {
            await this.page.goto(conf.HOST + '/users/sign_up');
            await this.acceptCookiesButton.click();
        })
    }

    async fillAndSubmitStepOne(email, password) {
        await this.fillStepOne(email, password);
        await this.submitStep();
    }

    async fillStepOne(email, password) {
        await test.step('Fill in signup page first step', async () => {
            await test.step('Enter Email', async () => {
                await this.emailField.fill(email);
            })

            await test.step('Enter Password', async () => {
                await this.passwordField.fill(password);
            })

            await test.step('Check Terms and conditions checkbox', async () => {
                await this.termsCheckbox.click({ force: true });
            })
        })
    }

    async fillAndSubmitStepTwo(firstname, lastname, phonenumber) {
        await this.fillStepTwo(firstname, lastname, phonenumber);
        await this.submitStep();
    }

    async fillStepTwo(firstname, lastname, phonenumber) {
        await test.step('Fill in signup page second step', async () => {
            await test.step('Enter First name', async () => {
                await this.firstNameField.fill(firstname);
            })

            await test.step('Enter Last name', async () => {
                await this.lastNameField.fill(lastname);
            })

            await test.step('Enter Phone number', async () => {
                await this.phoneNumberField.fill(phonenumber);
            })
        })
    }

    async fillStepThree(companyname, country, channel) {
        await test.step('Fill in signup page third step', async () => {
            await test.step(`Enter Company name  - ${companyname}`, async () => {
                await this.companyNameField.fill(companyname);
            })

            await test.step(`Select country - ${country}`, async () => {
                await this.countryDropdown.click();
                let countryElement = this.page.getByRole('option', { name: country });
                await countryElement.scrollIntoViewIfNeeded();

                await expect(countryElement).toBeVisible();
                // below is a workaround for selection of a specific country from a dropdown list, since click() doesn't work
                await countryElement.evaluate(el => el.click());
                await expect(countryElement).toBeHidden();
            })

            await test.step('Select channel for "How did you hear about us?"', async () => {
                await this.channelDropdown.click();
                let channelElement = this.page.getByRole('menuitemradio', { name: channel });
                await channelElement.scrollIntoViewIfNeeded();

                await expect(channelElement).toBeVisible();
                await channelElement.check();
                await expect(channelElement).toBeHidden();
            })
        })
    }

    async submitStep() {
        await test.step('Submit step', async () => {
            await this.submitButton.click();
        })
    }

    async searchCountry(input) {
        await test.step(`Start entering "${input}" in countries dropdown list`, async () => {
            await this.countryDropdown.click();
            await this.countryDropdown.fill(input);
        })
    }
}

