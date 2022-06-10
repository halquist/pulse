const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const pollsRouter = require('./polls.js');
const commentsRouter = require('./comments.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/polls', pollsRouter);

router.use('/comments', commentsRouter)

module.exports = router;
