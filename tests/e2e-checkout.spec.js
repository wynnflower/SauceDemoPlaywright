const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Skenario E2E: User harus bisa checkout produk sampai selesai', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // 1. Login
    await loginPage.goto();
    await expect(page).toHaveTitle(/Swag Labs/);
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Tambah Barang & Masuk Keranjang
    await inventoryPage.backpackAddToCartBtn.waitFor({ state: 'visible' });
    await inventoryPage.addItemToCart();
    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('1'); // Memastikan angka '1' muncul di ikon keranjang
    await inventoryPage.goToCart();

    // 3. Checkout
    await inventoryPage.clickCheckout();

    // 4. Validasi Akhir (Halaman Informasi Pengiriman)
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
});

test('Skenario E2E Lengkap: Dari Login sampai Checkout Berhasil', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Flow: Login
    await loginPage.goto();
    await expect(page).toHaveTitle(/Swag Labs/);
    await loginPage.login('standard_user', 'secret_sauce');

    // Flow: Inventory & Cart
    await inventoryPage.backpackAddToCartBtn.waitFor({ state: 'visible' });
    await inventoryPage.addItemToCart();
    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('1'); // Memastikan angka '1' muncul di ikon keranjang
    await inventoryPage.goToCart();
    await inventoryPage.clickCheckout();

    // Flow: Checkout Information (Planning Step 4)
    await checkoutPage.fillInformation('Piko', 'ID', '55181');

    // Flow: Finish
    await checkoutPage.finishCheckout();

    // Assertion Akhir
    // await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
    // await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(checkoutPage.successMessage).toBeVisible();
    await expect(checkoutPage.successMessage).toContainText('Thank you');
});