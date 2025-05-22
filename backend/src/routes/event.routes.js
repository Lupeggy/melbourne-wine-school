import express from 'express';
import * as eventController from '../controllers/event.controller.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/upcoming', eventController.getUpcomingEvents);
router.get('/:id', eventController.getEvent);

// Protect all routes after this middleware
router.use(authController.protect);

// User-specific routes
router.post('/:eventId/register', eventController.registerForEvent);
router.get('/my-events/upcoming', eventController.getMyUpcomingEvents);
router.get('/my-events/past', eventController.getMyPastEvents);

// Restrict the following routes to event organizers and admins
router.use(authController.restrictTo('instructor', 'admin'));

// Event management routes
router.post('/', eventController.createEvent);
router.patch('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

// Event attendee management
router.get('/:eventId/attendees', eventController.getEventAttendees);
router.patch('/:eventId/attendees/:userId', eventController.updateAttendeeStatus);

// Restrict the following routes to admin only
router.use(authController.restrictTo('admin'));

// Admin-only event management
router.get('/admin/all', eventController.adminGetAllEvents);
router.patch('/admin/:id/status', eventController.adminUpdateEventStatus);

export default router;
