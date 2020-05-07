const { Schema, model } = require('mongoose');

// Book Schema
const BookSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   subtitle: {
      type: String,
      default: '',
   },
   description: {
      type: String,
      required: true,
   },
   author: {
      type: String,
      required: true,
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
   },
   image: {
      type: String,
      default: '',
   },
   year: {
      type: String,
      default: '',
   },
   price: {
      type: Number,
      required: true,
   },
   rating: {
      type: Number,
      default: 0,
   },
   modified: {
      type: Date,
      required: true,
      default: new Date(),
   },
});

const Book = model('books', BookSchema);

module.exports = Book;
