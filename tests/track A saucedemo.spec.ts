import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.ts";
import { InventoryPage } from "../pages/InventoryPage.ts";
import { CartPage } from "../pages/CartPage.ts";

test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

 //Valid user can log in and see inventory page
  test("standard user can log in", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);
  });

//Locked user cannot log in and sees correct error message
  test("locked user sees error message", async ({ page }) => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await expect(page.getByRole('heading', { name: 'Epic sadface: Sorry, this user has been locked out.' })).toBeVisible();
  });

//Wrong password shows error message
  test("wrong password shows error message", async ({ page }) => {
    await loginPage.login("standard_user", "wrong_password");
    await expect(
    page.getByRole("heading", { name: "Epic sadface: Username and password do not match" })
    ) .toBeVisible();
});

//Empty username shows validation error
  test("empty username shows validation error", async ({ page }) => {
    await loginPage.login("", "secret_sauce");
    await expect(
    page.getByRole("heading", { name: "Epic sadface: Username is required" })
    ).toBeVisible();
});
});

