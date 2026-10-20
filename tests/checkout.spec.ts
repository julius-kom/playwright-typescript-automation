import {test} from '@playwright/test';
import { ProductPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('checkout as authenticated user', async ({page}) => {
    const productPage = new ProductPage(page);
    const productName = 'Blue Top';

    await productPage.openProducts();

    const cartPage = await test.step('Add product to Cart', async () => {
        await productPage.addProductToCart(productName);
        return await productPage.goToCartFromModalWindow();
    });

    await test.step('Check Cart', async () => {
    await cartPage.checkCartPageOpened();
    });

    const checkoutPage = await test.step('Click to Check out page', async () =>{
        return await cartPage.clickOnProceedToCheckOut();
    });

    await test.step('Check Checkout page', async () => {
        await checkoutPage.checkCheckoutPageOpened();
    })
    
})