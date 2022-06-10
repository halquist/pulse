const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser, requireAuth } = require('../../utils/auth');
const { User, Poll, UserVote } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


module.exports = router;


// get all uservotes for a particular poll
router.get(
  '/:id',
  asyncHandler( async (req, res) => {
    const id = req.params.id;
    const uservotes = await UserVote.findAll({where: {
      pollId: id
  },
  include: [
      { model: User },
      { model: Poll }
  ],
  order: [['createdAt', 'DESC']]});
    return res.json(uservotes);
  })
);
