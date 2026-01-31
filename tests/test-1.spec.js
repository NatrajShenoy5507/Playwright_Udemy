const { test, expect } = require('@playwright/test');
    test('Login Playwright Test - login', async function({page, browser}){
    //running chrome browser
    // let userName = page.locator('#username');
    // let password = page.locator('#password');
    // let signInButton = page.locator('#signInBtn');
    // let cards = page.locator('.card-body a');
    let url = 'https://rahulshettyacademy.com/loginpagePractise/';
    let userName = page.locator('#username');
    let password = page.locator('#password');
    let signInButton = page.locator('#signInBtn');
    let cards = page.locator('.card-body a');
    let dropdownElement = page.locator('select.form-control')
    let radioButtonUser = page.locator('input[value="user"]')
    let okayButton = page.locator('#okayBtn')
    let termsCheck =page.locator('#terms');
    let errorMessage =page.locator("[style*='block']");
    let docLink = page.locator("[href*='documents-request']")
    //Tests
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.fill('natrajshenoy');
    await password.fill('password1!');
    await page.locator('#terms').check();
    await signInButton.click();
    const errorMessagetext = await page.locator("[style*='block']").textContent();
    await expect(errorMessagetext).toContain("Incorrect username/password.")
     await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await signInButton.click();
    // await ex pect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    // await page.locator('.card-body a').first().textContent()
    // await page.locator('.card-body a').nth(1).textContent()
    let cardtexts = await cards.allTextContents()
    console.log(cardtexts)
})
test('Login Playwright Test - Selet dropdown', async function({page, browser}){
    //running chrome browser
    //Elements
    let url = 'https://rahulshettyacademy.com/loginpagePractise/';
    let userName = page.locator('#username');
    let password = page.locator('#password');
    let signInButton = page.locator('#signInBtn');
    let cards = page.locator('.card-body a');
    let dropdownElement = page.locator('select.form-control')
    let radioButtonUser = page.locator('input[value="user"]')
    let okayButton = page.locator('#okayBtn')
    let termsCheck =page.locator('#terms');
    let errorMessage =page.locator("[style*='block']");
    let docLink = page.locator("[href*='documents-request']")
    //Tests
    await page.goto(url);
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await expect(docLink).toHaveAttribute("class","blinkingText")
    await userName.fill('natrajshenoy');
    await password.fill('password1!');
    await termsCheck.check();
    await dropdownElement.selectOption('consult')
    await radioButtonUser.click()
    await expect(radioButtonUser).toBeChecked()
    console.log(await radioButtonUser.isChecked())
    await okayButton.click();
    await signInButton.click();
    const errorMessageText = await errorMessage.textContent();
    await expect(errorMessageText).toContain("Incorrect username/password.")
    console.log(errorMessageText)
}) 
test("handling Pages or windows", async ({browser})=>{
    //Page context
    const context = await browser.newContext();
    const page = await context.newPage()

    //Elements
    let url = 'https://rahulshettyacademy.com/loginpagePractise/';
    let userName = page.locator('#username');
    let password = page.locator('#password');
    let signInButton = page.locator('#signInBtn');
    let cards = page.locator('.card-body a');
    let dropdownElement = page.locator('select.form-control')
    let radioButtonUser = page.locator('input[value="user"]')
    let okayButton = page.locator('#okayBtn')
    let termsCheck =page.locator('#terms');
    let errorMessage =page.locator("[style*='block']");
    let docLink = page.locator("[href*='documents-request']"); 
    
    //Tests
    await page.goto(url);
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    const [newPage]=await Promise.all([
        context.waitForEvent('page'),
        docLink.click()
    ])
    const textContentnewPage = await newPage.locator(".red").textContent();
    console.log(textContentnewPage)
    // const newPage = context.waitForEvent('page') //Listen whether any page is getting opened in the background
    // await docLink.click(); //new page will open
    let arrayText = textContentnewPage.split('@');
    let domainName = arrayText[1].split(' ')[0];
    console.log(arrayText)
    console.log(domainName)
    await page.goto(url)
    await page.pause()
    await userName.fill(domainName);
    console.log(await userName.inputValue());

})
