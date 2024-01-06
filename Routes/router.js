const express = require('express');
const router = express.Router();
const courseController = require('../Controllers/subController');
const {addToFav, getAllFav, removeFromFav} = require('../Controllers/favorites')
const {protect} = require('../middleware/auth');


router.get('/semester/:semester(\\d+)', courseController.getSubjectsBySemester);
router.post('/favorites/add',protect,addToFav)
router.get('/favorites/all',protect,getAllFav)
router.delete('/favorites/remove',protect,removeFromFav)

module.exports = router;