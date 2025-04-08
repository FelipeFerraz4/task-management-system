const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/signup',
  authController.protect,
  authController.restrictTo('admin', 'rh'),
  authController.signup,
);
router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);

router
  .route('/me')
  .get(authController.protect, userController.getMe)
  .patch(authController.protect, userController.updateMe)
  .delete(authController.protect, userController.deleteMe);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'rh'),
    userController.getAllUsers,
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'rh'),
    userController.createUser,
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'rh'),
    userController.getUser,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'rh'),
    userController.updateUser,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'rh'),
    userController.deleteUser,
  );

module.exports = router;
