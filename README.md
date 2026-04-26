# 🎭 Playwright Automation – SauceDemo

Proyek ini berisi skenario pengujian otomatis (end-to-end) untuk website [SauceDemo](https://www.saucedemo.com/) menggunakan [Playwright](https://playwright.dev/). SauceDemo adalah situs demo e-commerce yang sering digunakan untuk belajar dan menguji kemampuan automation testing.

## 🧪 Skenario yang Diuji

- ✅ Login dengan kredensial valid (standard_user)
- ❌ Login dengan kredensial tidak valid
- 🛒 Menambahkan produk ke keranjang
- 🗑️ Menghapus produk dari keranjang
- 🔄 Checkout produk (input data pengiriman & ringkasan pesanan)
- 📋 Filter produk berdasarkan nama dan harga
- 🚪 Logout dari aplikasi

## 📁 Struktur Proyek
playwright-saucedemo/
├── tests/
│ ├── login.spec.ts
│ ├── cart.spec.ts
│ ├── checkout.spec.ts
│ └── filter.spec.ts
├── pages/
│ ├── loginPage.ts
│ ├── inventoryPage.ts
│ ├── cartPage.ts
│ └── checkoutPage.ts
├── fixtures/
│ └── testData.json
├── playwright.config.ts
└── README.md

text

## 🚀 Cara Menjalankan

### 1. Clone repositori

```bash
git clone https://github.com/username/playwright-saucedemo.git
cd playwright-saucedemo
2. Install dependensi
bash
npm install
npx playwright install
3. Menjalankan semua pengujian
bash
npx playwright test
4. Menjalankan pengujian dengan mode UI (Playwright Trace Viewer)
bash
npx playwright test --ui
5. Menjalankan pengujian spesifik
bash
npx playwright test login.spec.ts
6. Melihat laporan pengujian
bash
npx playwright show-report
⚙️ Konfigurasi
File playwright.config.ts sudah dikonfigurasi untuk:

Menjalankan pengujian pada Chromium, Firefox, dan WebKit

Mode headless by default (bisa diubah menjadi headless: false untuk debugging)

Screenshot dan trace otomatis saat pengujian gagal

🧾 Contoh Kode Pengujian
typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test('Login dengan user standard berhasil', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
📊 Laporan & Debugging
Trace Viewer: npx playwright show-trace trace.zip

HTML Report: otomatis terbuat di folder test-results/

Screenshot: disimpan saat pengujian gagal

🧰 Tools yang Digunakan
Playwright – Testing framework

TypeScript – Bahasa pemrograman

Node.js – Runtime environment

📌 Catatan
Jangan gunakan kredensial asli selain yang disediakan SauceDemo (standard_user, locked_out_user, dll).

Proyek ini hanya untuk keperluan belajar dan demo automation testing.

📄 Lisensi
MIT

Dibuat dengan ❤️ untuk belajar automation testing menggunakan Playwright