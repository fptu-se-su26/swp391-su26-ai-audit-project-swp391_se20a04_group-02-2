import sql, { ConnectionPool, config as SqlConfig } from 'mssql';
import { createLogger } from '../utils/logger';

const log = createLogger('DB');

export const dbConfig: SqlConfig = {
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

let pool: ConnectionPool | null = null;

export async function connectDB(onConnected?: () => void): Promise<ConnectionPool> {
  if (pool?.connected) {
    return pool;
  }

  log.info('Connecting to SQL Server...');

  try {
    pool = await sql.connect(dbConfig);
    log.info(`SQL Server Connected: ${dbConfig.server}`);
    log.info(`Database: ${dbConfig.database}`);

    if (onConnected) {
      onConnected();
    }

    return pool;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    log.error(`SQL Server connection failed: ${message}`);
    throw err;
  }
}

export function getPool(): ConnectionPool {
  if (!pool?.connected) {
    throw new Error('Database not connected');
  }
  return pool;
}

export function isDatabaseConnected(): boolean {
  return pool?.connected ?? false;
}

export default connectDB;
