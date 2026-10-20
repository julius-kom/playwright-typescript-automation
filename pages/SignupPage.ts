import {Page, Locator, expect} from '@playwright/test';
import { AccountInformationPage } from './AccountInformationPage';

export class SignupPage{

    private readonly page: Page;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly buttonSignUp: Locator;

    constructor(page: Page){
        this.page = page;
        this.nameInput = page.locator('[data-qa="signup-name"]');
        this.emailInput = page.locator('[data-qa="signup-email"]');
        this.buttonSignUp = page.locator('[data-qa="signup-button"]');
    }

    async fillName(name : string) {
        await this.nameInput.fill(name);
    }

    async fillEmail(email : string) {
        await this.emailInput.fill(email);
    }

    async clickSignUp(): Promise<AccountInformationPage>{
        await this.buttonSignUp.click();
        return new AccountInformationPage(this.page);
    }

    async open(){
        await this.page.goto('/login');
    }
}