const express = require('express');
const router = express.Router();

function mapRow(row) {
  return {
    id: row.id,
    farmerId: row.farmerId,
    name: row.name,
    description: row.description,
    category: row.category,
    price: parseFloat(row.price),
    quantity: row.quantity,
    imageUrl: row.imageUrl,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const farmerId = req.query.farmerId;
    const request = db.request();

    let query = 'SELECT * FROM dbo.Products';
    if (farmerId) {
      query += ' WHERE farmerId = @farmerId';
      request.input('farmerId', farmerId);
    }

    const result = await request.query(query);
    return res.json(result.recordset.map(mapRow));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const result = await db.request()
      .input('id', req.params.id)
      .query('SELECT * FROM dbo.Products WHERE id = @id');

    if (!result.recordset[0]) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(mapRow(result.recordset[0]));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { farmerId, name, description, category, price, quantity, imageUrl } = req.body;
    if (!farmerId || !name) {
      return res.status(400).json({ error: 'farmerId and name are required' });
    }

    const now = new Date();
    const result = await req.app.locals.db.request()
      .input('farmerId', farmerId)
      .input('name', name)
      .input('description', description || '')
      .input('category', category || '')
      .input('price', price || 0)
      .input('quantity', quantity || 0)
      .input('imageUrl', imageUrl || '')
      .input('createdAt', now)
      .input('updatedAt', now)
      .query(`
        INSERT INTO dbo.Products (farmerId, name, description, category, price, quantity, imageUrl, createdAt, updatedAt)
        OUTPUT INSERTED.*
        VALUES (@farmerId, @name, @description, @category, @price, @quantity, @imageUrl, @createdAt, @updatedAt)
      `);

    return res.status(201).json(mapRow(result.recordset[0]));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, description, category, price, quantity, imageUrl } = req.body;
    const now = new Date();
    const result = await req.app.locals.db.request()
      .input('id', req.params.id)
      .input('name', name || '')
      .input('description', description || '')
      .input('category', category || '')
      .input('price', price || 0)
      .input('quantity', quantity || 0)
      .input('imageUrl', imageUrl || '')
      .input('updatedAt', now)
      .query(`
        UPDATE dbo.Products
        SET name = @name,
            description = @description,
            category = @category,
            price = @price,
            quantity = @quantity,
            imageUrl = @imageUrl,
            updatedAt = @updatedAt
        OUTPUT INSERTED.*
        WHERE id = @id
      `);

    if (!result.recordset[0]) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(mapRow(result.recordset[0]));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await req.app.locals.db.request()
      .input('id', req.params.id)
      .query('DELETE FROM dbo.Products WHERE id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json({ message: 'Product deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
