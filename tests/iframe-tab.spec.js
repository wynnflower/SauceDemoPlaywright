const { test, expect } = require('@playwright/test');

test('Handling Multiple Tabs - Klik Link Sosial Media', async ({ page, context }) => {
    await page.goto('https://www.saucedemo.com/');

    // Login dulu (Gunakan teknik Fast Login agar cepat)
    await context.addCookies([{ name: 'session-username', value: 'standard_user', domain: 'www.saucedemo.com', path: '/' }]);
    await page.goto('https://www.saucedemo.com/inventory.html');

    // 1. Siapkan Listener untuk Tab Baru
    const pagePromise = context.waitForEvent('page');

    // 2. Klik link Twitter di footer (ini akan membuka tab baru)
    await page.locator('[data-test="social-twitter"]').click();

    // 3. Tangkap tab baru tersebut
    const twitterTab = await pagePromise;

    // 4. Validasi apakah kita benar sampai di Twitter (X)
    await expect(twitterTab).toHaveURL(/.*x\.com\/saucelabs/);

    console.log('Berhasil pindah ke tab Twitter!');

    // Jangan lupa tutup tab baru jika sudah selesai agar tidak berat
    await twitterTab.close();
});