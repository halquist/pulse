const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const pollsRouter = require('./polls.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/polls', pollsRouter);

module.exports = router;
