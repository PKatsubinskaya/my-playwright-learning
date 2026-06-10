import { test, expect } from '@playwright/test'

test.skip('list handling', async ({ page }) => {
   await page.goto('/')

   // Task 2 — Fix a bad locator.
   // page.locator("div:nth-child(3) > span")
   // page.getByText("span text")
   // page.getByTestId("test-id")

   // Login
   await page.locator('[data-test="username"]').fill('standard_user')
   await page.locator('[data-test="password"]').fill('secret_sauce')
   await page.locator('[data-test="login-button"]').click()

   // List handling
   const items = page.locator('.inventory_item')
   const count = await items.count()
   console.log(count)

   await items.nth(1).click()

   // await items.filter({ hasText: 'Sauce Labs Backpack' }).click()
   await page.getByText('Sauce Labs Bike Light',{exact:true}).click()
   await page.getByRole( 'button', { name: 'Back to products'}).click()
})



