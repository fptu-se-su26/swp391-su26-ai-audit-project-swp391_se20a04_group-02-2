import { CreateProductInput, UpdateProductInput } from '../types';

export const validateCreateProduct = (data: CreateProductInput): string[] | null => {
  const errors: string[] = [];

  if (!data.farmerId || typeof data.farmerId !== 'string' || data.farmerId.trim() === '') {
    errors.push('farmerId is required and must be a non-empty string');
  }

  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push('name is required and must be a non-empty string');
  }

  if (data.price !== undefined && (typeof data.price !== 'number' || data.price < 0)) {
    errors.push('price must be a non-negative number');
  }

  if (data.quantity !== undefined && (typeof data.quantity !== 'number' || data.quantity < 0)) {
    errors.push('quantity must be a non-negative number');
  }

  return errors.length > 0 ? errors : null;
};

export const validateUpdateProduct = (data: UpdateProductInput): string[] | null => {
  const errors: string[] = [];

  if (data.name !== undefined && (typeof data.name !== 'string' || data.name.trim() === '')) {
    errors.push('name must be a non-empty string');
  }

  if (data.price !== undefined && (typeof data.price !== 'number' || data.price < 0)) {
    errors.push('price must be a non-negative number');
  }

  if (data.quantity !== undefined && (typeof data.quantity !== 'number' || data.quantity < 0)) {
    errors.push('quantity must be a non-negative number');
  }

  return errors.length > 0 ? errors : null;
};
