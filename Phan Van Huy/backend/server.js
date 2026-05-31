require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDb } = require('./db');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

initDb()
  .then((pool) => {
    app.locals.db = pool;

    app.get('/', (req, res) => {
      res.json({ message: 'AI Audit Backend is running', version: '0.1.0' });
    });

    app.use('/api/products', productsRouter);

    app.use((req, res) => {
      res.status(404).json({ error: 'Route not found' });
    });

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  });
