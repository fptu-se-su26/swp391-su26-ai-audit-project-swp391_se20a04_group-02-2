const Product = require('../models/Product');
const { validateCreateProduct, validateUpdateProduct } = require('../validators/productValidator');

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const db = req.app.locals.db;
      const farmerId = req.query.farmerId;

      const products = await Product.getAll(db, farmerId);
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const db = req.app.locals.db;
      const product = await Product.getById(db, req.params.id);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const { farmerId, name, description, category, price, quantity, imageUrl } = req.body;

      const errors = validateCreateProduct({ farmerId, name, price, quantity });
      if (errors) {
        return res.status(400).json({ errors });
      }

      const db = req.app.locals.db;
      const product = await Product.create(db, {
        farmerId,
        name,
        description,
        category,
        price,
        quantity,
        imageUrl,
      });

      return res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { name, description, category, price, quantity, imageUrl } = req.body;

      const errors = validateUpdateProduct({ name, price, quantity });
      if (errors) {
        return res.status(400).json({ errors });
      }

      const db = req.app.locals.db;
      const product = await Product.update(db, req.params.id, {
        name,
        description,
        category,
        price,
        quantity,
        imageUrl,
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const db = req.app.locals.db;
      const deleted = await Product.delete(db, req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
