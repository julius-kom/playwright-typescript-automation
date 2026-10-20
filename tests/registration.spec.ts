import {test} from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { AddressData } from '../models/AddressData';


test('successful user registration', async ({page}) => {
    const name = 'Playwright CI Tester';
    const email = `tester.${Date.now()}@example.com`;
    const signupPage = new SignupPage(page);
    const password = 'Test123!';
    const address : AddressData = {
            firstName: 'UserName',
            lastName: 'UserLastName',
            address: 'Test Street 10',
            country: 'Canada',
            state: 'Ontario',
            city: 'Toronto',
            zipcode: 'M5V 2T6',
            mobileNumber: '1234567890'
        };

    const accountInformationPage = 
        await test.step('Start user registration', async () => {
            await signupPage.open();
            await signupPage.fillName(name);
            await signupPage.fillEmail(email);
            return await signupPage.clickSignUp();
    });

    await test.step('Fill account information', async () => {
        await accountInformationPage.checkPageOpened();
        await accountInformationPage.checkRegistrationData(name, email);
        await accountInformationPage.selectTitleMrs();
        await accountInformationPage.fillPassword(password);
        await accountInformationPage.selectDateOfBirth('22', '1', '1990');
        await accountInformationPage.subscribeToNewsletter();

    });

    const accountCreatedPage  = await test.step('Fill address information and create account', async () => {
        await accountInformationPage.fillAddress(address);
        return await accountInformationPage.clickCreateAccount();
        });

    const homePage = await test.step('Verify user is logged in', async () => {
        await accountCreatedPage.checkPageAccCreatedOpened();
        const homePage = await accountCreatedPage.clickContinueButton();
        await homePage.checkUserLoggedIn(name);
        return homePage;
        });

    const loginPage = await test.step('Logout and check login page', async () => {
        const loginPage = await homePage.clickLogoutButton();
        await loginPage.checkLoginPageOpened();
        return loginPage;
    });

    await test.step('Login with created account and verify user is logged in again', async () => {
        const homePageAfterLogin = await loginPage.loginSuccessfully(email, password);
        await homePageAfterLogin.checkUserLoggedIn(name);
    });

})