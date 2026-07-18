require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const mongoose = require('mongoose');

// Use IPv4 DNS to avoid MongoDB Atlas SRV resolution issues in serverless
dns.setServers(['8.8.8.8', '8.8.4.4']);
if (dns.setDefaultResultOrder) dns.setDefaultResultOrder('ipv4first');

const app = express();

// CORS — allow requests from any Vercel domain or localhost
app.use(cors({
  origin: [
    'https://freshmart-smoky.vercel.app',
    'https://freshmart-git-main-maalik1729-3062s-projects.vercel.app',
    /\.vercel\.app$/,
    'http://localhost:8080',
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── MongoDB connection (cached for serverless cold-starts) ──────────────────
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log('✅ MongoDB connected');
};

// ── Models ──────────────────────────────────────────────────────────────────
const bcrypt = require('bcryptjs');

// User
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  display_name: { type: String, default: '' },
  isAdmin: { type: Boolean, default: false },
  isSuperAdmin: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Product
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, default: 0 },
  category: { type: String, trim: true },
  description: { type: String, trim: true },
  imageUrl: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
});
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Enquiry
const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  company: { type: String, trim: true },
  enquiryType: { type: String, required: true },
  category: { type: String, trim: true },
  product: { type: String, trim: true },
  quantity: { type: String, trim: true },
  message: { type: String, trim: true },
  status: { type: String, enum: ['pending', 'interested', 'not_interested'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
});
const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);

// ── JWT helpers ──────────────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// ── Auth middleware ──────────────────────────────────────────────────────────
const protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    if (decoded.id === 'super-admin-id-1729') {
      req.user = {
        _id: 'super-admin-id-1729', email: 'admin',
        display_name: 'Super Admin', isAdmin: true, isSuperAdmin: true,
        toString() { return 'super-admin-id-1729'; },
      };
    } else {
      req.user = await User.findById(decoded.id).select('-password');
    }
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
const adminOnly = (req, res, next) =>
  req.user?.isAdmin ? next() : res.status(403).json({ message: 'Not authorized as an admin' });
const superAdminOnly = (req, res, next) =>
  req.user?.isSuperAdmin || req.user?._id?.toString() === 'super-admin-id-1729'
    ? next()
    : res.status(403).json({ message: 'Not authorized as a Super Admin' });

// ── DB connect middleware (runs before every request) ───────────────────────
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
});

// ── Routes: Auth ─────────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  const { email, password, display_name } = req.body;
  try {
    if (await User.findOne({ email })) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ email, password, display_name: display_name || '', isAdmin: false });
    res.status(201).json({
      token: generateToken(user._id),
      user: { id: user._id, email: user.email, display_name: user.display_name, isAdmin: user.isAdmin, isSuperAdmin: false, created_at: user.created_at },
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin' && password === 'admin') {
    return res.json({
      token: generateToken('super-admin-id-1729'),
      user: { id: 'super-admin-id-1729', email: 'admin', display_name: 'Super Admin', isAdmin: true, isSuperAdmin: true, created_at: new Date() },
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return res.json({
        token: generateToken(user._id),
        user: { id: user._id, email: user.email, display_name: user.display_name, isAdmin: user.isAdmin, isSuperAdmin: user.isSuperAdmin || false, created_at: user.created_at },
      });
    }
    res.status(401).json({ message: 'Invalid email or password' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.get('/api/auth/me', protect, (req, res) => {
  res.json({ id: req.user._id, email: req.user.email, display_name: req.user.display_name, isAdmin: req.user.isAdmin, isSuperAdmin: req.user.isSuperAdmin || false, created_at: req.user.created_at || new Date() });
});

// ── Routes: Products ─────────────────────────────────────────────────────────
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const formatProduct = (p) => ({ id: p._id, name: p.name, price: p.price, category: p.category, description: p.description, imageUrl: p.imageUrl, created_at: p.created_at });

app.get('/api/products', async (req, res) => {
  try { res.json((await Product.find({}).sort({ created_at: -1 })).map(formatProduct)); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(formatProduct(p));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/products', protect, superAdminOnly, upload.single('image'), async (req, res) => {
  const { name, category, description, price } = req.body;
  try {
    let imageUrl = '';
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'freshmart' }, (err, r) => err ? reject(err) : resolve(r));
        stream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }
    const p = await Product.create({ name, category, description, price: Number(price) || 0, imageUrl });
    res.status(201).json(formatProduct(p));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/products/:id', protect, superAdminOnly, upload.single('image'), async (req, res) => {
  const { name, category, description, price } = req.body;
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    p.name = name || p.name;
    p.category = category || p.category;
    p.description = description !== undefined ? description : p.description;
    p.price = price !== undefined ? Number(price) : p.price;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'freshmart' }, (err, r) => err ? reject(err) : resolve(r));
        stream.end(req.file.buffer);
      });
      p.imageUrl = result.secure_url;
    }
    await p.save();
    res.json(formatProduct(p));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/products/:id', protect, superAdminOnly, async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product removed' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// ── Routes: Enquiries ─────────────────────────────────────────────────────────
app.post('/api/enquiries', async (req, res) => {
  const { name, email, phone, company, enquiryType, category, product, quantity, message } = req.body;
  if (!name || !email || !enquiryType) return res.status(400).json({ message: 'Name, email, and enquiry type are required.' });
  try {
    const enquiry = await Enquiry.create({ name, email, phone, company, enquiryType, category, product, quantity, message });
    res.status(201).json(enquiry);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.get('/api/enquiries', protect, superAdminOnly, async (req, res) => {
  try { res.json(await Enquiry.find({}).sort({ created_at: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/enquiries/:id', protect, superAdminOnly, async (req, res) => {
  try {
    const e = await Enquiry.findById(req.params.id);
    if (!e) return res.status(404).json({ message: 'Enquiry not found' });
    await Enquiry.deleteOne({ _id: req.params.id });
    res.json({ message: 'Enquiry removed' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/enquiries/:id/status', protect, superAdminOnly, async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'interested', 'not_interested'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
  try {
    const e = await Enquiry.findById(req.params.id);
    if (!e) return res.status(404).json({ message: 'Enquiry not found' });
    e.status = status;
    await e.save();
    res.json(e);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// ── Routes: Users ─────────────────────────────────────────────────────────────
app.get('/api/users', protect, adminOnly, async (req, res) => {
  try {
    res.json((await User.find({}).sort({ created_at: -1 })).map(u => ({
      id: u._id, email: u.email, display_name: u.display_name, isAdmin: u.isAdmin, created_at: u.created_at,
    })));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/users/:id/promote', protect, adminOnly, async (req, res) => {
  try {
    const u = await User.findById(req.params.id);
    if (!u) return res.status(404).json({ message: 'User not found' });
    u.isAdmin = true;
    await u.save();
    res.json({ message: 'User promoted to Admin' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'FreshMart API is running' }));

// ── Export for Vercel serverless ──────────────────────────────────────────────
module.exports = app;
