/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');

const { MONGODB_URI } = config;

const app = express();

// Setup
// eslint-disable-next-line no-unused-vars
const setup = require('./api/setup/setup');

// Routes
const authRoutes = require('./api/routes/auth');
const categoryRoutes = require('./api/routes/categories');
const bookRoutes = require('./api/routes/books');
const searchRoutes = require('./api/routes/search');
const userRoutes = require('./api/routes/users');

// Middleware
// Bodyparser
app.use(bodyParser.json());
// Logger
app.use(morgan('dev'));
// CORS Middleware
app.use(cors());

// Database uri
const db = `${MONGODB_URI}`;

// MongoDB connection
mongoose
   .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log('Connected to MongoDB...'))
   .catch((err) => console.log(err));

// Endpoint setup for routes
app.use('/api/categories', categoryRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Serve client static files
if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));
   app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

module.exports = app;
