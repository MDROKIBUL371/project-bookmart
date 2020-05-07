const { Router } = require('express');
const auth = require('../middleware/auth');

// User Model
const User = require('../models/User');

const router = Router();

/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
   try {
      const users = await User.find();
      if (!users) {
         throw Error('No users exist');
      }

      res.json(users);
   } catch (error) {
      res.status(400).json({
         msg: error.message,
      });
   }
});

module.exports = router;
