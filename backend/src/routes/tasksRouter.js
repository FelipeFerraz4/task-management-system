import express from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from '../controllers/taskController.js'; // Import task controllers
import authMiddleware from '../middlewares/authMiddleware.js'; // Import authentication middleware

const router = express.Router(); // Create an Express router

// Apply authentication middleware to all routes defined in this router
router.use(authMiddleware);

// Route to retrieve all tasks for the authenticated user
router.get('/', getAllTasks);

// Route to retrieve a specific task by ID (only if it belongs to the authenticated user)
router.get('/:id', getTaskById);

// Route to create a new task associated with the authenticated user
router.post('/', createTask);

// Route to update a specific task by ID (only if it belongs to the authenticated user)
router.put('/:id', updateTask);

// Route to delete a specific task by ID (only if it belongs to the authenticated user)
router.delete('/:id', deleteTask);

export default router; // Export the router to be used in other parts of the application
