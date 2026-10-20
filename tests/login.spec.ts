import {test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
})

test('login with invalid credentials', async () => {
    await test.step('Try to login with invalid credentials', async() => {
        await loginPage.fillEmail("test@test.com");
        await loginPage.fillPassword("123456");
        await loginPage.clickLoginButton();
    });

    await test.step('Check that error appeared', async() => {
        await loginPage.checkLoginError();
    });
});

test('login with empty email', async () => {
    await test.step('Try to login with empty email', async () => {
        await loginPage.fillPassword('123456');
        await loginPage.clickLoginButton();
    });

    await test.step('Check that login is rejected', async () => {
        await loginPage.checkEmailRequired();
        await loginPage.checkLoginPageOpened();
    });
})