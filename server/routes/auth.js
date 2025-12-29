const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Store = require('../models/Store');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, profile, storeName } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let storeId = null;
    if (role === 'store_admin') {
      const store = new Store({
        name: storeName,
        ownerId: null
      });
      const savedStore = await store.save();
      storeId = savedStore._id;
    }

    const user = new User({
      email,
      password,
      role,
      profile,
      storeId
    });

    await user.save();

    if (role === 'store_admin') {
      await Store.findByIdAndUpdate(storeId, { ownerId: user._id });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        storeId: user.storeId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).populate('storeId');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        storeId: user.storeId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;