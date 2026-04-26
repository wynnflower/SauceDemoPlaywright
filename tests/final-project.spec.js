const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../pages/InventoryPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const testData = require('../data/final-project.json');

for (const data of testData) {
    test(`Final Project: ${data.testName}`, async ({ page, context }) => {
        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);

        // 1. API Injection (Bypass Login)
        await context.addCookies([{
            name: 'session-username',
            value: 'standard_user',
            domain: 'www.saucedemo.com',
            path: '/'
        }]);

        // 2. Langsung ke Inventory
        await page.goto('https://www.saucedemo.com/inventory.html');

        // 3. Loop: Tambahkan barang berdasarkan JSON
        for (const item of data.items) {
            await inventoryPage.addItemByName(item);
        }

        // 4. Validasi Badge Keranjang
        const badge = page.locator('.shopping_cart_badge');
        await expect(badge).toHaveText(data.items.length.toString());

        // 5. Checkout Process
        await inventoryPage.goToCart();
        await inventoryPage.clickCheckout();
        await checkoutPage.fillInformation(data.firstName, data.lastName, data.postalCode);
        await checkoutPage.finishCheckout();

        // 6. Final Assertion
        await expect(checkoutPage.successMessage).toContainText('Thank you');

        // Ambil screenshot sebagai bukti transaksi sukses
        await page.screenshot({ path: `screenshots/${data.testName}.png` });
    });
}