import { Locator } from '@playwright/test';
import BasePage from '../pages/base.page'

class FooterPage extends BasePage {
    public readonly footer: Locator;
    public readonly rentzilaLogo: Locator;
    public readonly aboutUsLable: Locator;
    public readonly privacyPolicyLink: Locator;
    public readonly cookiePolicyLink: Locator;
    public readonly termsConditionsLink: Locator;
    public readonly forBuyersLable: Locator;
    public readonly advertisementsLink: Locator;
    public readonly tendersLink: Locator;
    public readonly contactsLable: Locator;
    public readonly footerMarkLable: Locator;
    public readonly emailLink: Locator;


    constructor(page) {
        super(page);

        this.footer = page.locator('div.Footer_footer__Dhw_9');
        this.rentzilaLogo = page.locator('div.Footer_container__5d2_x > div[data-testid="logo"]');
        this.aboutUsLable = page.locator('div.RentzilaAbout_title__vI_3A');
        this.privacyPolicyLink = page.locator('div[data-testid="politika-konfidenciinosti"]');
        this.cookiePolicyLink = page.locator('div[data-testid="pravila-vikoristannya-failiv-cookie"]');
        this.termsConditionsLink = page.locator('div[data-testid="umovi-dostupu-ta-koristuvannya"]');
        this.forBuyersLable = page.locator('div.RentzilaForBuyers_title__k3tHn');
        this.advertisementsLink = page.locator('div[data-testid="ogoloshennya"]');
        this.tendersLink = page.locator('div[data-testid="tenderi"] > a');
        this.contactsLable = page.locator('div.RentzilaContacts_title__SxcO7');
        this.footerMarkLable = page.locator('div.Footer_mark__PY_mx');
        this.emailLink = page.locator('a.RentzilaContacts_email__jlzWc');
        
    }

    async clickPrivacyPolicyLink(): Promise<void> {
        await this.clickElement(this.privacyPolicyLink);
        await this.page.waitForTimeout(1000);
    }

    async clickCookiePolicyLink(): Promise<void> {
        await this.clickElement(this.cookiePolicyLink);
    }

    async clickTermsConditionsLink(): Promise<void> {
        await this.clickElement(this.termsConditionsLink);
    }

    async clickAdvertisementsLink(): Promise<void> {
        await this.clickElement(this.advertisementsLink);
    }

    async clickTendersLink(): Promise<void> {
        await this.clickElement(this.tendersLink);
    }

    async scrollToFooter(): Promise<void> {
        await this.scrollToElement(this.footer);
    }
}

export default FooterPage;