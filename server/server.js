const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.json());


// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // IP 100 requests limit
});
app.use('/api', limiter);
app.use('/api', userRoutes);


// Routes
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/auth', userRoutes);
app.use('/api/listing', listingRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);

  const errorResponse = {
    status: 'error',
    message: err.message || 'Internal Server Error'
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(err.statusCode || 500).json(errorResponse);
});

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'File too large (max 5MB)' });
  }
  if (err.message === 'Only image files are allowed') {
    return res.status(415).json({ message: err.message });
  }
  next(err);
});


// Test route
app.get('/api/debug', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send('RAW TEXT RESPONSE');
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
