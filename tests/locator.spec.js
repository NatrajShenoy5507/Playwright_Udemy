import { test, expect } from '@playwright/test'
const pageUrl='https://rahulshettyacademy.com/angularpractice';
test('Special locators - getBylabel', async ({page})=>{
    await page.goto(pageUrl);
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Employed").click();
    await page.getByLabel("Student").check();
    await page.getByLabel("Gender").selectOption("Female");
})
test('Special locators - getByplaceHolder', async ({page})=>{
    await page.goto(pageUrl);
    await page.getByPlaceholder("Password").fill("Playwright_test")
})
test('Special locators - getByRole', async ({page})=>{
    await page.goto(pageUrl);
    await page.getByRole("button", {name:'Submit'}).click();
})
test('Special locators - getByText', async ({page})=>{
    await page.goto(pageUrl);
    await page.getByRole("button", {name:'Submit'}).click();
    const visible = await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await expect(visible).toBeTruthy();
    await page.getByRole('link', {name:'Shop'}).click();
    await page.locator('app-card').filter({hasText:'Nokia edge'}).getByRole('button').click();
})