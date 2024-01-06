const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');
const { regUser, authUser } = require('../Controllers/userController');

// console.log('inside user routes');
router.post('/register',regUser )
router.post('/login',authUser)

module.exports = router;