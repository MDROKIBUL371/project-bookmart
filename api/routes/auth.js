const { Router } = require('express');
const bcrypt = require('bcrypt');
const config = require('../../config');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

// User Model
const User = require('../models/User');

const { JWT_SECRET } = config;

const router = Router();

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   // Simple validation
   if (!email || !password) {
      return res.status(400).json({
         msg: 'Please enter all required fields',
      });
   }

   try {
      // Check for existing user
      const user = await User.findOne({ email }).populate('books');
      if (!user) {
         throw Error("User doesn't exist");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         throw Error('Invalid credentials');
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      if (!token) {
         throw Error('Error signing the token');
      }

      res.status(200).json({
         token,
         user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            purchasedBooks: user.purchasedBooks,
            registeredDate: user.registeredDate,
         },
      });
   } catch (error) {
      res.status(400).json({
         msg: error.message,
      });
   }
});

/**
 * @route   POST api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
   const { name, username, email, password } = req.body;

   // Simple validation
   if (!name || !username || !email || !password) {
      return res.status(400).json({
         msg: 'Please enter all the required fields',
      });
   }

   try {
      const user = await User.findOne({ email });
      if (user) {
         throw Error('User already exists');
      }

      const salt = await bcrypt.genSalt(10);
      if (!salt) {
         throw Error('Error with bcrypt');
      }

      const hash = await bcrypt.hash(password, salt);
      if (!hash) {
         throw Error('Error hashing the password');
      }

      const newUser = new User({
         name,
         username,
         email,
         password: hash,
         purchasedBooks: [],
         registeredDate: new Date(),
      });

      const savedUser = await newUser.save();
      if (!savedUser) {
         throw Error('Error saving the user');
      }

      const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
         expiresIn: 7200,
      });

      res.status(201).json({
         token,
         user: {
            _id: savedUser._id,
            name: savedUser.name,
            username: savedUser.username,
            email: savedUser.email,
         },
      });
   } catch (error) {
      res.status(400).json({
         error: error.message,
      });
   }
});

/**
 * @route   GET api/auth/user
 * @desc    Get logged in user
 * @access  Private
 */
router.get('/user', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id)
         .populate('purchasedBooks')
         .select('-password');
      if (!user) {
         throw Error('User Does not exist');
      }
      res.status(200).json(user);
   } catch (error) {
      res.status(400).json({ msg: error.message });
   }
});

/**
 * @route   POST api/auth/purchase/:id
 * @desc    Purchase a book
 * @access  Private
 */
router.post('/purchase/:id', auth, async (req, res) => {
   const bookId = req.params.id;
   try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
         throw Error('User Does not exist');
      }
      let prevPurchasedBooks = user.purchasedBooks;
      let alreadyPurchased = false;
      for (let i = 0; i < prevPurchasedBooks.length; i += 1) {
         if (prevPurchasedBooks[i].equals(bookId)) {
            alreadyPurchased = true;
         }
      }
      if (alreadyPurchased === false) {
         // Purchase now
         prevPurchasedBooks.push(bookId);
         user.purchasedBooks = prevPurchasedBooks;
         user.save();
         return res.status(200).json(user);
      } else {
         // Already purchased
         res.status(422).json({
            purchaseFailed: true,
            user,
         });
      }
   } catch (error) {
      res.status(400).json({ msg: error.message });
   }
});

module.exports = router;
