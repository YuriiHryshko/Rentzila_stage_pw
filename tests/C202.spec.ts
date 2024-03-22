import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import loginData from "../data/loginData.json";
import OwnerCabinetPage from '../pages/owner-cabinet.page';

test.describe("C202 test", () => {
    test.beforeEach(async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
    });

    test("C202: Authorization with valid phone and password", async({ page }) => {
        const homePage = new HomePage(page);
        const ownerCabinetPage = new OwnerCabinetPage(page);
        for(let i: number = 0; i < await loginData.validPhones.length; i++){
            
            await test.step('Click on the ""Вхід"" button in the header', async () =>{
                await homePage.clickNavbarAuthBtn();
            });

            await test.step('Enter your phone number in the field "E-mail або номер телефону"', async () =>{
                await homePage.setValueInLoginPopupEmailInput(loginData.validPhones[i]);
                await expect( await homePage.loginPopupEmailInput).not.toHaveCSS('border', '1px solid rgb(247, 56, 89)');
            });
    
            await test.step('Enter your password in the "Пароль" entry field', async () =>{
                await homePage.setValueInLoginPopupPasswordInput(loginData.validPassword);
                await expect( await homePage.loginPopupPasswordInput).not.toHaveCSS('border', '1px solid rgb(247, 56, 89)');
            });

            await test.step('Click on the "Увійти" at the bottom of the form', async () =>{
                await homePage.clickLoginPopupLoginBtn();
                await expect(await homePage.navbarAvatarBlock).toBeVisible();
            });

            await test.step('Click on the user icon in the right corner of the page', async () =>{
                await homePage.clickNavbarAvatarBlock();
                await expect(await homePage.profileDropdownMenu).toBeVisible();
            });

            await test.step('Click on the "Мій профіль" button in the profile dropdown list', async () =>{
                await homePage.clickProfileDropdownMenuProfile();
                await expect(await page.url()).toEqual('https://stage.rentzila.com.ua/owner-cabinet/');
                await ownerCabinetPage.scrollToPhoneNumberInput();
                await expect(await ownerCabinetPage.phoneNumberInput).toBeVisible();
                await expect(await ownerCabinetPage.getPhoneNumberInputValue()).toContain(loginData.validPhones[i]);
                await expect(await ownerCabinetPage.phoneNumberInput).toHaveCSS('border-color', 'rgb(71, 196, 128)');
            });

            await test.step('Log out and repeat test case with another valid phone', async () =>{
                await ownerCabinetPage.scrollToLeftSideLogOutBtn();
                await ownerCabinetPage.clickLeftSideLogOutBtn();
            });
        }
    });
});