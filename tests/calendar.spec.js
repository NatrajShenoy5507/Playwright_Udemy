import { test, expect } from '@playwright/test'
const pageUrl='https://rahulshettyacademy.com/seleniumPractise/#/offers';

test("calendar handling", async ({page})=>{
    const monthNumber ="5";
    const date = "20";
    const year ="2027"
    const expectedValue = [monthNumber, date, year];
    const datePicker =".react-date-picker__inputGroup";
    const monthLoc =".react-calendar__navigation__label";
    const monthSelect =".react-calendar__year-view__months__month";
    const selectDate ="//abbr[text()='"+date+"']";
    const inputLocator =".react-date-picker__inputGroup__input";
    await page.goto(pageUrl);
    await page.locator(datePicker).click();
    await page.locator(monthLoc).click();
    await page.locator(monthLoc).click();
    await page.getByText(year).click();
    await page.locator(monthSelect).nth(Number(monthNumber)-1).click();
    await page.locator(selectDate).click();
    const input = page.locator(inputLocator);
    for (let i = 0; i < expectedValue.length; i++) {
        const value = await input.nth(i).inputValue();
        expect(value).toEqual(expectedValue[i]) 
    }
})