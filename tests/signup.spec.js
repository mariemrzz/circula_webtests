import { test, expect } from '@playwright/test';
import { SignUpPage } from '../framework/pages/signup-page';

test.describe('Verify "Company Information" signup step with Sweden country', () => {
    let signUpPage;
    test.beforeEach('fill in the first and second signup steps', async ({ page }) => {
        signUpPage = new SignUpPage(page);
        await signUpPage.goto();
        await signUpPage.fillAndSubmitStepOne('test@test.com', '1234567890aA');
        await signUpPage.fillAndSubmitStepTwo('John', 'Doe', '+441122223333');
    });

    test('Create account with Sweden country', async ({ page }) => {
        await signUpPage.fillStepThree('QA Company', 'Sweden', 'Search Engine (Google, Bing, etc.)');
        await expect(signUpPage.countryDropdown).toHaveValue("Sweden");
        await expect(signUpPage.channelDropdown).toHaveValue("Search Engine (Google, Bing, etc.)");
    });
})