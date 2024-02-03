import { Locator, Page } from '@playwright/test';

class BasePage {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async clickElement(element: Locator): Promise<void> {
        await element.click();
    }

    async scrollToElement(element: Locator): Promise<void>{
        await element.scrollIntoViewIfNeeded();
    }
    
    async setValueInField(value: string, element: Locator): Promise<void>{
        await element.fill(value);
    }

    async pressKey(key: string, element: Locator): Promise<void>{
        await element.press(key);
    }

    async getTextOfElement(element: Locator): Promise<string> {
        const text = await element.textContent();
        return text || '';
    }

    async hoverElement(element: Locator): Promise<void>{
        await element.hover();
    }
}

export default BasePage;