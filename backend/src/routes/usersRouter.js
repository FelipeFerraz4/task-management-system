import express from 'express';
import {
  getUserProfile,
  registerUser,
  loginUser,
  updateUserProfile,
} from '../controllers/userController.js'; // Import user-related controllers
import authMiddleware from '../middlewares/authMiddleware.js'; // Import authentication middleware

const router = express.Router(); // Create an Express router

// Route for user registration
router.post('/register', registerUser);

// Route for user login and JWT token generation
router.post('/login', loginUser);

// Apply authentication middleware to all routes below
router.use(authMiddleware);

// Route to retrieve the authenticated user's profile
router.get('/profile', getUserProfile);

// Route to update the authenticated user's profile
router.put('/profile', updateUserProfile);

export default router; // Export the router for use in other parts of the application
