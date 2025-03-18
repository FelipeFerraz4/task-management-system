const mongoose = require('mongoose');
const slugify = require('slugify');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A task must have a title'],
      unique: true,
      trim: true,
      maxlength: [50, 'A task name must have less or equal then 50 characters'],
      minlength: [10, 'A task name must have more or equal then 10 characters'],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'A task must have a description'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
taskSchema.pre('save', (next) => {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
