import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import { Product } from './models/Product';
import productRoutes from './routes/product.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { REQUEST_LIMITS } from './constants';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: REQUEST_LIMITS.JSON_BODY }));
app.use(express.urlencoded({ extended: true, limit: REQUEST_LIMITS.URL_ENCODED_BODY }));

connectDB()
  .then(async (pool) => {
    await Product.ensureTable(pool);
    app.get('/', (_req, res) => {
      res.json({
        success: true,
        status: 'success',
        message: 'AI Audit Backend is running',
        version: '0.1.0',
      });
    });

    app.use('/api/v1/products', productRoutes);
    app.use('/api/products', productRoutes);

    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  });

export default app;
