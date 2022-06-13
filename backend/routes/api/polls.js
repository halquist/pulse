const express = require('express');
const asyncHandler = require('express-async-handler');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Poll, User, Comment, UserVote } = require('../../db/models');
const poll = require('../../db/models/poll');

const router = express.Router();

// get all polls
router.get(
  '/',
  asyncHandler( async (req, res) => {
    const polls = await Poll.findAll({
      include: [
        { model: User },
        { model: Comment },
        { model: UserVote}
      ],
      order: [['createdAt', 'DESC']]});
    return res.json(polls);
  })
);

// get one poll
router.get(
  '/:id(\\d+)',
  asyncHandler( async (req, res) => {
    const pollId = req.params.id;
    const poll = await Poll.findByPk(pollId, {
      include: [
        { model: User },
        { model: Comment },
        { model: UserVote}
      ]
    });
    return res.json(poll);
  })
);

// new poll validation
const validatePoll = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Title field is required')
    .bail()
    .isLength({min:0, max:100})
    .withMessage('Title must be 100 characters or less')
    .matches(/.*\S.*/)
    .withMessage('Title field must not be only spaces'),
  check('optionOneTitle')
    .exists({ checkFalsy: true})
    .withMessage('Choice #1 is required')
    .bail()
    .isLength({min:0, max:50})
    .withMessage('Choice #1 must be 50 characters or less')
    .matches(/.*\S.*/)
    .withMessage('Choice #1 must not be only spaces'),
  check('optionTwoTitle')
    .exists({ checkFalsy: true})
    .withMessage('Choice #2 is required')
    .bail()
    .isLength({min:0, max:50})
    .withMessage('Choice #2 must be 50 characters or less')
    .matches(/.*\S.*/)
    .withMessage('Choice #2 must not be only spaces'),
  check('description')
    .isLength({min:0, max:280})
    .withMessage('Description must be 280 characters or less'),
  handleValidationErrors
]

// create new poll
router.post(
  '/',
  validatePoll, requireAuth, restoreUser,
  asyncHandler( async (req, res) => {
    const { title, description, userId, optionOneTitle, optionTwoTitle } = req.body;
    const poll = await Poll.createPoll({ title, description, userId, optionOneTitle, optionTwoTitle });
    return res.json({
      poll
    });
  })
);

// edit poll
router.put(
  '/:id(\\d+)',
  validatePoll, requireAuth, restoreUser,
  asyncHandler( async (req, res) => {
    const pollIdFind = req.params.id;
    const { pollId, title, description, optionOneTitle, optionTwoTitle, optionOneVotes, optionTwoVotes } = req.body;
    const updatePoll = await Poll.findByPk(pollIdFind, {
      include: [
        { model: User},
        { model: Comment},
      ]
    });

    if (updatePoll.User.id === req.user.id) {
      const poll = await Poll.updatePoll({ pollId, title, description, optionOneTitle, optionTwoTitle, optionOneVotes, optionTwoVotes });
      return res.json({
        poll
      })
    } else {
      res.errors = new Error('Unauthorized');
      err.errors = errors;
      err.status = 403;
      err.title = 'Unauthorized';
      next(err);
    }
  })
)

// delete poll

router.delete(
  '/:id(\\d+)',
  requireAuth, restoreUser,
  asyncHandler( async (req, res, next) => {
    const pollId = req.params.id;
    const findPoll = await Poll.findByPk(pollId, {include: { model: User}});
    if (findPoll.User.id === req.user.id) {
      const poll = await Poll.deletePoll({ pollId });
      return res.json({
        poll
      });
    } else {
      res.errors = new Error('Unauthorized');
      err.errors = errors;
      err.status = 403;
      err.title = 'Unauthorized';
      next(err);
    }
  })
)

module.exports = router;
