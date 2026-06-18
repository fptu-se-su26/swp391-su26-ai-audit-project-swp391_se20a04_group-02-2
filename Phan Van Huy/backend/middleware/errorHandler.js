const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.message && err.message.includes('Connection timeout')) {
    return res.status(503).json({ error: 'Database connection error' });
  }

  return res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
