import { Locator } from '@playwright/test';
import BasePage from '../pages/base.page'

class ProductsPage extends BasePage {
    public readonly selectedFilter: Locator;
    public readonly catalogUnits: Locator;
    public readonly searchInput: Locator;
    public readonly map: Locator;
    public readonly mapUnitsCountTitle;

    constructor(page) {
        super(page);

        this.selectedFilter = page.locator('div.ResetFilters_selectedCategory___D1E6 > p');
        this.catalogUnits = page.locator('div[data-testid="cardWrapper"]');
        this.searchInput = page.locator('input[data-testid="searchInput"]');
        this.map = page.locator('#map');
        this.mapUnitsCountTitle = page.locator('h1.MapPagination_count__c_dzg');
    }

    async clickFirstCatalogUnit(): Promise<void> {
        await this.clickElement(this.catalogUnits.nth(0));
        await this.page.waitForTimeout(2000);
    }

    async getNumberOfUnits(): Promise<number> {
        const text = await this.getTextOfElement(this.mapUnitsCountTitle);
        const numberString = text.match(/\d+/)?.[0] || '0';
        return parseInt(numberString, 10);
    }

}

export default ProductsPage;