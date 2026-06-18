class Product {
  constructor(data = {}) {
    this.id = data.id;
    this.farmerId = data.farmerId;
    this.name = data.name;
    this.description = data.description || '';
    this.category = data.category || '';
    this.price = data.price || 0;
    this.quantity = data.quantity || 0;
    this.imageUrl = data.imageUrl || '';
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static async ensureTable(pool) {
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Products]') AND type in (N'U'))
      BEGIN
        CREATE TABLE [dbo].[Products] (
          [id] INT IDENTITY(1,1) PRIMARY KEY,
          [farmerId] NVARCHAR(128) NOT NULL,
          [name] NVARCHAR(256) NOT NULL,
          [description] NVARCHAR(MAX) NULL,
          [category] NVARCHAR(128) NULL,
          [price] DECIMAL(18,2) NOT NULL DEFAULT 0,
          [quantity] INT NOT NULL DEFAULT 0,
          [imageUrl] NVARCHAR(512) NULL,
          [createdAt] DATETIME2 NOT NULL,
          [updatedAt] DATETIME2 NOT NULL
        );
      END
    `);
  }

  static async getAll(pool, farmerId = null) {
    const request = pool.request();
    let query = 'SELECT * FROM dbo.Products';
    if (farmerId) {
      query += ' WHERE farmerId = @farmerId';
      request.input('farmerId', farmerId);
    }
    const result = await request.query(query);
    return result.recordset.map(row => new Product(row));
  }

  static async getById(pool, id) {
    const result = await pool.request()
      .input('id', id)
      .query('SELECT * FROM dbo.Products WHERE id = @id');
    return result.recordset[0] ? new Product(result.recordset[0]) : null;
  }

  static async create(pool, data) {
    const now = new Date();
    const result = await pool.request()
      .input('farmerId', data.farmerId)
      .input('name', data.name)
      .input('description', data.description || '')
      .input('category', data.category || '')
      .input('price', data.price || 0)
      .input('quantity', data.quantity || 0)
      .input('imageUrl', data.imageUrl || '')
      .input('createdAt', now)
      .input('updatedAt', now)
      .query(`
        INSERT INTO dbo.Products (farmerId, name, description, category, price, quantity, imageUrl, createdAt, updatedAt)
        OUTPUT INSERTED.*
        VALUES (@farmerId, @name, @description, @category, @price, @quantity, @imageUrl, @createdAt, @updatedAt)
      `);
    return new Product(result.recordset[0]);
  }

  static async update(pool, id, data) {
    const now = new Date();
    const result = await pool.request()
      .input('id', id)
      .input('name', data.name)
      .input('description', data.description || '')
      .input('category', data.category || '')
      .input('price', data.price || 0)
      .input('quantity', data.quantity || 0)
      .input('imageUrl', data.imageUrl || '')
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
    return result.recordset[0] ? new Product(result.recordset[0]) : null;
  }

  static async delete(pool, id) {
    const result = await pool.request()
      .input('id', id)
      .query('DELETE FROM dbo.Products WHERE id = @id');
    return result.rowsAffected[0] > 0;
  }
}

module.exports = Product;
