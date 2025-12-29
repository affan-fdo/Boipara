const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: String,
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: String,
  cover: String,
  stock: {
    type: Number,
    default: 0
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

bookSchema.index({ storeId: 1 });
bookSchema.index({ title: 'text', author: 'text' });

module.exports = mongoose.model('Book', bookSchema);