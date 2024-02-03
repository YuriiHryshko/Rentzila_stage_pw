import { Locator } from '@playwright/test';
import BasePage from '../pages/base.page'

class CookiePolicyPage extends BasePage {
    public readonly cookiesTitle: Locator;

    constructor(page) {
        super(page);

        this.cookiesTitle = page.locator('div.Cookies_wrapper__1PGp0 > h1.Cookies_title__BVLFo');
        
    }
}

export default CookiePolicyPage;