import { Locator } from '@playwright/test';
import BasePage from '../pages/base.page'

class HomePage extends BasePage {
    private readonly url = '/';
    public readonly headerLogo: Locator;
    public readonly mainSection: Locator;
    public readonly servicesSection: Locator;
    public readonly servicesCategories: Locator;
    public readonly servicesItems: Locator;
    public readonly servicesItemsNames: Locator;

    public readonly equipmentSection: Locator;
    public readonly equipmentCategories: Locator;
    public readonly equipmentItems: Locator;
    public readonly equipmentItemsNames: Locator;

    public readonly consultationSection: Locator;
    public readonly consultationBtn: Locator;
    public readonly consultationNameInput: Locator;
    public readonly consultationMobileInput: Locator;
    public readonly consultationNameError: Locator;
    public readonly consultationMobileError: Locator;

    public readonly navbarSearchInput: Locator;
    public readonly searchDropdown: Locator;
    public readonly searchDropdownResults: Locator;
    public readonly searchDropdownServices: Locator;
    public readonly searchDropdownCategories: Locator;
    public readonly searchDropdownHistoryTitle: Locator;
    public readonly searchDropdownHistory: Locator;
    public readonly clearSearchInputBtn: Locator;

    constructor(page) {
        super(page);

        this.headerLogo = page.locator('a > div[data-testid="logo"]');
        this.mainSection = page.locator('h1.HeroSection_title__QIzpM');
        this.servicesSection = page.locator('section[data-testid="services"]');
        this.servicesCategories = page.locator('div.RentzilaProposes_categories_list__cxa6m > div.RentzilaProposes_service__oHepD');
        this.servicesItems = page.locator('section[data-testid="services"] > div.RentzilaProposes_proposes_list__X8dRW > div.RentzilaProposes_proposes_item__sY_h2');
        this.servicesItemsNames = page.locator('section[data-testid="services"] > div.RentzilaProposes_proposes_list__X8dRW > div.RentzilaProposes_proposes_item__sY_h2 > div.RentzilaProposes_name__DTnwr');

        this.equipmentSection = page.locator('section[data-testid="specialEquipment"]');
        this.equipmentCategories = page.locator('div.RentzilaProposes_categories_list__cxa6m > h3.RentzilaProposes_service__oHepD');
        this.equipmentItems = page.locator('section[data-testid="specialEquipment"] > div.RentzilaProposes_proposes_list__X8dRW > div.RentzilaProposes_proposes_item__sY_h2');
        this.equipmentItemsNames = page.locator('section[data-testid="specialEquipment"] > div.RentzilaProposes_proposes_list__X8dRW > div.RentzilaProposes_proposes_item__sY_h2 > div.RentzilaProposes_name__DTnwr');

        this.consultationSection = page.locator('section.Layouts_consultation__JUU1R');
        this.consultationBtn = page.locator('.ItemButtons_darkBlueRoundBtn___4GDw');
        this.consultationNameInput = page.locator('.ConsultationForm_name__3bVcz > input');
        this.consultationMobileInput = page.locator('#mobile');
        this.consultationNameError = page.locator('.ConsultationForm_name__3bVcz > .ConsultationForm_error_message__jleeD');
        this.consultationMobileError = page.locator('.ConsultationForm_phone__vEOS9 > .ConsultationForm_error_message__jleeD');

        this.navbarSearchInput = page.locator('.Navbar_searchWrapper__LN_Qm [data-testid="searchInput"]');
        this.searchDropdown = page.locator('div.MainSearch_popup_wrapper__w7qVk');
        this.searchDropdownResults = page.locator('div[data-testid="cardContainer"]');
        this.searchDropdownServices = page.locator('div[data-testid="services"] > div.SearchResultItem_item_name__SXnXJ');
        this.searchDropdownCategories = page.locator('div.LeftsideSearch_container__XgEkO > div:last-child > div');
        this.searchDropdownHistoryTitle = page.locator('h6.LeftsideSearch_title__FkeCp:first-of-type');
        this.searchDropdownHistory = page.locator('div.LeftsideSearch_container__XgEkO > div:first-of-type > div');
        this.clearSearchInputBtn = page.locator('div.Navbar_searchWrapper__LN_Qm div[data-testid="searchClear"]');

    }

    async navigate(): Promise<void> {
        await super.navigate(this.url);
    }

    async clickServicesCategory(i: number): Promise<void> {
        await this.clickElement(this.servicesCategories.nth(i));
    }

    async clickServicesItem(i: number): Promise<void> {
        await this.clickElement(this.servicesItems.nth(i));
        await this.page.waitForTimeout(1000);
    }

    async clickEquipmentCategory(i: number): Promise<void> {
        await this.clickElement(this.equipmentCategories.nth(i));
    }

    async clickEquipmentItem(i: number): Promise<void> {
        await this.clickElement(this.equipmentItems.nth(i));
        await this.page.waitForTimeout(1000);
    }

    async clickHeaderLogo(): Promise<void> {
        await this.clickElement(this.headerLogo);
        await this.page.waitForTimeout(1000);
    }

    async clickConsultationBtn(): Promise<void> {
        await this.clickElement(this.consultationBtn);
    }

    async clickMobileInput(): Promise<void> {
        await this.clickElement(this.consultationMobileInput);
    }

    async clickMainSearchInput(): Promise<void> {
        await this.clickElement(this.navbarSearchInput);
    }

    async clickClearSearchInputBtn(): Promise<void> {
        await this.clickElement(this.clearSearchInputBtn);
        await this.page.waitForTimeout(1000);
    }

    async clickFirstSearchDropdownResult(): Promise<void> {
        await this.clickElement(this.searchDropdownResults.first());
        await this.page.waitForTimeout(1000);
    }

    async scrollToServicesSection(): Promise<void> {
        await this.scrollToElement(this.servicesSection);
    }

    async scrollToEquipmentSection(): Promise<void> {
        await this.scrollToElement(this.equipmentSection);
    }

    async scrollToConsultationSection(): Promise<void> {
        await this.scrollToElement(this.consultationSection);
    }

    async setValueInNameField(name: string): Promise<void> {
        await this.setValueInField(name, this.consultationNameInput);
    }

    async setValueInMobileField(mobile: string): Promise<void> {
        await this.setValueInField(mobile, this.consultationMobileInput);
    }

    async setValueInNavbarSerchInput(word: string): Promise<void> {
        await this.setValueInField(word, this.navbarSearchInput);
        await this.page.waitForTimeout(1000);
    }

    async clearNameField(): Promise<void> {
        await this.setValueInField('', this.consultationNameInput);
    }

    async clearMobileField(): Promise<void> {
        await this.setValueInField('', this.consultationMobileInput);
    }

    async isElementInFeedbackList(feedbackList: any[], name: string, phoneNumber: string): Promise<boolean> {
        for (const feedback of feedbackList) {
            if (feedback.name === name && feedback.phone === phoneNumber) {
                return true;
            }
        }
        return false;
    }

    async pressEnterKeyForSearchInput(){
        await this.pressKey('Enter', this.navbarSearchInput);
        await this.page.waitForTimeout(1000);
    }
    
}

export default HomePage;