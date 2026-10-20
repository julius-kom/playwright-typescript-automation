import {Page, Locator, expect} from '@playwright/test';
import {AddressData} from '../models/AddressData';
import { AccountCreatedPage } from './AccountCreatedPage';

export class AccountInformationPage{

    private readonly page: Page;
    private readonly accountInformationHeader: Locator;
    private readonly titleMrs: Locator;
    private readonly passwordInput: Locator;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly daySelect: Locator;
    private readonly monthSelect: Locator;
    private readonly yearSelect: Locator;
    private readonly newletterCheckbox: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly companyInput: Locator;
    private readonly addressInput: Locator;
    private readonly countrySelect: Locator;
    private readonly stateInput: Locator;
    private readonly cityInput: Locator;
    private readonly zipcodeInput: Locator;
    private readonly mobileInput: Locator;
    private readonly buttonCreateAccount: Locator;



    constructor(page: Page) {
        this.page = page;
        this.accountInformationHeader = page.getByText('ENTER ACCOUNT INFORMATION');
        this.titleMrs = page.locator('#id_gender2');
        this.passwordInput = page.locator('[data-qa="password"]');
        this.nameInput = page.locator('[data-qa="name"]');
        this.emailInput = page.locator('[data-qa="email"]');
        this.daySelect = page.locator('[data-qa="days"]');
        this.monthSelect = page.locator('[data-qa="months"]');
        this.yearSelect = page.locator('[data-qa="years"]');
        this.newletterCheckbox = page.locator('#newsletter');
        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.companyInput = page.locator('[data-qa="company"]');
        this.addressInput = page.locator('[data-qa="address"]');
        this.countrySelect = page.locator('[data-qa="country"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipcodeInput = page.locator('[data-qa="zipcode"]');
        this.mobileInput = page.locator('[data-qa="mobile_number"]');
        this.buttonCreateAccount = page.locator('[data-qa="create-account"]');
    }

    async checkPageOpened(){
        await expect(this.accountInformationHeader).toBeVisible();
    }

    async selectTitleMrs(){
        await this.titleMrs.check();
    }

    async fillPassword(password: string){
        await this.passwordInput.fill(password);
    }

    async checkRegistrationData(name: string, email: string){
        await expect(this.nameInput).toHaveValue(name);
        await expect(this.emailInput).toHaveValue(email);
    }

    async selectDateOfBirth(day: string, month: string, year: string){
        await this.daySelect.selectOption(day);
        await this.monthSelect.selectOption(month);
        await this.yearSelect.selectOption(year);
    }
    
    async subscribeToNewsletter(){
        await this.newletterCheckbox.check();
    } 

    async fillAddress(data: AddressData){
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.addressInput.fill(data.address);
        await this.countrySelect.selectOption(data.country);
        await this.stateInput.fill(data.state);
        await this.cityInput.fill(data.city);
        await this.zipcodeInput.fill(data.zipcode);
        await this.mobileInput.fill(data.mobileNumber);
        await this.companyInput.fill(data.company ?? '');
    }

    async clickCreateAccount() : Promise<AccountCreatedPage>{
        await this.buttonCreateAccount.click();
        return new AccountCreatedPage(this.page);
    }
}
