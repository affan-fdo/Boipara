const express = require('express');
const Book = require('../models/Book');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

// Get books (role-based access)
router.get('/', auth, async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Role-based filtering
    if (req.user.role === 'store_admin') {
      query.storeId = req.user.storeId;
    } else if (req.user.role === 'customer') {
      query.isActive = true;
      query.stock = { $gt: 0 };
    }
    // super_admin sees all books

    if (category) query.category = new RegExp(category, 'i');
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { author: new RegExp(search, 'i') }
      ];
    }

    const books = await Book.find(query).populate('storeId', 'name');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get book by ID
router.get('/:id', auth, async (req, res) => {
  try {
    let query = { _id: req.params.id };
    
    if (req.user.role === 'store_admin') {
      query.storeId = req.user.storeId;
    }

    const book = await Book.findOne(query).populate('storeId', 'name');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add book (store_admin and super_admin only)
router.post('/', auth, authorize('store_admin', 'super_admin'), async (req, res) => {
  try {
    const bookData = {
      ...req.body,
      storeId: req.user.role === 'store_admin' ? req.user.storeId : req.body.storeId
    };

    const book = new Book(bookData);
    await book.save();
    await book.populate('storeId', 'name');
    
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update book
router.put('/:id', auth, authorize('store_admin', 'super_admin'), async (req, res) => {
  try {
    let query = { _id: req.params.id };
    
    if (req.user.role === 'store_admin') {
      query.storeId = req.user.storeId;
    }

    const book = await Book.findOneAndUpdate(query, req.body, { new: true }).populate('storeId', 'name');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete book
router.delete('/:id', auth, authorize('store_admin', 'super_admin'), async (req, res) => {
  try {
    let query = { _id: req.params.id };
    
    if (req.user.role === 'store_admin') {
      query.storeId = req.user.storeId;
    }

    const book = await Book.findOneAndDelete(query);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;