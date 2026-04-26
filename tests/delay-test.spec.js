const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Menangani delay login yang sangat lambat', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  // Kita gunakan user yang 'lelet'
  await loginPage.login('performance_glitch_user', 'secret_sauce');

  // Playwright secara default punya timeout 30 detik.
  // Karena delay hanya 5 detik, asersi ini akan tetap 'Passed' 
  // karena Playwright otomatis menunggu (Auto-wait).
  const title = page.locator('.title');
  await expect(title).toHaveText('Products');
  
  console.log('Login berhasil setelah menunggu delay!');
});