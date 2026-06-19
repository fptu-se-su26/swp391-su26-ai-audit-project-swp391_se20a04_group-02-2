import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { asyncHandler } from '../middlewares/error.middleware';
import { ProductService } from '../services/product.service';

/**
 * Get all products (public)
 * GET /api/v1/products
 */
export const getProducts = asyncHandler(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const farmerId = req.query.farmerId as string | undefined;
    const products = await ProductService.getAll(farmerId);

    res.status(200).json({
      success: true,
      status: 'success',
      data: { products, total: products.length },
    });
  }
);

/**
 * Get single product (public)
 * GET /api/v1/products/:id
 */
export const getProduct = asyncHandler(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const product = await ProductService.getById(req.params.id);

    res.status(200).json({
      success: true,
      status: 'success',
      data: { product },
    });
  }
);

/**
 * Create product
 * POST /api/v1/products
 */
export const createProduct = asyncHandler(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const { farmerId, name, description, category, price, quantity, imageUrl } = req.body;

    const product = await ProductService.create({
      farmerId,
      name,
      description,
      category,
      price,
      quantity,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      status: 'success',
      message: 'Tạo sản phẩm thành công!',
      data: { product },
    });
  }
);

/**
 * Update product
 * PUT /api/v1/products/:id
 */
export const updateProduct = asyncHandler(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const { name, description, category, price, quantity, imageUrl } = req.body;

    const product = await ProductService.update(req.params.id, {
      name,
      description,
      category,
      price,
      quantity,
      imageUrl,
    });

    res.status(200).json({
      success: true,
      status: 'success',
      message: 'Cập nhật sản phẩm thành công!',
      data: { product },
    });
  }
);

/**
 * Delete product
 * DELETE /api/v1/products/:id
 */
export const deleteProduct = asyncHandler(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    await ProductService.delete(req.params.id);

    res.status(200).json({
      success: true,
      status: 'success',
      message: 'Xóa sản phẩm thành công!',
    });
  }
);
