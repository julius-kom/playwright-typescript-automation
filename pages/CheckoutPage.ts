import { Locator, Page, expect} from "@playwright/test";


export class CheckoutPage{
     private readonly page: Page;
     private readonly activeBreadcrump: Locator;    

     constructor (page: Page) {
        this.page = page;
        this.activeBreadcrump = page.locator('.breadcrumb .active');
     }

    async checkCheckoutPageOpened(){
        await expect(this.activeBreadcrump).toHaveText('Checkout');
    }
}