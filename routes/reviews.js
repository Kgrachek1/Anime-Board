const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/auth');

// All routes "starts with" / (root)

// POST /animes/:id/reviews
router.post('/animes/:id/reviews', ensureLoggedIn, reviewsCtrl.create);
// DELETE /reviews/:id
router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);
router.put('/reviews/:id', ensureLoggedIn, reviewsCtrl.update)
module.exports = router;