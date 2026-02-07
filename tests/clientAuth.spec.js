const { test, expect } = require('@playwright/test');
 const pageUrl='https://rahulshettyacademy.com/client/#/auth/login';
    const firstName = 'Playwright';
    const lastName = 'test';
    const email = 'playwright_nat@test.com';
    const phoneNumber ='0123456789';
    const occupation ='Engineer';
    const gender = 'Male';
    const password ="Password@12";
    const country =" India";
    let cardDetails ={
        number:"3235 9931 5507 2293",
        month:"05",
        day:"20",
        cvv:"5768",
        name:"Playwright test",
    };
    const inValidCoupon ="PLAYWRIGHTTESTING";
    const validCoupon ="rahulshettyacademy";
    const thankYoutext = " Thankyou for the order. ";
    const orderPageHeadingText = "Your Orders";
    const orderpreHeading = "Thank you for Shopping With Us";
    const orderHeading =" order summary ";

    

test.describe("login Test", ()=>{
    test('login - Client App', async function({page, browser}){
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
    test('Shopping - Add to Cart flow', async({page})=>{
        const emailInputField= page.locator('#userEmail');
        const passwordInput = page.locator('#userPassword');
        const loginButton = page.locator('#login');
        const product = page.locator('.card-body');
        const productName = "ZARA COAT 3";
        const cardBody = page.locator('.card-body b');
        const cartLink = page.locator('[routerlink="/dashboard/cart"]');
        const cartItemName = page.locator('.cartSection h3');
        const cartSection = page.locator('.cart ul li')
        await page.goto(pageUrl);
        await emailInputField.fill(email);
        await passwordInput.fill(password);
        await loginButton.click();
        await page.waitForLoadState('networkidle')
        await cardBody.first().waitFor()
        let items = await product.count();
        for(let i =0; i<items; i++){
           if(await product.nth(i).locator("b").textContent() === productName){
                await product.nth(i).locator("text= Add To Cart").click();
                break;
           } 
        }
        await cartLink.click();
        await cartSection.first().waitFor()
        await expect(cartItemName).toContainText(productName)
        const isVisible = await page.locator(`h3:has-text("${productName}")`).isVisible();
        await expect(isVisible).toBeTruthy();

    });
    test('Shopping - CheckOut flow', async({page})=>{
        //Elements
        const emailInputField= page.locator('#userEmail');
        const passwordInput = page.locator('#userPassword');
        const loginButton = page.locator('#login');
        const product = page.locator('.card-body');
        const productName = "ZARA COAT 3";
        const cardBody = page.locator('.card-body b');
        const cartLink = page.locator('[routerlink="/dashboard/cart"]');
        const cartItemName = page.locator('.cartSection h3');
        const cartSection = page.locator('.cart ul li');
        const checkOutButton = page.locator('text="Checkout"');
        const placeholder = page.locator('[placeholder*="Country"]');
        const options= page.locator(".ta-results");
        const cardNumber = page.locator('.payment__cc .form__cc input').nth(0);
        const expiryMonth = page.locator('.payment__cc .form__cc select').nth(0);
        const expiryDate = page.locator('.payment__cc .form__cc select').nth(1);
        const cvv = page.locator('.payment__cc .form__cc input').nth(1);
        const nameOnCard = page.locator('.payment__cc .form__cc input').nth(2);
        const coupon = page.locator('.payment__cc .form__cc input').nth(3);
        const applyCounponButton = page.locator('button:has-text("Apply Coupon")');
        const couponAppliedtext =page.locator('text="* Coupon Applied"');
        const inValidCoupontext = page.locator('text="* Invalid Coupon"');
        const userEmailverify = page.locator(".user__name [type='text']");
        const placeOrderButton = page.locator('.action__submit');
        const submitSuccessThankYou = page.locator('.hero-primary');
        const orderIdlocator = page.locator('.em-spacer-1 .ng-star-inserted');
        const ordernavBar = page.locator('ul [routerlink="/dashboard/myorders"]');
        const orderPageHeading = page.locator('.container h1');
        const orderTable = page.locator('table');
        const emailWrapper = page.locator('.container-fluid .email-wrapper');
        const orderSummaryPagepreheading = page.locator('.container-fluid .email-wrapper .email-preheader');
        const orderSummaryPageHeading = page.locator('.email-container .email-title');

        //Test
        await page.goto(pageUrl);
        await emailInputField.fill(email);
        await passwordInput.fill(password);
        await loginButton.click();
        await page.waitForLoadState('networkidle')
        await cardBody.first().waitFor()
        let items = await product.count();
        for(let i =0; i<items; i++){
           if(await product.nth(i).locator("b").textContent() === productName){
                await product.nth(i).locator("text= Add To Cart").click();
                break;
           } 
        }
        await cartLink.click();
        await cartSection.first().waitFor()
        await expect(cartItemName).toContainText(productName)
        const isVisible = await page.locator(`h3:has-text("${productName}")`).isVisible();
        await expect(isVisible).toBeTruthy();
        await checkOutButton.click();
        await placeholder.pressSequentially("ind", {delay:100});
        await options.waitFor();
        const optionsCount = await options.locator('button').count();
        for (let index = 0; index < optionsCount; index++) {
            if(await options.locator("button").nth(index).textContent() === country){
                await options.locator("button").nth(index).click();
                break;
            }
            
        }
        await cardNumber.fill(cardDetails.number);
        await expiryMonth.selectOption({label:cardDetails.month});
        await expiryDate.selectOption({label:cardDetails.day});
        await cvv.fill(cardDetails.cvv);
        await nameOnCard.fill(cardDetails.name);
        await coupon.fill(inValidCoupon);
        await applyCounponButton.click();
        await inValidCoupontext.waitFor();
        await expect(inValidCoupontext).toBeVisible();
        await coupon.fill(validCoupon);
        await applyCounponButton.click();
        await couponAppliedtext.waitFor();
        await expect(couponAppliedtext).toBeVisible();
        await expect(userEmailverify.first()).toHaveText(email);
        await placeOrderButton.click();
        await expect(submitSuccessThankYou).toHaveText(thankYoutext);
        const orderId = await orderIdlocator.textContent();
        const orderSplit = orderId.split(" ");
        const finalOrderId =orderSplit[2];
        await ordernavBar.click();
        await expect(orderPageHeading).toHaveText(orderPageHeadingText);
        await orderTable.waitFor()
        const orders = await orderTable.locator('tbody tr').count();
        for (let i = 0; i < orders; i++) {
             if(await orderTable.locator('tbody tr th').nth(i).textContent() === finalOrderId){
                await orderTable.locator('tbody tr').nth(i).locator('td button').first().click()
             }
             break;
        }
        await emailWrapper.waitFor();
        await expect(orderSummaryPagepreheading).toHaveText(orderpreHeading);
        await expect(orderSummaryPageHeading).toHaveText(orderHeading);
    })
})