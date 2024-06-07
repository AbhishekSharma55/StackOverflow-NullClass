const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary
const auth = require('../middleware/auth');
const router = express.Router();
require('dotenv').config();

// JWT Secret
const jwtSecret = process.env.JWT_SECRET;

// Signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    const token = await jwt.sign(payload, jwtSecret, { expiresIn: 3600 });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.get('/current',auth, async (req, res) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.json({ error: 'User not found' });
    }
    res.json({user : user , message : 'User found'});
  } catch (error) {
    res.json({ error: 'Unauthorized' });
  }
});

module.exports = router;
