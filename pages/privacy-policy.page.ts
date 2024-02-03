import { Locator } from '@playwright/test';
import BasePage from '../pages/base.page'

class privacyPolicyPage extends BasePage {
    public readonly privacyPolicyTitle: Locator;

    constructor(page) {
        super(page);

        this.privacyPolicyTitle = page.locator('div.PrivacyPolicy_wrapper__UDt07 > h1.PrivacyPolicy_title__FEiRV');
        
    }
}

export default privacyPolicyPage;