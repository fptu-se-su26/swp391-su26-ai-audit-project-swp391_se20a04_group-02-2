const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '1',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'AIAuditDB',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

async function ensureProductsTable(pool) {
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

async function initDb() {
  const pool = await sql.connect(config);
  await ensureProductsTable(pool);
  return pool;
}

module.exports = {
  initDb,
  config,
};
