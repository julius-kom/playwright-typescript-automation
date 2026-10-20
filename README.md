# Playwright Test Automation

End-to-end browser tests for [Automation Exercise](https://www.automationexercise.com/), a practice e-commerce website. The suite covers account registration and login, product and cart interactions, and navigation to checkout as an authenticated user.

## Tech Stack

- TypeScript and Node.js
- Playwright Test (`@playwright/test`)
- dotenv for local environment variable loading
- GitHub Actions for continuous integration

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── models/
│   └── AddressData.ts
├── pages/
│   ├── AccountCreatedPage.ts
│   ├── AccountInformationPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   └── SignupPage.ts
├── playwright/
│   └── .auth/                 # Generated authentication state
├── tests/
│   ├── auth.setup.ts
│   ├── checkout.spec.ts
│   ├── login.spec.ts
│   ├── products.spec.ts
│   └── registration.spec.ts
├── .env.example
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

Playwright generates `playwright-report/` and `test-results/` when tests run. These generated directories and `playwright/.auth/` are gitignored.

## Test Architecture

Page Objects in `pages/` encapsulate page locators, actions, and assertions; page-transition methods return the next Page Object. `models/AddressData.ts` provides a typed address shape for registration.

`playwright.config.ts` defines three projects: `setup` runs `auth.setup.ts`; `chromium` runs the login, registration, and product specs; and `chromium-auth` runs checkout in Desktop Chrome. The authenticated project depends on `setup` and reuses the storage state saved to `playwright/.auth/user.json`. The setup signs in using environment variables and writes the browser context's storage state for checkout.

## Implemented Test Scenarios

- **Login** (`tests/login.spec.ts`): invalid credentials show an error; an empty email is rejected by the required field.
- **Registration** (`tests/registration.spec.ts`): create an account, verify the logged-in state, log out, then log in with the new account.
- **Products and cart** (`tests/products.spec.ts`): verify the product list is non-empty; add Blue Top and verify its unit price and quantity; remove it; add it twice and verify one row, quantity 2, unit price Rs. 500, and total Rs. 1000.
- **Authenticated checkout** (`tests/checkout.spec.ts`): add Blue Top to the cart and verify that the cart and checkout pages open. This scenario does not place an order.

## Installation and Local Setup

Requirements: Node.js and npm. Node.js LTS is used in CI.

Install the locked dependencies and the Chromium browser used by the configured test projects:

```bash
npm ci
npx playwright install chromium
```

Create a local `.env` file from the example:

```powershell
Copy-Item .env.example .env
```

On macOS or Linux:

```bash
cp .env.example .env
```

Set `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` in `.env` to the credentials for an existing test account. The authentication setup requires both values. Keep credentials private; `.env` is gitignored.

## Run Tests and View Reports

Run all configured projects:

```bash
npx playwright test
```

Run only the unauthenticated Chromium project:

```bash
npx playwright test --project=chromium
```

Run the authenticated checkout project and its setup dependency:

```bash
npx playwright test --project=chromium-auth
```

Run one spec:

```bash
npx playwright test tests/products.spec.ts
```

The configured HTML reporter writes to `playwright-report/`. Open the latest report with:

```bash
npx playwright show-report
```

## GitHub Actions CI

The workflow in `.github/workflows/playwright.yml` runs on pushes and pull requests targeting `main` or `master`. It checks out the repository, sets up Node.js LTS, installs dependencies with `npm ci`, installs Playwright browsers and system dependencies, and runs `npx playwright test`.

The test step receives `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` from GitHub Actions repository secrets with those names. The workflow uploads `playwright-report/` as the `playwright-report` artifact, retaining it for 30 days when the workflow is not cancelled.