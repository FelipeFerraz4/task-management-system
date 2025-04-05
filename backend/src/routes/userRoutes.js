const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    userController.getAllUsers,
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    userController.createUser,
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    userController.getUser,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    userController.updateUser,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    userController.deleteUser,
  );

module.exports = router;
