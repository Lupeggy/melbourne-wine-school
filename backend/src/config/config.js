const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 3000, // Changed from 3003 to 3000
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/melbourne-wine-school?retryWrites=true&w=majority',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '30d',
};
