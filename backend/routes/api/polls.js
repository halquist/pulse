const express = require('express');
const asyncHandler = require('express-async-handler');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Poll, User, Comment, UserVote } = require('../../db/models');

const router = express.Router();

// get all polls
router.get(
  '/',
  asyncHandler( async (req, res) => {
    const polls = await Poll.findAll( {
      include: [
        { model: User },
        { model: Comment },
      ]
    });
    return res.json(polls);
  })
);

// get one poll
router.get(
  '/',
  asyncHandler( async (req, res) => {
    const pollId = req.params.id;
    const poll = await Poll.findByPk(pollId, {
      include: [
        { model: User },
        { model: Comment },
      ]
    });
    return res.json(poll);
  })
);

// new poll validation
const validatePoll = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Title field is required'),
  check('optionOneTitle')
    .exists({ checkFalsy: true})
    .withMessage('Choice #1 is required'),
  check('optionTwoTitle')
    .exists({ checkFalsy: true})
    .withMessage('Choice #2 is required'),
  handleValidationErrors
]

// create new poll
router.post(
  '/',
  validatePoll, requireAuth, restoreUser,
  asyncHandler( async (req, res) => {
    const { title, description, optionOneTitle, optionTwoTitle } = req.body;
    const poll = await Poll.createPoll({ title, description, optionOneTitle, optionTwoTitle });
    return res.json({
      poll
    });
  })
);

// edit poll
router.put(
  '/',
  validatePoll, requireAuth, restoreUser,
  asyncHandler( async (req, res) => {
    const { pollId, title, description, optionOneTitle, optionTwoTitle } = req.body;
    const updatePoll = await Poll.findByPk(pollId, {
      include: [
        { model: User},
        { model: Comment},
      ]
    });

    if (updatePoll.User.id === req.user.id) {
      const poll = await Poll.updatePoll({ pollId, title, description, optionOneTitle, optionTwoTitle });
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
  '/',
  requireAuth, restoreUser,
  asyncHandler( async (req, res, next) => {

    const { id } = req.body;
    const findPoll = await Poll.findByPk(id.pollId, {include: { model: User}});

    if (findPoll.User.id === req.user.id) {
      const poll = await Poll.deletePoll({ id });
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
