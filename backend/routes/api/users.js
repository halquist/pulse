const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// sign up validation
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email field is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
    check('username')
      .exists({ checkFalsy: true })
      .withMessage('Username field is required')
      .isLength({min: 4})
      .withMessage('Please provide a username with at least 4 characters'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password field is required')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .withMessage('Password must be 8 characters or more & include at least 1 letter and 1 number'),
    // handleValidationErrors
];

// sign up
router.post(
  '/',
  validateSignup, handleValidationErrors,
  asyncHandler( async (req, res) => {
    const { email, password, username, profileImageUrl } = req.body;
    const user = await User.signup({ email, username, password, profileImageUrl });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

module.exports = router;
