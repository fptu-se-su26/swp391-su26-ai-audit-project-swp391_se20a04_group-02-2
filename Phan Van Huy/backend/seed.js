require('dotenv').config();
const { initDb } = require('./db');

async function seed() {
  const pool = await initDb();

  const seedProducts = [
    {
      farmerId: 'farmer-001',
      name: 'Bắp cải hữu cơ',
      description: 'Bắp cải sạch trồng theo chuẩn hữu cơ.',
      category: 'Rau củ',
      price: 25000,
      quantity: 120,
      imageUrl: 'https://example.com/images/bao-cai.jpg',
    },
    {
      farmerId: 'farmer-001',
      name: 'Khoai lang tím',
      description: 'Khoai lang tím ngọt, sạch thuốc.',
      category: 'Rau củ',
      price: 18000,
      quantity: 80,
      imageUrl: 'https://example.com/images/khoai-lang.jpg',
    },
  ];

  for (const product of seedProducts) {
    const now = new Date();
    await pool.request()
      .input('farmerId', product.farmerId)
      .input('name', product.name)
      .input('description', product.description)
      .input('category', product.category)
      .input('price', product.price)
      .input('quantity', product.quantity)
      .input('imageUrl', product.imageUrl)
      .input('createdAt', now)
      .input('updatedAt', now)
      .query(`
        INSERT INTO dbo.Products (farmerId, name, description, category, price, quantity, imageUrl, createdAt, updatedAt)
        VALUES (@farmerId, @name, @description, @category, @price, @quantity, @imageUrl, @createdAt, @updatedAt)
      `);
  }

  console.log('Seed completed.');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
