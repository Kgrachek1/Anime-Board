const express = require('express');
const router = express.Router();
const animeCtrl = require('../controllers/animes');
const ensureLoggedIn = require('../config/auth');


router.get('/', animeCtrl.index);
router.get('/search',ensureLoggedIn, animeCtrl.getAnime);
router.get('/new', ensureLoggedIn, animeCtrl.new);

router.get('/:id', animeCtrl.show);

;

module.exports = router;
