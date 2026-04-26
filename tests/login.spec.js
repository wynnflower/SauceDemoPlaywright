const { test, expect } = require('@playwright/test');

test('User harus bisa login ke SauceDemo', async ({ page }) => {
    // Buka website
    await page.goto('https://www.saucedemo.com/');

    // Masukkan username menggunakan atribut yang Anda temukan
    await page.fill('[data-test="username"]', 'standard_user');

    // Masukkan password
    await page.fill('[data-test="password"]', 'secret_sauce');

    // Klik tombol login
    await page.click('[data-test="login-button"]');

    // Validasi apakah login berhasil (kita harus berada di halaman inventory)
    await expect(page).toHaveURL(/.*inventory.html/);

    // Tambahan: Pastikan judul halaman adalah "Swag Labs"
    await expect(page).toHaveTitle(/Swag Labs/);
});

test('User mendapatkan pesan error saat password salah', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Isi username benar, tapi password salah
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'salah_password');
    await page.click('[data-test="login-button"]');

    // 1. Validasi: Pesan error harus muncul (Visible)
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();

    // 2. Validasi: Teks error harus sesuai
    await expect(errorMessage).toContainText('Username and password do not match');

    // 3. Validasi: Kita tetap berada di halaman login (bukan inventory)
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('User mendapatkan pesan error saat username kosong', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Isi username benar, tapi password salah
    await page.fill('[data-test="username"]', '');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // 1. Validasi: Pesan error harus muncul (Visible)
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();

    // 2. Validasi: Teks error harus sesuai
    await expect(errorMessage).toContainText('Username is required');

    // 3. Validasi: Kita tetap berada di halaman login (bukan inventory)
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});