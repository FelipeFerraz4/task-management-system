const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const Task = require('../models/taskModel');

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Task.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tasks = await features.query;

  res.status(200).json({
    status: 'sucess',
    results: tasks.lenght,
    data: {
      tasks,
    },
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError('No task found with that ID', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      task,
    },
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const newtask = await Task.create(req.body);

  res.status(201).json({
    status: 'sucess',
    data: {
      task: newtask,
    },
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    next(new AppError('No task found with that ID', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      task,
    },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    next(new AppError('No task found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
