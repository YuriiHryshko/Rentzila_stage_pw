import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import loginData from "../data/loginData.json";

test.describe("C576 test", () => {
    test.beforeEach(async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.clickNavbarAuthBtn();
    });

    test("C576: Authorization with invalid email", async({ page }) => {
        const homePage = new HomePage(page);

        await test.step('Enter the valid password into the "Пароль" field', async () =>{
            await homePage.setValueInLoginPopupPasswordInput(loginData.validPassword);
            await expect(await homePage.loginPopupPasswordInput).toHaveValue(loginData.validPassword);
        });

        for(let i: number = 0; i < await loginData.invalidEmails.length; i++){
            await test.step('Enter invalid email into the "E-mail або номер телефону" field', async () =>{
                await homePage.setValueInLoginPopupEmailInput(loginData.invalidEmails[i]);
                await expect(await homePage.loginPopupEmailInput).toHaveValue(loginData.invalidEmails[i]);
            });
    
            await test.step('After each input click on the "Увійти" button or press Enter key', async () =>{
                if(i % 2 === 0) await homePage.clickLoginPopupLoginBtn();
                else await homePage.pressEnterKeyForLoginPopupEmailInput();
                await expect(await homePage.loginPopup).toBeVisible();
                await expect(await homePage.loginPopupEmailInputError).toContainText('Неправильний формат email або номера телефону');
            });
        }

        await test.step('Enter the valid password into the "Пароль" field', async () =>{
            await homePage.setValueInLoginPopupPasswordInput(loginData.validPassword);
        });

        for(let i: number = 0; i < await loginData.nonExistentEmails.length; i++){
            await test.step('Enter non-existent email into the "E-mail або номер телефону" input', async () =>{
                await homePage.setValueInLoginPopupEmailInput(loginData.nonExistentEmails[i]);
            });

            await test.step('After each input click on the "Увійти" button or press Enter key', async () =>{
                await homePage.setValueInLoginPopupEmailInput(loginData.nonExistentEmails[i]);
                if (i === 0) await homePage.clickLoginPopupLoginBtn();
                else await homePage.pressEnterKeyForLoginPopupEmailInput();
                await expect(await homePage.loginPopup).toBeVisible();
                await expect(await homePage.loginPopupError).toContainText('Невірний e-mail або пароль');
            });
        }
    });
});