const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { sendEmail } = require('../utils/email');
const crypto = require('crypto');
const config = require('../config/config');
const passport = require('../config/passport');

const signToken = (id) => {
  try {
    if (!id) {
      throw new Error('User ID is required for token generation');
    }
    if (!config.jwtSecret) {
      throw new Error('JWT secret is not configured');
    }
    
    // Ensure expiresIn is a valid time string or number
    const expiresIn = config.jwtExpiresIn || '30d';
    
    return jwt.sign(
      { id },
      config.jwtSecret,
      { expiresIn }
    );
  } catch (error) {
    console.error('Error signing token:', error);
    throw new Error('Failed to generate authentication token');
  }
};

const createSendToken = (user, statusCode, res) => {
  try {
    if (!user || !user.id) {
      throw new Error('Invalid user object provided');
    }
    
    const token = signToken(user.id);
    
    // Create a safe user object without sensitive data
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      // Add other non-sensitive user fields as needed
    };
    
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user: userData
      }
    });
  } catch (error) {
    console.error('Error in createSendToken:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create authentication token',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Register (from authController.js, adapted to ES modules)
const register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  
  if (existingUser) {
    return next(new AppError('User already exists with this email', 400));
  }
  
  try {
    // Create new user - password is hashed by the model's setter
    const user = await User.create({ 
      username, 
      email, 
      password, // This will be hashed by the model's setter
      isActive: true,
      isEmailVerified: true // Assuming email verification is handled elsewhere
    });
    
    // Generate token
    const token = signToken(user.id);
    
    // Log the user's active status for debugging
    console.log(`User ${user.email} login - isActive: ${user.isActive}`);
    
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isActive: user.isActive,
          isEmailVerified: user.isEmailVerified
        }
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return next(new AppError('Error creating user', 500));
  }
});

// Login (using the more comprehensive version from auth.controller.js)
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  
  // 2) Check if user exists and password is correct
  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  
  // 3) Handle account reactivation if needed
  if (!user.isActive) {
    // Check if this is a reactivation attempt
    if (req.query.reactivate === 'true') {
      try {
        user.isActive = true;
        await user.save();
        console.log(`Account ${user.email} has been reactivated`);
      } catch (error) {
        console.error('Error reactivating account:', error);
        return next(new AppError('Error reactivating account. Please try again.', 500));
      }
    } else {
      return next(new AppError('Your account has been deactivated. Please use the reactivate option to continue.', 401, 'account_inactive'));
    }
  }
  
  // 4) Check email verification status (skip for reactivation)
  if (!user.isEmailVerified && !req.query.reactivate) {
    return next(new AppError('Please verify your email address to login', 401, 'email_not_verified'));
  }
  
  // 5) Update last login and login count
  user.lastLogin = Date.now();
  user.loginCount += 1;
  await user.save({ validateBeforeSave: false });

  // 6) If everything ok, send token to client
  createSendToken(user, 200, res);
});

// Protected route (from authController.js, adapted)
const protectedRoute = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
};

// --- Google OAuth Controller Functions ---

const googleAuth = passport.authenticate('google', { 
  scope: ['profile', 'email'] 
});

const googleAuthCallback = passport.authenticate('google', {
  failureRedirect: `${config.frontendUrl}/login?error=google_oauth_failed`,
  session: false, // No session needed as we'll use JWT
});

const handleGoogleCallback = catchAsync(async (req, res) => {
  // req.user is populated by Passport's verify callback in passport.js
  if (!req.user) {
    return res.redirect(`${config.frontendUrl}/login?error=authentication_failed`);
  }

  const user = req.user;
  const token = signToken(user._id);

  // Redirect to frontend callback page with token and user info
  const redirectUrl = `${config.frontendUrl}/auth/google/callback?token=${token}&id=${user._id}&username=${encodeURIComponent(user.name || user.firstName || 'User')}`;
  res.redirect(redirectUrl);
});

// Export all functions
// Make signToken available for use in routes
module.exports = {
  signToken,
  register,
  login,
  protectedRoute,
  googleAuth,
  googleAuthCallback,
  handleGoogleCallback
};
