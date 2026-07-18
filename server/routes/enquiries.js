const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const { protect, superAdminOnly } = require('../middleware/auth');

// @route   POST /api/enquiries
// @desc    Submit a new user enquiry (Public)
router.post('/', async (req, res) => {
  const { name, email, phone, company, enquiryType, category, product, quantity, message } = req.body;
  
  if (!name || !email || !enquiryType) {
    return res.status(400).json({ message: 'Name, email, and enquiry type are required.' });
  }

  try {
    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      company,
      enquiryType,
      category,
      product,
      quantity,
      message
    });

    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/enquiries
// @desc    Get all user enquiries (Super Admin only)
router.get('/', protect, superAdminOnly, async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ created_at: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/enquiries/:id
// @desc    Delete an enquiry record (Super Admin only)
router.delete('/:id', protect, superAdminOnly, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    await Enquiry.deleteOne({ _id: req.params.id });
    res.json({ message: 'Enquiry removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
