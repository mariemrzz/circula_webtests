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
        await signUpPage.fillStepThree(generator.generateCompany(), 'Sweden', 'Search Engine (Google, Bing, etc.)');
        await expect(signUpPage.countryDropdown).toHaveValue("Sweden");
        await expect(signUpPage.channelDropdown).toHaveValue("Search Engine (Google, Bing, etc.)");

        await signUpPage.submitStep();

        await expect(signUpPage.successContainer).toBeVisible()
    });
})