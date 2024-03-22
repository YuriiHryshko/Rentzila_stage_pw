import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import restorePasswordData from "../data/restorePasswordData.json";

test.describe("C199 test", () => {
    test.beforeEach(async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.clickNavbarAuthBtn();
    });

    test("C199: Reset the password with invalid email", async({ page }) => {
        const homePage = new HomePage(page);

        await test.step('Click on the "Забули пароль?" below the password input field', async () =>{
            await homePage.clickForgotPasswordLink();
            await expect(await homePage.restorePasswordPopup).toBeVisible();
        });
        
        await test.step('Click on the "Відновити пароль" button with empty email field', async () =>{
            await homePage.clickRestorePasswordCaptchaContainer();
            await homePage.clickRestorePasswordRestorePasswordBtn();
            await expect(await homePage.restorePasswordEmailInputError).toBeVisible();
            await expect(await homePage.restorePasswordEmailInputError).toContainText('Поле не може бути порожнім');
        });

        await test.step('Enter existing email into the email field', async () =>{
            await homePage.setValueInRestorePasswordEmailField(restorePasswordData.existingEmail);
            await expect(await homePage.restorePasswordEmailInput).toHaveValue(restorePasswordData.existingEmail);
        });

        await test.step('Click on the "X" button', async () =>{
            await homePage.clickRestorePasswordCrossBtn();
            await expect(await homePage.restorePasswordPopup).not.toBeVisible();
        });

        await test.step('Click on the "Забули пароль?". Enter invalid email in the "Введіть е-mail" field. After each Input click on the "Відновити пароль" button.', async () =>{
            await homePage.clickForgotPasswordLink();
            await homePage.clickRestorePasswordCaptchaContainer();
            for(let i: number = 0; i < await restorePasswordData.invalidEmails.length; i++){
                await homePage.setValueInRestorePasswordEmailField(restorePasswordData.invalidEmails[i]);
                await homePage.clickRestorePasswordRestorePasswordBtn();
                await expect(await homePage.restorePasswordEmailInputError).toBeVisible();
                await expect(await homePage.restorePasswordEmailInputError).toContainText('Неправильний формат email');
                await expect(await homePage.restorePasswordPopup).toBeVisible();
            }
        });

        await test.step('Enter non-existing email in the "Введіть е-mail" field and press "Enter" button.', async () =>{
            await homePage.setValueInRestorePasswordEmailField(restorePasswordData.nonExistingEmail);
            await homePage.pressEnterKeyForRestorePasswordEmailInput();
            await expect(await homePage.restorePasswordPopupError).toBeVisible();
            await expect(await homePage.restorePasswordPopupError).toContainText('Користувач з таким емейлом або номером телефону не верифікований в системі');
            await expect(await homePage.restorePasswordPopup).toBeVisible();
        });

    });
});