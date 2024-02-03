import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import ProductsPage from '../pages/products.page';
import UnitPage from '../pages/unit.page';
import FooterPage from '../pages/footer.page';
import PrivacyPolicyPage from '../pages/privacy-policy.page';
import CookiePolicyPage from '../pages/cookie-policy.page';
import TermsConditionsPage from '../pages/terms-conditions.page';
import TendersPage from '../pages/tenders.page';
import testData from '../data/data.json'
import consultData from '../data/consultationData.json'
import searchData from '../data/searchData.json'
import ApiHelper from '../helper/feedback.helper';
import CatalogPage from '../pages/catalogPage';
import catalogData from '../data/catalogData.json';

test.describe("Home Page testing", () => {
    test.beforeEach(async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
    });

    test.only("C212 Checking 'Послуги' section on the main page", async({ page, baseURL }) => {
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const unitPage = new UnitPage(page);

        for (let i: number = 0; i < await homePage.servicesCategories.count(); i++) {
            await homePage.scrollToServicesSection();
            await expect(await homePage.servicesSection).toBeVisible();
            await expect(await homePage.servicesCategories.nth(i)).toBeVisible();
            await expect(await homePage.servicesItems.count()).toBe(7);
            for (let j: number = 0; j < await homePage.servicesItems.count(); j++) {
                await expect(await homePage.servicesItems.nth(j)).toBeVisible();
            }

            for (let n: number = 0; n < await homePage.servicesItems.count(); n++) {
                await homePage.clickServicesCategory(i);
                let item: string = await homePage.servicesItemsNames.nth(n).textContent() ?? '';
                await homePage.clickServicesItem(n);
                await expect(page.url()).toContain('/products/');
                await expect(await productsPage.selectedFilter.textContent()).toBe(item);
                await expect(await productsPage.catalogUnits.first()).toBeVisible();

                await productsPage.clickFirstCatalogUnit();
                await expect(page.url()).toContain('/unit/');
                await expect(await unitPage.getUnitServiceByName(item)).toBeVisible();
                await homePage.clickHeaderLogo();
                await expect(page.url()).toBe(baseURL);
            }
        }
    });

    test("C213 Checking 'Спецтехніка' section on the main page", async({ page, baseURL }) => {
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const unitPage = new UnitPage(page);

        for (let i: number = 0; i < await homePage.equipmentCategories.count(); i++) {
            await homePage.scrollToEquipmentSection();
            await expect(homePage.equipmentSection).toBeVisible();
            await expect(homePage.equipmentCategories.nth(i)).toBeVisible();
            await expect(await homePage.equipmentItems.count()).toBe(7);
            for (let j: number = 0; j < await homePage.equipmentItems.count(); j++) {
                await expect(await homePage.equipmentItems.nth(j)).toBeVisible();
            }

            for (let n: number = 0; n < await homePage.equipmentItems.count(); n++) {
                await homePage.clickEquipmentCategory(i);
                let item: string = await homePage.equipmentItemsNames.nth(n).textContent() ?? '';
                await homePage.clickEquipmentItem(n);
                await expect(await page.url()).toContain('/products/');
                await expect(await productsPage.selectedFilter.textContent()).toBe(testData[item].filter);
                if(await productsPage.catalogUnits.count() !== 0){
                    await expect(await productsPage.catalogUnits.first()).toBeVisible();
                    await productsPage.clickFirstCatalogUnit();
                    await expect(page.url()).toContain('/unit/');
                    await expect(await unitPage.getUnitCategoryByName(testData[item].category)).toBeVisible();
                }
                await homePage.clickHeaderLogo();
                await expect(page.url()).toBe(baseURL);
            }
        }
    });

    test("C214 Verify that all elements on the footer are displayed and all links are clickable", async({ page, baseURL }) => {
        const footerPage = new FooterPage(page);
        const privacyPolicyPage = new PrivacyPolicyPage(page);
        const cookiePolicyPage = new CookiePolicyPage(page);
        const termsConditionsPage = new TermsConditionsPage(page);
        const productsPage = new ProductsPage(page);
        const homePage = new HomePage(page);
        const tendersPage = new TendersPage(page);

        await footerPage.scrollToFooter();
        await expect(footerPage.footer).toBeVisible();
        await expect(footerPage.rentzilaLogo).toBeVisible();
        await expect(footerPage.aboutUsLable).toBeVisible();
        await expect(footerPage.privacyPolicyLink).toBeVisible();
        await expect(footerPage.cookiePolicyLink).toBeVisible();
        await expect(footerPage.termsConditionsLink).toBeVisible();
        await expect(footerPage.forBuyersLable).toBeVisible();
        await expect(footerPage.advertisementsLink).toBeVisible();
        await expect(footerPage.tendersLink).toBeVisible();
        await expect(footerPage.contactsLable).toBeVisible();
        await expect(footerPage.emailLink).toBeVisible();
        await expect(footerPage.rentzilaLogo).toBeVisible();
        await expect(footerPage.footerMarkLable).toBeVisible();

        await footerPage.clickPrivacyPolicyLink();
        await expect(page.url()).toContain('/privacy-policy/');
        await expect(privacyPolicyPage.privacyPolicyTitle).toBeVisible();

        await footerPage.scrollToFooter();
        await footerPage.clickCookiePolicyLink();
        await expect(page.url()).toContain('/cookie-policy/');
        await expect(cookiePolicyPage.cookiesTitle).toBeVisible();

        await footerPage.scrollToFooter();
        await footerPage.clickTermsConditionsLink();
        await expect(page.url()).toContain('/terms-conditions/');
        await expect(termsConditionsPage.termsConditionsTitle).toBeVisible();
        
        await footerPage.scrollToFooter();
        await footerPage.clickAdvertisementsLink();
        await expect(page.url()).toContain('/products/');
        await expect(productsPage.searchInput).toBeVisible();
        await expect(productsPage.searchInput).toHaveAttribute('placeholder', 'Пошук оголошень або послуг');

        await homePage.clickHeaderLogo();
        await expect(page.url()).toBe(baseURL);
        await expect(homePage.mainSection).toBeVisible();

        await footerPage.scrollToFooter();
        await footerPage.clickTendersLink();
        await expect(page.url()).toContain('/tenders-map/');
        await expect(tendersPage.searchInput).toBeVisible();
        await expect(tendersPage.searchInput).toHaveAttribute('placeholder', 'Пошук тендера за ключовими словами');

        await homePage.clickHeaderLogo();
        await expect(page.url()).toBe(baseURL);

        await expect(footerPage.emailLink).toHaveAttribute('href', 'mailto:info@rentzila.com.ua');
    });

    test("C226 Verify 'У Вас залишилися питання?' form", async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.scrollToConsultationSection();
        await expect(homePage.consultationSection).toBeVisible();

        await homePage.clickConsultationBtn();
        await expect(homePage.consultationNameInput).toHaveClass('ConsultationForm_input__r8dGs ConsultationForm_error__F1NM0');
        await expect(homePage.consultationNameError).toBeVisible();
        await expect(homePage.consultationNameError).toContainText('Поле не може бути порожнім');
        await expect(homePage.consultationMobileInput).toHaveClass('ConsultationForm_input__r8dGs ConsultationForm_error__F1NM0');
        await expect(homePage.consultationMobileError).toBeVisible();
        await expect(homePage.consultationMobileError).toContainText('Поле не може бути порожнім');

        await homePage.setValueInNameField(consultData.name);
        await homePage.clickConsultationBtn();
        await expect(homePage.consultationNameInput).not.toHaveClass('ConsultationForm_input__r8dGs ConsultationForm_error__F1NM0');
        await expect(homePage.consultationMobileInput).toHaveClass('ConsultationForm_input__r8dGs ConsultationForm_error__F1NM0');

        await homePage.clickMobileInput();
        await expect(homePage.consultationMobileInput).toHaveValue(consultData.prefilledPhonePart);

        await homePage.setValueInMobileField(consultData.validePhone);
        await homePage.clearNameField();
        await homePage.clickConsultationBtn();
        await expect(homePage.consultationNameInput).toHaveClass('ConsultationForm_input__r8dGs ConsultationForm_error__F1NM0');
        await expect(homePage.consultationMobileInput).not.toHaveClass('ConsultationForm_input__r8dGs ConsultationForm_error__F1NM0');

        await homePage.setValueInNameField(consultData.name);
        for(const invalidPhone of consultData.invalidePhones){
            await homePage.setValueInMobileField(invalidPhone);
            await homePage.clickConsultationBtn();
            await expect(homePage.consultationNameInput).not.toHaveClass('ConsultationForm_input__r8dGs ConsultationForm_error__F1NM0');
            await expect(homePage.consultationMobileInput).toHaveClass('ConsultationForm_input__r8dGs ConsultationForm_error__F1NM0');
            await expect(homePage.consultationMobileError).toBeVisible();
            await expect(homePage.consultationMobileError).toContainText('Телефон не пройшов валідацію');
        }

        await homePage.setValueInMobileField(consultData.validePhone);
        await homePage.clickConsultationBtn();
        (await page.waitForEvent('dialog')).accept();

        const apiHelper = new ApiHelper();
        const feedbackList = await apiHelper.getFeedbackList();
        await expect(homePage.isElementInFeedbackList(feedbackList, consultData.name, consultData.validePhone)).resolves.toBe(true);
    });

    test("C530 Verify Search Input", async({ page }) => {
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const unitPage = new UnitPage(page);
        await homePage.clickMainSearchInput();
        await expect(homePage.searchDropdownResults.first()).toBeVisible();
        await expect(homePage.searchDropdownHistoryTitle).toBeVisible();
        await expect(homePage.searchDropdownServices.first()).toBeVisible();
        await expect(homePage.searchDropdownCategories.first()).toBeVisible();

        await homePage.pressEnterKeyForSearchInput();
        await expect(page.url()).toContain('/products/');
        await expect(homePage.navbarSearchInput).toHaveValue('');
        await expect(productsPage.catalogUnits.nth(0)).toBeVisible();

        await homePage.clickHeaderLogo();
        await homePage.setValueInNavbarSerchInput(searchData.searchData1);
        await homePage.pressEnterKeyForSearchInput();
        await expect(page.url()).toContain('/products/');
        await expect(productsPage.map).toBeVisible();
        await expect(productsPage.catalogUnits.first()).toContainText(searchData.searchData1);
        await expect(productsPage.catalogUnits.first()).toBeVisible();

        await productsPage.clickFirstCatalogUnit();
        await expect(page.url()).toContain('/unit/');

        await homePage.clickHeaderLogo();
        await homePage.clickMainSearchInput();
        await expect(homePage.searchDropdownHistory.first()).toBeVisible();
        await expect(homePage.searchDropdownHistory.first()).toContainText(searchData.searchData1);

        await homePage.setValueInNavbarSerchInput(searchData.searchData2);
        await homePage.pressEnterKeyForSearchInput();
        await expect(page.url()).toContain('/products/');
        await expect(productsPage.map).toBeVisible();
        await expect(productsPage.catalogUnits.first()).toContainText(searchData.searchData2);
        await expect(productsPage.catalogUnits.first()).toBeVisible();
        await productsPage.clickFirstCatalogUnit();
        await expect(page.url()).toContain('/unit/');
        await homePage.clickHeaderLogo();
        await homePage.clickMainSearchInput();
        await expect(homePage.searchDropdownHistory.first()).toBeVisible();
        await expect(homePage.searchDropdownHistory.first()).toContainText(searchData.searchData2);

        await homePage.setValueInNavbarSerchInput(searchData.searchData3);
        await expect(homePage.searchDropdownResults.first()).toContainText(searchData.searchData3);
        await homePage.clickFirstSearchDropdownResult();
        await expect(page.url()).toContain('/unit/');
        await expect(unitPage.unitName).toContainText(searchData.searchData3);

        await homePage.clickHeaderLogo();
        await homePage.setValueInNavbarSerchInput(searchData.searchData4);
        await expect(await homePage.searchDropdownResults.count()).toBe(0);
        await expect(await homePage.searchDropdownServices.count()).toBe(0);
        await expect(await homePage.searchDropdownCategories.count()).toBe(0);
        await homePage.pressEnterKeyForSearchInput();
        await expect(page.url()).toContain('/products/');
        await expect(productsPage.mapUnitsCountTitle).toContainText('Знайдено 0 оголошень на видимій території за запитом " "');

        await homePage.clickHeaderLogo();
        await homePage.setValueInNavbarSerchInput(searchData.searchData5);
        if(await homePage.searchDropdownResults.count() !== 0){
            await expect(homePage.searchDropdownResults.first()).toBeVisible();
            await expect(homePage.searchDropdownResults.first()).toContainText(searchData.searchData5);
            await homePage.pressEnterKeyForSearchInput();
            const unitsCount = await productsPage.getNumberOfUnits();
            await expect(productsPage.mapUnitsCountTitle).toContainText('Знайдено ' + unitsCount + ' оголошень на видимій території за запитом "' + searchData.searchData5 + '"');
            await expect(productsPage.catalogUnits.first()).toContainText(searchData.searchData5);
            await expect(productsPage.catalogUnits.first()).toBeVisible();
            await productsPage.clickFirstCatalogUnit();
            await expect(page.url()).toContain('/unit/');
        }else{
            await expect(await homePage.searchDropdownResults.count()).toBe(0);
            await homePage.pressEnterKeyForSearchInput();
            await expect(productsPage.mapUnitsCountTitle).toContainText('Знайдено 0 оголошень на видимій території за запитом "' + searchData.searchData5 + '"');
        }

        await homePage.clickHeaderLogo();
        await homePage.clickMainSearchInput();
        await homePage.setValueInNavbarSerchInput(searchData.searchData6);
        if(await homePage.searchDropdownResults.count() !== 0){
            await expect(homePage.searchDropdownResults.first()).toBeVisible();
            await expect(homePage.searchDropdownResults.first()).toContainText(searchData.searchData6);
            await homePage.pressEnterKeyForSearchInput();
            await expect(page.url()).toContain('/products/');
            await expect(homePage.navbarSearchInput).toHaveValue(searchData.searchData6);
            const unitsCount = await productsPage.getNumberOfUnits();
            await expect(productsPage.mapUnitsCountTitle).toContainText('Знайдено ' + unitsCount + ' оголошень на видимій території за запитом "' + searchData.searchData6 + '"');
            await expect(productsPage.mapUnitsCountTitle).toBeVisible();
        }else{
            await expect(await homePage.searchDropdownResults.count()).toBe(0);
            await homePage.pressEnterKeyForSearchInput();
            await expect(productsPage.mapUnitsCountTitle).toContainText('Знайдено 0 оголошень на видимій території за запитом "' + searchData.searchData6 + '"');
        }

        await homePage.clickHeaderLogo();
        await homePage.clickMainSearchInput();
        await homePage.setValueInNavbarSerchInput(searchData.searchData7);
        await homePage.pressEnterKeyForSearchInput();
        await expect(page.url()).toContain('/products/');
        await expect(homePage.navbarSearchInput).toHaveValue('');
        await expect(productsPage.catalogUnits.first()).toBeVisible();

        await homePage.clickHeaderLogo();
        await homePage.setValueInNavbarSerchInput(searchData.searchData8);
        await expect(await homePage.searchDropdownResults.count()).toBe(0);
        await homePage.pressEnterKeyForSearchInput();
        await expect(page.url()).toContain('/products/');
        await expect(homePage.navbarSearchInput).toHaveValue(searchData.searchData8);
        await expect(productsPage.mapUnitsCountTitle).toContainText('Знайдено 0 оголошень на видимій території за запитом "' + searchData.searchData8 + '"');

        await homePage.clickHeaderLogo();
        await homePage.setValueInNavbarSerchInput(searchData.searchData9);
        await expect(homePage.searchDropdownResults.first()).toBeVisible();
        await expect(await homePage.searchDropdownServices.allInnerTexts()).toContain(searchData.searchData9);

        await homePage.searchDropdownServices.filter({ hasText: searchData.searchData9 }).click();
        await expect(page.url()).toContain('/products/');
        await expect(await productsPage.selectedFilter.innerText()).toContain(searchData.searchData9);

        await homePage.clickHeaderLogo();
        await homePage.setValueInNavbarSerchInput(searchData.searchData10);
        await expect(homePage.searchDropdownResults.first()).toBeVisible();
        await expect(await homePage.searchDropdownCategories.allInnerTexts()).toContain(searchData.searchData10.toLowerCase() + 'и');

        await homePage.searchDropdownCategories.filter({ hasText: searchData.searchData10.toLowerCase() + 'и' }).click();
        await page.waitForTimeout(1000);
        await expect(page.url()).toContain('/products/');
        await expect(await productsPage.selectedFilter.innerText()).toContain(searchData.searchData10);
        const unitsCount = await productsPage.getNumberOfUnits();
        if (unitsCount == 1){
            await expect(productsPage.mapUnitsCountTitle).toContainText('Знайдено ' + unitsCount + ' оголошення на видимій території');
        }else{
            await expect(productsPage.mapUnitsCountTitle).toContainText('Знайдено ' + unitsCount + ' оголошень на видимій території');
        }
        await expect(productsPage.mapUnitsCountTitle).toBeVisible();

        await homePage.clickHeaderLogo();
        await homePage.setValueInNavbarSerchInput(searchData.searchData11);
        await expect(homePage.searchDropdownHistory.first()).toBeVisible();
        await expect(homePage.searchDropdownHistory.first()).toContainText(searchData.searchData11);

        await homePage.clickClearSearchInputBtn();
        await expect(homePage.searchDropdown).toBeHidden();
        await expect(homePage.navbarSearchInput).toHaveValue('');

        await page.reload();
        await homePage.clickMainSearchInput();
        await expect(homePage.searchDropdownHistory.first()).toContainText(searchData.searchData11);
    });

    test("C559 Verify 'Каталог'", async({ page }) => {
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const catalog = new CatalogPage(page);
        await expect(catalog.catalogBtn).toBeVisible();
        for(let i: number = 0; i < 4; i++){
            await catalog.clickCatalogBtn();
            await catalog.hoverSpecTechLabel();
            await expect(await catalog.getSpecTechItem(i)).toBe(catalogData.specTechItems[i]);
            await expect(await catalog.specTechList.nth(i)).toBeVisible();
            await catalog.clickSpecTechListLabel(i);
            await expect(page.url()).toContain(catalogData.specTechUrls[i]);
            await page.goBack();
            await page.waitForTimeout(1000);
        }
        for(let i: number = 0; i < 4; i++){
            await homePage.clickHeaderLogo();
            await catalog.clickCatalogBtn();
            await catalog.hoverSpecTechLabel();
            await catalog.hoverSpecTechListLabel(i);
            let amountItems = catalogData.specTechItemItems[i].length;
            for(let j: number = 0; j <= amountItems-1; j++){
                await expect(await catalog.getSpecTechItemItem(j)).toBe(catalogData.specTechItemItems[i][j]);
            }
        }
        await homePage.clickHeaderLogo();
        await catalog.clickCatalogBtn();
        await catalog.hoverServicesLabel();
        for(let i: number = 0; i < 3; i++){
            await expect(await catalog.getServicesItem(i)).toBe(catalogData.servicesItems[i]);
            await catalog.hoverServicesListLabel(i);
            let amountItems = catalogData.servicesItemItems[i].length;
            for(let j: number = 0; j <= amountItems-1; j++){
                await expect(await catalog.getServicesItemItem(j)).toBe(catalogData.servicesItemItems[i][j]);
            }
        }
        await homePage.clickHeaderLogo();
        await catalog.clickCatalogBtn();
        await catalog.hoverServicesLabel();
        await catalog.hoverServicesListLabel(0);
        await catalog.clickCleaningTerritoryItem();
        await expect(page.url()).toContain('/products/');
        await expect(await productsPage.selectedFilter.textContent()).toBe('Розчищення території');

        await homePage.clickHeaderLogo();
        await catalog.clickCatalogBtn();
        await catalog.hoverServicesLabel();
        await catalog.hoverServicesListLabel(2);
        await catalog.clickVnesDobrTerritoryItem();
        await expect(page.url()).toContain('/products/');
        await expect(await productsPage.selectedFilter.textContent()).toBe('Внесення добрив');

        await homePage.clickHeaderLogo();
        await catalog.clickCatalogBtn();
        await catalog.hoverServicesLabel();
        await catalog.hoverServicesListLabel(1);
        await catalog.clickPruningTreesItem();
        await expect(page.url()).toContain('/products/');
        await expect(await productsPage.selectedFilter.textContent()).toBe('Обрізання дерев');
    });
});