import mongoose from 'mongoose';
import slugify from 'slugify';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide course title'],
      trim: true,
      maxlength: 100,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide course description'],
    },
    summary: {
      type: String,
      required: [true, 'Please provide course summary'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide course price'],
      min: 0,
    },
    duration: {
      // in hours
      type: Number,
      required: [true, 'Please provide course duration'],
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    category: {
      type: String,
      enum: ['wset', 'casual', 'online', 'workshop'],
      required: [true, 'Please provide course category'],
    },
    wsetLevel: {
      type: Number,
      min: 1,
      max: 3,
      required: function () {
        return this.category === 'wset';
      },
    },
    imageCover: {
      type: String,
      default: 'default-course.jpg',
    },
    images: [String],
    startDates: [Date],
    maxGroupSize: {
      type: Number,
      default: 20,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    students: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    instructors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate reviews
courseSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'course',
  localField: '_id',
});

// Virtual populate modules
courseSchema.virtual('modules', {
  ref: 'Module',
  foreignField: 'course',
  localField: '_id',
});

// Indexes
courseSchema.index({ price: 1, ratingsAverage: -1 });
courseSchema.index({ slug: 1 });

// Document middleware: runs before .save() and .create()
courseSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Virtual populate
courseSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'course',
  localField: '_id'
});

// Populate instructors when querying a course
courseSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'instructors',
    select: 'name photo'
  });
  next();
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
