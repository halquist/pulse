const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser, requireAuth } = require('../../utils/auth');
const { User, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// get all comments for a particular poll
router.get(
  '/:id',
  asyncHandler( async (req, res) => {
    const id = req.params.id;
    const comments = await Comment.findAll({where: {
      pollId: id
  },
  include: [
      { model: User }
  ],
  order: [['createdAt', 'DESC']]});
    return res.json(comments);
  })
);

// new comment validation
const validateComment = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('A comment cannot be empty')
    .bail()
    .matches(/.*\S.*/)
    .withMessage('Comment must not be only spaces')
    .bail()
    .isLength({min:0, max:800})
    .withMessage('Comments must be 800 characters or less'),
  handleValidationErrors
]

// create new comment
router.post(
  '/',
  validateComment, requireAuth, restoreUser,
  asyncHandler( async (req, res) => {
    const { body, userId, pollId, commentId, topLevel } = req.body;
    const comment = await Comment.createComment({ body, userId, pollId, commentId, topLevel });
    const findComment = await Comment.findByPk(comment.id, {include: { model: User}});
    return res.json(
      findComment
    );
  })
);

// edit a comment
router.put(
  '/:id(\\d+)',
  validateComment, requireAuth, restoreUser,
  asyncHandler( async (req, res) => {
    const commentIdFind = req.params.id;
    const { id, body, userId } = req.body;
    const updateComment = await Comment.findByPk(commentIdFind, {
      include: [
        { model: User}
      ]
    });

    if (updateComment.User.id === req.user.id) {
      const newComment = await Comment.updateComment({ id: commentIdFind, body, userId });
      const comment = await Comment.findByPk(id, {include: { model: User}});
      return res.json({
        comment
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

// delete a comment
router.delete(
  '/:id',
  requireAuth, restoreUser,
  asyncHandler( async (req, res, next) => {
    const commentId = req.params.id;
    const findComment = await Comment.findByPk(commentId, {include: { model: User}});

    if (findComment.User.id === req.user.id) {
      const comment = await Comment.deleteComment({ commentId });
      return res.json({
        comment
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
