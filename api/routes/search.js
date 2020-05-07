const { Router } = require('express');
const router = Router();
// Book Model
const Book = require('../models/Book');

/**
 * @route   GET api/search/:keyword
 * @desc    Search Books
 * @access  Public
 */
router.get('/:keyword', (req, res) => {
   // Case insensitive regex search
   const keyword = req.params.keyword;
   try {
      Book.find({ title: { $regex: `${keyword}`, $options: 'i' } })
         .populate('category')
         .select('_id title subtitle author category image year price rating')
         .then((result) => {
            res.status(200).json(result);
         })
         .catch((err) => {
            res.status(500).json({ error: err });
         });
   } catch (error) {
      res.status(400).json({ msg: error.message });
   }
});

/**
 * @route   GET api/search/category/:id
 * @desc    Search Books by Category
 * @access  Public
 */
router.get('/category/:id', (req, res) => {
   // Search by category
   const id = req.params.id;
   try {
      Book.find({ category: `${id}` })
         .populate('category')
         .select('_id title subtitle author category image year price rating')
         .then((result) => {
            res.status(200).json(result);
         })
         .catch((err) => {
            res.status(500).json({ error: err });
         });
   } catch (error) {
      res.status(400).json({ msg: error.message });
   }
});

module.exports = router;
