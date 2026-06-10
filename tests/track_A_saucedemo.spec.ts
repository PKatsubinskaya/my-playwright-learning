import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.ts";
import { InventoryPage } from "../pages/InventoryPage.ts";
import { CartPage } from "../pages/CartPage.ts";
import { CheckoutPage } from "../pages/CheckoutPage.ts";

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

test.describe("Cart", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.open();
  });

  //Cart badge shows correct count after adding a product
  test("cart badge shows correct count after adding a product", async ({ page }) => {
  await inventoryPage.addItemByIndex(0);

  await expect(inventoryPage.cartBadge).toHaveText("1");
});

test("cart page shows the name of the selected product", async ({ page }) => {
  await expect(inventoryPage.productItems.first()).toBeVisible();
  const productNames = await inventoryPage.getProductNames();
  await inventoryPage.addItemByIndex(0);
  await inventoryPage.goToCart();

  await expect(page.getByText(productNames[0])).toBeVisible();
});

test("removing a product updates the cart badge", async ({ page }) => {
  await expect(inventoryPage.productItems.first()).toBeVisible();
  const productNames = await inventoryPage.getProductNames();

  await inventoryPage.addItemByIndex(0);
  await inventoryPage.addItemByIndex(1);
  await inventoryPage.goToCart();

  await cartPage.removeItem(productNames[0]);

  await expect(cartPage.cartItems).toHaveCount(1);
});

test("adding multiple products shows correct badge count", async ({ page }) => {
  await inventoryPage.addItemByIndex(0);
  await inventoryPage.addItemByIndex(1);
  await inventoryPage.addItemByIndex(2);

  await expect(inventoryPage.cartBadge).toHaveText("3");
});

  });

test.describe("Checkout", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.open();
    await inventoryPage.addItemByIndex(0);
    await inventoryPage.goToCart();
    await expect(cartPage.checkoutButton).toBeVisible(); 
    await cartPage.clickCheckout();
  });
  
  test("user can complete the checkout flow", async ({ page }) => {
  
  await test.step("fill in checkout information", async () => {
    await checkoutPage.fillInfo("John", "Doe", "12345");
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL("/checkout-step-two.html");
  });

  await test.step("overview page shows the selected product", async () => {
    await expect(checkoutPage.orderSummaryItems.first()).toBeVisible();
  });

  await test.step("finish button completes the order", async () => {
    await checkoutPage.clickFinish();
    await expect(page).toHaveURL("/checkout-complete.html");
  });

  await test.step("success message is visible", async () => {
    await expect(checkoutPage.confirmationMessage).toHaveText("Thank you for your order!");
  });

});

//Empty first name shows error message
  test("empty first name shows error message", async ({ page }) => {
  await checkoutPage.fillInfo("", "Doe", "12345");
  await checkoutPage.clickContinue();

  await expect(page.getByRole('heading', { name: 'Error: First Name is required' })).toBeVisible();

});

});

test.describe("Sorting", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.open();
  });

  test("user can select price low to high sorting option", async ({ page }) => {
  await inventoryPage.sortBy("lohi");

  await expect(inventoryPage.sortDropdown).toHaveValue("lohi");
  });

  test("products are displayed in ascending order by price", async ({ page }) => {
    await inventoryPage.sortBy("lohi");

    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

});


