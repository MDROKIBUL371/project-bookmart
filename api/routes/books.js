const { Router } = require('express');
// const multer = require('multer');
const auth = require('../middleware/auth');

// Book Model
const Book = require('../models/Book');

const router = Router();

/**
 * @route   GET api/books
 * @desc    Get All Books
 * @access  Public
 */
router.get('/', (req, res) => {
   try {
      Book.find()
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
 * @route   GET api/books/all
 * @desc    Get All Books
 * @access  Public
 */
router.get('/all', (req, res) => {
   try {
      Book.find()
         .select('-__v')
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
 * @route   GET api/books/:id
 * @desc    Get A Book by Id
 * @access  Public
 */
router.get('/:id', (req, res) => {
   const id = req.params.id;
   try {
      Book.findById(id)
         .select('-__v')
         .populate('category')
         .then((result) => {
            if (result === null) {
               res.status(404).json({});
            }
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
 * @route   POST api/books
 * @desc    Create A Book
 * @access  Private
 */
router.post('/', auth, (req, res) => {
   const newBook = new Book({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      author: req.body.author,
      category: req.body.category,
      image: req.body.image,
      year: req.body.year,
      price: req.body.price,
      rating: req.body.rating,
   });
   try {
      newBook
         .save()
         .then((result) => {
            res.status(201).json({
               message: 'Book record save succesful',
               book: result,
            });
         })
         .catch((err) => {
            res.status(500).json({ error: err });
         });
   } catch (error) {
      res.status(400).json({ msg: error.message });
   }
});

/**
 * @route   PATCH api/books/:id
 * @desc    Update A Book
 * @access  Private
 */
router.patch('/:id', auth, (req, res) => {
   const id = req.params.id;
   let updatedBook = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      author: req.body.author,
      category: req.body.category,
      image: req.body.image,
      year: req.body.year,
      price: req.body.price,
      rating: req.body.rating,
      modified: new Date(),
   };
   Book.findOneAndUpdate({ _id: id }, updatedBook)
      .exec()
      .then((result) => {
         res.status(200).json({
            message: 'Book updated',
            book: result,
         });
      })
      .catch((err) => {
         res.status(500).json({ error: err });
      });
});

/**
 * @route   DELETE api/books/:id
 * @desc    Delete A Book
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
   const id = req.params.id;
   Book.findOneAndRemove({ _id: id })
      .exec()
      .then((result) => {
         res.status(200).json({
            message: 'Product deleted',
            deletedBook: result,
         });
      })
      .catch((err) => {
         res.status(500).json({
            error: err,
         });
      });
});

module.exports = router;
