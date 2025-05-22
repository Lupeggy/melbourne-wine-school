import express from 'express';
import * as courseController from '../controllers/course.controller.js';
import * as reviewController from '../controllers/review.controller.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourse);

// Get reviews for a course
router.get('/:courseId/reviews', reviewController.getCourseReviews);

// Protect all routes after this middleware
router.use(authController.protect);

// User-specific routes (requires authentication)
router.post('/:courseId/enroll', courseController.enrollInCourse);
router.get('/my-courses/active', courseController.getMyActiveCourses);
router.get('/my-courses/completed', courseController.getMyCompletedCourses);

// Restrict the following routes to instructors and admins
router.use(authController.restrictTo('instructor', 'admin'));

// Course management routes
router.post('/', courseController.createCourse);
router.patch('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

// Course content management
router.post('/:courseId/modules', courseController.createModule);
router.patch('/modules/:moduleId', courseController.updateModule);
router.delete('/modules/:moduleId', courseController.deleteModule);

// Course reviews (only for enrolled students)
router.post('/:courseId/reviews', reviewController.createReview);

// Restrict the following routes to admin only
router.use(authController.restrictTo('admin'));

// Admin-only course management
router.get('/admin/all', courseController.adminGetAllCourses);
router.patch('/admin/:id/status', courseController.adminUpdateCourseStatus);

export default router;
