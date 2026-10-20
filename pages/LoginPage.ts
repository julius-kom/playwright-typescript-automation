import { Page, Locator, expect } from '@playwright/test';
import { HomePage } from './HomePage';

export class LoginPage {
    private readonly page: Page;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly buttonLogin: Locator;
    private readonly loginError: Locator;

    constructor(page: Page){
        this.page = page;
        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.buttonLogin = page.locator('[data-qa="login-button"]');
        this.loginError = page.getByText('Your email or password is incorrect!');
    }

    async open() {
        await this.page.goto('/login');
    }

    async fillEmail(email : string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password : string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(){
        await this.buttonLogin.click();
    }

    async checkLoginError(){
        await expect(this.loginError).toBeVisible();
    }

    async checkEmailRequired(){
        await expect(this.emailInput).toHaveAttribute('required');
    }

    async checkLoginPageOpened(){
        await expect(this.page).toHaveURL('/login');
    }

    async loginSuccessfully(email: string, password: string): Promise<HomePage> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.buttonLogin.click();
        return new HomePage(this.page);
    }
}
