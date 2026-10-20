import {Page, Locator, expect} from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';

export class CartPage{
    private readonly page: Page;
    private readonly activeBreadcrumb: Locator;
    private readonly products: Locator;
    private readonly proceedToCheckOut: Locator;

    constructor(page: Page){
        this.page = page;
        this.activeBreadcrumb = page.locator('.breadcrumb .active');
        this.products = page.locator('#cart_info_table tbody tr');
        this.proceedToCheckOut = page.locator('.check_out');
    
    }

    async checkCartPageOpened(): Promise<void>{
        await expect(this.activeBreadcrumb)
        .toHaveText('Shopping Cart');
    }

    getProductByName(name: string): Locator{
        return this.products.filter({hasText: name});
    }

    async checkProductInCart(
        name: string,
        price: string,
        quantity: string
    ): Promise<void> {
        const product = this.getProductByName(name);

        await expect(product.locator('.cart_description')).toContainText(name);
        await expect(product.locator('.cart_price')).toContainText(price);
        await expect(product.locator('.cart_quantity')).toContainText(quantity);
    }

    async checkProductRowCount(name: string, count: number): Promise<void>{
        await expect(this.getProductByName(name)).toHaveCount(count);
    }

    async checkProductTotalPrice(name: string, totalPrice: string): Promise<void>{
        await expect(
            this.getProductByName(name).locator('.cart_total_price')
        ).toHaveText(totalPrice);
    }

    async deleteProductFromCart(name: string): Promise<void>{
        await this.getProductByName(name).locator('.cart_quantity_delete').click();
    }

    async checkProductNotInCart(name: string): Promise<void>{
        await expect(this.getProductByName(name)).toHaveCount(0);
    }

    async clickOnProceedToCheckOut(): Promise<CheckoutPage>{
        await this.proceedToCheckOut.click();
        return new CheckoutPage(this.page);
    }
    //→ отображается адрес Julia
//→ Blue Top присутствует
//→ цена Rs. 500
//→ quantity 1


}