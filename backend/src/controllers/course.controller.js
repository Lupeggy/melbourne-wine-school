import Course from '../models/course.model.js';
import User from '../models/user.model.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// Get all courses
export const getAllCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find();
  
  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses
    }
  });
});

// Get single course
export const getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      course
    }
  });
});

// Create course (admin/instructor only)
export const createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await Course.create(req.body);
  
  res.status(201).json({
    status: 'success',
    data: {
      course: newCourse
    }
  });
});

// Update course (admin/instructor only)
export const updateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      course
    }
  });
});

// Delete course (admin only)
export const deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Enroll in a course
export const enrollInCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  
  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }
  
  // Check if already enrolled
  if (course.students.includes(req.user.id)) {
    return next(new AppError('You are already enrolled in this course', 400));
  }
  
  // Add student to course
  course.students.push(req.user.id);
  await course.save();
  
  // Add course to user's enrolled courses
  await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { enrolledCourses: course._id } },
    { new: true, runValidators: true }
  );
  
  res.status(200).json({
    status: 'success',
    message: 'Successfully enrolled in course',
    data: {
      course
    }
  });
});

// Get user's active courses
export const getMyActiveCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find({
    students: req.user.id,
    endDate: { $gte: new Date() }
  });
  
  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses
    }
  });
});

// Get user's completed courses
export const getMyCompletedCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find({
    students: req.user.id,
    endDate: { $lt: new Date() }
  });
  
  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses
    }
  });
});

// Create module (instructor/admin only)
export const createModule = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  
  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }
  
  // Check if user is the instructor or admin
  if (!course.instructors.includes(req.user.id) && req.user.role !== 'admin') {
    return next(new AppError('You are not authorized to add modules to this course', 403));
  }
  
  const newModule = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    duration: req.body.duration,
    order: course.modules.length + 1
  };
  
  course.modules.push(newModule);
  await course.save();
  
  res.status(201).json({
    status: 'success',
    data: {
      module: course.modules[course.modules.length - 1]
    }
  });
});

// Update module (instructor/admin only)
export const updateModule = catchAsync(async (req, res, next) => {
  const course = await Course.findOne({ 'modules._id': req.params.moduleId });
  
  if (!course) {
    return next(new AppError('No module found with that ID', 404));
  }
  
  // Check if user is the instructor or admin
  if (!course.instructors.includes(req.user.id) && req.user.role !== 'admin') {
    return next(new AppError('You are not authorized to update this module', 403));
  }
  
  const moduleIndex = course.modules.findIndex(
    module => module._id.toString() === req.params.moduleId
  );
  
  if (moduleIndex === -1) {
    return next(new AppError('No module found with that ID', 404));
  }
  
  // Update module fields
  const moduleToUpdate = course.modules[moduleIndex];
  moduleToUpdate.title = req.body.title || moduleToUpdate.title;
  moduleToUpdate.description = req.body.description || moduleToUpdate.description;
  moduleToUpdate.content = req.body.content || moduleToUpdate.content;
  moduleToUpdate.duration = req.body.duration || moduleToUpdate.duration;
  
  await course.save();
  
  res.status(200).json({
    status: 'success',
    data: {
      module: moduleToUpdate
    }
  });
});

// Delete module (instructor/admin only)
export const deleteModule = catchAsync(async (req, res, next) => {
  const course = await Course.findOne({ 'modules._id': req.params.moduleId });
  
  if (!course) {
    return next(new AppError('No module found with that ID', 404));
  }
  
  // Check if user is the instructor or admin
  if (!course.instructors.includes(req.user.id) && req.user.role !== 'admin') {
    return next(new AppError('You are not authorized to delete this module', 403));
  }
  
  const moduleIndex = course.modules.findIndex(
    module => module._id.toString() === req.params.moduleId
  );
  
  if (moduleIndex === -1) {
    return next(new AppError('No module found with that ID', 404));
  }
  
  // Remove the module
  course.modules.splice(moduleIndex, 1);
  
  // Update the order of remaining modules
  course.modules.forEach((module, index) => {
    module.order = index + 1;
  });
  
  await course.save();
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Admin: Get all courses with additional admin details
export const adminGetAllCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find().populate('instructors students');
  
  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses
    }
  });
});

// Admin: Update course status
export const adminUpdateCourseStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  
  if (!['active', 'inactive', 'archived'].includes(status)) {
    return next(new AppError('Invalid status. Must be one of: active, inactive, archived', 400));
  }
  
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { status },
    {
      new: true,
      runValidators: true
    }
  );

  if (!course) {
    return next(new AppError('No course found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      course
    }
  });
});
