import { getPool } from '../config/database';
import { Product } from '../models/Product';
import { AppError } from '../middlewares/error.middleware';
import { CreateProductInput, UpdateProductInput } from '../types';
import { validateCreateProduct, validateUpdateProduct } from '../validators/product.validator';

export class ProductService {
  static async getAll(farmerId?: string): Promise<Product[]> {
    const pool = getPool();
    return Product.getAll(pool, farmerId);
  }

  static async getById(id: string | number): Promise<Product> {
    const pool = getPool();
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      throw new AppError('Invalid product id', 400);
    }

    const product = await Product.getById(pool, productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }

  static async create(data: CreateProductInput): Promise<Product> {
    const errors = validateCreateProduct(data);
    if (errors) {
      throw new AppError(errors.join('|'), 400);
    }

    const pool = getPool();
    return Product.create(pool, data);
  }

  static async update(id: string | number, data: UpdateProductInput): Promise<Product> {
    const errors = validateUpdateProduct(data);
    if (errors) {
      throw new AppError(errors.join('|'), 400);
    }

    const pool = getPool();
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      throw new AppError('Invalid product id', 400);
    }

    const product = await Product.update(pool, productId, data);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }

  static async delete(id: string | number): Promise<void> {
    const pool = getPool();
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      throw new AppError('Invalid product id', 400);
    }

    const deleted = await Product.delete(pool, productId);
    if (!deleted) {
      throw new AppError('Product not found', 404);
    }
  }
}
