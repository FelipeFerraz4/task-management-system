import express from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from '../controllers/taskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
