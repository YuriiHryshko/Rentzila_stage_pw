import { Locator } from '@playwright/test';
import BasePage from '../pages/base.page'

class CatalogPage extends BasePage {
    public readonly catalogBtn: Locator;
    public readonly specTechLabel: Locator;
    public readonly specTechList: Locator;
    public readonly servicesLabel: Locator;
    public readonly servicesList: Locator;
    public readonly specTechItemList: Locator;
    public readonly servicesItemList: Locator;

    constructor(page) {
        super(page);

        this.catalogBtn = page.locator('div.NavbarCatalog_label__s1meA');
        this.specTechLabel = page.locator('div.Catalog_parents__ThIGP > div:nth-child(1)');
        this.servicesLabel = page.locator('div.Catalog_parents__ThIGP > div:nth-child(2)');
        this.specTechList = page.locator('div.Catalog_list__sVdCj > div');
        this.servicesList = page.locator('div.Catalog_list__sVdCj > div');
        this.specTechItemList = page.locator('div.Catalog_listSecond__awZH7 > div');
        this.servicesItemList = page.locator('div.Catalog_listSecond__awZH7 > div');
        
    }
    
    async clickCatalogBtn(): Promise<void> {
        await this.clickElement(this.catalogBtn);
    }

    async clickSpecTechListLabel(i: number): Promise<void> {
        const item = this.specTechList.nth(i);
        await this.clickElement(item);
        await this.page.waitForTimeout(1000);
    }

    async clickCleaningTerritoryItem(): Promise<void> {
        await this.clickElement(this.servicesItemList.nth(3));
    }

    async clickVnesDobrTerritoryItem(): Promise<void> {
        await this.clickElement(this.servicesItemList.nth(2));
    }

    async clickPruningTreesItem(): Promise<void> {
        await this.clickElement(this.servicesItemList.nth(4));
    }

    async hoverSpecTechLabel(): Promise<void>{
        await this.hoverElement(this.specTechLabel);
        await this.page.waitForTimeout(1000);
    }

    async hoverSpecTechListLabel(i: number): Promise<void>{
        await this.hoverElement(this.specTechList.nth(i));
        await this.page.waitForTimeout(1000);
    }

    async hoverServicesLabel(): Promise<void>{
        await this.hoverElement(this.servicesLabel);
        await this.page.waitForTimeout(1000);
    }

    async hoverServicesListLabel(i: number): Promise<void>{
        await this.hoverElement(this.servicesList.nth(i));
        await this.page.waitForTimeout(1000);
    }

    async getSpecTechItem(i: number): Promise<string>{
        const item = this.specTechList.nth(i);
        return await this.getTextOfElement(item);
    }

    async getSpecTechItemItem(i: number): Promise<string>{
        const item = this.specTechItemList.nth(i);
        return await this.getTextOfElement(item);
    }

    async getServicesItem(i: number): Promise<string>{
        const item = this.servicesList.nth(i);
        return await this.getTextOfElement(item);
    }

    async getServicesItemItem(i: number): Promise<string>{
        const item = this.servicesItemList.nth(i);
        return await this.getTextOfElement(item);
    }
}

export default CatalogPage;