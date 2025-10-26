// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const productRoute = require('./routes/api/productRoute');

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(upload.array());
app.use(cors());

// MongoDB connection
const defaultMongoUrl = 'mongodb://app-mongo:27017/yolomy'; // Use Docker service name
const MONGODB_URI = process.env.MONGODB_URI || defaultMongoUrl;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Database connected successfully');
});

db.on('error', (error) => {
  console.error('Database connection error:', error);
});

// Routes
app.use('/api/products', productRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

