import 'dotenv/config';
import {test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';



setup('authenticate', async({page}) => {
    const loginPage = new LoginPage(page);
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    if (!email || !password){
        throw new Error('TEST_USER_EMAIL and TEST_USER_PASSWORD must be set');
    }

    await loginPage.open();
    await loginPage.loginSuccessfully(email, password);

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
});