const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // now req.user.id will be available
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(400).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
