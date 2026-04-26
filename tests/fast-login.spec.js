const { test, expect } = require('@playwright/test');

test('Login Cepat via Session Injection', async ({ page, context }) => {
  // 1. Lewati proses ketik-ketik, kita langsung suntikkan Cookie ke browser
  // Ini mensimulasikan browser yang sudah pernah login sebelumnya
  await context.addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
    }
  ]);

  // 2. Langsung tancap gas ke halaman Inventory (bukan halaman Login!)
  await page.goto('https://www.saucedemo.com/inventory.html');

  // 3. Validasi: Apakah kita berhasil 'menyusup' tanpa login manual?
  const title = page.locator('.title');
  await expect(title).toHaveText('Products');
  
  console.log('Bypass Login Berhasil! Hemat waktu 3-5 detik.');
});