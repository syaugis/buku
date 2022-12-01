// username, email, password
const express = require('express');
const router = express.Router();

const {profileUser, changeProfile} = require('./../controller/c_user')
const {checkJWT} = require('./../controller/c_checkJwt')

router.use(checkJWT)
router.get('/profile', profileUser);
router.put('/change-profile', changeProfile);

module.exports = router;