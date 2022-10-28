const express = require('express');
const router = express.Router();
const animeCtrl = require('../controllers/animes');
const ensureLoggedIn = require('../config/auth');

// All routes start with '/movies'

// GET /movies (display all movies)
router.get('/', animeCtrl.index);
// GET /movies/new (display a form for entering a new movie)
router.get('/new', ensureLoggedIn, animeCtrl.new);
// GET /movies/:id (display a "detail/show" page for a single movie)
router.get('/:id', animeCtrl.show);
// POST /movies (handle the new form being submitted)
router.post('/', ensureLoggedIn, animeCtrl.create);

module.exports = router;
