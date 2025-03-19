const mongoose = require('mongoose');
const slugify = require('slugify');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A task must have a title'],
      unique: true,
      trim: true,
      maxlength: [50, 'A task title must have less or equal to 50 characters'],
      minlength: [10, 'A task title must have more or equal to 10 characters'],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'A task must have a description'],
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['pending', 'in-progress', 'completed', 'cancelled'],
        message: 'Status is either: pending, in-progress, completed, cancelled',
      },
      default: 'pending',
    },
    due_date: {
      type: Date,
      required: [true, 'A task must have a due date'],
      validate: {
        validator: function (val) {
          return val > Date.now();
        },
        message: 'Due date must be in the future',
      },
    },
    start_date: {
      type: Date,
      default: Date.now,
    },
    last_modified_date: {
      type: Date,
      default: Date.now,
    },
    responsibles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the user model
      },
    ],
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: 'Priority is either: low, medium, high',
      },
      default: 'medium',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true, // Automatically creates the createdAt and updatedAt fields
  },
);

// Virtual to return the status as formatted text
taskSchema.virtual('statusText').get(function () {
  return this.status.charAt(0).toUpperCase() + this.status.slice(1);
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
taskSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  this.last_modified_date = Date.now();
  next();
});

// QUERY MIDDLEWARE: Exclude canceled tasks from queries by default
taskSchema.pre(/^find/, function (next) {
  this.find({ status: { $ne: 'cancelled' } });
  next();
});

// AGGREGATION MIDDLEWARE: Delete canceled tasks from aggregations
taskSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { status: { $ne: 'cancelled' } } });
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
