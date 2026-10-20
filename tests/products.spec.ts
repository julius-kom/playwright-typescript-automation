import { ProductPage } from "../pages/ProductsPage";
import {test, expect} from '@playwright/test';


test('Get num of products', async({page}) => {
    const productPage = new ProductPage(page);
    const productName = 'Blue Top';
    const productPrice = 'Rs. 500';
    const productQuantity = '1';

    const productsCount = await test.step('Open and get', async () => {
        await productPage.openProducts();
        const productsCount = await productPage.getProductsCount();
        expect(productsCount).toBeGreaterThan(0);
        return productsCount;
    });
      
    
    const cartPage = await test.step('Add product to Cart', async () => {
        const price = await productPage.getProductPriceByName(productName);
        expect(price).toBe('Rs. 500');
        await productPage.addProductToCart(productName);
        return await productPage.goToCartFromModalWindow();
    });

    await test.step('Check product in Cart', async () => {
        await cartPage.checkCartPageOpened();
        await cartPage.checkProductInCart(productName, productPrice, productQuantity);
    });
    

    await test.step('Delete product from Cart', async() =>{
        await cartPage.deleteProductFromCart(productName);
        await cartPage.checkProductNotInCart(productName);
    });

})

test('adding the same product twice updates cart quantity and total', async ({page}) => {
    const productPage = new ProductPage(page);
    const productName = 'Blue Top';

    await productPage.openProducts();
    await productPage.addProductToCart(productName);
    await productPage.continueShoppingFromModal();
    await productPage.addProductToCart(productName);

    const cartPage = await productPage.goToCartFromModalWindow();
    await cartPage.checkCartPageOpened();
    await cartPage.checkProductRowCount(productName, 1);
    await cartPage.checkProductInCart(productName, 'Rs. 500', '2');
    await cartPage.checkProductTotalPrice(productName, 'Rs. 1000');
});