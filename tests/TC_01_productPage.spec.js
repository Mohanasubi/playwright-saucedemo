const {test,expect} = require('@playwright/test')

 test('Product page test',async({page})=>{
    await page.goto('https://www.saucedemo.com/')
     await page.locator("#user-name").fill("standard_user")
     await page.locator("#password").fill("secret_sauce")
     await page.locator("#login-button").click()


     expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

     await expect(page.locator('.app_logo')).toContainText("Swag Labs");

     const productList= page.locator(".inventory_item_name")
     await expect(productList).toHaveCount(6)

    const addTocart= await page.locator('#add-to-cart-sauce-labs-backpack')
    await expect(addTocart).toContainText('Add to cart')

    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click()


 })