const { Router } = require('express');
const auth = require('../middleware/auth');

// Category Model
const Category = require('../models/Category');

const router = Router();

/**
 * @route   GET api/categories
 * @desc    Get All Categories
 * @access  Public
 */
router.get('/', async (req, res) => {
   try {
      const categories = await Category.find();
      if (!categories) {
         throw Error('No categories');
      }

      res.status(200).json(categories);
   } catch (error) {
      res.status(400).json({ msg: error.message });
   }
});

/**
 * @route   POST api/categories
 * @desc    Create A Category
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
   const newCategory = new Category({
      name: req.body.name,
   });

   try {
      const category = await newCategory.save();

      if (!category) {
         throw Error('Error saving category');
      }

      res.status(200).json(category);
   } catch (error) {
      res.status(400).json({ msg: error.message });
   }
});

/**
 * @route   DELETE api/categories/:id
 * @desc    Delete A Category
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
   try {
      const category = await Category.findById(req.params.id);
      if (!category) {
         throw Error('No category found');
      }

      const removed = await category.remove();
      if (!removed) {
         throw Error('Error deleting category');
      }

      res.status(200).json({ success: true });
   } catch (error) {
      res.status(400).json({ msg: error.message, success: false });
   }
});

module.exports = router;
