import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    fullName: string;
    role: string;
  };
}

export interface ProductData {
  id?: number;
  farmerId?: string;
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductInput {
  farmerId: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
  imageUrl?: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
  imageUrl?: string;
}
