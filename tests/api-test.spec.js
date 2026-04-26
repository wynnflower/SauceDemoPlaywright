const { test, expect } = require('@playwright/test');

test('API GET - Harus berhasil mengambil data postingan', async ({ request }) => {
  // Melakukan request GET ke endpoint
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  // Pastikan status code adalah 200 (OK)
  expect(response.status()).toBe(200);

  // Mengubah response menjadi JSON
  const responseBody = await response.json();

  // Validasi isi data
  expect(responseBody.id).toBe(1);
  expect(responseBody.title).not.toBeNull();
  
  console.log('GET Response:', responseBody);
});

test('API POST - Harus berhasil membuat postingan baru', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Belajar API di IDX',
      body: 'Piko sedang belajar automation',
      userId: 1
    }
  });

  // Pastikan status code adalah 201 (Created)
  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  // Validasi bahwa data yang kita kirim diterima dengan benar oleh server
  expect(responseBody.title).toBe('Belajar API di IDX');
  expect(responseBody).toHaveProperty('id'); // Server biasanya memberi ID baru
  
  console.log('POST Response:', responseBody);
});

test('API POST - Halaman tidak ditemukan', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/salah-alamat', {
    data: {
      title: 'Belajar API di IDX',
      body: 'Piko sedang belajar automation',
      userId: 1
    }
  });

  // Pastikan status code adalah 404 (Not Found)
  expect(response.status()).toBe(404);

  const responseBody = await response.json();
  
  console.log('POST Response:', responseBody);
});