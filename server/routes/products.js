const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');

// Multer in-memory storage for handling uploaded files
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// @route   GET /api/products
// @desc    Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).sort({ created_at: -1 });
    // Map _id to id so frontend matches model keys
    const formattedProducts = products.map(p => ({
      id: p._id,
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description,
      imageUrl: p.imageUrl,
      created_at: p.created_at
    }));
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({
      id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      imageUrl: product.imageUrl,
      created_at: product.created_at
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products
// @desc    Create a product (Admin only, supports image file upload to Cloudinary)
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  const { name, category, description, price } = req.body;
  try {
    let imageUrl = '';
    
    if (req.file) {
      // Upload file buffer to Cloudinary folder 'freshmart'
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'freshmart' },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(req.file.buffer);
      });
      
      const uploadResult = await uploadPromise;
      imageUrl = uploadResult.secure_url;
    }

    const product = await Product.create({
      name,
      category,
      description,
      price: Number(price) || 0,
      imageUrl
    });

    res.status(201).json({
      id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      imageUrl: product.imageUrl,
      created_at: product.created_at
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
