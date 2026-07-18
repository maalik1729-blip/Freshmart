const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.id === 'super-admin-id-1729') {
        req.user = {
          _id: 'super-admin-id-1729',
          email: 'admin',
          display_name: 'Super Admin',
          isAdmin: true,
          isSuperAdmin: true,
          toString() { return 'super-admin-id-1729'; }
        };
      } else {
        req.user = await User.findById(decoded.id).select('-password');
      }
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

const superAdminOnly = (req, res, next) => {
  if (req.user && (req.user.isSuperAdmin || req.user._id.toString() === 'super-admin-id-1729')) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as a Super Admin' });
  }
};

module.exports = { protect, adminOnly, superAdminOnly };
