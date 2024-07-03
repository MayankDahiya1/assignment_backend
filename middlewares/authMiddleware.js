/*
 * CONST ASSIGNMENT
 */
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/*
 * EXPORT
 */
exports.auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

/*
 * EXPORT
 */
exports.adminAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user)
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: `Admin resource. Access denied ${user.role}` });
    }
    next();
  } catch (err) {
    res.status(500).send('Server error');
  }
};
