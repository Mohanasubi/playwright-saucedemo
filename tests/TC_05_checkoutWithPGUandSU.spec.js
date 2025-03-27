const {test,expect} = require('@playwright/test')

 test('Checkout workflow',async({page})=>{

    await page.goto('https://www.saucedemo.com/')

    //error messages as locked out user
    await page.locator("#user-name").fill("locked_out_user")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');

    // login as performance glitch user
     await page.locator("#user-name").fill("performance_glitch_user")
     await page.locator("#password").fill("secret_sauce")
     await page.locator("#login-button").click()


    //add to card
     await page.locator('#add-to-cart-sauce-labs-backpack').click()

    
    // logout
     await page.locator('#react-burger-menu-btn').click();
     await page.locator('#logout_sidebar_link').click();

     //login as standard user
     await page.locator("#user-name").fill("standard_user")
     await page.locator("#password").fill("secret_sauce")
     await page.locator("#login-button").click()

     //verify the item added
     await page.locator('.shopping_cart_link').click()
     const quantity=await page.locator(".cart_quantity").textContent()
     expect(quantity).toBe("1")

    //checkout
     await page.locator('.shopping_cart_link').click()
     await page.locator('#checkout').click();
 
     await page.locator("#first-name").fill("subi")
      await page.locator("#last-name").fill("v")
      await page.locator("#postal-code").fill("641664")
      await page.locator('#continue').click()
 
      await page.locator('#finish').click()
 
     const completeOrder= await page.locator('.complete-header')
     await expect(completeOrder).toContainText('Thank you for your order!')
     
     // standard user logout
      await page.locator('#react-burger-menu-btn').click();
      await page.locator('#logout_sidebar_link').click()

 })