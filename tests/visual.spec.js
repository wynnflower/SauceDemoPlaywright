const { test, expect } = require('@playwright/test');

test('Visual Comparison Test - Halaman Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    //  Visual Testing
    // 'login-page.png' adalah nama file referensi kita
    await page.locator('[data-test="username"]').fill('piko-id');
    await expect(page).toHaveScreenshot('login-page.png');
});