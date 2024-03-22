import { Locator } from '@playwright/test';
import BasePage from '../pages/base.page'

class OwnerCabinetPage extends BasePage {
    public readonly phoneNumberInput: Locator;
    public readonly leftSideLogOutBtn: Locator;

    constructor(page) {
        super(page);

        this.phoneNumberInput = page.locator('input[data-testid="input_OwnerProfileNumber"]');
        this.leftSideLogOutBtn = page.locator('div[data-testid="logOut"]');

    }

    async scrollToPhoneNumberInput(): Promise<void> {
        await super.scrollToElement(this.phoneNumberInput);
    }

    async scrollToLeftSideLogOutBtn(): Promise<void> {
        await super.scrollToElement(this.leftSideLogOutBtn);
    }

    async clickLeftSideLogOutBtn(): Promise<void> {
        await super.clickElement(this.leftSideLogOutBtn);
    }

    async getPhoneNumberInputValue(): Promise<string> {
        return await super.getValueOfElementWithoutSpaces(this.phoneNumberInput);
    }
}

export default OwnerCabinetPage;