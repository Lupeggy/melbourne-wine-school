import Review from '../models/review.model.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// Get all reviews for a course
export const getCourseReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ course: req.params.courseId })
    .populate('user', 'name');
  
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

// Create a review
export const createReview = catchAsync(async (req, res, next) => {
  // Check if user is enrolled in the course
  const isEnrolled = await Course.exists({
    _id: req.params.courseId,
    students: req.user.id
  });
  
  if (!isEnrolled) {
    return next(new AppError('You need to be enrolled in this course to leave a review', 403));
  }
  
  // Check if user already reviewed
  const existingReview = await Review.findOne({
    user: req.user.id,
    course: req.params.courseId
  });
  
  if (existingReview) {
    return next(new AppError('You have already reviewed this course', 400));
  }
  
  const newReview = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    course: req.params.courseId,
    user: req.user.id
  });
  
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});

// Update a review
export const updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndUpdate(
    {
      _id: req.params.reviewId,
      user: req.user.id
    },
    {
      review: req.body.review,
      rating: req.body.rating
    },
    {
      new: true,
      runValidators: true
    }
  );
  
  if (!review) {
    return next(new AppError('No review found with that ID or you are not authorized to edit it', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

// Delete a review
export const deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndDelete({
    _id: req.params.reviewId,
    user: req.user.id
  });
  
  if (!review) {
    return next(new AppError('No review found with that ID or you are not authorized to delete it', 404));
  }
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});
