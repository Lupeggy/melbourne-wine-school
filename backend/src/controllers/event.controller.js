import Event from '../models/event.model.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// Get all events
export const getAllEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find();
  
  res.status(200).json({
    status: 'success',
    results: events.length,
    data: {
      events
    }
  });
});

// Get upcoming events
export const getUpcomingEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find({
    date: { $gte: new Date() }
  }).sort('date');
  
  res.status(200).json({
    status: 'success',
    results: events.length,
    data: {
      events
    }
  });
});

// Get single event
export const getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  
  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      event
    }
  });
});

// Create event (admin/instructor only)
export const createEvent = catchAsync(async (req, res, next) => {
  const newEvent = await Event.create(req.body);
  
  res.status(201).json({
    status: 'success',
    data: {
      event: newEvent
    }
  });
});

// Update event (admin/instructor only)
export const updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      event
    }
  });
});

// Delete event (admin only)
export const deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  
  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Register for an event
export const registerForEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.eventId);
  
  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }
  
  // Check if already registered
  const existingAttendee = event.attendees.find(
    attendee => attendee.user.toString() === req.user.id
  );
  
  if (existingAttendee) {
    return next(new AppError('You are already registered for this event', 400));
  }
  
  // Add attendee to event
  event.attendees.push({
    user: req.user.id,
    status: 'registered'
  });
  
  await event.save();
  
  res.status(200).json({
    status: 'success',
    message: 'Successfully registered for event',
    data: {
      event
    }
  });
});

// Get user's upcoming events
export const getMyUpcomingEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find({
    'attendees.user': req.user.id,
    date: { $gte: new Date() }
  }).sort('date');
  
  res.status(200).json({
    status: 'success',
    results: events.length,
    data: {
      events
    }
  });
});

// Get user's past events
export const getMyPastEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find({
    'attendees.user': req.user.id,
    date: { $lt: new Date() }
  }).sort('-date');
  
  res.status(200).json({
    status: 'success',
    results: events.length,
    data: {
      events
    }
  });
});

// Get event attendees (admin/instructor only)
export const getEventAttendees = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.eventId)
    .populate('attendees.user', 'name email');
  
  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    results: event.attendees.length,
    data: {
      attendees: event.attendees
    }
  });
});

// Update attendee status (admin/instructor only)
export const updateAttendeeStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  
  if (!['registered', 'attended', 'cancelled'].includes(status)) {
    return next(new AppError('Invalid status', 400));
  }
  
  const event = await Event.findOneAndUpdate(
    { _id: req.params.eventId, 'attendees._id': req.params.userId },
    { $set: { 'attendees.$.status': status } },
    { new: true, runValidators: true }
  );
  
  if (!event) {
    return next(new AppError('No event or attendee found with that ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      event
    }
  });
});

// Admin: Get all events with additional details
export const adminGetAllEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find()
    .populate('instructors')
    .populate('attendees.user', 'name email');
  
  res.status(200).json({
    status: 'success',
    results: events.length,
    data: {
      events
    }
  });
});

// Admin: Update event status
export const adminUpdateEventStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  
  if (!['draft', 'published', 'cancelled', 'completed'].includes(status)) {
    return next(new AppError('Invalid status. Must be one of: draft, published, cancelled, completed', 400));
  }
  
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { status },
    {
      new: true,
      runValidators: true
    }
  );

  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      event
    }
  });
});
