require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { passport } = require('./src/middlewares/auth');
const authRoutes = require('./src/routes/authRoutes');
const db = require('./src/config/database');

console.log('[1/5] Starting server initialization...');

// Database connection test
async function testConnection() {
  try {
    console.log('[2/5] Testing database connection...');
    await db.authenticate();
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Connection error:', error);
    process.exit(1);
  }
}

console.log('[3/5] Setting up Express app...');
const app = express();

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:3002',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Other middleware
console.log('[4/5] Loading middleware...');
app.use(express.json());
app.use(passport.initialize());

// Routes
console.log('[5/5] Registering routes...');
app.use('/api/auth', authRoutes);

// Basic health check
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token',
      errorCode: 'invalid_token'
    });
  }
  
  // Handle JWT expired error
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Token expired',
      errorCode: 'token_expired'
    });
  }
  
  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: messages,
      errorCode: 'validation_error'
    });
  }
  
  // Handle custom AppError
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
      errorCode: err.errorCode
    });
  }
  
  // Handle other errors
  console.error('Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    errorCode: 'internal_server_error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Start process
testConnection();
