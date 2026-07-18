const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @route   POST /api/auth/register
// @desc    Register a new user (automatically promoted to Member Admin)
router.post('/register', async (req, res) => {
  const { email, password, display_name } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      email,
      password,
      display_name: display_name || '',
      isAdmin: false // Standard registered users are normal members
    });

    if (user) {
      res.status(201).json({
        token: generateToken(user._id),
        user: {
          id: user._id,
          email: user.email,
          display_name: user.display_name,
          isAdmin: user.isAdmin,
          isSuperAdmin: false,
          created_at: user.created_at
        }
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Super Admin Check
  if (email === 'admin' && password === 'admin') {
    return res.json({
      token: generateToken('super-admin-id-1729'),
      user: {
        id: 'super-admin-id-1729',
        email: 'admin',
        display_name: 'Super Admin',
        isAdmin: true,
        isSuperAdmin: true,
        created_at: new Date()
      }
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
        user: {
          id: user._id,
          email: user.email,
          display_name: user.display_name,
          isAdmin: user.isAdmin,
          isSuperAdmin: user.isSuperAdmin || false,
          created_at: user.created_at
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get user profile
router.get('/me', protect, async (req, res) => {
  res.json({
    id: req.user._id,
    email: req.user.email,
    display_name: req.user.display_name,
    isAdmin: req.user.isAdmin,
    isSuperAdmin: req.user.isSuperAdmin || false,
    created_at: req.user.created_at || new Date()
  });
});

module.exports = router;
