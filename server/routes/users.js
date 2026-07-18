const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// @route   GET /api/users
// @desc    Get all users list (Admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}).sort({ created_at: -1 });
    const formatted = users.map(u => ({
      id: u._id,
      email: u.email,
      display_name: u.display_name,
      isAdmin: u.isAdmin,
      created_at: u.created_at
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/users/:id/promote
// @desc    Make user an admin (Admin only)
router.post('/:id/promote', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isAdmin = true;
    await user.save();
    res.json({ message: 'User promoted to Admin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
