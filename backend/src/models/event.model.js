import mongoose from 'mongoose';
import slugify from 'slugify';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide event title'],
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
      required: [true, 'Please provide event description'],
    },
    summary: {
      type: String,
      required: [true, 'Please provide event summary'],
    },
    eventType: {
      type: String,
      enum: ['tasting', 'workshop', 'dinner', 'other'],
      required: [true, 'Please provide event type'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide end date'],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: 'End date must be after start date',
      },
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    price: {
      type: Number,
      required: [true, 'Please provide event price'],
      min: 0,
    },
    capacity: {
      type: Number,
      required: [true, 'Please provide event capacity'],
      min: 1,
    },
    attendees: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: [true, 'Attendee must be a user']
        },
        status: {
          type: String,
          enum: ['registered', 'attended', 'cancelled'],
          default: 'registered'
        },
      },
    ],
    featuredImage: {
      type: String,
      default: 'default-event.jpg',
    },
    gallery: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
eventSchema.index({ startDate: 1, endDate: 1 });

eventSchema.virtual('availableSpots').get(function () {
  return this.capacity - this.attendees.length;
});

// Document middleware: runs before .save() and .create()
eventSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Virtual for checking if event is upcoming
eventSchema.virtual('isUpcoming').get(function() {
  return this.startDate > new Date();
});

// Virtual for checking if event is full
eventSchema.virtual('isFull').get(function() {
  return this.attendees.length >= this.capacity;
});

// Populate attendees when querying an event
eventSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'attendees.user',
    select: 'name email photo'
  });
  next();
});

// Indexes
eventSchema.index({ startDate: 1 });
eventSchema.index({ location: '2dsphere' });

const Event = mongoose.model('Event', eventSchema);

export default Event;
