module.exports = (err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  const code = err.status || 500;
  res.status(code).json({ error: err.message || 'Server error' });
};