const express = require('express');
const router = express.Router();
const {getSubjectsBySemester } = require('../Controllers/subController');
const {addToFav, getAllFav, removeFromFav} = require('../Controllers/favorites')
const {protect} = require('../middleware/auth');


router.get('/semester/:semester(\\d+)',protect, getSubjectsBySemester);
router.post('/favorites/add',protect,addToFav)
router.get('/favorites/all',protect,getAllFav)
router.delete('/favorites/remove',protect,removeFromFav)

module.exports = router;