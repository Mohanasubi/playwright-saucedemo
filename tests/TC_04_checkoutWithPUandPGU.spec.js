const {test,expect} = require('@playwright/test')

 test('Product page test',async({page})=>{

    await page.goto('https://www.saucedemo.com/')


    // login as problem user
     await page.locator("#user-name").fill("problem_user")
     await page.locator("#password").fill("secret_sauce")
     await page.locator("#login-button").click()
    

    //add to card
     await page.locator('#add-to-cart-sauce-labs-backpack').click()
     await page.locator('.shopping_cart_link').click()
     await page.locator('#checkout').click();

    //lastname error message
    await page.locator("#first-name").fill("subi")
    await page.locator("#last-name").fill("v")
    await page.locator("#postal-code").fill("641664")
    await page.locator('#continue').click()

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Error: Last Name is required');
    
    // problem user logout
     await page.locator('#react-burger-menu-btn').click();
     await page.locator('#logout_sidebar_link').click();

     //login as performance glitch user
     await page.locator("#user-name").fill("performance_glitch_user")
     await page.locator("#password").fill("secret_sauce")
     await page.locator("#login-button").click()

    //checkout workflow
     await page.locator('.shopping_cart_link').click()
     await page.locator('#checkout').click();
 
     await page.locator("#first-name").fill("subi")
      await page.locator("#last-name").fill("v")
      await page.locator("#postal-code").fill("641664")
      await page.locator('#continue').click()
 
      await page.locator('#finish').click()
 
     const completeOrder= await page.locator('.complete-header')
     await expect(completeOrder).toContainText('Thank you for your order!')
     
     // glitch user logout
      await page.locator('#react-burger-menu-btn').click();
      await page.locator('#logout_sidebar_link').click()

 })