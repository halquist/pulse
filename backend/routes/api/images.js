const express = require('express');
const sequelize = require('sequelize');
const asyncHandler = require('express-async-handler');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Poll, User, Comment, UserVote } = require('../../db/models');
// const poll = require('../../db/models/poll');

const router = express.Router();

module.exports = router;

// gets 16 images from the pixabay api for the pulse store
router.get(
  '/',
  asyncHandler( async (req, res) => {
    searchTerms = req.searchTerms.join('+');
    apiKey = '23316360-930d50abb4e2b8eeab0661c2f';
    const requestUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerms}&image_type=photo`;
  })
);
