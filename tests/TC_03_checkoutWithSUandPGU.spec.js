const {test,expect} = require('@playwright/test')

 test('Product page test',async({page})=>{

    await page.goto('https://www.saucedemo.com/')

    //error messages
    await page.locator("#user-name").fill("subi")
    await page.locator("#password").fill("123")
    await page.locator("#login-button").click()

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

    // login as standard user
     await page.locator("#user-name").fill("standard_user")
     await page.locator("#password").fill("secret_sauce")
     await page.locator("#login-button").click()

     //validate all the links
     expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

     await expect(page.locator('.app_logo')).toContainText("Swag Labs");

     const productList= page.locator(".inventory_item_name")
     await expect(productList).toHaveCount(6)
     //All items
     await page.locator('#react-burger-menu-btn').click();
     await page.click('#inventory_sidebar_link');
     await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    //about
     await page.click('#about_sidebar_link');
     await expect(page).toHaveURL("https://saucelabs.com/");
     await page.goBack();

    //cart page
    await page.locator('.shopping_cart_link').click()
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

     //checkout page
     await page.locator('#checkout').click();
     await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")
     await page.goBack()
     await page.goBack()
    

    //add to card
     await page.locator('#add-to-cart-sauce-labs-backpack').click()

    
    // logout
     await page.locator('#react-burger-menu-btn').click();
     await page.locator('#logout_sidebar_link').click();

     //login as performance glitch user
     await page.locator("#user-name").fill("performance_glitch_user")
     await page.locator("#password").fill("secret_sauce")
     await page.locator("#login-button").click()

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
     
     // glitch user logout
      await page.locator('#react-burger-menu-btn').click();
      await page.locator('#logout_sidebar_link').click()

 })