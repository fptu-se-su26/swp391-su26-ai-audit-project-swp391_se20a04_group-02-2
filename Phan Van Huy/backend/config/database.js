const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'Your_password123',
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

async function initDb() {
  const pool = await sql.connect(config);
  return pool;
}

module.exports = {
  initDb,
  config,
};
