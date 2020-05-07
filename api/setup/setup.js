/* eslint-disable no-console */
'use strict';
const dataset = require('./data');
// Book Model
const Book = require('../models/Book');
// Category Model
const Category = require('../models/Category');

function setup() {
   for (let i = 0; i < dataset.length; i += 1) {
      const element = dataset[i];
      Book.findOne({ title: element.title })
         .exec()
         .then((result) => {
            if (result === null) {
               Category.findOneAndUpdate(
                  { name: element.category },
                  { name: element.category },
                  {
                     upsert: true,
                     returnNewDocument: true,
                  }
               )
                  .exec()
                  .then((category) => {
                     const saveBook = new Book({
                        ...element,
                        category: category._id,
                     });
                     saveBook
                        .save()
                        .then(() => {
                           console.log('RECORD SAVED');
                        })
                        .catch((err) => {
                           console.log('RECORD SAVE ERROR', err);
                        });
                  })
                  .catch((err) => {
                     console.log('CATEGORY SAVE ERROR', err);
                  });
            }
         })
         .catch((error) => {
            console.log(error);
         });
   }
}

setup();
