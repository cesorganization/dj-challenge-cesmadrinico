# David Jones QE Challenge: UI & API Test Automation

This project demonstrates UI and API test automation using **Playwright**, **JavaScript**, and **Axios** for testing a sample eCommerce app (**Sauce Demo**) and a public weather API (**Weatherbit**).

---

## 📁 Folder Structure

```
.
├── src/
│   └── api/helpers         # API request helpers
|   └── ui/pages            # UI reusable pages/page object model (POM)
├── tests/
│   ├── api/                # API regression specs
│   └── ui/                 # UI smoke test spec
├── screenshots/            # Saved screenshots (added in gitignore)
├── test-results/           # Playwright HTML Report (added in gitignore)
├── .env                    # Environment config (API keys, test users)
├── .gitignore              # Untracked files
├── playwright.config.js    # Playwright test config
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 UI Automation - Sauce Demo

Tests the core shopping flow on [Sauce Demo](https://www.saucedemo.com/)

### ✅ Features Covered

- Login as standard user
- Random product selection (configurable range)
- Add to cart and validate cart badge count
- Verify cart contents: product name, quantity, and price
- Checkout with user details
- Validate item subtotal
- Complete checkout and verify success

### 🧲 Run the UI Tests

Use the following command to run the UI Tests:
```bash
npm run test:ui
```

### 🔧 `.env` Example for UI Test

```env
STANDARD_USERNAME=standard_user
STANDARD_PASSWORD=secret_sauce
MIN_PRODUCTS_TO_ADD=2    # Minimum qty of random products to add
MAX_PRODUCTS_TO_ADD=5    # Maximum qty of random products to add
```

---

## 🌍 API Automation - Weatherbit

Tests [Weatherbit Current Weather API](https://www.weatherbit.io/api/swaggerui/weather-api-v2#/Current32Weather32Data)

### ✅ Acceptance Criteria

- **AC1**: Get current weather for multiple locations via latitude & longitude
- **AC2**: Get current weather for multiple locations via postal code

### 🧲 Run the API Tests

Use the following command to run the API Tests:
```bash
npm run test:api
```

### 🔧 `.env` Example for API Test

```env
WEATHERBIT_API_KEY=your_actual_key_here
WEATHERBIT_BASE_URL=https://api.weatherbit.io/v2.0
```

> ⚠️ You must provide a valid Weatherbit API key.

---

## 📸 Screenshots & Reports

- Screenshots are available in `screenshots/` folder
- View last test report with:

```bash
npx playwright show-report test-results
```

---

## 🛠️ Setup Instructions

1. Clone the repo:
   ```bash
   git clone <your-repo-url>
   cd dj-challenge-cesmadrinico
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create and fill `.env` file as shown above

4. Run UI or API tests:
   ```bash
   npm run test:ui
   npm run test:api
   ```

---

## 🛆 Scripts

| Script              | Description                          |
|---------------------|--------------------------------------|
| `npm run test:ui`   | Run Sauce Demo UI smoke test         |
| `npm run test:api`  | Run Weatherbit API regression tests  |
| `npx playwright show-report test-results` | View Playwright HTML report |

---

## ✅ Tech Stack

- [Playwright](https://playwright.dev/) for UI automation
- [Axios](https://axios-http.com/) for HTTP requests
- JavaScript (Node.js)
- `.env` for secure environment variables
- module-alias (for modules aliasing
, e.g you can use @pages/loginPage instead of using relative path ../../)

---

## 🗃️ .gitignore Recommendations

```gitignore
.env
screenshots/
test-results/
playwright-report/
```

---

## 📬 Questions?

Feel free to reach out if you encounter any issues or need API access setup help!
Email: cecillemadrinico@gmail.com

---

