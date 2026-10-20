import {Page, Locator} from '@playwright/test';
import { link } from 'node:fs';
import { CartPage } from './CartPage';

export class ProductPage{
    private readonly page: Page;
    private readonly products: Locator
    private readonly viewCart: Locator
    private readonly continueShoppingButton: Locator

    constructor (page: Page) {
        this.page = page;
        this.products = page.locator('.product-image-wrapper');
        this.viewCart = page.locator('.modal-content').getByRole('link', {name: 'View Cart'});
        this.continueShoppingButton = page.getByRole('button', {name: 'Continue Shopping'});
    }

    async openProducts(){
        await this.page.goto('/products');
    }

    async getProductsCount():Promise<number>{
        return this.products.count();
    }

    getProductByName(name: string): Locator {
        return this.products.filter({ hasText: name });
    }

    async getProductPriceByName(name: string): Promise<string | null>{
        const product = this.products.filter({hasText: name});
        return await product.locator('.productinfo h2').textContent();
    }


    async addProductToCart(name: string): Promise<void> {
        await this.getProductByName(name)
        .locator('.productinfo .add-to-cart')
        .click();
    }

    async continueShoppingFromModal(): Promise<void>{
        await this.continueShoppingButton.click();
    }

    async goToCartFromModalWindow(): Promise<CartPage>{
        await this.viewCart.click();
        return new CartPage(this.page);
    }

}

