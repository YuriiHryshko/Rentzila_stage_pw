import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import loginData from "../data/loginData.json";

test.describe("C200 test", () => {
    test.beforeEach(async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.clickNavbarAuthBtn();
    });

    test("C200: Authorization with empty fields", async({ page }) => {
        const homePage = new HomePage(page);

        await test.step('Click on the "Увійти" at the bottom of the form with all fields empty', async () =>{
            await homePage.clickLoginPopupLoginBtn();
            await expect(await homePage.loginPopup).toBeVisible();
            await expect(await homePage.loginPopupEmailInputError).toBeVisible();
            await expect(await homePage.loginPopupEmailInputError).toContainText('Поле не може бути порожнім');
            await expect(await homePage.loginPopupPasswordInputError).toBeVisible();
            await expect(await homePage.loginPopupPasswordInputError).toContainText('Поле не може бути порожнім');
            await expect(await homePage.loginPopupEmailInput).toHaveCSS('border', '1px solid rgb(247, 56, 89)');
            await expect(await homePage.loginPopupPasswordInput).toHaveCSS('border', '1px solid rgb(247, 56, 89)');
        });

        await test.step('Enter your email into the "E-mail або номер телефону" Input and then click on the "Увійти" at the bottom of the form', async () =>{
            await homePage.setValueInLoginPopupEmailInput(loginData.validEmails[0]);
            await homePage.clickLoginPopupLoginBtn();
            await expect(await homePage.loginPopup).toBeVisible();
            await expect(await homePage.loginPopupEmailInput).not.toHaveCSS('border', '1px solid rgb(247, 56, 89)');
            await expect(await homePage.loginPopupPasswordInput).toHaveCSS('border', '1px solid rgb(247, 56, 89)');
            await expect(await homePage.loginPopupPasswordInputError).toBeVisible();
            await expect(await homePage.loginPopupPasswordInputError).toContainText('Поле не може бути порожнім');
        });

        await test.step('The ""E-mail або номер телефону"" clear', async () =>{
            await homePage.setValueInLoginPopupEmailInput('');
            await expect(await homePage.loginPopupEmailInputError).toBeVisible();
            await expect(await homePage.loginPopupEmailInputError).toContainText('Поле не може бути порожнім');
            await expect(await homePage.loginPopupEmailInput).toHaveCSS('border', '1px solid rgb(247, 56, 89)');
        });

        await test.step('Enter any valid password into the "Пароль" Input and then click on the "Увійти" at the bottom of the form', async () =>{
            await homePage.setValueInLoginPopupPasswordInput(loginData.validPassword);
            await homePage.clickLoginPopupLoginBtn();
            await expect(await homePage.loginPopup).toBeVisible();
            await expect(await homePage.loginPopupPasswordInput).not.toHaveCSS('border', '1px solid rgb(247, 56, 89)');
        });

    });

});