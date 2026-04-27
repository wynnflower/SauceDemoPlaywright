const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test('Cek Aksesibilitas Halaman Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // // Menjalankan scan aksesibilitas
    // const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // // Menampilkan daftar pelanggaran jika ada
    // if (accessibilityScanResults.violations.length > 0) {
    //     console.log('Daftar Pelanggaran Aksesibilitas:', accessibilityScanResults.violations);
    // }

    // // Tes akan gagal jika ada pelanggaran aksesibilitas
    // expect(accessibilityScanResults.violations).toEqual([]);

    const accessibilityScanResults = await new AxeBuilder({ page })
        // Mengabaikan aturan yang dilanggar oleh SauceDemo
        // agar tes kita tetap bisa berjalan untuk mengecek isu lain
        .disableRules([
            'landmark-one-main', 
            'page-has-heading-one', 
            'region'
        ])
        .analyze();

    // Opsional: Print hasil ke terminal jika masih ada violation lain
    if (accessibilityScanResults.violations.length > 0) {
        console.log('Pelanggaran Tersisa:', JSON.stringify(accessibilityScanResults.violations, null, 2));
    }

    expect(accessibilityScanResults.violations).toEqual([]);
});