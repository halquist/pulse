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

// new comment validation
const validateVote = [
  check('userId')
    .exists({ checkFalsy: true })
    .withMessage('Something went wrong. Please try your vote again.')
    .bail(),
  check('pollId')
    .exists({ checkFalsy: true })
    .withMessage('Something went wrong. Please try your vote again.')
    .bail(),
  check('voteSelection')
    .exists({ checkFalsy: true })
    .withMessage('Something went wrong. Please try your vote again.')
    .bail(),
  handleValidationErrors
]

// create new vote
router.post(
  '/',
  validateVote, requireAuth, restoreUser,
  asyncHandler( async (req, res) => {
    const { userId, pollId, voteSelection } = req.body;
    const vote = await UserVote.createVote({ userId, pollId, voteSelection });
    // const findComment = await Comment.findByPk(comment.id, {include: { model: User}});
    return res.json(
      vote
    );
  })
);

// delete vote
router.delete(
  '/:id(\\d+)',
  requireAuth, restoreUser,
  asyncHandler( async (req, res, next) => {
    const voteId = req.params.id;
    const findVote = await UserVote.findByPk(voteId);
      const vote = await UserVote.deleteVote({ voteId });
      return res.json({
        vote
      });
  })
)
