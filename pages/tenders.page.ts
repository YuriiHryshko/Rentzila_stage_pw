import { Locator } from '@playwright/test';
import BasePage from '../pages/base.page'

class TendersPage extends BasePage {
    public readonly searchInput: Locator;

    constructor(page) {
        super(page);

        this.searchInput = page.locator('input[data-testid="search"]');
        
    }
    
}

export default TendersPage;