const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/me').get(authController.protect, taskController.getMyTasks);

router
  .route('/')
  .get(authController.protect, taskController.getAllTasks)
  .post(authController.protect, taskController.createTask);

router
  .route('/:id')
  .get(authController.protect, taskController.getTask)
  .patch(authController.protect, taskController.updateTask)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    taskController.deleteTask,
  );

module.exports = router;
