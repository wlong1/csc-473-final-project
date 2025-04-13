const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Test
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());


// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // IP 100 requests limit
});
app.use('/api', limiter);


// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});


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
  


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
