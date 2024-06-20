const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.json({ err: 'No token, authorization denied' });
  }

  // Check if the token starts with 'Bearer ' before splitting
  if (!token.startsWith('Bearer ')) {
    return res.json({ err: 'Invalid token format' });
  }

  try {
    // Split the token and extract the second part
    const tokenParts = token.split(' ');
    const tokenValue = tokenParts[1]; 
    const decoded = jwt.verify(tokenValue, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.json({ err: 'Token is not valid' });
  }
};
