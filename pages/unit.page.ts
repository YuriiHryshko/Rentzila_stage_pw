import { Locator } from '@playwright/test';
import BasePage from '../pages/base.page'

class UnitPage extends BasePage {

    public readonly unitName: Locator;

    constructor(page) {
        super(page);

        this.unitName = page.locator('h1.UnitName_name__oM_YV');
    }

    async getUnitServiceByName(text: string): Promise<Locator> {
        const element = await this.page.locator(`div.UnitCharacteristics_service__aTyk2:has-text("${text}")`);
        return element;
    }

    async getUnitCategoryByName(text: string): Promise<Locator> {
        const element = await this.page.locator(`div.UnitCharacteristics_characteristics_info__piBDI > span:has-text("${text}")`);
        return element;
    }

}

export default UnitPage;