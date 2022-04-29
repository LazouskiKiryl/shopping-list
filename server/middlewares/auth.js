const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).json({ message: 'No token provided!' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

const auth = {
  verifyToken,
};

module.exports = auth;
