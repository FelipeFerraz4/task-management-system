import express from 'express';
import {
  getUserProfile,
  registerUser,
  loginUser,
  updateUserProfile,
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.use(authMiddleware);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

export default router;
