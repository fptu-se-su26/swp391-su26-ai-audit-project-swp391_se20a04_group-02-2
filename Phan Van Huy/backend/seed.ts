import 'dotenv/config';
import connectDB from './config/database';
import { Product } from './models/Product';

async function seed() {
  const pool = await connectDB();
  await Product.ensureTable(pool);

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
    {
      farmerId: 'farmer-002',
      name: 'Cà chua bi',
      description: 'Cà chua bi đỏ tươi ngon.',
      category: 'Rau độc lập',
      price: 15000,
      quantity: 100,
      imageUrl: 'https://example.com/images/ca-chua-bi.jpg',
    },
    {
      farmerId: 'farmer-002',
      name: 'Rau cải xanh',
      description: 'Rau cải xanh tươi, sạch sẽ.',
      category: 'Rau lá',
      price: 12000,
      quantity: 200,
      imageUrl: 'https://example.com/images/rau-cai-xanh.jpg',
    },
  ];

  for (const productData of seedProducts) {
    await Product.create(pool, productData);
  }

  console.log('Seed completed successfully with 4 sample products.');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
