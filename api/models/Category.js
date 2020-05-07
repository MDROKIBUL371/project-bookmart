const { Schema, model } = require('mongoose');

// Category Schema
const CategorySchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   created: {
      type: Date,
      default: Date.now,
   },
});

const Category = model('categories', CategorySchema);

module.exports = Category;
