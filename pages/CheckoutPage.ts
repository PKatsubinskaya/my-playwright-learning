// pages/CheckoutPage.ts
import { type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;

  // Step 1 elements
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // Step 2 elements
  readonly finishButton: Locator;
  readonly orderSummaryItems: Locator;
  readonly totalPrice: Locator;

  // Order complete elements
  readonly confirmationMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Step 1
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput  = page.getByPlaceholder("Last Name");
    this.zipCodeInput   = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.getByTestId("continue");
    this.cancelButton   = page.getByTestId("cancel");
    this.errorMessage   = page.getByTestId("error");

    // Step 2
    this.finishButton       = page.getByTestId("finish");
    this.orderSummaryItems  = page.locator(".cart_item");
    this.totalPrice         = page.locator(".summary_total_label");

    // Order complete
    this.confirmationMessage = page.locator(".complete-header");
    this.backHomeButton      = page.getByTestId("back-to-products");
  }

  // ─── Navigation ───────────────────────────────────────
  async openStepOne() {
    await this.page.goto("/checkout-step-one.html");
  }

  async openStepTwo() {
    await this.page.goto("/checkout-step-two.html");
  }

  // ─── Step 1 Actions ───────────────────────────────────
  async fillInfo(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  // ─── Step 2 Actions ───────────────────────────────────
  async clickFinish() {
    await this.finishButton.click();
  }

  // ─── Getters ──────────────────────────────────────────
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }

  async getTotalPrice(): Promise<string> {
    return await this.totalPrice.innerText();
  }

  async getConfirmationMessage(): Promise<string> {
    return await this.confirmationMessage.innerText();
  }

  async getOrderItemCount(): Promise<number> {
    return await this.orderSummaryItems.count();
  }
}