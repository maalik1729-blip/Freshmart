const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  enquiryType: {
    type: String,
    required: true
  },
  category: {
    type: String,
    trim: true
  },
  product: {
    type: String,
    trim: true
  },
  quantity: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted'],
    default: 'pending'
  },
  interestStatus: {
    type: String,
    enum: ['unmarked', 'interested', 'not_interested'],
    default: 'unmarked'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
