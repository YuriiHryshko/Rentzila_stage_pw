import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import loginData from "../data/loginData.json";

test.describe("C201 test", () => {
    test.beforeEach(async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
    });

    test("C201: Authorization with valid email and password", async({ page }) => {
        const homePage = new HomePage(page);
        for(let i: number = 0; i < await loginData.validEmails.length; i++){

            await test.step('Click on the "Вхід" button in the header', async () =>{
                await homePage.clickNavbarAuthBtn();
            });

            await test.step('Enter your email into the "E-mail або номер телефону" field', async () =>{
                await homePage.setValueInLoginPopupEmailInput(loginData.validEmails[i]);
                await expect(await homePage.loginPopupEmailInput).toHaveValue(loginData.validEmails[i]);
            });
    
            await test.step('Enter your valid password into the "Пароль" field', async () =>{
                await homePage.setValueInLoginPopupPasswordInput(loginData.validPassword);
                await expect(await homePage.loginPopupPasswordInput).toHaveValue(loginData.validPassword);
            });
    
            await test.step('Click on the "Hidden password" icon', async () =>{
                await homePage.clickLoginPopupPasswordInputEyeIcon();
                await expect(await homePage.loginPopupPasswordInput).toHaveAttribute('type', 'text');
            });
    
            await test.step('Click on the "Hidden password" icon again', async () =>{
                await homePage.clickLoginPopupPasswordInputEyeIcon();
                await expect(await homePage.loginPopupPasswordInput).toHaveAttribute('type', 'password');
            });
    
            await test.step('Click on the "Увійти" at the bottom of the form or press Enter key', async () =>{
                if(i === 0) await homePage.clickLoginPopupLoginBtn();
                else await homePage.pressEnterKeyForLoginPopupPasswordInput();
                await expect(await homePage.navbarAvatarBlock).toBeVisible();
            });
    
            await test.step('Click on the user icon in the right corner of the page', async () =>{
                await homePage.clickNavbarAvatarBlock();
                await expect(await homePage.profileDropdownMenu).toBeVisible();
                await expect(await homePage.profileDropdownMenuEmail).toBeVisible();
                await expect(await homePage.profileDropdownMenuEmail).toContainText(loginData.validEmails[i].toLowerCase());
            });
    
            await test.step('Log out and repeat test case with valid uppercase email', async () =>{
                await homePage.clickProfileDropdownMenuLogout();
            });
        }
    });
});