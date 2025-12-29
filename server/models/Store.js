const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  contact: {
    phone: String,
    email: String
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Store', storeSchema);