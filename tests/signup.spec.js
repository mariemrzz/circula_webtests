import { test, expect } from '@playwright/test';
import { SignUpPage } from '../framework/pages/signup-page';
import * as generator from '../framework/helpers/data-generator';

test.describe('Verify "Company Information" signup step', () => {
    let signUpPage;
    test.beforeEach('Fill in the first and second signup steps', async ({ page }) => {
        signUpPage = new SignUpPage(page);
        await signUpPage.goto();
        await signUpPage.fillAndSubmitStepOne(generator.generateUserEmail(), generator.generatePassword());
        await signUpPage.fillAndSubmitStepTwo('John', 'Doe', '+441122223333');
    });

    test('Create account with Sweden country', async ({ page }) => {
        let country = 'Sweden';
        let channel = 'Search Engine (Google, Bing, etc.)'

        await signUpPage.fillStepThree(generator.generateCompany(), country, channel);
        await test.step(`Verify '${country}' and '${channel}' are selected in dropdowns`, async () => {
            await expect(signUpPage.countryDropdown).toHaveValue(country);
            await expect(signUpPage.channelDropdown).toHaveValue(channel);
        })

        await signUpPage.submitStep();
        await test.step("Verify success page is opened", async () => {
            await expect(signUpPage.signupSuccessContainer).toBeVisible();
        })
    });

    test("Search Sweden in 'Where’s your company registered?' dropdown list", async ({ page }) => {
        let country = 'Sweden';

        await signUpPage.searchCountry(country);
        await test.step(`Verify only '${country}' is found and displayed in the countries list`, async () => {
            await expect(signUpPage.countryDropdown).toBeVisible(10_000);
            await expect(page.locator('ul > li')).toHaveText(country);
        })

        await signUpPage.searchCountry('S');
        await test.step(`Verify '${country}' is in the list among other countries`, async () => {
            await expect(signUpPage.countryDropdown).toBeVisible(10_000);
            await expect(page.getByRole('option', { name: country })).toBeVisible();
        })

        await signUpPage.searchCountry('s');
        await test.step(`Verify '${country}' is in the list among other countries`, async () => {
            await expect(signUpPage.countryDropdown).toBeVisible(10_000);
            await expect(page.getByRole('option', { name: country })).toBeVisible();
        })
    })
})