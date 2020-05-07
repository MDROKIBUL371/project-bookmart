const dotenv = require('dotenv');

dotenv.config();

module.exports = {
   PORT: process.env.PORT,
   MONGODB_URI: process.env.MONGODB_URI,
   MONGO_DB_NAME: process.env.MONGO_DB_NAME,
   JWT_SECRET: process.env.JWT_SECRET,
};
