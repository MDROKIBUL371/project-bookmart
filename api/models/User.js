const { Schema, model } = require('mongoose');

// User Schema
const UserSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   username: {
      type: String,
      unique: true,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   registeredDate: {
      type: Date,
      default: Date.now,
   },
   purchasedBooks: [
      {
         type: Schema.Types.ObjectId,
         ref: 'books',
      },
   ],
});

const User = model('users', UserSchema);

module.exports = User;
