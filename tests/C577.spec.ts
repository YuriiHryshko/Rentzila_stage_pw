import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import loginData from "../data/loginData.json";

test.describe("C577 test", () => {
    test.beforeEach(async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.clickNavbarAuthBtn();
    });

    test("C577: Authorization with invalid password", async({ page }) => {
        const homePage = new HomePage(page);

        await test.step('Enter the valid email into the "E-mail або номер телефону" field', async () =>{
            await homePage.setValueInLoginPopupEmailInput(loginData.validEmails[0]);
            await expect(await homePage.loginPopupEmailInput).toHaveValue(loginData.validEmails[0]);
        });

        for(let i: number = 0; i < await loginData.invalidPasswords.length; i++){
            await test.step('Enter invalid password into the "Пароль" field', async () =>{
                await homePage.setValueInLoginPopupPasswordInput(loginData.invalidPasswords[i]);
                await expect(await homePage.loginPopupPasswordInput).toHaveValue(loginData.invalidPasswords[i]);
            });
    
            await test.step('After each input click on the "Увійти" button or press Enter key', async () =>{
                if(i % 2 === 0) await homePage.clickLoginPopupLoginBtn();
                else await homePage.pressEnterKeyForLoginPopupPasswordInput();
                await expect(await homePage.loginPopup).toBeVisible();
                await expect(await homePage.loginPopupPasswordInputError).toBeVisible();
                await expect(await homePage.loginPopupPasswordInputError).toContainText('Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли');
            });
        }
    });
});