import express from 'express';
import authRoutes from './auth.routes.js';
import courseRoutes from './course.routes.js';
import eventRoutes from './event.routes.js';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date(),
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/events', eventRoutes);

// 404 handler for API routes
router.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

export default router;
