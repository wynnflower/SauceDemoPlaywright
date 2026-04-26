const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const users = require('../user-data.json'); // Mengambil data dari file JSON

// Perulangan dimulai di sini
for (const user of users) {
  test(`Login Test untuk: ${user.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    if (user.shouldSucceed) {
      // Jika instruksinya sukses, cek URL inventory
      await expect(page).toHaveURL(/.*inventory.html/);
    } else {
      // Jika instruksinya gagal, cek pesan error
      const errorLocator = page.locator('[data-test="error"]');
      await expect(errorLocator).toContainText(user.expectedError);
    }
  });
}