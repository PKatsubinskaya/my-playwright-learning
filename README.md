# Track A — Saucedemo Playwright Test Suite

## Test target
SauceDemo (https://www.saucedemo.com)

## Covered user journey
Login → product sorting → cart → checkout

## Test cases
- Valid user can log in and see inventory page
- Locked user cannot log in and sees correct error message
- Wrong password shows error message
- Empty username shows validation error
- Cart badge shows correct count after adding a product
- Cart page shows the name of the selected product
- Removing a product updates the cart badge
- Adding multiple products shows correct badge count
- User can sort products by price (low to high)
- User can complete checkout and see success message
- Empty first name shows error message

## Project structure
- `pages/` — Page Object classes (LoginPage, InventoryPage, CartPage, CheckoutPage)
- `tests/` — test specs (track_A_saucedemo.spec.ts)
- `playwright.config.ts` — configuration

## How to run
```bash
npm install
npx playwright install
npx playwright test tests/track_A_saucedemo.spec.ts
npx playwright show-report
```

## Notes
- No hard waits (`waitForTimeout`) are used
- Tests use semantic locators (`getByRole`, `getByPlaceholder`, `getByTestId`)
- Checkout flow uses `test.step` for clear reporting

## Known limitations
- This suite covers only the selected user journey
- It does not cover all possible edge cases