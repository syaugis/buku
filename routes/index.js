const express = require('express');
const router = express.Router();

const user = require('./user');
const book = require('./book');
const auth = require('./auth');

router.use('/users', user);
router.use('/books', book);
router.use('/auth-users', auth)

module.exports = router;