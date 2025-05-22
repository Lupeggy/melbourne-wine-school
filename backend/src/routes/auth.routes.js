import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

// Authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Password reset routes
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

// Update password for logged-in user
router.patch('/update-password', authController.updatePassword);

// Get current user
router.get('/me', userController.getMe, userController.getUser);

// Update current user data
router.patch('/update-me', userController.updateMe);

// Deactivate current user (soft delete)
router.delete('/delete-me', userController.deleteMe);

// Restrict the following routes to admin only
router.use(authController.restrictTo('admin'));

// Admin routes for user management
router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
