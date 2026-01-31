const { test, expect } = require('@playwright/test');
test.describe("login Test", ()=>{
    test('login - Client App', async function({page, browser}){
    const pageUrl='https://rahulshettyacademy.com/client/#/auth/login';
    const firstName = 'Playwright';
    const lastName = 'test';
    const email = 'playwright_nat@test.com';
    const phoneNumber ='0123456789';
    const occupation ='Engineer';
    const gender = 'Male';
    const password ="Password@12";
    const emailInputField= page.locator('#userEmail');
    const passwordInput = page.locator('#userPassword');
    const loginButton = page.locator('#login');
    const cardBody = page.locator('.card-body b');
    await page.goto(pageUrl);
    await emailInputField.fill(email);
    await passwordInput.fill(password);
    await loginButton.click();
    await page.waitForLoadState('networkidle') //Wait untill network comes to idle state
    await cardBody.first().waitFor();
    const title = await cardBody.allTextContents();
    console.log(title)
})
})