import { test, expect } from '@playwright/test'
const pageUrl='https://rahulshettyacademy.com/AutomationPractice/';
test('Handle alerts', async ({page})=>{
    await page.goto(pageUrl);
    await page.on('dialog', dialog=> dialog.accept());
    await page.locator('#alertbtn').click()
})
test('Hover', async ({page})=>{
    await page.goto(pageUrl);
    await page.hover('#mousehover');
})
test('iFrame', async ({page})=>{
    await page.goto(pageUrl);
    const iFramepage = await page.frameLocator('#courses-iframe');
    await iFramepage.locator("li a[href*='lifetime-access']:visible").click();
})