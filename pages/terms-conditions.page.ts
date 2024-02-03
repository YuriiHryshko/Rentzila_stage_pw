import { Locator } from '@playwright/test';
import BasePage from '../pages/base.page'

class TermsConditionsPage extends BasePage {
    public readonly termsConditionsTitle: Locator;

    constructor(page) {
        super(page);

        this.termsConditionsTitle = page.locator('div.TermsConditions_wrapper__InhF9 > h1.TermsConditions_title__haW1D');
        
    }
}

export default TermsConditionsPage;