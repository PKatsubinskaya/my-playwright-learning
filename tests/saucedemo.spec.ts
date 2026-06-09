import { test, expect } from '@playwright/test'

test.describe("SauceDemo", () => {
    test.describe('Login', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/");
        });

        test('positive login test', async ({ page }) => {
            await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
            await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
            await page.getByRole('button', {name: 'Login'}).click();
            await expect(page).toHaveURL(/inventory/);
        })

        test('negative login test', async ({ page }) => {
            await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
            await page.getByRole('textbox', {name: 'Password'}).fill('secretsauce');
            await page.getByRole('button', {name: 'Login'}).click();
            await expect(
                page.getByRole('heading', {name: 'Epic sadface: Username and password do not match any user in this service'})
            ).toBeVisible();
        })

        test('negative login test empty fields', async ({ page }) => {
            await page.getByRole('button', {name: 'Login'}).click();
            await expect(
                page.getByRole('heading', {name: 'Epic sadface: Username is required'})
            ).toBeVisible();
        });
    
        test('nagative login test empty password', async({ page}) => {
            await page.getByRole('textbox', {name: "Username"}).fill('standard_user')
            await page.getByRole('button', {name: "Login"}).click()
            await expect(
                page.getByRole('heading', {name: 'Epic sadface: Password is required'})
            ).toBeVisible();
        })

        test('negative login test empty username', async({ page}) => {
            await page.getByRole('textbox', {name: 'Password'}).fill('secret_sausage')
            await page.getByRole('button', {name: 'Login'}).click()
            await expect(
                page.getByRole('heading', {name: 'Epic sadface: Username is required'})
            ).toBeVisible();
        })

        test.skip('login with space before username', async({ page }) => {
            await page.getByRole('textbox', {name: 'username'}).fill(' standard_user');
            await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
            await page.getByRole('button', {name: 'Login'}).click();
            await expect(page).toHaveURL(/inventory/);
        })
    })


    test.describe('Cart', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
        await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page).toHaveURL(/inventory/);

    });

    test('add to cart', async ({ page }) => {
        await page.getByRole('button', {name: 'Add to cart'}).nth(0).click()
        await expect(
            page.locator(".shopping_cart_badge"),
            "Cart badge should show 1 after adding a product"
        ).toHaveText("1");
    });
    
    test('Remove item from cart', async ({ page}) => {
        await page.getByRole('button', {name: 'Add to cart'}).nth(0).click()
        await expect(
            page.locator(".shopping_cart_badge"),
            "Cart badge should show 1 after adding a product"
        ).toHaveText("1");
        await expect(page.getByRole('button', {name: 'Remove'})).toBeVisible();
        await page.getByRole('button', {name: 'Remove'}).nth(0).click()
        await expect(
            page.locator(".shopping_cart_badge"),
            "Cart badge should not be visible after removing product"
        ).not.toBeVisible();
    })
    })
})


