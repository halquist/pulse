const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const pollsRouter = require('./polls.js');
const commentsRouter = require('./comments.js')
const uservotesRouter = require('./uservote.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/polls', pollsRouter);

router.use('/comments', commentsRouter);

router.use('/votes', uservotesRouter);

module.exports = router;
