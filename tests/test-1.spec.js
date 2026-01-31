const { test, expect } = require('@playwright/test');

// test('First Playwright Test', async function({browser, page}){
//     //running chrome browser
//     //const context = await browser.newContext();
//     //const page = await context.newPage()
//     await page.goto('https://rahulshettyacademy.com');
// })
test('Login Playwright Test - login', async function({browser, page}){
    //running chrome browser
    let userName = page.locator('#username');
    let password = page.locator('#password');
    let signInButton = page.locator('#signInBtn');
    let cards = page.locator('.card-body a');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.fill('natrajshenoy');
    await password.fill('password1!');
    await page.locator('#terms').check();
    await signInButton.click();
    const errorMessage = await page.locator("[style*='block']").textContent();
    await expect(errorMessage).toContain("Incorrect username/password.")
     await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await signInButton.click();
    // await ex pect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    // await page.locator('.card-body a').first().textContent()
    // await page.locator('.card-body a').nth(1).textContent()
    let cardtexts = await cards.allTextContents()
    console.log(cardtexts)
})
test.skip('Login Playwright Test - Valid login', async function({browser, page}){
    //running chrome browser
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('natrajshenoy');
    await page.locator('#password').fill('password1!');
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    const errorMessage = await page.locator("[style*='block']").textContent();
    await expect(errorMessage).toContain("Incorrect username/password.")
    console.log(errorMessage)
})