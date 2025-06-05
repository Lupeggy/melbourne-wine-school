const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

// Import the passport configuration to ensure strategies are registered
require('../config/passport');

// Registration route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

// Google OAuth callback route
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false 
  }),
  (req, res) => {
    try {
      if (!req.user) {
        console.error('Google OAuth failed: No user returned from Google');
        const frontendLoginUrl = new URL(process.env.FRONTEND_URL || 'http://localhost:3002');
        frontendLoginUrl.pathname = '/login';
        frontendLoginUrl.searchParams.set('error', 'authentication_failed');
        return res.redirect(frontendLoginUrl.toString());
      }

      const user = req.user;
      const token = authController.signToken(user._id);
      const username = user.name || user.firstName || (user.email ? user.email.split('@')[0] : 'User');

      // Create frontend callback URL with token and user info
      const frontendUrl = new URL(process.env.FRONTEND_URL || 'http://localhost:3002');
      frontendUrl.pathname = '/auth/google/callback';
      frontendUrl.searchParams.set('token', token);
      frontendUrl.searchParams.set('id', user._id.toString());
      frontendUrl.searchParams.set('username', encodeURIComponent(username));

      console.log('Google OAuth successful, redirecting to frontend:', frontendUrl.toString());
      return res.redirect(frontendUrl.toString());
      
    } catch (error) {
      console.error('Error in Google OAuth callback:', error);
      const frontendLoginUrl = new URL(process.env.FRONTEND_URL || 'http://localhost:3002');
      frontendLoginUrl.pathname = '/login';
      frontendLoginUrl.searchParams.set('error', 'server_error');
      return res.redirect(frontendLoginUrl.toString());
    }
  }
);

// Protected route
router.get('/protected', 
  passport.authenticate('jwt', { session: false }),
  authController.protectedRoute
);

module.exports = router;
