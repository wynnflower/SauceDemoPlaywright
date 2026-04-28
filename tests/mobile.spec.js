const { test, expect, devices } = require('@playwright/test');

// Menggunakan profil iPhone 14
test.use({ ...devices['iPhone 14'] });

test('Tampilan SauceDemo di iPhone 14', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Ambil screenshot untuk melihat perbedaannya
    await page.screenshot({ path: 'screenshots/iphone-view.png' });

    // Cek apakah elemen tertentu masih terlihat proporsional
    const loginButton = page.locator('[data-test="login-button"]');
    await expect(loginButton).toBeVisible();

    console.log('Berhasil memuat tampilan iPhone 14');
});