const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Task.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tasks = await features.query;
  const users = await User.find();

  const userMap = new Map(
    users.map((user) => [user._id.toString(), user.name]),
  );

  const tasksWithNames = tasks.map((task) => {
    const newTask = task.toObject();
    newTask.responsibles = task.responsibles.map((responsibleId) => {
      const name = userMap.get(responsibleId.toString()) || 'Desconhecido';
      return { id: responsibleId, name };
    });
    return newTask;
  });

  res.status(200).json({
    status: 'success',
    results: tasksWithNames.length,
    data: {
      tasks: tasksWithNames,
    },
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError('No task found with that ID', 404));
  }

  const users = await User.find();
  const userMap = new Map(
    users.map((user) => [user._id.toString(), user.name]),
  );

  const taskObj = task.toObject();
  taskObj.responsibles = task.responsibles.map((responsibleId) => {
    const name = userMap.get(responsibleId.toString()) || 'Desconhecido';
    return { id: responsibleId, name };
  });

  res.status(200).json({
    status: 'success',
    data: {
      task: taskObj,
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

exports.getMyTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ responsibles: req.user._id });

  if (!tasks) {
    return next(new AppError('No tasks found for this user', 404));
  }

  res.status(200).json({
    status: 'sucess',
    results: tasks.lenght,
    data: {
      tasks,
    },
  });
});
