import {Page, Locator, expect} from '@playwright/test';
import { HomePage } from './HomePage';

export class AccountCreatedPage{
    private readonly page: Page;
    private readonly accountCreatedHeader: Locator;
    private readonly buttonContinue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountCreatedHeader = page.getByText('ACCOUNT CREATED!');
        this.buttonContinue = page.getByRole('link', {name: 'Continue'});

    }

    async checkPageAccCreatedOpened() {
        await expect(this.accountCreatedHeader).toBeVisible();
    }

    async clickContinueButton(): Promise<HomePage>{
        await this.buttonContinue.click();
        return new HomePage(this.page);
    }
}
    
