const {test,expect} = require('@playwright/test')

 test('Product page test',async({page})=>{
    await page.goto('https://www.saucedemo.com/')
     await page.locator("#user-name").fill("standard_user")
     await page.locator("#password").fill("secret_sauce")
     await page.locator("#login-button").click()

    await page.locator('#add-to-cart-sauce-labs-backpack').click()

    await page.locator('.shopping_cart_link').click()
    await page.locator('#checkout').click();

    await page.locator("#first-name").fill("subi")
     await page.locator("#last-name").fill("v")
     await page.locator("#postal-code").fill("641664")
     await page.locator('#continue').click()

     await page.locator('#finish').click()

    const completeOrder= await page.locator('.complete-header')
    await expect(completeOrder).toContainText('Thank you for your order!')
    

     await page.locator('#react-burger-menu-btn').click();
     await page.locator('#logout_sidebar_link').click()

 })