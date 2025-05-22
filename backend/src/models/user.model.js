import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      trim: true,
      maxlength: 50,
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: 30
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 30
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      minlength: 3,
      maxlength: 30
    },
    dateOfBirth: {
      type: Date
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say']
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'instructor', 'admin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false
    },
    lastLogin: Date,
    loginCount: {
      type: Number,
      default: 0
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    coverImage: {
      type: String
    },
    bio: {
      type: String,
      maxlength: 500
    },
    title: {
      type: String,
      maxlength: 100
    },
    company: String,
    website: String,
    socialMedia: {
      twitter: String,
      facebook: String,
      linkedin: String,
      instagram: String
    },
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true
      },
      pushNotifications: {
        type: Boolean,
        default: true
      },
      newsletter: {
        type: Boolean,
        default: true
      },
      theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'light'
      }
    },
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
      },
    ],
    enrolledCourses: [
      {
        course: {
          type: mongoose.Schema.ObjectId,
          ref: 'Course',
        },
        enrolledAt: {
          type: Date,
          default: Date.now
        },
        completed: {
          type: Boolean,
          default: false
        },
        completedAt: Date,
        progress: {
          type: Number,
          min: 0,
          max: 100,
          default: 0
        }
      }
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerificationToken: String,
    emailVerificationExpire: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate password reset token
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Instance method to generate email verification token
userSchema.methods.createEmailVerificationToken = function() {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
    
  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return verificationToken;
};

// Document middleware to hash password before saving
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Query middleware to filter out inactive users
userSchema.pre(/^find/, function(next) {
  // This points to the current query
  this.find({ isActive: { $ne: false } });
  next();
});

// Virtual for user's enrolled courses
userSchema.virtual('enrollments', {
  ref: 'Enrollment',
  foreignField: 'user',
  localField: '_id',
});

// Virtual for user's created courses (if instructor)
userSchema.virtual('courses', {
  ref: 'Course',
  foreignField: 'instructors',
  localField: '_id'
});

// Virtual for user's hosted events (if instructor)
userSchema.virtual('hostedEvents', {
  ref: 'Event',
  foreignField: 'instructors',
  localField: '_id'
});

// Virtual for user's reviews
userSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'user',
  localField: '_id'
});

// Virtual for user's full name
userSchema.virtual('fullName').get(function() {
  return this.firstName && this.lastName 
    ? `${this.firstName} ${this.lastName}`
    : this.name;
});

// Indexes for better query performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ 'address.city': 1, 'address.country': 1 });

const User = mongoose.model('User', userSchema);

export default User;
