
const { test, expect } = require('@playwright/test');
require('dotenv').config();
require('module-alias/register');
const LoginPage = require('@pages/loginPage');
const ProductsPage = require('@pages/productsPage');
const CartPage = require('@pages/cartPage');
const CheckoutPage = require('@pages/checkoutPage');

test('Sauce Demo Smoke Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
  
    // Login
    console.log('Logging in as a standard user...');
    await loginPage.open();
    await loginPage.login(process.env.STANDARD_USERNAME, process.env.STANDARD_PASSWORD);
    console.log('Login successful');
    await page.screenshot({ path: 'screenshots/login-success.png' });
  
    // Randomly add products
    const min = parseInt(process.env.MIN_PRODUCTS_TO_ADD);
    const max = parseInt(process.env.MAX_PRODUCTS_TO_ADD);
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`Adding ${count} random products to the cart...`);
    const addedProducts = await productsPage.addRandomProducts(count);
    await page.screenshot({ path: 'screenshots/products-added.png' });
  
    // Validate cart icon
    const actualCartCount = await productsPage.getCartIconCount();
    expect(actualCartCount).toBe(count);
    console.log(`Validating cart icon. Expected: ${count}, Actual: ${actualCartCount}`);
  
    // Go to cart and validate contents
    await productsPage.goToCart();
    console.log('Navigating to the cart...');

    const cartItems = await cartPage.getCartItems();
    expect(cartItems.length).toBe(addedProducts.length);
    for (const expected of addedProducts) {
        const match = cartItems.find(p => p.name === expected.name);
        expect(match).toBeTruthy();
        expect(match.price).toBe(expected.price, 2);
        expect(match.quantity).toBe(expected.quantity);
        console.log(`Validating item: ${expected.name}, Price: $${expected.price}, Quantity: ${expected.quantity}`);
    }
    console.log('Cart items validated successfully');
    await page.screenshot({ path: 'screenshots/cart-page.png' });

    // Checkout
    await cartPage.proceedToCheckout();
    console.log('Proceeding to checkout...');

    await checkoutPage.fillDetails('John', 'Doe', '90210');
    // After continuing to checkout
    const actualSubtotal = await checkoutPage.getItemSubtotal();
    const expectedSubtotal = addedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
    expect(actualSubtotal).toBe(expectedSubtotal, 2);
    console.log(`Validating expected subtotal: ${expectedSubtotal}, actual subtotal: ${actualSubtotal}`);
    console.log('Item subtotal validated successfully');
    await page.screenshot({ path: 'screenshots/checkout-step.png' });
    
    await checkoutPage.finishCheckout();
    console.log('Checkout completed');
    expect(await checkoutPage.isCheckoutSuccessful()).toBeTruthy();
    await page.screenshot({ path: 'screenshots/checkout-success.png' });
});