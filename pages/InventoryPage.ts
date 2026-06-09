// pages/InventoryPage.ts
import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly productItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItems = page.locator(".inventory_item");
    this.sortDropdown = page.getByTestId("product-sort-container");
    this.cartBadge    = page.locator(".shopping_cart_badge");
    this.cartIcon     = page.locator(".shopping_cart_link");
  }

  async open() {
    await this.page.goto("/inventory.html");
  }

  async addItemToCart(itemName: string) {
    const item = this.page.locator(".inventory_item", { hasText: itemName });
    await item.getByRole("button", { name: "Add to cart" }).click();
  }

  async removeItemFromCart(itemName: string) {
    const item = this.page.locator(".inventory_item", { hasText: itemName });
    await item.getByRole("button", { name: "Remove" }).click();
  }
  
   async addItemByIndex(index: number) {
    await this.page.getByRole("button", { name: "Add to cart" }).nth(index).click();
  }

  async sortBy(option: "az" | "za" | "lohi" | "hilo") {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  async getProductNames(): Promise<string[]> {
    return await this.page
      .locator(".inventory_item_name")
      .allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page
      .locator(".inventory_item_price")
      .allTextContents();
    return priceTexts.map((p) => parseFloat(p.replace("$", "")));
  }

  async getCartBadgeCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    return parseInt(await this.cartBadge.innerText());
  }
}