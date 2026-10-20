import { Page, expect } from "@playwright/test";
import { LoginPage } from "./LoginPage";


export class HomePage{
    private readonly page: Page;
    private readonly buttonLogout;

    constructor(page: Page){
        this.page = page;
        this.buttonLogout = page.getByRole('link', {name: 'Logout'});
    }

    async checkUserLoggedIn(name: string){
        await expect(this.page.getByText(`Logged in as ${name}`))
        .toBeVisible();
    }

    async clickLogoutButton(): Promise<LoginPage>{
        await this.buttonLogout.click();
        return new LoginPage(this.page);
    }
}