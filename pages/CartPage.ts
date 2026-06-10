import { type Locator, type Page } from "@playwright/test";


export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems              = page.locator(".cart_item");
    this.checkoutButton         = page.getByTestId("checkout");
    this.continueShoppingButton = page.getByTestId("continue-shopping");
  }

  async open() {
    await this.page.goto("/cart.html");
  }

  async removeItem(itemName: string) {
    const item = this.page.locator(".cart_item", { hasText: itemName });
    await item.getByRole("button", { name: "Remove" }).click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getItemNames(): Promise<string[]> {
    return await this.page
      .locator(".inventory_item_name")
      .allTextContents();
  }

  async isItemInCart(itemName: string): Promise<boolean> {
    const item = this.page.locator(".cart_item", { hasText: itemName });
    return await item.isVisible();
  }
}